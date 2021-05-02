<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function ({ fetch }) {
		const url = "/projects.json"
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
	export let projects: any[]
</script>

<svelte:head>
	<title>Projects · Cassidy Bandy</title>
</svelte:head>

<h1>Projects</h1>
<ul class="list">
	{#each projects as project}
		<li>
			<a href={"projects/" + project.slug} class="text-link">
				{project.title}
			</a>
			<span class="quiet">- {friendlyDate(project.date, true)}</span>
		</li>
	{/each}
</ul>

<style>
	.quiet {
		color: var(--color-text-300);
	}
</style>
