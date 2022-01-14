<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async function ({ fetch }) {
		const url = "/blog.json"
		const res = await fetch(url)

		if (res.ok) {
			const { posts } = await res.json()
			return {
				props: { posts }
			}
		} else {
			return {
				status: 500,
				error: new Error(`Could not fetch ${url}`)
			}
		}
	}
</script>

<script lang="ts">
	import { friendlyDate } from "$lib/dateTime"
	export let posts: any[]
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<article class="article">
	<h1>Blog</h1>
	<ul class="list">
		{#each posts as post}
			<li>
				<a href="/blog/{post.slug}" class="text-link">
					{post.title}
				</a>
				<span class="quiet">- {friendlyDate(post.created, true)}</span>
			</li>
		{/each}
	</ul>
</article>

<style>
	.quiet {
		color: var(--color-text-300);
	}
</style>
