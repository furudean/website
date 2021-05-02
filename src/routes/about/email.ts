const p1 = "hel"
const p2 = "lo@ca"
const p3 = "ss.m"
const p4 = "oe"

export function revealEmail(node: Element) {
	const selection = window.getSelection()
	const range = document.createRange()

	function tap() {
		const isHidden = node.classList.contains("hidden")

		if (isHidden) {
			node.removeEventListener("keyup", keyPress)
			node.classList.remove("hidden")
			node.removeAttribute("tabindex")
			node.removeAttribute("aria-label")
			node.innerHTML = p1 + p2 + p3 + p4
		} else {
			range.selectNodeContents(node)
			selection.removeAllRanges()
			selection.addRange(range)
		}
	}

	function keyPress(event: KeyboardEvent) {
		if (["Enter", " "].includes(event.key)) {
			tap()
		}
	}

	node.addEventListener("keyup", keyPress)
	node.addEventListener("click", tap)
}
