import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.sujetstore.app',
	appName: 'SujetStore',
	webDir: '../../static',
	server: {
		url: 'https://sujetstore.com',
		cleartext: false,
		androidScheme: 'https',
		allowNavigation: ['sujetstore.com', 'www.sujetstore.com']
	},
	android: {
		appendUserAgent: 'SujetStoreAndroidApp/1.0.0',
		backgroundColor: '#0F172A',
		allowMixedContent: false,
		captureInput: true,
		webContentsDebuggingEnabled: false
	}
};

export default config;
