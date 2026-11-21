# SujetStore Android App (`com.sujetstore.app`)

Native Android 35 (API 24–35) shell for [sujetstore.com](https://sujetstore.com), engineered with:
- Custom User-Agent (`SujetStoreAndroidApp/1.0.0`) so SujetStore enables native mobile layout hooks
- Pull-to-refresh (`SwipeRefreshLayout`) and smart hardware back-button navigation
- Native Arabic offline fallback screen with automatic reconnection detection (`ConnectivityManager`)
- Authenticated PDF & file download handler (`DownloadManager` forwarding session cookies & User-Agent, supporting `/api/media/*` and `.pdf` links)
- Fullscreen video playback support (YouTube & HTML5 players)
- Verified Android App Links for `https://sujetstore.com` & `https://www.sujetstore.com`
- `window.SujetStoreAndroid` JS bridge (`share`, `setTheme`, `downloadPdf`)

## Building

```bash
cd android
export ANDROID_HOME=/opt/android-sdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# Debug APK
./gradlew assembleDebug

# Signed Release APK + Play Store AAB (reads /var/lib/sujetstore-infra/android-keystore.properties)
./gradlew assembleRelease bundleRelease
```

Release artifacts are published to `/var/lib/sujetstore-infra/releases/`.
The release keystore lives strictly outside Git at `/var/lib/sujetstore-infra/android-release.keystore`.
