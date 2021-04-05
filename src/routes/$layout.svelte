<script lang="ts">
	import { osTheme } from "../stores/theme"
	import Nav from "$lib/Nav.svelte"
	import { getStores } from "$app/stores"
	import LoadingBar from "./_loading-bar.svelte"
	import { rewriteFragmentLinks, updateFragmentLinkTarget } from "../lib/link"
	import { onMount } from "svelte"

	import "../styles/reset.scss"
	import "../styles/global.scss"
	import "../styles/theme.scss"
	import "../styles/code.scss"

	const { page } = getStores()
	let element: HTMLElement

	onMount(() => {
		osTheme.subscribe((theme) => {
			// Set theme on root element
			const root = document.querySelector(":root")

			root.classList.remove("light-theme", "dark-theme")
			root.classList.add(theme + "-theme")
		})

		page.subscribe(() => {
			// Rewrite <a> elements with a # to respect <base href="/">
			rewriteFragmentLinks(window.location.href, element)
			updateFragmentLinkTarget(window.location.href, element)
		})
	})
</script>

<svelte:window
	on:hashchange={() => updateFragmentLinkTarget(window.location.href, element)}
/>

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
