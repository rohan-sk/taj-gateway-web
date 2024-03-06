import { Box, Grid, styled, Select, TextField, FormControl, MenuItem } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { fonts, theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"

export const MobileNumberWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  display: "flex",
  width: $isMobile ? "19.188vw" : "unset",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    margin: "auto",
    alignItems: "self-end",
  },
  "@media (max-width:640px)": {
    "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary": {
      minWidth: "22vw",
    },
  },
}))

export const FullBox = styled(Box)(() => ({
  width: "100%",
}))

export const MainGridWrapper = styled(Grid)(() => ({
  backgroundColor: theme?.palette?.background?.default,
  display: "flex",
  textAlign: "center",
  margin: "0vw 12.500vw",
  flexDirection: "column",
  padding: "2.865vw 6.406vw 2.083vw",
  boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
}))

export const SearchWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&>*>*>*>*": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  ".MuiInput-input.MuiInputBase-inputAdornedStart": {
    "&, &::placeholder": {
      fontSize: "1.25vw !important",
      fontFamily: "supreme",
      fontWeight: 300,
      "@media (max-width:640px) ": { fontSize: "3.75vw!important" },
    },
  },
  "& input": {
    height: "100%",
    "@media (max-width:640px)": {
      height: "100%",
      fontSize: "3.75vw",
    },
  },
  "& img": {
    marginBottom: "0.2vw",
    "@media (max-width)": {
      marginBottom: "0.5vw",
    },
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "supreme",
  fontSize: "0.938vw",
  padding: "0.487vw 0vw 0.487vw 2.083vw",
  backgroundColor: theme?.palette?.ihclPalette?.default,
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontWeight: 300,
  lineHeight: "140%",
  "@media (max-width:640px)": {
    fontSize: "2.813vw",
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  paddingBottom: DesktopPxToVw(40),
  paddingTop: "2vw",
  margin: "auto",
}))

export const TextFieldsWrapper = styled(Box)(() => ({
  gap: "1.615vw",
  display: "flex",
  marginTop: "2.083vw",
  flexDirection: "column",
}))

export const NameTextFieldWrapper = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: `17.188vw ${DesktopPxToVw(424)} ${DesktopPxToVw(360)}`,
  columnGap: "2.083vw",
  marginBottom: "1.615vw",
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
    gridTemplateColumns: "1fr",
    rowGap: "5.469vw",
    gridTemplateRows: "1fr 1fr 1fr",
  },
}))
export const FunctionDateContainer = styled(
  Box,
  transientProps,
)<{ $isOpen?: boolean; $isDouble?: any }>(({ $isOpen, $isDouble }) => ({
  "& .styledText": {
    width: "100%",
    height: "100%",
    zIndex: "0",
  },
  "& .react-calendar": {
    marginTop: "1.3vw",
    "@media (max-width:640px)": {
      marginTop: "2.3vw !important",
    },
  },
  "& .react-date-picker": {
    height: "100%",
    alignItems: "center",
  },
  "& .react-date-picker__wrapper": {
    "@media (max-width:640px)": {
      minHeight: "6.25vw",
    },
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

export const CountryCityGrid = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "start",
  columnGap: "2.083vw",
  marginBottom: "1.615vw",
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
    gridTemplateColumns: "1fr",
    rowGap: "5.469vw",
    gridTemplateRows: "1fr 1fr",
  },
}))
export const CommonContainer = styled(
  Box,
  transientProps,
)<{ $webWidths: string }>(({ $webWidths }) => ({
  display: "grid",
  gridTemplateColumns: $webWidths,
  alignItems: "start",
  columnGap: "2.083vw",
  marginBottom: "1.563vw",
  "@media (max-width:640px)": {
    marginBottom: "5.469vw",
    gridTemplateColumns: "1fr",
    rowGap: "5.469vw",
    gridTemplateRows: "1fr 1fr",
  },
}))
export const DatesWrapper = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  alignItems: "self-end",
  "& .MuiSvgIcon-root": { display: "none" },
}))

export const DateTextField = styled(TextField)(() => ({
  fontSize: DesktopPxToVw(24),

  "@media (max-width: 640px)": {
    fontSize: "3.75vw",
    height: "6.25vw",
    "&> .MuiInputBase-root": {
      height: "6.25vw",
    },
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
  },
  input: {
    padding: "0vw",
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw!important",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const InputText = styled(TextField)(() => ({
  width: "100%",
  marginTop: "1vw",
  letterSpacing: "1px",
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
  },

  "&  .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
  },

  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 500,
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
  },

  "@media (max-width: 640px)": {
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },
    width: "100%",
    padding: `${MobilePxToVw(15)} 0vw `,
    "& .MuiInput-input": {
      fontSize: "3.750vw",
    },
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        fontWeight: 300,
        opacity: 1,
        fontSize: "3.750vw",
      },
    },
  },
}))

