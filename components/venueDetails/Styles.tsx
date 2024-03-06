import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { transientProps } from "../../utils/transientProps"
import { Button, styled, Typography, Box, Grid, Stack } from "@mui/material"

export const BoxWrapper = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  margin: "auto",
  padding: DesktopPxToVw(40),
}))

export const StyledText = styled(Typography)(() => ({
  overflow: "auto",
  maxWidth: "100%",
  margin: "0px",
}))

export const Title = styled(Typography)(() => ({
  letterSpacing: "-0.05em",
  textTransform: "uppercase",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  marginBottom: "2%",
}))

export const SubTitle = styled(Typography)(() => ({
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: "18px",
  lineHeight: "25px",
  color: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const StyledTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  marginBottom: "2%",
}))

export const HighlightBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(16),
}))

export const BulletItemContainer = styled(Box)(() => ({
  maxHeight: DesktopPxToVw(347),
  overflow: "scroll",
}))
export const CustomBullet = styled(Typography)(() => ({
  fontSize: "1.4vw",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  marginTop: "-0.28vw",
}))

export const UnOrderedList = styled("ul")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "0% 3%",
  margin: "0px 0px 20px 0px",
}))

export const BoxContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: "30px",
}))

export const ButtonsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginTop: DesktopPxToVw(40),
}))

export const VenuItemGrid = styled(Grid)(() => ({
  margin: `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} 0vw ${DesktopPxToVw(40)}`,
}))
export const PopUpGrid = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? "100%" : DesktopPxToVw(1194),
  height: $isMobile ? "100%" : DesktopPxToVw(760),
  transform: $isMobile ? "unset" : "translateX(30%)",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
}))

export const RoomDetailsModalContainer = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  maxHeight: $isMobile ? "100%" : "90vh",
  overflowY: $isMobile ? "auto" : "initial",
  width: $isMobile ? "100%" : DesktopPxToVw(1194),
  margin: "0 auto",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
}))
export const RequestButton = styled(Button)(() => ({
  fontWeight: 700,
  width: "250px",
  lineHeight: "1.30vw",
  fontFamily: "Inter",
  textAlign: "center",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  "&:hover": {
    color: theme?.palette?.neuPalette?.hexOne,
    background: theme?.palette?.neuPalette?.hexTwo,
  },
}))

export const GalleryButton = styled(Button)(() => ({
  fontWeight: 700,
  width: "13.15vw",
  lineHeight: "1.30vw",
  fontFamily: "Inter",
  textAlign: "center",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
  justifyContent: "space-between",
  padding: "0% 1%",
}))
