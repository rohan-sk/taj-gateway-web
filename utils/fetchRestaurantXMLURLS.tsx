import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchRestaurantXMLURLS = async () => {
    let data: any
    const query = groq`
    *[_type == "restaurants" && identifier != null] | order(coalesce(score, -1) desc) {
        identifier,
          title,
          participatingHotels[] | order(coalesce(score, -1) desc) ->{
            identifier
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