import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchDestinationRestaurants = async (ref: string) => {
  const query = groq`*[_type == "restaurants" && (${ref})] | order(coalesce(score, -1) desc) {"title": bannerTitle.desktopTitle,score,identifier,"image": thumbnail,"description": hotelDetailDiningPage.restaurantInfo.description,"hotelName": select( hotelDetailDiningPage.bannerSubTitle != null => hotelDetailDiningPage.bannerSubTitle , participatingHotels[0]->.hotelName),"contact":hotelDetailDiningPage.restaurantContact->,"cuisine":hotelDetailDiningPage.restaurantAvailability[lower(title) match "cuisine"][0].list[0].item,"hotelIdentifier": participatingHotels[0]->.identifier}`
  let restaurantData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      restaurantData = data
    })
    .catch((err) => {
      restaurantData = err
    })
  return restaurantData
}
