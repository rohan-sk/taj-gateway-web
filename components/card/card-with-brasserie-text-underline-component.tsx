import React, { useContext } from "react"
import { Box } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { CardContentItems, singleContentInterface } from "../types"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { IHCLContext, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"
import {
  CardBrasserieTextUnderlineImageContainer,
  CardBrasserieTextUnderlineSingleContentWrapper,
  CardBrasserieTextUnderlineSingleContentContainer,
} from "./styles/common-styles"

const CardWithBrasserieTextUnderlineComponent = ({ aesthetic, singleContent, largeImage, image }: CardContentItems) => {
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const { getOptimizeImageUrl } = useImageUtility()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      {(singleContent || image?.asset?._ref || largeImage?.asset?._ref) && (
        <CardBrasserieTextUnderlineSingleContentContainer>
          {singleContent && (
            <CardBrasserieTextUnderlineSingleContentWrapper $isMobile={isMobile}>
              {singleContent?.map((content: singleContentInterface, index: number) => (
                <PortableText blocks={content} key={index} />
              ))}
            </CardBrasserieTextUnderlineSingleContentWrapper>
          )}
          {(image?.asset?._ref || largeImage?.asset?._ref) && (
            <CardBrasserieTextUnderlineImageContainer>
              <Box
                width={"100%"}
                height={"100%"}
                component={"img"}
                alt={(isMobile ? image?.altText : largeImage?.altText) || `text-underline`}
                src={getOptimizeImageUrl(urlFor(isMobile ? image?.asset?._ref : largeImage?.asset?._ref).url(), 1)}
              />
            </CardBrasserieTextUnderlineImageContainer>
          )}
        </CardBrasserieTextUnderlineSingleContentContainer>
      )}
    </Box>
  )
}

export default CardWithBrasserieTextUnderlineComponent
