import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchVoucherImg = async (title1?: string, title2?: string) => {
  const query = groq`*[_type == "vouchers" && (title match "${title1}" || title match "${title2}")]{
    thumbnail,
      title
    }`
  let voucherImg: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      voucherImg = data
    })
    .catch((err) => {
      voucherImg = err
    })
  return voucherImg
}
export default fetchVoucherImg
