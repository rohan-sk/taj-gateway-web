import { groq } from "next-sanity"
import { getClient } from "../lib-sanity"

export const getPageQuery = (path: any) => {
  return groq`
  *[_type == "page" && path == "${path}"]${pageGroqFragment}`
}

export const getFooterQuery = () => {
  return groq`*[_type == "footer" && path =="/footer"]`
}
export const getHeaderQuery = () => {
  return groq`*[_type == "header" && path =="/header"]`
}

export const searchDataFragment = `searchData->{
      ...,
      searchTabs[]{
       ...,
       popularItems{
        ...,
        itemList[]->{
          "name": select(
            title == null => hotelName,
            title
          ),
         identifier,
         "synxisHotelId" : searchTaxonomies->.synxisHotelId,
        hotelAddress->,
          "hotelType": searchTaxonomies->.hotelType,
          "hotelCode": searchTaxonomies->.hotelCode,
         "restaurant_identifier":identifier,
         "brand_name":brandName,
         "hotel_brand_name":participatingHotels[0]->brandName,
         "hotel_identifier": participatingHotels[0]->identifier,
         "cuisine_type": hotelDetailDiningPage.restaurantAvailability[lower(title) match "cuisine"][0].list[0].item,
         "restaurant_city": hotelDetailDiningPage.restaurantAddress->.city,
         "restaurant_country": hotelDetailDiningPage.restaurantAddress->.country,
        }
       }
      }
    }
  `

