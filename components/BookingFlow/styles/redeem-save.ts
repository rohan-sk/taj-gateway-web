import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material"

export const MainBox = styled(Box)(() => ({
  padding: "3.12vw",
  marginTop: "1.042vw",
  border: `0.05vw solid ${theme?.palette?.ihclPalette?.hexSixteen}`,

  "@media (max-width: 640px)": {
    margin: "0vw 7.8125vw 6.250vw 7.8125vw",
    padding: `${MobilePxToVw(40)} ${MobilePxToVw(32)} ${MobilePxToVw(60)}`,
  },
}))

export const InputTextField = styled(TextField)(() => ({
  width: "21.35vw !important",

  "& .MuiFormHelperText-root.Mui-error ": {
    "@media (max-width: 640px)": {
      fontSize: "1.5vw",
      color: theme?.palette?.ihclPalette?.hexTwentySeven,
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexEleven,
      fontWeight: 500,
      opacity: 1,
    },
    "@media (max-width: 640px)": {
      padding: 0,
      fontWeight: 300,
      fontSize: "3.438vw",
    },
  },

  "@media (max-width: 640px)": {
    height: "6.406vw",
    justifyContent: "flex-end",
    width: "49.063vw !important",
  },
}))

export const InputRedeem = styled(TextField)(() => ({
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 500,
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexEleven,
    },
  },
}))

export const NueCoinsRedeemInput: any = styled(TextField)(() => ({
  width: "6.40vw",
  "&.MuiFormControl-root.MuiTextField-root input": {
    paddingBottom: "1.2vw",
    fontSize: DesktopPxToVw(22),

    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(22),
    },
  },
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexEleven,
      fontWeight: 500,
      opacity: 1,
    },
  },

  "@media (max-width: 640px)": {
    width: "19.22vw",
  },
}))

export const GiftCardRedeemInput = styled(TextField)(() => ({
  width: "10.83vw",
  marginLeft: "1.04vw",
  "&.MuiFormControl-root.MuiTextField-root input": {
    "@media (max-width: 640px)": {
      fontWeight: 300,
      fontSize: "3.438vw",
      color: theme?.palette?.text?.primary,
    },
  },

  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },

  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 500,
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexEleven,
    },
  },

  "@media (max-width: 640px)": {
    width: "20.94vw",
  },
}))

export const InputsFieldBox = styled(
  Box,
  transientProps,
)<{ $textFieldErrors: boolean }>(({ $textFieldErrors }) => ({
  gap: "2.08vw",
  display: "flex",
  minHeight: "3.17vw",
  position: "relative",
  alignItems: "unset",
  "@media (max-width: 640px)": {
    flexWrap: "wrap",
    display: "flex",
    alignItems: $textFieldErrors ? "baseline" : "flex-end",
  },
}))
export const NueCoinsBox = styled(Box)(() => ({
  gap: "2.08vw",
  display: "flex",
  minHeight: "3.17vw",

  "@media (max-width: 640px)": {
    gap: "0vw",
    flexDirection: "column",
  },
}))

export const InputsFieldVerify = styled(Box)(() => ({
  gap: "1.04vw",
  display: "flex",
  marginTop: "1.04vw",
  alignItems: " flex-end",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    marginTop: "3.125vw",
  },
}))

export const InnerRoomAccordionDetail = styled(AccordionDetails)(() => ({
  padding: `${DesktopPxToVw(20)} 0 0 0`,
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,

  "@media (max-width: 640px)": {
    padding: "0vw",
    paddingTop: MobilePxToVw(10),
  },
}))

export const AnotherGiftCardWrapperContainer = styled(
  AccordionDetails,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: "unset",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,
}))

export const GetOtpButton = styled(Button)(() => ({
  width: "8.43vw ",

  "@media (max-width: 640px)": {
    marginTop: "1vw",
    width: "25.313vw",
  },
}))

export const RemoveLink = styled(
  Typography,
  transientProps,
)<{ $continueButtonClicked?: boolean }>(({ $continueButtonClicked }) => ({
  fontWeight: 400,
  fontSize: "0.93vw",
  fontFamily: "Inter",
  textDecoration: "underline",
  color: theme?.palette?.ihclPalette?.hexTwo,
  cursor: $continueButtonClicked ? "default" : "pointer",
}))

export const RedeemBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const RedeemedBalanceBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "1.04vw",
  alignItems: "center",
  padding: "1.04vw 1.30vw",
  justifyContent: "space-between",
  background: theme?.palette?.ihclPalette?.hexEighteen,

  "@media (max-width: 640px)": {
    marginTop: "3.125vw",
    padding: "3.125vw 3.906vw 2.813vw 3.906vw",
  },
}))

