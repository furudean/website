export function selectable(node: Element) {
	const selection = window.getSelection()
	const range = document.createRange()

	function select() {
		range.selectNodeContents(node)
		selection.removeAllRanges()
		selection.addRange(range)
	}

	node.addEventListener("click", select)
}
