import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchOfferHotelXMLURLS = async () => {
  let data: any
  const query = groq`
    *[
        _type == "offerPackages"
      && offerType != "cug" && holidayOffer != true && identifier != null
      ] | order(coalesce(score, -1) desc)
      {
        identifier,
        "participatingHotels":
          hotels[].participatingHotels[] | order(coalesce(score, -1) desc) ->{
         hotelName,
           identifier,
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

export const fetchOfferXMLURLS = async () => {
  let data: any
  const query = groq`
      *[
          _type == "offerPackages"
        && offerType != "cug" && holidayOffer != true && lower(offerType) == "global"
        ] | order(coalesce(score, -1) desc)
        {
          identifier
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
