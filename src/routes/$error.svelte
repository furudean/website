<script lang="ts">
	import { dev } from "$app/env"

	export let status: number
	export let error: Error
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>Error {status}</h1>

<p>{@html error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
