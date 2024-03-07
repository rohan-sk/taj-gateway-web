import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import RemoveIcon from "@mui/icons-material/Remove"
import { Divider, Paper, Typography, Box, Stack, TextField } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const GuestRoomBox = styled(Paper)(() => ({
  display: "flex",
  height: "3.68vw",
  alignItems: "center",
  "&.MuiPaper-root": { borderRadius: "10em" },
}))
export const PriceMaskContainer = styled(Paper)(() => ({
  display: "flex",
  height: "3.68vw",
  alignItems: "center",
  gap: DesktopPxToVw(22),
  "&.MuiPaper-root": { borderRadius: "0vw" },
}))
export const PriceMaskFieldsContainer = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  padding: `${DesktopPxToVw(19)} 0vw ${DesktopPxToVw(15)} ${DesktopPxToVw(27)}`,
  gap: DesktopPxToVw(20),
}))

export const SearchOptionContainer = styled(Stack)(() => ({
  "&:hover": {
    background: "rgba(69, 68, 63, 0.1)",
  },
}))

export const PriceMaskDivider = styled(Divider)(() => ({
  opacity: "0.4",
  width: "0.05vw",
  background: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    margin: "0vw 3.594vw 0vw 4.219vw",
  },
}))

export const PriceMaskTextField = styled(TextField)(() => ({
  color: theme?.palette?.text?.primary,
  width: DesktopPxToVw(315),
  fontSize: "1.55vw",
  "& .Mui-disabled": {
    "-webkit-text-fill-color": "#45443F !important",
  },
}))
export const PriceMaskDateContainer = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  width: `17vw`,
  justifyContent: "space-around",
}))
export const SpecialCodeContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: DesktopPxToVw(16),
  width: DesktopPxToVw(175),
}))
export const SpecialCodeTypography = styled(Typography)(() => ({
  cursor: "pointer",
  overflow: "hidden",
  minWidth: "7.552vw",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  WebkitBoxOrient: "vertical",
}))
export const SearchOptionTypography = styled(Typography)(() => ({
  cursor: "pointer",
  padding: "0.5vw 0vw",
}))
export const DateTypography = styled(
  Typography,
  transientProps,
)<{ $Date: any }>(({ $Date }) => ({
  letterSpacing: "-0.05rem",
  color: $Date ? "unset" : theme.palette.ihclPalette.hexTwelve,

  whiteSpace: "nowrap",
}))
export const ResultSectionSeparator = styled(Divider)(() => ({
  margin: `${DesktopPxToVw(8)} 0`,
}))

export const VerticalDivider = styled(Divider)(() => ({
  opacity: "0.4",
  width: "0.1vw",
  margin: "0.9vw 1.145vw 0.9vw 1.35vw",
  background: theme?.palette?.secondary?.main,

  "@media (max-width: 640px)": {
    margin: "0vw 3.594vw 0vw 4.219vw",
  },
}))

export const RoomBoxContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: theme?.palette?.text?.primary,
  padding: "0.625vw 0.93vw 0.67vw 0.73vw",
  backgroundColor: theme?.palette?.background?.paper,

  "@media (max-width: 640px)": {
    padding: "2vw 3vw 2.156vw 2.328vw",
  },
}))

export const CountContainer = styled(Box)(() => ({
  width: "50%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const ConfirmContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}))

export const AddRoomTypography = styled(Typography)(() => ({
  cursor: "pointer",
  marginTop: "1.83vw",

  "@media (max-width: 640px)": {
    marginTop: "7.8vw",
  },
}))

export const GuestRoomPopUpBox = styled(Box)(() => ({
  zIndex: 10,
  width: "30vw",
  cursor: "auto",
  overflowY: "scroll",
  maxHeight: "25vw",
  position: "absolute",
  padding: "2.18vw 2.08vw 1.82vw 2.08vw",
  boxShadow: " -2px 3px 22px -8px rgba(0,0,0,0.75)",
  mozBoxShadow: "-2px 3px 22px -8px rgba(0,0,0,0.75)",
  backgroundColor: theme?.palette?.background?.default,
  webkitBoxShadow: "-2px 3px 22px -8px rgba(0,0,0,0.75)",
  "@media (max-width: 640px)": {
    zIndex: 0,
    width: "84vw",
    maxHeight: "30vh",
    position: "relative",
    padding: "unset",
    boxShadow: "none",
    overflowY: "scroll",
  },
}))

export const CloseIconBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "1.04vw 0vw 0.520vw 0vw",

  "@media (max-width: 640px)": {
    margin: "3.750vw 0vw 3.594vw 0vw",
  },
}))

export const GuestDetailsBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
}))

export const GuestDetailsListBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: theme?.palette?.text?.primary,
}))

export const CloseIconStyle = styled(CloseIcon)(() => ({
  cursor: "pointer",
  color: theme?.palette?.ihclPalette?.hexEleven,
}))

export const RemoveIconStyle = styled(RemoveIcon)(() => ({
  color: theme?.palette?.ihclPalette?.hexEleven,
}))
export const AddIconStyle = styled(AddIcon)(() => ({
  color: theme?.palette?.ihclPalette?.hexEleven,
}))

export const NeedMoreRoomBox = styled(Box)(() => ({
  marginTop: "1.83vw",
  textAlign: "center",

  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(53),
  },
}))

export const CloseTypography = styled(Typography)(() => ({
  top: "1vw",
  right: "1.5vw",
  fontWeight: "700",
  cursor: "pointer",
  position: "absolute",
  textDecoration: "underline",
  color: theme?.palette?.ihclPalette?.hexTwo,
}))
