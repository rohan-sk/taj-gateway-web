import React from "react"
import { ActionProps } from "../types"
import { CheckRatesMainBox } from "./styles/single-item-in-bottom-nav"
import dynamic from "next/dynamic"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type SingleItemInBottomNavTypes = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
}

const SingleItemInBottomNav = (props: SingleItemInBottomNavTypes) => {
  const { primaryAction, secondaryAction } = props
  return (
    <>
      <CheckRatesMainBox>
        {secondaryAction?.title && (
          <RenderActionItem
            url={secondaryAction?.url}
            isActionButtonType={true}
            title={secondaryAction?.title}
            buttonStyles={{ width: "60%" }}
            navigationType={secondaryAction?.urlType}
            variant={secondaryAction?.variant || "light-contained"}
          />
        )}
        {primaryAction?.title && (
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            buttonStyles={{ width: secondaryAction?.title ? "40%" : "100%" }}
            navigationType={primaryAction?.urlType}
            variant={primaryAction?.variant || "light-contained"}
          />
        )}
      </CheckRatesMainBox>
    </>
  )
}

export default SingleItemInBottomNav
