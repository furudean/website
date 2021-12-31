import type { RequestHandler } from "@sveltejs/kit"
import { getBlogPosts } from "$lib/blog-posts"
import { html } from "common-tags"
import { getWorks } from "$lib/works"
import { BASE_URL } from "$lib/url"

const EMPTY_LINES = /^\s+\n/gm

function createUrlElement(href: string, lastmod?: string | Date) {
	return html`
		<url>
			<loc>${new URL(href, BASE_URL).href}</loc>
			${lastmod ? "<lastmod>" + lastmod + "</lastmod>" : ""}
		</url>
	`.replace(EMPTY_LINES, "")
}

export const get: RequestHandler = async ({ url }) => {
	const blogPosts = await getBlogPosts(url.host)
	const blogUrls = blogPosts.map((post) =>
		createUrlElement("blog/" + post.slug, post.updated ?? post.created)
	)

	const works = await getWorks(url.host)
	const worksUrls = [...works.entries()].map(([slug, work]) =>
		createUrlElement("work/" + slug, work.updated ?? work.created)
	)

	const urlElements = [
		createUrlElement("/"),
		createUrlElement("work"),
		...worksUrls,
		createUrlElement("blog"),
		...blogUrls,
		createUrlElement("about")
	]

	const xml = html`
		<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${urlElements.join("\n")}
		</urlset>
	`

	return {
		status: 200,
		headers: {
			"Content-Type": "application/xml"
		},
		body: xml
	}
}
