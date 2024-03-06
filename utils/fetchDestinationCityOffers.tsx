import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchDestinationCityOffers = async (ref: string) => {
  const query = groq`*[_type == "offerPackages" && offerType != "cug" && (${ref}) && lower(offerType) == "global"] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc){"title": offerBannerTitle.desktopTitle,score,identifier,thumbnail,lengthOfStay,packageType,rateCode,promoCode,memberSpecific,description,"hotelId": hotels[0].participatingHotels[0]->.hotelId,"highlights": hotels[0].inclusions[0].basicInfo.description, "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,identifier},"packages":select(
    inclusions[0].basicInfo.title != null => inclusions[]{"title":basicInfo.title ,inclusionIdentifier},inclusions[0].basicInfo.title == null =>hotels[].inclusions[]{"title":basicInfo.title ,inclusionIdentifier})}`
  let offerData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      offerData = data
    })
    .catch((err) => {
      offerData = err
    })
  return offerData
}

export const fetchSearchHotelOffers = async () => {
  const query = groq`*[_type == "offerPackages" && offerType != "cug" && lower(offerType) == "global"] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc){"title": offerBannerTitle.desktopTitle,score,identifier,rateCode,promoCode,lengthOfStay,thumbnail,packageType,memberSpecific,description,"hotelId": hotels[0].participatingHotels[0]->.hotelId,"highlights": hotels[0].inclusions[0].basicInfo.description,"participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,identifier},"packages":select(
    inclusions[0].basicInfo.title != null => inclusions[]{"title":basicInfo.title ,inclusionIdentifier},inclusions[0].basicInfo.title == null =>hotels[].inclusions[]{"title":basicInfo.title ,inclusionIdentifier})}`
  let offerData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      offerData = data
    })
    .catch((err) => {
      offerData = err
    })
  return offerData
}
