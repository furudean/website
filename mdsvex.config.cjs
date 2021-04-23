const path = require("path")
const abbr = require("remark-abbr")
const urls = require("rehype-urls")
const slug = require("rehype-slug")
const link = require("rehype-autolink-headings")
const addClasses = require("rehype-add-classes")
const visit = require("unist-util-visit")
const h = require("hastscript")

/**
 * Modified from https://github.com/josestg/rehype-figure
 */
function figure() {
	function buildFigure({ properties }) {
		const figure = h("figure", null, [
			h("img", { ...properties }),
			properties.title ? h("figcaption", properties.title) : ""
		])
		return figure
	}

	return function (tree) {
		visit(tree, { tagName: "p" }, (node, index) => {
			const images = node.children
				.filter((n) => n.tagName === "img")
				.map((img) => buildFigure(img))

			if (images.length === 0) return

			tree.children[index] =
				images.length === 1
					? images[0]
					: (tree.children[index] = h("div", null, images))
		})
	}
}

function processUrl(url, node) {
	if (node.tagName === "a") {
		node.properties.class = "text-link"
		if (url.host !== "cass.moe") {
			node.properties.target = "_blank"
			node.properties.rel = "noopener"
		}
	}
}

module.exports = {
	extensions: [".svelte.md"],
	layout: path.join(__dirname, "./src/routes/projects/_layout.svelte"),
	smartypants: true,
	remarkPlugins: [abbr], // adds support for footnote-like abbreviations
	rehypePlugins: [
		[figure], // convert images into <figure> elements
		[urls, processUrl], // adds rel and target to <a> elements
		slug, // adds slug to <h1>-<h6> elements
		[link, { behavior: "wrap" }], // adds a <a> around slugged <h1>-<h6> elements
		[addClasses, { "ul,ol": "list" }] // add classes to these elements
	]
}
