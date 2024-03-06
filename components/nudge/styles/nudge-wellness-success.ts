import { theme } from "../../../lib/theme"
import { Box, Grid, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainGrid = styled(Grid)(() => ({
  margin: "0 auto",
  maxWidth: "49.271vw",
  padding: "5.521vw 15.625vw",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme?.palette?.background?.default,
  "@media (max-width: 640px)": {
    maxWidth: "100%",
    width: "100%",
    height: "100%",
    marginTop: "44.481vw",
    boxShadow: "none",
    overFlow: "unset",
  },
}))

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
}))

export const NudgeBlogCommentDialogWrapper = styled(BoxWrapper)(() => ({
  margin: "0 auto",
  width: "52.5vw",
  height: "20vw",
  padding: "0vw 10vw",
  gap: "2.08vw",
  justifyContent: "center",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  "@media (max-width: 640px)": {
    width: "100%",
    height: "5vw",
    margin: "auto",
    padding: "6.25vw",
    gap: "6.25vw",
  },
}))

export const StyledTypography = styled(Typography)(() => ({
  lineHeight: "140%",
  marginBottom: DesktopPxToVw(32),
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(22),
  },
}))
