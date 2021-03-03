<script context="module" lang="ts">
  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`projects/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { project: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script lang="ts">
  import { mdiGithub, mdiLink } from "@mdi/js";
  import type { Project } from "./_projects";
  import { relativeDate } from "../../lib/dateTime";
  import Icon from "../../components/Icon.svelte";

  export let project: Project;

  const title = `${project.title} · Projects · Cassidy Bandy`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<nav aria-label="Breadcrumb">
  <a href="/projects">Projects</a> /
</nav>
<h1>{project.title}</h1>
<div class="article-info">
  <time datetime={project.date}>{relativeDate(new Date(project.date))}</time>
</div>

<p>{project.summary}</p>

<div class="links">
  {#if project.link}
    <a class="link-button" href={project.link} target="_blank" rel="noopener">
      <Icon path={mdiLink} size="1.5em" />
      <span>Visit project</span>
    </a>
  {/if}
  {#if project.repo}
    <a
      class="link-button"
      href={project.repo}
      target="_blank"
      rel="noopener"
      title="GitHub repository"
    >
      <Icon path={mdiGithub} size="1.5em" />
      <span>GitHub repo</span>
    </a>
  {/if}
</div>

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

  .links {
    display: flex;
    flex-wrap: wrap;
    margin-top: -2em;
  }

  .links > * {
    margin-top: 2em;
    margin-right: 2em;
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    background: var(--color-secondary-400);
    color: var(--color-secondary-400-text);
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 600;
    line-height: 3;
    letter-spacing: 0.1em;
    padding: 0 2em;
    border-radius: 0.5em;

    span {
      margin-left: 1em;
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
