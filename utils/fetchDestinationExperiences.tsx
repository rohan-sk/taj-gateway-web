import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchDestinationExperiences = async (
  ref: string,
  mapRef: string,
  identifier: string
) => {
  const query = groq`*[_type == "destination" && identifier == "${identifier}" && (${ref})]{"hotels": participatingHotels[(${mapRef})] -> {identifier,hotelName,"experiences": hotelExperiences->.experienceDetails}}`;
  let experiencesData: any;
  await getClient(true)
    .fetch(query)
    .then(async (data) => {
      let arr: any = [];
      await data?.[0]?.hotels?.map((val: any) => {
        const resultSet = val?.experiences?.map((obj: any) => {
          return {
            ...obj,
            identifier: val?.identifier,
            hotelName: val?.hotelName
          }
        })
        arr = resultSet?.length > 0 ? arr.concat(resultSet) : arr;
      });
      experiencesData = arr;
    })
    .catch((err) => {
      experiencesData = err;
    });
  return experiencesData;
};
