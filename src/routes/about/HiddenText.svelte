<script lang="ts">
	let visible = false

	function click() {
		if (!visible) {
			visible = true
		}
	}

	function keyPress(event: KeyboardEvent) {
		if (["Enter", " "].includes(event.key)) {
			click()
		}
	}
</script>

<div tabindex={visible ? undefined : 0} on:keyup={keyPress} on:click={click}>
	<slot {visible} />
</div>

<style>
	div {
		display: inline-block;
	}
</style>
