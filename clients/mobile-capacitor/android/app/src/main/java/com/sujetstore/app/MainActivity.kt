package com.sujetstore.app

import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.content.pm.ActivityInfo
import android.graphics.Bitmap
import android.graphics.Color
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.os.Handler
import android.os.Looper
import android.view.View
import android.webkit.CookieManager
import android.webkit.JavascriptInterface
import android.webkit.URLUtil
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class SujetStoreJsBridge(
    private val activity: MainActivity
) {
    @JavascriptInterface
    fun share(title: String?, text: String?, url: String?) {
        activity.runOnUiThread {
            activity.openNativeShare(title, text, url)
        }
    }

    @JavascriptInterface
    fun setTheme(theme: String?) {
        activity.runOnUiThread {
            activity.applySystemBarsTheme(theme == "light")
        }
    }

    @JavascriptInterface
    fun downloadPdf(url: String?, title: String?) {
        if (!url.isNullOrBlank()) {
            activity.runOnUiThread {
                val resolved = if (url.startsWith("http")) {
                    url
                } else {
                    "https://sujetstore.com${if (url.startsWith("/")) "" else "/"}$url"
                }
                activity.enqueueFileDownload(resolved, null, null, "application/pdf", title)
            }
        }
    }
}

class MainActivity : AppCompatActivity() {

    companion object {
        private const val BASE_URL = "https://sujetstore.com"
        private const val USER_AGENT_SUFFIX = " SujetStoreAndroidApp/1.0.0"
    }

    private lateinit var rootContainer: FrameLayout
    private lateinit var swipeRefresh: SwipeRefreshLayout
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var offlineOverlay: LinearLayout
    private lateinit var fullscreenContainer: FrameLayout

    private var customVideoView: View? = null
    private var customVideoCallback: WebChromeClient.CustomViewCallback? = null
    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null

    private var isSplashReady = false
    private var lastFailedUrl: String? = null
    private var lastBackPressMs: Long = 0L
    private var networkCallback: ConnectivityManager.NetworkCallback? = null

    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        val callback = fileUploadCallback
        fileUploadCallback = null
        if (callback == null) return@registerForActivityResult

        val uris = WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
        callback.onReceiveValue(uris)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        val splashScreen = installSplashScreen()
        splashScreen.setKeepOnScreenCondition { !isSplashReady }

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Ensure splash screen never blocks longer than 1.6s on slow or offline networks
        Handler(Looper.getMainLooper()).postDelayed({
            isSplashReady = true
        }, 1600L)

        rootContainer = findViewById(R.id.rootContainer)
        swipeRefresh = findViewById(R.id.swipeRefresh)
        webView = findViewById(R.id.webView)
        progressBar = findViewById(R.id.progressBar)
        offlineOverlay = findViewById(R.id.offlineOverlay)
        fullscreenContainer = findViewById(R.id.fullscreenContainer)

        val btnRetry: Button = findViewById(R.id.btnRetry)
        btnRetry.setOnClickListener {
            retryConnection()
        }

        applySystemBarsTheme(isLight = false)
        setupSwipeRefresh()
        setupWebView()
        setupBackNavigation()
        registerNetworkMonitor()

