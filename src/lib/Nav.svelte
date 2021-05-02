<script lang="ts">
	import { page } from "$app/stores"
	import Logo from "$lib/Logo.svelte"
</script>

{#if $page.path !== "/"}
	<nav role="navigation">
		<a href="/" title="Home" class="logo" sveltekit:prefetch>
			<Logo size="2em" color="var(--color-primary-400)" />
		</a>
		<div class="divider" aria-hidden="true" />
		<ul>
			<li>
				<a
					href="/projects"
					aria-current={$page.path.startsWith("/projects") ? "page" : undefined}
					sveltekit:prefetch
				>
					projects
				</a>
			</li>
			<li>
				<a
					href="/about"
					aria-current={$page.path.startsWith("/about") ? "page" : undefined}
					sveltekit:prefetch
				>
					about me
				</a>
			</li>
		</ul>
	</nav>
{/if}

<style lang="postcss">
	nav {
		display: flex;
		align-items: center;
		margin-bottom: calc(var(--line-space) * 1.5);
	}

	.logo :global(.svg-icon) {
		display: flex;
	}

	.divider {
		height: 1em;
		width: 1px;
		background: var(--color-text-200);
		margin: 0 1.5rem;
		flex-shrink: 0;
	}

	ul {
		display: flex;
	}

	li {
		display: block;
		position: relative;
		cursor: pointer;

		&:not(:last-of-type) {
			margin-right: 1em;
		}
	}

	li a {
		display: block;
		position: relative;
		padding: 0.75em 0;

		&::after {
			content: "";
			display: block;
			position: absolute;
			height: 2px;
			width: 0;
			bottom: 0;
			background-color: var(--color-primary-400);
			transition: width 70ms var(--standard-curve);
		}

		&[aria-current]::after {
			width: 100%;
		}

		&:not([aria-current]):hover::after {
			width: 33%;
		}
	}
</style>
