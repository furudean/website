import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ fetch, url }) => {
	const requestUrl = url.pathname + "/related.json"
	const res = await fetch(requestUrl)

	if (res.ok) {
		const { posts } = await res.json()

		return {
			props: {
				relatedPosts: posts
			}
		}
	} else {
		return {
			status: res.status,
			error: new Error("Failed to fetch " + requestUrl)
		}
	}
}
