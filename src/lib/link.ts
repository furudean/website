/**
 * Rewrite hashes on anchor links to include path
 */
export function rewriteFragmentLinks(url: string, element: HTMLElement): void {
	const { origin, pathname } = new URL(url)

	element.querySelectorAll("a").forEach((a) => {
		if (a.hash.length > 0 && a.origin === origin) {
			a.href = pathname + a.hash
		}
	})
}

/**
 * Set a class on all headers with fragment link so a unique style can be
 * shown.
 */
export function updateFragmentLinkTarget(
	url: string,
	element: HTMLElement
): void {
	const anchors = element.querySelectorAll("h1 > a, h2 > a, h3 > a" as "a")
	const { hash } = new URL(url)

	anchors.forEach((a) => {
		if (hash.length && hash === new URL(a.href).hash) {
			a.classList.add("is-target")
		} else {
			a.classList.remove("is-target")
		}
	})
}
