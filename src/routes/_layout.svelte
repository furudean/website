<script lang="ts">
	import { onMount } from "svelte";
	import { osTheme } from "../stores/theme";
	import Nav from "../components/Nav.svelte";
	import Global from "../styles/Global.svelte";
	import Theme from "../styles/Theme.svelte";
	import Code from "../styles/Code.svelte";
	import { stores } from "@sapper/app";
	import LoadingBar from "./_loading-bar.svelte";
	import { rewriteFragmentLinks, updateFragmentLinkTarget } from "../lib/a";

	const { page } = stores();

	onMount(() => {
		// Set theme on root element
		osTheme.subscribe((theme) => {
			const root = document.querySelector("html");

			root.classList.remove("light-theme", "dark-theme");
			root.classList.add(theme + "-theme");
		});

		page.subscribe(() => {
			rewriteFragmentLinks(window.location.href);
			updateFragmentLinkTarget(window.location.href);
		});
	});
</script>

<svelte:window
	on:hashchange={() => updateFragmentLinkTarget(window.location.href)}
/>

<Global />
<Theme />
<Code />

<LoadingBar />

<div class="container">
	<Nav />
	<main>
		<slot />
	</main>
</div>

<style>
	.container {
		max-width: 60em;
		margin: 0 auto;
	}
	main {
		position: relative;
	}
</style>
