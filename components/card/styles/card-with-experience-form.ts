import {
  Box,
  Tab,
  Tabs,
  Grid,
  styled,
  TextField,
  InputLabel,
  Typography,
  FormControl,
  Paper,
  Autocomplete,
} from "@mui/material"
import { fonts, theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const TitleContainer = styled(Box)(() => ({
  paddingTop: DesktopPxToVw(15),
}))

export const FormContainer = styled(Box)(() => ({
  display: "flex",
  gap: DesktopPxToVw(40),
  paddingTop: DesktopPxToVw(40),
  paddingBottom: DesktopPxToVw(40),
}))
export const SignatureMediaCardContainer = styled(Grid)(() => ({
  width: DesktopPxToVw(1200),
  alignItems: "center",
  background: theme?.palette?.background?.default,
  margin: "0 auto",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  "@media (max-width:640px)": {
    background: theme?.palette?.background?.paper,
    maxHeight: "100%",
    paddingTop: MobilePxToVw(64),
    overflowY: "auto",
    height: "100%",
    boxShadow: "unset",
    width: "100%",
    gap: MobilePxToVw(55),
  },
}))
export const SheRemainsContainer = styled(Box)(() => ({
  height: "30vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width:640px)": {
    height: "100%",
  },
}))

export const BoxButton = styled(Box)(() => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  "@media (max-width: 640px)": {
    marginTop: MobilePxToVw(40),
  },
}))

export const BalanceTitle = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwo,
  paddingTop: DesktopPxToVw(13),
}))

export const TitleTypography = styled(Typography)(() => ({
  lineHeight: "6vw",
  textAlign: "center",
  "@media (max-width: 640px)": {
    fontSize: "5vw",
    padding: "9.375vw 0",
  },
}))

export const GridContainer = styled(Grid)(() => ({
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  padding: "2vw 8vw 4vw 8vw",
  margin: "2vw 23.42vw",
}))
export const GridHotel = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}))

export const InputContainer = styled(
  TextField,
  transientProps,
)<{ $width: string }>(({ $width }) => ({
  width: $width,
  fontSize: DesktopPxToVw(24),
}))

export const TabsContainer = styled(Tabs)(() => ({
  borderBottom: `1px  solid ${theme?.palette?.neuPalette?.hexTwelve}`,
  justifyContent: "center !important",
}))

export const BoxContainer = styled(Box)(() => ({
  width: "36.45vw",
}))
export const BoxCategory = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
}))
export const BoxContact = styled(Box)(() => ({
  textAlign: "center",
  margin: "1vw 0vw",
}))
export const BoxText = styled(Box)(() => ({
  margin: `${DesktopPxToVw(40)} 0vw ${DesktopPxToVw(55)}`,
}))
export const MandatoryErrorField = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette.hexSeventeen,
  fontSize: DesktopPxToVw(24),
  textAlign: "start",
  margin: "0vw",
  marginTop: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    marginTop: "3.750vw",
  },
}))

export const BoxMain = styled(Box)(() => ({
  margin: "2vw 0vw",
  background: theme?.palette?.background?.paper,
  padding: "2vw",
}))

