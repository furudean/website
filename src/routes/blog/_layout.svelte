<script>
	// There's currently a bug in mdsvex which mangles script tags with lang="ts"
	// in layouts. The workaround is to just use js for now.
	// See: https://github.com/pngwn/MDsveX/issues/116

	import { friendlyDate } from "../../lib/dateTime"
	import Meta from "$components/Meta.svelte"
	import Breadcrumbs from "$components/Breadcrumbs.svelte"
	// @ts-ignore
	import { width, height, src } from "../../portrait.jpg?w=28&webp&meta"
	import { BASE_URL } from "$lib/url"

	/** @type {string} */
	export let title
	/** @type {string} */
	export let created
	/** @type {string} */
	export let updated
	/** @type {string} */
	export let summary
	/** @type {string} */
	export let coverImageUrl
	/** @type {Array<import("$lib/works").Project>} */
	export let relatedProjects
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<Meta
	{title}
	description={summary}
	image={coverImageUrl && new URL(coverImageUrl, BASE_URL).href}
/>

<article class="article has-tombstone">
	<Breadcrumbs />
	<h1>{title}</h1>
	<div class="article-info">
		<a href="/about" class="author">
			<img
				{src}
				alt="Merilynn's portrait"
				aria-hidden="true"
				style="width: {width}px; height: {height}px"
				class="portrait"
			/>
			<span>Merilynn Bandy</span>
		</a>
		<span class="separator">·</span>
		<time datetime={created}>{friendlyDate(created)}</time>
	</div>

	<slot />

	<hr />

	{#if relatedProjects}
		<h3>In this article</h3>
		<ul class="list">
			{#each relatedProjects as project}
				<li>
					<a href="/work/{project.slug}" class="text-link" sveltekit:prefetch>
						{project.name}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style lang="postcss">
	h1 {
		margin: calc(0.5 * var(--line-space)) 0;
	}

	.article-info {
		color: var(--color-text-300);
		margin-bottom: var(--line-space);
		display: flex;
		align-items: center;
	}

	.article-info > *:not(:first-child) {
		margin-left: 1ch;
	}

	.author {
		display: flex;
	}

	.author:hover * {
		text-decoration: underline;
	}

	.portrait {
		border-radius: 100%;
		margin-right: 1ch;
		align-self: center;
	}
</style>
