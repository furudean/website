import { projects } from "./_projects"

const contents = projects.map((project) => ({
	title: project.title,
	slug: project.slug,
	date: project.date,
	summary: project.summary,
	link: project.link,
	repo: project.repo,
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(contents));
}
