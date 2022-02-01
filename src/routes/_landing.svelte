<script lang="ts">
	import { mdiGithub, mdiOpenInNew } from "@mdi/js"
	import Icon from "$components/Icon.svelte"
	import Logo from "$components/Logo.svelte"
</script>

<section class="landing">
	<h1>
		Hi, I'm <br /> Merilynn Bandy
		<Logo size="0.9em" color="var(--color-primary-400)" />
	</h1>
	<p>
		I'm a full-stack engineer based in UT, USA. I care about CSS, typography,
		accessibility and cute things.
	</p>
	<p>
		In my free time I like to learn more about programming, write stories, and
		explore new media.
	</p>
	<hr class="bold" />
	<ul class="links">
		<li>
			<a
				href="https://github.com/furudean"
				title="GitHub profile"
				target="_blank"
				rel="noopener"
			>
				<Icon title="GitHub Icon" path={mdiGithub} size="1.5em" />
				<span>GitHub</span>
				<Icon path={mdiOpenInNew} />
			</a>
		</li>
	</ul>
</section>

<style>
	.landing {
		grid-area: landing;
	}

	h1 :global(.svg-icon) {
		top: 0.15em; /* visual balance */
	}

	hr {
		width: 4em;
		margin: calc(1.5 * var(--line-space)) 0;
	}

	ul.links {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		margin-bottom: var(--line-space);
	}

	ul.links li {
		float: left;
		margin-bottom: var(--line-space);
	}

	ul.links a {
		display: flex;
		align-items: center;
		float: left;
	}

	ul.links a:hover {
		text-decoration: underline;
	}

	ul.links span {
		padding-left: 0.75em;
		padding-right: 0.6em;
	}
</style>
