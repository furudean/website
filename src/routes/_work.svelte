<script lang="ts">
	import { friendlyDate } from "$lib/dateTime"
	import Icon from "$components/Icon.svelte"
	import { mdiGithub } from "@mdi/js"
	import type { Project } from "./work/_projects"

	export let projects: Project[]
</script>

<section class="work">
	<h2>
		<a href="/work" sveltekit:prefetch>Work</a>
	</h2>
	{#each projects as project}
		<article class="project">
			<h3>
				<a href="/work/{project.slug}" sveltekit:prefetch>
					{project.name}
				</a>
				{#if project.repo}
					<a
						class="repo-link"
						href={project.repo}
						title="GitHub repository"
						target="_blank"
						rel="noopener"
					>
						<Icon path={mdiGithub} />
					</a>
				{/if}
			</h3>
			<div class="article-info">
				<time datetime={project.created}>
					{friendlyDate(project.created)}
				</time>
				·
				<span>{project.kind}</span>
			</div>
			<p>{project.summary}</p>
			<p>
				<a class="text-link" href="/work/{project.slug}" sveltekit:prefetch>
					Read more
				</a>
			</p>
		</article>
	{/each}
</section>

<style lang="postcss">
	.work {
		grid-area: work;
	}

	.project {
		border: 1px solid var(--color-text-100);
		padding: calc(var(--line-space) - 1px);
		margin-bottom: var(--line-space);
		border-radius: 1em;
		overflow: hidden; /* prevent margin collapse */

		@media (prefers-color-scheme: dark) {
			background: var(--color-background-300);
			border-color: var(--color-background-300);
		}

		h3 {
			margin-bottom: 0;
		}

		.repo-link :global(.svg-icon) {
			top: 0.125em; /* visual balance */
		}

		.article-info {
			color: var(--color-text-300);
			margin-bottom: calc(var(--line-space) * 0.5);
		}

		p {
			margin-bottom: calc(var(--line-space) * 0.5);
		}

		> :last-child {
			margin-bottom: 0;
		}
	}
</style>
