import { theme } from "../../../lib/theme"
import { ChevronRight } from "@mui/icons-material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Button, Divider, Grid, Stack, styled, Typography } from "@mui/material"

export const DividerForBorder = styled(Divider)(() => ({
  background: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.2,
}))

export const ItemLogoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1.2%",
}))

export const DividerForCenterGrid = styled(Divider)(() => ({
  width: DesktopPxToVw(0),
  background: theme?.palette?.neuPalette?.hexSixteen,
  opacity: 0.2,
  margin: "0 !important",
}))

export const SeparateVerticalDivider = styled(Divider)(() => ({
  width: DesktopPxToVw(0),
  background: theme?.palette?.neuPalette?.hexSixteen,
  opacity: 0.2,
  height: "80%",
  marginTop: "0.938vw",
}))

export const VisibleDataTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  paddingLeft: DesktopPxToVw(30),
  cursor: "pointer",
}))

export const VisibleDataForFacilitiesTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  paddingLeft: DesktopPxToVw(45),
  cursor: "pointer",
}))

export const PrimaryActionTitleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  gap: "0.521vw",
}))

export const PrimaryActionTitleTypography = styled(Typography)(() => ({
  paddingLeft: "0.5%",
}))

export const TitleTypography = styled(Typography)(() => ({
  paddingBottom: "0.52vw",
  color: theme?.palette?.neuPalette?.hexTwelve,
}))

export const PrimaryActionImageBox = styled(Box)(() => ({
  textAlign: "center",
  paddingTop: DesktopPxToVw(20),
  cursor: "pointer",
}))

export const SideDividerForItem = styled(Divider)(() => ({
  background: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.2,
}))

export const TotalItemTitleBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1.2%",
}))

export const MenuItemTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  paddingLeft: DesktopPxToVw(30),
  cursor: "pointer",
}))

export const SideVerticalDividerForItem = styled(Divider)(() => ({
  width: DesktopPxToVw(0),
  background: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.2,
  margin: "0 !important",
}))

export const BlocksPortableTextBox = styled(
  Box,
  transientProps
)<{ $Padding: boolean }>(({ $Padding }) => ({
  margin: "0",
}))

export const PrimaryActionContentBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  paddingTop: DesktopPxToVw(40),
}))

export const ItemLogoImageComponentBox = styled(
  Box,
  transientProps
)<{ $showDividerForBorder: boolean }>(({ $showDividerForBorder }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.2%",
  paddingLeft: "0.52vw",
  paddingTop: $showDividerForBorder ? "2.083vw" : "0.89vw",
}))

export const DividerForBelowBorder = styled(Divider)(() => ({
  background: theme?.palette?.neuPalette?.hexSeventeen,
  opacity: 0.2,
  marginTop: "2.083vw",
}))

