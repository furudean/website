<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";

  export const preload: Preload = async function ({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`projects/${params.slug}.json`);
    const project = await res.json();

    if (res.status === 200) {
      return { project };
    } else {
      this.error(res.status, `Could not fetch ${res.url}`);
    }
  };
</script>

<script lang="ts">
  import type { Project } from "./_projects";
  import { friendlyDate } from "../../lib/dateTime";
  import { stores } from "@sapper/app";
  import Links from "./_project-links.svelte";
  import Meta from "../../components/Meta.svelte";

  const { page } = stores();
  const segments = $page.path.slice(1).split("/").slice(0, -1);

  export let project: Project;
</script>

<svelte:head>
  <title>{`${project.title} · Projects · Cassidy Bandy`}</title>
  <Meta
    title={project.title}
    description={`${project.title}, a project by Cassidy Bandy — ${project.summary}`}
    image={project.coverImageUrl}
  />
</svelte:head>

<nav aria-label="Breadcrumbs">
  {#each segments as segment, i}
    <a href={"/" + segments.slice(0, i + 1).join("/")} sapper:prefetch>
      {segment}
    </a>
    <span> / </span>
  {/each}
</nav>
<h1>
  <a href={$page.path}>{project.title}</a>
</h1>
<div class="article-info">
  <time datetime={project.date}>{friendlyDate(project.date)}</time>
  ·
  <span>{project.kind}</span>
</div>
<Links {project} />

<article class="article" class:has-tombstone={project.articleHtml}>
  {#if project.articleHtml}
    {@html project.articleHtml}
    <br />
    <Links {project} fill={true} />
  {:else}
    <p>{project.summary}</p>
  {/if}
</article>

<style lang="scss">
  nav {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--color-text-300);
  }

  nav a:hover {
    text-decoration: underline;
  }

  h1 {
    margin-bottom: 0;
  }

  .article-info {
    color: var(--color-text-300);
    margin-bottom: var(--line-space);
  }
</style>
