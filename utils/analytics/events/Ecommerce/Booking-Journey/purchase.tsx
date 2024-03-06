import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { isUserLoggedIn, CHAMBERS_TIER, EPICURE_TIER, USER_TIRE } from "../../../constants"

export const handlePurchase = (
  eventName: string,
  bookingFlowPageStore: any,
  codes: any,
  bookingConfirmationResponse: any,
  dataLayer: any,
  hotelDataLayer: any,
  hotelResponse: any,
  address: any,
  getItem: any,
  adults: any,
  children: any,
  rooms: any,
  checkInDate: any,
  presentDate: any,
  currencyCode: string,
  checkOutDate: any,
  epochTimeCreated: any,
) => {
  let storedValue: string = getItem("discountPrice") as string
  let userDiscount = storedValue ? JSON?.parse(storedValue) : []
  let bookingTabType = getItem("activeTabName") as string
  let tabName = bookingTabType?.toLowerCase()
  let storedTabValue: string = getItem("activeTabNameSelected") as string
  let userTabValue = storedTabValue ? JSON?.parse(storedTabValue) : []
  let storedRoomType: string = getItem("selectedRoomType") as string
  let userRoomType = storedRoomType ? JSON?.parse(storedRoomType) : []
  let uniqueRooms: any[] = []
  bookingConfirmationResponse?.rooms?.map((room: any, index: number) => {
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
        item_id: `${hotelResponse?.synxisHotelId}` + `_${room?.room_name}` + `_${room?.packageName}`,
        item_name: room?.room_name,
        affiliation: hotelResponse?.brandName || "",
        discount:
          tabName === "promotions"
            ? Math.abs(bookingConfirmationResponse?.totalCouponDiscountValue)
            : userDiscount?.[index],
        index: index,
        item_brand: bookingConfirmationResponse?.hotelName || "",
        item_category: bookingConfirmationResponse?.rooms?.[index]?.isPackageCode === true ? "Package" : "Room",
        item_category2: room?.packageName,
        // item_category3:
        //   bookingFlowPageStore?.selectedRoomPrice?.[index] || "",
        item_category3: userRoomType?.[index],
        item_category4: isUserLoggedIn
          ? `${
              getItem("chambersMemberTier") ||
              CHAMBERS_TIER ||
              getItem("epicureMemberTier") ||
              EPICURE_TIER ||
              "Neupass"
            } - ${getItem("userTier") || USER_TIRE}`
          : "",
        item_category5: hotelResponse?.hotelAddress?.city,
        item_list_name: userTabValue?.[index],
        item_list_id: getItem("hotelJourneyPageType") + `| ${bookingConfirmationResponse?.hotelName}`,
        price:
          // Number(room?.modifyBooking?.packageData?.package_amount) ||
          Number(room?.packageData?.package_amount),
        quantity: 1,
        promotion_name: "",
        promotion_id: "",
        coupon: userTabValue?.[index] === "Promotions" ? getItem("promoCode") || codes?.title : "",
        reservation_number: room?.booking_number,
        room_nights: Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || "",
      })
    }
  })
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      ...hotelDataLayer,
      arrivalDate: bookingConfirmationResponse?.check_in,
      departureDate: bookingConfirmationResponse?.check_out,
      noOfAdults: adults,
      noOfChild: children,
      totalNoOfGuests: adults + children,
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
        transaction_id: `${bookingConfirmationResponse?.itinerary_number}-${epochTimeCreated}`,
        value:
          //  isModified
          //   ? Number(bookingConfirmationResponse?.totalPriceChange)
          //   :
          Number(bookingConfirmationResponse?.paymentBreakup?.total),
        coupon: "",
        payment_status: bookingConfirmationResponse?.paymentStatus || bookingConfirmationResponse?.payment_status,
        payment_type: bookingConfirmationResponse?.paymentMethod,
        payment_method: bookingConfirmationResponse?.paymentMethod === "PAY ONLINE" ? "PAY NOW" : "PAY AT HOTEL",
        tax:
          // isModified
          //   ? Number(bookingConfirmationResponse?.totalTaxChange)
          //   :
          Number(bookingConfirmationResponse?.paymentBreakup?.taxes_and_fees?.taxAmount),
        giftcard_redeem_amount: Number(bookingConfirmationResponse?.paymentBreakup?.giftCard_redemption) || 0,
        nuecoins_redeem_amount: Number(bookingConfirmationResponse?.paymentBreakup?.neuCoins_redemption) || 0,
        items: uniqueRooms,
      },
    },
  })
}
