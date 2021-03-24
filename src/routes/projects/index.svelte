<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async function ({ fetch }) {
    const url = "/projects.json";
    const res = await fetch(url);

    if (res.ok) {
      const projects = await res.json();
      return {
        props: { projects },
      };
    } else {
      return {
        status: 500,
        error: new Error(`Could not fetch ${url}`),
      };
    }
  };
</script>

<script lang="ts">
  import type { Project } from "./_projects";

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
