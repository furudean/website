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
	import Landing from "./_landing.svelte"
	import Work from "./_work.svelte"
	import Meta from "$components/Meta.svelte"

	export let projects: any[]
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
	<Work {projects} />
</div>

<style lang="postcss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-areas: "landing work";
		column-gap: calc(2 * var(--line-space));

		@media screen and (min-width: 45em) and (max-width: 60em) {
			grid-template-columns: 4fr 5fr;
		}

		@media screen and (max-width: 45em) {
			grid-template-columns: 1fr;
			grid-template-areas:
				"landing"
				"work";
		}
	}
</style>
