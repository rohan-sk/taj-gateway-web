import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  AFFILIATION,
  CHAMBERS_TIER,
  EPICURE_TIER,
  GIFT_CARD,
  MEMBERSHIP,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_TIRE,
  isUserLoggedIn,
} from "../../../constants"
let count = false
export const handleEpicurePurchase = (
  eventName: string,
  dataLayer: any,
  address: any,
  LoyaltyEpicureStore: any,
  ResponseData: any,
  getItem: any,
  isLoggedIn: boolean,
) => {
  if (count) {
    return
  }
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      arrivalDate: "",
      departureDate: "",
      noOfAdults: "",
      noOfChild: "",
      noOfRooms: "",
      bookingType: "",
      bookingPaymentType: "",
      location: "",
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      visitSource: "",
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
      buttonLinkName: "",
      link_url: "",
      link_text: "",
      outbound: "true",
      clientId: getCookie("_ga")?.slice(6),
      membershipType:
        isLoggedIn || isUserLoggedIn
          ? `${
              getItem("chambersMemberTier") ||
              CHAMBERS_TIER ||
              getItem("epicureMemberTier") ||
              EPICURE_TIER ||
              "Neupass"
            } - ${getItem("userTier") || USER_TIRE}`
          : "",
      memberName: isUserLoggedIn
        ? `${getItem("userFirstName") || USER_FIRST_NAME}` + ` ${getItem("userLastName") || USER_LAST_NAME}`
        : "",
      ecommerce: {
        currency: "INR",
        transaction_id: LoyaltyEpicureStore?.loyaltyConfirmationResponse?.orderId,
        value: Number(ResponseData?.total) || "",
        payment_type: LoyaltyEpicureStore?.loyaltyConfirmationResponse?.paymentMethod?.split("BY")?.[1] || "",
        payment_status: LoyaltyEpicureStore?.loyaltyConfirmationResponse?.orderStatus,
        tax: ResponseData?.tax || "",
        nuecoins_redeem_amount: LoyaltyEpicureStore?.loyaltyConfirmationResponse?.priceBreakUp?.neuCoins
          ? LoyaltyEpicureStore?.loyaltyConfirmationResponse?.priceBreakUp?.neuCoins
          : 0,
        items: [
          {
            item_id: "",
            item_name: `Epicure ${ResponseData?.type}` || "",
            affiliation: AFFILIATION,
            index: 0,
            item_category: MEMBERSHIP,
            item_category2: ResponseData?.type?.toUpperCase(),
            item_category3: "",
            item_category4: "",
            price: ResponseData?.price || "",
            quantity: ResponseData?.quantity || "",
          },
        ],
      },
    },
  })
  count = true
}
