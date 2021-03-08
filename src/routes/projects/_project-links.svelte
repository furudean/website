<script lang="ts">
  import type { Project } from "./_projects";
  import Icon from "../../components/Icon.svelte";
  import { mdiGithub, mdiLink } from "@mdi/js";

  export let project: Project;
  export let fill = false;
</script>

<div class="links">
  {#if project.link}
    <a
      class="link-button"
      class:fill
      href={project.link}
      target="_blank"
      rel="noopener"
    >
      <Icon path={mdiLink} size="1.5em" />
      <span>Visit project</span>
    </a>
  {/if}
  {#if project.repo}
    <a
      class="link-button"
      class:fill
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
    margin-top: calc(-1 * var(--line-space));
    margin-bottom: var(--line-space);
  }

  .links > * {
    margin-top: var(--line-space);
  }

  .links > *:not(:last-child) {
    margin-right: var(--line-space);
  }

  .link-button {
    display: inline-flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.1em;
    border-radius: 0.5em;
    color: var(--color-text-400);

    span {
      margin-left: 1em;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .link-button.fill {
    background: var(--color-secondary-400);
    border-bottom: 2px solid var(--color-secondary-500);
    color: var(--color-secondary-400-text);
    padding: 0.75em 2em;
  }
</style>
