import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Box, Divider, Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
}))

export const LogoTitleBox = styled(Box)(() => ({
  width: "16vw",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}))

export const VerticalDivider = styled(Divider)(() => ({
  height: "9.8vw",
  width: "0.0521vw",
  margin: "0vw 1.041vw",
  background: theme?.palette?.neuPalette?.hexOne,
}))

export const LogoImageContentBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))

export const CardWithTitleTabsTypography = styled(Typography)(() => ({
  textAlign: "center",
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const CardWithImageTitleTabsComponentBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: $isMobile ? MobilePxToVw(25) : DesktopPxToVw(50),
}))

export const SingleContentTitleBox = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "17.188vw",
  "@media (max-width: 640px)": {
    width: "34.063vw",
  },
}))

export const ImageAssetWrapperBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

export const CardWithTitleTabsWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $isCustomOddIndex: boolean | undefined }>(
  ({ $isMobile, $isCustomOddIndex }) => ({
    display: "flex",
    justifyContent: "center",
    width: $isMobile ? ($isCustomOddIndex ? "100%" : "31.094vw") : "13.19vw",
    "@media(max-width:640px)": {
      paddingTop: "4.688vw",
    },
  })
)

export const CardWithDescriptionTabsWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $isCustomOddIndex: boolean | undefined }>(
  ({ $isMobile, $isCustomOddIndex }) => ({
    textAlign: "center",
    width: $isMobile ? ($isCustomOddIndex ? "100%" : "31.094vw") : "unset",
  })
)
