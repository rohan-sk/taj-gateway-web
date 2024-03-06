import { fonts, theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Box, styled, Select, Typography, InputLabel } from "@mui/material"

export const MainGridWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "1.563vw auto",
  maxWidth: DesktopPxToVw(1440),
  backgroundColor: theme?.palette?.background?.default,
  padding: "3.125vw 6.406vw 3.125vw 6.406vw",
  "@media (max-width:640px)": {
    marginTop: "10.516vw",
    maxWidth: "unset",
    width: "100%",
    padding: "0 12.813vw 14.063vw",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))

export const TitleTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  "@media (max-width:640px)": {
    marginBottom: "9.375vw",
  },
}))

export const KhazanaTitleTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  fontWeight: "300!important",
  marginBottom: "2.083vw",
  "@media (max-width:640px)": {
    marginBottom: "9.375vw",
  },
}))
export const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  margin: "1.4vw 0vw",
}))

export const ButtonWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  textAlign: "start",
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.5vw!important",
  },
}))
export const ReCaptchaErrorTypography = styled(Typography)(() => ({
  fontSize: `${DesktopPxToVw(18)}!important`,
  fontFamily: fonts?.body,
  fontWeight: 300,
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  "@media (max-width: 640px)": {
    fontSize: "2.5vw!important",
  },
}))

export const ReCaptchaStack = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: DesktopPxToVw(2),
  marginTop: DesktopPxToVw(55),
  "@media (max-width:640px)": {
    gap: MobilePxToVw(2),
    marginTop: MobilePxToVw(30),
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(24),
  fontWeight: 300,
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
    fontWeight: 300,
  },
}))

export const StyledSelect = styled(Select)(() => ({
  width: "19.229vw",
  marginRight: "2vw",
  fontFamily: "supreme",
  fontSize: DesktopPxToVw(24),
  "@media (max-width: 640px)": {
    width: "30vw",
    fontSize: "3.75vw",
  },
}))

export const CommonFieldWrapper = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  width: $mobile ? "100%" : "30.052vw",
}))

export const ColumnFlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const POITypography = styled(Typography)<{ $mobile: boolean }>(({ $mobile }) => ({
  marginBottom: $mobile ? "1.563vw" : "0.883vw",
}))

export const ProductsContainer = styled(
  Box,
  transientProps,
)<{ $mobile: boolean; $length: number | undefined }>(({ $mobile, $length }) => ({
  overflowY: $length && $length > 2 ? "auto" : "unset",
  maxHeight: $length && $length > 2 ? ($mobile ? "77.500vw" : "11.5vw") : "unset",
  display: "flex",
  flexDirection: "column",
  gap: $mobile ? "1.563vw" : "1.042vw",
  "@media (max-width:640px)": {
    "&::-webkit-scrollbar": {
      width: MobilePxToVw(4),
    },
  },
}))

export const LocationContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "2.083vw",
  marginBottom: "2.083vw",
  alignItems: "start",
  "@media (max-width:640px)": {
    display: "flex",
    gap: "5.469vw",
    flexDirection: "column",
    marginBottom: "5.469vw",
  },
}))
export const SingleRowWrapper = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  flexDirection: $mobile ? "column" : "row",
  gap: $mobile ? "5.469vw" : "2.083vw",
  justifyContent: $mobile ? "space-between" : "",
  marginBottom: $mobile ? "5.469vw" : "2.083vw",
}))

export const KhazanaFormWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  maxWidth: DesktopPxToVw(1440),
  backgroundColor: theme?.palette?.background?.default,
  padding: "3.125vw 6.406vw 3.125vw 6.406vw",
  "@media (max-width:640px)": {
    maxWidth: "unset",
    width: "100%",
    padding: "0 12.813vw 14.063vw",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))

export const FormOverFlowWrapper = styled(Box)(() => ({
  maxHeight: "100%",
  overflowY: "auto",
  width: "fit-content",
  boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
  margin: "1.563vw auto 0vw",
  "@media (max-width:640px)": {
    width: "100%",
    marginTop: "10.516vw",
    overflowY: "unset",
    boxShadow: `unset`,
  },
}))
