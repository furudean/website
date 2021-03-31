<script context="module" lang="ts">
	import Meta from "$lib/Meta.svelte"
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function ({ fetch }) {
		const url = "/projects.json"
		const res = await fetch(url)

		if (res.ok) {
			const projects = await res.json()
			return {
				props: {
					projects
				}
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
	import Landing from "./_landing.svelte"
	import Projects from "./_projects.svelte"
	import type { Project } from "./projects/_projects"

	export let projects: Project[]
</script>

<svelte:head>
	<title>Home · Cassidy Bandy</title>
	<Meta
		title="Cassidy Bandy"
		description="Cassidy Bandy is a full-stack engineer based in UT, USA."
		image="/embed.png"
		isRoot={true}
	/>
</svelte:head>

<div class="container">
	<Landing />
	<Projects {projects} />
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "landing projects";
		column-gap: calc(2 * var(--line-space));

		@media screen and (min-width: 45em) and (max-width: 60em) {
			grid-template-columns: 4fr 5fr;
		}

		@media screen and (max-width: 45em) {
			grid-template-columns: 1fr;
			grid-template-areas:
				"landing"
				"projects";
		}
	}
</style>
