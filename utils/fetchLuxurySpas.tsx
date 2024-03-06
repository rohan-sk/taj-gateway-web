import { groq } from "next-sanity";
import { getClient } from "../lib-sanity";

const fetchLuxurySpas = async () => {
  const query = groq`
  *[_type == "hotel" && identifier!=null && brandName match "Taj" 
  && hotelNavigation->j_wellness_circle == true && 
  ((count(coalesce(hotelWellness->signatureTreatments.signatureTreatmentDetails, [])) > 0
|| count(coalesce(hotelWellness->ayurvedaTherapies.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->indianAromaTherapies.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->spaIndulgences.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->indianTherapies.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->beauty.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->yogaAndMeditation.signatureTreatmentDetails, [])) > 0 
|| count(coalesce(hotelWellness->bodyScrubsAndWraps.signatureTreatmentDetails, [])) > 0))]| order(coalesce(score, -1) desc){
  hotelName,brandName,hotelId,identifier,
  "image": hotelOverview->basicInfo.media,
  score,
  hotelAddress->{city},
  "hotelDescription": hotelWellness->.spaDetails.description,
  "signature_experiences": count(coalesce(hotelWellness->signatureTreatments.signatureTreatmentDetails, [])) > 0,
  "ayurveda_therapies": count(coalesce(hotelWellness->ayurvedaTherapies.signatureTreatmentDetails, [])) > 0,
  "indian_aromatherapies": count(coalesce(hotelWellness->indianAromaTherapies.signatureTreatmentDetails, [])) > 0,
  "spa_indulgences": count(coalesce(hotelWellness->spaIndulgences.signatureTreatmentDetails, [])) > 0,
  "indian_therapies": count(coalesce(hotelWellness->indianTherapies.signatureTreatmentDetails, [])) > 0,
  "beauty_and_facials": count(coalesce(hotelWellness->beauty.signatureTreatmentDetails, [])) > 0,
  "yoga_&_meditation": count(coalesce(hotelWellness->yogaAndMeditation.signatureTreatmentDetails, [])) > 0,
  "body_scrubs_and_wraps": count(coalesce(hotelWellness->bodyScrubsAndWraps.signatureTreatmentDetails, [])) > 0,
  hotelContact->{
  businessPhone, 
  businessEmail,
  "email":email[type == "wellness" || type=="business"].email,
  "phone":phone[type == "wellness" || type=="business"].mobile
  }
}`;
  let response: any;
  await getClient(true)
    .fetch(query)
    .then((data) => {
      response = data;
    })
    .catch((err) => {
      response = err;
    });
  return response;
};
export default fetchLuxurySpas;
