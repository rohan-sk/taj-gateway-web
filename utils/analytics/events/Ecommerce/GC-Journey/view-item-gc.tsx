import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  AFFILIATION,
  GIFT_CARD,
  PAGE_LANG,
  TAJ_HOTELS,
} from "../../../constants"

export const handleGCSelect = (
  eventName: string,
  dataLayer: any,
  giftCardType: any,
  primaryAction: any,
  gcDetails: any,
  address: any,
  data: any,
  name: string,
  index: Number
) => {
  triggerEvent({
    action: eventName,
    params: {
      event: eventName,
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
      giftCardCategory: giftCardType,
      giftCardType: name,
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
      bookingType: "",
      bookingPaymentType: "",
      buttonLinkName: primaryAction?.title,
      link_url: gcDetails?.url || primaryAction?.url,
      link_text: primaryAction?.title,
      outbound: primaryAction?.urlType == "internal" ? false : true,
      paymentType: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      pageSection: data?.title?.mobileTitle?.[0],
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` +
          `"${PAGE_LANG}",` +
          `"${AFFILIATION}",` +
          `"${primaryAction?.url.replace("/", "").toUpperCase()}"]`
      ),
      pageURL: `${global?.window?.location.origin}` + `${primaryAction?.url}`,
      ecommerce: {
        currency: gcDetails?.currency?.code || "INR",
        value: "",
        items: [
          {
            item_id: gcDetails?.sku || "",
            item_name: name || "",
            index: index || 0,
            item_category: GIFT_CARD || "",
            item_category2: giftCardType || "",
            item_category3: "New",
            item_category4: "",
            price: "",
            quantity: 1,
            affiliation: AFFILIATION,
            item_list_id: "",
            item_list_name: "",
          },
        ],
      },
    },
  })
}
