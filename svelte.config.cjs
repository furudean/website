const sveltePreprocess = require('svelte-preprocess');
const vercel = require('@sveltejs/adapter-vercel');
const pkg = require('./package.json');
const autoprefixer = require('autoprefixer');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  // an array of file extensions that should be treated as Svelte components
  extensions: [".svelte"],

  kit: {
    adapter: vercel(),
    prerender: {
      enabled: true,
      pages: ["*"],
      crawl: true,
    },
    target: "body",
    vite: {
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {})
      },
      resolve: {
        alias: {
          // fix IIFE imports
          'marked': 'marked/lib/marked.esm.js',
        }
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