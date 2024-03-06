import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const TitleBox = styled(Box)(() => ({
  margin: "auto",
  width: "fit-content",
  paddingBottom: "2.55vw",
}))

export const SixCardCommonCarouselContentBox = styled(Box)(() => ({
  marginTop: "0.6vw",
  padding: '0vw 12.5vw',
  '@media (max-width:640px)': {
    padding: '0vw'
  }
}))
export const MobileCarousalStylesWrapper = styled(
  Box,
  transientProps
)<{ $inactiveDotWidth: string; $backGroundColor?: any }>(
  ({ $inactiveDotWidth, $backGroundColor }) => ({
    "@media (max-width:640px)": {
      "& .slick-dots": {
        marginTop: MobilePxToVw(30),
        position: "static",
        bottom: "0vw !important",
        display: "flex",
        alignItems: "center",
        "& button": {
          width: "100%",
          height: "0.3125vw",
          background: `${theme?.palette?.neuPalette?.hexTwelve}50 !important`,
        },
        "& li": {
          margin: "0vw",
          width: `${$inactiveDotWidth} !important`,
          background: `${theme?.palette?.neuPalette?.hexTwelve}50 !important`,
        },
        "& .slick-active": {
          width: "12.5vw !important",
          borderRadius: "10px",
          "& button": {
            background: `${$backGroundColor} !important`,
          },
        },
      },
    },
  })
)
