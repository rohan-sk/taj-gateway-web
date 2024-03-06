import React from "react"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("./footer.component"))

export const RenderFooterComponent = ({ footerData, showBottomNavigation }: any) => {
  const footerVariant = footerData?.[0]?.variant

  switch (footerVariant) {
    case "default-footer":
      return <Footer {...footerData?.[0]} showBottomNavigation={showBottomNavigation}/>
    default:
      return <></>
  }
}
