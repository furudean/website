const sveltePreprocess = require("svelte-preprocess")
const vercel = require("@sveltejs/adapter-vercel")
const { mdsvex } = require("mdsvex")
const mdsvexConfig = require("./mdsvex.config.cjs")
const { imagetools } = require("vite-imagetools")

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// an array of file extensions that should be treated as Svelte components
	extensions: [".svelte", ".svelte.md"],

	kit: {
		adapter: vercel(),
		prerender: {
			enabled: true,
			pages: ["*"],
			crawl: true
		},
		target: "body",
		vite: {
			plugins: [imagetools()],
			json: {
				namedExports: true
			}
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: [sveltePreprocess(), mdsvex(mdsvexConfig)]
}
