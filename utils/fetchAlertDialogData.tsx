import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchAlertDialogData = async (identifier: string) => {
  let data: any
  const query = groq`    
  *[
    _type == "appConfig" 
  ]{
  "epicurePopupMessage" :   popupMessages[ identifier match "${identifier}"]
  }`
  await getClient(true)
    .fetch(query)
    .then((res) => {
      data = res
    })
    .catch((err) => {
      data = err
    })
  return data
}
