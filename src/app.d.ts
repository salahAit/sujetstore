// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('#lib/server/db/schema-pg').User | null;
			session: import('#lib/server/db/schema-pg').Session | null;
			isStaticBuild?: boolean;
			locale?: 'ar' | 'fr' | 'en';
			isMobileApp?: boolean;
			siteLockActive?: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
