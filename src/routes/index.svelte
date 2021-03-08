<script context="module" lang="ts">
	import type { Preload } from "@sapper/common";
	import Meta from "../components/Meta.svelte";

	export const preload: Preload = async function (page) {
		return this.fetch("/projects.json")
			.then((r) => r.json())
			.then((projects) => {
				return { projects };
			});
	};
</script>

<script lang="ts">
	import Landing from "./_landing.svelte";
	import Projects from "./_projects.svelte";
	import type { Project } from "./projects/_projects";

	export let projects: Project[];
</script>

<svelte:head>
	<title>Home · Cassidy Bandy</title>
	<Meta
		title="Cassidy Bandy"
		description="Cassidy Bandy is a full-stack engineer based in UT, USA."
		image="/embed.jpg"
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
		column-gap: calc(var(--line-space) * 2);
	}

	@media screen and (max-width: 45em) {
		.container {
			grid-template-columns: 1fr;
			grid-template-areas:
				"landing"
				"projects";
		}
	}
</style>
