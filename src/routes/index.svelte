<script lang="ts">
	import Landing from "./_landing.svelte"
	import Projects from "./_projects.svelte"
	import Meta from "$lib/Meta.svelte"
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
	<Projects />
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
