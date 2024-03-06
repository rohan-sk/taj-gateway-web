import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { currencyPrettier } from "../../../../utils/currency"
import DesktopPxToVw from "../../../../utils/DesktopFontCalc"
import getGiftCardDetails from "../../../../utils/fetchGiftCardDetails"
import { formatDateWithFullMonth } from "../../../../utils/getDate"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { CONSTANTS } from "../../../constants"
import { GiftCardDetailsType } from "../gift-card-box.types"
import { ActionButton, BalanceBox, FlexBox, GCBox, GCDetailsBox, GCText, GCTextValue, StyledDivider } from "./styles"
import { urlFor } from "../../../../lib-sanity"

const GiftCardDetailsCardComponent = ({ orderLineItems, createdTimestamp }: GiftCardDetailsType) => {
  const [skuDetails, setSkuDetails] = useState<any>()

  const CardDetails = orderLineItems?.[0]?.giftCard
  let cardExpiry = CardDetails?.giftCardDetails?.[0]?.validity && new Date(CardDetails?.giftCardDetails?.[0]?.validity)

  const isMobile = useMobileCheck()

  useEffect(() => {
    if (CardDetails?.giftCardDetails?.[0]?.sku) {
      let skuDetails = getGiftCardDetails(CardDetails?.giftCardDetails?.[0]?.sku)
      skuDetails.then((data: any) => setSkuDetails(data?.[0]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CardDetails?.giftCardDetails?.[0]?.sku])

  return (
    <GCBox $isMobile={isMobile}>
      <Grid container spacing={1}>
        <Grid item xs={3.5}>
          <Box
            component="img"
            alt="gift card img"
            src={
              (skuDetails?.base?.largeImage?.asset?._ref && urlFor(skuDetails?.base?.largeImage?.asset?._ref).url()) ||
              "https://i.ibb.co/SQn5YR1/update-concept-application-loading-process-symbol-web-screen-vector-illustration-flat-186332-1253-1.jpg"
            }
            sx={{ width: DesktopPxToVw(267) }}
          />
        </Grid>
        <Grid item xs={8.5}>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                {CardDetails?.giftCardDetails?.[0]?.theme}
              </Typography>
              <GCDetailsBox>
                <Box>
                  <GCText $isMobile={isMobile}>
                    <b>{CONSTANTS?.BOOKED_ON}</b>
                  </GCText>
                  <GCTextValue $isMobile={isMobile}>{formatDateWithFullMonth(createdTimestamp, false)}</GCTextValue>
                </Box>
                <Box>
                  {cardExpiry && (
                    <GCText $isMobile={isMobile}>
                      <b>{CONSTANTS?.EXPIRE_BY}</b>
                    </GCText>
                  )}
                  <GCTextValue $isMobile={isMobile}>
                    {cardExpiry &&
                      `${cardExpiry?.getDay()} ${cardExpiry?.toLocaleString("default", {
                        month: "long",
                      })} ${cardExpiry?.getFullYear()}`}
                  </GCTextValue>
                </Box>
              </GCDetailsBox>
              <GCDetailsBox>
                <Box>
                  <GCText $isMobile={isMobile}>
                    <b>{CONSTANTS?.RECEIVED_FROM}</b>
                  </GCText>
                  <GCTextValue $isMobile={isMobile}>
                    {CardDetails?.senderDetails?.firstName &&
                      CardDetails?.senderDetails?.lastName &&
                      `${CardDetails?.senderDetails?.firstName} - ${CardDetails?.senderDetails?.lastName}`}
                  </GCTextValue>
                </Box>
              </GCDetailsBox>
            </Grid>
            <Grid item xs={3}>
              {!isMobile && (
                <BalanceBox>
                  <Typography variant="body-m" sx={{ textAlign: "right" }}>
                    {CONSTANTS?.BALANCE}
                  </Typography>
                  <Typography variant="heading-s">
                    {currencyPrettier(CardDetails?.giftCardDetails?.[0]?.amount)}
                  </Typography>
                </BalanceBox>
              )}
            </Grid>
          </Grid>
          <StyledDivider />
          <ActionButton $isMobile={isMobile}>{CONSTANTS?.MANAGE_CARD}</ActionButton>
        </Grid>
      </Grid>
    </GCBox>
  )
}

export default GiftCardDetailsCardComponent
