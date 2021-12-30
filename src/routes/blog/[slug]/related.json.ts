import type { RequestHandler } from "@sveltejs/kit"
import { getBlogPosts } from "$lib/blog-posts"
import { getWorks, Project } from "$lib/works"

async function getRelatedProjectsMap(host: string) {
	const map = new Map<string, Project[]>()
	const [posts, works] = await Promise.all([getBlogPosts(host), getWorks(host)])

	for (const post of posts) {
		map.set(
			post.slug,
			post.relatedProjectSlugs?.map((slug) => works.get(slug)) || []
		)
	}

	return map
}

let relatedProjects: Map<string, Project[]>

export const get: RequestHandler = async function ({ params, url }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params

	if (!relatedProjects) {
		relatedProjects = await getRelatedProjectsMap(url.host)
	}

	if (relatedProjects.has(slug)) {
		return {
			body: {
				projects: relatedProjects.get(slug) as any
			}
		}
	}
}
