const monthsShort = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
]

const monthsLong = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"Sepember",
	"October",
	"November",
	"December"
]

export function friendlyDate(
	date: string | number | Date,
	long = false
): string {
	const months = long ? monthsLong : monthsShort
	const d = new Date(date)
	const dd = d.getDate()
	const mmm = months[d.getMonth()]
	const yyyy = d.getFullYear()

	if (long || yyyy !== new Date().getFullYear()) {
		return `${mmm} ${dd}, ${yyyy}`
	} else {
		return `${mmm} ${dd}`
	}
}
