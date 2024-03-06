import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchMembershipDetails = async () => {
  const query = groq`*[
    _type == "memberships"
  ]{
  ...
  }`
  let membershipData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      membershipData = data
    })
    .catch((err) => {
      membershipData = err
    })
  return membershipData
}
export default fetchMembershipDetails
