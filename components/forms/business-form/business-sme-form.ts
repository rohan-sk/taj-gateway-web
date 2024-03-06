import { Box, InputLabel, Select, TextField, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const BoxWrapper = styled(Box)(() => ({
  margin: "1.564vw auto 0vw",
  width: "75vw",
  overflowY: "auto",
  overflowX: "hidden",
  backgroundColor: theme?.palette?.background?.default,
  maxHeight: "100%",
  boxShadow: "-6px 10px 24px 0px rgba(0,0,0,0.1)",

  "@media (max-width: 640px)": {
    width: "100%",
    backgroundColor: theme?.palette?.background?.paper,
    margin: "0vw",
    padding: "7.031vw 12.813vw 12.5vw",
    height: "100vh",
    position: "relative",
    maxHeight: "100%",
    boxShadow: "unset",
  },
}))
export const MainWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}))
export const FormWrapper = styled(Box)(() => ({
  width: "75vw",
  padding: "3.438vw 6.406vw 0vw 6.406vw",
  "@media (max-width: 640px)": {
    padding: "0vw",
  },
}))
export const FullBox = styled(Box)(() => ({
  width: "100%",
}))
export const FlexContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  width: "19.271vw",
  "@media (max-width: 640px)": {
    width: "100%",
    justifyContent: "center",
  },
}))
export const InputText = styled(TextField)(() => ({
  width: "100%",
  fontSize: DesktopPxToVw(24),
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSize: DesktopPxToVw(24),
  },
  "& .MuiInput-input": {
    padding: "0.3vw",
  },
  input: {
    fontSize: DesktopPxToVw(24),
    fontWeight: 300,
    "&::placeholder": {
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
    },
  },
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    "& .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },
    "& .MuiInputBase-input ": {
      fontSize: MobilePxToVw(24),
      paddingLeft: "1vw",
    },
    input: {
      fontSize: MobilePxToVw(24),
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))
export const FieldSpacerWithFlex = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  columnGap: DesktopPxToVw(40),
  "@media (max-width: 640px)": {
    justifyContent: "space-between",
    rowGap: MobilePxToVw(40),
  },
}))
export const InputLabelTextStyle = styled(InputLabel)(() => ({
  fontFamily: "Inter",
  fontSize: "1.25vw",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  "@media (max-width: 641px)": {
    fontSize: "3.75vw",
  },
}))
export const MemberSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const FullWidthFlex = styled(Box)(() => ({
  display: "flex",
  width: "100%",
}))
export const InputErrorColumnFlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))
export const ErrorDisplayTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontSize: DesktopPxToVw(18),
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.45vw",
  },
}))
export const ErrorMessage = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontSize: DesktopPxToVw(18),
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
  },
}))
export const CheckBoxContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  gap: "3.125vw",
  mt: "0.781vw",
  marginLeft: "0.6vw",
}))
export const CheckBoxWrapper = styled(Box)(() => ({
  display: "flex",
  gap: "1.094vw",
  alignItems: "center",
}))
export const CustomSelect = styled(Select)(() => ({
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select:focus": {
    backgroundColor: theme?.palette?.ihclPalette?.hexOne,
  },
  input: {
    "&::placeholder": {
      padding: 0,
      textOverflow: "ellipsis !important",
      fontWeight: 500,
      opacity: 1,
    },
  },
}))

export const BottomBox = styled(Box)(() => ({
  textAlign: "center",
  margin: "1.823vw 0vw 2.344vw",
  "& span": {
    lineHeight: "140%",
  },
  "@media (max-width: 640px)": {
    margin: 0,
    marginTop: MobilePxToVw(60),
  },
}))

export const NameFieldsContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: DesktopPxToVw(40),
  alignItems: "start",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    display: "flex",
    gap: MobilePxToVw(40),
    flexDirection: "column",
    marginBottom: MobilePxToVw(40),
  },
}))
export const DateContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: `${DesktopPxToVw(370)} ${DesktopPxToVw(688)}`,
  gap: DesktopPxToVw(40),
  alignItems: "start",
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    display: "flex",
    gap: MobilePxToVw(40),
    flexDirection: "column",
    marginBottom: MobilePxToVw(40),
  },
}))
export const RegisterContainer = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: `${DesktopPxToVw(780)} ${DesktopPxToVw(369)}`,
  gap: DesktopPxToVw(40),
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    gridTemplateColumns: `${MobilePxToVw(280)} ${MobilePxToVw(165)}`,
    gap: MobilePxToVw(30),
    marginBottom: MobilePxToVw(40),
  },
}))

export const AddressContainer = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: `repeat(4, ${DesktopPxToVw(266)})`,
  gap: DesktopPxToVw(40),
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    gridTemplateColumns: `${MobilePxToVw(204)} ${MobilePxToVw(244)}`,
    columnGap: MobilePxToVw(30),
    rowGap: MobilePxToVw(40),
    marginBottom: MobilePxToVw(40),
    gridTemplateRows: "1fr 1fr",
  },
}))

export const FirstRow = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: `repeat(3, ${DesktopPxToVw(340)}
  )`,
  gridTemplateRows: "auto",
  gridTemplateAreas: `"formName formEmail formMobile"`,
  columnGap: DesktopPxToVw(40),
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    gridTemplateRows: "auto",
    columnGap: MobilePxToVw(30),
    marginBottom: MobilePxToVw(40),
    rowGap: MobilePxToVw(45),
    gridTemplateColumns: `${MobilePxToVw(180)} 1fr`,
    gridTemplateAreas: `
    "formName formEmail"
    "formMobile formMobile"
    `,
  },
}))
export const MemberAddress = styled(Box)(() => ({
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: `${DesktopPxToVw(340)} ${DesktopPxToVw(340)} ${DesktopPxToVw(340)}`,
  gridTemplateRows: "auto",
  gridTemplateAreas: `
  "formAddress formAddress formCountry"
  "formState formPinCode formCity "`,
  columnGap: DesktopPxToVw(40),
  rowGap: DesktopPxToVw(35),
  marginBottom: DesktopPxToVw(35),
  "@media (max-width:640px)": {
    gridTemplateRows: "auto",
    columnGap: MobilePxToVw(30),
    rowGap: MobilePxToVw(45),
    marginBottom: MobilePxToVw(45),
    gridTemplateColumns: `${MobilePxToVw(183)} ${MobilePxToVw(183)}`,
    gridTemplateAreas: `"formAddress formAddress"
      "formCountry formState"
      "formPinCode formCity"`,
  },
}))
