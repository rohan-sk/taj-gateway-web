import styled from "@emotion/styled"
import { Box, Grid } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const TwoActionComponentGrid = styled(Grid)(() => ({
  padding: "0vw 3.75vw",
  columnGap: DesktopPxToVw(30),
  rowGap: DesktopPxToVw(40),
  justifyContent: "center",
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(30),
    padding: `0 ${MobilePxToVw(30)}`,
  },
}))

export const AlternateAllLinksWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  gap: $isMobile ? "3.125vw" : "1.042vw",
  flexDirection: $isMobile ? "row-reverse" : "row",
  marginTop: $isMobile ? MobilePxToVw(10) : "unset",
}))
