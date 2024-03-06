import { theme } from "../../../lib/theme"
import { Box, Divider, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { ChevronRight } from "@mui/icons-material"

export const MobileDropDownMenuBox = styled(Box)(() => ({
  zIndex: "1",
  top: "15.65vw",
  position: "fixed",
}))

export const ParentBox = styled(
  Box,
  transientProps,
)<{ $height: string }>(({ $height }) => ({
  // height: "62.33vw",   as per VD
  height: $height || "100vh",
  width: "100vw",
  overflowY: "auto",
  overscrollBehavior: "contain",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}))

export const StyledDivider = styled(Divider)(() => ({
  opacity: "90%",
  color: "#45443F",
  width: "80.3125vw",
  height: "0.15625vw",
  margin: "5.5vw 11.25vw 5.5vw  8.43vw",
}))

export const WhiteBgColorBox = styled(Box)(() => ({
  opacity: 0.97,
  background: theme?.palette?.ihclPalette?.hexOne,
}))

export const VerticalAlignmentBox = styled(
  Box,
  transientProps,
)<{ $isDropDown?: boolean }>(({ $isDropDown }) => ({
  display: "flex",
  flexDirection: $isDropDown ? "row" : "column",
  alignItems: $isDropDown ? "center" : "unset",
  gap: $isDropDown ? "0.938vw" : "unset",
}))

export const YellowBgColorBox = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  padding: "8.9vw 0vw",
  flexDirection: "column",
  color: theme?.palette?.ihclPalette?.hexOne,
  background: theme?.palette?.ihclPalette?.hexTwo,
  "@media (max-width: 640px)": {
    padding: "7.188vw 0vw",
  },
}))

export const ActionItemBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "3.90vw",
  alignItems: "center",
  justifyContent: "center",
}))

export const StyledChevronDown = styled(
  ChevronRight,
  transientProps,
)<{ $openRewards: boolean }>(({ $openRewards }) => ({
  height: "auto",
  width: "6.125vw",
  transition: " all 0.3s linear",
  transform: $openRewards ? "rotate(270deg)" : "rotate(90deg)",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const StyledChevronLeft = styled(ChevronRight)(() => ({
  height: "auto",
  width: "4.781vw",
  transform: "rotate(0deg)",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))
