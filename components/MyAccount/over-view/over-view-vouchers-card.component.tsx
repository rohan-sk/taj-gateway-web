import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { formatDateWithMON } from "../../../utils/getDate"
import {
  EXPIRE_DATE,
  M_EXPIRE_DATE,
  ROOM_IMG,
} from "../../forms/gift-card-form/constants"
import { theme } from "../../../lib/theme"


const OverViewVouchersCard = ({ accountOverView, voucherData }: any) => {
  const isMobile = useMobileCheck()
  const voucherImage = voucherData?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]
    ?.asset?._ref
    ? urlFor(
        voucherData?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
      )?.url()
    : ROOM_IMG

  return (
    <Grid
      display={"flex"}
      flexDirection={isMobile ? "column" : "row"}
      marginBottom={isMobile ? "0vw" : "1vw"}
      marginTop={isMobile ? "5.475vw" : DesktopPxToVw(24)}
      sx={{ border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}` }}
    >
      {voucherImage && (
        <Box
          component="img"
          src={voucherImage}
          width={isMobile ? MobilePxToVw(540) : DesktopPxToVw(194)}
          height={isMobile ? MobilePxToVw(323) : DesktopPxToVw(218)}
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
          borderTop: isMobile ? 0 : 1,
          borderColor: "#D7D5CF",
          paddingLeft: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
          paddingRight: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
          paddingTop: isMobile ? MobilePxToVw(30) : DesktopPxToVw(0),
        }}
      >
        {(voucherData?.title || accountOverView?.productName) && (
          <Typography
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            sx={{
              marginTop: isMobile ? MobilePxToVw(0) : DesktopPxToVw(20),
            }}
          >
            {isMobile
              ? voucherData?.title.toUpperCase()
                ? voucherData?.title.toUpperCase()
                : accountOverView?.productName.toUpperCase()
              : voucherData?.title.toUpperCase()
              ? voucherData?.title.substring(0, 28).trim().toUpperCase() + "..."
              : accountOverView?.productName?.substring(0, 28).trim().toUpperCase() + "..."}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "row" : "column",
            justifyContent: "space-between",
            marginTop: isMobile ? "4vw" : "0vw",
            marginBottom: isMobile ? "2.7vw" : "0vw",
          }}
        >
          {accountOverView?.validTill && (
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                marginBottom: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
                marginTop: isMobile ? MobilePxToVw(0) : DesktopPxToVw(4),
              }}
            >
              <Typography
                variant={isMobile ? "m-body-xs" : "body-xs"}
                sx={{
                  fontWeight: isMobile ? 700 : 300,
                  marginBottom: isMobile ? "2vw" : "0vw",
                }}
              >
                {isMobile ? M_EXPIRE_DATE : EXPIRE_DATE}&nbsp;
              </Typography>
              <Typography
                variant={isMobile ? "m-body-sl" : "body-xs"}
                sx={{ fontWeight: isMobile ? 300 : 700 }}
              >
                {formatDateWithMON(accountOverView?.validTill)}
              </Typography>
            </Box>
          )}
          {accountOverView?.isReedemable && (
            <RenderActionItem
              url={`${"/vouchers"}/${encodeURIComponent(
                accountOverView?.productName
              )}?promocode=${accountOverView?.extraData?.promocode}`}
              isActionButtonType={true}
              title={"REDEEM NOW"}
              buttonStyles={{
                backgroundColor: theme?.palette?.neuPalette?.hexTwo,
                color: theme?.palette?.neuPalette?.hexOne,
              }}
              navigationType={accountOverView?.urlType}
              variant={accountOverView?.variant || "light-contained"}
            />
          )}
        </Box>
      </Box>
    </Grid>
  )
}

export default observer(OverViewVouchersCard)
