import projects from "../_projects"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async ({ params }) => {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params

	if (projects.has(slug)) {
		return {
			body: projects.get(slug)
		}
	}
}
