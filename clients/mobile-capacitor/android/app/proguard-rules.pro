-keepattributes *Annotation*,JavascriptInterface,Signature
-keepclassmembers class com.sujetstore.app.SujetStoreJsBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.sujetstore.app.SujetStoreJsBridge { *; }
