import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  TextField,
  styled,
} from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"
import { theme } from "../../../../lib/theme"

export const WrapperBox = styled(
  Box,
  transientProps
)<{ $gap: string }>(({ $gap }) => ({
  gap: $gap,
  display: "flex",
  alignItems: "center",
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(20),
    width: "100%",
    justifyContent: "center",
  },
}))

export const StyledButton = styled(
  Button,
  transientProps
)<{ $active: boolean; $width?: string }>(({ $active, $width }) => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
  backgroundColor: $active
    ? theme?.palette?.neuPalette?.hexTwo
    : theme?.palette?.neuPalette?.hexOne,
  color: $active
    ? theme?.palette?.neuPalette?.hexOne
    : theme?.palette?.neuPalette?.hexTwo,
  height: "2.604vw",
  width: $width ?? $width,
  "&:hover": {
    backgroundColor: $active
      ? theme?.palette?.neuPalette?.hexTwo
      : theme?.palette?.neuPalette?.hexOne,
    color: $active
      ? theme?.palette?.neuPalette?.hexOne
      : theme?.palette?.neuPalette?.hexTwo,
  },
  fontWeight: "300 !important",
  "@media (max-width: 640px)": {
    height: "9.394vw",
    padding: "3.125vw 2.578vw",
    width: "50%",
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
    width: "100%",
    "&  .MuiFormHelperText-root": {
      fontSize: MobilePxToVw(18),
    },

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

export const BorderBox = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  padding: "2.084vw 1.57vw",
  "@media (max-width: 640px)": {
    padding: "8.6vw 5vw",
  },
}))

export const ClaimSuccessBox = styled(BorderBox)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  flexDirection: "column",
}))
export const TitleTickWrapper = styled(Box)(() => ({
  margin: "auto",
  textAlign: "center",
  marginBottom: DesktopPxToVw(0),
  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(20),
  },
}))

export const FormControlText = styled(FormControlLabel)(() => ({
  "& .MuiFormControlLabel-label": {
    fontSize: DesktopPxToVw(24),
    color: theme?.palette?.neuPalette?.hexSeventeen,
    "@media (max-width: 640px)": {
      fontSize: MobilePxToVw(22),
    },
  },
}))

export const CustomRadio = styled(Radio)(() => ({
  ".MuiSvgIcon-root": {
    fontSize: "1.345vw !important",
  },
  "&, &.Mui-checked": {
    color: theme?.palette?.neuPalette?.hexTwo,
  },
  "@media (max-width: 640px)": {
    ".MuiSvgIcon-root": {
      fontSize: "4.125vw !important",
    },
  },
}))

export const TitleContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  columnGap: DesktopPxToVw(30),
  flexWrap: "wrap",
  justifyContent: "unset",
  "@media (max-width: 640px)": {
    fontSize: MobilePxToVw(24),
    justifyContent: "center",
  },
}))

export const FileUploadBox: any = styled(Box)(() => ({
  backgroundColor: theme?.palette?.background?.paper,
  marginLeft: DesktopPxToVw(40),
  border: `2px dashed ${theme?.palette?.neuPalette?.hexTwelve}`,
  cursor: "pointer",
}))

export const FileFlexBox: any = styled(Box)(() => ({
  padding: "2.08vw 1.04vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  cursor: "pointer",
  "@media (max-width: 640px)": {
    padding: "6.25vw 3.125vw",
    textAlign: "center",
  },
}))

export const DropContainer: any = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1vw",
}))

export const DocumentContainer: any = styled(Box)(() => ({
  border: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
  borderRadius: DesktopPxToVw(6),
  display: "flex",
  justifyContent: "space-between",
  columnGap: "1.04vw",
  padding: "1.05vw 2.08vw",
  margin: "1.05vw 0vw",
  marginLeft: DesktopPxToVw(40),
  alignItems: "center",
  "@media (max-width: 640px)": {
    padding: "3.125vw 3.125vw",
    margin: "3.125vw 0vw",
    marginLeft: "1.944vw",
    objectFit: "contain",
    width: "100%",
  },
}))
