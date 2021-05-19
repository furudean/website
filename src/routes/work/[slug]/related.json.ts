import { getBlogPosts } from "$lib/blog-posts"
import type { RequestHandler } from "@sveltejs/kit"

let posts: any[]

export const get: RequestHandler = async function ({ params, host }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js
	const { slug } = params

	if (!posts) {
		posts = await getBlogPosts(host)
	}

	return {
		body: {
			posts: posts.filter((post) => post.relatedProjectSlugs?.includes(slug))
		}
	}
}
