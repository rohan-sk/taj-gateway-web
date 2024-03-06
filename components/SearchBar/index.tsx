import React from "react"
import dynamic from "next/dynamic"
const GlobalSearchIcon = dynamic(() => import("./global-search-icon.component"))
const GlobalSearchBar = dynamic(() => import("./global-search-bar-component"))
const GlobalBookingFlowBar = dynamic(() => import("./global-booking-mask.component"))
const GlobalBookingMaskWithPrice = dynamic(() => import("./global-booking-mask-with-price"))

export const RenderSearchBar = ({ variant, props, setFromMic }: any) => {
  switch (variant) {
    case "ihcl.banner.global-search-field":
      return <GlobalSearchBar {...props} setFromMic={setFromMic} />
    case "ihcl.banner.global-booking-mask":
      return <GlobalBookingFlowBar {...props} />
    case "ihcl.banner.global-booking-mask-with-prices":
      return <GlobalBookingMaskWithPrice {...props} />
    case "ihcl.banner.search-icon":
      return <GlobalSearchIcon {...props} />
    case "ihcl.banner.global-search-field-is-not-allowed":
      return <></>
    default:
      return <></>
  }
}
