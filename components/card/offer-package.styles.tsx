import { Box, Grid, styled } from "@mui/material"
import { transientProps } from "../../utils/transientProps"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

export const ComponentContainer = styled(
  Box,
  transientProps,
)<{
  $packageOffer?: any
  $isMobile?: any
  $iconItems?: any
  $additionalInclusions?: any
}>(({ $packageOffer, $isMobile, $iconItems, $additionalInclusions }) => ({
  textAlign: $packageOffer ? "initial" : "center",
  padding: $additionalInclusions
    ? $isMobile
      ? `${MobilePxToVw(20)} 0vw ${MobilePxToVw(20)} 0vw`
      : `${DesktopPxToVw(20)} 0vw ${DesktopPxToVw(20)} 0vw`
    : "",
  paddingTop: $additionalInclusions
    ? DesktopPxToVw(20)
    : $isMobile
    ? $iconItems
      ? "none"
      : $packageOffer
      ? "0vw"
      : MobilePxToVw(90)
    : $packageOffer
    ? "0vw"
    : DesktopPxToVw(60),
  border: $packageOffer ? "none" : `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  "@media (max-width:640px)": {
    borderWidth: "0vw",
    border: $packageOffer ? "none" : $iconItems ? "none" : `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  },
}))

export const TitleContainer = styled(Box)(() => ({
  width: "100%",
  textAlign: "center",
  marginBottom: "2.604vw",
  "& .MuiTypography-root:nth-of-type(1)": {
    fontSize: "1.667vw",
    "@media (max-width:640px)": {
      fontSize: "5vw",
    },
  },
  "@media (max-width:640px)": {
    marginBottom: "6.563vw",
  },
}))

export const DescriptionTitleContainer = styled(Box)(() => ({
  padding: "0vw 1.406vw",
  display: "flex",
  flexDirection: "column",
  "@media (max-width:640px)": {
    padding: "0vw 4.688vw",
  },
}))
export const ImageCard = styled(
  Box,
  transientProps,
)<{ $webWidth: string }>(({ $webWidth }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: $webWidth,
  "@media (max-width:640px)": {
    width: "48.125vw",
  },
}))

export const ImageItem = styled(Box)(() => ({
  marginBottom: "1.563vw",
  "@media (max-width:640px)": {
    marginBottom: "4.688vw",
  },
}))

export const PackageInclusionsContainer = styled(
  Grid,
  transientProps,
)<{ $isDividerVariant: boolean; $itemsLength: number }>(({ $isDividerVariant, $itemsLength }) => ({
  padding: $itemsLength === 4 ? `0vw 1.979vw 3.125vw` : `0vw 6.406vw 3.125vw`,
  "@media (max-width:640px)": {
    padding: $isDividerVariant ? `0vw 4.219vw 14.063vw` : "0vw",
  },
}))

export const InclusionItem = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
}))
