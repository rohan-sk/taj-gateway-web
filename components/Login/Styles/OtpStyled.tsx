import { styled, Box, TextField, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import ClearIcon from "@mui/icons-material/Clear"
import { transientProps } from "../../../utils/transientProps"

interface OTP {
  isMobile?: boolean
}
export const TextFieldColor = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  height: DesktopPxToVw(80),
  width: DesktopPxToVw(60),
  margin: "0vw 0.621vw",
  textAlign: "center",
  "@media (max-width: 860px)": {
    width: "40px",
  },
  "@media (max-height: 400px)": {
    width: "3vw",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "&.MuiInputBase-root.MuiOutlinedInput-root": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme?.palette?.ihclPalette?.hexEleven,
    },
  },
  "& .MuiInputBase-root.MuiOutlinedInput-root": {
    textAlign: "center",
    borderRadius: "0px",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input": {
    padding: $isMobile ? "0px 0px" : "0.964vw 0.729vw",
    textAlign: "center",
    fontSize: "1.563vw",
    fontWeight: 300,
    "@media (max-width: 640px)": {
      width: "9.685vw",
      height: "12.500vw",
      fontSize: "3.750vw !important",
    },
  },
  "@media (max-width: 640px)": {
    width: "10.2vw",
    height: "13vw",
    marginRight: "2vw",
  },
}))

export const OtpBox = styled(Box)(() => ({
  "& > :not(style)": {
    margin: "1%",
    display: "flex",
  },
}))

export const ResendOtpWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  textAlign: "center",
}))

export const MainBoxContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const MainBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  width: DesktopPxToVw(701),
  height: DesktopPxToVw(440),
  boxShadow: `-4px 8px 12px rgba(0,0,0,0.1), -2px 10px 24px rgba(0,0,0,0.1)`,
  backgroundColor: theme?.palette?.background?.default,
  flexBasis: "fit-content",
  paddingBottom: "2.500vw",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
    fontFamily: "Inter",
    width: MobilePxToVw(540),
    height: MobilePxToVw(448),
    padding: "4vw 0vw 6.25vw 0vw",
  },
  "@media (max-height: 400px)": {
    width: "40.083333vw",
  },
}))

export const SubTitleWrapper = styled(Typography)(() => ({
  lineHeight: "3vw",
  marginBottom: "1vw",
  alignSelf: "center",
  "@media (max-width: 640px)": {
    lineHeight: "140%",
    fontFamily: "Inter",
    marginBottom: "5vw",
  },
}))

export const ResendOtpText = styled(Typography)(() => ({
  fontFamily: "Inter",
  textDecoration: "underline",
  cursor: "pointer",
  color: theme?.palette?.ihclPalette?.hexTwo,
  marginTop: "3vw",
  lineHeight: "2vw",
  "@media (max-width: 640px)": {
    lineHeight: "4vw",
    fontFamily: "Inter",
    marginTop: "5vw",
  },
}))

export const StyledClearIcon = styled(ClearIcon)(() => ({
  alignSelf: "end",
  cursor: "pointer",
  margin: "0.6vw 0.6vw 0vw 0vw",
  "@media (max-width: 640px)": {
    margin: "0vw",
  },
}))

export const ErrorMessages = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTen,
  marginBottom: "-2vw",
  marginTop: "2vw",
  "@media (max-width: 640px)": {
    marginTop: "0vw",
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "2vw 0vw",
}))

export const MobileTitle = styled(Typography)(() => ({
  lineHeight: "4.8vw",
  fontFamily: "Inter",
  fontSize: "3.438vw !important",
}))
export const MobileSubTitle = styled(Typography)(() => ({
  lineHeight: "4.8vw",
  fontFamily: "Inter",
}))
