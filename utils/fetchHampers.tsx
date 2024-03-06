import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const HampersData = async () => {
    let data: any
    const query = groq`
     *[_type == "hampers" && identifier != null ]{
    participatingHotels[]| order(coalesce(score, -1) desc)->{
    "title":^.title,
    "subTitle":^.subtitle,
    "hamperId":^.identifier,
    "description":^.description,
    "email":^.email,
    "phone":^.phone,
    "hamperType":^.type,
    "thumbnail":^.thumbnail[]{
      "image":imageAsset.image[0],
      "largeImage":imageAsset.largeImage[0]
      },
    hotelName,
    identifier,
    score,
    "city":hotelAddress->city,
    brandName
    },
}`
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

export const staticHamperData = async () => {
  let data: any
  const query = groq`    
*[_type == "hampers"]{
"participatingHotels": [
...*[_type == "hampers" && identifier != null && type == "static"
&& participatingRestaurants[0] != null
    ]{
  "items": participatingRestaurants[0]->{
      "title":^.title,
      "subTitle":^.subtitle,
      "hamperId":^.identifier,
      "description":^.description,
      "email":^.email,
      "phone":^.phone,
      "hamperType":^.type,
      "thumbnail":^.thumbnail[]{
        "image":imageAsset.image[0],
        "largeImage":imageAsset.largeImage[0]
        },
      "hotelName": participatingHotels[0]->.hotelName,
      "identifier":  participatingHotels[0]->.identifier,
      "city": city,
      "brandName": participatingHotels[0]->.brandName
      },
  },
...*[_type == "hampers" && identifier != null && type == "static" 
&& participatingRestaurants[0] == null]{
  "items": participatingHotels[0]->{
      "title":^.title,
      "subTitle":^.subtitle,
      "hamperId":^.identifier,
      "description":^.description,
      "email":^.email,
      "phone":^.phone,
      "hamperType":^.type,
      "thumbnail":^.thumbnail[]{
        "image":imageAsset.image[0],
        "largeImage":imageAsset.largeImage[0]
        },
      "hotelName": hotelName,
      "identifier":  identifier,
      "city": hotelAddress->.city,
      "brandName": brandName
      },
  }
].items
  }[0]`
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