export const RedeemAllTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,

  "@media (max-width: 640px)": {
    marginLeft: "0vw",
  },
}))

export const NueCoinsRedeemBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  alignItems: "center",

  "@media (max-width: 640px)": {
    gap: "5.3vw",
    marginTop: "2.188vw",
  },
}))

export const RedeemCheckbox = styled(Checkbox)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  width: DesktopPxToVw(30),
  height: DesktopPxToVw(30),
  "&.Mui-checked": {
    color: theme?.palette?.ihclPalette?.hexTwo,
  },
  "&&:hover": {
    backgroundColor: "transparent",
  },
}))
export const ColorTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
}))
export const AccordionText = styled(AccordionSummary)(() => ({
  padding: "0vw",
  fontWeight: 700,
  minHeight: "0vw",
  fontSize: "1.145vw",
  maxHeight: "2.60vw",
  lineHeight: "1.56vw",
  fontFamily: "Inter",
  color: theme?.palette?.text?.primary,
  "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "0vw",
    maxHeight: "2.60vw",
    marginTop: "40px",
    "@media (max-width: 640px)": {
      minHeight: "7.97vw",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "0vw",
    whiteSpace: "nowrap",
  },

  "@media (max-width: 640px)": {
    minHeight: "7.97vw",
    padding: "1.5625vw 3.125vw",
  },
  margin: "0px 18px 10px 18px",
  paddingTop: "9px",
}))

export const RedeemAllBox = styled(Box)(() => ({
  display: "flex",
  width: "15.7812vw",
  alignContent: "center",
  alignItems: "flex-end",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    width: "44.219vw",
  },
}))

export const BalanceCheckBox = styled(Box)(() => ({
  display: "flex",
  width: "21.35vw",
  padding: "1.04vw 0.93vw",
  justifyContent: "space-between",
  background: theme.palette?.background?.paper,

  alignItems: "center",
  "@media (max-width: 640px)": {
    width: "100%",
    padding: "3.125vw 3.438vw 2.813vw 3.438vw",
  },
}))

export const DefaultColor = styled(Typography)(() => ({
  color: theme?.palette?.text?.primary,
}))

export const ErrorTypographyBox = styled(Box)(() => ({
  color: "red",
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    marginTop: "3.125vw",
  },
}))

export const CheckBalanceButton = styled(Button)(() => ({
  width: "14.63vw",

  "@media (max-width: 640px)": {
    width: "39.22vw",
    marginTop: "3.125vw",
  },
}))

export const GiftCardAmountWrapperContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? `${MobilePxToVw(20)} ${MobilePxToVw(25)} ${MobilePxToVw(18)}` : "1.04vw 1.30vw",
  background: theme?.palette?.ihclPalette?.hexEighteen,
  display: "flex",
  marginTop: $isMobile ? MobilePxToVw(20) : "1.04vw",
  justifyContent: "space-between",
  alignItems: "center",
}))

export const FormErrorsWrapperContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: $isMobile ? "column" : "row",
}))

export const InnerAccordion = styled(Accordion)(() => ({
  boxShadow: "unset",
  margin: "2.083vw 0vw 1.563vw 0vw",
  "&.Mui-expanded": {
    margin: "2.083vw 0vw 1.563vw 0vw !important",
    "@media (max-width: 640px)": { margin: "3.125vw 0vw !important" },
  },

  "@media (max-width: 640px)": { margin: "3.125vw 0vw" },
}))

export const InnerAccordionSummary = styled(AccordionSummary)(() => ({
  height: "2.604vw",
  padding: "0.469vw 0.938vw 0.521vw 0.938vw",
  "&.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
    padding: "0.469vw 0.938vw 0.521vw 0.938vw",
    maxHeight: "2.604vw",
    minHeight: "2.604vw",
    "@media (max-width: 640px)": {
      maxHeight: "7.969vw",
      minHeight: "7.969vw",
      padding: "1.563vw 3.125vw",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "0vw",
    whiteSpace: "nowrap",
  },

  "@media (max-width: 640px)": {
    height: "7.969vw",
    padding: "1.563vw 3.125vw",
  },
}))

export const GiftCardRedeemCheckBoxContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  padding: $isMobile ? "1.719vw 0" : "0.573vw 0",
}))

export const RedeemBoxWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  justifyContent: "space-between",
  marginTop: $isMobile ? `${MobilePxToVw(20)} !important` : DesktopPxToVw(20),
}))

export const ColorTypographyWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}))
