<script lang="ts">
  import type { Project } from "./_projects";
  import Icon from "../../components/Icon.svelte";
  import { mdiGithub, mdiLink } from "@mdi/js";

  export let project: Project;
</script>

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
  .links {
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--line-space) / 2);
    margin-bottom: var(--line-space);
  }

  .links > * {
    margin-top: calc(var(--line-space) / 2);
    margin-right: calc(var(--line-space) / 2);
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    background: var(--color-secondary-400);
    color: var(--color-secondary-400-text);
    border-bottom: 2px solid var(--color-secondary-500);
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
