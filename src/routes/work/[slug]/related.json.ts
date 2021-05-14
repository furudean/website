import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async function ({ params, host }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params

	const url = new URL("/blog.json", "http://" + host).href
	const res = await fetch(url)

	if (res.ok) {
		const { posts } = await res.json()

		return {
			body: {
				posts: posts.filter((post) => post.relatedProjects.includes(slug))
			}
		}
	} else {
		return {
			status: 500,
			error: new Error("Failed to fetch " + url)
		}
	}
}
