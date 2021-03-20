<script context="module" lang="ts">
  import type { Preload } from "@sapper/common";

  export const preload: Preload = async function () {
    const res = await this.fetch("/projects.json");

    if (res.status === 200) {
      const projects = await res.json();
      return { projects };
    } else {
      this.error(res.status, `Could not fetch ${res.url}`);
    }
  };
</script>

<script lang="ts">
  import type { Project } from "./projects/_projects";

  export let projects: Project[];
</script>

<svelte:head>
  <title>Projects · Cassidy Bandy</title>
</svelte:head>

<h1>Projects</h1>
<ul class="list">
  {#each projects as project}
    <li>
      <a href={"projects/" + project.slug} class="text-link">{project.title}</a>
      - {project.summary}
    </li>
  {/each}
</ul>
