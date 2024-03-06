import { Box, Typography } from "@mui/material"
import { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GridContainer, ContentBox, BoxContainer } from "./styles/text-on-card-with-cta"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"

const TextOnCardWithCta = ({ aesthetic, ...props }: any) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const isMobile = useMobileCheck()
  return (
    <GridContainer m={isMobile ? cardPadding?.mobile : cardPadding?.desktop}>
      <BoxContainer
        alt={(isMobile ? props?.image?.altText : props?.largeImage?.altText) || "img"}
        width={"100%"}
        component={"img"}
        src={urlFor(isMobile ? props?.image?.asset?._ref : props?.largeImage?.asset?._ref).url()}
      />
      <ContentBox>
        <Typography variant={isMobile ? "m-heading-s" : "heading-s"} sx={{ color: theme?.palette?.text?.primary }}>
          {props?.title}
        </Typography>
        <Box sx={{ marginTop: isMobile ? "5.469vw" : "1.14vw" }}>
          {props?.content?.[0]?.content?.map((item: any, index: number) => (
            <PortableText key={index} sx={{ lineHeight: "140%" }} blocks={item} />
          ))}
        </Box>
      </ContentBox>
    </GridContainer>
  )
}

export default TextOnCardWithCta
