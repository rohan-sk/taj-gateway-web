import React, { useContext } from "react"
import { Box, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { EGiftCardOrderStatusContainer } from "../styles/e-gift-card-order-status-details.styles"
import { singleContentInterface } from "../../types"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const GiftCardOrderStatusDetails = ({ content }: { content: singleContentInterface[] }) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  const PortableText = context!.PortableText

  return (
    <Box
      className="my-account-e-gift-card-main-container"
      p={isMobile ? `${MobilePxToVw(55)} 0vw 0vw` : `${DesktopPxToVw(60)} ${DesktopPxToVw(64)} 0vw`}>
      <EGiftCardOrderStatusContainer className="my-account-e-gift-card-content" $isMobile={isMobile}>
        <Typography variant={isMobile ? "m-body-s" : "body-s"}>{"Your Order Status"}</Typography>

        <Typography sx={{ textAlign: "center" }} variant={isMobile ? "m-body-l" : "body-l"}>
          {content &&
            content?.map((item: any, idx: number) => (
              <Box component="span" sx={{ display: "inline" }} key={idx}>
                <PortableText blocks={item?.content} />
              </Box>
            ))}
        </Typography>
      </EGiftCardOrderStatusContainer>
    </Box>
  )
}

export default GiftCardOrderStatusDetails
