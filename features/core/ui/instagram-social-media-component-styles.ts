import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { ExpandMore } from "@mui/icons-material"
import { Box, Button, Grid } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const SocialMediaCardWrapper = styled(Box)(() => ({
  // cursor: "pointer",
  position: "relative",
}))

export const LoadMoreWrapper = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: $isMobile ? MobilePxToVw(90) : DesktopPxToVw(80),
}))

export const MobileLoadMoreWrapper = styled(Button)(() => ({
  "& .MuiButton-endIcon": {
    margin: 0,
    marginLeft: MobilePxToVw(10),
  },
  padding: `${MobilePxToVw(17)} ${MobilePxToVw(44)} ${MobilePxToVw(
    15
  )} ${MobilePxToVw(47)} !important`,
}))

export const MobileExpandMoreWrapper = styled(ExpandMore)(() => ({
  width: "auto",
  height: "3.875vw",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const WebLoadMoreWrapper = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
}))

export const WebExpandMoreWrapper = styled(ExpandMore)(() => ({
  width: "auto",
  height: "1.2vw",
  color: theme?.palette?.neuPalette?.hexTwo,
}))
