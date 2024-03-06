import { useContext } from "react"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { GLOBAL_STORES } from "../Constants"
import { AFFILIATION } from "./constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export const HotelDataLayer = () => {
  const context: any = useContext(IHCLContext)
  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore
  const hotelDetailsData = bookingFlowGlobalStore?.addToCartPayload?.hotel?.[0]

  let digitalHotelData: any

  digitalHotelData = {
    hotelBrand: bookingFlowGlobalStore?.analyticsHotelBookingData?.brandName,
    hotelCity: hotelDetailsData?.city,
    hotelCode: bookingFlowGlobalStore?.analyticsHotelBookingData?.synxisHotelId,
    hotelCountry: hotelDetailsData?.country,
    hotelName: hotelDetailsData?.hotelName,
    hotelPinCode: hotelDetailsData?.pinCode,
    hotelState: hotelDetailsData?.state,
    hotelType: bookingFlowGlobalStore?.analyticsHotelBookingData?.hotelType,
  }

  return digitalHotelData
}
