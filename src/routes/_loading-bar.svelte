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

  async function startLoading() {
    isVisible = true;
    clearTimeout(isVisibleTimeout);

    progress.set(0);
    await tick();
    await new Promise(requestAnimationFrame);
    progress.set(0.7);
  }

  function endLoading() {
    progress.set(1);
    clearTimeout(isVisibleTimeout);
    isVisibleTimeout = setTimeout(() => (isVisible = false), 500);
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
    out:fade={{ duration: 500, easing: cubicOut }}
    style={`width: ${100 * $progress}%`}
    class:finished={$progress === 1}
    aria-hidden="true"
  />
{/if}

<style>
  .loading-track {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: var(--color-primary-400);
    transition: width 7s cubic-bezier(0.05, 1, 0.22, 1);
  }

  .loading-track.finished {
    transition-duration: 500ms;
    transition-timing-function: var(--standard-curve);
  }
</style>