export const pageGroqFragment = `{
  "pageBody":{
    ...,
    items[isHidden!=true]{
      ...,
      aesthetic->,
     ${searchDataFragment},
     _type in ["switchCaseBlock"] => {
      ...,
     "cases":cases[]{
        ...,
        item[]{
          ...,
          aesthetic->,
        },
      },
    },
    },
  },
"footer":*[_type == "footer" && path =="/footer"],
"header": *[_type == "header" && path =="/header"],
}`
export const fetchHotelBanner = async (hotelId: any) => {
  const query = groq`*[_type == "hotel"&& hotelId== "${hotelId}"]{
    hotelRooms->{
    bannerImage[0],
  },
  hotelBannerTitle
  }`
  let data
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
export const fetchGiftCards = () => {
  return groq`*[_type == "giftCardsDetails" && isPhysicalGIftCard == false  && !isSeasonal && isLive ] {...,category->} | order(priorityOrder asc)`
}
export const fetchSearchData = () => {
  return groq`*[_type=="searchConfig"  ]{
searchTabs[message != null]{
   message,tabTitle
}
}`
}
export const fetchOffersData = (offerIdentifier: string) => {
  return groq`*[_type == "offerPackages" && identifier == "${offerIdentifier}"]{
  title,
  expandTnC,
  identifier,
  displayGlobal,
  hideBookNowWidget,
  rateCode,
  promoCode,
  offerType,
  holidayOffer,
  offerBannerTitle,
  banner,
  tnc,
  thumbnail,
  description,
  sectionTitle,
  packageType,
  stayDates,
  validityDates,
  blackoutDates,
  validThroughYear,
  memberSpecific,
  memberType,
  lengthOfStay,
  additionalInclusions,
  bookNowWidget,
  additionalInclusionsTitle,
  additionalInclusionsSubtitle,
  participatingDestinations[]->{
    name,
    identifier,
    city,
    country,
    thumbnail,
    participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) -> 
    {_id,
     score,
     hotelId,
     "image": hotelOverview->basicInfo.media,
     hotelName,
     identifier,
     "description": hotelDescription,
     brandName,
     "facilities": hotelMetaFacilities,
     hotelAddress->,
      hotelContact->,
      searchTaxonomies->
      {
        title,
       shortDescription,
       longDescription,
       hotelType,
       hotelFeature,
       hotelCode,
       propertyCategory
      }
  }
  },
  hotels[] {
     tnc,
     participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
      hotelName,
      score,
      hotelDescription,
      hotelId,
      brandName,
      hotelAddress->{city, country, pincode, state},
      searchTaxonomies->{
       hotelType,
       synxisHotelId,
       hotelCode
      },
      identifier,
      hotelOverview->{
       basicInfo {
         media[0]
       }
     }
    },
    seoKeywords,
    seoDescription,
    pageTitle,
    description,
    inclusionHeadingTitle,
        inclusions[] {
      ...,
      inclusionTheme->,
      basicInfo{...,"icon": icon->},
      "theme": inclusionTheme->.title
    },
    additionalPackages[] {
      ...,
      basicInfo{...,"icon": icon->},
      inclusionTheme->,
      "theme": inclusionTheme->.title
    },
    thumbnail
  },
  inclusionHeadingTitle,
  inclusions[] {
    ...,
    basicInfo{...,"icon": icon->},
    inclusionTheme->,
    "theme": inclusionTheme->.title
  },
  additionalPackages[] {
    ...,
    basicInfo{...,"icon": icon->},
    inclusionTheme->,
    "theme": inclusionTheme->.title
  },
  tnc,
  pageTitle,
  seoDescription,
  seoKeywords,
  offerFAQs,
  cugType
  }[0]`
}

export const fetchHotelSpecificOffersDetailsData = (offerIdentifier: string, hotel_ref: string) => {
  return groq`*[_type == "offerPackages"
  && hotels[].participatingHotels[]._ref match "${hotel_ref}" && identifier == "${offerIdentifier}"] | order(coalesce(score, -1) desc) {
    title,
    score,
    expandTnC,
    hideBookNowWidget,
    displayGlobal,
    lengthOfStay,
    identifier,
    rateCode,
    memberSpecific,
    promoCode,
    offerType,
    description,
    holidayOffer,
    offerBannerTitle,
    banner,
    thumbnail,
    packageType,
    stayDates,
    validityDates,
    blackoutDates,
    additionalInclusions,
    validThroughYear,
    sectionTitle,
    inclusionHeadingTitle,
    inclusions[]{...,basicInfo{...,"icon": icon->}},
    hotels[participatingHotels[]._ref match "${hotel_ref}"] | order(coalesce(score, -1) desc) [0]{
      seoKeywords,
      score,
      seoDescription,
      pageTitle,
      description,
      inclusionHeadingTitle,
      additionalInclusions,
      additionalInclusionsTitle,
      additionalInclusionsSubtitle,
      inclusions[]{...,basicInfo{...,"icon": icon->}},
      banner,
      thumbnail,
      sectionTitle,
      stayDates,
      validityDates,
      blackoutDates,
      additionalInclusions,
      validThroughYear,
      participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelDescription,hotelId,searchTaxonomies->{hotelType},identifier,hotelOverview->{
        basicInfo{
        media[0]
        }
       }
      },
    },
    pageTitle,
    seoDescription,
    seoKeywords,
    tnc,
    offerFAQs
  }[0]`
}

export const fetchOffersDataWithFilters = (offerIdentifier: string) => {
  return groq`*[_type == "offerPackages" && identifier == "${offerIdentifier}"]{'hotelTypes':hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{score,searchTaxonomies->{hotelType}}}[0]`
}

export const fetchVouchersData = (VouchersIdentifier: string) => {
  return groq`*[_type == "vouchers" && title=="${VouchersIdentifier}"]{...,participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelId,score,identifier,hotelName,brandName},iscomplementary}[0]`
}

export const fetchHotelData = (hotelID: string) => {
  return groq`
  *[_type == "hotel" && hotelId == "${hotelID}"]{...,
    hotelAddress->, hotelContact->, hotelRooms->,
 hotelAwards->, hotelWellness->, hotelAttractions->, hotelSignatureDining->,
 hotelOffers->, hotelHolidays->, hotelFacilities->, hotelExperiences->,hotelOverview->, hotelAvailability->,
 hotelExclusiveOffersRooms->, hotelSocialInfo->, hotelEventVenues->, hotelGallery->,hotelExclusiveOffersDining->,hotelExclusiveOffersWellness->,
 hotelHighlights->,hotelName}[0]`
}

export const fetchParticipatingHotelsData = (searchTerm: string, fromNeupass: boolean) => {
  return groq`*[_type=="hotel" ${
    fromNeupass ? "" : "&& gcCategory != null"
  } && hotelName match lower("${searchTerm}*") || hotelAddress->city match lower("${searchTerm}*") || hotelAddress->country match lower("${searchTerm}*") ] | order(hotelName asc) | order(coalesce(score, -1) desc) {hotelName, score,hotelDescription, hotelPath,brandName, hotelAddress->}`
}

export const fetchHotelDataWithIdentifier = (identifier: string) => {
  return groq`*[_type == "hotel" && identifier == "${identifier}"]{_id,hotelBannerTitle,hotelExclusiveOffersRooms->,hotelExclusiveOffersDining->,hotelExclusiveOffersWellness->,"places-to-visit":hotelAttractions->{pageTitle, seoKeywords, "description": seoDescription},"gallery":hotelGallery->{pageTitle, seoKeywords, "description": seoDescription},"experiences":hotelExperiences-> {pageTitle, seoKeywords, "description": seoDescription},"wellness":hotelWellness->{pageTitle, seoKeywords, "description": seoDescription}, "meetings-and-event-venues":hotelEventVenues->{pageTitle, seoKeywords, "description": seoDescription},"offers-and-promotions": hotelOffers->{pageTitle, seoKeywords, "description": seoDescription},"restaurants":hotelSignatureDining->{pageTitle,seoKeywords,"description": seoDescription},"rooms-and-suites":hotelRooms-> {pageTitle, seoKeywords, "description": seoDescription}, "j-wellness-circle":hotelWellness->{pageTitle, seoKeywords, "description": seoDescription},"overview": hotelOverview->{pageTitle, seoKeywords, "description": seoDescription, "image": bannerImage[0].imageAsset.image[0].asset._ref,bannerImage},hotelId,hotelName,identifier,brandName,brandId,hotelAddress->,hotelAvailability->,hotelContact->,hotelSignatureDining-> { sectionTitle, description,enrichedDescription },hotelOffers->{ sectionTitle, description,enrichedDescription},hotelEventVenues,hotelExperiences-> {sectionTitle, description,enrichedDescription},hotelFacilities->,hotelNavigation->,hotelAttractions-> {sectionTitle, description},hotelOverview->{basicInfo{description,media,title,enrichedDescription},sectionTitle,bannerImage},hotelHolidays->,hotelHighlights->,hotelDocuments}[0]`
}

export const fetchEpicureTermsAndConditions = (identifier: string) => {
  return groq`*[_type == "loyaltyEpicure" && membershipType == 'epicure' && identifier == '${identifier}' && !(_id in path("drafts.**")) ] {
    identifier,
    membershipType,
    subType,
    journeyType,
    "terms": terms[]{
      ...,
      aesthetic->
    },
    "seo": {
              pageTitle,
              seoKeywords,
              seoDescription
          },

}`
}
export const fetchEpicureBankDetails = (bankName: string) => {
  return groq`*[_type == "loyaltyEpicure" && membershipType == 'epicure' && subType == 'bank' && identifier == '${bankName}' ] {
    identifier,
    membershipType,
    subType,
    journeyType,
    "bannerDetails": {
        "imageInfo":  banner.imageInfo.image,
        "title": banner.title,
        "logo": logo
      },
    "sectionInfo": {
        "discountInfo":  sectionInfo.discountInfo,
        "title": sectionInfo.title,
        "subTitle": sectionInfo.description,
        "content":sectionInfo.content,
        },
    membershipTiers[]->,
    "Terms":terms,
    faq,
    "seo": {
              pageTitle,
              seoKeywords,
              seoDescription
          },

}`
}
export const fetchEpicurePageDetails = (identifier: string) => {
  return groq`*[_type == "loyaltyEpicure" && membershipType == 'epicure' && identifier == '${identifier}' ] {
    identifier,
    membershipType,
    subType,
   journeyType,
    "bannerDetails": {
        "imageInfo":  banner.imageInfo.image,
        "title": banner.title,
        "logo": logo
      },
    "sectionInfo": {
        "discountInfo":  sectionInfo.discountInfo,
        "title": sectionInfo.title,
        "subTitle": sectionInfo.description,
        },
    membershipTiers[]->,
    "Terms":terms,
    faq,
    "seo": {
              pageTitle,
              seoKeywords,
              seoDescription
          },
  
}`
}
export const fetchEpicureDetails = (subType: string) => {
  return groq`*[_type == "loyaltyEpicure" && membershipType == 'epicure' && subType == '${subType}' ] {
    identifier,
    membershipType,
    subType,
    journeyType,
    "bannerDetails": {
        "imageInfo":  banner.imageInfo.image,
        "title": banner.title,
        "logo": logo
      },
    "sectionInfo": {
        "discountInfo":  sectionInfo.discountInfo,
        "title": sectionInfo.title,
        "subTitle": sectionInfo.description,
        },
    membershipTiers[]->,
    "Terms":terms,
    faq,
    "seo": {
              pageTitle,
              seoKeywords,
              seoDescription
          },

}`
}
export const fetchDestinationsIdentifier = (identifier: string) => {
  return groq`*[_type == "destination" && identifier == "${identifier}"]{...,"seoData": [{"navItem": "hotels","image": hotelsTab.bannerImage,"pageTitle": seoInfo[navigation == 'hotels'][0].title,"seoKeywords": seoInfo[navigation == 'hotels'][0].keywords,"seoDescription": seoInfo[navigation == 'hotels'][0].description},{"navItem": "about","image": aboutDestination->.bannerImage,"pageTitle": seoInfo[navigation == 'highlights'][0].title,"seoKeywords": seoInfo[navigation == 'highlights'][0].keywords,"seoDescription": seoInfo[navigation == 'highlights'][0].description},{"navItem": "restaurants","image": diningTab.bannerImage,"pageTitle": seoInfo[navigation == 'restaurants'][0].title,"seoKeywords": seoInfo[navigation == 'restaurants'][0].keywords,"seoDescription": seoInfo[navigation == 'restaurants'][0].description},{"navItem": "experiences","image": experiencesTab.bannerImage,"pageTitle": seoInfo[navigation == 'experiences'][0].title,"seoKeywords": seoInfo[navigation == 'experiences'][0].keywords,"seoDescription": seoInfo[navigation == 'experiences'][0].description},{"navItem": "spa","image": spaTab.bannerImage,"pageTitle": seoInfo[navigation == 'spa'][0].title,"seoKeywords": seoInfo[navigation == 'spa'][0].keywords,"seoDescription": seoInfo[navigation == 'spa'][0].description},{"navItem": "holiday_packages","image": holidayPackages.bannerImage, "pageTitle": seoInfo[navigation == 'holiday_packages'][0].title,"seoKeywords": seoInfo[navigation == 'holiday_packages'][0].keywords,"seoDescription": seoInfo[navigation == 'holiday_packages'][0].description}],destinationNavigation->,aboutDestination->,highlights->,participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) -> {_id,score,hotelId,"image": hotelOverview->basicInfo.media,hotelName,identifier,"description": hotelDescription,brandName,"facilities": hotelMetaFacilities,hotelAddress->,hotelContact->,searchTaxonomies->{title,shortDescription,longDescription,hotelType,hotelFeature,...,}}}`
}
export const fetchHamper = (type: string, identifier: string) => {
  return groq`*[_type == "hampers" && 
  type == "dynamic" && 
  hamperCategory->.identifier == "${type}" && identifier == "${identifier}"] {
  title,
  description,
  identifier,
  "hamperId": hamperCategory->.identifier,
  bannerTitle,
  thumbnail,
  hamperTab,
  hamperSet,
  participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
    hotelName,
    score,
    identifier,
    hotelId,
    brandName,
    "image":hotelOverview->basicInfo.media,
    "hotelDescription":hotelDescription,
    "hotelType": searchTaxonomies->hotelType,
    "contact":hotelContact->{"email":email[type=="business"][0].email,"phone":phone[type=="business"][0].mobile},
    hotelAddress->{city,addressLine1,street, state, pincode, longitude, latitude},
  }
}`
}
export const fetchCountryDestinationWithIdentifier = (identifier: string) => {
  return groq`*[_type == "country" && identifier == "${identifier}"]{...,identifier,participatingDestinations[]->,"description":seoDescription,"image": bannerInfo.bannerImage}`
}

export const fetchCountryDestination = (identifier: string) => {
  return groq`*[_type == "country" && identifier == "${identifier}"]{identifier}`
}

export const fetchDestinations = () => {
  return groq`*[_type == "destination" 
] | order(name asc) | order(coalesce(score, -1) desc)
{name,score,identifier,city,country,thumbnail,participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) -> 
{_id,score,hotelId,hotelDestination,"synxisHotelId":searchTaxonomies->.synxisHotelId,"hotelType": searchTaxonomies->.hotelType,"hotelCode": searchTaxonomies->.hotelCode,hotelDescription,"image": hotelOverview->basicInfo.media,hotelName,identifier,brandName,hotelAddress->}}
  `
}

export const fetchRestaurantsDataWithIdentifier = (identifier: string) => {
  return groq`*[_type == "restaurants" && identifier == "${identifier}"]{seoKeywords,seoDescription,pageTitle,title,openingHours,identifier,city,bannerImage,bannerTitle,participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{identifier, score},hotelDetailDiningPage {...,restaurantContact-> {email, phone},restaurantAddress-> {type, city, state, country, pincode,latitude, longitude,addressLine1}},thumbnail,gallery,thumbnailDescription,restaurantGallery,restaurantDocuments}`
}
export const fetchExclusiveOffersData = async (isMemberOffers: boolean, searchTerm?: string | undefined) => {
  const query = groq`*[_type == "offerPackages" && thumbnail!= null &&  ${
    isMemberOffers ? "memberSpecific==true" : 'memberSpecific!=true &&  (offerType=="global" || offerType =="4d_offer")'
  }  ${
    searchTerm ? ` && inclusions[].basicInfo.title match lower("${searchTerm}*")` : ""
  }] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc) { title,score,identifier,expandTnC,hideBookNowWidget,validityDates,lengthOfStay,thumbnail,description,promoCode,rateCode,packageType,memberSpecific,memberType,validThroughYear,"participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,identifier,hotelAddress->{city,country,pincode,state},searchTaxonomies->{hotelType,synxisHotelId}},"packages":select(
    inclusions[0].basicInfo.title != null => inclusions[]{"title":basicInfo.title ,inclusionIdentifier,basicInfo},
    inclusions[0].basicInfo.title == null =>hotels[].inclusions[]{"title":basicInfo.title ,inclusionIdentifier,basicInfo} 
   )}`
  let data
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
export const contactHotelData = async (searchTerm: string) => {
  const query = groq`
  *[_type == "hotel" && brandName match "Taj" && identifier!=null &&
    (hotelName match lower("*${searchTerm}*") || 
    hotelAddress->city match lower("*${searchTerm}*") || 
  hotelAddress->state match lower("*${searchTerm}*") || 
  hotelAddress->country match lower("*${searchTerm}*"))] | order(coalesce(score, -1) desc) {
      _type,
      score,
      "title": upper(hotelName),
      identifier,
      "contact":hotelContact->{email, phone},
      "address":hotelAddress->{locationAndDirectionsInfo[0], city}
    }`
  let data
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
export const salesOfficeData = async (searchTerm: string) => {
  const query = groq`
    *[_type == "address" && type == "sales-office" && title match "*${searchTerm}*"] {
       "title":upper(title),
       "contact":{"email":email,"phone":phone},
       "address":{"locationAndDirectionsInfo":locationAndDirectionsInfo[0], city}
    }`
  let data
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

export const fetchRestaurantBrand = (matchString: string) => {
  return groq`*[_type == "restaurantBrand" && identifier == "${matchString}"]{
  title,thumbnail,identifier,bannerImage,bannerTitle,introSection->,locationsSection,participatingRestaurants[]->{"hotelName": ^.title,identifier,"image": thumbnail,"description": hotelDetailDiningPage.restaurantInfo.description,"contact": hotelDetailDiningPage.restaurantContact->,"hotelIdentifier": participatingHotels[0]->.identifier,"title": participatingHotels[0]->.hotelName,},otherBrandsSection,pageTitle,seoKeywords,seoDescription}`
}

export const fetchHolidayOffers = (id: string) => {
  return groq`*[_type == "offerHolidays" && identifier == "${id}"]{
    seoDescription,
    pageTitle,
    seoKeywords,
    bannerInfo, 
     thumbnail,
     identifier,
     participatingOffers[@->.thumbnail != null]->{
     title,
     rateCode,
     memberSpecific,
     packageType,
     promoCode,
     "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName},
     "packages":inclusions[]{"title":basicInfo.title,inclusionIdentifier},
      identifier,
      description,
      thumbnail
    },
    "themes": participatingOffers[]->{
      title,
      identifier,
      "comparingHotels": ^.participatingHotels[]->{identifier},
      "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
        score,
       "thumbnail": hotelOverview->.basicInfo.media,
       hotelName,
       hotelDescription,
       hotelId,
       identifier,
       brandName,
       _id
     }
    },
     aboutHoliday->{
     title,
     sectionTitle,
     attractionList,
     description
   }
   }[0]`
}

export const fetchHolidayThemes = () => {
  return groq`*[_type == "offerHolidays"] | order(coalesce(score, -1) desc) {
    score,
    bannerInfo, 
     thumbnail,
     identifier,
     participatingOffers[@->.thumbnail != null]->{
     title,
     rateCode,
     lengthOfStay,
     memberSpecific,
     packageType,
     promoCode,
     "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{score,hotelName,hotelId,brandName,identifier},
     "packages":inclusions[]{"title":basicInfo.title,inclusionIdentifier},
      identifier,
      description,
      thumbnail
    },
    "themes": participatingOffers[]->{
      title,
      identifier,
      "comparingHotels": ^.participatingHotels[lower(@->.brandName) == "taj"]->{identifier},
      "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{
        score,
       "thumbnail": hotelOverview->.basicInfo.media,
       hotelName,
       hotelDescription,
       hotelId,
       identifier,
       brandName,
       _id
     }
    },
     aboutHoliday->{
     title,
     sectionTitle,
     attractionList,
     description
   }
   }`
}

export const fetchEpicureParticipatingHotels = async () => {
  const query = groq` 
*[_type == "epicure" && identifier == "epicure-program"][0]  { 
  "tabularData":tabularData[]  {
    ...,
    "brandName":participatingHotel->brandName,
    "city":participatingHotel->hotelAddress->city,
    "country":participatingHotel->hotelAddress->country,
  
  } | order(city asc) 
  } 
  `
  let data
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
export const fetchHotelsFactSheets = async () => {
  const query = groq` 
  *[_type == "hotel" && hotelDocuments != null] | order(coalesce(score, -1) desc) {
    score,
    hotelName,
    "hotelFactsheet":hotelDocuments[identifier == "hotel-factsheet"][0].file.asset._ref
  }
  `
  let data
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

export const fetchAllHotels = async () => {
  const query = groq` 
  *[_type == "hotel" ] | order(coalesce(score, -1) desc) {
    score,
    hotelName,
    hotelId,
    brandName,
    identifier,
    searchTaxonomies->{
      synxisHotelId,
     },
  }
  `
  let data
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

export const fetchMemberExclusiveOffers = async () => {
  const query = groq`*[_type == "offerPackages" && thumbnail!= null &&  (offerType=="global" || offerType =="4d_offer")] | score(memberSpecific) | order(_score desc) | order(coalesce(score, -1) desc) { 
    title,identifier,score,validityDates,thumbnail,description,promoCode,rateCode,packageType,validThroughYear,memberSpecific,stayDates,blackoutDates,banner,tnc,offerBannerTitle,lengthOfStay,
    "participatingHotels": hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId},"packages":inclusions[]{"title":basicInfo.title,inclusionIdentifier}}`
  let data
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

export const fetchBlogArticle = (identifier: string) => {
  return groq`*[_type == "article" && identifier == "${identifier}" && !(_id in path("drafts.**"))]{...,authorInfo->{...},theme->{...},comments[]->,tags[]->,previous->{...},next->{...}}`
}
export const fetchBlogArticleTags = () => {
  return groq`*[_type == "articleTag" && !(_id in path("drafts.**"))]`
}
export const fetchBlogStoryThemes = () => {
  return groq`*[_type == "articleTheme" && !(_id in path("drafts.**"))]`
}
export const fetchThemeRelatedBlogs = (identifier: string) => {
  return groq`*[_type=="articleTheme" && identifier == "${identifier}"  && !(_id in path("drafts.**"))]{
    ...,
    "blogs":*[_type=="article" 
              && references(
                *[_type=="articleTheme" 
                  && _id == _id
                 ]._id)
              && !(_id in path("drafts.**"))   
             ]{..., "commentsCount": count((comments[]->approved) [@ == true]), authorInfo->{...}, theme->{...}}
  }`
}
export const fetchTagRelatedBlogs = (identifier: string) => {
  return groq`*[_type=="articleTag" && identifier == "${identifier}" && !(_id in path("drafts.**"))]{
    ...,
    "blogs":*[_type=="article" 
      && tags[]._ref match ^._id
      && !(_id in path("drafts.**"))
    ] {..., authorInfo->{...}, theme->{...}}
  }`
}

export const getGiftCardType = async (sku: string) => {
  const query = groq`*[_type == "giftCardsDetails" && sku == "${sku}"] {isPhysicalGIftCard}`
  let data
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

export const fetchHotelRoomsDataWithIdentifier = (identifier: string) => {
  return groq`*[_type == "hotel" && identifier == "${identifier}"]{
    "hotelType": searchTaxonomies->.hotelType,
    "hotelCode": searchTaxonomies->.hotelCode,
    brandName,
    "synxisHotelId" : searchTaxonomies->.synxisHotelId,
    hotelAddress->,hotelBannerTitle, hotelContact->,hotelId,searchTaxonomies->,subAccountId,hotelRooms->{
      ...,
      "roomsList": roomsList[]{
        ...,
        "rateCodeList": rateCodeList[]->
      },
      roomMapping
     }}[0]`
}
