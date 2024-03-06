import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const GridContainerWrapper = styled(Box)(() => ({
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1.853vw",
  padding: "3.1250vw 3.1250vw 0vw 3.1250vw",
  "@media (max-width: 640px)": {
    padding: "0vw",
    gap: "5.469vw",
  },
}))
export const InputTextFieldEpicure = styled(TextField)(() => ({
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
    transform: "scale(1) translate(0, 0.4vw)",
    "@media (max-width:640px)": {
      transform: "scale(1) translate(0, 0vw)",
    },
    "& .Mui-error": {
      color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    },
  },
  "&, & input": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
      fontSize: `${MobilePxToVw(24)} !important`,
    },
  },
  "& input, & label": {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: MobilePxToVw(24),
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter !important",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontSize: `${DesktopPxToVw(16)}!important`,
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

export const GridChildWrapper = styled(Grid)(() => ({
  display: "flex",
  // alignItems: "baseline",
  "@media (max-width: 640px)": {
    display: "grid",
    gridAutoRows: "1",
    alignItems: "center",
  },
}))

export const FirstRowGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "10.781vw 1fr 23.594vw",
  columnGap: "2.0833vw",
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "7.469vw",
    width: "100%",
  },
}))
export const FourRowGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  columnGap: "2.0833vw",
  alignItems: "flex-start",
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "7.469vw",
    alignItems: "unset",
    marginTop: MobilePxToVw(5),
  },
}))
export const ThreeRowGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 23.3vw",
  columnGap: "1.720vw",
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "5.469vw",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(24),
  fontWeight: 300,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
  },
}))
export const EpicureCartFormLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
  },
}))

export const FlexWrapper = styled(Grid)(() => ({
  display: "flex",
  alignItems: "baseline",
  "@media (max-width: 640px)": {
    display: "grid",
    gridAutoRows: "1",
    alignItems: "center",
  },
}))

export const StyledSelect = styled(Select)(() => ({
  fontSize: DesktopPxToVw(24),
  marginRight: "3vw",
  width: "23.594vw",
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.paper,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: MobilePxToVw(24),
    margin: "1vw 0vw",
    lineHeight: "4.4vw",
  },
}))

export const StyledTextField = styled(TextField)(() => ({
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
    transform: "scale(1) translate(0, 0em)",
    "&.Mui-error": {
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "&, & input": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.75vw",
      fontSize: `${MobilePxToVw(24)} !important`,
    },
  },
  " & label": {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "Inter",
      fontWeight: 300,
      fontSize: MobilePxToVw(24),
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexTen,
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

export const InputTextField = styled(TextField)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  width: "22.96vw",
  fontSize: DesktopPxToVw(18),
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      width: "74.375vw",
      fontSize: "3.750vw",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: "300 !important",
    },
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "&  .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.ihclPalette?.hexTen,
    "@media (max-width: 640px)": {
      fontSize: "2.750vw",
    },
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    lineHeight: "1vw !important",
    "@media (max-width: 640px)": {
      lineHeight: "3.5vw !important",
      fontSize: "3.750vw",
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
        lineHight: "2vw",
        fontSize: "3.750vw",
        marginTop: "7vw",
        fontWeight: 300,
      },
    },
  },
}))

export const MobileTextField = styled(TextField)(() => ({
  width: "17.6vw",
  marginRight: "2vw",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    marginRight: "0vw",
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& .MuiInputBase-input ": {
    paddingLeft: "1.250vw",
  },
  "@media (max-width: 640px)": {
    width: "52.4vw",
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      lineHeight: "4vw",
      fontSize: "3.750vw",
      marginTop: "7vw",
    },
  },
  input: {
    "&::placeholder": {
      paddingLeft: "0.5vw",
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        lineHight: "4vw",
        fontSize: "3.750vw",
        fontWeight: "300 !important",
      },
    },
  },
}))

export const CheckBoxWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-start",
  margin: "0vw",
  "@media (max-width: 640px)": {
    gap: "3.125vw",
    alignItems: "center",
  },
}))

export const MobileNumberWrapper = styled(
  Box,
  transientProps,
)<{ $marginProp?: boolean }>(({ $marginProp }) => ({
  display: "flex",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
    fontWeight: "300 !important",
    alignItems: "flex-start",
  },
}))
export const StyledWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const StackData = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  justifyContent: "center",
  flexDirection: "row",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
}))

export const BoxCustom = styled(Box)(() => ({
  display: "flex",
  alignItems: "start",
}))

