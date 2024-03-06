import { Box, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { currencyPrettier } from "../../../../../utils/currency"
import DesktopPxToVw, { MobilePxToVw } from "../../../../../utils/DesktopFontCalc"
import getGiftCardDetails from "../../../../../utils/fetchGiftCardDetails"
import { useMobileCheck } from "../../../../../utils/isMobilView"
import { CONSTANTS } from "../../../../constants"
import { ActionButton } from "../../../GiftCard/common/styles"
import {
  DateTypography,
  ExpireTypography,
  GCODetailsContainer,
  GCODetailsDetailsSpacerContainer,
  GiftCardBoxWrapper,
} from "../styles/over-view-gift-card"
import { formatDateWithFullMonth } from "../../../../../utils/getDate"
import { urlFor } from "../../../../../lib-sanity"

const OverViewGiftCardComponent = ({ orderLineItems }: any) => {
  const giftCardDetails = orderLineItems?.[0]?.giftCard?.giftCardDetails?.[0]
  const isMobile = useMobileCheck()
  const [skuDetails, setSkuDetails] = useState<any>()
  useEffect(() => {
    if (giftCardDetails?.sku) {
      let skuDetails = getGiftCardDetails(giftCardDetails?.sku)
      skuDetails.then((data: any) => setSkuDetails(data?.[0]))
    }
  }, [giftCardDetails?.sku])
  return (
    <GiftCardBoxWrapper $mobile={isMobile}>
      <Box>
        <Box>
          <Box
            component="img"
            alt="gift card"
            src={
              (skuDetails?.base?.largeImage?.asset?._ref && urlFor(skuDetails?.base?.largeImage?.asset?._ref).url()) ||
              "https://i.ibb.co/Thz7VP3/Rectangle-382.png"
            }
            sx={{
              width: "100%",
              height: "auto",
            }}
          />
        </Box>
        <GCODetailsDetailsSpacerContainer $mobile={isMobile}>
          <GCODetailsContainer $mobile={isMobile} $minHeight={32} $marginBottom={20}>
            <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>{giftCardDetails?.theme}</Typography>
          </GCODetailsContainer>
          <Grid container justifyContent={"space-between"}>
            <Grid container={!isMobile} item={isMobile}>
              <GCODetailsContainer $mobile={isMobile} $minHeight={21} $marginBottom={20}>
                {giftCardDetails?.validity && (
                  <Grid container rowGap={MobilePxToVw(10)}>
                    <Grid item={!isMobile} container={isMobile}>
                      <ExpireTypography $mobile={isMobile}>
                        {isMobile ? CONSTANTS?.EXPIRY_DATE : CONSTANTS?.EXPIRY_DATE + ":"}
                      </ExpireTypography>
                    </Grid>
                    <Grid item={!isMobile} container={isMobile}>
                      <DateTypography $mobile={isMobile}>
                        {`${formatDateWithFullMonth(giftCardDetails?.validity, false)}`}
                      </DateTypography>
                    </Grid>
                  </Grid>
                )}
              </GCODetailsContainer>
            </Grid>
            <Grid container={!isMobile} item={isMobile}>
              <GCODetailsContainer $mobile={isMobile} $minHeight={35} $marginBottom={0}>
                <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
                  {currencyPrettier(giftCardDetails?.amount)}
                </Typography>
              </GCODetailsContainer>
            </Grid>
          </Grid>
        </GCODetailsDetailsSpacerContainer>
        <GCODetailsContainer $mobile={isMobile} $minHeight={23} $marginBottom={0}>
          <ActionButton
            $isMobile={isMobile}
            sx={{
              paddingTop: "0vw!important",
              float: isMobile ? "right" : "left",
            }}>
            {CONSTANTS?.MANAGE_CARD}
          </ActionButton>
        </GCODetailsContainer>
      </Box>
    </GiftCardBoxWrapper>
  )
}

export default OverViewGiftCardComponent
