<script lang="ts">
	let visible = false

	function show() {
		if (!visible) {
			visible = true
		}
	}

	function keyPress(event: KeyboardEvent) {
		if (!visible && ["Enter", " "].includes(event.key)) {
			show()
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur()
			}
		}
	}
</script>

<div
	class="hidden-text"
	tabindex={visible ? undefined : 0}
	aria-live="polite"
	on:keyup={keyPress}
	on:click={show}
>
	{#if visible}
		<slot name="visible" />
	{:else}
		<slot name="hidden" />
	{/if}
</div>

<style>
	div {
		display: inline-block;
	}
</style>
