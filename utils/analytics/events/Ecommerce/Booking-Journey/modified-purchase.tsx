import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { isUserLoggedIn, CHAMBERS_TIER, EPICURE_TIER, USER_TIRE } from "../../../constants"

const handleModifiedPurchase = (
  eventName: string,
  bookingConfirmationResponse: any,
  isModified: boolean,
  dataLayer: any,
  hotelDataLayer: any,
  hotelResponse: any,
  address: any,
  getItem: any,
  rooms: any,
  checkInDate: any,
  presentDate: any,
  currencyCode: string,
  checkOutDate: any,
  codes: any,
) => {
  let isRefund = eventName === "refund"
  let modifiedPrice: number = 0
  let modifiedTax: number = 0
  let refundPrice: number = 0
  let refundTax: number = 0
  let oldArrivalDate: any = ""
  let oldDepartureDate: any = ""
  let adultCountOld: number = 0
  let childrenCountOld: number = 0
  let newArrivalDate: any = ""
  let newDepartureDate: any = ""
  let adultCountNew: number = 0
  let childrenCountNew: number = 0
  let newTimeStamp: any = ""
  let oldTimeStamp: any = ""
  bookingConfirmationResponse?.rooms?.map((room: any, index: number) => {
    let roomModified = room?.roomNumber === room?.modifyBooking?.roomNumber
    if (room?.modifyBooking?.packageData?.package_amount) {
      modifiedPrice = modifiedPrice + Number(room?.modifyBooking?.packageData?.package_amount)
    }
    if (room?.modifyBooking?.tax?.amount) {
      modifiedTax = modifiedTax + room?.modifyBooking?.tax?.amount
    }
    if (room?.packageData?.package_amount && roomModified) {
      refundPrice = refundPrice + Number(room?.packageData?.package_amount)
    }
    if (room?.tax?.amount && roomModified) {
      refundTax = refundTax + room?.tax?.amount
    }
    if (room?.check_in && roomModified) {
      oldArrivalDate = room?.check_in
    }
    if (room?.check_out && roomModified) {
      oldDepartureDate = room?.check_out
    }
    if (room?.modifyBooking?.check_in) {
      newArrivalDate = room?.modifyBooking?.check_in
    }
    if (room?.modifyBooking?.check_out) {
      newDepartureDate = room?.modifyBooking?.check_out
    }
    if (room?.adults && roomModified) {
      adultCountOld = adultCountOld + room?.adults
    }
    if (room?.children && roomModified) {
      childrenCountOld = childrenCountOld + room?.children
    }
    if (room?.modifyBooking?.adults && roomModified) {
      adultCountNew = adultCountOld + room?.modifyBooking?.adults
    }
    if (room?.modifyBooking?.children && roomModified) {
      childrenCountNew = childrenCountOld + room?.modifyBooking?.children
    }
    if (room?.modifyBooking?.createdTimestamp && roomModified) {
      oldTimeStamp = room?.modifyBooking?.createdTimestamp
    }
    if (room?.modifyBooking?.modifiedTimestamp && roomModified) {
      newTimeStamp = room?.modifyBooking?.modifiedTimestamp
    }
  })
  let storedRoomType: string = getItem("selectedRoomType") as string
  let userRoomType = storedRoomType ? JSON?.parse(storedRoomType) : []
  let storedTabValue: string = getItem("activeTabNameSelected") as string
  let userTabValue = storedTabValue ? JSON?.parse(storedTabValue) : []
  const dateObject = new Date(oldTimeStamp)
  const modifiedDateObject = new Date(newTimeStamp)
  const epochTimeCreatedRoom = dateObject?.getTime() / 1000
  const epochTimeModifiedRoom = modifiedDateObject?.getTime() / 1000
  const ecommerceItems = () => {
    if (isModified) {
      // Handle "room rates" logic
      return bookingConfirmationResponse?.rooms
        ?.map((room: any, index: number) => {
          let roomModified = room?.roomNumber === room?.modifyBooking?.roomNumber

          let tempObj: any = {}
          ;(tempObj.item_name = roomModified && isRefund ? room?.room_name : room?.modifyBooking?.room_name),
            (tempObj.item_id =
              `${hotelResponse?.synxisHotelId}` +
              `_${roomModified && isRefund ? room?.room_name : room?.modifyBooking?.room_name}` +
              `_${roomModified && isRefund ? room?.packageName : room?.modifyBooking?.packageName}`),
            (tempObj.price =
              roomModified && isRefund
                ? Number(room?.packageData?.package_amount)
                : Number(room?.modifyBooking?.packageData?.package_amount)),
            (tempObj.index = index),
            (tempObj.item_brand = bookingConfirmationResponse?.hotelName),
            (tempObj.item_category =
              bookingConfirmationResponse?.rooms?.[index]?.isPackageCode === true ? "Package" : "Room"),
            (tempObj.item_category2 = roomModified && isRefund ? room?.packageName : room?.modifyBooking?.packageName),
            (tempObj.item_category3 = roomModified && !isRefund ? userRoomType?.[index] : ""),
            (tempObj.item_category4 = isUserLoggedIn
              ? `${
                  getItem("chambersMemberTier") ||
                  CHAMBERS_TIER ||
                  getItem("epicureMemberTier") ||
                  EPICURE_TIER ||
                  "Neupass"
                } - ${getItem("userTier") || USER_TIRE}`
              : ""),
            (tempObj.item_category5 = hotelResponse?.hotelAddress?.city),
            (tempObj.affiliation = hotelResponse?.brandName),
            (tempObj.quantity = 1),
            (tempObj.reservation_number = roomModified ? room?.modifyBooking?.booking_number : room?.booking_number),
            (tempObj.room_nights = Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || ""),
            (tempObj.coupon = userTabValue?.[index] === "Promotions" ? getItem("promoCode") || codes?.title : ""),
            (tempObj.promotion_name = ""),
            (tempObj.promotion_id = "")
          return tempObj
        })
        .filter((item: any) => item.item_name !== undefined)
    }
    return []
  }
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      ...hotelDataLayer,
      arrivalDate: isRefund ? oldArrivalDate : newArrivalDate,
      departureDate: isRefund ? oldDepartureDate : newDepartureDate,
      noOfAdults: isRefund ? adultCountOld : adultCountNew,
      noOfChild: isRefund ? childrenCountOld : childrenCountNew,
      totalNoOfGuests: isRefund ? adultCountOld + childrenCountOld : adultCountNew + childrenCountNew,
      noOfRooms: rooms,
      bookingType: bookingConfirmationResponse?.transactionType,
      bookingPaymentType: bookingConfirmationResponse?.paymentStatus || bookingConfirmationResponse?.payment_status,
      location: "",
      datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      visitSource: "",
      brandName: hotelResponse?.brandName || "",
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
      widget_title: "",
      widget_description: "",
      widget_type: "",
      widget_position: "",
      outbound: "",
      clientId: getCookie("_ga")?.slice(6),
      membershipType: isUserLoggedIn
        ? `${
            getItem("chambersMemberTier") || CHAMBERS_TIER || getItem("epicureMemberTier") || EPICURE_TIER || "Neupass"
          } - ${getItem("userTier") || USER_TIRE}`
        : "",
      hotelBrand: hotelResponse?.brandName,
      hotelCity: hotelResponse?.hotelAddress?.city,
      hotelCode: hotelResponse?.synxisHotelId,
      hotelCountry: hotelResponse?.hotelAddress?.country,
      hotelName: bookingConfirmationResponse?.hotelName,
      hotelPinCode: hotelResponse?.hotelAddress?.pincode,
      hotelState: hotelResponse?.hotelAddress?.state,
      hotelType: hotelResponse?.hotelType,
      ecommerce: {
        currency: currencyCode || "",
        tax: isRefund ? Number(refundTax) : Number(modifiedTax),
        value: isRefund ? refundPrice + Number(refundTax) : modifiedPrice + Number(modifiedTax),
        transaction_id: isRefund
          ? `${bookingConfirmationResponse?.itinerary_number}-${epochTimeCreatedRoom}`
          : `${bookingConfirmationResponse?.itinerary_number}-${epochTimeModifiedRoom}`,
        items: ecommerceItems(),
      },
    },
  })
}
export default handleModifiedPurchase
