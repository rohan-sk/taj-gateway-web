import React from "react"
import { Box } from "@mui/material"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { PortableText } from "../../lib/portable-text-serializers"
import { CardWithTextHyperLinkSingleContentWrapper } from "../group/styles/group-with-bombay-brasserie-info-styles"

const CardWithTextHyperLinkComponents = (props: any) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)

  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <CardWithTextHyperLinkSingleContentWrapper $isMobile={isMobile}>
        {props?.singleContent?.map((content: any, index: number) => {
          return (
            <PortableText
              blocks={{
                ...content,
                color: theme?.palette?.ihclPalette?.hexThirtyFour,
                variant: isMobile ? "m-body-xsl" : "body-xsl",
              }}
              key={index}
            />
          )
        })}
      </CardWithTextHyperLinkSingleContentWrapper>
    </Box>
  )
}

export default CardWithTextHyperLinkComponents
