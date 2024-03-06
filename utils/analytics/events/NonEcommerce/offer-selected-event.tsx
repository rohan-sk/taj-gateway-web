import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleDestinationBooking = (
  url: any,
  urlType: any,
  contentType: any,
  isOffers: boolean,
  isOffersAndPromotions: boolean,
  isDestination: boolean,
  isHotels: boolean,
  dataLayer: any,
  title: string,
  primaryAction: any,
  brandName: string,
  hotelAddress: any,
  synxisHotelId: string,
  hotelType: any,
  _type: string,
  description: string,
  offerDate: string,
  isMobile: boolean,
  isRestaurant: boolean,
  sectionTitle: any,
) => {
  let journeyType = contentType?.toLowerCase() === "hoteloffers" ? "offersAndPromotionsPage" : "hotelLandingPage"
  global?.window?.localStorage?.setItem("hotelJourneyPageType", journeyType)
  if (!isOffersAndPromotions && (isDestination || isHotels)) {
    triggerEvent({
      action: "hotelSelected",
      params: {
        ...dataLayer,
        destinationSelected: title,
        buttonLinkName: primaryAction?.title,
        link_url: url,
        link_text: primaryAction?.title,
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
        brandName: brandName,
        country: hotelAddress?.country ? hotelAddress?.country : "",
        city: hotelAddress?.city ? hotelAddress?.city : "",
        hotelName: title,
        hotelCode: synxisHotelId ? synxisHotelId : "",
        hotelType: hotelType ? hotelType : "",
        hotelCountry: hotelAddress?.country ? hotelAddress?.country : "",
        hotelCity: hotelAddress?.city ? hotelAddress?.city : "",
        hotelState: hotelAddress?.state ? hotelAddress?.state : "",
        hotelPinCode: hotelAddress?.pincode ? hotelAddress?.pincode : "",
        hotelbrand: brandName ? brandName : "",
        roomName: "",
        roomOffer: "",
        bunglowCode: "",
        clientId: getCookie("_ga")?.slice(6),
        pageTitle: url?.replaceAll("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
        item_type: _type,
        widget_type: _type,
        widget_description: description,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName || ""}",` +
            `"${url?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        outbound: urlType == "internal" ? false : true,
        location: hotelAddress?.city ? hotelAddress?.city : "",
      },
    })
  } else if (isOffers || isOffersAndPromotions) {
    triggerEvent({
      action: "offerSelected",
      params: {
        ...dataLayer,
        buttonLinkName: primaryAction?.title,
        link_url: primaryAction?.url,
        link_text: primaryAction?.title,
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
        pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
        item_type: _type,
        widget_type: _type,
        widget_description: description,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName || AFFILIATION}",` +
            `"${primaryAction?.url?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        outbound: urlType == "internal" ? false : true,
        location: hotelAddress?.city ? hotelAddress?.city : "",
        pageSection: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
        widget_title: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
      },
    })
  } else if (isRestaurant) {
    triggerEvent({
      action: "restaurant_selected",
      params: {
        ...dataLayer,
        buttonLinkName: primaryAction?.title,
        link_url: primaryAction?.url,
        link_text: primaryAction?.title,
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
        pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
        item_type: _type,
        widget_type: _type,
        widget_description: description,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName || AFFILIATION}",` +
            `"${primaryAction?.url?.replaceAll("/", "").toUpperCase()}"]`,
        ),
        outbound: urlType == "internal" ? false : true,
        location: hotelAddress?.city ? hotelAddress?.city : "",
        pageSection: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}` || ""
          : sectionTitle?.desktopTitle?.[0] || "",
        restaurantName: title,
        restaurantSelected: title,
        widget_title: isMobile
          ? `${sectionTitle?.mobileTitle?.[0]}${sectionTitle?.mobileTitle?.[1]}`
          : sectionTitle?.desktopTitle?.[0],
        // restaurantCity: props?.city,
        // restaurantCountry: props?.country,
      },
    })
  }
}
