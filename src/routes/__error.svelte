<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		}
	}
</script>

<script lang="ts">
	import { dev } from "$app/env"

	export let status: number
	export let error: Error
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1>{status}</h1>

{#if error && error.message}
	<p>{error.message}</p>
{/if}

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}
