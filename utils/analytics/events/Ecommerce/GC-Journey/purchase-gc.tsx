import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { AFFILIATION, GIFT_CARD } from "../../../constants"
let triggerCount = false
export const handleGCPurchase = (
  eventName: string,
  dataLayer: any,
  address: any,
  GCFormDetailsStore: any,
  response: any,
) => {
  if (triggerCount) {
    return
  }

  const giftCardType = response?.giftCard?.[0]?.theme?.length === 0 ? "Physical-gift card" : "E-gift card"
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
      brandName: AFFILIATION,
      datesToBook: "",
      giftCardCategory: giftCardType,
      giftCardType: GCFormDetailsStore?.GCThemeData?.name || response?.giftCard?.[0]?.theme,
      giftCardValue: response?.giftCard?.[0]?.amount || "",
      giftCardQuantity: GCFormDetailsStore?.quantity || response?.giftCard?.length || "",
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
      ecommerce: {
        currency: "INR",
        transaction_id: response?.purchaseOrderNo,
        value: response?.priceBreakUp?.totalPrice,
        tax: 0,
        payment_type: response?.paymentMethod?.split("BY")?.[1],
        payment_status: response?.paymentMethod?.split("BY")?.[0],
        giftcard_redeem_amount: "",
        nuecoins_redeem_amount: response?.priceBreakUp?.neuCoinsAmount,
        items: [
          {
            item_id: response?.giftCard?.[0]?.sku,
            item_name: GCFormDetailsStore?.GCThemeData?.name || response?.giftCard?.[0]?.theme,
            affiliation: AFFILIATION,
            index: 0,
            item_category: GIFT_CARD,
            item_category2: giftCardType || "",
            item_category3: "New",
            item_category4: "",
            item_list_id: "",
            item_list_name: "",
            price: response?.giftCard?.[0]?.amount,
            quantity: GCFormDetailsStore?.quantity || response?.giftCard?.length || "",
          },
        ],
      },
    },
  })
  triggerCount = true
}
