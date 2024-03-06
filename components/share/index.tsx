import React from "react"
import dynamic from "next/dynamic"

const Share = dynamic(() => import("./share"))

export const RenderShareComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    case "share":
      return <Share {...props} />
    default:
      return <></>
  }
}
