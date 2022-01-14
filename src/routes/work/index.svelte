<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function ({ fetch }) {
		const url = "/work.json"
		const res = await fetch(url)

		if (res.ok) {
			const data = await res.json()
			return {
				props: { projects: data.projects }
			}
		} else {
			return {
				status: 500,
				error: new Error(`Could not fetch ${url}`)
			}
		}
	}
</script>

<script lang="ts">
	import { friendlyDate } from "$lib/dateTime"
	import type { Project } from "$lib/works"

	export let projects: Project[]
</script>

<svelte:head>
	<title>Work</title>
</svelte:head>

<article class="article">
	<h1>Work</h1>
	<ul class="list">
		{#each projects as project}
			<li>
				<a href="/work/{project.slug}" class="text-link">
					{project.name}
				</a>
				<span class="quiet">- {friendlyDate(project.created, true)}</span>
			</li>
		{/each}
	</ul>
</article>

<style>
	.quiet {
		color: var(--color-text-300);
	}
</style>
