import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchBrandRestaurantsXMLURLs = async () => {
    let data: any
    const query = groq`
    *[_type == "restaurantBrand" && identifier != null] {
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