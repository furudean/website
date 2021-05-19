<script>
	import Breadcrumbs from "$lib/Breadcrumbs.svelte"
	import Links from "./_links.svelte"
	import { friendlyDate } from "$lib/dateTime"

	export let name
	export let kind
	export let date
	export let summary
	export let repo = undefined
	export let url = undefined
	export let relatedPosts
</script>

<svelte:head>
	<title>{name} · Work · Cassidy Bandy</title>
</svelte:head>

<article class="article">
	<Breadcrumbs />
	<h1>{name}</h1>
	<div class="project-info">
		<time datetime={date}>{friendlyDate(date)}</time>
		·
		<span>{kind}</span>
	</div>

	<slot />

	<Links {repo} {url} />

	{#if relatedPosts}
		<hr />

		<h3>Written about</h3>
		<ul class="list">
			{#each relatedPosts as post}
				<li>
					<a href={"/blog/" + post.slug} class="text-link">
						{post.title}
					</a>
					<span class="quiet">- {friendlyDate(post.date, true)}</span>
				</li>
			{/each}
		</ul>
	{/if}
</article>

<style>
	h1 {
		margin: 0.2em 0;
	}

	hr {
		margin: var(--line-space) 0;
	}

	.project-info {
		color: var(--color-text-300);
		margin-bottom: var(--line-space);
	}

	.quiet {
		color: var(--color-text-300);
	}
</style>
