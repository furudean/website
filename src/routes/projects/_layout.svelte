<script>
	// There's currently a bug in mdsvex which mangles script tags with lang="ts"
	// in layouts. The workaround is to just use js for now.
	// See: https://github.com/pngwn/MDsveX/issues/116

	import { friendlyDate } from "../../lib/dateTime"
	import { page } from "$app/stores"
	import Links from "./_project-links.svelte"
	import Meta from "$lib/Meta.svelte"

	export let title
	export let kind
	export let date
	export let summary
	export let coverImageUrl
	export let url
	export let repo

	const segments = $page.path.slice(1).split("/").slice(0, -1)
</script>

<svelte:head>
	<title>{`${title} · Projects · Cassidy Bandy`}</title>
	<Meta
		{title}
		description={`${title}, a project by Cassidy Bandy — ${summary}`}
		image={coverImageUrl}
	/>
</svelte:head>

<article class="article has-tombstone">
	<nav aria-label="Breadcrumbs">
		{#each segments as segment, i}
			<a href={"/" + segments.slice(0, i + 1).join("/")} sveltekit:prefetch>
				{segment}
			</a>
			<span> / </span>
		{/each}
	</nav>
	<h1>
		<a href={$page.path}>{title}</a>
	</h1>
	<div class="article-info">
		<time datetime={date}>{friendlyDate(date)}</time>
		·
		<span>{kind}</span>
	</div>
	<Links {repo} {url} />

	<slot />

	<hr class="article-end" />

	<Links {repo} {url} />
</article>

<style lang="postcss">
	nav {
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-300);
	}

	nav a:hover {
		text-decoration: underline;
	}

	h1 {
		margin-bottom: 0;
	}

	.article-info {
		color: var(--color-text-300);
		margin-bottom: var(--line-space);
	}

	hr {
		max-width: 100%;
		margin: var(--line-space) 0;
	}
</style>
