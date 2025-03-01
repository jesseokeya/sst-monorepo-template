/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'sst-monorepo-template',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			protect: ['production'].includes(input?.stage),
			home: 'aws',
		};
	},
	async run() {
		const { website, api } = await import('./stacks');

		return {
			websiteUrl: website.url,
			environment: $app.stage,
			apiUrl: api.url,
		};
	},
});
