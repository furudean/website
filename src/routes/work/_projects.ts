export interface Project {
	name: string
	slug: string
	kind: string
	date: Date
	summary: string
	repo?: string
	url?: string
}

const projects: Project[] = [
	{
		name: "Portfolio Site",
		slug: "portfolio-website-2021",
		date: new Date("2021-02-26T00:00:00"),
		summary: "New porfolio site for 2021.",
		kind: "Website",
		repo: "https://github.com/c-bandy/website"
	},
	{
		name: "Type Kana",
		slug: "type-kana",
		date: new Date("2020-08-02T00:00:00"),
		kind: "Web app",
		summary:
			"A quiz app to help you learn hiragana and katakana, the Japanese syllabaries.",
		repo: "https://github.com/c-bandy/type-kana",
		url: "https://type-kana.cass.moe"
	}
]

const map = new Map<string, Project>()

projects.forEach((project) => map.set(project.slug, project))

export default map
