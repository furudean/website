<script lang="ts">
  import { mdiHeart, mdiGithub, mdiOpenInNew } from "@mdi/js";
  import Icon from "../components/Icon.svelte";
</script>

<section class="landing">
  <h1>
    Hi, I'm <br /> Cassidy Bandy
    <Icon title="Heart icon" path={mdiHeart} color="var(--color-primary-400)" />
  </h1>
  <p>
    I'm a full-stack engineer based in UT, USA. I care about CSS, typography,
    <abbr title="accessibility">a11y</abbr> and cute things.
  </p>
  <p>
    In my free time I like to learn more about programming, study the Japanese
    language and explore new media.
  </p>
  <p>
    I'm currently open for new work opportunities. Let's make the web a little
    nicer together?
  </p>
  <hr />
  <ul class="links">
    <li>
      <a
        href="https://github.com/c-bandy"
        title="GitHub profile"
        target="_blank"
        rel="noopener"
      >
        <Icon title="GitHub Icon" path={mdiGithub} size="1.75em" />
        <span>GitHub</span>
        <Icon path={mdiOpenInNew} />
      </a>
    </li>
  </ul>
</section>

<style>
  .landing {
    grid-area: landing;
  }

  h1 :global(.svg-icon) {
    top: 10px;
  }

  hr {
    border-top: 1px solid var(--color-text-300);
    margin-left: 0;
    width: 4em;
  }

  ul.links {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin-bottom: var(--line-space);
  }

  ul.links li {
    margin-bottom: var(--line-space);
  }

  ul.links a {
    display: flex;
    align-items: center;
  }

  ul.links a::hover {
    text-decoration: solid underline var(--text-color-400);
  }

  ul.links span {
    padding-left: 0.75em;
    padding-right: 0.6em;
  }
</style>
