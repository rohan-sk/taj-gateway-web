import { Box, Grid, InputLabel, Select, TextField, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const StyledInput = styled(TextField)(() => ({
  width: "22.96vw",
  marginRight: "2vw",
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
  },
}))

export const DatePickerTextField = styled(TextField)(() => ({
  width: "33vw",
  marginRight: "2vw",
}))

export const GenderSelect = styled(Select)(() => ({
  width: "23.594vw",
  marginRight: "2vw",
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    paddingRight: "0vw !important",
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "39.844vw",
    fontSize: "3.75vw",
  },
}))
export const SalutationSelect = styled(Select)(() => ({
  width: "7.500vw",
  marginRight: "2vw",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(24),
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: theme?.palette?.background?.default,
    },
  },
  "@media (max-width: 640px)": {
    width: "22.500vw",
    fontSize: "3.75vw",
  },
}))

export const TitleWrapper = styled(Box)(() => ({
  textAlign: "center",
  margin: "4.3vw 0vw 2.6vw 0vw",
  "@media (max-width: 640px)": {
    margin: "7.5vw 0vw 3.85vw 0vw",
  },
}))

export const FirstNameField = styled(TextField)(() => ({
  width: "14.010vw",
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "55.625vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
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
    lineHeight: "1vw",
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      lineHeight: "4vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
      },
    },
  },
}))

export const LastNameField = styled(TextField)(() => ({
  width: "23.594vw",
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "84.375vw",
    margin: "4vw 0vw 1vw 0vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      height: "4.2vw",
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
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
    lineHeight: "1vw",
    "@media (max-width: 640px)": {
      lineHeight: "4vw",
      fontSize: "3.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.75vw",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const EmailField = styled(TextField)(() => ({
  width: "23.594vw",
  marginRight: "2vw",
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "@media (max-width: 640px)": {
    width: "84.375vw",
    margin: "0vw auto",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontWeight: 300,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    lineHeight: "1.75vw",
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      lineHeight: "4vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const PhoneNumberField = styled(TextField)(() => ({
  width: "18.4vw",
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  "@media (max-width: 640px)": {
    width: "61vw",
    margin: "auto",
  },
  "& .MuiInputBase-input ": {
    paddingLeft: "1.250vw",
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
      paddingLeft: "1vw",
    },
  },
  "& .MuiFormHelperText-root": {
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontSize: DesktopPxToVw(18),
  },
  "& .MuiInputLabel-root": {
    textOverflow: "ellipsis !important",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
    fontWeight: 300,
    paddingLeft: "1.7vw",
    opacity: 1,
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const PersonalDetailsNameContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: `${DesktopPxToVw(144)} ${DesktopPxToVw(269)}  1fr`,
  columnGap: DesktopPxToVw(40),
  alignItems: "start",
}))

export const TextFieldWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "baseline",
  marginBottom: "2vw",
}))

export const ErrorText = styled(Typography)(() => ({
  position: "absolute",
  bottom: "-26px",
  fontSize: DesktopPxToVw(16),
  fontWeight: 300,
  color: theme.palette.ihclPalette.hexTwentyOne,
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(18),
    bottom: "-24px",
  },
}))

export const AddressTextField: any = styled(TextField)(() => ({
  width: "49.271vw",
  "@media (max-width: 640px)": {
    width: "82vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.75vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontFamily: "Inter",
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
      },
    },
  },
}))

export const StyledTextField: any = styled(TextField)(() => ({
  width: "23.594vw",
  marginRight: "2vw",
  "@media (max-width: 640px)": {
    width: "40vw",
  },
  "& .MuiSelect-root": {
    marginTop: "4vw",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: "2.750vw !important",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontFamily: "Inter",
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
        lineHeight: "2.8vw",
      },
    },
  },
}))

export const GridWrapper = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}))

export const BoxWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: " center",
  margin: "0vw 0vw 1vw 0vw",
  alignItems: "baseline",
  "@media (max-width: 640px)": {
    margin: "2vw 0vw 1vw 0vw",
  },
}))

export const TextFieldContainer = styled(Box)(() => ({
  margin: "1vw 0vw 2vw 0vw",
}))

export const EmailHintText = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwelve,
  alignSelf: "start",
  marginTop: "1vw",
  fontFamily: "Inter",
  fontSize: DesktopPxToVw(16),
  "@media (max-width: 640px)": {
    fontSize: "2.5vw !important",
    margin: "0vw 0vw 5vw 7.4vw",
  },
}))

export const ConformEmailField = styled(TextField)<{ $value: boolean }>(({ $value }) => ({
  "& .Mui-error:before": {
    borderBottomColor: $value
      ? `${theme?.palette?.ihclPalette?.hexTen} !important`
      : `${theme?.palette?.ihclPalette?.hexTwenty} !important`,
  },
  "& .Mui-error:after": {
    borderBottomColor: $value
      ? `${theme?.palette?.ihclPalette?.hexTen} !important`
      : `${theme?.palette?.ihclPalette?.hexTwenty} !important`,
  },
  "& .Mui-disabled": {
    "&:before": {
      borderBottomStyle: "solid !important",
    },
  },
  width: "23.594vw",
  "@media (max-width: 640px)": {
    width: "84.375vw",
    margin: "4.688vw auto",
  },
  "& .MuiInputBase-input ": {
    fontFamily: "Inter",
    fontSize: DesktopPxToVw(24),
    "@media (max-width: 640px)": {
      fontSize: "3.750vw !important",
    },
  },
  "&  .MuiFormHelperText-root": {
    fontFamily: "Inter",
    color: theme?.palette?.ihclPalette?.hexThirtyTwo,
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
    lineHeight: "1.75vw",
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      lineHeight: "4vw",
    },
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
      fontWeight: 300,
      opacity: 1,
      fontFamily: "Inter",
      fontSize: DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: "3.750vw !important",
        lineHeight: "4.8vw",
      },
    },
  },
}))

export const EmailTextFieldWrapper = styled(Box)(() => ({
  justifyContent: "center",
  display: "flex",
}))

export const MobileNumberWrapper = styled(Box)<{ $marginProp?: boolean }>(({ $marginProp }) => ({
  display: "flex",
  alignSelf: "start",
  margin: $marginProp ? "1.6vw 0vw 0vw 0vw" : "1.6vw 0vw 3.8vw 0vw",
  alignItems: "self-end",
  "@media (max-width: 640px)": {
    margin: "auto auto 6vw auto",
    alignItems: "self-end",
  },
}))

export const ErrorTextTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexThirtyTwo,
  fontFamily: "Inter",
  fontWeight: 300,
  fontSize: DesktopPxToVw(18),
  "@media(max-width:640px)": {
    fontSize: MobilePxToVw(18),
  },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTen,
  alignSelf: "self-start",
  marginLeft: "19vw",
  marginBottom: "3vw",
}))

export const EmailTextWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const StyledInputLabel = styled(InputLabel)(() => ({
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  fontSize: DesktopPxToVw(24),
  fontWeight: 300,
  lineHeight: "1vw",
  "@media (max-width: 640px)": {
    fontSize: "3.45vw",
    lineHeight: "5vw",
  },
}))

export const MobileSalutationWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "4vw",
  marginLeft: "1vw",
  alignItems: "start",
}))
