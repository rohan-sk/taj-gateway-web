import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, Divider, Stack, styled, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const BackDropBox = styled(Box)(() => ({
  position: "fixed",
  width: "100vw",
  height: "100vh",
  top: 0,
  left: 0,
  backgroundColor: `${theme.palette.neuPalette.hexFourteen}a1`,
  zIndex: 9,
}))
export const ParentBox = styled(Box)(() => ({
  zIndex: 9,
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}))

export const MainBox = styled(Box)(() => ({
  minWidth: DesktopPxToVw(457),
  minHeight: DesktopPxToVw(341),
  padding: "1.563vw 2.083vw",
  background: theme.palette.background.default,
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  "@media (max-width: 640px)": {
    minWidth: MobilePxToVw(457),
    minHeight: MobilePxToVw(341),
    padding: `${MobilePxToVw(30)} ${MobilePxToVw(40)}`,
  },
}))

export const CloseImage: any = styled(Box)(() => ({
  top: "1vw",
  right: "1.5vw",
  width: "0.938vw",
  height: "0.938vw",
  cursor: "pointer",
  position: "absolute",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(18),
    height: MobilePxToVw(18),
    top: MobilePxToVw(22),
    right: MobilePxToVw(25),
  },
}))

export const LargeDivider = styled(Divider)(() => ({
  width: "100%",
  height: "0.05vw",
  marginTop: DesktopPxToVw(12),
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(12),
  },
}))

export const ImageParentBox = styled(Box)(() => ({
  gap: "0.990vw",
  display: "flex",
  alignItems: "center",
}))

export const VouchersNumberBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: DesktopPxToVw(8),
}))

export const ItineraryNumTypography = styled(Typography)(() => ({
  opacity: "0.6",
  lineHeight: "140%",
}))

export const LinkTypography = styled(Typography)(() => ({
  cursor: "pointer",
  lineHeight: "140%",
  color: theme.palette.neuPalette.hexTwo,
}))

export const ContactDetailStack = styled(Stack)(() => ({
  marginTop: "1vw",
  columnGap: "0.5vw",
  flexDirection: "row",
}))

export const StyledImage: any = styled(Box)(() => ({
  width: "5.938vw",
  height: "4.167vw",
  margin: "0.521vw 0vw",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(114),
    height: MobilePxToVw(80),
    marginTop: MobilePxToVw(10),
    marginBottom: MobilePxToVw(10),
    marginRight: MobilePxToVw(20),
  },
}))

export const ShareImage: any = styled(Box)(() => ({
  width: "3.125vw",
  height: "3.125vw",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(60),
    height: MobilePxToVw(60),
  },
}))

export const ShareDetailsStack = styled(Stack)(() => ({
  flexDirection: "row",
  columnGap: "1.042vw",
  alignItems: "center",
  "@media (max-width: 640px)": {
    columnGap: MobilePxToVw(20),
  },
}))

export const ImageContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(19) : DesktopPxToVw(19),
}))

export const PurchaseImageWrapper: any = styled(Box)(() => ({
  width: "5.938vw",
  height: "4.167vw",
  margin: `${DesktopPxToVw(10)} 0vw`,
  "@media (max-width: 640px)": {
    width: MobilePxToVw(114),
    height: MobilePxToVw(80),
    margin: `${MobilePxToVw(10)} 0vw`,
  },
}))

export const PurchaseContentWrapper: any = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: $isMobile ? MobilePxToVw(8) : DesktopPxToVw(8),
}))
