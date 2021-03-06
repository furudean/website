import type { MarkedOptions, Renderer } from "marked";
import { html } from "common-tags";
import Prism from 'prismjs';
import 'prism-svelte';

function isAbsoluteUrl(url: string): boolean {
	return url.startsWith('http://') || url.startsWith('https://');
}

// Types are incorrect for renderer - passing a renderer with missing methods is 
// perfectly valid. We do @ts-ignore as a workaround.	
// @ts-ignore
export const renderer: Renderer = {
	// add fragment links to headings
	heading(text, level, _, slugger) {
		const fragment = slugger.slug(text);

		return html`
			<h${level} id="${fragment}">
				<a href="#${fragment}">${text}</a>
			</h${level}>
		`;
	},

	// render images as a <figure> element
	image(href, title, alt) {
		return html`
			<figure>
				<img src="${href}" alt="${alt}">
				${title ? `<figcaption>${title}</figcaption>` : ""}
			</figure>
    `;
	},

	// add class to links, treat absolute links like the devil
	link(href, title, text) {
		const externalAttributes = isAbsoluteUrl(href) ?
			`target="_blank" rel="noopener"` : "";

		return html`
			<a class="text-link"
				href="${href}"
				${title ? `title="${title}"` : ""}
				${externalAttributes}
			>${text}</a>
  	`;
	},

	list(body, ordered, start) {
		const type = ordered ? 'ol' : 'ul',
			startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
		return `<${type}${startatt} class="list">${body}</${type}>`;
	},
};

export const markedOptions: MarkedOptions = {
	renderer,
	smartypants: true,
	highlight: (code, language) => {
		if (language in Prism.languages) {
			return Prism.highlight(code, Prism.languages[language], language);
		} else {
			return code;
		}
	},
}