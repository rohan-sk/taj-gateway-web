import React from "react"
import dynamic from "next/dynamic"
import { ROUTES } from "../../utils/routes"
import { useMobileCheck } from "../../utils/isMobilView"
import { useRouter } from "next/router"
import { RoomsAndSuitesRoute, bookingRoute } from "../../features/property/ui/constants"
const BookingFlowHeader = dynamic(() => import("./booking-flow-header.component"))
const EpicurePurchaseFormHeader = dynamic(
  () => import("../../features/loyalty/UI/epicure-purchase-form-header.component"),
)
const Header = dynamic(() => import("./header.component"))
const MobileHeader = dynamic(() => import("./default-mobile-header.component"))

export const RenderHeaderComponent = ({ headerData }: any) => {
  const isMobile = useMobileCheck()
  const variant = headerData?.[0]?.variant
  const pageHeaderVariant = headerData?.pageHeaderVariant
  const router = useRouter()
  const routerArr = router?.asPath?.split("/")
  const hotelRoomsSuitesIndex = routerArr?.findIndex((route: any) => route === RoomsAndSuitesRoute)
  const isHotelLevelBookingRoute =
    hotelRoomsSuitesIndex === 3 && routerArr?.[hotelRoomsSuitesIndex + 1] === bookingRoute

  const paths = [
    ROUTES?.BOOKING?.CART,
    ROUTES?.BOOKING.CONFIRMED_PAGE,
    ROUTES?.MY_ACCOUNT.CHANGE_ROOMS,
    ROUTES?.MY_ACCOUNT.CHANGE_ROOMS_DETAIL,
  ]
  switch (variant) {
    case "default-header":
      return pageHeaderVariant?.toLowerCase() === "epicureheader" ? (
        <EpicurePurchaseFormHeader {...headerData} />
      ) : isMobile ? (
        <MobileHeader {...headerData} />
      ) : paths?.includes(global?.window?.location?.pathname) || isHotelLevelBookingRoute ? (
        <BookingFlowHeader {...headerData} />
      ) : (
        <Header {...headerData} />
      )
    default:
      return <></>
  }
}
