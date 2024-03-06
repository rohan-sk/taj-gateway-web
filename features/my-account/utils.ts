import { groq } from "next-sanity"
import { getClient } from "../../lib-sanity"

const fetchVouchersData = async (VouchersIdentifier: string) => {
  let data
  const query = groq`
    *[_type == "vouchers" && title=="${VouchersIdentifier}"]{tnc,thumbnail, banner}[0]`
  await getClient(true)
    .fetch(query)
    .then((res) => (data = res))
    .catch((err) => (data = err))
  return data
}

export default fetchVouchersData
