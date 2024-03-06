import { Box } from "@mui/material"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useMobileCheck } from "../../utils/isMobilView"
import { AestheticContainer } from "../group/styles/common-styled-components"
import { PortableText } from "../../lib/portable-text-serializers"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

const OfferRichTextActions = ({ content, aesthetic, isHidden }: any) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const isMobile = useMobileCheck()
  return isHidden ? (
    <></>
  ) : (
    <>
      {content && (
        <AestheticContainer
          $padding={
            isMobile
              ? aesthetic?.padding?.mobile || cardPadding?.mobile || "5vw 12.5vw"
              : aesthetic?.padding?.desktop || cardPadding?.mobile?.desktop || "2.4vw 12.5vw"
          }>
          {content && (
            <Box
              sx={{
                "& span": {
                  fontSize: isMobile ? `${MobilePxToVw(22)}!important` : `${DesktopPxToVw(22)} !important`,
                },
              }}>
              <PortableText blocks={content} />
            </Box>
          )}
        </AestheticContainer>
      )}
    </>
  )
}
export default OfferRichTextActions
