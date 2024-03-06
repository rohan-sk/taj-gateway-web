import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchRestaurants = async () => {
  const query = groq`*[_type == "restaurants" && thumbnail != null] | order(title asc)|order(coalesce(score, -1) desc) {
    city,
    thumbnail,
    identifier,
    title,
    score,
    bannerTitle,
    cuisines,
    thumbnailDescription,
    "contact":hotelDetailDiningPage.restaurantContact->,
    "cuisine": hotelDetailDiningPage.restaurantAvailability[lower(title) match "cuisine"][0].list[0].item,
    participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
      hotelName,
      identifier,
      score,
    },
  }`
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
export default fetchRestaurants
