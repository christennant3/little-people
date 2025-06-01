import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // Important for SPA mode
			precompress: false,
			strict: true
		}),
		// Configure for static site generation
		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
	// Note: removed duplicate preprocess line
};

export default config;
