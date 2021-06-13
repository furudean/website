export interface BlogPost {
	title: string
	created: string
	updated?: string
	summary: string
	slug: string
	coverImageUrl?: string
	tags?: string[]
	relatedProjectSlugs?: string[]
}

export async function getBlogPosts(host: string): Promise<BlogPost[]> {
	const url = new URL("blog.json", "http://" + host).href
	const res = await fetch(url)

	if (res.ok) {
		const { posts } = await res.json()
		return posts
	} else {
		throw new Error("Failed to fetch " + url)
	}
}
