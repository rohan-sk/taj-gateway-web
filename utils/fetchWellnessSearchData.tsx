import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchWellnessSearchData = async (searchTerm: string) => {
    const query = groq`
       *[_type == "hotel" && identifier != null
&& brandName match "Taj" && 
  (hotelNavigation->j_wellness_circle == true || hotelNavigation->wellness == true)] | order(coalesce(score, -1) desc) {
    score,
"name":hotelName,
"id":hotelId,
   identifier,
    hotelDescription
}    `
    let data: any
    await getClient(true)
        .fetch(query)
        .then((result) => {
            data = result
        })
        .catch((err) => {
            data = err
        })
    return data
}
export default fetchWellnessSearchData
