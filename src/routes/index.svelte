<script context="module" lang="ts">
	export function preload() {
		return this.fetch("/projects.json")
			.then((r) => r.json())
			.then((projects) => {
				return { projects };
			});
	}
</script>

<script lang="ts">
	import Landing from "./_landing.svelte";
	import Projects from "./_projects.svelte";
	import type { Project } from "./projects/_projects";

	export let projects: Project[];
</script>

<svelte:head>
	<title>Home · Cassidy Bandy</title>
</svelte:head>

<div class="container">
	<Landing />
	<Projects {projects} />
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-areas: "landing projects";
		column-gap: calc(var(--line-space) * 3);
	}

	@media screen and (max-width: 60em) {
		.container {
			display: flex;
			flex-direction: column;
			justify-items: center;
		}
	}
</style>
