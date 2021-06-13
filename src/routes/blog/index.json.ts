import pMap from "p-map"
import { basename } from "path"
import type { RequestHandler } from "@sveltejs/kit"
import type { BlogPost } from "$lib/blog-posts"

export const get: RequestHandler = async () => {
	const modules = Object.entries(import.meta.glob("./*.svelte.md"))

	const posts = await pMap(
		modules,
		async ([filename, module]): Promise<BlogPost> => {
			const { metadata } = await module()

			return {
				...metadata,
				slug: basename(filename, ".svelte.md")
			}
		}
	)

	posts.sort((a, b) => (new Date(a.created) > new Date(b.created) ? -1 : 1))

	return {
		status: 200,
		body: { posts } as any
	}
}
