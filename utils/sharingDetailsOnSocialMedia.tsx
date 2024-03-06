const SharingDetails = (sharedPath: string, customMessage: string = "",emailSubject:string = "",emailId:string ="") => {
  const currentPath = global?.window?.location?.href
  const path = encodeURIComponent(currentPath || "")
  switch (sharedPath) {
    case "https://www.messenger.com/":
      global?.window?.open(`${sharedPath}?u=${path}`, "_blank")
      break
    case "https://www.instagram.com/":
      global?.window?.open(`${sharedPath}?u=${path}`, "_blank")
      break
    case "https://wa.me":
      {
        if (customMessage) {
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
            customMessage
          )}`
          global?.window?.open(whatsappUrl, "_blank")
        } else {
          global?.window?.open(`${sharedPath}?text=${path}`, "_blank")
        }
      }
      break
    case "https://mail.google.com/":
      global?.window?.open(
        `${sharedPath}?view=cm&to=${emailId}&su=${emailSubject} &body=${encodeURIComponent(customMessage)}`,
        "_blank"
      )
      break
    default:
      break
  }
}

export default SharingDetails
