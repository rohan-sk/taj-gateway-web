import React from "react"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { PortableText } from "../../lib/portable-text-serializers"
import { theme, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"
import {
  CardWithBoldTextHyperlinkComponentWrapper,
  CardWithBoldTextHyperlinkSingleContentWrapper,
} from "../group/styles/group-with-bombay-brasserie-info-styles"

const CardWithBoldTextHyperlinkComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)

  return (
    <CardWithBoldTextHyperlinkComponentWrapper
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}
      $isMobile={isMobile}>
      <CardWithBoldTextHyperlinkSingleContentWrapper $isMobile={isMobile}>
        {props?.singleContent?.map((content: any, index: number) => {
          return (
            <PortableText
              blocks={{
                ...content,
                color: theme?.palette?.neuPalette?.hexThirtyFour,
                variant: isMobile ? "m-body-xxl" : "body-xxl",
              }}
              key={index}
            />
          )
        })}
      </CardWithBoldTextHyperlinkSingleContentWrapper>
    </CardWithBoldTextHyperlinkComponentWrapper>
  )
}

export default CardWithBoldTextHyperlinkComponent
