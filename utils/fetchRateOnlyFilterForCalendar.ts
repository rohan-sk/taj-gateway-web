const fetchRateOnlyFilter = () => {
  let userTier =
    global?.window?.localStorage?.getItem("chambersMemberTier") === "ChambersGlobal"
      ? global?.window?.localStorage?.getItem("chambersMemberTier")
      : global?.window?.localStorage?.getItem("userTier")
  if (userTier) {
    switch (userTier?.toLocaleLowerCase()) {
      case "chambersglobal":
        return "RTG"
      case "copper":
        return "RRC"
      case "gold":
        return "RRG"
      case "silver":
        return "RRS"
      case "platinum":
        return "RRP"
      default:
        return "RRC"
    }
  } else {
    return "RRC"
  }
}

export default fetchRateOnlyFilter
