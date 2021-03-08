<script context="module" lang="ts">
  import marked from "marked";
  import { renderer, highlight } from "../../lib/markdown";
  import type { Preload } from "@sapper/common";

  const markedOptions = {
    renderer,
    highlight,
    smartypants: true,
  };

  export const preload: Preload = async function ({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`projects/${params.slug}.json`);
    const project = await res.json();

    let html: string | undefined;

    // fetch and parse markdown, if any
    if (project.articleUrl) {
      const article = await this.fetch(project.articleUrl);
      if (article.status === 200) {
        html = marked(await article.text(), markedOptions);
      } else {
        this.error(
          500,
          `Expected status 200 from <code>${article.url}</code>, got ${article.status}`
        );
      }
    }

    if (res.status === 200) {
      return { project, articleHtml: html };
    } else {
      this.error(res.status, project.message);
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

  export let project: Project;
  export let articleHtml: string | undefined;
</script>

<svelte:head>
  <title>{`${project.title} · Projects · Cassidy Bandy`}</title>
  <Meta
    title={project.title}
    description={`${project.title}, a project by Cassidy Bandy — ${project.summary}`}
    image={project.coverImageUrl}
  />
</svelte:head>

<nav aria-label="Breadcrumb">
  <a href="/projects">Projects</a> /
</nav>
<h1>
  <a href={$page.path}>{project.title}</a>
</h1>
<div class="article-info">
  <time datetime={project.date}>{friendlyDate(project.date)}</time>
</div>
<Links {project} />

<article class="article" class:has-tombstone={articleHtml}>
  {#if articleHtml}
    {@html articleHtml}
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
