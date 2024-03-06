import { eventNames } from "process"
import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleHotelBooking = (
  eventName: string,
  primaryAction: any,
  dataLayer: any,
  brandName: any,
  hotelAddress: any,
  title: string,
  synxisHotelId: any,
  hotelType: any,
  _type: any,
  description: string,
  selectedTheme?: any,
  selectedTab?: any
) => {
  //   navigate(handleUrl, handleType)
  triggerEvent({
    action: eventName,
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
      brandName: brandName ? brandName : "",
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
      pageTitle: primaryAction?.url?.replaceAll("/", "").toUpperCase(),
      pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
      item_type: _type,
      widget_type: _type,
      widget_description: description,
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` +
          `"${PAGE_LANG}",` +
          `"${brandName || ""}",` +
          `"${primaryAction?.url?.replaceAll("/", "").toUpperCase()}"]`
      ),
      outbound: primaryAction?.urlType == "internal" ? false : true,
      location: hotelAddress?.city ? hotelAddress?.city : "",
      theme: selectedTheme || "",
      holidayType: selectedTab || "",
    },
  })
}
