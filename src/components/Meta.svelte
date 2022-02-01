<script lang="ts">
	export let title: string = undefined
	export let description: string = undefined
	export let image: string = undefined
	export let isRoot = false

	$: any = (title ?? description ?? image) !== undefined
</script>

<svelte:head>
	<!-- Regular Meta -->
	{#if title}
		<meta name="title" content={title} />
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}

	<meta name="theme-color" content="#bd84bc" />

	<!-- OpenGraph -->
	{#if any}
		{#if !isRoot}
			<meta property="og:site_name" content="Merilynn Bandy" />
		{/if}
		<meta property="og:type" content="website" />
	{/if}
	{#if title}
		<meta property="og:title" content={title} />
	{/if}
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
	{/if}

	<!-- Twitter -->
	{#if any}
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	{#if title}
		<meta name="twitter:title" content={title} />
	{/if}
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}
</svelte:head>
