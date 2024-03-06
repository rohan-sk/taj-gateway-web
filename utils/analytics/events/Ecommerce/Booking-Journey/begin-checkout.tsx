import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"

export const handleBeginCheckOut = (
  eventName: string,
  dataLayer: any,
  hotelDataLayer: any,
  roomDetails: any,
  bookingFlowPageStore: any,
  bookingFlowGlobalStore: any,
  cartDetails: any,
  address: any,
  roomData: any,
  getItem: any,
  codes: any,
  title?: string,
) => {
  const dates = bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.items?.[0]?.hotel?.[0]
  const presentDate = new Date()
  const checkInDate = new Date(dates?.checkIn)
  const checkOutDate = new Date(dates?.checkOut)
  let adultCount: number = 0
  let childCount: number = 0
  roomDetails?.map((room: any) => {
    if (room?.adult) {
      adultCount = adultCount + room?.adult
    }
    if (room?.children) {
      childCount = childCount + room?.children
    }
  })
  let discountPrice: any = bookingFlowPageStore?.discountPrice
  global?.window?.localStorage?.setItem("discountPrice", JSON.stringify(discountPrice))

  let bookingTabType = getItem("activeTabName") as string
  let tabName = bookingTabType?.toLowerCase()
  let bookingTabUserType: any = bookingFlowPageStore?.selectedTab

  global?.window?.localStorage?.setItem("activeTabNameSelected", JSON.stringify(bookingTabUserType))
  global?.window?.localStorage?.setItem("selectedRoomType", JSON.stringify(bookingFlowPageStore?.selectedRoomPrice))
  let uniqueRooms: any[] = []

  roomDetails?.map((room: any, index: number) => {
    let foundIndex = -1
    const isItemExists = uniqueRooms?.find((cItem, cIndex) => {
      const condition =
        cItem?.item_category === bookingFlowPageStore?.selectedRoomType?.[index] &&
        cItem?.item_category2 === room?.packageName &&
        cItem?.item_category3 === bookingFlowPageStore?.selectedRoomPrice?.[index] &&
        cItem?.item_name === room?.roomName

      foundIndex = condition ? cIndex : -1
      return condition
    })
    if (isItemExists) {
      const tempUnique = [...uniqueRooms]
      const updatedUnique = {
        ...isItemExists,
        quantity: isItemExists?.quantity + 1,
      }
      tempUnique.splice(foundIndex, 1, updatedUnique)
      uniqueRooms = tempUnique
    } else {
      uniqueRooms.push({
        item_id: `${bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId}_${room?.roomName}_${room?.packageName}`,
        item_name: room?.roomName || "",
        discount:
          tabName === "promotions"
            ? Math?.abs(cartDetails?.cartDetailsResponse?.totalCouponDiscountValue)
            : bookingFlowPageStore?.discountPrice?.[index],
        index: index,
        item_brand: hotelDataLayer?.hotelName || "",
        item_category: bookingFlowPageStore?.selectedRoomType?.[index] || "",
        item_category2: room?.packageName || "",
        item_category3: bookingFlowPageStore?.selectedRoomPrice?.[index] || "",
        item_category4: dataLayer?.membershipType,
        item_category5: hotelDataLayer?.hotelCity,
        item_list_name: bookingFlowPageStore?.selectedTab?.[index],
        item_list_id: getItem("hotelJourneyPageType") + `| ${hotelDataLayer?.hotelName}`,
        price: room?.cost || "",
        quantity: 1,
        affiliation: hotelDataLayer?.hotelBrand || "",
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
      bookingPaymentType: title ? title : "",
      bookingType: cartDetails?.cartDetailsResponse?.items?.[0]?.category,
      location: "",
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      datesToBook: Math?.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
      arrivalDate: dates?.checkIn || "",
      departureDate: dates?.checkOut || "",
      noOfAdults: adultCount,
      noOfChild: childCount,
      totalNoOfGuests: adultCount + childCount,
      noOfRooms: roomDetails?.length,
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
      pointstobeRedeemed: "",
      buttonLinkName: title ? title : "",
      link_url: "",
      link_text: title ? title : "",
      outbound: "",
      paymentType: "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      userPinCode: address?.pinCode ? address?.pinCode : "",
      clientId: getCookie("_ga")?.slice(6),
      ecommerce: {
        currency: roomData?.currency || "",
        value: bookingFlowGlobalStore?.cartDetails?.cartDetailsResponse?.basePrice || "",
        coupon: "",
        payment_method: title ? title : "PAY NOW",
        items: uniqueRooms,
      },
    },
  })
}
