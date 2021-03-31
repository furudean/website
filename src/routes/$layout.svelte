<script lang="ts">
	import { osTheme } from "../stores/theme"
	import Nav from "$lib/Nav.svelte"
	import Reset from "../styles/Reset.svelte"
	import Global from "../styles/Global.svelte"
	import Theme from "../styles/Theme.svelte"
	import Code from "../styles/Code.svelte"
	import { page } from "$app/stores"
	import LoadingBar from "./_loading-bar.svelte"
	import { rewriteFragmentLinks, updateFragmentLinkTarget } from "../lib/link"
	import { browser } from "$app/env"
	import { onMount } from "svelte"

	let element: HTMLElement

	onMount(() => {
		if (!browser) return

		// Set theme on root element
		osTheme.subscribe((theme) => {
			const root = document.querySelector(":root")

			root.classList.remove("light-theme", "dark-theme")
			root.classList.add(theme + "-theme")
		})

		// panic, this doesn't work right now
		// See: https://github.com/sveltejs/kit/issues/649
		// page.subscribe(() => {
		// Rewrite <a> elements with # to respect <base href="/">
		// rewriteFragmentLinks(window.location.href, element);
		// updateFragmentLinkTarget(window.location.href, element);
		// });
	})
</script>

<svelte:window
	on:hashchange={() => updateFragmentLinkTarget(window.location.href, element)}
/>

<Reset />
<Global />
<Theme />
<Code />

<LoadingBar />

<div class="container" bind:this={element}>
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
