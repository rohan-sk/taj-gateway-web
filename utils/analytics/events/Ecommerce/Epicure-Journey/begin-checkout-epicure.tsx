import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  AFFILIATION,
  CHAMBERS_TIER,
  EPICURE_TIER,
  MEMBERSHIP,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_TIRE,
} from "../../../constants"

export const handleEpicureBeginCheckout = (
  eventName: string,
  dataLayer: any,
  address: any,
  parentProps: any,
  epicureCardData: any,
  getItem: any,
  isUserLoggedIn: boolean,
) => {
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
      datesToBook: "",
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
      paymentType: "",
      pointstobeRedeemed: "",
      buttonLinkName: "",
      link_url: "",
      link_text: "",
      widget_position: "",
      outbound: "true",
      clientId: getCookie("_ga")?.slice(6),
      membershipType: isUserLoggedIn
        ? `${
            getItem("chambersMemberTier") || CHAMBERS_TIER || getItem("epicureMemberTier") || EPICURE_TIER || "Neupass"
          } - ${getItem("userTier") || USER_TIRE}`
        : "",
      memberName: isUserLoggedIn
        ? `${getItem("userFirstName") || USER_FIRST_NAME}` + ` ${getItem("userLastName") || USER_LAST_NAME}`
        : "",
      ecommerce: {
        currency: "INR",
        value: epicureCardData?.price,
        tax: epicureCardData?.tax,
        items: [
          {
            item_id: "",
            item_name: `Epicure ${epicureCardData?.epicureType}`,
            affiliation: AFFILIATION,
            index: 0,
            item_category: MEMBERSHIP,
            item_category2: epicureCardData?.epicureType?.toUpperCase(),
            price: Number(epicureCardData?.price),
            quantity: 1,
          },
        ],
      },
    },
  })
}
