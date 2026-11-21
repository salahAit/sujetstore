# SujetStore Desktop App (Tauri v2)

Cross-platform native desktop client (`com.sujetstore.desktop`) for **Windows**, **macOS**, and **Linux**, powered by **Tauri v2** and **Rust**.

## Configuration
- **Target URL**: `https://sujetstore.com`
- **Window Title**: `SujetStore` (1280×840 default, 900×640 minimum)
- **Custom User-Agent**: `SujetStoreDesktopApp/1.0.0`
- **Unified API**: Connects to `/api/v1/catalog`, `/api/v1/subjects/[id]`, `/api/v1/auth/session`, and `/api/v1/student/sync`

## Prerequisites
- Rust 1.77+ (tested on Rust 1.100.0) & Cargo
- Bun or Node.js 20+
- Platform WebView dependencies:
  - **Linux**: `libwebkit2gtk-4.1-dev`, `libappindicator3-dev`, `librsvg2-dev`, `patchelf`
  - **Windows**: WebView2 Runtime (pre-installed on Windows 10/11)
  - **macOS**: Xcode Command Line Tools

## Development & Build

```bash
cd clients/desktop-tauri
bun install
bun run dev     # Launch desktop window in dev mode
bun run build   # Produce native installers (.msi/.exe, .dmg, .AppImage/.deb)
```
