import React from "react"
import dynamic from "next/dynamic"

const RichDataWithBulletPoints = dynamic(() => import("./bullet-points.component"))

export const RenderInformationComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    case "bullet-point":
      return <RichDataWithBulletPoints {...props} />
    default:
      return <></>
  }
}
