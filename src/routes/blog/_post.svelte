<script>
	// There's currently a bug in mdsvex which mangles script tags with lang="ts"
	// in layouts. The workaround is to just use js for now.
	// See: https://github.com/pngwn/MDsveX/issues/116

	import { friendlyDate } from "../../lib/dateTime"
	import Meta from "$lib/Meta.svelte"
	import Breadcrumbs from "$lib/Breadcrumbs.svelte"
	import { width, height, src } from "../../portrait.jpg?w=28&webp&meta"

	export let title
	export let date
	export let summary
	export let coverImageUrl
</script>

<svelte:head>
	<title>{`${title} · Projects · Cassidy Bandy`}</title>
	<Meta
		{title}
		description={summary}
		image={new URL(coverImageUrl, "https://cass.moe").href}
	/>
</svelte:head>

<article class="article has-tombstone">
	<Breadcrumbs />
	<h1>{title}</h1>
	<div class="article-info">
		<a href="/about" class="author">
			<img
				{src}
				alt="Cassidy's portrait"
				aria-hidden="true"
				style="width: {width}px; height: {height}px"
				class="portrait"
			/>
			<span>Cassidy Bandy</span>
		</a>
		<span class="separator">·</span>
		<time datetime={date}>{friendlyDate(date)}</time>
	</div>

	<slot />
</article>

<style lang="postcss">
	h1 {
		margin: 0.2em 0;
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
