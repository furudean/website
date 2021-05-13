import pMap from "p-map"
import path from "path"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
	const files = Object.entries(import.meta.glob("./*.svelte.md"))

	let projects = await pMap(files, async ([filename, module]) => {
		const { metadata: meta } = await module()

		return {
			title: meta.title,
			slug: path.parse(filename).base.replace(".svelte.md", ""),
			kind: meta.kind,
			date: new Date(meta.date),
			summary: meta.summary,
			coverImageUrl: meta.coverImageUrl,
			tags: meta.tags
		}
	})

	projects.sort((a, b) => (a.date > b.date ? -1 : 1))

	return {
		status: 200,
		body: { projects }
	}
}
