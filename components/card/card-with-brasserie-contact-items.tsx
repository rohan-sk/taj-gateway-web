import React from "react"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

const CardWithBrasserieContactItems = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <>
      {props?.primaryAction?.title && props?.primaryAction?.url && (
        <RenderActionItem
          showArrow={false}
          variant={undefined}
          isActionButtonType={false}
          url={props?.primaryAction?.url}
          title={props?.primaryAction?.title}
          navigationType={props?.primaryAction?.urlType}
          image={props?.primaryAction?.image?.asset?._ref}
          buttonImgStyles={{
            marginRight: isMobile ? MobilePxToVw(15) : DesktopPxToVw(15),
          }}
          linkStyles={{
            fontWeight: 400,
            textDecoration: "none",
            letterSpacing: "normal",
            color: theme?.palette?.neuPalette?.hexThirtyFour,
            fontSize: isMobile ? MobilePxToVw(23) : DesktopPxToVw(20),
            lineHeight: isMobile ? MobilePxToVw(33) : DesktopPxToVw(29),
          }}
        />
      )}
    </>
  )
}

export default CardWithBrasserieContactItems
