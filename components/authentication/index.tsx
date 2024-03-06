import React from "react"
import dynamic from "next/dynamic"
const OtpScreenComponent = dynamic(() => import("../Login/OtpInputLogic/otpScreen.component"))

const RenderAuthenticationComponents = (props: any) => {
  const variant = props?.variant
  switch (variant) {
    case "authentication.mobile-number-verification":
      return <OtpScreenComponent data={props} />
    default:
      return <></>
  }
}

export default RenderAuthenticationComponents
