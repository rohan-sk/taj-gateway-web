import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchHolidays = async () => {
  let data: any;
  const query = groq`*[
        _type == "offerHolidays"
      ] | order(coalesce(score, -1) desc) {
      ...,
      "participatingHotels": participatingOffers[]->.hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->
      }`;
  await getClient(true)
    .fetch(query)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
};
