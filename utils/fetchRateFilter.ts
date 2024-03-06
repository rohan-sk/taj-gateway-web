const fetchRateFilter = () => {
  let userTier =
    global?.window?.localStorage?.getItem("chambersMemberTier") === "ChambersGlobal"
      ? global?.window?.localStorage?.getItem("chambersMemberTier")
      : global?.window?.localStorage?.getItem("userTier")
  if (userTier) {
    switch (userTier?.toLocaleLowerCase()) {
      case "chambersglobal":
        return "RTG,PKG,MD"
      case "copper":
        return "RRC,PKG,MD"
      case "gold":
        return "RRG,PKG,MD"
      case "silver":
        return "RRS,PKG,MD"
      case "platinum":
        return "RRP,PKG,MD"
      default:
        return "RRC,PKG,MD"
    }
  }
}

export default fetchRateFilter
