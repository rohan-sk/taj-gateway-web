import styled from "@emotion/styled"
import { Autocomplete, Divider, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { fonts, theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const BookAStayCardComponentBox = styled(
  Box,
  transientProps,
)<{ $mobile: boolean; $isOffersCard?: boolean }>(({ $mobile, $isOffersCard }) => ({
  display: "flex",
  flexDirection: "column",
  padding: $mobile ? "8.594vw 12.813vw" : $isOffersCard ? "auto" : "3.125vw 6.094vw",
  alignItems: "center",
  columnGap: $mobile ? MobilePxToVw(24) : DesktopPxToVw(32),
  backgroundColor: $isOffersCard ? "transparent" : theme?.palette?.background?.paper,
}))

export const BookAStayCardTitleBox = styled(
  Box,
  transientProps,
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: $mobile ? MobilePxToVw(12) : DesktopPxToVw(20),
  marginBottom: $mobile ? "8.594vw" : "3.125vw",
}))

export const DatePickerContainer = styled(Box)(() => ({
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
  height: "fit-content",
  width: DesktopPxToVw(434),
  "& .MuiStack-root": {
    columnGap: DesktopPxToVw(32),
    "@media (max-width:640px)": {
      columnGap: MobilePxToVw(32),
    },
  },
  "& button": {
    padding: "0vw",
  },
  paddingBottom: DesktopPxToVw(8),
  "@media (max-width:640px)": {
    width: "100%",
    paddingBottom: MobilePxToVw(8),
    "& span": {
      "&>div": {
        width: "100%",
      },
    },
  },
}))

export const FieldsContainer = styled(Box)(() => ({
  display: "grid",
  gridTemplateColumns: "17.708vw 1fr 17.708vw",
  columnGap: "2.083vw",
  alignItems: "end",
  "@media (max-width:640px)": {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: "6.25vw",
  },
}))

export const BookAStayCardTitleDivider = styled(Divider)(() => ({
  height: "2%",
  width: "2.083vw",
  background: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const BookAStayCardParameterMapBox = styled(
  Box,
  transientProps,
)<{ $mobile?: boolean }>(({ $mobile }) => ({
  display: "flex",
  gap: "2.083vw",
  paddingTop: $mobile ? "7.5vw" : "3.125vw",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-end",
  flexDirection: $mobile ? "column" : "row",
}))

export const BookAStayCardParameterMapTextField = styled(TextField)(() => ({
  width: "17.188vw",
  input: {
    "&::placeholder": {
      fontWeight: 300,
      fontSize: "1.25vw",
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.neuPalette?.hexTwelve,
      borderBottom: `0.05vw solid ${theme?.palette?.neuPalette?.hexOne}`,
    },
  },
}))

export const CheckInAndOutLabelTextField = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      fontSize: $isMobile ? `${MobilePxToVw(24)} !important` : "1.25vw !important",
      color: theme?.palette?.neuPalette?.hexSeventeen,
    },
  },
}))

export const RoomDropdownTextField = styled(TextField)(() => ({
  width: "18.958vw",
  input: {
    "&::placeholder": {
      fontWeight: 300,
      fontSize: "1.25vw",
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      color: theme?.palette?.neuPalette?.hexSeventeen,
      borderBottom: `0.05vw solid ${theme?.palette?.neuPalette?.hexOne}`,
    },
  },
}))

export const HorizontalDivider = styled(Divider)(() => ({
  opacity: 0.5,
  width: "1.56vw",
  margin: "2vw 2.52vw -0.833vw -1.48vw",
  background: theme?.palette?.neuPalette?.hexTwelve,
}))

export const CouponCodeTextField = styled(
  TextField,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      fontSize: $isMobile ? "3.750vw" : "1.25vw",
      color: `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
    },
  },
}))

export const GuestRoomContainer = styled(Box)(() => ({
  position: "relative",
  "&>div": {
    background: theme?.palette?.background?.default,
    padding: "1vw",
    boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
    zIndex: "1",
    "@media (max-width:640px)": {
      height: "50vw",
      width: "75vw",
      padding: "1.563vw 3.125vw 0vw",
    },
  },
}))

export const LocalizationProviderBox = styled(Box)(() => ({
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  minWidth: `15.185vw`,
  justifyContent: "space-around",
  "@media (max-width:640px)": {
    gap: "11.313vw",
    marginRight: "1.563vw",
    height: "6.25vw",
    "& input": {
      fontSize: MobilePxToVw(24),
    },
    "& .MuiDateRangePickerInput-root": {
      flexShrink: 1,
      width: "100%",
      height: "6.25vw",
      display: "flex",
      justifyContent: "space-evenly",
      flexDirection: "row",
      "& .MuiInputBase-root": {
        marginTop: "0vw",
      },

      "& .MuiBox-root": {
        justifyContent: "space-evenly",
        width: "100%",
        height: "6.25vw",
        display: "flex",
        alignItems: "center",
        "& .MuiFormControl-root": {
          width: "100%!important",
        },
        "&>*": {
          width: "fit-content!important",
          marginTop: "0vw",
          height: "6.25vw",
          alignItems: "center",
          fontSize: MobilePxToVw(24),
          fontWeight: "300",
          fontFamily: fonts?.body,
          "&>*": {
            height: "6.25vw",
            width: "100%",
            textAlign: "start",
            transform: "unset",
            transition: "unset",
          },
          "&:nth-last-child(1)": {
            "& *": {
              textAlign: "end",
            },
          },
        },
        "& hr": {
          height: "2px!important",
          flexShrink: 0,
          width: "5.391vw!important",
        },
      },
    },
  },
}))

export const AutoCompleteInput = styled(TextField)(() => ({
  "& .MuiInputLabel-root": {
    opacity: 1,
    fontWeight: "300 !important",
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.neuPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(24),
    },
  },
  "& .Mui-error": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
  },
  "& .MuiInput-input": {
    fontWeight: "300 !important",
    color: theme?.palette?.neuPalette?.hexSeventeen,
    fontSize: DesktopPxToVw(24),
  },
  paddingTop: "0.2vw",
  "&  .MuiFormHelperText-root": {
    color: theme?.palette?.neuPalette?.hexTwentyOne,
    fontSize: DesktopPxToVw(18),
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(18),
    },
  },
  "& .MuiInputBase-root": {
    alignItems: "baseline",
  },
  "& .Mui-disabled:before": {
    borderBottomStyle: "solid",
  },
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      fontWeight: 300,
      opacity: 1,
      fontSize: DesktopPxToVw(24),
      color: theme?.palette?.neuPalette?.hexSeventeen,
    },
  },
  "@media (max-width: 640px)": {
    paddingBottom: "0vw",
    "& .MuiInput-input": {
      fontSize: MobilePxToVw(24),
    },
    input: {
      "&::placeholder": {
        fontSize: MobilePxToVw(24),
      },
    },
  },
}))

export const StyledPaper = styled(Paper)(() => ({
  backgroundColor: theme?.palette?.background.default,
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  borderRadius: 0,
}))

export const OptionTypography = styled(Typography)(() => ({
  paddingLeft: "2.083vw!important",
  fontWeight: "300",
  margin: "1.042vw 0vw 1.042vw",
}))

export const ColumnBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const StyledAutocomplete = styled(Autocomplete)(() => ({
  width: "100%",
  "& .MuiAutocomplete-inputRoot": {
    paddingRight: "0vw!important",
  },
}))
export const DefaultStyledAutocomplete = styled(Autocomplete)(() => ({}))
export const PackageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "3.125vw",
  width: "100%",
  justifyContent: "center",
}))
