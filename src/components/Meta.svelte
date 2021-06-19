<script lang="ts">
	import { browser } from "$app/env"
	import { onDestroy } from "svelte"

	export let title: string
	export let description: string
	export let image: string = undefined
	export let isRoot = false

	onDestroy(() => {
		if (browser) {
			/* 
        Remove meta tags on unmount to fix client-side issue where svelte:head
        appends tags on navigation and never cleans them up.
        See: https://github.com/sveltejs/sapper/issues/976 
      */
			const remove = (el: HTMLElement) => el.remove()

			document.head.querySelector("title")?.remove()
			document.head.querySelector("description")?.remove()
			document.head.querySelector("theme-color")?.remove()
			document.head.querySelectorAll('meta[property^="og:"]').forEach(remove)
			document.head.querySelectorAll('meta[name^="twitter:"]').forEach(remove)
		}
	})
</script>

<meta name="title" content={title} />
<meta name="description" content={description} />
<meta name="theme-color" content="#bd84bc" />

{#if !isRoot}
	<meta property="og:site_name" content="Cassidy Bandy" />
{/if}
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{#if image}
	<meta property="og:image" content={image} />
{/if}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
{#if image}
	<meta name="twitter:image" content={image} />
{/if}
