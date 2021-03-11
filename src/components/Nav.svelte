<script lang="ts">
	import { stores } from "@sapper/app";
	import Logo from "../components/Logo.svelte";

	const { page } = stores();
</script>

{#if $page.path !== "/"}
	<nav role="navigation">
		<a href="." title="Home" class="logo" sapper:prefetch>
			<Logo size="2em" color="var(--color-primary-400)" />
		</a>
		<div class="divider" aria-hidden="true" />
		<ul>
			<li>
				<a
					href="/projects"
					aria-current={$page.path.startsWith("/projects") ? "page" : undefined}
					sapper:prefetch
				>
					projects
				</a>
			</li>
			<!-- <li>
				<a
					href="/about"
					aria-current={$page.path.startsWith("/about") ? "page" : undefined}
				>
					about
				</a>
			</li> -->
		</ul>
	</nav>
{/if}

<style lang="scss">
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
		margin: 0 var(--line-space);
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
		padding: 0.75em 0;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: var(--color-primary-400);
		display: block;
		bottom: 0;
	}
</style>