export const InputTextField = styled(
  TextField,
  transientProps,
)<{ $width: string }>(({ $width }) => ({
  width: $width,
  marinTop: "0vw",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontWeight: 300,
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },
  "& .MuiInput-input": {
    fontSize: DesktopPxToVw(24),
    fontWeight: 300,
    color: theme?.palette?.neuPalette?.hexSeventeen,
    "@media (max-width:640px)": {
      fontSize: MobilePxToVw(24),
    },
  },

  "&  .MuiFormHelperText-root": {
    fontSize: DesktopPxToVw(18),
    color: theme?.palette?.neuPalette?.hexTwentyOne,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
  },
  input: {
    "&::placeholder": {
      opacity: 1,
      fontFamily: fonts?.body,
      fontWeight: 300,
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      "@media (max-width:640px)": {
        fontSize: MobilePxToVw(24),
      },
    },
  },

  "@media (max-width: 640px)": {
    "& .MuiFormHelperText-root": {
      fontSize: "2.5vw",
    },
    width: "100%",
    "& .MuiInput-input": {
      fontWeight: 300,
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

export const BulkGridContainer: any = styled(Grid)(() => ({
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  backgroundColor: theme?.palette?.background?.default,
  margin: "2vw 12vw",
  maxWidth: DesktopPxToVw(1440),
  padding: `3.125vw ${DesktopPxToVw(110)}`,
  maxHeight: "100%",
  overflowY: "auto",
  "@media (max-width: 640px)": {
    boxShadow: "unset",
    maxWidth: "initial",
    margin: "0vw",
    padding: "23.906vw 12.813vw 10.313vw",
    overflowY: "unset",
    backgroundColor: theme?.palette?.background?.paper,
  },
}))

export const WellnessFirstRow = styled(Box)(() => ({
  display: "grid",
  columnGap: DesktopPxToVw(40),
  rowGap: MobilePxToVw(30),
  alignItems: "start",
  gridTemplateColumns: `1fr 1fr ${DesktopPxToVw(355)}`,
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: MobilePxToVw(35),
  },
}))

export const WellnessThirdRow = styled(Box)(() => ({
  display: "grid",
  columnGap: DesktopPxToVw(40),
  rowGap: MobilePxToVw(30),
  alignItems: "start",
  gridTemplateColumns: `${DesktopPxToVw(330)}  ${DesktopPxToVw(207)} ${DesktopPxToVw(306)} 1fr`,
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: MobilePxToVw(35),
  },
}))

export const InputRow = styled(
  Box,
  transientProps,
)<{ $mobile?: boolean }>(({ $mobile }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2vw",
  alignItems: "start!important",
  margin: "2vw 0vw",
  "@media (max-width: 640px)": {
    margin: "0vw 0vw 6.25vw",
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "6.25vw",
  },
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  fontSize: DesktopPxToVw(24),
  lineHeight: "140%",
  opacity: 1,
  color: theme?.palette?.neuPalette?.hexFive,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    zIndex: 99,
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  fontSize: `${DesktopPxToVw(18)}!important`,
  color: theme?.palette?.neuPalette?.hexTwentyOne,
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.45vw!important",
  },
}))

