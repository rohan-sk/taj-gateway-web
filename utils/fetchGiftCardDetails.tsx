import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const getGiftCardDetails = async (sku: string | string[]) => {
  const query = groq`*[_type == "giftCardsDetails" && sku == "${sku}"]`
  let GCData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      GCData = data
    })
    .catch((err) => {
      GCData = err
    })
  return GCData
}
export const getGiftCardDetailsbyIdentifier = async (
  identifier: string | string[]
) => {
  const query = groq`*[_type == "giftCardsDetails" && identifier == "${identifier}"]`
  let GCData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      GCData = data
    })
    .catch((err) => {
      GCData = err
    })
  return GCData
}
export const getGiftCardSubCategoryDetails = async (
  identifier: string | string[]
) => {
  const query = groq`*[_type == "giftCardsDetails" && identifier == "${identifier}"]{subCategoryItems[]->}`
  let GCData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      GCData = data
    })
    .catch((err) => {
      GCData = err
    })
  return GCData
}

export default getGiftCardDetails
