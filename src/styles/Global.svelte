<style lang="scss" global>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    --standard-curve: cubic-bezier(0.4, 0, 0.2, 1);
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
    height: 100%;
    width: 100%;
    padding: 3em 3em 0;

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
  }

  hr {
    border-top: 3px double var(--color-text-300);
    margin-bottom: var(--line-space);
  }

  abbr {
    cursor: help;
    text-decoration-style: dotted;
    text-decoration-line: underline;
  }

  :target {
    position: relative;
    text-decoration-style: solid;
    text-decoration-line: underline;

    &::before {
      content: "§";
      position: absolute;
      left: -1em;
      color: var(--color-text-400);
    }
  }
</style>