        val initialUrl = resolveIntentUrl(intent) ?: BASE_URL
        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            loadTargetUrl(initialUrl)
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val targetUrl = resolveIntentUrl(intent)
        if (!targetUrl.isNullOrBlank()) {
            loadTargetUrl(targetUrl)
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onPause() {
        super.onPause()
        CookieManager.getInstance().flush()
        webView.onPause()
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onDestroy() {
        unregisterNetworkMonitor()
        webView.stopLoading()
        webView.destroy()
        super.onDestroy()
    }

    private fun resolveIntentUrl(intent: Intent?): String? {
        val data = intent?.data ?: return null
        val host = data.host?.lowercase() ?: return null
        return if (host == "sujetstore.com" || host == "www.sujetstore.com") {
            data.toString()
        } else {
            null
        }
    }

    private fun loadTargetUrl(url: String) {
        if (!isNetworkAvailable()) {
            lastFailedUrl = url
            offlineOverlay.visibility = View.VISIBLE
            isSplashReady = true
            return
        }
        offlineOverlay.visibility = View.GONE
        webView.loadUrl(url)
    }

    private fun retryConnection() {
        if (!isNetworkAvailable()) {
            Toast.makeText(this, R.string.offline_title, Toast.LENGTH_SHORT).show()
            return
        }
        offlineOverlay.visibility = View.GONE
        val target = lastFailedUrl ?: webView.url ?: BASE_URL
        lastFailedUrl = null
        webView.loadUrl(target)
    }

    private fun setupSwipeRefresh() {
        swipeRefresh.setColorSchemeColors(Color.parseColor("#2563EB"), Color.parseColor("#10B981"))
        swipeRefresh.setProgressBackgroundColorSchemeColor(Color.parseColor("#0F172A"))
        swipeRefresh.setOnChildScrollUpCallback { _, _ ->
            customVideoView != null || offlineOverlay.visibility == View.VISIBLE || webView.scrollY > 0
        }
        swipeRefresh.setOnRefreshListener {
            if (!isNetworkAvailable()) {
                swipeRefresh.isRefreshing = false
                offlineOverlay.visibility = View.VISIBLE
            } else {
                webView.reload()
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

        webView.setBackgroundColor(Color.parseColor("#0F172A"))

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            mediaPlaybackRequiresUserGesture = false
            loadsImagesAutomatically = true
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            cacheMode = WebSettings.LOAD_DEFAULT
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false
            useWideViewPort = true
            loadWithOverviewMode = true
            allowFileAccess = false
            allowContentAccess = true
            userAgentString = (userAgentString ?: "") + USER_AGENT_SUFFIX
        }

        webView.addJavascriptInterface(SujetStoreJsBridge(this), "SujetStoreAndroid")

        webView.setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
            enqueueFileDownload(url, userAgent, contentDisposition, mimeType, null)
        }

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView,
                request: WebResourceRequest
            ): Boolean {
                val uri = request.url ?: return false
                val scheme = uri.scheme?.lowercase() ?: return false

                if (scheme != "http" && scheme != "https") {
                    return handleCustomScheme(uri)
                }

                // Allow embedded iframes (YouTube, Cloudflare Stream, PDF viewers)
                if (!request.isForMainFrame) {
                    return false
                }

                val host = uri.host?.lowercase() ?: ""
                val isSujetStore = host == "sujetstore.com" || host == "www.sujetstore.com"

                if (isSujetStore) {
                    val pathLower = uri.path?.lowercase() ?: ""
                    val isDownloadQuery = uri.getQueryParameter("download") == "1"
                    if (pathLower.endsWith(".pdf") || (pathLower.startsWith("/api/media/") && isDownloadQuery)) {
                        enqueueFileDownload(
                            uri.toString(),
                            view.settings.userAgentString,
                            null,
                            "application/pdf",
                            null
                        )
                        return true
                    }
                    if (pathLower.endsWith(".apk")) {
                        openExternalBrowser(uri)
                        return true
                    }
                    return false
                }

                // Open external links (social, Chargily checkout, etc.) in external browser
                openExternalBrowser(uri)
                return true
            }

            override fun onPageStarted(view: WebView, url: String?, favicon: Bitmap?) {
                super.onPageStarted(view, url, favicon)
                progressBar.progress = 10
                progressBar.visibility = View.VISIBLE
            }

            override fun onPageFinished(view: WebView, url: String?) {
                super.onPageFinished(view, url)
                isSplashReady = true
                swipeRefresh.isRefreshing = false
                progressBar.visibility = View.GONE
                CookieManager.getInstance().flush()
                injectClientHelpers(view)
            }

            override fun onReceivedError(
                view: WebView,
                request: WebResourceRequest,
                error: WebResourceError
            ) {
                super.onReceivedError(view, request, error)
                if (!request.isForMainFrame) return

                val code = error.errorCode
                val isConnectionFailure = code == ERROR_HOST_LOOKUP ||
                    code == ERROR_CONNECT ||
                    code == ERROR_TIMEOUT ||
                    code == ERROR_IO ||
                    !isNetworkAvailable()

                if (isConnectionFailure) {
                    lastFailedUrl = request.url?.toString() ?: BASE_URL
                    swipeRefresh.isRefreshing = false
                    progressBar.visibility = View.GONE
                    offlineOverlay.visibility = View.VISIBLE
                    isSplashReady = true
                }
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                super.onProgressChanged(view, newProgress)
                progressBar.progress = newProgress
                if (newProgress >= 45) {
                    isSplashReady = true
                }
                if (newProgress >= 100) {
                    progressBar.visibility = View.GONE
                    swipeRefresh.isRefreshing = false
                } else if (progressBar.visibility != View.VISIBLE && offlineOverlay.visibility != View.VISIBLE) {
                    progressBar.visibility = View.VISIBLE
                }
            }

            override fun onShowCustomView(view: View?, callback: CustomViewCallback?) {
                if (view == null) return
                if (customVideoView != null) {
                    callback?.onCustomViewHidden()
                    return
                }
                customVideoView = view
                customVideoCallback = callback
                fullscreenContainer.addView(
                    view,
                    FrameLayout.LayoutParams(
                        FrameLayout.LayoutParams.MATCH_PARENT,
                        FrameLayout.LayoutParams.MATCH_PARENT
                    )
                )
                fullscreenContainer.visibility = View.VISIBLE
                swipeRefresh.visibility = View.GONE
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR
                setImmersiveFullscreen(true)
            }

            override fun onHideCustomView() {
                val view = customVideoView ?: return
                fullscreenContainer.removeView(view)
                fullscreenContainer.visibility = View.GONE
                swipeRefresh.visibility = View.VISIBLE
                customVideoView = null
                customVideoCallback?.onCustomViewHidden()
                customVideoCallback = null
                requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
                setImmersiveFullscreen(false)
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback
                return try {
                    val chooserIntent = fileChooserParams?.createIntent()
                        ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                            addCategory(Intent.CATEGORY_OPENABLE)
                            type = "*/*"
                        }
                    fileChooserLauncher.launch(chooserIntent)
                    true
                } catch (_: Exception) {
                    fileUploadCallback = null
                    false
                }
            }
        }
    }

    private fun injectClientHelpers(view: WebView) {
        val script = """
            (function() {
              try {
                window.__SUJETSTORE_ANDROID_APP__ = true;
                document.documentElement.classList.add('sujetstore-android-app');

                if (!navigator.share && window.SujetStoreAndroid) {
                  navigator.share = function(data) {
                    data = data || {};
                    window.SujetStoreAndroid.share(
                      data.title || document.title || '',
                      data.text || '',
                      data.url || window.location.href
                    );
                    return Promise.resolve();
                  };
                }

                var syncTheme = function() {
                  if (!window.SujetStoreAndroid) return;
                  var attr = document.documentElement.getAttribute('data-theme');
                  var isDark = attr === 'dark' || document.documentElement.classList.contains('dark');
                  window.SujetStoreAndroid.setTheme(isDark ? 'dark' : 'light');
                };
                syncTheme();

                if (!window.__sujetstoreThemeObserverInstalled) {
                  window.__sujetstoreThemeObserverInstalled = true;
                  var observer = new MutationObserver(syncTheme);
                  observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['data-theme', 'class']
                  });
                }
              } catch (e) {}
            })();
        """.trimIndent()
        view.evaluateJavascript(script, null)
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (customVideoView != null) {
                    webView.webChromeClient?.onHideCustomView()
                    return
                }

                if (offlineOverlay.visibility == View.VISIBLE && webView.canGoBack()) {
                    offlineOverlay.visibility = View.GONE
                    webView.goBack()
                    return
                }

                if (webView.canGoBack()) {
                    webView.goBack()
                    return
                }

                val now = System.currentTimeMillis()
                if (now - lastBackPressMs < 2000L) {
                    finish()
                } else {
                    lastBackPressMs = now
                    Toast.makeText(this@MainActivity, R.string.press_back_again, Toast.LENGTH_SHORT).show()
                }
            }
        })
    }

    fun openNativeShare(title: String?, text: String?, url: String?) {
        val parts = listOfNotNull(
            title?.trim()?.takeIf { it.isNotEmpty() },
            text?.trim()?.takeIf { it.isNotEmpty() },
            url?.trim()?.takeIf { it.isNotEmpty() }
        ).distinct()

        if (parts.isEmpty()) return

        val sendIntent = Intent(Intent.ACTION_SEND).apply {
            type = "text/plain"
            if (!title.isNullOrBlank()) {
                putExtra(Intent.EXTRA_SUBJECT, title)
            }
            putExtra(Intent.EXTRA_TEXT, parts.joinToString("\n"))
        }
        startActivity(Intent.createChooser(sendIntent, getString(R.string.share_chooser)))
    }

    fun enqueueFileDownload(
        url: String,
        userAgent: String?,
        contentDisposition: String?,
        mimeType: String?,
        customTitle: String?
    ) {
        try {
            val uri = Uri.parse(url)
            val resolvedMime = mimeType?.takeIf { it.isNotBlank() }
                ?: if (url.lowercase().contains(".pdf") || url.lowercase().contains("/api/media/")) {
                    "application/pdf"
                } else {
                    "application/octet-stream"
                }
            val guessedFileName = URLUtil.guessFileName(url, contentDisposition, resolvedMime)

            val request = DownloadManager.Request(uri).apply {
                setMimeType(resolvedMime)
                val cookies = CookieManager.getInstance().getCookie(url)
                if (!cookies.isNullOrBlank()) {
                    addRequestHeader("Cookie", cookies)
                }
                if (!userAgent.isNullOrBlank()) {
                    addRequestHeader("User-Agent", userAgent)
                }
                setTitle(customTitle?.takeIf { it.isNotBlank() } ?: guessedFileName)
                setDescription(getString(R.string.app_full_name))
                setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, guessedFileName)
            }

            val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
            dm.enqueue(request)
            Toast.makeText(this, R.string.download_started, Toast.LENGTH_LONG).show()
        } catch (_: Exception) {
            Toast.makeText(this, R.string.download_failed, Toast.LENGTH_SHORT).show()
            openExternalBrowser(Uri.parse(url))
        }
    }

    private fun handleCustomScheme(uri: Uri): Boolean {
        return try {
            val intent = if (uri.scheme?.lowercase() == "intent") {
                Intent.parseUri(uri.toString(), Intent.URI_INTENT_SCHEME)
            } else {
                Intent(Intent.ACTION_VIEW, uri)
            }
            startActivity(intent)
            true
        } catch (_: Exception) {
            false
        }
    }

    private fun openExternalBrowser(uri: Uri) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, uri).apply {
                addCategory(Intent.CATEGORY_BROWSABLE)
            }
            startActivity(intent)
        } catch (_: ActivityNotFoundException) {
            // Ignore if no browser is installed
        }
    }

    fun applySystemBarsTheme(isLight: Boolean) {
        val barColor = if (isLight) Color.parseColor("#FFFFFF") else Color.parseColor("#0F172A")
        window.statusBarColor = barColor
        window.navigationBarColor = barColor
        rootContainer.setBackgroundColor(barColor)

        val controller = WindowCompat.getInsetsController(window, window.decorView)
        controller.isAppearanceLightStatusBars = isLight
        controller.isAppearanceLightNavigationBars = isLight
    }

    private fun setImmersiveFullscreen(fullscreen: Boolean) {
        val controller = WindowCompat.getInsetsController(window, window.decorView)
        if (fullscreen) {
            controller.systemBarsBehavior =
                WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            controller.hide(WindowInsetsCompat.Type.systemBars())
        } else {
            controller.show(WindowInsetsCompat.Type.systemBars())
        }
    }

    private fun isNetworkAvailable(): Boolean {
        val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val network = cm.activeNetwork ?: return false
        val caps = cm.getNetworkCapabilities(network) ?: return false
        return caps.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun registerNetworkMonitor() {
        try {
            val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            val callback = object : ConnectivityManager.NetworkCallback() {
                override fun onAvailable(network: Network) {
                    runOnUiThread {
                        if (offlineOverlay.visibility == View.VISIBLE) {
                            retryConnection()
                        }
                    }
                }
            }
            cm.registerDefaultNetworkCallback(callback)
            networkCallback = callback
        } catch (_: Exception) {
            // Safe ignore if network callback registration fails
        }
    }

    private fun unregisterNetworkMonitor() {
        val callback = networkCallback ?: return
        try {
            val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
            cm.unregisterNetworkCallback(callback)
        } catch (_: Exception) {
        }
        networkCallback = null
    }
}
