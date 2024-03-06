import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHolidayThemePackages = async (id: string, brandCondition: string) => {
  let data: any
  const query = groq`*[
    _type == "offerPackages" && identifier == "${id}"
  ]
  {
    identifier,
    "participatingHotels":
      hotels[].participatingHotels[lower(@->.brandName) ${brandCondition}]->{
      "thumbnail": hotelOverview->.basicInfo.media,
       hotelName,
       hotelDescription,
       hotelId,
       identifier,
       brandName,
       hotelAddress->,
         "hotelType": searchTaxonomies->.hotelType,
         "hotelCode": searchTaxonomies->.hotelCode,
         "synxisHotelId": searchTaxonomies->.synxisHotelId,
         _id,
      }
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

export const fetchDestinationsHolidayThemePackages = async (
  id: string,
  mapString: any,
  IDMatch: any
) => {
  let data: any
  const query = groq`*[
    _type == "offerPackages" && identifier == "${id}" && (${mapString})
  ]
  {
    identifier,
    "participatingHotels":
      hotels[].participatingHotels[(${IDMatch})]->{
      "thumbnail": hotelOverview->.basicInfo.media,
       hotelName,
       hotelDescription,
       hotelId,
       identifier,
       brandName,
       hotelAddress->,
         "hotelType": searchTaxonomies->.hotelType,
         "hotelCode": searchTaxonomies->.hotelCode,
         "synxisHotelId": searchTaxonomies->.synxisHotelId,
         _id,
      }
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
