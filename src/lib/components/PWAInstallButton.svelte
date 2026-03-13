<script lang="ts">
	import { onMount } from 'svelte';
	import { MonitorDown } from 'lucide-svelte';

	let deferredPrompt: any = $state(null);
	let showButton = $state(false);
	let installText = $state('Install');
	let isIOS = $state(false);

	onMount(() => {
		// Set language
		const lang = window.navigator.language || 'en';
		if (lang.startsWith('ar')) {
			installText = 'تثبيت';
		} else if (lang.startsWith('fr')) {
			installText = 'Installer';
		} else {
			installText = 'Install';
		}

		// Detect iOS (where we can't show a programmatic install trigger)
		const userAgent = window.navigator.userAgent.toLowerCase();
		isIOS = /iphone|ipad|ipod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

		if (isIOS) {
			// iOS doesn't support beforeinstallprompt
		}

		window.addEventListener('beforeinstallprompt', (e) => {
			// We intentionally do NOT call e.preventDefault() here
			// By not calling it, we allow Chrome to show its native "Install" icon in the search bar/omnibox
			// while still capturing the event to power our custom button.
			deferredPrompt = e;
			showButton = true;
		});

		window.addEventListener('appinstalled', () => {
			showButton = false;
			deferredPrompt = null;
		});

		if (window.location.search.includes('debug_pwa=true')) {
			showButton = true;
		}
	});

	async function installApp() {
		if (deferredPrompt) {
			deferredPrompt.prompt();
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				showButton = false;
			}
			deferredPrompt = null;
		}
	}
</script>

{#if showButton}
	<!-- Google-style blue pill button -->
	<button
		onclick={installApp}
		class="flex items-center gap-1.5 rounded-full bg-[#0b57d0] px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0842a0] hover:shadow-md active:bg-[#0d3b85]"
		aria-label={installText}
		title={installText}
	>
		<!-- Monitor Down icon (closest to Chrome's native install icon) -->
		<MonitorDown size={18} strokeWidth={2.5} class="opacity-90" />
		<span>{installText}</span>
	</button>
{/if}
