import { theme } from "../../../lib/theme"
import { TextField, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const CustomTextFieldStyled = styled(
  TextField,
  transientProps,
)<{ $fontSize?: number; $helperTextFontSize?: number; $fontWeight?: number; $labelFontSize?: number }>(
  ({ $fontSize, $helperTextFontSize, $fontWeight, $labelFontSize }) => ({
    "& .MuiInputBase-root": {
      marginTop: "18px",
      fontSize: $fontSize ? $fontSize : DesktopPxToVw(24),
      fontWeight: $fontWeight ? $fontWeight : 300,
    },
    "& .Mui-disabled": {
      "&:before": {
        borderBottomStyle: "solid !important",
      },
    },
    "& .MuiInputLabel-root": {
      opacity: 1,
      fontWeight: "300 !important",
      fontSize: $labelFontSize ? $labelFontSize : $fontSize ? $fontSize : DesktopPxToVw(24),
      "@media (max-width: 640px)": {
        fontSize: $labelFontSize ? $labelFontSize : $fontSize ? $fontSize : MobilePxToVw(24),
      },
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },
    "& .Mui-error": {
      color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      ":after": {
        color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
        borderBottom: `2px solid ${theme?.palette?.ihclPalette?.hexThirtyTwo}!important`,
      },
      ":before": {
        color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
        borderBottomColor: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
      },
    },
    "& .MuiInput-input": {
      fontSize: $fontSize ? $fontSize : DesktopPxToVw(24),
      fontWeight: "300 !important",
      color: theme?.palette?.ihclPalette?.hexSeventeen,
    },

    "& .MuiFormHelperText-root": {
      fontSize: $helperTextFontSize ? $helperTextFontSize : DesktopPxToVw(18),
      lineHeight: "140%",
    },

    input: {
      "&::placeholder": {
        opacity: 1,
        fontWeight: "300 !important",
        fontSize: $fontSize ? $fontSize : DesktopPxToVw(24),
        textOverflow: "ellipsis !important",
        color: theme?.palette?.ihclPalette?.hexSeventeen,
      },
    },

    "@media (max-width: 640px)": {
      width: "100%",
      "&  .MuiFormHelperText-root": {
        fontSize: $helperTextFontSize ? $helperTextFontSize : MobilePxToVw(18),
      },
      "& .MuiInput-input": {
        fontSize: $fontSize ? $fontSize : "3.750vw",
      },
      input: {
        "&::placeholder": {
          textOverflow: "ellipsis !important",
          fontWeight: 300,
          opacity: 1,
          fontSize: $fontSize ? $fontSize : "3.750vw",
        },
      },
    },
    ".MuiFormLabel-root": {
      color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
      ".MuiFormLabel-asterisk": {
        color: `${theme?.palette?.ihclPalette?.hexSeventeen} !important`,
      },
    },
  }),
)
