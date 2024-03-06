import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { AFFILIATION, GIFT_CARD } from "../../../constants"

export const handleViewItemListGC = (
  eventName: string,
  dataLayer: any,
  cardsData: any,
  address: any,
  pageSectionTitle: string,
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
      outbound: "",
      paymentType: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      pageSection: pageSectionTitle,
      widget_title: pageSectionTitle,
      ecommerce: {
        item_list_id: "",
        item_list_name: "",
        items: cardsData?.map((item: any, index: number) => {
          let giftCardType = item?.isPhysicalGIftCard ? "Physical-gift card" : "E-gift card"
          return {
            item_id: item?.sku || "",
            item_name: item?.name || "",
            index: index,
            item_category: GIFT_CARD,
            item_category2: giftCardType,
            item_category3: "New",
            item_category4: "",
            price: "",
            quantity: 1,
            affiliation: AFFILIATION,
            item_list_id: "",
            item_list_name: "",
          }
        }),
      },
    },
  })
}