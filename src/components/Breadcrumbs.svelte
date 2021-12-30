<script lang="ts">
	import { page } from "$app/stores"

	$: segments = $page.url.pathname.slice(1).split("/").slice(0, -1)
</script>

<nav class="breadcrumbs" aria-label="Breadcrumbs">
	{#each segments as segment, i}
		<a href={"/" + segments.slice(0, i + 1).join("/")} sveltekit:prefetch>
			{segment}
		</a>
		<span> / </span>
	{/each}
</nav>

<style>
	.breadcrumbs {
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		line-height: 1;
		color: var(--color-text-300);
	}

	.breadcrumbs a:hover {
		text-decoration: underline;
	}
</style>
