import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  TAJ_HOTELS,
  PAGE_LANG,
  AFFILIATION,
  MEMBERSHIP,
} from "../../../constants"

export const handleSelectEvent = (
  eventName: string,
  index: number,
  url: any,
  urlType: any,
  item: any,
  dataLayer: any,
  address: any,
  isMobile: boolean,
  parentProps: any,
  PrimaryAction: any
) => {
  let cardPrice = parseInt(item?.totalPrice.replace(/[^\d]/g, ""), 10)
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      location: "",
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      clientId: getCookie("_ga")?.slice(6),
      visitSource: "",
      datesToBook: "",
      arrivalDate: "",
      departureDate: "",
      noOfAdults: "",
      noOfChild: "",
      noOfRooms: "",
      brandName: "",
      giftCardCategory: "",
      giftCardType: "",
      giftCardValue: "",
      giftCardQuantity: "",
      offerName: "",
      offerCode: "",
      offerID: "",
      offerCategory: "",
      offerValidity: "",
      redemptionType: "",
      redemptionName: "",
      redemptionDescription: "",
      pointsType: "",
      pointstobeRedeemed: "",
      bookingType: item?.type,
      bookingPaymentType: "",
      buttonLinkName: PrimaryAction,
      link_url: url,
      link_text: PrimaryAction,
      paymentType: "",
      outbound: urlType == "internal" ? false : true,
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      pageSection: isMobile
        ? `${parentProps?.title?.mobileTitle?.[0]}` +
          `${parentProps?.title?.mobileTitle?.[1]}`
        : `${parentProps?.title?.desktopTitle?.[0]}`,
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` +
          `"${PAGE_LANG}",` +
          `"${AFFILIATION}",` +
          `"${url.replace("/", "").toUpperCase()}"]`
      ),
      pageURL: `${global?.window?.location.origin}` + `${url}`,
      widget_title: isMobile
        ? `${parentProps?.title?.mobileTitle?.[0]}` +
          `${parentProps?.title?.mobileTitle?.[1]}`
        : `${parentProps?.title?.desktopTitle?.[0]}`,
      widget_type: parentProps?._type,
      ecommerce: {
        currency: "INR",
        value: cardPrice,
        items: [
          {
            item_id: "",
            item_name: item?.title || "",
            affiliation: AFFILIATION,
            item_category: MEMBERSHIP,
            item_category2: item?.tier,
            price: cardPrice || "",
            quantity: 1,
            index: index || 0,
          },
        ],
      },
    },
  })
}
