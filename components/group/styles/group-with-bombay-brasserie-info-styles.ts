import { Box, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const GroupWithBombayBrasserieInfoImageWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

export const GroupWithBombayBrasserieInfoImageContainer = styled(Box)(() => ({ display: "flex", width: "fit-content" }))

// for all files styles related to Brasserie components

export const GroupWidthBrasserieRestaurantsInfoContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  rowGap: DesktopPxToVw(35),
  columnGap: DesktopPxToVw(30),
  flexDirection: $isMobile ? "column" : "row",
}))

export const CardWithBoldTextHyperlinkComponentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  rowGap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
  columnGap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(60),
}))

export const CardWithBoldTextHyperlinkSingleContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& div": {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    rowGap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
    columnGap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(60),
  },
}))

export const CardWithTextHyperLinkSingleContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  "& span": {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    rowGap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(40),
    columnGap: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(60),
  },
}))
