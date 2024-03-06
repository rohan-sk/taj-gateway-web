import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { fonts, theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Stack, fontFamily, width } from "@mui/system"
import { transientProps } from "../../../../utils/transientProps"

export const NameFieldsWrapper = styled(Box)(() => ({
  display: "flex",
  margin: "2vw 0vw",
  alignItems: "baseline",
}))

export const ContactFieldWrapper = styled(Box)(() => ({
  display: "flex",
  margin: "2vw 0vw 1vw 0vw",
  alignItems: "flex-end",
}))

export const MobileBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    margin: "0vw 0vw 2vw",
    "& input": {
      marginLeft: "0vw",
      paddingLeft: "0vw!important",
    },
    "& .MuiInputBase-root.MuiInput-root": {
      minWidth: "fit-content",
    },
    "& .MuiSvgIcon-root": {
      right: "0vw",
    },
  },
}))

export const TextFieldsWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "0.6vw",
  alignItems: "flex-end",
  marginBottom: "1vw",
}))

export const SelectBoxWrapper = styled(Box)(() => ({
  display: "flex",
  margin: "1vw 0vw 2vw 0vw",
}))

export const DateTextField = styled(TextField)(() => ({
  width: "33vw",
  fontSize: DesktopPxToVw(24),
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "40vw",
    fontSize: "3.75vw",
    height: "4.688vw",
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
      height: "6.25vw",
    },
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.neuPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const ButtonsWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const EmailField = styled(TextField)(() => ({
  "& .MuiInput-root": {
    "&:before": {
      borderBottomStyle: "solid!important",
    },
  },
  "@media (max-width: 640px)": {
    margin: "0",
    "& input": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.neuPalette?.hexTwentyNine} inset !important`,
      WebkitTextFillColor: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwentyOne,
  fontFamily: fonts?.body,
  fontSize: DesktopPxToVw(18),
  fontWeight: 300,
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
  },
}))

export const NameField = styled(TextField)(() => ({
  "@media (max-width: 640px)": {
    width: "100%",
    marginRight: "0vw",
    "& input": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.neuPalette?.hexTwentyNine} inset !important`,
      WebkitTextFillColor: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
    },
  },
  "& .MuiInput-root": {
    "&:before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      height: "4.2vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        width: "55.625vws",
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const InputText = styled(TextField)(() => ({
  width: "22.96vw",
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
      color: theme?.palette?.neuPalette?.hexSeventeen,
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

export const TapEnquireFormWrapper = styled(Box)(() => ({
  overflowY: "auto",
  maxHeight: "100%",
  boxShadow: `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  width: "fit-content",
  margin: "1.563vw auto",
  "@media (max-width:640px)": {
    overflowY: "unset",
    maxHeight: "unset",
    margin: "0vw",
    width: "100%",
    boxShadow: "unset",
  },
}))

export const NameStack = styled(Stack)(() => ({
  display: "grid",
  width: "100%",
  alignItems: "start",
  columnGap: DesktopPxToVw(40),
  gridTemplateColumns: `${DesktopPxToVw(380)} 1fr 1fr`,
  marginBottom: DesktopPxToVw(31),
  "@media(max-width:640px)": {
    marginBottom: MobilePxToVw(40),
    display: "flex",
    gap: MobilePxToVw(31),
    flexDirection: "column",
  },
}))
export const CommonStack = styled(Stack)(() => ({
  display: "grid",
  width: "100%",
  alignItems: "start",
  columnGap: DesktopPxToVw(40),
  gridTemplateColumns: "repeat(2,1fr)",
  marginBottom: DesktopPxToVw(31),
  "@media(max-width:640px)": {
    marginBottom: MobilePxToVw(40),
    display: "flex",
    gap: MobilePxToVw(31),
    flexDirection: "column",
  },
}))
export const MainGridWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "0vw",
  maxWidth: DesktopPxToVw(1440),
  backgroundColor: theme?.palette?.background?.default,
  padding: "3.125vw 6.406vw 3.125vw 6.406vw",
  "@media (max-width: 640px)": {
    justifyContent: "unset",
    maxWidth: "100%",
    height: "100vh",
    padding: `${MobilePxToVw(100)} ${MobilePxToVw(82)} ${MobilePxToVw(0)}`,
    backgroundColor: theme?.palette?.background?.paper,
    margin: "0vw",
  },
}))

export const MobileNumberWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  "@media (max-width: 640px)": {
    margin: "0",
    alignItems: "self-end",
  },
}))

export const PhoneNumberField = styled(TextField)(() => ({
  "& .MuiInput-root": {
    "&:before": {
      borderBottomStyle: "solid!important",
    },
  },
  width: "100%",

  "@media (max-width: 640px)": {
    width: "100%",
    margin: 0,
    "& input": {
      WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.neuPalette?.hexTwentyNine} inset !important`,
      WebkitTextFillColor: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
      marginLeft: DesktopPxToVw(24),
    },
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
      paddingLeft: "2vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: DesktopPxToVw(18),
      paddingLeft: "1vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      fontWeight: 400,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const TitleTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    marginBottom: "4vw",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontFamily: fonts?.body ?? "Inter",
  fontSize: DesktopPxToVw(24),
  lineHeight: "140%",
  "@media (max-width: 640px)": {
    fontSize: "3.750vw",
  },
}))

export const ExpectedNightsFormControl = styled(FormControl)(() => ({
  alignSelf: "baseline",
  minWidth: DesktopPxToVw(578),
  "& .MuiSelect-select": {
    "@media (max-width: 640px)": {
      minWidth: "50%",
    },
  },
}))
export const CustomFormControl = styled(FormControl)(() => ({
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

export const ExpectedNightsSelect = styled(Select)(() => ({
  minWidth: DesktopPxToVw(368),
  lineHeight: "140%",
  fontSize: "1.250vw!important",
  margin: "0vw",
  "@media (max-width: 640px)": {
    minWidth: "50%",
    margin: "4vw 0vw 2vw 0vw",
    fontSize: "3.75vw!important",
  },
}))

export const StayDateContainer = styled(
  Box,
  transientProps
)<{ $isOpen?: boolean; $isDouble?: any }>(({ $isOpen, $isDouble }) => ({
  minWidth: DesktopPxToVw(578),
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
    marginTop: "0.8vw !important",
    "@media (max-width:640px)": {
      marginTop: "5.3vw !important",
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
