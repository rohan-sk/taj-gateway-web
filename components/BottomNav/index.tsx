import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import React from "react"
const RoomModifyNavigationComponent = dynamic(() => import("./room-modify-navigation.component"))
const SingleItemInBottomNav = dynamic(() => import("./single-item-in-bottom-nav.component"))
const RoomBookingNavigationComponent = dynamic(() => import("./room-booking-navigation.component"))
const GlobalSearchBookingNowActionComponent = dynamic(() => import("./global-search-booking-now-action.component"))
const GlobalEnquiryFormWithTwoActionButton = dynamic(() => import("./global-enquiry-with-two-action-button.component"))
const EpicureCartBottomNavigation = dynamic(() => import("./epicure-cart-bottom-navigation.component"))

const GiftCardCartBottomNavComponent = dynamic(() => import("./gift-card-cart-bottom-nav-component"))

const RenderBottomNavItems = ({ props }: any) => {
  const variant = props?.bottomNavigationItems?.[0]?.variant

  switch (variant) {
    case "ihcl.core.card.default-bottom-navigation":
      return (
        <GlobalSearchBookingNowActionComponent
          searchData={props?.items?.[0]?.searchData}
          {...props?.bottomNavigationItems?.[0]}
        />
      )
    case "ihcl.core.card.custom-bottom-navigation":
      return <SingleItemInBottomNav {...props?.bottomNavigationItems?.[0]} />
    case "bookings.placeholders.bottom-navigation-cart-details":
      return <RoomBookingNavigationComponent />

    case "bookings.placeholders.bottom-navigation-modify-room-details":
      return <RoomModifyNavigationComponent />
    case "loyalty.placeholders.bottom-navigation-cart-details":
      return <EpicureCartBottomNavigation {...props} />
    case "ihcl.core.card.bottom-navigation-with-two-buttons":
      return <GlobalEnquiryFormWithTwoActionButton {...props?.bottomNavigationItems} />
    case "giftCards.placeholders.bottom-navigation-details":
      return <GiftCardCartBottomNavComponent {...props?.bottomNavigationItems?.[0]} />
    default:
      return <></>
  }
}

export default observer(RenderBottomNavItems)
