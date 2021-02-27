<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { osTheme } from "../stores/theme";
	import Nav from "../components/Nav.svelte";
	import Global from "../styles/Global.svelte";
	import Theme from "../styles/Theme.svelte";

	export let segment: string;

	onMount(() => {
		// rewrite hashes on anchor links
		// https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
		document.querySelectorAll("a").forEach((a) => {
			if (a.hash && document.querySelectorAll(a.hash).length) {
				a.href = window.location.pathname + a.hash;
			}
		});

		// Set theme on root element
		const unsubscribe = osTheme.subscribe((theme) => {
			const root = document.querySelector("html");

			root.classList.remove("light-theme", "dark-theme");
			root.classList.add(theme + "-theme");
		});
		onDestroy(unsubscribe);
	});
</script>

<Global />
<Theme />
<!-- <Nav {segment} /> -->

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		padding: 3em;
	}
</style>
