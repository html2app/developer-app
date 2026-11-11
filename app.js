const STORAGE_KEY = 'html2app_visited_history_v1';

// 1a. Fade the startup overlay in. Two frames pass first so the browser paints the
// hidden state before the transition starts.
requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById('startup-overlay').classList.add('is-visible');
}));

// 1. Startup Fade Animation & Init
window.addEventListener('load', () => {
    setTimeout(() => {
        const overlay = document.getElementById('startup-overlay');
        const appLayout = document.getElementById('app-layout');

        overlay.classList.add('fade-out');
        appLayout.classList.add('visible');
    }, 600);

    renderHistory();
});

// 2. Local Storage Management
function getHistory() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) { }
}

function renderHistory() {
    const history = getHistory();
    const container = document.getElementById('history-list');
    const countEl = document.getElementById('history-count');

    countEl.textContent = history.length;
    container.innerHTML = '';

    if (history.length === 0) {
        container.innerHTML = '<div class="empty-history">No connection history saved</div>';
        return;
    }

    history.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.innerHTML = `
                    <div class="history-info" onclick="selectAndConnect('${item.ip}')">
                        <div class="history-ip">${item.ip}</div>
                        <div class="history-time">${item.time}</div>
                    </div>
                    <div class="history-actions">
                        <button type="button" class="btn-reconnect" onclick="selectAndConnect('${item.ip}')">Connect</button>
                        <button type="button" class="btn-delete-ip" onclick="deleteHistoryItem(event, ${index})" title="Delete">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                `;
        container.appendChild(el);
    });
}

function addIpToHistory(rawIp) {
    let history = getHistory();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Remove duplicates
    history = history.filter(item => item.ip.toLowerCase() !== rawIp.toLowerCase());

    // Unshift new item
    history.unshift({ ip: rawIp, time: timeStr });

    // Limit max items
    if (history.length > 10) history.pop();

    saveHistory(history);
    renderHistory();
}

function deleteHistoryItem(event, index) {
    event.stopPropagation();
    let history = getHistory();
    history.splice(index, 1);
    saveHistory(history);
    renderHistory();
}

function clearAllHistory() {
    saveHistory([]);
    renderHistory();
}

function selectAndConnect(ip) {
    document.getElementById('ip-input').value = ip;
    connectToAddress(ip);
}

// 3. Connection & IP Formatting Logic
function handleFormSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('ip-input');
    const val = input.value.trim();
    if (val) {
        connectToAddress(val);
    }
}

function connectToAddress(address) {
    let formattedUrl = address;

    // Prepend http:// if protocol is missing
    if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = 'http://' + formattedUrl;
    }

    addIpToHistory(address);
    window.location.href = formattedUrl;
}

// Generic Modal Handler
function openModal(title, body) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').textContent = body;
    document.getElementById('generic-modal').classList.add('open');
}

function closeModal() {
    document.getElementById('generic-modal').classList.remove('open');
}
