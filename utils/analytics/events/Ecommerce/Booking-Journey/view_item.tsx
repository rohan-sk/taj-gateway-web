import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"

const handleViewItem = (
  eventName: string,
  parentItem: any,
  bookingFlowGlobalStore: any,
  activeTab: any,
  hotelDataLayer: any,
  dataLayer: any,
  isPackagesTab: boolean,
  isMemberDealsTab: boolean,
  isOffersTab: boolean,
  isPromotionsTab: boolean,
  isLoggedIn: boolean,
  secondaryAction: any,
  address: any,
  guestCount: any,
  loopingData: any,
) => {
  const synxisHotelId = bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId
  const roomTitle = parentItem?.basicInfo?.title
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const dates = bookingFlowGlobalStore?.guestBookingSchedule
  const details = bookingFlowGlobalStore?.addToCartPayload
  const presentDate = new Date()
  const checkInDate = new Date(dates?.userCheckInDate)
  const checkOutDate = new Date(dates?.userCheckOutDate)
  const loopingDataSet = isMemberDealsTab || isPromotionsTab || isOffersTab ? [loopingData] : loopingData.rooms

  const ecommerceItems = () => {
    // Handle "room rates" logic
    return parentItem?.rooms?.map((room: any, index: number) => {
      let tempObj: any = {}
      tempObj.affiliation = hotelDataLayer?.hotelBrand || ""
      tempObj.item_brand = hotelDataLayer?.hotelName
      tempObj.item_category = isPackagesTab ? "Package" : "Room"
      tempObj.item_category4 = dataLayer?.membershipType
      tempObj.item_category5 = hotelDataLayer?.hotelCity
      tempObj.item_id = `${synxisHotelId}_${roomTitle}_${room?.rateContent?.name}`
      tempObj.index = index
      tempObj.quantity = 1
      tempObj.item_name = roomTitle
      tempObj.item_category3 =
        isLoggedIn && room?.memberRate?.total?.amount
          ? "Member Rate"
          : isMemberDealsTab
          ? "Exclusive Rate"
          : "Standard Rate"
      tempObj.item_category2 = room?.rateContent?.name
      tempObj.price =
        isLoggedIn && room?.memberRate?.total?.amount
          ? room?.memberRate?.total?.amount
          : isPackagesTab || isMemberDealsTab || isPromotionsTab || isOffersTab
          ? room?.total?.amount
          : room?.standardRate?.total?.amount
      tempObj.discount =
        isLoggedIn && room?.memberRate?.total?.amount
          ? Number(room?.standardRate?.total?.amount) - Number(room?.memberRate?.total?.amount)
          : isPackagesTab || isMemberDealsTab || isPromotionsTab || isOffersTab
          ? 0
          : 0
      tempObj.promotion_name = ""
      tempObj.promotion_id = ""
      tempObj.coupon = activeTab === "promotions" ? codes?.title : ""
      tempObj.room_nights = Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || ""
      return tempObj
    })
  }
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      ...hotelDataLayer,
      clientId: getCookie("_ga")?.slice(6),
      buttonLinkName: secondaryAction?.title,
      link_url: secondaryAction?.url,
      link_text: secondaryAction?.title,
      event: eventName,
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
      datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
      arrivalDate: dates?.userCheckInDate,
      departureDate: dates?.userCheckOutDate,
      noOfAdults: guestCount?.adultCount,
      noOfChild: guestCount?.childCount,
      totalNoOfGuests: guestCount?.adultCount + guestCount?.childCount,
      noOfRooms: bookingFlowGlobalStore?.guestDetails?.data?.length,
      brandName: hotelDataLayer?.hotelBrand || "",
      // specialCode:
      //   codes?.agentId ||
      //   codes?.couponCode ||
      //   codes?.promoCode ||
      //   codes?.rateCode ||
      //   codes?.index ||
      //   codes?.title,
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
      bookingType: details?.category,
      bookingPaymentType: "",
      widget_type: "",
      widget_position: "",
      outbound: secondaryAction?.urlType == "internal" ? false : true,
      paymentType: "",
      pageSection: activeTab,
      ecommerce: {
        currency:
          parentItem?.rooms?.[0]?.rateContent?.currencyCode ||
          parentItem?.rateContent?.currencyCode ||
          parentItem?.rateContent?.currencyCode ||
          parentItem?.rateContent?.currencyCode,

        value: "",
        items: ecommerceItems(),
      },
    },
  })
}
export default handleViewItem
