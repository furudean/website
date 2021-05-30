---
name: Portfolio Site
date: 2021-02-26T00:00:00
kind: Website
summary: Updated portfolio website for 2021. Built with Svelte Kit.
repo: https://github.com/c-bandy/website
---

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

{summary}

Initially built with [Sapper](https://sapper.svelte.dev/), now uses [Svelte
Kit](https://kit.svelte.dev/) to handle routing and server-rendering.
