import styled from "@emotion/styled"
import { Divider, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { fonts, theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"

export const BookAStayCardComponentBox = styled(
  Box,
  transientProps
)<{ $mobile?: boolean }>(({ $mobile }) => ({
  display: "flex",
  flexDirection: "column",
  padding: $mobile ? "8.594vw 12.813vw" : "3.125vw 0",
  alignItems: "center",
  columnGap: $mobile ? MobilePxToVw(24) : DesktopPxToVw(32),
  backgroundColor: theme?.palette?.background?.paper,
}))

export const BookAStayCardTitleBox = styled(
  Box,
  transientProps
)<{ $mobile: boolean }>(({ $mobile }) => ({
  display: "flex",
  alignItems: "center",
  columnGap: $mobile ? MobilePxToVw(12) : DesktopPxToVw(20),
}))

export const BookAStayCardTitleDivider = styled(Divider)(() => ({
  height: "2%",
  width: "2.083vw",
  background: theme?.palette?.neuPalette?.hexSeventeen,
}))

export const BookAStayCardParameterMapBox = styled(
  Box,
  transientProps
)<{ $mobile?: boolean }>(({ $mobile }) => ({
  display: "flex",
  gap: "2.083vw",
  paddingTop: $mobile ? "7.5vw" : "3.125vw",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "flex-end",
  flexDirection: $mobile ? "column" : "row",
}))

export const ParameterBox = styled(
  Box,
  transientProps
)<{ $mobile?: boolean }>(({ $mobile }) => ({
  display: "grid",
  columnGap: "2.083vw",
  alignItems: "end",
  marginTop: "3.125vw",
  marginBottom: "2.083vw",
  gridTemplateColumns: "17.708vw 1fr 17.708vw",
  "@media (max-width:640px)": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "6.25vw",
    marginTop: "7.5vw",
    marginBottom: "6.25vw",
  },
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
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  input: {
    "&::placeholder": {
      opacity: 1,
      fontWeight: 300,
      lineHeight: "150%",
      fontStyle: "normal",
      fontFamily: "Inter",
      fontSize: $isMobile
        ? `${MobilePxToVw(24)} !important`
        : "1.25vw !important",
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
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  input: {
    fontSize: $isMobile ? "3.750vw" : "1.25vw",
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

export const GuestRoomCounterContainer = styled(Box)(() => ({
  position: "relative",
  "&>div": {
    background: `${theme?.palette?.background?.default}!important`,
    zIndex: "1",
    "@media (max-width:640px)": {
      right: "-4.8vw",
    },
  },
}))

export const StyledDownArrowIcon = styled(KeyboardArrowDownOutlined)(() => ({
  width: "1.5vw",
  "@media (max-width:640px)": {
    width: MobilePxToVw(24),
  },
}))

export const GuestCountFieldContainer = styled(Box)(() => ({
  width: "17.708vw",
  "@media (max-width:640px)": {
    width: "100%",
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

export const AccessCodeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "24.010vw",
  "& input": {
    height: "2.083vw",
    width: "100%",
  },
  "@media (max-width: 640px)": {
    width: "100%",
    "& input": {
      height: "6.25vw",
    },
  },
}))
export const CouponCodeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "24.010vw",
  "& input": {
    height: "2.083vw",
    width: "100%",
  },
  "@media (max-width: 640px)": {
    width: "100%",
    "& input": {
      height: "6.25vw",
    },
  },
}))

export const AgencyIdContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "24.010vw",
  "& input": {
    height: "2.083vw",
    width: "100%",
  },
  "@media (max-width: 640px)": {
    width: "100%",
    "& input": {
      height: "6.25vw",
    },
  },
}))

export const AccessCodeSection = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))
export const AgencyIdSection = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))
export const CouponCodeSection = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}))
export const ErrorMessageContainer = styled(Box)(() => ({
  position: "relative",
}))

export const ErrorDisplayTypography = styled(Typography)(() => ({
  position: "absolute",
  color: theme?.palette?.neuPalette?.hexTwentyOne,
  fontSize: DesktopPxToVw(18),
  alignSelf: "self-start",
  "@media (max-width: 640px)": {
    fontSize: "2.45vw",
  },
}))
