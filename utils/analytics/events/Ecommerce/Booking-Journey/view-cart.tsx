import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import {
  CHAMBERS_TIER,
  EPICURE_TIER,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_TIRE,
  isUserLoggedIn,
} from "../../../constants"

export const handleViewCart = (
  eventName: string,
  dataLayer: any,
  hotelDataLayer: any,
  bookingFlowGlobalStore: any,
  bookingFlowPageStore: any,
  address: any,
  getItem: any,
  isLoggedIn: boolean,
  codes: any,
  Cart: any,
) => {
  const cartRoom = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]?.room
  let adultCount: number = 0
  let childCount: number = 0
  cartRoom?.map((room: any) => {
    if (room?.adult) {
      adultCount = adultCount + room?.adult
    }
    if (room?.children) {
      childCount = childCount + room?.children
    }
  })
  const dates = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.items?.[0]?.hotel[0]
  const presentDate = new Date()
  const checkInDate = new Date(dates?.checkIn)
  const checkOutDate = new Date(dates?.checkOut)
  const Discount = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.paymentSummary
  let uniqueRooms: any[] = []

  cartRoom?.map((item: any, index: number) => {
    let foundIndex = -1
    const isItemExists = uniqueRooms?.find((cItem, cIndex) => {
      const condition =
        cItem?.item_category === bookingFlowPageStore?.selectedRoomType?.[index] &&
        cItem?.item_category2 === item?.packageName &&
        cItem?.item_category3 === bookingFlowPageStore?.selectedRoomPrice?.[index] &&
        cItem?.item_name === item?.roomName

      foundIndex = condition ? cIndex : -1
      return condition
    })
    if (isItemExists) {
      const tempUnique = [...uniqueRooms]
      const updatedUnique = {
        ...isItemExists,
        quantity: isItemExists?.quantity + 1,
      }
      tempUnique?.splice(foundIndex, 1, updatedUnique)
      uniqueRooms = tempUnique
    } else {
      uniqueRooms?.push({
        item_id: `${bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId}_${item?.roomName}_${item?.packageName}`,
        item_name: item?.roomName || "",
        discount: bookingFlowPageStore?.discountPrice[index],
        index: index,
        item_brand: hotelDataLayer?.hotelName,
        item_category: bookingFlowPageStore?.selectedRoomType?.[index],
        item_category2: item?.packageName || "",
        item_category3: bookingFlowPageStore?.selectedRoomPrice?.[index] || "",
        item_category4:
          isLoggedIn || isUserLoggedIn
            ? `${
                getItem("chambersMemberTier") ||
                CHAMBERS_TIER ||
                getItem("epicureMemberTier") ||
                EPICURE_TIER ||
                "Neupass"
              } - ${getItem("userTier") || USER_TIRE}`
            : "",
        item_category5: hotelDataLayer?.hotelCity,
        price: item?.cost || "",
        quantity: 1,
        affiliation: hotelDataLayer?.hotelBrand || "",
        item_list_name: bookingFlowPageStore?.selectedTab?.[index],
        item_list_id: getItem("hotelJourneyPageType") + `| ${hotelDataLayer?.hotelName}`,
        promotion_name: "",
        promotion_id: "",
        coupon: bookingFlowPageStore?.selectedTab?.[index] === "Promotions" ? codes?.title : "",
        room_nights: Math?.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || "",
      })
    }
  })
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      ...hotelDataLayer,
      event: eventName,
      location: "",
      clientId: getCookie("_ga")?.slice(6),
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      visitSource: "",
      datesToBook: Math?.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
      arrivalDate: dates?.checkIn,
      departureDate: dates?.checkOut,
      noOfAdults: adultCount,
      noOfChild: childCount,
      totalNoOfGuests: adultCount + childCount,
      noOfRooms: cartRoom?.length,
      brandName: hotelDataLayer?.hotelBrand || "",
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
      ponitstobeRedeemed: "",
      bookingType: bookingFlowGlobalStore?.addToCartPayload?.category,
      bookingPaymentType: "",
      buttonLinkName: "",
      link_url: "",
      link_text: "",
      widget_title: Cart?.title,
      widget_description: "",
      widget_type: "",
      widget_position: "",
      widget_powered_by: "",
      outbound: "",
      paymentType: "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
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
      memberName:
        isLoggedIn || isUserLoggedIn
          ? `${getItem("userFirstName") || USER_FIRST_NAME}` + ` ${getItem("userLastName") || USER_LAST_NAME}`
          : "",
      ecommerce: {
        currency: cartRoom?.[0]?.currency,
        value: bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.basePrice,
        items: uniqueRooms,
      },
    },
  })
}
