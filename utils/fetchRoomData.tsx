import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

const fetchRoomData = async (hotelID: any, SponsorId = "") => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{
    "hotelType": searchTaxonomies->.hotelType,
    "hotelCode": searchTaxonomies->.hotelCode,
    brandName,
    ${SponsorId !== "" ? `"hotelSponsorId":${SponsorId},` : ""}
    "synxisHotelId" : searchTaxonomies->.synxisHotelId,
    hotelAddress->,hotelBannerTitle, hotelContact->,hotelId,searchTaxonomies->,subAccountId,hotelRooms->{
      ...,
      "roomsList": roomsList[]{
        ...,
        "rateCodeList": rateCodeList[]->
      }
     }}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export default fetchRoomData
export const fetchConfirmRoomData = async (hotelID: any) => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{
    "hotelType": searchTaxonomies->.hotelType,
    "hotelCode": searchTaxonomies->.hotelCode,
    brandName,
    "synxisHotelId" : searchTaxonomies->.synxisHotelId,
    hotelAddress->{
      city,state,country,pincode,title},hotelId}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}

export const fetchRoomDataWithIdentifier = async (identifier = "taj-lands-end-mumbai") => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${identifier}"]{
    "synxisHotelId" : searchTaxonomies->.synxisHotelId,
    hotelAddress->, hotelContact->,hotelId,hotelRooms->{
      ...,
      "roomsList": roomsList[]{
        ...,
        "rateCodeList": rateCodeList[]->
      }
     }}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}

