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
