<script lang="ts">
	import { width, height, src } from "./portrait.jpg?w=160&webp&meta"

	let p1 = "hel"
	let p2 = "lo@ca"
	let p3 = "ss.m"
	let p4 = "oe"
	let eml = p1 + p2 + p3 + p4

	function revealEmail(node: Element) {
		const selection = window.getSelection()
		const range = document.createRange()

		node.setAttribute("aria-label", "email is hidden, tap to show")
		node.innerHTML = "&lt;tap to show&gt;"

		function tap() {
			if (node.classList.contains("hidden")) {
				node.classList.remove("hidden")
				node.removeAttribute("tabindex")
				node.removeAttribute("aria-label")
				node.innerHTML = eml
			} else {
				range.selectNodeContents(node)
				selection.removeAllRanges()
				selection.addRange(range)
			}
		}

		node.addEventListener("pointerup", tap)
	}
</script>

<svelte:head>
	<title>About me · Cassidy Bandy</title>
</svelte:head>

<h1>About me</h1>
<article class="article">
	<div class="profile-card">
		<img
			class="portrait"
			{src}
			alt="Cassidy's portrait"
			style="width: {width}px; height: {height}px"
		/>
		<div class="title">
			<h2>Cassidy Bandy</h2>
			<div class="tagline">Full Stack Engineer, Designer</div>
		</div>
		<p>
			Hi, I'm Cassidy! Cassie works too, if we're friends. My pronouns are
			she/her. As a day job I'm a full-stack engineer. I like to design things
			too, like this website.
		</p>
		<p>
			I grew up in a (relatively) small town called Örebro, Sweden. At the end
			of 2020, I left my home country for Utah, USA. Now I live and work here.
			It still feels a little bit crazy.
		</p>
		<p>When I'm not serving my corporate overlords I like to:</p>
		<ul class="list">
			<li>Study japanese</li>
			<li>Learn new web tech</li>
			<li>Play roguelikes</li>
			<li>Participate in various open source projects</li>
		</ul>
		<p>
			If you need to reach me, my email is <span
				class="email hidden"
				tabindex="0"
				aria-live
				use:revealEmail
			>
				&lt;enable javascript to fetch email&gt;
			</span>.
		</p>
	</div>
</article>

<style>
	.portrait {
		border-radius: 100%;
		border: 2px solid var(--color-primary-400);
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

	@keyframes unhide {
		from {
			background: var(--color-secondary-400);
			color: var(--color-secondary-400-text);
		}
		to {
			background: transparent;
			color: inherit;
		}
	}

	.email:not(.hidden) {
		animation: unhide 1s var(--standard-curve);
	}

	.hidden {
		cursor: pointer;
		background: var(--color-secondary-300);
		color: var(--color-secondary-300-text);
	}
</style>
