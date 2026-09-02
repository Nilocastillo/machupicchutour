// @ts-check
import { defineConfig, envField } from 'astro/config';
import node from '@astrojs/node';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://machupicchutour.com',
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [preact()],
	env: {
		schema: {
			RESEND_API_KEY: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
			CONTACT_FROM_EMAIL: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
			CONTACT_TO_EMAIL: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
