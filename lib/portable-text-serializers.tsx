import { PortableText as PortableTextComponent } from "@portabletext/react"
import { getPortableTextSerializers } from "../components/portable-text"
import { useMobileCheck } from "../utils/isMobilView"
import React from "react"

const PortableCustomComponent = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <PortableTextComponent components={getPortableTextSerializers(props, isMobile)} value={props?.blocks} {...props} />
  )
}
export const PortableText = React.memo(PortableCustomComponent)
