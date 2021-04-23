<script>
	import projects from "./_projects.js"
</script>

<svelte:head>
	<title>Projects · Cassidy Bandy</title>
</svelte:head>

<h1>Projects</h1>
<ul class="list">
	{#each projects as project}
		<li>
			<a href={"projects/" + project.slug} class="text-link">
				{project.attributes.title}
			</a>
			- {project.attributes.summary}
		</li>
	{/each}
</ul>
