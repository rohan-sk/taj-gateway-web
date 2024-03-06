import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchDestinationXMLURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "destination" && identifier != null] | order(coalesce(score, -1) desc) {
        name,
              identifier,
                destinationNavigation->{
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

  export const fetchCountryDestinationXMLURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "country"]{identifier}
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