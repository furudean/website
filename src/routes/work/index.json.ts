import pMap from "p-map"
import { basename } from "path"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
	const modules = Object.entries(import.meta.glob("./*.svelte.md"))

	const projects = await pMap(modules, async ([filename, module]) => {
		const { metadata } = await module()

		return {
			...metadata,
			slug: basename(filename, ".svelte.md"),
			created: new Date(metadata.created)
		}
	})

	projects.sort((a, b) => (a.created > b.created ? -1 : 1))

	return {
		status: 200,
		body: { projects }
	}
}
