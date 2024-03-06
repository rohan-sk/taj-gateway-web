import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, Button, Grid, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const DetailsGridWrapper = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  padding: `${DesktopPxToVw(30)} 0`,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(20)} 0`,
    rowGap: MobilePxToVw(10),
    justifyContent: "space-between",
  },
}))

export const TextWrapper = styled(Typography)(() => ({
  opacity: 0.7,
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  textDecoration: "underline",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))

export const StyledTypography = styled(Typography)(() => ({
  fontWeight: 700,
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(10),
  },
}))

export const MarginTypography = styled(Typography)(() => ({
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(20),
  },
}))

export const ChildGridWrapper = styled(Grid)(() => ({
  border: "1px solid gray",
  // marginBottom: DesktopPxToVw(110),
  padding: `${DesktopPxToVw(40)} ${DesktopPxToVw(30)}`,
  "@media (max-width: 640px)": {
    border: "unset",
    marginBottom: MobilePxToVw(110),
    padding: `${MobilePxToVw(35)} ${MobilePxToVw(32)}`,
  },
}))

export const InputBoxWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "right",
  flexDirection: "column",
  width: "100%",
  cursor: "pointer",
}))

export const EditIcon: any = styled(Box)(() => ({
  width: "0.7vw",
  height: "0.7vw",
  marginRight: "0.521vw",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(14),
    height: MobilePxToVw(14),
    marginRight: "1.56vw",
  },
}))
export const ActionsTypography: any = styled(Typography)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    columnGap: MobilePxToVw(10),
  },
}))

export const StyledButton = styled(
  Button,
  transientProps,
)<{ $active: boolean }>(({ $active }) => ({
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  backgroundColor: $active ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
  color: $active ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexTwo,
  "&:hover": {
    backgroundColor: $active ? theme?.palette?.ihclPalette?.hexTwo : theme?.palette?.ihclPalette?.hexOne,
    color: $active ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexTwo,
  },
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": {
    whiteSpace: "unset",
    height: "11.094vw",
    padding: "3.125vw 2.578vw",
  },
}))

export const StyledEdit = styled(
  Typography,
  transientProps,
)<{ $withoutEdit: boolean }>(({ $withoutEdit }) => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
  color: !$withoutEdit ? theme?.palette?.ihclPalette?.hexTwo : "gray",
  cursor: $withoutEdit ? "not-allowed" : "pointer",
}))

export const SaveTypography = styled(
  Typography,
  transientProps,
)<{ $errorMessage: boolean }>(({ $errorMessage }) => ({
  display: "flex",
  justifyContent: "right",
  color: $errorMessage ? "gray" : "none",
  cursor: $errorMessage ? "not-allowed" : "pointer",
}))

export const EditTextTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "right",
  alignItems: "center",
}))
