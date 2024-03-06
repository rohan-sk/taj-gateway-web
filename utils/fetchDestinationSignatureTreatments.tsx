import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const fetchDestinationSignatureTreatments = async (
  ref: string,
  mapRef: string,
  identifier: string
) => {
  const query = groq`*[_type == "destination" && identifier == "${identifier}" && (${ref})]{"hotels": participatingHotels[(${mapRef})] -> {identifier,hotelName,"signatureTreatments": hotelWellness->signatureTreatments.signatureTreatmentDetails}}`
  let treatmentData: any
  await getClient(true)
    .fetch(query)
    .then(async (data) => {
      let arr: any = []
      await data?.[0]?.hotels?.map((val: any) => {
        const resultSet = val?.signatureTreatments?.map((obj: any) => {
          return {
            ...obj,
            identifier: val?.identifier,
            hotelName: val?.hotelName,
          }
        })
        arr = resultSet?.length > 0 ? arr.concat(resultSet) : arr
      })
      treatmentData = arr
    })
    .catch((err) => {
      treatmentData = err
    })
  return treatmentData
}
