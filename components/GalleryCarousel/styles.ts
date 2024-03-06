import { theme } from "../../lib/theme"
import { Box, Stack, styled, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

export const ParentCarouselImageBox = styled(Box)(() => ({
    maxWidth: DesktopPxToVw(1440),
  maxHeight: DesktopPxToVw(710),
  margin: "0 auto",
  "@media (max-width: 640px)": {
    maxWidth: MobilePxToVw(600),
    maxHeight: MobilePxToVw(440),
  },
}))

export const SelectedImageBox = styled(Box)(() => ({
  maxWidth: DesktopPxToVw(1440),
  maxHeight: "59.2vh",
  margin: "0 auto",
  "@media (max-width: 640px)": {
    maxWidth: MobilePxToVw(600),
  },
}))

export const TitleBox = styled(Box)(() => ({
  bottom: "0.73vw",
  position: "absolute",
}))

export const TitleTypo = styled(Typography)(() => ({
  lineHeight: "140%",
  letterSpacing: "-0.05em",
  color: theme?.palette?.neuPalette?.hexOne,
}))

export const ChildCarouselMainBox = styled(Box)(() => ({
  margin: "0 auto",
  marginTop: "0.672vw",
}))
export const ChildCarouselBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: DesktopPxToVw(10),
  
}))

export const ChildCarouselImageBox = styled(Box)(() => ({
  paddingRight: "0.521vw",
  "@media (max-width: 640px)": {
    paddingRight: "1.8750vw",
  },
}))

export const CarouselPaginationTypo = styled(Typography)(() => ({
  display: "flex",
  marginTop: DesktopPxToVw(24),
  justifyContent: "center",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(22),
  },
}))

export const TitleTypoDataBox = styled(Box)(() => ({
  bottom: "2.083vw",
  textAlign: "center",
  position: "relative",
}))

export const ContentBox = styled(Stack)(() => ({
  position: "absolute",
  width: "100%",
  alignItems: "center",
  bottom: "0vw",
  minHeight: "9.219vw",
  background: "linear-gradient(180deg, rgba(81, 81, 81, 0.00) 0%, rgba(0, 0, 0, 0.70) 70.64%)",
}))
export const TitleTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexOne,
  marginBlockEnd: "1.146vw",
  marginTop: "4.688vw",
  textAlign: "center",
  padding: "0vw 3vw"
}))
