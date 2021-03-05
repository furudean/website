<style lang="scss" global>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    --standard-curve: cubic-bezier(0.4, 0, 0.2, 1);
    --deceleration-curve: cubic-bezier(0, 0, 0.2, 1);
    --line-height: 1.75;
    --line-space: 1.75rem;

    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  body {
    background: var(--color-background-400);
    color: var(--color-text-400);
    position: relative;
    min-height: 100%;
    width: 100%;
    padding: 3em;

    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;

    line-height: var(--line-height);
  }

  p {
    font-size: 1em;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures contextual;
    font-feature-settings: "kern", "liga", "clig", "calt";
    margin-bottom: var(--line-space);
  }

  $serif-font-stack: "Lora", "Iowan Old Style", "Apple Garamond", "Baskerville",
    "Times New Roman", "Droid Serif", "Times", "Source Serif Pro", serif;

  h1 {
    font-family: $serif-font-stack;
    font-size: 3em;
    font-weight: 500;
    margin-bottom: var(--line-space);
    line-height: 1.25;
  }

  h2 {
    font-family: $serif-font-stack;
    font-size: 2em;
    font-weight: 500;
    margin-bottom: var(--line-space);
    line-height: 1.25;
  }

  h3 {
    font-family: $serif-font-stack;
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: var(--line-space);
    line-height: 1.25;
  }

  h1,
  h2,
  h3 {
    a:hover {
      text-decoration: underline;
    }
    a[href*="#"]:hover {
      text-decoration-style: dotted;
    }

    &.is-target {
      position: relative;
      text-decoration: underline;

      &::before {
        content: "§";
        position: absolute;
        left: -1em;
        color: var(--color-text-400);
      }
    }
  }

  a.text-link,
  a.text-link:visited {
    text-decoration: underline;
    color: var(--color-primary-400);
  }

  // external links
  a.text-link[href*="//"]:before
  {
    content: "";
    display: inline-block;
    vertical-align: baseline;
    position: relative;
    top: 2px; // visual balance
    width: 1em;
    height: 1em;
    background-color: var(--color-primary-400);
    mask-image: url("/media/open-in-new.svg");
    mask-size: 100%;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
    margin-right: 0.1em;
  }

  hr {
    border-top: 3px double var(--color-text-300);
    margin-bottom: var(--line-space);
  }

  abbr {
    cursor: help;
    text-decoration: dotted underline;
  }

  article.article {
    max-width: 45em;
    margin: 0 auto;
  }

  .has-tombstone > p:last-of-type:after {
    content: "";
    display: inline-block;
    vertical-align: baseline;
    margin-left: 0.25em;
    width: 1em;
    height: 1em;
    background-color: var(--color-primary-400);
    mask-image: url("/media/heart.svg");
    mask-size: 100%;
    mask-repeat: no-repeat;
    mask-position: 50% 50%;
    position: relative;
    top: 3px; /* visual balance */
  }

  figure {
    width: 100%;
    margin-bottom: var(--line-space);

    :first-child {
      max-width: 100%;
      margin: 0 auto;
      display: block;
    }
    figcaption {
      margin-top: calc(var(--line-space) * 0.5);
      text-align: center;
      color: var(--color-text-300);
    }
  }

  pre,
  code {
    font-family: Consolas, Menlo, Monaco, "Andale Mono WT", "Andale Mono",
      "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
      "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L",
      "Courier New", Courier, monospace;
    font-size: 0.9em;
    line-height: 1.4;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre {
    padding: 1rem 0 1rem 1rem;
    margin-bottom: var(--line-space);
    overflow: auto;
  }

  /* Inline code */
  :not(pre) > code {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }
</style>
