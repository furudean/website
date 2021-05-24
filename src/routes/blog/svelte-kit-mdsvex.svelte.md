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
- It supports the powerful [remark](https://github.com/remarkjs/remark) and
  [rehype](https://github.com/rehypejs/rehype) plugins ecosystems out of the box,
  all you need to do is add them to the config.
- Front-matter is automatically parsed (more on this later)

A typical MDSveX component is defined with the `.svx` extension. It primarily
contains Markdown, but it also allows all the Svelte syntax like `<script>`
blocks and `{curly_braces}`.

### counter.svx

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

Pretty neat, right? Note how the `{title}` in front matter was referenced in the
markup. This is simply exposed as normal Svelte component prop in MDSveX.

Because Svelte Kit renders components in `/src/routes` as pages, this file would
be rendered as a page. For example, if you have a file at
`/src/routes/blog/my-cool-counter.svx` this would result as a page at
`/blog/my-cool-counter`.

## Layouts

Just like how `__layout.svelte` wraps around Svelte Kit pages, MDSveX has a way
to define layouts for `.svx` files. These are normal Svelte components
with a `<slot>`, the slot being where the article goes.

You can define them like this:

```javascript
mdsvex({
	layout: {
		blog: "./path/to/blog/layout.svelte",
		article: "./path/to/article/layout.svelte",
		_: "./path/to/fallback/layout.svelte"
	}
})
```

MDSveX will try to guess which layout should be used based on the filename.
If you have a a blog post at `/src/routes/blog/my-post.svx`, this would use the
`blog` layout because the string `blog` exists in the filename.

If this guess is wrong for whatever reason, you can always force the layout by
defining it in the front matter:

```markdown
---
layout: article
---
```

MDSveX layouts currently work as a separate system from Svelte Kit's
`__layout.svelte`, as I understand due to technical limitations. It would be
fantastic if these could be unified one day. 🐧

## Rendering a list of blog posts

In order for users to find your blog post, it would be useful to have a list of
the posts somewhere on your site. By utilizing Vite's
[`import.meta.glob`](https://vitejs.dev/guide/features.html#glob-import), we can
automatically grab all the `.svx` files in the current directory. We can then
serve this data as an API using a [Svelte Kit
endpoint](https://kit.svelte.dev/docs#routing-endpoints).

```js
import pMap from "p-map"
import { basename } from "path"

export async function get() {
	// Vite provides a function to import files with a glob
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
		status: 200,
		body: { posts }
	}
}
```

If you request this endpoint, say from a [loading
function](https://kit.svelte.dev/docs#loading) in one of your pages, you'd get
something like this:

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

## Plugins

Fuck!

## Some caveats

- MDSvex does not yet support TypeScript inside layouts
- loading additional content for layout
- interopt with `__layout.svelte`

Bye
