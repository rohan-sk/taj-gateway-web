import { theme } from "../../../lib/theme"
import { Box, Typography, styled } from "@mui/material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  margin: "0 auto",
  textAlign: "center",
  maxWidth: "49.271vw",
  padding: "6.667vw 14.5vw 5.938vw 14.5vw",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  "@media (max-width: 640px)": {
    maxWidth: "100%",
    height: "100vh",
    padding: `0 ${MobilePxToVw(118)}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}))

export const TitleTypography = styled(Typography)(() => ({
  lineHeight: "110%",
  marginBottom: "1.146vw",
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(20),
  },
}))

export const SubscriptionMainBox = styled(Box)(() => ({
  margin: "0 auto",
  textAlign: "center",
  width: "62.5vw",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  "@media (max-width: 640px)": {
    width: "100%",
    boxShadow: "unset",
    height: "100%",
    padding: "0vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}))
