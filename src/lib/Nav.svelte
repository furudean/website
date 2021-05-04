<script lang="ts">
	import { page, navigating } from "$app/stores"
	import Logo from "$lib/Logo.svelte"
	import { derived } from "svelte/store"

	const compass = (pattern: RegExp) =>
		derived([navigating, page], ([$navigating, $page]) => ({
			isCurrent: !$navigating && pattern.test($page.path),
			// @ts-ignore
			navigatingTo: $navigating && pattern.test($navigating?.to.path)
		}))

	const projects = compass(/^\/projects/)
	const about = compass(/^\/about/)
</script>

{#if $page.path !== "/"}
	<nav role="navigation">
		<a href="/" title="home" class="logo" sveltekit:prefetch>
			<Logo size="2em" color="var(--color-primary-400)" />
		</a>
		<div class="divider" aria-hidden="true" />
		<ul>
			<li>
				<a
					href="/projects"
					class="nav-link"
					aria-current={$projects.isCurrent ? "page" : undefined}
					class:navigating-to={$projects.navigatingTo}
					sveltekit:prefetch
				>
					projects
				</a>
			</li>
			<li>
				<a
					href="/about"
					class="nav-link"
					aria-current={$about.isCurrent ? "page" : undefined}
					class:navigating-to={$about.navigatingTo}
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
		margin-bottom: calc(2 * var(--line-space));
	}

	.logo :global(.svg-icon) {
		display: flex;
	}

	.divider {
		height: 1em;
		width: 1px;
		background: var(--color-text-200);
		margin: 0 2em;
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
			margin-right: 1.5em;
		}
	}

	.nav-link {
		display: block;
		padding: 0.75em 0;
		position: relative;

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

		&:hover::after {
			width: 33%;
		}

		&:is([aria-current], .navigating-to)::after {
			width: 100% !important;
		}

		&.navigating-to::after {
			@keyframes load {
				0% {
					background-position: 0% 0%;
				}
				50% {
					background-position: 100% 0%;
				}
				100% {
					background-position: 0% 0%;
				}
			}

			background: linear-gradient(
				90deg,
				var(--color-primary-400),
				var(--color-primary-200),
				var(--color-primary-400)
			);
			background-size: 300% 300%;

			animation: 1s infinite load var(--deceleration-curve);
		}
	}
</style>
