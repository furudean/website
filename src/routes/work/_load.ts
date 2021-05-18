import type { Load } from "@sveltejs/kit"

export const load: Load = async ({ page }) => {
	const url = new URL("/related.json", "http://" + page.host + page.path).href
	const res = await fetch(url)

	if (res.ok) {
		const relatedPosts = await res.json()

		return {
			props: {
				relatedPosts
			}
		}
	} else {
		return {
			status: res.status,
			error: new Error("Oopsie woopsie")
		}
	}
}