export const BottomDivider = styled(Divider)(() => ({
  opacity: 0.2,
  width: "100%",
  marginTop: "1.05vw",
  background: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const ItemTitleTypography = styled(
  Typography,
  transientProps
)<{ $isHotelInfo: boolean }>(({ $isHotelInfo }) => ({
  fontSize: $isHotelInfo ? "0.729vw" : "1.25vw",
  paddingBottom: "0.52vw",
  color: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    fontSize: $isHotelInfo ? "2.188vw" : "3.75vw",
    paddingBottom: MobilePxToVw(14),
  },
}))

export const HotelInfoTitleTypography = styled(Typography)(() => ({
  lineHeight: "150%",
  fontWeight: 400,
  color: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    fontWeight: 400,
    marginBottom: "1.563vw",
  },
}))


export const CellContainer = styled(Box)(() => ({
  display: "unset",
  justifyContent: "unset",
  "@media (max-width:640px)": {
    display: "flex",
    justifyContent: "space-between",
    gap: "1.563vw",
  },
}))

export const ItemLogoWrapperContainer = styled(
  Box,
  transientProps
)<{ $isItemCount: boolean; $showDividerForBorder: boolean }>(
  ({ $isItemCount, $showDividerForBorder }) => ({
    gap: "1.2%",
    display: "flex",
    alignItems: "center",
    paddingBottom: $isItemCount ? DesktopPxToVw(10) : 0,
    paddingTop: $isItemCount ? 0 : $showDividerForBorder ? "1.081vw" : "0.89vw",
  })
)

export const ItemTitleWrapperTypography = styled(Typography)(() => ({
  fontWeight: 400,
  color: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    fontWeight: 700,
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
}))

export const LargeHorizontalDivider = styled(Divider)(() => ({
  opacity: 0.2,
  marginTop: `${DesktopPxToVw(20)}`,
  backgroundColor: theme?.palette?.neuPalette?.hexSixteen,
}))

export const ItemTitleWrapperContainer = styled(Box)(() => ({
  gap: DesktopPxToVw(14),
  display: "flex",
  alignItems: "flex-start",
  paddingBottom: DesktopPxToVw(10),
  "@media (max-width:640px)": {
    gap: `${MobilePxToVw(14)}`,
  },
}))

export const LargeVerticalDivider = styled(Divider)(() => ({
  opacity: 0.2,
  marginRight: `${DesktopPxToVw(20)}`,
  backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
}))
export const ListMoreTypographyWrapper = styled(Box)(() => ({
  marginBlockStart: " 0vw",
  marginBlockEnd: "0vw",
  marginInlineStart: "0vw",
  marginInlineEnd: "0vw",
  paddingInlineStart: "2.083vw",
}))

export const ListBox = styled(Box)(() => ({
  marginBlockEnd: "0vw",
  marginBlockStart: "0vw",
  paddingInlineStart: "2.083vw",
}))

export const BottomBorderGrid = styled(Grid)(() => ({
  border: ` 1px solid ${theme?.palette?.neuPalette?.hexFive}20`,
  padding: "2.083vw 0 1.046vw",
  borderWidth: "0px 0px 1px 0px",
  "@media (max-width:640px)": {
    borderBottomWidth: "0px !important",
  },
}))

export const MobileLogoBoxWrapper = styled(Box)(() => ({
  "@media (max-width:640px)": {
    "&>div": {
      gap: "3.125vw",
      flexDirection: "column",
      textAlign: "center",
    },
  },
}))

export const StyledLoadMoreButton = styled(Button)(() => ({
  borderColor: `${theme?.palette?.neuPalette?.hexTwo}!important`,
  color: `${theme?.palette?.neuPalette?.hexTwo}`,
  width: "37.188vw",
  padding: "2.5vw 0vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.563vw",
  "@media (max-width:640px)": {
    marginTop: MobilePxToVw(25),
    width: "auto",
    gap: "1.563vw",
    fontSize: MobilePxToVw(18),
    letterSpacing: "0.1em",
  },
}))

export const StyledChevronDown = styled(
  ChevronRight,
  transientProps
)<{ $more: boolean }>(({ $more }) => ({
  height: "auto",
  width: "1.2vw",
  transform: $more ? "rotate(90deg)" : "rotate(-90deg)",
  color: theme?.palette?.neuPalette?.hexTwo,
  "@media (max-width: 640px)": {
    width: "3vw",
  },
}))

export const MobileViewMoreButton = styled(Button)(() => ({
  textTransform: "uppercase",
}))

export const MobileViewMoreButtonWrapper = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
}))

export const Diamond = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  transform: "rotate(45deg)",
  width: DesktopPxToVw(8),
  height: DesktopPxToVw(8),
  "@media (max-width:640)": {
    width: MobilePxToVw(8),
    height: MobilePxToVw(8),
  },
}))

export const FacilityCell = styled(Box, transientProps)<{ $isMobile: boolean, $isBorderRight: boolean, $isBorderBottom: boolean }>(({ $isMobile, $isBorderRight, $isBorderBottom }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}20`,
  borderWidth: `0px ${$isBorderRight && !$isMobile ? '1px' : "0px"} ${$isBorderBottom && $isMobile ? '1px' : '0px'} 0px`,
  paddingBottom: $isMobile ? '2.5vw' : '0vw',
  marginBottom: $isMobile ? '2.5vw' : '0vw',
}))

export const FacilityTitle = styled(Typography)(() => ({
  lineHeight: "150%",
  fontWeight: 400,
  color: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    fontWeight: 400,

  },
}))

export const FacilityTitleContainer = styled(Box)(() => ({
  marginBottom: DesktopPxToVw(10),
  '@media (max-width:640px)': {
    marginBottom: "1.563vw"
  }
}))

export const ActionsStack = styled(Stack)(() => ({
  width: '100%',
  flexDirection: "row",
  justifyContent: "center",
  gap: MobilePxToVw(20),
}))