export const fetchHighlightedCardData = async (hotelID: any, propertyValue: any) => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{
    ${propertyValue}->,hotelName,hotelBannerTitle,hotelDocuments
     }[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchHighlightedCardDataWithIdentifier = async (
  identifier = "taj-lands-end-mumbai",
  propertyValue: any,
) => {
  const query = groq`
  *[_type == "hotel" && identifier == "${identifier}"]{
    ${propertyValue}->,hotelName,hotelBannerTitle,hotelDocuments,hotelId
     }[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchHighlightedCardDataWithParticipatingHotels = async (ref: any) => {
  const query = groq`*[_type == "restaurants" && participatingHotels[]._ref match "${ref}"] | order(coalesce(score, -1) desc) {title,score,openingHours,identifier,thumbnail,thumbnailDescription,gallery,restaurantGallery,hotelDetailDiningPage {restaurantInfo {description},restaurantAvailability,restaurantContact-> {email, phone}}}`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchRestaurantsDataWithCity = async (ref: any) => {
  const query = groq`*[_type == "restaurants" && city == "${ref}"] | order(coalesce(score, -1) desc) {thumbnailDescription,score,"participatingHotels":{"hotelId": participatingHotels[0]->.hotelId,"hotelName": participatingHotels[0]->.hotelName,"identifier": participatingHotels[0]->.identifier},title,openingHours,identifier,thumbnail,gallery,hotelDetailDiningPage {restaurantInfo {description},restaurantAvailability,restaurantContact-> {email, phone}}}`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchHotelGalleryData = async (hotelID: any, propertyValue: any) => {
  const query = groq`
*[_type == "hotel" && identifier == "${hotelID}"]{
  ${propertyValue}->{
  sectionTitle,
  description,
  "mediaDetails": hotelMedia[]{
  categoryTitle,
  category,
  "media": coalesce(
    videos,
    images
  )
  }
},
}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchHotelInformation = async (hotelID: any) => {
  const query = groq`
  *[_type == "hotel" && identifier == "${hotelID}"]{_id,hotelId,hotelOffers->{ sectionTitle, description},hotelAddress->,hotelAvailability->,hotelContact->,hotelName,hotelOverview->{basicInfo{media}}}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}

export const fetchHotelInformationwithHotelId = async (hotelID: any) => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{_id,hotelId,hotelOffers->{ sectionTitle, description},hotelAddress->,hotelAvailability->,hotelContact->,hotelName,brandName,hotelOverview->{basicInfo{media}}}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}
export const fetchHotelWithDocuments = async (hotelID: any) => {
  const query = groq`
  *[_type == "hotel" && identifier == "${hotelID}"]{hotelAddress->,hotelAvailability->,hotelContact->,hotelName,hotelDocuments,hotelOverview->{basicInfo{media}}}[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}

export const fetchHotelInformationWithIdentifier = async (identifier = "taj-lands-end-mumbai") => {
  const query = groq`
  *[_type == "hotel" && identifier == "${identifier}"]{
    "synxisHotelId" : searchTaxonomies->.synxisHotelId,
    hotelAddress->,hotelAvailability->,hotelContact->,hotelName
     }[0]`
  let hotelData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelData = data
    })
    .catch((err) => {
      hotelData = err
    })
  return hotelData
}

export const fetchBrandData = async (hotelID: string) => {
  const query = groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{
    brandId , hotelSocialInfo->}[0]`
  let hotelBrandData
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelBrandData = data
    })
    .catch((err) => {
      hotelBrandData = err
    })
  return hotelBrandData
}

export const fetchBrandDataWithIdentifier = async (identifier: string) => {
  const query = groq`
  *[_type == "hotel" && identifier == "${identifier}"]{
    brandId , hotelSocialInfo->}[0]`
  let hotelBrandData
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelBrandData = data
    })
    .catch((err) => {
      hotelBrandData = err
    })
  return hotelBrandData
}
export const fetchHotelTabIcons = async () => {
  const query = groq`
  *[_type =="globalConfig"&&id=="hotel-icons"]{
  imageList
}`
  let res: any = []
  await getClient(true)
    .fetch(query)
    .then((data) => {
      res = data?.[0]?.imageList
    })
    .catch((err) => {
      res = err
    })
  return res
}

export const fetchInitialHotelListingData = async () => {
  let query: any

  query = groq`
              *[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null ]|order(hotelName asc) | order(coalesce(score, -1) desc) {
              hotelName,
              score,
              hotelId,
              identifier,
              hotelDescription,
              hotelPath,
              brandName,
              "hotelType": searchTaxonomies->.hotelType,
              "hotelCode": searchTaxonomies->.hotelCode,
              "synxisHotelId" : searchTaxonomies->.synxisHotelId,
              hotelOverview->{
              basicInfo{
              media[0]
              }
              },
              hotelAddress->{
              city,...}
              }[0..10]`

  let hotelsData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelsData = data
    })
    .catch((err) => {
      hotelsData = err
    })
  return hotelsData
}
export const fetchHotelSearchListingData = async (selectedType: string, searchTerm?: string) => {
  let query: any
  query = groq`
          {  "totalCount":count(*[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null
            ${searchTerm && `&& hotelName match lower("*${searchTerm}*")`}
              ${selectedType ? `&& searchTaxonomies->hotelType == "${selectedType}"` : ""}]),
              "hotelData":*[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null ${
                searchTerm &&
                `&& (hotelName match lower("*${searchTerm}*") || lower(hotelAddress->state) match lower("*${searchTerm}*"))`
              }
              ${
                selectedType ? `&& searchTaxonomies->hotelType == "${selectedType}"` : ""
              }]|order(hotelName asc) | order(coalesce(score, -1) desc){
              hotelName,
              hotelId,
              score,
              identifier,
              hotelDescription,
              hotelPath,
              brandName,
              "hotelType": searchTaxonomies->.hotelType,
              "hotelCode": searchTaxonomies->.hotelCode,
              "synxisHotelId" : searchTaxonomies->.synxisHotelId,
              hotelOverview->{
              basicInfo{
              media[0]
              }
              },
              hotelAddress->{
                city,state,country,pincode,title}
              }[${0}..${10}]}`

  let hotelsData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelsData = data
    })
    .catch((err) => {
      hotelsData = err
    })
  return hotelsData
}
export const fetchHotelListingTabsData = async (
  pagingStart: number,
  pagingEnd: number,
  selectedType: string,
  searchTerm?: string,
) => {
  let query: any

  if (pagingEnd || pagingStart) {
    query = groq`
             { "totalCount":count(*[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null
             ${searchTerm && `&& hotelName match lower("*${searchTerm}*")`}
            ${selectedType ? `&& searchTaxonomies->hotelType == "${selectedType}"` : ""}]),
              "hoteldata":*[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null 
              ${searchTerm && `&& hotelName match lower("*${searchTerm}*")`}
              ${
                selectedType ? `&& searchTaxonomies->hotelType == "${selectedType}"` : ""
              }]|order(hotelName asc) | order(coalesce(score, -1) desc){
              hotelName,
              hotelId,
              score,
              identifier,
              hotelDescription,
              hotelPath,
              brandName,
              "hotelType": searchTaxonomies->.hotelType,
              "hotelCode": searchTaxonomies->.hotelCode,
              "synxisHotelId" : searchTaxonomies->.synxisHotelId,
              hotelOverview->{
              basicInfo{
              media[0]
              }
              },
              hotelAddress->{
              city,state,country,pincode,title}
              }[${pagingStart}..${pagingEnd}]}`
  }

  let hotelsData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelsData = data
    })
    .catch((err) => {
      hotelsData = err
    })
  return hotelsData
}

export const fetchHotelListingData = async (pagingStart?: number, pagingEnd?: number, searchTerm?: string) => {
  let query: any

  if (pagingEnd || pagingStart) {
    query = groq`
              *[_type=="hotel"&& brandName== "Taj" && hotelOverview-> basicInfo!=null ${
                searchTerm && `&& hotelName match lower("*${searchTerm}*")`
              }]|order(hotelName asc) | order(coalesce(score, -1) desc) {
              hotelName,
              hotelId,
              score,
              identifier,
              hotelDescription,
              hotelPath,
              brandName,
              "hotelType": searchTaxonomies->.hotelType,
              "hotelCode": searchTaxonomies->.hotelCode,
              "synxisHotelId" : searchTaxonomies->.synxisHotelId,
              hotelOverview->{
              basicInfo{
              media[0]
              }
              },
              hotelAddress->{
              city,state,country,pincode,title}
              }[${pagingStart}..${pagingEnd}]`
  }

  let hotelsData: any
  await getClient(true)
    .fetch(query)
    .then((data) => {
      hotelsData = data
    })
    .catch((err) => {
      hotelsData = err
    })
  return hotelsData
}

export const fetchHotelTypes = async () => {
  let data: any
  const query = groq`
  *[_type=="hotel"&& hotelOverview-> basicInfo!=null && brandName=="Taj" && searchTaxonomies->hotelType!=null] | order(coalesce(score, -1) desc) {score,searchTaxonomies->{hotelType}}`
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

export const fetchHotelByTypes = async (type: string) => {
  let data: any
  const query = groq`
                  *[_type=="hotel"&& brandName=="Taj" &&hotelOverview-> basicInfo!=null ${
                    type ? `&& searchTaxonomies->hotelType == "${type}"` : ""
                  }]|order(hotelName asc) | order(coalesce(score, -1) desc) {
              hotelName,
              score,
              identifier,
              hotelId,
              hotelDescription,
              hotelPath,
              brandName,
              "hotelType": searchTaxonomies->.hotelType,
              "hotelCode": searchTaxonomies->.hotelCode,
              "synxisHotelId" : searchTaxonomies->.synxisHotelId,
              hotelOverview->{
                basicInfo{
                media[0]
                }
              },
              hotelAddress->{
                city,state,country,pincode,title}
                }[0..10]`

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

export const fetchWellnessOffersData = async (cond: any) => {
  let data: any
  const query = groq`
  *[_type == "offerPackages" && offerType != "cug" && packageType == "singlePackage" && ${cond}] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc) {
    score,
  "title":upper(title),identifier,description,offerType,"globalValidityDates": validityDates,"globalValidThroughYear": validThroughYear,
  "validThroughYear": validThroughYear,
   "validityDates": validityDates,
   "participatingHotels": hotels[]{
    "hotelName": participatingHotels[0]->.hotelName,
    "identifier": participatingHotels[0]->.identifier,
    "hotelId":  participatingHotels[0]->.hotelId,
    "brandName":participatingHotels[0]->.brandName,
  },hotels[0]{thumbnailDescription,description,inclusions,thumbnail,"hotelName": participatingHotels[0]->.hotelName},rateCode,promoCode,memberSpecific,thumbnail,packageType,lengthOfStay}`
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

export const fetchHotelSpecificOffersData = async (id: string, cond: any) => {
  let data: any
  const query = groq`
  *[_type == "offerPackages" && hotels[].participatingHotels[]._ref match "${id}" && offerType != "cug" && packageType == "singlePackage" && ${cond}] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc) {"title":upper(title),identifier,description,offerType,displayGlobal,"globalValidityDates": validityDates,"globalValidThroughYear": validThroughYear,"validThroughYear": 
  select(
 hotels[participatingHotels[]._ref match "${id}"][0].validThroughYear != null 
    => hotels[participatingHotels[]._ref match "${id}"][0].validThroughYear,
 hotels[participatingHotels[]._ref match "${id}"][0].validThroughYear == null => validThroughYear
),
   "validityDates": 
  select(
 hotels[participatingHotels[]._ref match "${id}"][0].validityDates != null 
    => hotels[participatingHotels[]._ref match "${id}"][0].validityDates,
 hotels[participatingHotels[]._ref match "${id}"][0].validityDates == null => validityDates
),hotels[participatingHotels[]._ref match "${id}"][0]{thumbnailDescription,description,inclusions,thumbnail,"hotelName": participatingHotels[0]->.hotelName},rateCode,promoCode,memberSpecific,thumbnail,packageType,lengthOfStay}`
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

export const fetchSpecificOffersDataWithHotelID = async (id: string, identifier: string) => {
  let data: any
  const query = groq`
  *[_type == "offerPackages" && hotels[].participatingHotels[]._ref match "${id}" && identifier == "${identifier}"] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc) {title,score,tnc,identifier,lengthOfStay,description,validityDates,offerType,displayGlobal,hotels[participatingHotels[]._ref match "${id}"][0]{description,tnc,inclusions,thumbnail}}`
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
export const fetchTajNewOpeningsData = async (isTajNewOpeningsData: boolean, isNewOpening: boolean) => {
  let data: any
  const query = groq`
  *[_type == "hotel" && ${isNewOpening ? "isNewOpening" : "isOpeningSoon"}== true && brandName ${
    isTajNewOpeningsData ? "match" : "!="
  }  "Taj"] | order(coalesce(score, -1) desc) { score,"hotelName" : upper(hotelName),identifier,hotelId,brandName,"thumbnail":hotelOverview->basicInfo.media[0].imageAsset,
  "description":hotelOverview->basicInfo.description,"contact":hotelContact->{"email":email[0].email,"phone":phone[0].mobile},hotelAddress->,hotelHighlights->}`
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

export const fetchAllEventsData = async () => {
  let data: any
  const query = groq`
  *[_type == "events" && participatingHotels != null]
{
...,
  "hotelName":participatingHotels[0]->hotelName,
  "contact":participatingHotels[0]->hotelContact->{
    "phone":phone[type =="business"]{...},
    "email":email[type =="business"]{...}
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
export const fetchMeetingsData = async () => {
  let data: any
  const query = groq`
  *[_type == "hotel" && _id in *[_type=="events"].participatingHotels[]._ref ]| order(coalesce(score, -1) desc)
  {
  hotelName,
     hotelId,
    hotelDescription,
    identifier,
    score,
    "thumbnail":hotelOverview->basicInfo.media[0].imageAsset,
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

export const HotelTypeDataWithoutBrandFilter = async (type: string = "Palaces") => {
  let data: any
  const query = groq`
  *[_type == "hotel" && searchTaxonomies->hotelType == "${type}"] | order(coalesce(score, -1) desc) {
      score,
      hotelName,
      identifier,
      hotelId,
      brandName,
      "thumbnail":hotelOverview->basicInfo.media[0].imageAsset,
      "description":hotelDescription,
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

export const AllIHCLHotelsData = async () => {
  let data: any
  const query = groq`
  *[_type == "hotel" && lower(identifier) != null  ] | order(coalesce(score, -1) desc) {
    score,
    hotelName,
    identifier,
    hotelId,
    brandName,
    "thumbnail":hotelOverview->basicInfo.media[0].imageAsset,
    "description":hotelDescription,
    "hotelType": searchTaxonomies->hotelType
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
export const HotelTypeData = async (type: string = "Palaces", condition: string) => {
  let data: any
  const query = groq`
  *[_type == "hotel" && searchTaxonomies->hotelType == "${type}" && ${condition}] | order(coalesce(score, -1) desc) {
    score,
    hotelName,
    identifier,
    hotelId,
    brandName,
    "thumbnail":hotelOverview->basicInfo.media[0].imageAsset,
    "description":hotelDescription,
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
