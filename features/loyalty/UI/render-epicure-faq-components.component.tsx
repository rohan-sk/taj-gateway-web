import React, { useEffect, useState } from "react"
import { renderComponent } from "../../../lib/render-component"
import { useRouter } from "next/router"

const RenderEpicureFaqComponents = (props: any) => {
  const [componentData, setComponentData] = useState<any>({})
  const { cardActionType, contentType } = props
  const router = useRouter()
  const isQueryEmpty = Object.keys(router.query).length === 0
  const routerIndentifier = router?.query?.pid ?? router?.query?.slug

  useEffect(() => {
    const ctaLabel = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel || {}

    const PrimaryAction =
      cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction || {}
    const SecondaryAction =
      cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction || {}
    if (contentType === "epicureprogramTnc") {
      setComponentData({
        ...props,
        largeVariant: props?.cardLargeVariant,
        variant: props?.cardMobileVariant,
        url: isQueryEmpty ? ctaLabel?.url : `${ctaLabel?.url}/${routerIndentifier}`,
        urlType: ctaLabel?.urlType,
        ctaLabel: ctaLabel?.title,
        secondaryAction: SecondaryAction,
        primaryAction: PrimaryAction,
        _type: "card",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType])

  return <>{renderComponent(componentData?._type, { ...componentData })}</>
}

export default RenderEpicureFaqComponents
