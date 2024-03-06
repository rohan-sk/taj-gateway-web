import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchDestinationHolidayTabs = async (participatingHotels: any, participatingOffers: any) => {
  let data: any;
  const query = groq`*[
    _type == "offerHolidays"
  ] | order(coalesce(score, -1) desc)
  {
    "tabs": [
      {
      "identifier": "all",
      "title":"ALL",
     "type": "all"
},
      ...*[
      _type == "offerHolidays" && (${participatingOffers})
    ] | order(coalesce(score, -1) desc)
    {
      identifier,
      title,
     "type": "experience"
    },
    ...*[
      _type == "offerPackages" && offerType != "cug" && holidayOffer == true && 
      (${participatingHotels})
    ]
    {
      identifier,
      title,
     "type": "theme"
    },

    ],
  }[0]`;
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
