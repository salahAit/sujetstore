use tauri::Manager;

pub const APP_HOME_URL: &str = "https://sujetstore.com";
pub const DESKTOP_USER_AGENT: &str = "Mozilla/5.0 (compatible; SujetStoreDesktopApp/1.0.0)";

#[tauri::command]
fn get_client_info() -> serde_json::Value {
    serde_json::json!({
        "app": "SujetStore",
        "version": env!("CARGO_PKG_VERSION"),
        "platform": std::env::consts::OS,
        "arch": std::env::consts::ARCH,
        "userAgent": DESKTOP_USER_AGENT,
        "homeUrl": APP_HOME_URL
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_client_info])
        .setup(|app| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.set_title("SujetStore");
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running SujetStore Desktop application");
}
