import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ page }) => {
	const url = "http://" + page.host + page.path + "/related.json"
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
