import projectsMap from "./_projects"

export async function get() {
	const projects = [...projectsMap.values()]

	projects.sort((a, b) => (a.date > b.date ? -1 : 1))

	return {
		body: { projects }
	}
}
