import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHolidayAllTabData = async (cond: string) => {
  let data: any
  const query = groq`*[_type == "offerPackages"] | order(coalesce(score, -1) desc) {
    "participatingHotels": *[
      _type == "offerPackages" && offerType != "cug"  && holidayOffer == true
    ] | order(coalesce(score, -1) desc)
    {
      "participatingHotels":
        hotels[].participatingHotels[lower(@->.brandName) ${cond}] | order(coalesce(score, -1) desc) ->{
        "thumbnail": hotelOverview->.basicInfo.media,
         'hotelName':upper(hotelName),
         hotelDescription,
         hotelId,
         identifier,
         brandName,
         score,
         lengthOfStay,
         "synxisHotelId" : searchTaxonomies->.synxisHotelId,
         hotelAddress->,
         "hotelType": searchTaxonomies->.hotelType,
         "hotelCode": searchTaxonomies->.hotelCode,
         "rateCode": ^.rateCode,
          "promoCode": ^.promoCode,
          "packageType": ^.packageType,
         _id,
        }
    }.participatingHotels[]
  }[0]`
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

export const fetchDestinationHolidayAllTabData = async (
  participatingHotels: any,
  IDMatch: any
) => {
  let data: any
  const query = groq`*[_type == "offerPackages" && offerType != "cug" && (${participatingHotels})] | order(coalesce(score, -1) desc){
    "participatingHotels": *[
      _type == "offerPackages" && offerType != "cug" && holidayOffer == true && (${participatingHotels})
    ] | order(coalesce(score, -1) desc)
    {
      "participatingHotels":
        hotels[].participatingHotels[(${IDMatch})] | order(coalesce(score, -1) desc) ->{
        "thumbnail": hotelOverview->.basicInfo.media,
         hotelName,
         score,
         hotelDescription,
         hotelId,
         identifier,
         brandName,
         lengthOfStay,
         "synxisHotelId" : searchTaxonomies->.synxisHotelId,
         hotelAddress->,
         "hotelType": searchTaxonomies->.hotelType,
         "hotelCode": searchTaxonomies->.hotelCode,
         _id,
        }
    }.participatingHotels[]
  }[0]`
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