export const StackDataStyle = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? "9vw" : "2vw",
  padding: "5vw",
  width: "100%",
  flexDirection: "column",
  textAlign: "center",
  margin: $isMobile ? "auto 0px" : "unset",
}))

export const CalendarWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "& .styledText": {
    width: "100% !important",
  },

  "& .react-date-picker__inputGroup__input": {
    background: "transparent !important",
  },
  "& .react-date-picker__wrapper": {
    height: DesktopPxToVw(10),
    alignItems: "start",
    "@media (max-width: 640px)": {
      height: MobilePxToVw(10),
    },
  },
}))

export const AddOnMainGrid = styled(Grid)(() => ({
  background: theme?.palette?.background?.paper,
  padding: "2.183vw",
  display: "flex",
  flexDirection: "column",
  gap: " 1.853vw",

  "@media (max-width: 640px)": {
    padding: "4vw 4.083vw 8.083vw 4.083vw",
    marginBottom: "5vw",
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontSize: DesktopPxToVw(16),
  fontWeight: 300,
  "@media (max-width: 640px)": {
    fontSize: "3vw",
    lineHight: "4vw",
  },
}))

export const MobileGridWrapper = styled(Grid)(() => ({
  display: "flex",
  "@media (max-width: 640px)": {
    display: "grid",
    gridAutoRows: "1",
    alignItems: "center",
  },
}))

export const SelectSalutation = styled(Select)(() => ({
  width: "10.781vw",
  marginRight: "2vw",
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.paper,
    },
  },
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "@media (max-width: 640px)": {
    width: "40.156vw",
    lineHight: "4vw",
    fontSize: "3.750vw",
  },
}))

export const SelectCountry = styled(Select)(() => ({
  width: "23.594vw",
  fontSize: DesktopPxToVw(24),
  margin: "0vw 2vw 0vw 0vw",
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.paper,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: MobilePxToVw(24),
    lineHeight: "4.4vw",
  },
}))

export const SelectState = styled(Select)(() => ({
  fontSize: DesktopPxToVw(24),
  width: "23.594vw",
  margin: "0vw 2vw 0vw 0vw",
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.paper,
    },
  },
  "@media (max-width: 640px)": {
    width: "74.375vw",
    fontSize: MobilePxToVw(24),
    lineHeight: "4.4vw",
    margin: "1vw 0vw",
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontSize: DesktopPxToVw(18),
  maxWidth: "23vw !important",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    lineHeight: "4.4vw",
    maxWidth: "75vw !important",
  },
}))

export const EpicureCartFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(24),
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0.4vw)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: MobilePxToVw(24),

      transform: "scale(1) translate(0, 0vw)",
      paddingRight: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(0.75) translate(0, -1.2em)",
    },
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: MobilePxToVw(24),

      lineHeight: "140%",
    },
  },
}))

export const StyledFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: "1.25vw",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0em)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      transform: "scale(1) translate(0, 0em)",
      paddingRight: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(0.75) translate(0, -1em)",
    },
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: "1.25vw",
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      lineHeight: "140%",
    },
  },
}))

export const LoyaltyStyledSelect = styled(Select)(() => ({
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(24),
  },
  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  width: "100%",
}))

export const TentativeDateContainer = styled(Box)(() => ({
  minWidth: "22vw",
  "@media (max-width:640px)": {
    minHeight: "6.25vw",
    minWidth: "67vw",
  },

  "& .styledText": {
    width: "100%",
    height: "100%",
    zIndex: "0",
  },
  "& .react-calendar": {
    marginTop: "1.3vw",
    "@media (max-width:640px)": {
      marginTop: "3vw",
    },
  },
  "& .react-date-picker": {
    height: "100%",
    alignItems: "center",
  },
}))

export const DynamicStack = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(10) : "unset",
  border: `1px solid ${theme?.palette?.ihclPalette?.hexTwo}`,
  padding: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  flexDirection: $isMobile ? "column" : "row",
}))

export const RowStack = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  flexDirection: "row",
  columnGap: $isMobile ? MobilePxToVw(5) : DesktopPxToVw(5),
}))

export const AddOnFormControl = styled(
  FormControl,
  transientProps,
)<{ $componentBackgroundColor?: string }>(({ $componentBackgroundColor }) => ({
  textAlign: "start",
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(24),
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0.4vw)",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: MobilePxToVw(24),

      transform: "scale(1) translate(0, 0vw)",
      paddingRight: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(0.75) translate(0, -1.2em)",
    },
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: MobilePxToVw(24),

      lineHeight: "140%",
    },
  },
}))
