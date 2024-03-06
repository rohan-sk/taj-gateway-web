import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

const fetchOtherBrandRestaurants = async (currentBrand: string) => {
  const query = groq`
  *[_type == "restaurantBrand" && identifier != "${currentBrand}" && identifier != null]{title,identifier,thumbnail,"description": introSection->description}`;
  let restaurantBrand: any;
  await getClient(true)
    .fetch(query)
    .then((data) => {
      restaurantBrand = data;
    })
    .catch((err) => {
      restaurantBrand = err;
    });
  return restaurantBrand;
};
export default fetchOtherBrandRestaurants;
