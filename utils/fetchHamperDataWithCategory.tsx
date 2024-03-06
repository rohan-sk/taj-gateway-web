import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchHamperDataWithCategory = async (
    type: string = "signature-hamper"
  ) => {
    let data: any
    const query = groq`
    *[_type == "hampers" && 
  type == "dynamic" && 
  hamperCategory->.identifier == "${type}"] {
  title,
  description,
  identifier,
  "hamperId": hamperCategory->.identifier,
  bannerTitle,
  thumbnail,
  hamperTab,
  hamperSet,
  participatingHotels[] | order(coalesce(score, -1) desc) ->{
    ...,
    "email":hotelContact->email
  }
}
     `
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
      })
      .catch((err) => {
        data = err
      })
    return data
  }


  export const fetchHamperDataWithIdCheck = async (
    type: string = "signature-hamper",
    id: string = "regalia-hampers"
  ) => {
    let data: any
    const query = groq`
    *[_type == "hampers" && 
  type == "dynamic" && 
  hamperCategory->.identifier == "${type}" && identifier != "${id}"] {
  title,
  description,
  identifier,
  "hamperId": hamperCategory->.identifier,
  bannerTitle,
  thumbnail,
  hamperTab,
  hamperSet,
  participatingHotels[] | order(coalesce(score, -1) desc) ->{
    ...,
  }
}
     `
  await getClient(true)
    .fetch(query)
    .then((res) => {
      data = res
    })
    .catch((err) => {
      data = err
    })
  return data
}
