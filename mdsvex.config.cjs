const path = require("path")
const figure = require("rehype-figure")
const abbr = require("remark-abbr")
const urls = require("rehype-urls")
const slug = require("rehype-slug")
const link = require("rehype-autolink-headings")
const addClasses = require("rehype-add-classes")

function processUrl(url, node) {
	node.properties.class = "text-link"
	if (url.host !== "cass.moe") {
		node.properties.target = "_blank"
		node.properties.rel = "noopener"
	}
}

module.exports = {
	extensions: [".svelte.md"],
	layout: path.join(__dirname, "./src/routes/projects/_layout.svelte"),
	smartypants: true,
	remarkPlugins: [abbr],
	rehypePlugins: [
		[figure], // convert images into <figure> elements
		[urls, processUrl], // adds rel and target to <a> elements
		slug, // adds slug to <h1>-<h6> elements
		[link, { behavior: "wrap" }], // adds a <a> around slugged <h1>-<h6> elements
		[addClasses, { "ul,ol": "list" }] // add classes to these elements
	]
}
