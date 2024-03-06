import { Box } from "@mui/material"
import styled from "@emotion/styled"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const ImageBox = styled(Box,transientProps)<{$variant:boolean}>(({$variant}) => ({
  height: "auto",
  width: $variant ? "100%" : DesktopPxToVw(160),
  cursor: "pointer",
  marginBottom: DesktopPxToVw(16),
  "@media (max-width: 640px)": {
    width: "100%",
    height: "auto",
    marginBottom: MobilePxToVw(16),
  },
}))

export const CityImageBox = styled(Box)(() => ({
  height: "auto",
  width: DesktopPxToVw(206),
  cursor: "pointer",
  marginBottom: DesktopPxToVw(12),
  "@media (max-width: 640px)": {
    width: '100%',
    height: "auto",
    marginBottom: MobilePxToVw(12),
    maxWidth: MobilePxToVw(140)

  },
}))

export const CardBox = styled(Box)(() => ({
  alignItems: "center",
  flexDirection: "column",
  display: "flex !important ",
}))
