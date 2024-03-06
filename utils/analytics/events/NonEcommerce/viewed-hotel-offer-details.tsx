import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleHotelandOfferDetailsViewed = (
  url: any,
  urlType: any,
  isFromProperty: boolean,
  isOffers: boolean,
  isOffersAndPromotions: boolean,
  isDestination: boolean,
  isHotels: boolean,
  dataLayer: any,
  title: string,
  ctaLabel: string,
  brandName: string,
  hotelType: any,
  synxisHotelId: string,
  hotelAddress: any,
  _type: any,
  contentType: any,
  offerDate: string,
  description: string,
  isMobile: boolean,
  sectionTitle: any,
  isRestaurant: boolean,
  isExclusiveOffers: boolean,
) => {
  if (isExclusiveOffers || isOffers || isOffersAndPromotions) {
    triggerEvent({
      action: "offerSelected",
      params: {
        ...dataLayer,
        buttonLinkName: ctaLabel,
        link_url: url,
        link_text: ctaLabel,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        offerName: title,
        offerCode: "",
        offerID: "",
        offerCategory: contentType,
        offerValidity: offerDate,
        datesToBook: "",
        arrivalDate: "",
        departureDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: url?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        item_type: _type,
        widget_type: _type,
        widget_description: description,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName || AFFILIATION}",` +
            `"${url?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        outbound: urlType == "internal" ? false : true,
        location: hotelAddress?.city ? hotelAddress?.city : "",
        pageSection: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[1]
          ? `${sectionTitle?.desktopTitle?.[0]}${sectionTitle?.desktopTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
        widget_title: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[1]
          ? `${sectionTitle?.desktopTitle?.[0]}${sectionTitle?.desktopTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
      },
    })
  } else if (isFromProperty && isRestaurant) {
    triggerEvent({
      action: "restaurant_selected",
      params: {
        ...dataLayer,
        buttonLinkName: ctaLabel,
        link_url: url,
        link_text: ctaLabel,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        datesToBook: "",
        arrivalDate: "",
        departureDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: url?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        item_type: _type,
        widget_type: _type,
        widget_description: description,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName || AFFILIATION}",` +
            `"${url?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        outbound: urlType == "internal" ? false : true,
        location: hotelAddress?.city ? hotelAddress?.city : "",
        pageSection: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}` || ""
          : sectionTitle?.desktopTitle?.[1]
          ? `${sectionTitle?.desktopTitle?.[0]}${sectionTitle?.desktopTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
        restaurantName: title,
        restaurantSelected: title,
        widget_title: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[1]
          ? `${sectionTitle?.desktopTitle?.[0]}${sectionTitle?.desktopTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
        // restaurantCity: props?.city,
        // restaurantCountry: props?.country,
      },
    })
  } else {
    triggerEvent({
      action: "hotelDetailsViewed",
      params: {
        ...dataLayer,
        destinationSelected: title,
        buttonLinkName: ctaLabel,
        link_url: url,
        link_text: ctaLabel,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        datesToBook: "",
        arrivalDate: "",
        departureDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        brandName: brandName ? brandName : "",
        hotelName: title,
        hotelCode: synxisHotelId ? synxisHotelId : "",
        hotelType: hotelType ? hotelType : "",
        hotelCountry: hotelAddress?.country ? hotelAddress?.country : "",
        hotelCity: hotelAddress?.city ? hotelAddress?.city : "",
        hotelState: hotelAddress?.state ? hotelAddress?.state : "",
        hotelPinCode: hotelAddress?.pincode ? hotelAddress?.pincode : "",
        hotelbrand: brandName ? brandName : "",
        bunglowCode: "",
        error_message: "",
        error_type: "",
        item_name: title,
        item_type: _type,
        no_of_items: "",
        location: "",
        outbound: urlType == "internal" ? false : true,
        pageTitle: title,
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        pageHierarchy: JSON.parse(`["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${brandName}",` + `"${title}"]`),
      },
    })
  }
}
