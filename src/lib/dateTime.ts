const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

export function friendlyDate(date: string | number | Date): string {
  const d = new Date(date);
  const dd = d.getDate() + 1;
  const mmm = months[d.getMonth()];
  const yyyy = d.getFullYear();

  if (yyyy === new Date().getFullYear()) {
    return `${mmm} ${dd} `
  } else {
    return `${mmm} ${dd}, ${yyyy}`
  }
}
