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
			date: new Date(metadata.date)
		}
	})

	projects.sort((a, b) => (a.date > b.date ? -1 : 1))

	return {
		status: 200,
		body: { projects }
	}
}
