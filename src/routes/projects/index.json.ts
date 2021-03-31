import type { RequestHandler } from "@sveltejs/kit"
import { projects } from "./_projects"

export const get: RequestHandler = async function () {
	return {
		headers: {
			"Content-Type": "application/json"
		},
		body: projects
	}
}