export const ButtonWrapper = styled(Box)(() => ({
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
}))

export const ThemeSelect = styled(Select)(() => ({
  width: "30vw",
  fontSize: "1.25vw",
  textAlign: "start",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}))

export const FlexibleDates = styled(Select)(() => ({
  width: "30vw",
  lineHeight: "2vw",
  fontSize: "1.25vw",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}))

export const GuestList = styled(Select)(() => ({
  width: "17.188vw",
  lineHeight: "2vw",
  fontSize: "1vw",
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}))

export const StyledFormControl = styled(FormControl)(() => ({
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
}))

export const MobileNumberMainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const MultipleFieldsWrapperBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
}))

export const CustomCheckBoxWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  marginTop: $isMobile ? "5.469vw" : "1.615vw",
  alignItems: $isMobile ? "flex-start" : "center",
}))

export const DescriptionWrapperBox = styled(Box)(() => ({
  textAlign: "center",
  padding: "1.25vw 4.219vw",
  backgroundColor: theme?.palette?.background?.paper,
  "@media (max-width:640px)": {
    padding: "8.594vw 12.813vw",
    backgroundColor: theme?.palette?.background?.default,
  },
}))

export const WeddingGridWrapper = styled(Grid)(() => ({
  width: "75vw",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  margin: "0 auto",
  backgroundColor: theme?.palette?.background?.default,
  "@media (max-width:640px)": {
    width: "74.375vw",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))
export const WeddingFormWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "2.865vw 6.406vw 0vw",
  "@media (max-width:640px)": {
    padding: "0vw",
  },
}))

export const MobileNumberContainer = styled(Box)(() => ({
  display: "flex",
  width: "100%",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    alignItems: "self-end",
    "&>*:nth-child(1) .MuiInputBase-root.MuiInput-root.MuiInput-underline": {
      minWidth: "0vw",
    },
    "& .MuiSvgIcon-root": {
      position: "relative",
      right: "unset",
    },
    "& .MuiInputBase-root": {
      padding: "0vw",
    },
    "& input+div": {
      display: "flex",
      alignItems: "center",
    },
  },
}))

export const StyledWeddingFormControl: any = styled(FormControl)(() => ({
  textAlign: "start",
  "& *": {
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
      "@media (max-width:640px)": {
        backgroundColor: theme?.palette?.background?.paper,
      },
    },
  },
  height: "2.08333vw",
  "@media (max-width:640px)": {
    height: "6.25vw",
  },
  "&>label": {
    transform: "unset",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontSize: "1.25vw",
    fontFamily: fonts?.body,
    "@media(max-width:640px)": {
      fontSize: "3.75vw",
    },
  },
  "&>.MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-colorPrimary.MuiInputBase-formControl": {
    height: "2.083vw",
    marginTop: "0vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
    "&>div": {
      height: "2.083vw",
      "@media (max-width:640px)": {
        height: "6.25vw",
      },
    },
  },
}))
export const ColumnGrid = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}))

export const CenterTextBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
}))

export const WeddingFormControl = styled(FormControl)(() => ({
  textAlign: "start",
  fontFamily: "supreme",
  fontWeight: 300,
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& label": {
    transform: "scale(1) translate(0, 0)",
    textAlign: "start",
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
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
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
    },
  },
}))

export const WeddingSearchContainer = styled(Box)(() => ({
  input: {
    padding: "0vw",
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
}))

export const WeddingFormContainer = styled(Box)(() => ({
  margin: "1.042vw auto 0vw",
  width: "fit-content",
  maxHeight: "100%",
  overflowY: "auto",
  "@media (max-width:640px)": {
    width: "100%",
    marginTop: "10.516vw",
    overflowY: "unset",
  },
}))
export const WeddingFormOverFlowWrapper = styled(Box)(() => ({
  maxHeight: "100%",
  overflowY: "auto",
  width: "fit-content",
  boxShadow: `0px 10px 24px rgba(0,0,0,0.1), 
            0px 10px 24px rgba(0,0,0,0.1), 
            0px 10px 24px rgba(0,0,0,0.1), 
            0px 10px 24px rgba(0,0,0,0.1);`,
  // boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
  margin: "1.563vw auto 0vw",
  "@media (max-width:640px)": {
    boxShadow: "unset",
    width: "100%",
    marginTop: "10.516vw",
    overflowY: "unset",
  },
}))
