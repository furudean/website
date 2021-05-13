import pMap from "p-map"
import { basename } from "path"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
	const files = Object.entries(import.meta.glob("./*.svelte.md"))

	let projects = await pMap(files, async ([filename, module]) => {
		const { metadata } = await module()

		return {
			slug: basename(filename, ".svelte.md"),
			...metadata,
			date: new Date(metadata.date)
		}
	})

	projects.sort((a, b) => (a.date > b.date ? -1 : 1))

	return {
		status: 200,
		body: { projects }
	}
}
