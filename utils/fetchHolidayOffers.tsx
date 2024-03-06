import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchHolidayOffers = async () => {
  let data: any;
  const query = groq`*[
    _type == "offerHolidays"] | order(coalesce(score, -1) desc)
  {
    title,
    score,
    thumbnail,
    identifier
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

export const fetchHolidayOffersWithidentifier = async (id: string) => {
  let data: any;
  const query = groq`*[
    _type == "offerHolidays" && identifier != "${id}"]
  {
    title,
    thumbnail,
    identifier
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
