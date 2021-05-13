<script lang="ts" context="module">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async ({ page, fetch }) => {
		const url = `/work/${page.params.slug}.json`
		const res = await fetch(url)

		if (res.ok) {
			return {
				props: {
					project: await res.json()
				}
			}
		}

		return {
			status: res.status,
			error: new Error(`Could not fetch ${url}`)
		}
	}
</script>

<script lang="ts">
	import type { Project } from "../_projects"
	import Breadcrumbs from "$lib/Breadcrumbs.svelte"
	import Links from "./_links.svelte"

	export let project: Project
</script>

<svelte:head>
	<title>{project.name} · Work · Cassidy Bandy</title>
</svelte:head>

<article class="article">
	<Breadcrumbs />
	<h1>{project.name}</h1>

	<p>{project.summary}</p>

	<hr class="bold" />

	<Links repo={project.repo} url={project.repo} />
</article>

<style>
	h1 {
		margin-top: 0.2em;
	}

	hr {
		margin: var(--line-space) 0;
	}
</style>
