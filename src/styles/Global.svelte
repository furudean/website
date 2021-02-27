<style lang="scss" global>
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    --standard-curve: cubic-bezier(0.4, 0, 0.2, 1);

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

    font-family: "Open Sans", sans-serif;
    line-height: 1.5;
  }

  p {
    font-size: 1em;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures contextual;
    font-feature-settings: "kern", "liga", "clig", "calt";
    margin-bottom: 1.5rem;
  }

  h1 {
    font-family: "Lora", serif;
    font-size: 3em;
    font-weight: 500;
    margin-bottom: 3rem;
  }

  h2 {
    font-family: "Lora", serif;
    font-size: 2em;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  h3 {
    font-family: "Lora", serif;
    font-size: 1.5em;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  h1,
  h2,
  h3 {
    a:hover {
      text-decoration: 3px solid underline var(--color-text-400);
    }
  }

  hr {
    border-top: 3px double var(--color-text-400);
    margin: 0 auto 1.5rem;
  }

  :target {
    position: relative;
    color: var(--color-text-on-primary);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: var(--color-primary-200);
      border-radius: 0.2em;
      padding: 0 0.2em;
      margin: 0 -0.2em;
      z-index: -1;
    }

    &::before {
      content: "§";
      position: absolute;
      left: -1em;
    }
  }
</style>
