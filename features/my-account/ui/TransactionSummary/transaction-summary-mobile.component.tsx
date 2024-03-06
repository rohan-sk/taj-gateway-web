import { Grid, Typography } from "@mui/material"
import React, { Fragment } from "react"
import { formatDateWithMON } from "../../../../utils/getDate"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { theme } from "../../../../lib/theme"
import { currencyPrettier } from "../../../../utils/currency"
import { CONSTANTS } from "../../../../components/constants"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

const TransactionSummaryMobile = ({ filteredData }: any) => {
  const isMobile = useMobileCheck()
  const getDetails = (type: any) => {
    switch (type?.paymentType?.toLowerCase()) {
      case "tata_neu":
        return `Neucoins Redemption - ${currencyPrettier(
          type?.txnNetAmount
        )?.slice(2)} coins`
      case "gift_card":
        return `Gift Card Redemption`

      default:
        break
    }
  }
  return (
    <>
      {filteredData?.map((data: any, index: number) => {
        return (
          <Fragment key={index}>
            <Typography
              variant={isMobile ? "m-body-s" : "body-s"}
              sx={{ fontWeight: 700 }}>
              {formatDateWithMON(data?.createdTimestamp)}
            </Typography>
            <Typography
              variant={isMobile ? "m-body-s" : "body-s"}
              sx={{
                backgroundColor: theme?.palette?.neuPalette?.hexTwentyNine,
                padding: "10px 0px",
              }}>
              {data?.transactionId || "Transaction ID"}
            </Typography>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {data?.orderType?.toLowerCase() === "hotel_booking" ? (
                <>{`Room Booking - ${data?.transactionDetails?.[0]?.name}`}</>
              ) : (
                <>{data?.orderType}</>
              )}
            </Typography>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: MobilePxToVw(14), fontWeight: 700 }}>
                  {CONSTANTS?.AMOUNT_SPENT}
                </Typography>
                <Typography variant={"m-body-s"} sx={{ paddingTop: "8px" }}>
                  {currencyPrettier(data?.gradTotal)?.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  sx={{ fontSize: MobilePxToVw(14), fontWeight: 700 }}>
                  {CONSTANTS?.DISCOUNTS}
                </Typography>
                <Typography
                  variant={"m-body-s"}
                  sx={{ paddingTop: "8px", textAlign: "center" }}>
                  -
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography
                  sx={{ fontSize: MobilePxToVw(14), fontWeight: 700 }}>
                  {CONSTANTS?.NEUCOINS_EARNED}
                </Typography>
                <Typography
                  variant={"m-body-s"}
                  sx={{ paddingTop: "8px", textAlign: "center" }}>
                  -
                </Typography>
              </Grid>
            </Grid>
          </Fragment>
        )
      })}
    </>
  )
}

export default TransactionSummaryMobile
