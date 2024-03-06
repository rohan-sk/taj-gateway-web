import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  Box,
  Grid,
  Tab,
  Tabs,
  Select,
  styled,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
}))

export const StyledInputField: any = styled(TextField)(() => ({
  width: "30.4vw",
  paddingTop: "0.5vw",
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexEleven,
      fontWeight: 300,
      opacity: 0.8,
      fontSize: "1.250vw",
      "@media (max-width: 640px)": {
        fontWeight: 300,
        fontSize: "3.750vw !important",
      },
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1.250vw !important",
    fontWeight: 300,
    "@media (max-width: 640px)": {
      fontWeight: 300,
      fontSize: "3.750vw !important",
      width: "100%",
    },
  },
  "@media (max-width: 640px)": {
    padding: "0vw",
    alignItems: "center",
    width: "100%",
  },
}))
export const StyledTextField: any = styled(TextField)(() => ({
  width: "36.3vw",
  paddingTop: "0.2vw",
  "@media (max-width: 640px)": {
    padding: "0vw",
    alignItems: "center",
    width: "100%",
  },
  "&  .MuiFormHelperText-root": {
    color: `${theme?.palette?.neuPalette?.hexTen} !important`,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontWeight: 300,
      fontSize: "3.750vw !important",
      letterSpacing:"-0.5px"
    },
  },

  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexEleven,
      fontWeight: 300,
      opacity: 0.8,
      fontSize: "1.2vw",
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
        fontWeight: 300,
      },
    },
  },
  "& .MuiInput-root": {
    "@media (max-width: 640px)": {
      width: "100%",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "1.1vw !important",
    fontWeight: 300,
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      fontWeight: 300,
      width: "100%",
    },
  },
}))

export const MainGridWrapper = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean; $isSignUp: boolean }>(({ $isMobile, $isSignUp }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  overflow: "auto",
  justifyContent: "center",
  backgroundColor: $isSignUp
    ? theme?.palette?.background?.default
    : $isMobile
    ? theme?.palette?.background?.default
    : theme?.palette?.background?.paper,
  flexFlow: "initial",
  margin: "1.7vw 0vw auto 0vw",
}))

export const StyledTabs = styled(
  Tabs,
  transientProps
)<{ $index: boolean }>(({ $index }) => ({
  "& .MuiTab-root.Mui-selected": {
    color: theme?.palette?.neuPalette?.hexTwo,
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
    "@media (max-width: 640px)": {
      justifyContent: $index ? "space-around" : "space-between",
    },
  },
  "& .MuiTabs-scroller": {
    display: "block",
  },
  marginBottom: "1vw",
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  width: DesktopPxToVw(700),
  margin: "auto",
  "@media (max-width: 640px)": {
    display: "flex",
    justifyContent: $index ? "space-around" : "space-between",
    width: "85%",
  },
}))

export const StyledTab = styled(
  Tab,
  transientProps
)<{
  $indexOne: boolean
  $indexTwo: boolean
  $index: boolean
}>(({ $indexOne, $indexTwo, $index }) => ({
  color: theme?.palette?.text?.primary,
  fontWeight: 300,
  fontSize: "0.938vw",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: DesktopPxToVw(19),
  paddingBottom: DesktopPxToVw(19),
  width: $indexTwo ? DesktopPxToVw(213) : DesktopPxToVw(158),
  alignItems: "center",
  marginLeft: $indexTwo ? DesktopPxToVw(80) : !$index ? "2.5vw" : "",
  marginRight: $indexOne ? DesktopPxToVw(80) : !$index ? "2.5vw" : "",
  height: "100%",
  "@media (max-width: 640px)": {
    fontSize: "2.8vw",
    margin: "0vw",
    width: $index ? DesktopPxToVw(480) : DesktopPxToVw(580),
    padding: "3vw 2vw",
  },
  "@media(max-height:400px)": {
    marginLeft: $indexTwo ? DesktopPxToVw(10) : !$index ? "2.5vw" : "",
    marginRight: $indexOne ? DesktopPxToVw(35) : !$index ? "2.5vw" : "",
  },
}))

export const TitleWrapper = styled(Typography)(() => ({
  marginBottom: "1.4vw",
}))

export const HeaderWrapper = styled(Grid)(() => ({
  marginLeft: "4vw",
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexThirtyTwo,
  marginTop: "0.6vw",
  fontSize: "1vw",
  fontWeight: "300",
  "@media (max-width: 640px)": {
    fontSize: "3vw",
    marginTop: "4.4vw",
  },
}))

export const TabsBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const InputText = styled(TextField)(() => ({
  width: "30.4vw",
  input: {
    paddingLeft: DesktopPxToVw(20),
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
    "&::placeholder": {
      opacity: 1,
      fontWeight: "300 !important",
      fontSize: DesktopPxToVw(24),
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
    },
  },

  "@media (max-width: 640px)": {
    width: "100%",
    input: {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        fontWeight: 300,
        opacity: 1,
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const StyledTypography = styled(Typography)(() => ({
  margin: "4.5vw 0vw 0vw 0vw",
  fontSize: DesktopPxToVw(32),
  color: theme?.palette?.neuPalette?.hexSeventeen,
  "@media (max-width: 640px)": {
    fontSize: "5vw",
    lineHeight: "4vw",
    margin: "2.4vw 0vw 4vw 0vw",
  },
  "@media(max-width:700px)": {
    margin: "4vw 0vw 0vw 0vw",
  },
}))

export const HeaderImagesWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  alignItems: "end",
  justifyContent: "center",
  margin: "2.6vw 0vw 2.250vw 0vw",
  "@media (max-width: 640px)": {
    width: "85%",
    margin: "auto",
    justifyContent: "space-between",
  },
}))

export const EmailBoxWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media (max-width: 640px)": {
    marginTop: "2vw",
  },
}))

export const ImagesContainer = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  alignItems: "end",
  justifyContent: "center",
  margin: "1.8vw 0vw 1vw 0vw",
  "@media (max-width: 640px)": {
    margin: "11.8vw 0vw 10vw 0vw",
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "Inter",
  fontSize: "0.938vw",
  padding: "0.417vw",
  color: theme?.palette?.neuPalette?.hexSeventeen,
  fontWeight: 300,
  lineHeight: "140%",
  paddingLeft: "1vw",
  "@media (max-width:640px)": {
    paddingLeft: "3vw",
    fontSize: "2.813vw",
    minHeight: "4.063vw",
  },
}))

export const MemberShipSelect = styled(Select)(() => ({
  fontSize: "1.25vw",
  width: "10.4vw",
  alignItems: "center",
  "& .MuiSelect-select": {
    textAlign: "start",
    fontWeight: 300,
    overflow: "visible",
    "@media(max-width:640px)":{
      letterSpacing:"-0.5px",
    },
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
    paddingBottom: DesktopPxToVw(6.5),
    "@media (max-width: 640px)": { paddingBottom: MobilePxToVw(5) },
  },
  "@media (max-width: 640px)": {
    minWidth: "30.156vw",
    fontSize: "3.75vw",
  },
}))

export const MembershipFieldWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  marginBottom: DesktopPxToVw(10),
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(10),
  },
}))
