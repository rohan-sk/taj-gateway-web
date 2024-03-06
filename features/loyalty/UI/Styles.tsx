import { Box, Button, Stack, styled, TextField } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const BoxWrapper = styled(Box)(() => ({
  background: theme?.palette?.background?.default,
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  padding: "2.865vw 6.14vw",
  width: DesktopPxToVw(1440),
  maxHeight: "100%",
  margin: "1.042vw auto 0vw",
  overflowY: "scroll",
  textAlign: "center",
  "@media (max-width:640px)": {
    background: theme?.palette?.background?.paper,
    margin: "10.094vw 10.813vw 12.344vw 12.813vw",
    padding: "0vw ",
    overflow: "unset",
    "&::-webkit-scrollbar": {
      width: "0em",
    },
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
  },
}))

export const FieldsContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: `${DesktopPxToVw(380)} ${DesktopPxToVw(380)} ${DesktopPxToVw(360)}`,
  gap: DesktopPxToVw(40),
  alignItems: "start",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: MobilePxToVw(35),
    marginBottom: MobilePxToVw(35),
  },
}))

export const LocationContainer = styled(Stack)(() => ({
  width: "100%",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(35),
  },
}))

export const DateContainer = styled(Stack)(() => ({
  flexDirection: "row",
  gap: DesktopPxToVw(40),
  marginBottom: DesktopPxToVw(35),
  "@media(max-width:640px)": {
    flexDirection: "column",
    marginBottom: MobilePxToVw(35),
    gap: MobilePxToVw(35),
  },
}))

export const DateBox = styled(Box)(() => ({
  width: DesktopPxToVw(371),
  cursor: "pointer",
  flexShrink: 0,
  "@media (max-width:640px)": {
    width: "100%",
  },
}))
export const GuestStack = styled(Stack)(() => ({
  width: "100%",
  flexDirection: "row",
  gap: DesktopPxToVw(40),
  "@media (max-width:640px)": {
    gap: MobilePxToVw(20),
  },
}))

export const TextFieldsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: DesktopPxToVw(40),
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    flexDirection: "column",
    gap: "0px",
    alignItems: "unset",
    justifyContent: "center",
  },
}))

export const TentativeDateContainer = styled(
  Box,
  transientProps,
)<{ $isOpen?: boolean; $isDouble?: boolean }>(({ $isOpen, $isDouble }) => ({
  minWidth: DesktopPxToVw(371),
  "@media (max-width:640px)": {
    minHeight: "6.25vw",
    margin: "0 0 6.25vw",
    minWidth: "100%",
  },

  "& .styledText": {
    width: "100%",
    height: "100%",
    zIndex: "0",
  },
  "& .react-calendar": {
    marginTop: "1.3vw",
    "@media (max-width:640px)": {
      marginTop: "3vw !important",
    },
  },
  "& .react-date-picker": {
    height: "100%",
    alignItems: "center",
  },
  "& .react-date-picker__calendar--closed": {
    display: $isOpen ? "block" : "none",
    width: "fit-content",
    zIndex: 999,
    inset: `${DesktopPxToVw(30)} 0 0 0 !important`,
    transform: $isDouble ? "translateX(-20%)" : "unset",
    "@media (max-width: 640px)": {
      inset: `${MobilePxToVw(30)} 0 0 0 !important`,
    },
  },
}))
export const CheckboxBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  width: "50%",
  "@media (max-width:640px)": {
    width: "100%",
    marginBottom: "5.469vw",
  },
}))
export const MainBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
}))

export const DropBox = styled(Box)(() => ({
  display: "flex",
  width: "100%",
}))
export const StyledField = styled(TextField)(() => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontWeight: 500,
      opacity: 1,
    },
  },
}))

export const EnquiryButton = styled(Button)(() => ({
  fontWeight: 700,
  width: "165px",
  lineHeight: "1.30vw",
  fontFamily: "supreme",
  textAlign: "center",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  "&:hover": {
    color: theme?.palette?.background?.default,
    background: theme?.palette?.ihclPalette?.hexTwo,
  },
  margin: "4% 0%",
}))

export const MobileNumberField = styled(TextField)(() => ({
  width: "30%",
  color: "black",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "black",
      fontWeight: 500,
      opacity: 1,
    },
  },
}))

export const CountryDropDownMobileWrapper = styled(Box)(() => ({
  width: "inherit",
  "@media (max-width:640px)": {
    width: "100%",
  },
}))

export const EpicureFormGroup = styled(Box)(() => ({
  maxHeight: "80vh",
  overflowY: "auto",
  width: DesktopPxToVw(1280),
  margin: "0.521vw auto 0vw ",
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
  "@media (max-width:640px)": {
    width: "100%",
    boxShadow: "unset",
    maxHeight: "100vh",
  },
}))
