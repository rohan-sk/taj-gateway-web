import dynamic from "next/dynamic"
import React from "react"
const DividerComponent = dynamic(()=> import("./divider.component"))

const RenderDividerComponent = (props: any) => {
  const variant = props?.variant
  switch (variant) {
    case "default":
      return <DividerComponent {...props} />
    default:
      return <></>
  }
}

export default RenderDividerComponent
