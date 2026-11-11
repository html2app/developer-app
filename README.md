# html2app.dev Developer App

A small single-page tool for testing your web project on a phone before you build it into an app with [html2app.dev](https://html2app.dev). Start a live server on your computer, then enter its address in the developer app on your phone to see your project running there, with live reload and remote logs.

## Why use it

The main advantage of this developer app is that you can configure your app on [html2app.dev](https://html2app.dev) the way you want and add plugins. Once the plugins are in the app, you can interact with them and debug them directly on your local machine, with automatic reload. You do not need to build a new app in the cloud after each change. This saves a large amount of time.

## What you need

- **A code editor**, such as [VS Code](https://code.visualstudio.com/) or any editor you like.
- **Node.js** (LTS version recommended). Download it from [nodejs.org](https://nodejs.org/). The `npx` command is included with it.
- **A computer and a phone on the same local network.** Use the same home or office Wi-Fi for both. Guest networks often block devices from reaching each other.

## Quick start

1. Open your project folder in your editor. If `index.html` is in the top level of the folder, run:

   ```bash
   npx -y five-server@latest --host=0.0.0.0 --remoteLogs=true
   ```

2. If `index.html` is inside a subfolder such as `www`, set that folder as the root:

   ```bash
   npx -y five-server@latest --root=www --host=0.0.0.0 --remoteLogs=true
   ```

3. The terminal prints a local URL (usually `http://localhost:5500`) and a network URL (for example `http://192.168.1.20:5500`). Open the network URL on your computer or phone to check your site.

4. Open the developer app on your phone. Enter the network address from step 3 (for example `192.168.1.20:5500`) and connect.

Press `Ctrl+C` in the terminal to stop the server.

### Command options

| Option               | Purpose                                                                                                    |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `-y`                 | Lets `npx` install `five-server` without asking for confirmation.                                          |
| `five-server@latest` | Always runs the newest published version.                                                                  |
| `--root=www`         | Serves the given folder instead of the current one. Only needed when `index.html` is not at the top level. |
| `--host=0.0.0.0`     | Lets other devices on your network connect. Without it, only your computer can.                            |
| `--remoteLogs=true`  | Shows console output from your phone or browser in the terminal.                                           |

## Notes

- **Use it on a trusted network only.** `--host=0.0.0.0` makes your project files reachable by every device on the same network.
- **Firewall prompts.** On first run, your operating system may ask whether to allow Node.js to accept incoming connections. Allow it on private networks. If the phone still cannot connect, check that the firewall is not blocking port 5500.
- **Use the printed address.** Always copy the network URL from the terminal, since the port can differ from 5500.
- **Hidden files.** Files starting with a dot, such as `.env`, are not served by default.

## Building your app with html2app.dev

1. Zip your project folder, or download the source code as a ZIP from the GitHub repository. Click **<> Code**, then **Download ZIP**.
2. Upload the ZIP to [html2app.dev](https://html2app.dev).
3. On the **Plugins** page, click **Add New Plugin**, select the plugins you need, and configure them if needed. Many plugins are available.
4. Build the app and follow the instructions on the site.

The project already includes a ready-made app icon, `icon.png`. You can use it as the app icon or replace it with your own. Using it is optional.

## Project files

- `index.html`: the developer app page. It loads `styles.css` and `app.js`.
- `styles.css`: the styles for the developer app.
- `app.js`: the JavaScript for the developer app.

No build step is needed. Keep the three files together in the same folder.
