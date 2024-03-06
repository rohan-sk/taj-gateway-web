import { theme } from "../../../lib/theme"
import { Box, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const BoxWrapper = styled(Box)(() => ({
  top: 0,
  right: DesktopPxToVw(231),
  height: "100%",
  textAlign: "center",
  position: "absolute",
  padding: "10.208vw 3.125vw",
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  "@media (max-width: 640px)": {
    top: "-10vw",
    right: "unset",
    height: "unset",
    margin: "0 auto",
    position: "relative",
    padding: "10.313vw 4.375vw",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))

export const ImageWrapper: any = styled(Box)(() => ({
  width: "100%",
  objectFit: "contain",
  backgroundSize: "cover",
  backgroundPosition: "center",
}))

export const NudgeSignInWrapper = styled(Box)(() => ({
  textAlign: "left",
  "& .MuiFormControl-root.MuiTextField-root": {
    width: `${DesktopPxToVw(394)} !important`,

    "@media (max-width: 640px)": {
      width: "100% !important",
    },
  },
  "& .portableText span": {
    margin: 0,
    fontSize: `${DesktopPxToVw(18)} !important`,
  },
  "& .portableText blockquote": {
    margin: 0,
    whiteSpace: "nowrap",
    marginLeft: DesktopPxToVw(16),
    fontSize: `${DesktopPxToVw(18)} !important`,
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
  "@media (max-width: 640px)": {
    margin: 0,
    "& .portableText blockquote": {
      margin: 0,
      whiteSpace: "normal",
      marginLeft: MobilePxToVw(16),
      fontSize: `${MobilePxToVw(18)} !important`,
    },
    "& .portableText span": {
      fontSize: `${MobilePxToVw(18)} !important`,
    },
  },
}))

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}))
