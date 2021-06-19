import sveltePreprocess from "svelte-preprocess"
import vercel from "@sveltejs/adapter-vercel"
import mdsvexPkg from "mdsvex"
const { mdsvex } = mdsvexPkg
import mdsvexConfig from "./mdsvex.config.js"
import viteImagetoolsPkg from "vite-imagetools"
const { imagetools } = viteImagetoolsPkg
import path from "path"

/** @type {import('@sveltejs/kit').Config} */
export default {
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
			},
			resolve: {
				alias: {
					$components: path.resolve("./src/components"),
					$lib: path.resolve("./src/lib")
				}
			}
		}
	},

	// options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
	preprocess: [
		mdsvex(mdsvexConfig),
		sveltePreprocess({ postcss: true, typescript: true })
	]
}
