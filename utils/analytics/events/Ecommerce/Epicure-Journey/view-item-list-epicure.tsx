import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  isUserLoggedIn,
  CHAMBERS_TIER,
  EPICURE_TIER,
  USER_TIRE,
  AFFILIATION,
  MEMBERSHIP,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from "../../../constants"

export const handleViewItemListEvent = (
  eventName: string,
  dataLayer: any,
  address: any,
  isMobile: boolean,
  parentProps: any,
  getItem: any,
  isUserLoggedIn: any,
) => {
  let pathname = global?.window?.location?.pathname
  let isMembershipCard = pathname?.includes("epicureprogram")
  isMembershipCard &&
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
        bookingType: "",
        bookingPaymentType: "",
        buttonLinkName: "",
        link_url: "",
        link_text: "",
        paymentType: "",
        outbound: "",
        userPinCode: address?.pinCode ? address?.pinCode : "",
        userState: address?.state ? address?.state : "",
        userCity: address?.cityTown ? address?.cityTown : "",
        pageSection: isMobile
          ? `${parentProps?.title?.mobileTitle?.[0]}` + `${parentProps?.title?.mobileTitle?.[1]}`
          : `${parentProps?.title?.desktopTitle?.[0]}`,
        widget_title: isMobile
          ? `${parentProps?.title?.mobileTitle?.[0]}` + `${parentProps?.title?.mobileTitle?.[1]}`
          : `${parentProps?.title?.desktopTitle?.[0]}`,
        widget_type: parentProps?._type,
        membershipType: isUserLoggedIn
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
          items: parentProps?.items?.map((item: any, index: number) => {
            let cardPrice = parseInt(item?.totalPrice.replace(/[^\d]/g, ""), 10)
            return {
              item_id: "",
              item_name: item?.title,
              affiliation: AFFILIATION,
              item_category: MEMBERSHIP,
              item_category2: item?.tier,
              price: cardPrice,
              quantity: 1,
              index: index || 0,
            }
          }),
        },
      },
    })
}
