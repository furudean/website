import { basename } from "path"
import type { RequestHandler } from "@sveltejs/kit"

const dir = import.meta.glob(`./*.svelte.md`)
const lookup = new Map<string, typeof dir[1]>()

for (const [filename, module] of Object.entries(dir)) {
	const slug = basename(filename, ".svelte.md")
	lookup.set(slug, module)
}

export const get: RequestHandler = async ({ params, path }) => {
	const module = lookup.get(params.slug)

	if (module) {
		const { metadata } = await module()

		return {
			status: 200,
			body: {
				slug: params.slug,
				...metadata
			}
		}
	}

	return {
		status: 404,
		body: `Could not find ${path}`
	}
}
