import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchPropertiesXMLURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "hotel" && identifier != null] {
        hotelName,
        identifier,
        hotelNavigation->{
            ...,
          }
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