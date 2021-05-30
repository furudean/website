import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ fetch, page }) => {
	const url = page.path + "/related.json"
	const res = await fetch(url)

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
			error: new Error("Failed to fetch " + url)
		}
	}
}
