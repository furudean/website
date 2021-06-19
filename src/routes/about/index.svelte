<script lang="ts">
	// @ts-ignore
	import portrait from "../../portrait.jpg?w=160&webp&meta"
	import { ceasar as c } from "./cipher"
	import { onMount } from "svelte"
	import HiddenText from "./HiddenText.svelte"
	import { selectable } from "./selectable"

	const email = c("axeeh", 7) + "@" + c("jhzz", -7) + "." + c("fhx", 7)
	let mounted = false

	onMount(() => (mounted = true))
</script>

<svelte:head>
	<title>About · Cassidy Bandy</title>
</svelte:head>

<article class="article">
	<h1>About</h1>
	<div class="profile-card">
		<img
			class="portrait"
			src={portrait.src}
			alt="Cassidy's portrait"
			style="width: {portrait.width}px; height: {portrait.height}px"
		/>
		<div class="title">
			<h2>Cassidy Bandy</h2>
			<div class="tagline">Full Stack Engineer, Designer</div>
		</div>
		<p>
			Hi, I'm Cassidy! Cassie works too, if we're friends. Pronouns are she/her.
			As a day job I'm a full-stack engineer. I like to design things too, like
			this website.
		</p>
		<p>
			I grew up in a (relatively) small town called Örebro, Sweden. At the end
			of 2020, I left my home country for Utah, USA. Now I live and work here.
			It still feels a little bit crazy.
		</p>
		<p>In my free time I like to:</p>
		<ul class="list">
			<li>Study japanese</li>
			<li>Learn new web tech</li>
			<li>Play roguelikes (video game genre)</li>
			<li>Participate in various open source projects</li>
		</ul>
		<h3>Contact</h3>
		{#if mounted}
			<p>
				If you need to reach me, my email is
				<HiddenText>
					<span slot="hidden" aria-label="email is hidden, tap to reveal">
						&lt;tap to show&gt;
					</span>
					<span slot="visible" use:selectable>{email}</span>
				</HiddenText>.
			</p>
		{:else}
			<noscript>
				<blockquote>
					Contact info is not shown with JavaScript disabled. This is to prevent
					it from getting picked up by web scrapers. Sorry!
				</blockquote>
			</noscript>
		{/if}
	</div>
</article>

<style>
	.portrait {
		border-radius: 100%;
		float: left;
		margin-right: 2em;
		margin-bottom: 1em;
	}
	.title h2 {
		margin-bottom: 0;
	}
	.tagline {
		color: var(--color-text-300);
		margin-bottom: var(--line-space);
	}

	@media (max-width: 30rem) {
		.portrait {
			display: block;
			float: none;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: calc(0.5 * var(--line-space));
		}

		.title {
			text-align: center;
		}
	}

	[slot="hidden"] {
		cursor: pointer;
		background: var(--color-secondary-200);
		color: var(--color-secondary-200-text);
	}

	[slot="visible"] {
		@keyframes flash {
			from {
				background: var(--color-secondary-400);
				color: var(--color-secondary-400-text);
			}
			to {
				background: transparent;
				color: inherit;
			}
		}

		animation: flash 1s var(--standard-curve);
		border: 1px dashed var(--color-text-100);
	}
</style>
