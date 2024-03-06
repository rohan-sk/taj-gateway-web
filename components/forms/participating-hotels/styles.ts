import { Box, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const InputFieldsBox = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(40),
  paddingTop: DesktopPxToVw(70),
  "@media (max-width: 640px)": {
    flexWrap: "wrap",
  },
  justifyContent: "center",
}))

export const SearchResultBox = styled(Box)(() => ({
  height: "30vh",
  backgroundColor: theme?.palette?.background?.paper,
  "@media (max-width: 640px)": {
    backgroundColor: theme?.palette?.background?.default,
  },
  overflowY: "scroll",
  paddingBottom: DesktopPxToVw(30),
}))

export const ContactBox = styled(Box)(() => ({
  textAlign: "center",
  "@media (max-width: 640px)": {
    paddingTop: MobilePxToVw(40),
  },
  paddingTop: DesktopPxToVw(40),
}))

export const ResultBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: DesktopPxToVw(30),
  "@media (max-width: 640px)": {
    width: "90%",
  },
}))
