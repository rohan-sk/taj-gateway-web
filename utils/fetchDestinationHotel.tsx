import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchDestinationHotels = async (ref: string) => {
  const query = groq`
  *[_type == "hotel" && lower(hotelAddress->.country) == "${ref}"]{hotelName, hotelDescription,"image": hotelOverview->basicInfo.media, hotelId, identifier, brandName, hotelAddress->{city},score}`
  let response: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      response = data
    })
    .catch((err) => {
      response = err
    })
  return response
}
export default fetchDestinationHotels
