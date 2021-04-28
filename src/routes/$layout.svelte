<script lang="ts">
	import Nav from "$lib/Nav.svelte"
	import { getStores } from "$app/stores"
	import LoadingBar from "./_loading-bar.svelte"
	import { rewriteFragmentLinks, updateFragmentLinkTarget } from "../lib/link"
	import { onMount, tick } from "svelte"

	import "../styles/reset.scss"
	import "../styles/global.scss"
	import "../styles/theme.scss"
	import "../styles/code.scss"

	const { page } = getStores()
	let element: HTMLElement

	onMount(() => {
		page.subscribe(() => {
			if (element) {
				// Rewrite <a> elements with a # to respect <base href="/">
				rewriteFragmentLinks(window.location.href, element)
				updateFragmentLinkTarget(window.location.href, element)
			}
		})

		navigator.serviceWorker
			.getRegistration()
			.then((registration) => registration?.unregister())
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
