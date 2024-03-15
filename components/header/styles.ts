import styled from "@emotion/styled"
import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { transientProps } from "../../utils/transientProps"
import { AppBar, Box, Grid, Typography } from "@mui/material"

export const RoomBoxStayContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  margin: "0.260vw 0vw",
  padding: "0vw 0.520vw",
  justifyContent: "space-between",
  backgroundColor: theme?.palette?.background?.paper,
}))

export const CountStayContainer = styled(Box)(() => ({
  padding: 1,
  width: "45%",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
}))

export const LogoBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $showHeaderStyles: boolean }>(({ $isMobile, $showHeaderStyles }) => ({
  display: "flex",
  justifyContent: "center",
  paddingLeft: $isMobile ? "3vw" : "3.4vw",
  padding: $showHeaderStyles ? "0.73vw 5.8vw 0.88vw 3.22vw" : "1.35vw 3.22vw 0vw 3.22vw",
}))

export const NavigationLinksBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingRight: "12.5vw",
}))

export const NavigationLinksPrimaryBox = styled(
  Box,
  transientProps,
)<{ $isScrollDowned?: boolean }>(({ $isScrollDowned }) => ({
  display: "flex",
  alignSelf: "center",
  marginTop: $isScrollDowned ? "0vw" : "1.094vw",
}))
export const NavigationLinksSecondaryBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const LoginLinkBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const ButtonBox = styled(
  Box,
  transientProps,
)<{ $isScrollDowned?: boolean }>(({ $isScrollDowned }) => ({
  gap: DesktopPxToVw(19),
  display: "flex",
  alignItems: "center",
  position: "relative",
  justifyContent: "flex-end",
  marginTop: $isScrollDowned ? "0vw" : "1vw",
}))

export const BookingMenuBox = styled(Box)(() => ({
  top: 75,
  right: "0",
  position: "absolute",
  width: "max-content",
}))

export const DropDownMenuBox = styled(Box)(() => ({
  top: "4.73vw",
  zIndex: "999",
  position: "fixed",
}))

export const MegaMenuTitlesContainer = styled(Grid)(() => ({
  opacity: "0.97",
  backgroundColor: theme?.palette?.background?.paper,
  borderLeft: `1px solid ${theme?.palette?.ihclPalette?.hexThirteen}`,
}))

export const MegaMenuTitleGrid = styled(Grid)(() => ({
  opacity: "0.97",
  backgroundColor: theme?.palette?.background?.paper,
}))

export const MegaMenuBorderGrid = styled(Grid)(() => ({
  width: "100%",
}))

export const MegaMenuContentBox = styled(Box)(() => ({
  gap: "4%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: DesktopPxToVw(333),
  height: "100%",
  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
}))

export const MegaMenuMoreContentBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  alignContent: "center",
  marginTop: "1.30vw",
}))

export const MegaMenuTitle = styled(Typography)(() => ({
  fontWeight: 400,
  cursor: "pointer",
  lineHeight: "150%",
  fontStyle: "normal",
  letterSpacing: "1.1px",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const TitleTypography = styled(Typography)(() => ({
  cursor: "pointer",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const StyledTitle = styled(
  Typography,
  transientProps,
)<{ $ShowCursor: boolean; $color: boolean }>(({ $ShowCursor, $color }) => ({
  cursor: $ShowCursor ? "pointer" : "default",
  letterSpacing: "0.03em",
  color: $color ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
  lineHeight: "125%",
}))

export const StyledProfileIcon: any = styled(Box)(() => ({
  width: "1.5vw",
  height: "1.5vw",
  cursor: "pointer",
}))

export const StyledAppBar: any = styled(
  AppBar,
  transientProps,
)<{ $isNavBarNotTransparent: boolean; $showDropDownMenu: boolean }>(
  ({ $isNavBarNotTransparent, $showDropDownMenu }) => ({
    display: "flex",
    "&.MuiAppBar-root": {
      boxShadow: "none",
      borderBottom:
        $isNavBarNotTransparent || $showDropDownMenu
          ? `1px solid ${theme?.palette?.ihclPalette?.hexTwentyFive}`
          : "unset",
      justifyContent: "center",
      minHeight: $showDropDownMenu ? "4.68vw" : "4.8vw",
    },
    background: $showDropDownMenu
      ? theme?.palette?.ihclPalette?.hexOne
      : "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(95, 95, 95, 0) 100%)",
  }),
)

export const BookingMenuButton = styled(Box)(() => ({
  marginLeft: "3.125vw",
}))

export const StyledTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexOne,
}))

export const LogOutButton = styled(Typography)(() => ({
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  color: theme?.palette?.ihclPalette?.hexThree,
  textAlign: "center",
  padding: "0.4vw",
  position: "absolute",
  width: "8vw",
  cursor: "pointer",
  marginTop: "1.8vw",
}))
