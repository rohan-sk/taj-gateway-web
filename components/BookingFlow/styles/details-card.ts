import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { SquareSharp } from "@mui/icons-material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  Box,
  Stack,
  Button,
  Divider,
  MenuItem,
  Typography,
  Collapse,
} from "@mui/material"

export const ContainerBox = styled(Box)(() => ({
  display: "flex",
  padding: "1.04vw",
  marginBottom: DesktopPxToVw(40),
  boxShadow: " 0px 10px 24px rgba(0, 0, 0, 0.1)",

  "@media (max-width: 640px)": {
    padding: "3.125vw 3.125vw 0vw 3.125vw",
    margin: "0vw 7.8125vw 9.375vw 7.8125vw",
  },
}))

export const CardMainBox = styled(Box)(() => ({
  display: "flex",
  width: "33.45vw",
  marginBottom: "1.04vw",
  padding: "1.04vw 0.73vw 1.04vw 1.04vw",
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexSixteen}`,

  "@media (max-width: 640px)": {
    width: "100%",
    padding: "3.125vw",
    flexDirection: "column",
    marginBottom: "3.125vw",
  },
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
}))

export const ImgTitleBox = styled(Box)(() => ({
  display: "flex",

  "@media (max-width: 640px)": {
    alignItems: "center",
    flexDirection: "column",
  },
}))

export const DescriptionTypo = styled(Typography)(() => ({
  marginTop: "0.45vw",

  "@media (max-width: 640px)": {
    marginTop: "1.5625vw",
  },
}))

export const BulletPointBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "0.45vw",
  alignItems: "flex-start",
}))

export const CtaLabelTypo: any = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  lineHeight: "140%",
  marginTop: "0.5vw",

  "@media (max-width: 640px)": {
    marginTop: "1.5625vw",
  },
}))

export const StyledBulletIcon = styled(SquareSharp)(() => ({
  width: DesktopPxToVw(8),
  height: DesktopPxToVw(8),
  marginRight: DesktopPxToVw(6),
  transform: "rotate(45deg)",
  color: theme?.palette?.neuPalette?.hexTwo,
  "@media (max-width: 640px)": {
    width: "1.25vw",
    height: "1.25vw",
    marginRight: "1.35vw",
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  width: "0.052vw",
  margin: "0vw 0.78vw 0vw 1.5625vw",
  background: theme?.palette?.neuPalette?.hexSixteen,

  "@media (max-width: 640px)": {
    width: "100%",
    height: "0.15625vw",
    margin: "3.125vw 0vw 3.4375vw 0vw",
  },
}))

export const VerticalDivider = styled(Divider)(() => ({
  "@media (max-width: 640px)": {
    height: "100%",
    width: "0.15625vw",
    margin: "0vw 3.125vw",
    background: theme?.palette?.neuPalette?.hexSixteen,
  },
}))

export const RateBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

export const MemberRateLabelTypo = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: "0.73vw",
  lineHeight: "140%",
  whiteSpace: "nowrap",
  letterSpacing: "0.04em",

  "@media (max-width: 640px)": {
    fontSize: "2.5vw",
    lineHeight: "140%",
    marginBottom: "0.4688vw",
  },
}))

export const ColumnListBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const ButtonsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",

  "@media (max-width: 640px)": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
}))

export const RateSelectButton = styled(Button)(() => ({
  "@media (max-width: 640px)": {
    height: "7.65vw",
    width: "32.8125vw",
    marginTop: "1.5625vw",
    whiteSpace: "nowrap",
  },
}))

export const ImageMainBox = styled(Box)(() => ({
  cursor: "pointer",
  position: "relative",

  "@media (max-width: 640px)": {
    height: "62.5vw",
    width: "78.125vw",
  },
}))

export const ImageBox = styled(Box)(() => ({
  width: "18.22vw",
  height: "14.58vw",

  "@media (max-width: 640px)": {
    height: "62.5vw",
    width: "78.125vw",
  },
}))

export const GalleryButtonBox = styled(Box)(() => ({
  right: 0,
  bottom: 0,
  padding: "0.520vw",
  position: "absolute",

  "@media (max-width: 640px)": {
    padding: "0vw",
    width: "9.375vw",
    height: "9.375vw",
    margin: "1.5625vw",
    pointerEvents: "all",
  },
}))

export const TitleBox = styled(Box)(() => ({
  width: "33.45vw",
  color: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    width: "100%",
    marginBottom: "3.125vw",
    marginTop: "5.9375vw",
  },
}))

export const LoadMoreLessMainBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  padding: "0.68vw",
  marginTop: "0.520vw",
  justifyContent: "center",
  color: theme?.palette?.neuPalette?.hexTwo,
  background: theme?.palette?.neuPalette?.hexEighteen,

  "@media (max-width: 640px)": {
    padding: "2.03125vw",
    margin: "1.5625vw 0vw 3.125vw 0vw",
  },
}))

export const LoadMoreLessInnerBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
}))

export const PolicyCheckBox = styled(Box)(() => ({
  display: "flex",
  gap: "1.04vw",
  marginTop: "1.04vw",
  marginLeft: "0.41vw",
  alignItems: "center",
}))

export const SubTitleBox = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: "0.52vw",
  marginTop: $isMobile ? MobilePxToVw(10) : "0.52vw",
  marginBottom: DesktopPxToVw(50),
  width: $isMobile ? "unset" : "63%",
}))

export const MainTopBox = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  padding: "3.12vw 3.12vw 2.08vw 3.12vw",
  marginTop: "2.08vw",

  "@media (max-width: 640px)": {
    margin: "0vw 7.8125vw 6.250vw 7.8125vw",
    padding: `${MobilePxToVw(40)} ${MobilePxToVw(32)} ${MobilePxToVw(30)}`,
  },
}))

export const HighlightsBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "1.5625vw",
  justifyContent: "space-between",
}))

export const FacilitiesStack = styled(Stack)(() => ({
  gap: "0.365vw",
  flexDirection: "row",
  alignItems: "baseline",
  margin: "0.833vw 0vw",

  "@media (max-width: 640px)": {
    gap: "1.094vw",
    margin: "3vw 0vw",
  },
}))

export const StyledMenuItem = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(22),
  padding: `${DesktopPxToVw(6)} ${DesktopPxToVw(16)}`,
  cursor: "pointer",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(22),
    padding: `${MobilePxToVw(6)} ${MobilePxToVw(16)}`,
  },
}))

export const StyledLabel = styled(Typography)(() => ({
  fontSize: DesktopPxToVw(22),
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(22),
  },
}))

export const SelectStack = styled(Stack)(() => ({
  flexDirection: "row",
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
}))

export const StyledCollapse = styled(Collapse)(() => ({
  position: "absolute",
  top: "100%",
  zIndex: 99,
  minWidth: "100%",
}))

export const StyledBox = styled(Box)(() => ({
  maxHeight: 300,
  backgroundColor: theme?.palette?.background?.default,
  borderRadius: "0",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
}))

export const StarImage: any = styled(Box)(() => ({
  width: "0.885vw",
  height: "0.885vw",

  "@media (max-width: 640px)": {
    width: "2.5vw",
    height: "2.5vw",
  },
}))

export const HighlightPointStack = styled(Stack)(() => ({
  gap: "0.781vw",
  flexDirection: "row",
  alignItems: "center",

  "@media (max-width: 640px)": {
    gap: "1.094vw",
  },
}))

export const RateDetailsTypography = styled(Typography)(() => ({
  fontWeight: 400,
  textDecoration: "underline",
  cursor: "pointer",
}))

export const SearchLabelStack: any = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "1.042vw",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    margin: "0vw 7.813vw 2vw 7.813vw",
  },
}))

export const TaxCheckBoxStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
}))

export const CancellationPolicyDivider = styled(
  Divider,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  margin: $isMobile
    ? `${MobilePxToVw(20)} 0vw`
    : `${DesktopPxToVw(20)} 0vw 0vw`,
  backgroundColor: theme?.palette?.neuPalette?.hexTwelve,
}))

export const RoomDetailsBox = styled(Box)(() => ({
  padding: "3.125vw",
  marginBottom: "4.688vw",
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexSixteen}`,
}))

export const TabHighlightDivider = styled(Divider)(() => ({
  width: "100%",
  height: "1.5px",
  marginTop: "2.188vw",
  background: theme?.palette?.neuPalette?.hexTwo,
}))

export const TabsStack = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "space-around",
}))

export const HighlightsImage: any = styled(Box)(() => ({
  width: "2.813vw",
  height: "2.813vw",
  marginRight: "2.5vw",
}))

export const AmenitiesStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  marginTop: "3.125vw",
}))

export const AmenitiesImage: any = styled(Box)(() => ({
  width: "6.250vw",
  height: "6.250vw",
  marginBottom: "2.5vw",
}))

export const AmenitiesItemStack = styled(Stack)(() => ({
  textAlign: "center",
  alignItems: "center",
}))

export const GalleryImage: any = styled(Box)(() => ({
  width: "4.688vw",
  height: "4.688vw",
  marginRight: "0.781vw",
}))

export const FullWidthDivider = styled(Divider)(() => ({
  width: "100%",
  height: "1px",
  mb: "2.188vw",
  background: theme?.palette?.neuPalette.hexSixteen,
}))
