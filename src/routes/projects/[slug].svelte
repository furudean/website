<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function ({ fetch, page }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const url = `/projects/${page.params.slug}.json`
		const res = await fetch(url)

		if (res.status === 200) {
			const project = await res.json()
			return {
				props: {
					project
				}
			}
		} else {
			return {
				status: res.status,
				error: new Error(`Could not fetch ${url}`)
			}
		}
	}
</script>

<script lang="ts">
	import type { Project } from "./_projects"
	import { friendlyDate } from "../../lib/dateTime"
	import { page } from "$app/stores"
	import Links from "./_project-links.svelte"
	import Meta from "$lib/Meta.svelte"

	const segments = $page.path.slice(1).split("/").slice(0, -1)

	export let project: Project
</script>

<svelte:head>
	<title>{`${project.title} · Projects · Cassidy Bandy`}</title>
	<Meta
		title={project.title}
		description={`${project.title}, a project by Cassidy Bandy — ${project.summary}`}
		image={project.coverImageUrl}
	/>
</svelte:head>

<nav aria-label="Breadcrumbs">
	{#each segments as segment, i}
		<a href={"/" + segments.slice(0, i + 1).join("/")} sveltekit:prefetch>
			{segment}
		</a>
		<span> / </span>
	{/each}
</nav>
<h1>
	<a href={$page.path}>{project.title}</a>
</h1>
<div class="article-info">
	<time datetime={project.date}>{friendlyDate(project.date)}</time>
	·
	<span>{project.kind}</span>
</div>
<Links {project} />

<article class="article" class:has-tombstone={project.articleHtml}>
	{#if project.articleHtml}
		{@html project.articleHtml}
		<br />
		<Links {project} fill={true} />
	{:else}
		<p>{project.summary}</p>
	{/if}
</article>

<style lang="scss">
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
</style>
