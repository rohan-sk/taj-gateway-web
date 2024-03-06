import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

export const fetchDestinationSpaHotel = async (ref: string, mapRef: string) => {
  const query = groq`*[_type == "destination" && (${ref})] | order(coalesce(score, -1) desc) {"hotels": participatingHotels[(${mapRef})] -> {identifier,hotelName,score,hotelOverview->,"hotelDescription": hotelWellness->.spaDetails.description,brandName,hotelId,"spasAvailable": (count(coalesce(hotelWellness->signatureTreatments.signatureTreatmentDetails, [])) > 0|| count(coalesce(hotelWellness->ayurvedaTherapies.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->indianAromaTherapies.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->spaIndulgences.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->indianTherapies.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->beauty.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->yogaAndMeditation.signatureTreatmentDetails, [])) > 0 || count(coalesce(hotelWellness->bodyScrubsAndWraps.signatureTreatmentDetails, [])) > 0)}}`;
  let hotelData: any;
  await getClient(true)
    .fetch(query)
    .then(async (data) => {
      hotelData = data?.[0]?.hotels;
    })
    .catch((err) => {
      hotelData = err;
    });
  return hotelData;
};
