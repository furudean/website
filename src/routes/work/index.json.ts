import pMap from "p-map"
import { basename } from "path"
import type { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
	const modules = Object.entries(import.meta.glob("./*.svelte.md"))

	const projects = await pMap(modules, async ([filename, module]) => {
		const { metadata } = await module()

		return {
			...metadata,
			slug: basename(filename, ".svelte.md")
		}
	})

	projects.sort((a, b) => (new Date(a.created) > new Date(b.created) ? -1 : 1))

	return {
		status: 200,
		body: { projects }
	}
}
