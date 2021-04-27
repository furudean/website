<script lang="ts">
	import Icon from "../../lib/Icon.svelte"
	import { mdiGithub, mdiLink } from "@mdi/js"

	export let repo: string | undefined
	export let url: string | undefined
	export let fill = false
</script>

<ul class="links">
	{#if url}
		<li>
			<a
				class="link-button"
				class:fill
				href={url}
				target="_blank"
				rel="noopener"
			>
				<Icon path={mdiLink} size="1.5em" />
				<span>Visit project</span>
			</a>
		</li>
	{/if}
	{#if repo}
		<li>
			<a
				class="link-button"
				class:fill
				href={repo}
				target="_blank"
				rel="noopener"
				title="GitHub repository"
			>
				<Icon path={mdiGithub} size="1.5em" />
				<span>GitHub repo</span>
			</a>
		</li>
	{/if}
</ul>

<style lang="scss">
	.links {
		display: flex;
		flex-wrap: wrap;
		margin-top: calc(-1 * var(--line-space));
		margin-bottom: var(--line-space);
		list-style-type: none;
	}

	.links > * {
		margin-top: var(--line-space);
	}

	.links > *:not(:last-child) {
		margin-right: var(--line-space);
	}

	.link-button {
		display: inline-flex;
		align-items: center;
		text-transform: uppercase;
		font-size: 0.8em;
		font-weight: 600;
		line-height: 1;
		letter-spacing: 0.1em;
		border-radius: 0.5em;
		color: var(--color-text-400);

		span {
			margin-left: 1em;
		}

		&:hover {
			text-decoration: underline;
		}
	}

	.link-button.fill {
		background: var(--color-secondary-400);
		border-bottom: 2px solid var(--color-secondary-500);
		color: var(--color-secondary-400-text);
		padding: 0.75em 2em;
	}
</style>
