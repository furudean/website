<script lang="ts">
  import type { Project } from "./projects/_projects";
  import { friendlyDate } from "../lib/dateTime";
  import Icon from "$lib/Icon.svelte";
  import { mdiGithub } from "@mdi/js";

  export let projects: Project[];
</script>

<section class="projects">
  <h2>
    <a href="/projects" sveltekit:prefetch>Projects</a>
  </h2>
  {#each projects as project}
    <article class="project">
      <h3>
        <a href={"/projects/" + project.slug} sveltekit:prefetch>
          {project.title}
        </a>
        {#if project.repo}
          <a
            class="repo-link"
            href={project.repo}
            title="GitHub repository"
            target="_blank"
            rel="noopener"
          >
            <Icon path={mdiGithub} />
          </a>
        {/if}
      </h3>
      <div class="article-info">
        <time datetime={project.date}>
          {friendlyDate(project.date)}
        </time>
        ·
        <span>{project.kind}</span>
      </div>
      <p>{project.summary}</p>
      <p>
        <a
          class="text-link"
          href={"/projects/" + project.slug}
          sveltekit:prefetch
        >
          Read more
        </a>
      </p>
    </article>
  {/each}
</section>

<style lang="scss">
  .projects {
    grid-area: projects;
  }

  .project {
    border: 1px solid var(--color-text-100);
    padding: calc(var(--line-space) - 1px);
    margin-bottom: var(--line-space);
    border-radius: 1em;
    overflow: hidden; /* prevent margin collapse */

    h3 {
      margin-bottom: 0;
    }

    .repo-link :global(.svg-icon) {
      top: 0.125em; /* visual balance */
    }

    .article-info {
      color: var(--color-text-300);
      margin-bottom: calc(var(--line-space) * 0.5);
    }

    p {
      margin-bottom: calc(var(--line-space) * 0.5);
    }

    > :last-child {
      margin-bottom: 0;
    }
  }
</style>
