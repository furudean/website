export interface Project {
	name: string
	slug: string
	kind: string
	created: string
	updated?: string
	summary: string
	repo?: string
	url?: string
}

export async function getWorks(host: string): Promise<Map<string, Project>> {
	const url = new URL("work.json", "http://" + host).href
	const res = await fetch(url)

	if (res.ok) {
		const { projects } = await res.json()
		const map = new Map<string, Project>()

		for (const project of projects) {
			map.set(project.slug, project)
		}

		return map
	} else {
		throw new Error("Failed to fetch " + url)
	}
}
