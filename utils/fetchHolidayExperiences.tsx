import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHolidaysExperiences = async (id: string, brandCondition: string) => {
  let data: any
  const query = groq`*[
    _type == "offerHolidays" && identifier == "${id}"
  ]
  {
    identifier,
    "themes": participatingOffers[]->{
      title,
      identifier,
      "comparingHotels": ^.participatingHotels[lower(@->.brandName) ${brandCondition}]->{identifier},
      "participatingHotels": hotels[].participatingHotels[lower(@->.brandName) ${brandCondition}]->{
       "thumbnail": hotelOverview->.basicInfo.media,
       'hotelName':upper(hotelName),
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

export const fetchDestinationHolidaysExperiences = async (
  id: string,
  participatingHotels: any,
  IDMatch: any
) => {
  let data: any
  const query = groq`*[
    _type == "offerHolidays" && identifier == "${id}"  && (${participatingHotels})
  ]
  {
    identifier,
    "themes": participatingOffers[]->{
      title,
      identifier,
      "comparingHotels": ^.participatingHotels[(${IDMatch})]->{identifier},
      "participatingHotels": hotels[].participatingHotels[(${IDMatch})]->{
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
