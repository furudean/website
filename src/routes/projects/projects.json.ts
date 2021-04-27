import { parse } from "path"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async ({ params }) => {
	const modules = import.meta.glob("./**/index.svelte.md")

	const posts = []

	await Promise.all(
		Object.entries(modules).map(async ([file, module]) => {
			const { metadata } = await module()

			posts.push({
				author: metadata.author,
				created: metadata.created,
				slug: parse(file).dir,
				subtitle: metadata.subtitle,
				title: metadata.title
			})
		})
	)

	// Newest first
	posts.sort((a, b) => (a.created > b.created ? -1 : 1))

	return {
		body: {
			posts: posts
		}
	}
}
