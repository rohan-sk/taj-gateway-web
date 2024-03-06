import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Stack, styled, TextField, FormControl, InputLabel, TextareaAutosize } from "@mui/material"

export const InputTextField = styled(TextField)<{ $width?: string }>(({ $width }) => ({
  width: $width ?? "23.6vw",
  "&  .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(20),
    fontWeight: 400,
    fontFamily: "Inter",
  },

  "& .MuiInput-input": {
    fontWeight: 300,
    lineHeight: "150%",
    fontStyle: "normal",
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },

  input: {
    "&::placeholder": {
      opacity: 0.9,
      fontWeight: 300,
      fontStyle: "normal",
      lineHeight: "1.875vw",
      fontFamily: "Inter",
      textOverflow: "ellipsis !important",
      color: theme?.palette?.text?.primary,
      fontSize: DesktopPxToVw(24),
    },
  },

  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },

  "@media (max-width: 640px)": {
    width: "100%",
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(16),
    },

    "& .MuiInput-input": {
      fontSize: MobilePxToVw(24),
    },

    input: {
      "&::placeholder": {
        opacity: 0.99,
        fontWeight: 300,
        lineHeight: "150%",
        fontSize: MobilePxToVw(24),
        textOverflow: "ellipsis !important",
      },
    },
  },
}))

export const MainBox = styled(Box)(() => ({
  padding: "2.08vw 3.125vw",
  border: `0.05vw solid ${theme?.palette?.neuPalette?.hexSixteen}`,

  "@media (max-width: 640px)": {
    padding: "5vw",
    margin: "0vw 7.8125vw 10vw 7.8125vw",
  },
}))

export const TitleBox = styled(Box)(() => ({
  marginBottom: DesktopPxToVw(25),

  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(10),
  },
}))

export const AutoSizeTextArea = styled(
  TextareaAutosize,
  transientProps,
)<{ $isDisabled?: boolean }>(({ $isDisabled }) => ({
  width: "100%",
  border: "none",
  fontWeight: 300,
  lineHeight: "150%",
  fontSize: "1.250vw",
  fontFamily: "Inter",
  borderBottom: `0.05vw solid ${theme?.palette?.text?.primary}`,

  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },

  "&::placeholder": {
    opacity: 1,
    fontWeight: 400,
    fontFamily: "Inter",
    textOverflow: "ellipsis !important",
    color: $isDisabled ? "rgb(0 0 0 / 38%)" : theme?.palette?.text?.primary,
  },

  "&:hover": {
    borderBottom: `0.05vw solid ${theme?.palette?.text?.primary}`,
  },

  "&:focus": {
    outline: "none",
  },

  "@media (max-width: 640px)": {
    opacity: 1,
    fontSize: "3.75vw",
    paddingTop: MobilePxToVw(30),

    "&::placeholder": {
      fontWeight: 300,
      lineHeight: "150%",
    },
  },
}))

export const UserDetailsBox = styled(Box)(() => ({
  display: "flex",
  gap: "2.083vw",
  paddingTop: "1.56vw",

  "@media (max-width: 640px)": {
    gap: "6.25vw",
    paddingTop: MobilePxToVw(40),
    flexDirection: "column",
  },
}))

export const MemberShipFormControl = styled(FormControl)(() => ({
  width: "23.6vw",
  marginTop: "0.6vw",

  "@media (max-width: 640px)": {
    width: "100%",
    marginTop: "6.25vw",
  },
}))

export const CreateOrderButtonBox = styled(Box)(() => ({
  display: "flex",
  width: "9.375vw",
  margin: "0 auto",
  flexDirection: "column",
  justifyContent: "center",
  paddingTop: DesktopPxToVw(20),

  "@media (max-width: 640px)": {
    width: "28.125vw",
    paddingBottom: "5vw",
  },
}))

export const DropDownCheckBox = styled(Box)(() => ({
  display: "flex",
  gap: "0.93vw",
  alignItems: "center",
}))

export const MembershipTypeInputLabel = styled(InputLabel)(() => ({
  fontSize: "1.25vw",
  marginBottom: "0.26vw",
  color: theme?.palette?.text?.primary,

  "@media (max-width: 640px)": {
    fontSize: "3.75vw",
    top: MobilePxToVw(-11),
  },
}))

export const TermsAndConditionStack = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $errorFieldsMessage: boolean }>(({ $isMobile, $errorFieldsMessage }) => ({
  gap: $isMobile ? MobilePxToVw(10) : "0.521vw",
  marginTop: $isMobile
    ? $errorFieldsMessage
      ? MobilePxToVw(16)
      : MobilePxToVw(40)
    : $errorFieldsMessage
    ? DesktopPxToVw(16)
    : "2.083vw",
}))

export const VoucherDetailsStack = styled(Stack)(() => ({
  flexDirection: "row",
  gap: DesktopPxToVw(40),
  marginTop: DesktopPxToVw(30),

  "@media (max-width: 640px)": {
    gap: MobilePxToVw(40),
    flexDirection: "column",
    marginTop: MobilePxToVw(40),
  },
}))
