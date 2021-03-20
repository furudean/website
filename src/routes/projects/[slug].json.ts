import marked from 'marked';
import fetch from "node-fetch";
import type { ServerResponse } from 'http';
import type { Request } from 'polka';
import { renderer, highlight } from "../../lib/markdown";
import { projects } from './_projects';

const projectSlugs = new Set<string>();
const cache = new Map<string, string>();

projects.forEach(project => {
	projectSlugs.add(project.slug);
});

function renderMarkdown(text: string) {
	return marked(text, {
		renderer,
		highlight,
		smartypants: true,
	})
}

async function fetchAndCache(slug: string, host: string): Promise<void> {
	if (!cache.has(slug)) {
		const project = projects.find(p => p.slug === slug)

		if ("articleUrl" in project) {
			const article = await fetch(new URL(project.articleUrl, `http://${host}`))
				.then(res => res.text());
			project.articleHtml = renderMarkdown(article);
		}

		cache.set(slug, JSON.stringify(project));
	}
}

export async function get(
	req: Request,
	res: ServerResponse,
	next: () => void
) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (projectSlugs.has(slug) && !cache.has(slug)) {
		await fetchAndCache(slug, req.headers.host);
	}

	if (cache.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(cache.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
