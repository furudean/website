<script lang="ts">
  import { stores } from "@sapper/app";
  import { derived, writable } from "svelte/store";
  import type { Readable } from "svelte/store";
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { tick } from "svelte";

  const { preloading } = stores();
  const progress = writable(0);

  let preloadingTimeout: number;
  let growInterval: number;

  let isVisible = false;
  let isVisibleTimeout: number;

  // store that lags behind "preloading" store a few ms until the progress bar
  // should be shown. we don't want to show it for short loading times
  const preloadingDelayed = derived(preloading, (value, set) => {
    clearTimeout(preloadingTimeout);

    if (value) {
      preloadingTimeout = setTimeout(() => set(value), 200);
    } else {
      set(value);
    }
  }) as Readable<boolean>;

  function grow(x: number): number {
    return x < 0.8 ? x + 0.2 : x;
  }

  async function startLoading() {
    if (isVisible) return;
    isVisible = true;

    clearTimeout(isVisibleTimeout);
    clearInterval(growInterval);

    /* 
      We want loading to start immediately, not after 1000ms, so we simulate 
      the first load step.
    */
    progress.set(0);
    await tick();
    await new Promise(requestAnimationFrame);
    progress.update(grow);

    growInterval = setInterval(() => progress.update(grow), 1000);
  }

  function endLoading() {
    progress.set(1);
    clearInterval(growInterval);

    isVisibleTimeout = setTimeout(() => (isVisible = false), 750);
  }

  preloadingDelayed.subscribe((isLoading) => {
    if (isLoading) {
      startLoading();
    } else {
      endLoading();
    }
  });
</script>

{#if isVisible}
  <div
    class="loading-track"
    out:fade={{ duration: 250, easing: cubicOut }}
    aria-hidden="true"
  >
    <div class="progress" style={`width: ${100 * $progress}%`} />
  </div>
{/if}

<style>
  .loading-track {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    overflow: hidden;
  }

  .progress {
    content: "";
    display: block;
    width: 0%;
    height: 100%;
    background: var(--color-primary-400);
    transition: width 750ms;
  }
</style>