export const DateTextField = styled(TextField)(() => ({
  width: "13.4vw",
  fontSize: DesktopPxToVw(24),
  "@media (max-width: 640px)": {
    width: "40vw",
    fontSize: "3.75vw",
    height: "4vw",
  },
  "& .MuiIconButton-root": {
    right: "1vw",
    padding: "0vw!important",
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
    color: `${theme?.palette?.neuPalette?.hexTwentyOne} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width:640px)": {
      fontSize: "2.5vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      fontSize: DesktopPxToVw(24),
      opacity: 0.8,
      color: theme?.palette?.neuPalette?.hexFour,
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const FormWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $isMobile ? MobilePxToVw(35) : DesktopPxToVw(31),
  marginTop: $isMobile ? MobilePxToVw(59) : "2.448vw",
}))

export const PrimaryActionErrorWrapperBox = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: $isMobile ? MobilePxToVw(55) : "2.448vw",
}))

export const MobileErrorMessageTypography = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  zIndex: 1,
  position: "relative",
  marginTop: $isMobile ? "0.469vw" : "0.1vw",
  color: theme?.palette?.neuPalette?.hexTen,
}))

export const StyledFormControl = styled(FormControl)(() => ({
  "& .MuiSelect-select": {
    marginBottom: "10px",
  },
  "@media (max-width: 640px)": {
    "& .MuiSelect-select": {
      marginBottom: "2vw",
    },
  },
}))

export const ActionWrappingValidationContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean; $isValid?: boolean }>(({ $isMobile, $isValid }) => ({
  marginTop:
    $isMobile && $isValid
      ? MobilePxToVw(25)
      : $isMobile
        ? MobilePxToVw(55)
        : $isValid
          ? DesktopPxToVw(25)
          : DesktopPxToVw(55),
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
}))

export const BulkGCFormFieldsWrapper = styled(Box)<{ $webWidths: string }>(({ $webWidths }) => ({
  display: "grid",
  alignItems: "start",
  columnGap: "2.083vw",
  rowGap: "unset",
  gridTemplateColumns: $webWidths,
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "5.469vw",
  },
}))

export const BulkGridWrapper = styled(Box)(() => ({
  textAlign: "center",
  bottom: "unset",
  background: theme?.palette?.background?.default,
  margin: "1.563vw 12.5vw 0vw",
  boxShadow: `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  maxHeight: "100%",
  overflowY: "auto",
  padding: "3.021vw  6.406vw ",
  "@media (max-width:640px)": {
    bottom: "0vw",
    background: theme?.palette?.background?.paper,
    margin: "24vw 0vw 24vw",
    boxShadow: "unset",
    maxHeight: "unset",
    overflowY: "unset",
    padding: "0vw 12.813vw 14.063vw",
  },
}))
export const BulkEnquireContainer = styled(Box)(() => ({
  textAlign: "center",
  bottom: "unset",
  background: theme?.palette?.background?.default,
  margin: `${DesktopPxToVw(20)} 12.5vw 0vw`,
  boxShadow: `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
  maxHeight: "100%",
  overflowY: "auto",
  padding: `${DesktopPxToVw(58)} ${DesktopPxToVw(123)}`,
  "@media (max-width:640px)": {
    bottom: "0vw",
    background: theme?.palette?.background?.paper,
    margin: `${MobilePxToVw(87)} 0vw 24vw`,
    boxShadow: "unset",
    maxHeight: "unset",
    overflowY: "unset",
    padding: "0vw 12.813vw 14.063vw",
  },
}))

export const ExperienceFormWrapper = styled(Box)(() => ({
  maxHeight: "100%",
  overflowY: "auto",
  width: "75vw",
  backgroundColor: theme?.palette?.background?.default,
  boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
  padding: `${DesktopPxToVw(60)} ${DesktopPxToVw(121)}`,
  margin: "2vw auto",
  "@media (max-width:640px)": {
    width: "100%",
    margin: "0vw",
    marginTop: "10.516vw",
    overflowY: "unset",
    backgroundColor: theme?.palette?.background?.paper,
    padding: "0vw 12.813vw 10.313vw",
    boxShadow: `unset`,
  },
}))

export const AutocompletePaper = styled(Paper)(() => ({
  backgroundColor: theme?.palette?.background.default,
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  borderRadius: 0,
  fontFamily: fonts?.body,
  letterSpacing: "0.05em",
}))

export const AutocompleteOptionTypography = styled(Typography)(() => ({
  padding: " 1.042vw 0vw 1.042vw 2.083vw !important",
  fontWeight: "300",
}))

export const SearchAutocomplete = styled(Autocomplete)(() => ({
  width: "100%",
  "& .MuiAutocomplete-inputRoot": {
    paddingRight: "0vw!important",
  },
  "& .MuiInput-input": {
    padding: "0vw !important",
  },
}))

export const SingleContentContainer = styled(Box)(() => ({
  paddingTop: DesktopPxToVw(40),
  textAlign: "center",
  "@media (max-width:640px)": {
    paddingTop: MobilePxToVw(182),
    paddingBottom: "10.313vw",
  },
}))

export const DateContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  paddingTop: "0.2vw",
  "& .styledText": {
    width: "100%",
  },
  minWidth: DesktopPxToVw(207),
  "@media (max-width:640px)": {
    minWidth: "100%",
  },
  "& input": {
    padding: "0vw 0vw 0.2vw",
  },
}))

export const RecaptchaWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  paddingTop: DesktopPxToVw(40),
  minWidth: DesktopPxToVw(207),
  "@media (max-width:640px)": {
    paddingTop: MobilePxToVw(30),
  },
}))
