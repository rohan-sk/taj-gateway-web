import { Box, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const MainGridWrapper = styled(Grid)<{ $marginProp?: boolean }>(({ $marginProp }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: $marginProp ? "1vw" : "2vw",
}))
export const CountrySelect = styled(Select)(() => ({
  width: "23.594vw",
  marginRight: "2vw",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "40vw",
    fontSize: "3.75vw",
    lineHeight: "4.8vw",
  },
}))

export const CityWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end", // added flex-end alignment added in add address in personal details.
  margin: "1vw 0vw 1vw 2vw",
}))

export const StateSelect = styled(Select)(() => ({
  width: "23.594vw",
  fontFamily: "Inter",
  fontSize: "1.35vw",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "40vw",
    fontSize: "3.75vw",
    lineHeight: "4.8vw",
  },
}))

export const CitySelect = styled(Select)(() => ({
  width: "23.594vw",
  fontFamily: "Inter",
  fontSize: "1.35vw",
  marginRight: "2vw",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "40vw",
    fontSize: "3.75vw",
    lineHeight: "4.8vw",
  },
}))
export const GridWrapper = styled(Grid)(() => ({
  // commented this code, it's disturbing the modal
  // alignSelf: "center",
  overflow: "auto",
  // width: "100%",
  // height: "100%",
}))

export const MainGrid: any = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
}))

export const DateTextField = styled(TextField)(() => ({
  width: "23.594vw",
  fontSize: DesktopPxToVw(24),
  marginRight: "2vw",
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "@media (max-width: 640px)": {
    width: "39.844vw",
    fontSize: "3.75vw",
    height: "4vw",
  },
  "& .MuiIconButton-root": {
    right: "1vw",
  },
  "& .Mui-error": {
    color: `${theme?.palette?.text?.primary} !important`,
  },
  "& .Mui-error:before": {
    borderBottomColor: `${theme?.palette?.text?.primary} !important`,
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      height: "5vw",
    },
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.ihclPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const FormErrors = styled(FormHelperText)(() => ({
  fontFamily: "Inter",
  color: `${theme?.palette?.ihclPalette?.hexThirtyTwo}!important`,
  fontSize: DesktopPxToVw(18),
  "@media (max-width: 640px)": {
    fontSize: "2.75vw",
  },
}))

export const MenuItems = styled(MenuItem)(() => ({
  fontFamily: "Inter",
  fontSize: "1.35vw",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw !important",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexEleven,
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: "1.35vw",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw !important",
    lineHeight: "4.8vw",
  },
}))

export const MobileRegisterCalenderWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 39.844vw)",
  gap: "4.688vw",
  marginTop: MobilePxToVw(30),
  "@media(max-width:640px)": {
    display: "flex",
    width: MobilePxToVw(540),
    flexDirection: "row",
    gap: MobilePxToVw(30),
    marginTop: "unset",
  },
}))

export const RegisterCalenderWrapper = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 23.594vw)",
  gap: "2.083vw",
  marginTop: DesktopPxToVw(40),
}))

export const MobileStayDateContainer = styled(
  Box,
  transientProps,
)<{ $isOpen?: boolean; $isDouble?: any }>(({ $isOpen, $isDouble }) => ({
  minWidth: DesktopPxToVw(371),
  "@media (max-width:640px)": {
    minHeight: "6.25vw",
    minWidth: "100%",
  },

  "& .styledText": {
    width: "100%",
    height: "100%",
    zIndex: "0",
  },
  "& .react-calendar": {
    marginTop: "0.6vw",
    "@media (max-width:640px)": {
      marginTop: "6.8vw !important",
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

export const InputMobileTextField = styled(TextField)(() => ({
  width: "100%",
  height: "2.083vw",
  input: {
    padding: "0vw",
  },
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& input": {
    "&::placeholder": {
      opacity: 1,
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0.1vw)",
    "@media (max-width:640px)": {
      transform: "scale(1) translate(0, 0.4vw)",
    },
    "& .Mui-error": {
      color: theme?.palette?.ihclPalette?.hexTwentyOne,
    },
  },
  "&, & input": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "7.25vw",
    },
  },
  "& input, & label": {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter !important",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: `${DesktopPxToVw(18)}!important`,
    "@media (max-width:640px)": {
      fontSize: "2.8vw!important",
    },
  },
  "label + .MuiInputBase-root.MuiInput-root ": {
    marginTop: "0vw",
  },
  "& .MuiInputLabel-shrink.MuiInputLabel-standard": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },
  "& .MuiInputLabel-shrink": {
    transform: "scale(0.75) translate(0, -1.2em)",
  },
}))

export const SearchAddressMainBox = styled(Box)(() => ({
  width: DesktopPxToVw(946),
  "@media(max-width:640px)": {
    width: "100%",
  },
  "& .add-by-map": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))
