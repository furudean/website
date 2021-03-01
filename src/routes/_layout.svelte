<script lang="ts">
	import { onMount } from "svelte";
	import { osTheme } from "../stores/theme";
	import Nav from "../components/Nav.svelte";
	import Global from "../styles/Global.svelte";
	import Theme from "../styles/Theme.svelte";
	import { stores } from "@sapper/app";

	const { page } = stores();

	onMount(() => {
		// Set theme on root element
		osTheme.subscribe((theme) => {
			const root = document.querySelector("html");

			root.classList.remove("light-theme", "dark-theme");
			root.classList.add(theme + "-theme");
		});

		/**
		 * Rewrite hashes on anchor links to include path
		 * https://github.com/sveltejs/sapper/issues/904#issuecomment-540536561
		 */
		page.subscribe((value) => {
			document.querySelectorAll("a").forEach((a) => {
				if (a.hash && document.querySelectorAll(a.hash).length) {
					a.href = value.path + a.hash;
				}
			});
		});
	});
</script>

<Global />
<Theme />

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
