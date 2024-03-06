import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHolidaysXMLURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "offerHolidays" && identifier != null] {
        identifier,
          title
      }
     `
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

export const fetchVacationThemeURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "offerPackages" && offerType != "cug" && holidayOffer == true && identifier != null] | order(coalesce(score, -1) desc) {
        identifier,
          title,
      }
     `
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