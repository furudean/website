const sveltePreprocess = require('svelte-preprocess');
const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // an array of file extensions that should be treated as Svelte components
  extensions: [".svelte"],

  kit: {
    adapter: node(),
    prerender: {
      enabled: true,
      pages: ["*"],
      crawl: true,
    },
    target: "body",
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      }
    }
  },

  // options passed to svelte.preprocess (https://svelte.dev/docs#svelte_preprocess)
  preprocess: sveltePreprocess({
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  }),
};