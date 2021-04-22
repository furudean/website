import fs from "fs"
import fm from "front-matter"
import path from "path"

const dir = "src/routes/projects"

const filesnames = fs
	.readdirSync(dir)
	.filter((filename) => filename.endsWith(".svelte.md"))

const projects = filesnames.map((filename) => {
	const file = fs.readFileSync(path.join(dir, filename))

	return {
		slug: filename.replace(".svelte.md", ""),
		attributes: fm(file.toString()).attributes
	}
})

fs.writeFileSync(
	path.join(dir, "_projects.js"),
	"export default " + JSON.stringify(projects, null, "\t")
)
