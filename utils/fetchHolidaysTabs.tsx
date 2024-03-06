import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHolidaysTabs = async () => {
  let data: any
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
      _type == "offerHolidays"
    ] | order(coalesce(score, -1) desc)
    {
      identifier,
      'title':upper(title),
      "type": "experience",
      packageType,
      rateCode,
      promoCode
    },
    ...*[
      _type == "offerPackages" && offerType != "cug" && holidayOffer == true
    ] | order(coalesce(score, -1) desc)
    {
      identifier,
      'title':upper(title),
      "type": "theme",
      packageType,
      rateCode,
      promoCode,
      lengthOfStay
    },
    ],
  }[0]`
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
