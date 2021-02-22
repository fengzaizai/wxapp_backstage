export function changeDate(e) {
  e = e.split('/')
  return `${e[0]}/${e[1]}/${e[2]} ${e[3]}:${e[4]}:${e[5]}`
}