<script lang="ts">
	import Icon from "$components/Icon.svelte"
	import { mdiGithub, mdiLink } from "@mdi/js"

	export let repo: string | undefined
	export let url: string | undefined
</script>

<ul class="links">
	{#if url}
		<li>
			<a class="link-button" href={url} target="_blank" rel="noopener">
				<Icon path={mdiLink} size="1.5em" />
				<span>Visit project</span>
			</a>
		</li>
	{/if}
	{#if repo}
		<li>
			<a
				class="link-button"
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

<style lang="postcss">
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
</style>
