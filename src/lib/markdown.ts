import { Renderer, MarkedOptions } from "marked";
import { html } from "common-tags";
import Prism from 'prismjs';
import 'prism-svelte';

function isAbsoluteUrl(url: string): boolean {
	return url.startsWith('http://') || url.startsWith('https://');
}

const renderer = new Renderer()

// add fragment links to headings
renderer.heading = (text, level, _, slugger) => {
	const fragment = slugger.slug(text);

	return html`
		<h${level} id="${fragment}">
			<a href="#${fragment}">${text}</a>
		</h${level}>
	`;
}

// render images as a <figure> element
renderer.image = (href, title, alt) => html`
	<figure>
		<img src="${href}" alt="${alt}">
		${title ? `<figcaption>${title}</figcaption>` : ""}
	</figure>
`;

// add class to links, treat absolute links like the devil
renderer.link = (href, title, text) => {
	const externalAttributes = isAbsoluteUrl(href) ?
		`target="_blank" rel="noopener"` : "";

	return html`
		<a class="text-link"
			href="${href}"
			${title ? `title="${title}"` : ""}
			${externalAttributes}
		>${text}</a>
	`;
};

// add class to lists
renderer.list = (body, ordered, start) => {
	const type = ordered ? 'ol' : 'ul',
		startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
	return `<${type}${startatt} class="list">${body}</${type}>`;
}

// Prevent images from generating extraneous paragraphs
// See issue: https://github.com/markedjs/marked/issues/773#issuecomment-238095374
renderer.paragraph = (text) => {
	if (text.startsWith('<figure') && text.endsWith('</figure>')) {
		return text;
	} else {
		return '<p>' + text + '</p>';
	}
}

export { renderer };

export const highlight: MarkedOptions["highlight"] = (code, language) => {
	if (language in Prism.languages) {
		return Prism.highlight(code, Prism.languages[language], language);
	} else {
		return code;
	}
}