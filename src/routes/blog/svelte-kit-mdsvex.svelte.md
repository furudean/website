---
title: So I tried out MDSveX on Svelte Kit
date: 2021-05-19T00:00:00 # todo adjust this date
summary: And not too surprisingly I really like it
relatedProjectSlugs: [portfolio-site]
---

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

<script>
  import Counter from "$lib/Counter.svelte"
</script>

A lot has happened since my last post about this site. I spent a lot of time
making this place pretty and neat, and not enough time writing about my
discoveries. So without further ado, here is my experience with Svelte Kit +
MDSvex.

The Markdown processor previously in use, `marked`, was something I wanted to
replace almost immediately after it was integrated -- not just because it has
some incompatibilities with Vite's ESM-first world, making updating to Svelte
Kit problematic -- but also because the API isn't perfect. It's possible to hook
into its renderer to do _some_ custom element rendering, but with its simplicity
it's also quite limiting.

## Enter MDSveX

MDSveX is Svelte in Markdown. It allows you to write Markdown files that contain
Svelte components. It's also so much more, and it integrates really nicely with
Svelte Kit.

MDSveX comes batteries included:

- A code highlighter is used by default, supporting most languages out of the
  box.
- It supports the [remark](https://github.com/remarkjs/remark) and
  [rehype](https://github.com/rehypejs/rehype) plugins ecosystems out of the
  box, all you need to do is add them to the config.
- Front-matter is automatically parsed (more on this later)

A typical MDSveX component is defined with the `.svx` extension. It primarily
contains Markdown, but it also allows all the Svelte syntax like `<script>`
blocks and `{curly_braces}`.

### my-cool-counter.svx

```markdown
---
title: My cool counter
date: 2021-05-20
summary: My cool counter I made
---

<script>
  import Count from "./Count.svelte"
</script>

# {title}

Ever want to increment a number? Now you can!

<Counter />
```

### Result

> **My cool counter**
>
> Ever want to increment a number? Now you can!
>
> <Counter />

Pretty neat, right? Note how the `{title}` was referenced in the markup. The
data defined in the front matter can also be accessed as variables in the
component.

Because Svelte Kit renders components in `src/routes` as pages, this file would
be rendered as a page as well. For example, if you have a file at
`src/routes/blog/my-cool-counter.svx` this would result as a page at
`/blog/my-cool-counter`.

## Configuration and plugins

For Svelte Kit, MDSveX plugs in as a preprocessor. MDSveX then transforms all
`.svx` files to regular components.

Here's a minimal example:

```javascript
/* svelte.config.js */

import { mdsvex } from "mdsvex"

/** @type {import('@sveltejs/kit').Config} */
export default {
	// Pick up both .svelte and .svx files
	extensions: [".svelte", ".svx"],

	preprocess: [
		mdsvex({
			layout: {
				blog: "./path/to/blog/layout.svelte"
			}
		}),
		sveltePreprocess()
	]
}
```

You can further enhance your output by adding
[plugins](https://mdsvex.pngwn.io/docs#remarkplugins--rehypeplugins). MDSveX
supports plugins from both the remark and rehype formats.

For example, here's a sample of what is added to this blog:

```javascript
/* svelte.config.js */

import { mdsvex } from "mdsvex"
import abbr from "remark-abbr"
import urls from "rehype-urls"
import slug from "rehype-slug"
import autoLinkHeadings from "rehype-autolink-headings"
import addClasses from "rehype-add-classes"

function processUrl(url, node) {
	if (node.tagName === "a") {
		node.properties.class = "text-link"

		if (!url.href.startsWith("/")) {
			// is external link
			node.properties.target = "_blank"
			node.properties.rel = "noopener"
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: [".svelte", ".svx"],

	preprocess: mdsvex({
		plugins: {
			remarkPlugins: [abbr], // adds support for footnote-like abbreviations
			rehypePlugins: [
				figure, // convert images into <figure> elements
				[urls, processUrl], // adds rel and target to <a> elements
				slug, // adds slug to <h1>-<h6> elements
				[autoLinkHeadings, { behavior: "wrap" }], // adds a <a> around slugged <h1>-<h6> elements
				[addClasses, { "ul,ol": "list" }] // add classes to these elements
			]
		}
	})
}
```

## Layouts

Just like how `__layout.svelte` wraps around Svelte Kit pages, MDSveX has a way
to define layouts for `.svx` files. These are normal Svelte components
with a `<slot>`. The slot being where the article goes.

```svelte
<!-- src/routes/blog/layout.svelte -->
<script>
	// These props get filled in from the page's front matter
	export let title
	export let coverImageUrl
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:image" content={coverImageUrl} />
</svelte:head>

<article>
	<h1>{title}</h1>
	<slot />
	<a href="/blog">Back to blog index</a>
</article>
```

```javascript
/* svelte.config.js */

import { mdsvex } from "mdsvex"

/** @type {import('@sveltejs/kit').Config} */
export default {
	extensions: [".svelte", ".svx"],

	preprocess: mdsvex({
		// This is where the layouts are defined
		layout: {
			blog: "./src/routes/blog/layout.svelte",
			projects: "./src/routes/projects/layout.svelte"
		}
	})
}
```

MDSveX will try to guess which layout should be used based on the filename. If
you have a a blog post at `src/routes/blog/my-post.svx`, this would use the
`blog` layout because the string `blog` exists in the filename.

You can also force the layout by defining it in the front matter:

```markdown
---
layout: article
title: Article layout example
coverImageUrl: https://example.com/path/to/my/image.png
---

I will always use the `article` layout!
```

Despite having a lot in common, MDSveX layouts currently work as a separate
system from Svelte Kit's own `__layout.svelte`. As I understand this is due to
technical limitation. It would be cool if MDSveX and Svelte Kit's layouts could
be unified in the future. 🐧

## Rendering a list of blog posts

In order for users to find your blog post, let's provide a list of the posts on
our site. By utilizing Vite's
[`import.meta.glob`](https://vitejs.dev/guide/features.html#glob-import), we can
automatically grab all the `.svx` files in the current directory, and by
importing them we can collect metadata. We can then serve this data as an API
using a [Svelte Kit endpoint](https://kit.svelte.dev/docs#routing-endpoints).

```js
/* src/routes/blog/posts.json.js */

import pMap from "p-map"
import { basename } from "path"

export async function get() {
	// Import all .svx files in the directory
	const modules = import.meta.glob("./*.svx")

	// Map over promises
	const posts = await pMap(
		Object.entries(modules),
		async function ([filename, module]) {
			// MDSveX adds the front matter to `metadata` for each component
			const { metadata } = await module()

			return {
				title: metadata.title,
				date: new Date(metadata.date),
				summary: metadata.summary,
				slug: basename(filename, ".svx") // generate a slug we can link to
			}
		}
	)

	// Sort posts by descending date
	posts.sort((a, b) => (a.date > b.date ? -1 : 1))

	return {
		body: { posts }
	}
}
```

On requesting `GET /blog/posts.json` it would return this JSON:

```json
{
	"posts": [
		{
			"title": "So I tried out MDSveX on Svelte Kit",
			"date": "2021-05-19T00:00:00.000Z",
			"summary": "And not too surprisingly I really like it",
			"slug": "svelte-kit-mdsvex"
		},
		{
			"title": "Crafting the portfolio site",
			"date": "2021-02-26T00:00:00.000Z",
			"summary": "Updated portfolio website for 2021. Built with Sapper and Svelte.",
			"slug": "portfolio-site-2021"
		},
		{
			"title": "Reimagining Type Kana",
			"date": "2020-08-02T00:00:00.000Z",
			"summary": "A quiz app to help you learn hiragana and katakana, the Japanese syllabaries.",
			"slug": "type-kana"
		}
	]
}
```

The data could then be fetched in a [loading
function](https://kit.svelte.dev/docs#loading), and provided to a page to render
this as a list of blog posts.

## Pain points

### TypeScript

If you're familiar working with TypeScript in Svelte, you'll unfortunately have
to skip it when it comes to the MDSveX parts of your application. MDSveX does
not play nice with svelte-preprocess, and will break your whole app if it has to
process a different language in `<script>` tags. This is tracked in
[issue #116](https://github.com/pngwn/MDsveX/issues/116).

### Loading

[`load`](https://kit.svelte.dev/docs#loading) can be really useful for fetching
additional content before component render time. Sometimes, there's also a case
for wanting to do this in a MDSveX layout. Unfortunately, load is only supported
in pages that define a page. This means that if you want to fetch some data for
_each_ blog post you'd have to do something like this inside each `.svx` file:

```svelte
<!-- src/routes/blog/my-post.svx -->
<script context="module">
	import { load } from "./_load"
	export { load }
</script>
```

```javascript
/* src/routes/blog/_load.ts */
export async function load({ fetch, page }) {
	// /related.json is an endpoint that returns all related blog posts/projects
	const url = page.path + "/related.json"
	const res = await fetch(url)

	if (res.ok) {
		const { projects } = await res.json()

		return {
			props: {
				relatedProjects: projects
			}
		}
	} else {
		return {
			status: res.status,
			error: new Error("Failed to fetch " + url)
		}
	}
}
```

```svelte
<!-- src/routes/blog/_layout.svelte -->
<script>
	export let relatedProjects
</script>

<slot />

{#each relatedPosts as post}
	<li>
		<a href={"/blog/" + post.slug} class="text-link">
			{post.title}
		</a>
		<span class="quiet">- {friendlyDate(post.date, true)}</span>
	</li>
{/each}
```

All of that is kind of roundabout, but it achieves the desired effect.

## That's a wrap

MDSveX helps bridge the gap between a simple personal blog and full blown CMS
powered website. It makes writing new blog posts easy without having to add a
complex blog writing system to your application. For my use case it's perfect!

The source code for the site is available on GitHub, linked below. Check it out
if you want to learn more.

That's all for now!

<!-- prettier-ignore  -->
*[CMS]: Content management system
