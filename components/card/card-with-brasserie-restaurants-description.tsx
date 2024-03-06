import React, { useContext } from "react"
import { Box } from "@mui/material"
import { CardContentItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { IHCLContext, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"
import { BrasserieDescriptionWrapper } from "./styles/card-with-brasserie-restaurants-description-styles"

const CardWithBrasserieRestaurantsDescription = ({ singleContent, aesthetic }: CardContentItems) => {
  const context: any = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      {singleContent && (
        <BrasserieDescriptionWrapper $isMobile={isMobile}>
          {singleContent?.map((content: any, idx: number) => (
            <PortableText blocks={content} key={idx} />
          ))}
        </BrasserieDescriptionWrapper>
      )}
    </Box>
  )
}

export default CardWithBrasserieRestaurantsDescription
