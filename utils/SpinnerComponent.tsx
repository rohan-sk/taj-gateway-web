import { Box } from "@mui/system"
import React from "react"
import { ICONS } from "../components/constants"
import { useMobileCheck } from "./isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "./DesktopFontCalc"

export default function LoadingSpinner({ componentLevel = false, containerStyle }: any) {
  const isMobile = useMobileCheck()
  return (
    <div className={componentLevel ? "inline-spinner-container" : "spinner-container"} style={{ ...containerStyle }}>
      <Box
        alt={`taj-loader-img`}
        component={"img"}
        decoding="async"
        loading="lazy"
        src={ICONS?.TAJ_LOADER}
        width={isMobile ? MobilePxToVw(100) : DesktopPxToVw(100)}
        height={isMobile ? MobilePxToVw(100) : DesktopPxToVw(100)}
      />
    </div>
  )
}
