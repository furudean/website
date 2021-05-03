export function ceasar(str: string, shift: number): string {
	return str
		.split("")
		.map((symbol) => symbol.charCodeAt(0))
		.map((code) => String.fromCharCode(((code - 97 + shift) % 26) + 97))
		.join("")
}
