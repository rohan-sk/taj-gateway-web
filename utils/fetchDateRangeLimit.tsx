import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchDateRangeLimit = async () => {
  const query = groq`
  *[_type == "appConfig" ]{checkAvailability}`
  let dateLimitRange: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
        dateLimitRange = data?.[0]
    })
    .catch((err) => {
        dateLimitRange = err
    })
  return dateLimitRange
}
export default fetchDateRangeLimit