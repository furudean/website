function mod(a: number, n: number) {
	return ((a % n) + n) % n
}

export function rot(str: string, shift: number) {
	const a = "a".charCodeAt(0)
	const z = "z".charCodeAt(0)
	const A = "A".charCodeAt(0)
	const Z = "Z".charCodeAt(0)

	let msg = ""

	for (let i = 0; i < str.length; i++) {
		let code = str.charCodeAt(i)

		if (code >= a && code <= z) {
			code = mod(code - a + shift, 26) + a
		}

		if (code >= A && code <= Z) {
			code = mod(code - A + shift, 26) + A
		}

		msg += String.fromCharCode(code)
	}

	return msg
}
