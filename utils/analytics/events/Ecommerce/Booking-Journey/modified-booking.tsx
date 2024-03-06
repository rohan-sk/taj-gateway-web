import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { isUserLoggedIn, CHAMBERS_TIER, EPICURE_TIER, USER_TIRE } from "../../../constants"

const handleModifiedBooking = (
  eventName: string,
  dataLayer: any,
  hotelDataLayer: any,
  address: any,
  hotelResponse: any,
  getItem: any,
  bookingConfirmationResponse: any,
  epochTime: any,
) => {
  let checkInDates: string = ""
  let checkOutDates: string = ""
  let newCheckInDates: string = ""
  let newCheckOutDates: string = ""
  let oldRoomName: string = ""
  let newRoomName: string = ""
  let priceDifference: string = ""
  const bookingModificationType: any = ""
  bookingConfirmationResponse?.rooms?.map((room: any, index: number) => {
    let bookingModificationType = room?.modifyBooking?.check_in !== room?.check_in

    if (room?.modifyBooking) {
      if (checkInDates) {
        checkInDates += ` | ${room?.check_in}`
      } else {
        checkInDates += `${room?.check_in}`
      }
      if (newCheckInDates) {
        newCheckInDates += ` | ${room?.modifyBooking?.check_in}`
      } else {
        newCheckInDates += `${room?.modifyBooking?.check_in}`
      }
      if (checkOutDates) {
        checkOutDates += ` | ${room?.check_out}`
      } else {
        checkOutDates += `${room?.check_out}`
      }
      if (newCheckOutDates) {
        newCheckOutDates += ` | ${room?.modifyBooking?.check_out}`
      } else {
        newCheckOutDates += `${room?.modifyBooking?.check_out}`
      }
      if (oldRoomName) {
        oldRoomName += ` | ${room?.room_name}`
      } else {
        oldRoomName += `${room?.room_name}`
      }
      if (newRoomName) {
        newRoomName += ` | ${room?.modifyBooking?.room_name}`
      } else {
        newRoomName += `${room?.modifyBooking?.room_name}`
      }
      if (priceDifference) {
        priceDifference += ` | ${room?.changePrice}`
      } else {
        priceDifference += `${room?.changePrice}`
      }
    }
    checkInDates = checkInDates?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    checkOutDates = checkOutDates?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    newCheckInDates = newCheckInDates?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    newCheckOutDates = newCheckOutDates?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    oldRoomName = oldRoomName?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    newRoomName = newRoomName?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
    priceDifference = priceDifference?.replace(/^\s*\|/, "")?.replace(/\|\s*$/, "")
  })
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      ...hotelDataLayer,
      userPinCode: address?.pinCode ? address?.pinCode : "",
      userState: address?.state ? address?.state : "",
      userCity: address?.cityTown ? address?.cityTown : "",
      brandName: hotelResponse?.brandName || "",
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
      transaction_id: `${bookingConfirmationResponse?.itinerary_number}-${epochTime}`,
      old_arrival_date: checkInDates,
      new_arrival_date: newCheckInDates,
      old_departure_date: checkOutDates,
      new_departure_date: newCheckOutDates,
      booking_details_modified: bookingModificationType ? "Dates" : "Rooms",
      old_room_details: oldRoomName,
      new_room_details: newRoomName,
      revenue_difference: priceDifference,
    },
  })
}
export default handleModifiedBooking
