import styled from "@emotion/styled"
import { Box, Grid, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const MasonryBoxWrapper = styled(Box)(({
  margin: "0 auto",
  width: "74vw",
  "@media(max-width:640px)": {
    width: "90vw"
    }
}))

export const MasonryGridWrapper = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean; $outerIndex: number }>(
  ({ $isMobile, $outerIndex }) => ({
    display: "inline-block",
    verticalAlign: "top",
    justifyContent: "space-between",
    textAlign: $outerIndex == 0 ? "right" : "left",
    paddingLeft: $outerIndex == 0 ? 0 : DesktopPxToVw(40),
    paddingTop:
      $outerIndex == 0
        ? DesktopPxToVw(120)
        : $isMobile
        ? "16vw"
        : DesktopPxToVw(40),
  })
)

export const LeftBoxItem = styled(Box)(({
  textAlign: 'right',
  width: `calc(100% * (0.55)`
}))

export const RightBoxItem = styled(Box)(({
  width: `calc(100% * (0.43)`,
}))
export const LeftMediaVideoItem = styled(Box)(({
  position: 'relative',
  margin: "auto",
  placeItems: "center"
}))

export const LeftCardItemTitle = styled(Typography)<{ $isMobile: boolean }>(
  ({ $isMobile }) => ({
    fontSize: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(32),
    color: "white",
    position: "absolute",
    textAlign: "center",
    padding: "2vw 2vw",
    bottom: "2vw",

    right: "0vw",
    "@media(max-width:640px)": {
      padding: "unset",
      bottom: "3.7vw",
      // right: "16vw"
    },
  })
)

export const RightMediaVideoItem = styled(Box)(({
  minWidth: "100%",
  margin: "auto"
}))

export const RightCardItemTitle = styled(Typography)(({
  color: "white",
  position: "absolute",
  textAlign: "center",
  padding: "2vw 5vw",
  bottom: "3vw",
  right: "0vw",
  "@media(max-width:640px)": {
    bottom: "14vw",
    right: "36vw"
    }
}))

