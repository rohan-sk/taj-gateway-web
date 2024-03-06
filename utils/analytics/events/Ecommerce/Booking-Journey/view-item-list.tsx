import { getCookie } from "../../../../cookie"
import { triggerEvent } from "../../.."

export const handleViewItemList = (
  eventName: string,
  hotelData: any,
  bookingFlowGlobalStore: any,
  areArraysEqual: any,
  activeTab: any,
  hotelDataLayer: any,
  isPackagesTab: boolean,
  dataLayer: any,
  isLoggedIn: boolean,
  isMemberDealsTab: boolean,
  isPromotionsTab: boolean,
  isOffersTab: boolean,
  address: any,
  guestCount: any,
  getItem: any,
  setGuestCount: any,
) => {
  const codes = bookingFlowGlobalStore?.userEnteredPromoCode
  const dates = bookingFlowGlobalStore?.guestBookingSchedule
  const details = bookingFlowGlobalStore?.addToCartPayload
  const presentDate = new Date()
  const checkInDate = new Date(dates?.userCheckInDate)
  const checkOutDate = new Date(dates?.userCheckOutDate)
  let roomsData = bookingFlowGlobalStore?.guestDetails?.data

  const childCount = roomsData?.reduce((total: number, current: any) => {
    return total + current?.child
  }, 0)
  const adultCount = roomsData?.reduce((total: number, current: any) => {
    return total + current?.adults
  }, 0)
  setGuestCount((prev: any) => {
    return { ...prev, adultCount: adultCount, childCount: childCount }
  })
  let updatedDataSet =
    activeTab === "room rates"
      ? hotelData?.roomRates
      : isPackagesTab
      ? hotelData?.packagesRates
      : isMemberDealsTab
      ? hotelData?.memberExclusiveRates
      : isPromotionsTab
      ? hotelData?.promotionRates
      : hotelData?.offerRates
  let viewItemList: any[] = []
  const loopingData = updatedDataSet
    ? isMemberDealsTab || isPromotionsTab || isOffersTab
      ? [...updatedDataSet]
      : updatedDataSet
    : []
  if (loopingData?.length > 0 && !areArraysEqual(viewItemList, loopingData)) {
    viewItemList = updatedDataSet
    let allRoomsData: any = updatedDataSet
      ?.map((item: any, index: number) => {
        const roomTitle = item?.basicInfo?.title
        const synxisHotelId = bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId
        // Handle "room rates" logic
        return item?.rooms?.map((room: any, index: number) => {
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
          let filteredTempObj: any = Object.fromEntries(
            Object.entries(tempObj).filter(([_, value]) => value !== undefined),
          )
          return filteredTempObj
        })
      })
      .flat()
      .filter((room: any) => room !== null)

    allRoomsData = allRoomsData?.filter((room: any) => {
      // Check if the room is not undefined or null
      if (room) {
        // Check if all values in the room object are not undefined
        return Object.values(room).every((value) => value !== undefined)
      }
      // If room is undefined or null, filter it out
      return false
    })

    if (allRoomsData?.length > 0) {
      activeTab !== undefined &&
        triggerEvent({
          action: eventName,
          params: {
            ...dataLayer,
            ...hotelDataLayer,
            event: eventName,
            eventTicketsQty: "",
            eventDate: "",
            offerName: "",
            offerCode: "",
            offerID: "",
            offerCategory: "",
            offerValidity: "",
            datesToBook: Math.ceil((checkInDate?.getTime() - presentDate?.getTime()) / 86400000) || "",
            arrivalDate: dates?.userCheckInDate,
            departureDate: dates?.userCheckOutDate,
            noOfRooms: roomsData?.length,
            // specialCode: codes?.title,
            clientId: getCookie("_ga")?.slice(6),
            visitSource: "",
            brandName: hotelDataLayer?.hotelBrand || "",
            link_url: "",
            noOfAdults: adultCount,
            noOfChild: childCount,
            totalNoOfGuests: adultCount + childCount,
            link_text: "",
            outbound: "",
            location: "",
            eventType: "",
            eventName: "",
            eventPlace: "",
            giftCardCategory: "",
            giftCardType: "",
            giftCardValue: "",
            giftCardQuantity: "",
            redemptionType: "",
            redemptionName: "",
            redemptionDescription: "",
            pointsType: "",
            pointstobeRedeemed: "",
            bookingType: details?.category,
            bookingPaymentType: "",
            buttonLinkName: "",
            paymentType: "",
            userState: address?.state ? address?.state : "",
            userCity: address?.cityTown ? address?.cityTown : "",
            userPinCode: address?.pinCode ? address?.pinCode : "",
            pageSection: activeTab,
            ecommerce: {
              item_list_name: activeTab,
              item_list_id: getItem("hotelJourneyPageType") + `| ${hotelDataLayer?.hotelName}`,
              items: allRoomsData,
            },
          },
        })
    }
  }
}
