import { AppBar, Box, styled, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const EpicureStyledAppBar: any = styled(AppBar)(() => ({
  display: "flex",
  "&.MuiAppBar-root": {
    boxShadow: "none",
    borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexTwentyFive}`,
    justifyContent: "center",
    minHeight: "4.8vw",
    zIndex: 1200,
  },
  background: theme?.palette?.ihclPalette?.hexOne,
}))

export const EpicureHeaderLogoBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  padding: "0.73vw 5.8vw 0.88vw 12.4vw",
  "@media (max-width: 640px)": {
    padding: "0.73vw 5.8vw 0.88vw 4.8vw",
  },
}))

export const ImageBoxWrapper: any = styled(Box)(() => ({
  cursor: "pointer",
  objectFit: "contain",
}))

export const ButtonBox = styled(Box)(() => ({
  gap: DesktopPxToVw(19),
  display: "flex",
  alignItems: "center",
  position: "relative",
  justifyContent: "flex-end",
  marginTop: "0vw",
}))

export const StyledTitle = styled(Typography)(() => ({
  cursor: "pointer",
  letterSpacing: "0.03em",
  color: theme?.palette?.ihclPalette?.hexTwo,
  lineHeight: "125%",
}))

export const StyledProfileIcon: any = styled(Box)(() => ({
  width: "1.5vw",
  height: "1.5vw",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(35),
    height: MobilePxToVw(35),
  },
}))

export const ParentBoxHead: any = styled(Box)(() => ({
  position: "relative",
  width: "100%",
}))

export const BoxAppBarPurchase: any = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 640px)": {
    padding: "1.875vw",
  },
}))

export const StyledTitleEpicure = styled(Typography)(() => ({
  cursor: "pointer",
  letterSpacing: "0.03em",
  color: theme?.palette?.ihclPalette?.hexTwo,
  lineHeight: "125%",
  gap: DesktopPxToVw(10),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "12.6vw",
  "@media (max-width: 640px)": {
    marginRight: "6vw",
  },
}))

export const TypographyTitleEpicure: any = styled(Typography)(() => ({
  fontWeight: 400,
  letterSpacing: "0.03em",
  marginRight: "12.6vw",
  cursor: "pointer",
  color: theme?.palette?.ihclPalette?.hexTwo,
  "@media (max-width: 640px)": {
    marginRight: "6vw",
  },
}))
