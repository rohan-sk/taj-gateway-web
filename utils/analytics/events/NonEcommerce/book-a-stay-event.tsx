import { triggerEvent } from "../.."
import { PathType } from "../../../../types"
import { getCookie } from "../../../cookie"
import { TAJ_HOTELS, PAGE_LANG, AFFILIATION } from "../../constants"

export const handleStay = (eventName: string, dataLayer: any, headerData: any, isUserLoggedIn: boolean) => {
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      outbound: headerData?.[0]?.primaryAction?.urlType === PathType?.internal ? false : true,
      clientId: getCookie("_ga")?.slice(6),
      link_text: headerData?.[0]?.primaryAction?.title,
      link_url: headerData?.[0]?.primaryAction?.url,
      buttonLinkName: headerData?.[0]?.primaryAction?.title,
      arrival_date: "",
      departure_date: "",
      LoggedIN: isUserLoggedIn ? "LoggedIn" : "Not LoggedIn",
      noOfAdults: "",
      noOfChild: "",
      noOfRooms: "",
      specialCode: "",
      widget_title: headerData?.[0]?.title,
      visitSource: "",
      location: "",
      datesToBook: "",
      destinationSelected: "",
      hotelBrand: "",
      hotelCity: "",
      hotelCode: "",
      hotelCountry: "",
      hotelName: "",
      hotelPinCode: "",
      hotelState: "",
      hotelType: "",
      offerCategory: "",
      offerCode: "",
      offerID: "",
      offerName: "",
      offerValidity: "",
      roomName: "",
      roomOffer: "",
      pageSection: headerData?.[0]?.title,
      widget_type: headerData?.[0]?._type,
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}","${PAGE_LANG}","${AFFILIATION}","${headerData?.[0]?.primaryAction?.url
          ?.replace("/", "")
          ?.toUpperCase()}"]`,
      ),
    },
  })
}
