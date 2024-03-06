function Pluralize(singular: string, times: number, Capital: boolean = true) {
  if (times == 0) return
  else if (times == undefined) return
  else if (times == 1) return `${times} ${singular}`
  else {
    if (singular?.toLowerCase() === "child") {
      return `${times} ${singular}${Capital ? "REN" : "ren"}`
    } else {
      return `${times} ${singular}${Capital ? "S" : "s"}`
    }
  }
}
export default Pluralize
