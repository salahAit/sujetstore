import adapter from '@sveltejs/adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			preprocess: vitePreprocess()
		})
	],
	server: {
		fs: {
			// السماح بالوصول لملفات قاعدة البيانات
			allow: ['.']
		}
	},
	// إعدادات التبعيات
	optimizeDeps: {
		// منع Vite من محاولة معالجة bun و bun:sqlite
		exclude: ['bun', 'bun:sqlite']
	},
	build: {
		sourcemap: false,
		rolldownOptions: {
			// إخبار Rolldown بأن bun و bun:sqlite خارجية
			external: ['bun', 'bun:sqlite']
		}
	}
});
