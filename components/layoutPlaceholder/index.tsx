import React, { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Unknown } from "../unknown.component"

export default function RenderLayoutPlaceholder(props: any) {
  const variant =
    props?.largeVariant ||
    props?.groupLargeVariant ||
    props?.groupMobileVariant ||
    props?.bannerLargeVariant ||
    props?.cardLargeVariant
  const ihclContext = useContext(IHCLContext)
  switch (variant) {
    default:
      const DefaultComponent: any = ihclContext?.getLayoutPlaceholderVariant(variant) || Unknown
      return <DefaultComponent {...props} />
  }
}
