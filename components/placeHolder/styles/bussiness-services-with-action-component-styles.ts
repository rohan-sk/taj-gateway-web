import { Box, TextField, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"
import { theme } from "../../../lib/theme"

export const TitleWithSingleActionContainer = styled(
  Box,
  transientProps
)<{ $borderBottom: any }>(({ $borderBottom }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: $borderBottom ? "5.73vw 0vw 4.17vw" : "4.17vw 0vw 5.73vw",
  borderBottom: $borderBottom ? "0.05vw solid rgb(255, 255, 255 ,0.3)" : "",
  "@media (max-width: 640px)": {
    padding: $borderBottom
      ? "14.063vw 0vw 12.344vw"
      : "10.938vw 10.156vw 13.125vw",
  },
}))

export const TitleContainerTypographyBox = styled(Box)(() => ({
  marginBottom: "2.604vw",
  "@media (max-width: 640px)": {
    textAlign: "center",
    marginBottom: "6.25vw",
  },
}))

export const ParameterMapContainerBox = styled(Box)(() => ({
  display: "flex",
  gap: "2.083vw",
  "@media (max-width: 640px)": { flexDirection: "column" },
}))

export const ParameterMapTextField = styled(TextField)(() => ({
  paddingBottom: "1.823vw",
  input: {
    "&::placeholder": {
      opacity: 0.8,
      fontWeight: 300,
      fontSize: "1.25vw",
      lineHeight: "150%",
      fontFamily: "Inter",
      textOverflow: "ellipsis !important",
      color: theme?.palette?.neuPalette?.hexOne,
    },
  },
  "@media (max-width: 640px)": {
    paddingBottom: "6.25vw",
    input: {
      "&::placeholder": {
        fontSize: "3.750vw",
      },
    },
  },
}))
