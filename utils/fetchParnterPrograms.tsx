import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

const fetchParnterPrograms = async (type: any) => {
  const query = groq`*[_type == "programs" && identifier == "${type}"]
  {
    participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
       hotelName,
       identifier,
       hotelId,
       brandName,
       score,
       "image":hotelOverview->basicInfo.media,
       "hotelDescription":hotelOverview->basicInfo.description,
       "hotelType": searchTaxonomies->hotelType,
       "contact":hotelContact->{"email":email[0].email,"phone":phone[0].mobile},
       hotelAddress->{city,addressLine1,street, state, pincode, longitude, latitude},
    }
  }[0]`;
  let response: any;
  await getClient(true)
    .fetch(query)
    .then((data) => {
      response = data?.participatingHotels;
    })
    .catch((err) => {
      response = err;
    });
  return response;
};
export default fetchParnterPrograms;
