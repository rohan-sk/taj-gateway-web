import { Box, Grid, styled } from "@mui/material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const StyledGridItem = styled(Grid)(() => ({
  display: "flex",
  marginTop: "3.125vw", // this gap is took from global template.
  justifyContent: "center",

  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(90), //calculated and used this value
  },
}))

export const ParameterMapContentBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  flexDirection: "row",
  paddingBottom: "3.125vw",
  justifyContent: "flex-end",
  "@media (max-width: 640px)": {
    display: "block",
  },
}))

export const ParameterMapWrappingContentMSiteBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "column",
  margin: "0vw 0vw 2.5vw 0vw",
  "@media(max-width:640px)": {
    margin: "-2vw 0vw 6.719vw 0vw",
  },
}))

export const ParameterMapWrappingContentWebSiteBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  flexDirection: "row",
  paddingBottom: "3.125vw",
}))

export const LoadMoreStyledGridWrapper = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: $isMobile ? MobilePxToVw(66) : "3.125vw",
}))
