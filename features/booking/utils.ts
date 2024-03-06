import { groq } from "next-sanity"
import { getClient } from "../../lib-sanity"

export const fetchConfirmationPageHeadingDetails = async () => {
  const query = groq` 
  *[_type=="bookingPaymentStatus"  ]{
    ...
  }`
  const data = await getClient(true)
    .fetch(query)
    .then((res) => res)
    .catch((err) => err)
  return data
}
