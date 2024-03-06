import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  TAJ_HOTELS,
  PAGE_LANG,
  AFFILIATION,
  GIFT_CARD,
  USER_FIRST_NAME,
  CHAMBERS_TIER,
  EPICURE_TIER,
  USER_LAST_NAME,
  USER_TIRE,
} from "../../../constants"

export const handleGCAddToCart = (
  eventName: string,
  dataLayer: any,
  address: any,
  GCStore: any,
  isUserLoggedIn: boolean,
  getItem: any,
  title?: string,
  url?: string,
  urlType?: any,
) => {
  let giftCardType = GCStore?.GCThemeData?.isPhysicalGIftCard ? "Physical-gift card" : "E-gift card"
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
      giftCardType: GCStore?.GCThemeData?.name,
      giftCardValue: GCStore?.data?.amount,
      giftCardQuantity: GCStore?.cartDetails?.items?.quantity || GCStore?.data?.quantity,
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
      bookingType: GCStore?.cartDetails?.items?.category || "Gift_Card_Purchase",
      bookingPaymentType: "",
      buttonLinkName: title || "",
      link_url: url || "",
      link_text: title || "",
      outbound: urlType == "internal" ? false : true,
      paymentType: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${AFFILIATION}",` + `"${url?.replace("/", "").toUpperCase()}"]`,
      ),
      pageURL: `${global?.window?.location.origin}` + `${url}`,
      memberName: isUserLoggedIn
        ? `${getItem("userFirstName") || USER_FIRST_NAME}` + ` ${getItem("userLastName") || USER_LAST_NAME}`
        : "",
      membershipType: isUserLoggedIn
        ? `${
            getItem("chambersMemberTier") || CHAMBERS_TIER || getItem("epicureMemberTier") || EPICURE_TIER || "Neupass"
          } - ${getItem("userTier") || USER_TIRE}`
        : "",
      ecommerce: {
        currency: GCStore?.GCThemeData?.currency?.code,
        value:
          GCStore?.cartDetails?.priceSummary?.totalPrice ||
          GCStore?.data?.amount * GCStore?.data?.quantity ||
          GCStore?.giftCardAmount,
        items: [
          {
            item_id: GCStore?.sku || "",
            item_name: GCStore?.GCThemeData?.name || "",
            index: 0,
            item_category: GIFT_CARD || "",
            item_category2: giftCardType || "",
            item_category3: "New",
            item_category4: "",
            price: parseInt(GCStore?.data?.amount),
            quantity: GCStore?.cartDetails?.items?.quantity || GCStore?.data?.quantity,
            affiliation: AFFILIATION,
            item_list_id: "",
            item_list_name: "",
          },
        ],
      },
    },
  })
}
