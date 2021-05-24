<script>
	let count = 0
</script>

<div class="count">
	<button
		type="button"
		on:click={() => (count -= 1)}
		aria-label="decrease count">-</button
	>
	<span aria-live="assertive" aria-label="count is {count}">{count}</span>
	<button
		type="button"
		on:click={() => (count += 1)}
		aria-label="increase count">+</button
	>
</div>

<style>
	.count {
		display: flex;
		margin-bottom: var(--line-space);
	}
	span {
		margin: 0 0.5em;
	}
</style>
