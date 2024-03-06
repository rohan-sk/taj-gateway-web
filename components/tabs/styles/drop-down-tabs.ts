import { theme } from "../../../lib/theme"
import { KeyboardArrowDown } from "@mui/icons-material"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"
import { Box, Divider, styled, Typography } from "@mui/material"

export const MainBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  position: "relative",
  padding: `${MobilePxToVw(27)} 0 ${MobilePxToVw(27)} ${MobilePxToVw(51)}`,
}))

export const TabsBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  position: "relative",
}))

export const HorizontalDivider = styled(Divider)(() => ({
  height: "0.15vw",
  backgroundColor: theme?.palette?.ihclPalette?.hexSeven,
}))

export const VerticalDivider = styled(Divider)(() => ({
  opacity: "0.4",
  height: "3.75vw",
  margin: `0 ${MobilePxToVw(18)}`,
  backgroundColor: theme?.palette?.text?.primary,
}))

export const StyledDownArrow = styled(
  KeyboardArrowDown,
  transientProps,
)<{ $isMoreAvailable: boolean }>(({ $isMoreAvailable }) => ({
  color: theme?.palette?.text?.primary,
  marginLeft: $isMoreAvailable ? "2.5vw" : "",
}))

export const TabBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))

export const TabTitleTypo = styled(Typography)(() => ({
  lineHeight: "150%",
  whiteSpace: "nowrap",
  letterSpacing: "-0.03em",
  color: theme?.palette?.text?.primary,
  "@media(max-width:640px)": {
    letterSpacing: "0.156vw",
  },
}))

export const DropDownMainBox = styled(Box)(() => ({
  top: "15vw",
  right: "10vw",
  position: "absolute",
  background: theme?.palette?.ihclPalette?.hexSeven,
}))

export const DropDownItemBox = styled(Box)(() => ({
  display: "flex",
  margin: "0.5vw 1vw",
  flexDirection: "column",
  borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
}))

export const DropdownTitleText = styled(Typography)(() => ({
  fontSize: "7.5vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  padding: "11.72vw 0",
  color: theme?.palette?.ihclPalette?.hexTwo,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(42)} 0`,
  },
}))

export const ModelContentWrapperBox = styled(Box)(() => ({
  padding: "0 9.69vw",
}))

export const LogoBox = styled(Box)(() => ({
  position: "absolute",
  top: MobilePxToVw(32),
  zIndex: 4,
}))

export const GiftCardDropdownTitleText = styled(Typography)(() => ({
  fontSize: "7.5vw",
  padding: `${MobilePxToVw(71)} 0`,
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const HotelTabTitleNameTypo = styled(Typography)(() => ({
  fontSize: "7.5vw",
  fontFamily: theme?.palette?.font?.primaryFontFamily,
  letterSpacing: "-0.05em",
  padding: `${MobilePxToVw(75)} 0 ${MobilePxToVw(67)}`,
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const SingleContentAsTitleWrapper = styled(
  Typography,
  transientProps,
)<{ $activeTabIndex: boolean }>(({ $activeTabIndex }) => ({
  "> span": {
    display: "flex",
    lineHeight: "150%",
    fontStyle: "normal",
    textAlign: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
    justifyContent: "center",
    fontSize: MobilePxToVw(20),
    letterSpacing: MobilePxToVw(1),
    fontWeight: $activeTabIndex ? "700" : "300",
  },
}))

export const GiftCardDropdownModelWrapper = styled(Box)(() => ({
  overflowY: "auto",
  padding: `0 ${MobilePxToVw(71)} 0 ${MobilePxToVw(55)}`,
  "&::-webkit-scrollbar": {
    display: "none",
  },
}))
