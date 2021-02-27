<script lang="ts">
	import { onMount } from "svelte";
	import Nav from "../components/Nav.svelte";
	import Global from "../styles/Global.svelte";
	import Theme from "../styles/Theme.svelte";

	export let segment: string;

	onMount(() => {
		// rewrite hashes on anchor links
		// https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
		document.querySelectorAll("a").forEach((a) => {
			if (!a.hash || !document.querySelectorAll(a.hash).length) return;
			a.href = window.location.pathname + a.hash;
		});
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
		padding: 2.5em;
	}
</style>
