import marked from "marked"
import fetch from "node-fetch"
import type { RequestHandler } from "@sveltejs/kit"
import { renderer, highlight } from "$lib/markdown"
import { projects } from "./_projects"
import type { Project } from "./_projects"

const projectSlugs = new Set<string>()
const cache = new Map<string, Project>()

projects.forEach((project) => {
	projectSlugs.add(project.slug)
})

function renderMarkdown(text: string) {
	return marked(text, {
		renderer,
		highlight,
		smartypants: true
	})
}

async function fetchAndCache(slug: string, host: string): Promise<void> {
	if (!cache.has(slug)) {
		const project = projects.find((p) => p.slug === slug)

		if ("articleUrl" in project) {
			const article = await fetch(
				new URL(project.articleUrl, `http://${host}`)
			).then((res) => res.text())
			project.articleHtml = renderMarkdown(article)
		}

		cache.set(slug, project)
	}
}

export const get: RequestHandler = async function (request) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = request.params

	if (projectSlugs.has(slug) && !cache.has(slug)) {
		await fetchAndCache(slug, request.host)
	}

	if (cache.has(slug)) {
		return {
			headers: {
				"Content-Type": "application/json"
			},
			body: cache.get(slug)
		}
	} else {
		return {
			headers: {
				"Content-Type": "application/json"
			},
			status: 404,
			body: {
				message: "Not found"
			}
		}
	}
}
