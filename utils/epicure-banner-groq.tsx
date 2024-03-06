import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

// for shareholder, tata, renewal
const fetchEpicureBanners = async (subType: string) => {
  const query = groq`*[_type == "loyaltyEpicure" && membershipType == 'epicure' && subType == '${subType}' ] {
    identifier,
    membershipType,
    subType,
    journeyType,
    banner,
    }`
  let membershipBanners: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      membershipBanners = data
    })
    .catch((err) => {
      membershipBanners = err
    })
  return membershipBanners
}
export default fetchEpicureBanners

// for normal journey
export const fetchEpicureJourneyBanners = async () => {
    const query = groq`*[_type == "loyaltyEpicure" && identifier == 'epicureprogram' ] {
      identifier,
      membershipType,
      subType,
      journeyType,
      banner,
      }`
    let membershipJourneyBanners: any
    await getClient(true)
      .fetch(query)
      .then((data) => {
        membershipJourneyBanners = data
      })
      .catch((err) => {
        membershipJourneyBanners = err
      })
    return membershipJourneyBanners
  }

// for bank urls
export const fetchEpicureBankBanners = async (identifier: string) => {
  const query = groq`*[_type == "loyaltyEpicure"&&subType == 'bank' && identifier == "${identifier}" ] {
      identifier,
      membershipType,
      subType,
      journeyType,
      banner,
  }`
  let membershipBankBanners: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      membershipBankBanners = data
    })
    .catch((err) => {
      membershipBankBanners = err
    })
  return membershipBankBanners
}
