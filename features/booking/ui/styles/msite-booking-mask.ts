import { theme } from "../../../../lib/theme"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import {
  Box,
  Button,
  styled,
  Divider,
  FormGroup,
  TextField,
  Accordion,
  Typography,
  ListItemText,
  AccordionSummary,
} from "@mui/material"

export const MainBox = styled(Box)(() => ({
  zIndex: 99,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  paddingTop: MobilePxToVw(32),
  backgroundColor: theme.palette.neuPalette.hexOne,
}))

export const CategoryText = styled(Typography)(() => ({
  color: `${theme.palette.neuPalette.hexTwelve} !important`,
  paddingTop: MobilePxToVw(10),
}))

export const SearchedOptions = styled(Typography)(() => ({
  cursor: "pointer",
  paddingTop: MobilePxToVw(10),
}))

export const HotelTextField: any = styled(TextField)(() => ({
  padding: 0,
  fontSize: "3.750vw",
  color: theme?.palette?.text?.primary,
}))

export const DateTextField = styled(TextField)(() => ({
  padding: 0,
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },

  "& .MuiInput-input": {
    fontWeight: 300,
    lineHeight: "150%",
    fontSize: "3.750vw",
    fontFamily: "Inter",
    padding: 0,
  },

  input: {
    "&::placeholder": {
      fontWeight: 300,
      lineHeight: "150%",
      fontSize: "3.750vw",
      fontFamily: "Inter",
      color: theme?.palette?.text?.primary,
    },
  },
}))

export const DateMainBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "9.375vw",
  flexDirection: "column",
}))

export const DateInnerBox = styled(Box)(() => ({
  gap: "3.281vw",
  display: "flex",
  alignItems: "center",
}))

export const DateDivider = styled(Divider)(() => ({
  width: "5.672vw",
  height: "0.156vw",
  background: theme?.palette?.neuPalette?.hexTwelve,
}))

export const DateBottomDivider = styled(Divider)(() => ({
  opacity: 0.2,
  width: "100%",
  height: "0.156vw",
  background: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const SpecialCodeMainBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  position: "relative",
}))

export const ColumnDirectionBox: any = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const SpecialCodeDropDownDivider = styled(Divider)(() => ({
  height: "0.156vw",
  margin: "3.125vw 0vw",
  background: theme?.palette?.neuPalette?.hexSixteen,
}))

export const CheckIconBox = styled(Box)(() => ({
  display: "flex",
  marginTop: "5vw",
  alignItems: "center",
  justifyContent: "center",
}))

export const TermsTypography = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "2.50vw",
  whiteSpace: "nowrap",
  marginLeft: "2vw",
  lineHeight: "3.516vw",
  fontFamily: "Inter",
}))

export const TermsLinkTypography = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  fontSize: "2.50vw",
  marginLeft: "1vw",
  whiteSpace: "nowrap",
  lineHeight: "3.516vw",
  fontFamily: "Inter",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const AddButton = styled(Button)(() => ({
  width: "16vw !important",
  height: "7.813vw !important",
  color: theme?.palette?.neuPalette?.hexOne,
  background: theme?.palette?.neuPalette?.hexSeventeen,
  "&.Mui-disabled": {
    color: "darkGray",
  },
  " &:hover": {
    color: theme?.palette?.neuPalette?.hexOne,
    background: theme?.palette?.neuPalette?.hexSeventeen,
  },
}))

export const SelectedCodeBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginTop: "3.125vw",
  padding: "1.484vw 4.688vw",
  justifyContent: "space-between",
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
}))

export const AccountTypography = styled(Typography)(() => ({
  fontWeight: 400,
  cursor: "pointer",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}))

export const StyledAccordion = styled(Accordion)(() => ({
  boxShadow: "none",
  padding: "0vw 6vw 9.375vw 6vw",
  "& .MuiAccordionDetails-root ": { padding: 0 },
}))

export const StyledAccordionSummary = styled(AccordionSummary)(() => ({
  padding: "0px",
  minHeight: "auto",
  paddingBottom: "1vw",
  borderBottom: `0.05vw solid ${theme?.palette?.text?.primary}`,
  "& .MuiAccordionSummary-content ": { margin: "0" },
  "& .MuiAccordionSummary-content.Mui-expanded": { margin: "0" },
  "& .MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded": {
    minHeight: "auto",
  },
}))

export const PromoCodeTextField: any = styled(TextField)(() => ({
  width: "100%",
  justifyContent: "flex-end",
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.text?.primary,
  },

  "& .MuiInput-input": {
    padding: 0,
    fontWeight: 300,
    lineHeight: "150%",
    fontSize: "3.750vw",
    fontFamily: "Inter",
  },

  input: {
    "&::placeholder": {
      fontWeight: 300,
      lineHeight: "150%",
      fontSize: "3.750vw",
      fontFamily: "Inter",
      color: theme?.palette?.text?.primary,
    },
  },
}))

export const StyledFormGroup: any = styled(FormGroup)(() => ({
  flexWrap: "nowrap",
  marginTop: "3.125vw",
}))

export const CheckRatesButton = styled(Button)(() => ({
  width: "34.375vw",
  height: "10.156vw !important",
}))

export const AccordionMainBox = styled(Box)(() => ({
  zIndex: 1,
  width: "100%",
  padding: "8.750vw 2.344vw 2.344vw",
  background: theme.palette.background.paper,
  marginTop: "5vh",
  height: "100%",
}))

export const StyledListItem: any = styled(ListItemText)(() => ({
  paddingLeft: "3.281vw",
  "& .MuiTypography-root": {
    fontWeight: 300,
    fontSize: "3.75vw",
    color: theme?.palette?.neuPalette?.hexSeventeen,
  },
}))

export const SpecialCodeDataWrapper = styled(Box)(() => ({
  width: "100%",
  maxHeight: "35vh",
  overflowY: "scroll",
  padding: `${MobilePxToVw(30)}`,
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  "::-webkit-scrollbar-thumb": {
    width: MobilePxToVw(5),
    backgroundColor: theme?.palette?.neuPalette?.hexTwelve,
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: theme?.palette?.neuPalette?.hexSeven,
  },
}))
