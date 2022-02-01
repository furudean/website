<script>
	// There's currently a bug in mdsvex which mangles script tags with lang="ts"
	// in layouts. The workaround is to just use js for now.
	// See: https://github.com/pngwn/MDsveX/issues/116

	import Breadcrumbs from "$components/Breadcrumbs.svelte"
	import Meta from "$components/Meta.svelte"
	import Links from "./_links.svelte"
	import { friendlyDate } from "$lib/dateTime"

	/** @type {string} */
	export let name
	/** @type {string} */
	export let kind
	/** @type {string} */
	export let created
	/** @type {string} */
	export let updated
	/** @type {string} */
	export let summary
	/** @type {string} */
	export let repo = undefined
	/** @type {string} */
	export let url = undefined
	/** @type {Array<import("$lib/blog-posts").BlogPost>} */
	export let relatedPosts
</script>

<svelte:head>
	<title>{name}</title>
</svelte:head>

<Meta title={name} description={summary} />

<article class="article">
	<Breadcrumbs />
	<h1>{name}</h1>
	<div class="project-info">
		<time datetime={created}>{friendlyDate(created)}</time>
		·
		<span>{kind}</span>
	</div>

	<slot />

	<Links {repo} {url} />

	<hr />

	{#if relatedPosts}
		<h3>Written about</h3>
		<ul class="list">
			{#each relatedPosts as post}
				<li>
					<a href="/blog/{post.slug}" class="text-link">
						{post.title}
					</a>
					<span class="quiet">- {friendlyDate(post.created, true)}</span>
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	h1 {
		margin: calc(0.5 * var(--line-space)) 0;
	}

	hr {
		margin: var(--line-space) 0;
	}

	.project-info {
		color: var(--color-text-300);
		line-height: 1;
		margin-bottom: var(--line-space);
	}

	.quiet {
		color: var(--color-text-300);
	}
</style>
