export function hiddenText(node: Element, text: string) {
	const selection = window.getSelection()
	const range = document.createRange()

	function tap() {
		const isHidden = node.classList.contains("hidden")

		if (isHidden) {
			node.removeEventListener("keyup", keyPress)
			node.classList.remove("hidden")
			node.removeAttribute("tabindex")
			node.removeAttribute("aria-label")
			node.innerHTML = text
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
