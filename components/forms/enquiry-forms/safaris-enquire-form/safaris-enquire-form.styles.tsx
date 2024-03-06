import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material"
import { transientProps } from "../../../../utils/transientProps"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { Error_icon } from "../../gift-card-form/constants"

export const TitleContainer = styled(Stack)(() => ({
  textAlign: "center",
  justifyContent: "center",
  gap: DesktopPxToVw(40),
  flexDirection: "row",
  alignItems: "center",
  marginBottom: DesktopPxToVw(20),
  "@media (max-width:640px)": {
    gap: "0vw",
    marginBottom: MobilePxToVw(14),
  },
}))

export const StyledDivider = styled(Divider)(() => ({ height: "1px", background: theme?.palette?.ihclPalette?.hexOne }))
export const FieldsContainer = styled(
  Box,
  transientProps,
)<{ $columns: number; $webGridSize?: string }>(({ $columns, $webGridSize }) => ({
  display: "grid",
  width: "100%",
  justifyContent: "center",
  marginBottom: DesktopPxToVw(31),
  gridTemplateColumns: $webGridSize ? $webGridSize : `repeat(${$columns}, 1fr)`,
  columnGap: "2.03vw",
  "@media (max-width:640px)": {
    display: "flex",
    flexDirection: "column",
    gap: "6.25vw",
    marginBottom: MobilePxToVw(35),
  },
}))

export const ActionsContainer = styled(Stack)(() => ({
  flexDirection: "row",
  justifyContent: "center",
  gap: DesktopPxToVw(30),
  "@media (max-width:640px)": {
    gap: MobilePxToVw(20),
  },
}))
export const DatesContainer = styled(Box)(() => ({
  display: "grid",
  width: "100%",
  justifyContent: "center",
  marginBottom: DesktopPxToVw(31),
  gridTemplateColumns: `repeat(2, 1fr)`,
  columnGap: "2.03vw",
  "@media (max-width:640px)": {
    columnGap: MobilePxToVw(20),
    marginBottom: MobilePxToVw(35),
  },
}))
export const StyledFormControl = styled(FormControl)(() => ({
  width: "100%",
  textAlign: "start",
  fontFamily: "supreme",
  fontWeight: 300,
  fontSize: "1.25vw",
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },

  "&.Mui-disabled": {
    "&:before": {
      borderBottomStyle: "outset !important",
    },
  },
  "& .MuiSelect-select": {
    "&:focus": {
      backgroundColor: "transparent",
    },
  },
  "& .MuiSvgIcon-root": {
    color: theme?.palette?.ihclPalette?.TwentyNine,
  },
  "& label": {
    transform: "scale(1) translate(0, 0em)",
    textAlign: "start",
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    paddingRight: "1.25vw",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      transform: "scale(1) translate(0, 0em)",
      paddingRight: "3.75vw",
    },
    "&.Mui-focused, &.MuiInputLabel-shrink": {
      transform: "scale(1) translate(0, 0em)",
    },
  },
  "& input": {
    WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexThree} inset !important`,
    WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexOne} !important`,
  },
  "& .MuiInputBase-root": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& label+div": {
    margin: "0vw",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },

  "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
    minHeight: "unset",
    textAlign: "start",
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    lineHeight: "140%",
    "@media (max-width:640px)": {
      fontSize: "3.75vw",
      lineHeight: "140%",
    },
  },
}))

export const MainContainer = styled(Box)(() => ({
  width: "100%",
  background: theme?.palette?.ihclPalette?.hexThree,
  padding: `${DesktopPxToVw(80)} ${DesktopPxToVw(123)}`,
  boxShadow: `-6px 10px 24px 0px rgba(0, 0, 0, 0.10)`,
  "@media (max-width:640px)": {
    padding: `${MobilePxToVw(55)} ${MobilePxToVw(27)}`,
  },
}))

export const InputTextField = styled(TextField)(() => ({
  width: "100%",
  height: "2.083vw",
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before, &::after": {
      borderColor: `${theme?.palette?.ihclPalette?.hexOne} !important`,
    },
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },

  "& input, & textarea": {
    padding: "0vw",
    background: `${theme?.palette?.ihclPalette?.hexThree} !important`,
    WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexThree} inset !important`,
    WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexOne} !important`,
    "&::placeholder": {
      opacity: 1,
    },
  },
  "& label": {
    zIndex: "1",
    transform: "scale(1) translate(0, 0em)",
  },
  "&, & input": {
    height: "2.083vw",
    "@media (max-width:640px)": {
      height: "6.25vw",
    },
  },
  "& input, & label, & input::placeholder, & textarea, & textarea::placeholder": {
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    color: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "supreme",
      fontWeight: 300,
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "supreme",
    fontWeight: 300,
    color: `${theme?.palette?.ihclPalette?.hexThirtyTwo} !important`,
    fontSize: `${DesktopPxToVw(18)}!important`,
    "@media (max-width:640px)": {
      fontSize: "2.8vw!important",
    },
  },
  "label + .MuiInputBase-root.MuiInput-root ": {
    marginTop: "0vw",
  },
  "& .MuiInputLabel-shrink.MuiInputLabel-standard": {
    color: theme?.palette?.ihclPalette?.hexOne,
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },
  "& .MuiInputLabel-shrink": {
    color: theme?.palette?.ihclPalette?.hexOne,
    transform: "scale(0.75) translate(0, -1.2em)",
  },
}))

export const TextAreaField = styled(TextField)(() => ({
  width: "100%",
  "& .MuiInputBase-root.MuiInput-root": {
    "&::before, &::after": {
      borderColor: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
    },
    "&::before": {
      borderBottomStyle: "solid!important",
    },
  },

  "& input, & textarea": {
    padding: "0vw",
    lineHeight: "140%",
    letterSpacing: "0.05em",
    WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexThree} inset !important`,
    WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexTwentyNine} !important`,
    "&::placeholder": {
      opacity: 1,
    },
  },
  "& label": {
    zIndex: "1",
    transform: "scale(1) translate(0, 0em)",
  },

  "& input, & label, & input::placeholder, & textarea, & textarea::placeholder": {
    fontFamily: "supreme",
    fontWeight: 300,
    fontSize: "1.25vw",
    color: theme?.palette?.ihclPalette?.hexTwentyNine,
    opacity: 1,
    "@media (max-width:640px)": {
      fontFamily: "supreme",
      fontWeight: 300,
      fontSize: "3.75vw",
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "supreme",
    fontWeight: 300,
    color: theme?.palette?.ihclPalette?.hexTwentyOne,
    fontSize: `${DesktopPxToVw(18)}!important`,
    "@media (max-width:640px)": {
      fontSize: "2.8vw!important",
    },
  },
  "label + .MuiInputBase-root.MuiInput-root ": {
    marginTop: "0vw",
  },
  "& .MuiInputLabel-shrink.MuiInputLabel-standard": {
    color: theme?.palette?.ihclPalette?.hexTwentyNine,
    transition:
      "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
  },
  "& .MuiInputLabel-shrink": {
    color: theme?.palette?.ihclPalette?.TwentyNine,
    transform: "scale(0.75) translate(0, -1.2em)",
  },
}))

export const ErrorIconComponent = () => {
  return (
    <InputAdornment position="end">
      <Box
        component="img"
        src={Error_icon}
        sx={{
          width: DesktopPxToVw(24),
          "@media(max-width:640px)": {
            width: MobilePxToVw(24),
          },
        }}
        alt="Expand Image"
      />
    </InputAdornment>
  )
}
export const CheckBoxesContainer = styled(Stack)(() => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: DesktopPxToVw(60),
  "@media (max-width:640px)": {
    gap: MobilePxToVw(57),
  },
}))

export const CheckBoxCell = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "start",
  "& input": {
    WebkitBoxShadow: `0 0 0 50px ${theme?.palette?.ihclPalette?.hexThree} inset !important`,
    WebkitTextFillColor: `${theme?.palette?.ihclPalette?.hexOne} !important`,
  },
  "& span": {
    backgroundImage: "unset",
  },
}))

export const StyledTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexOne,
}))

export const ContentTypography = styled(Typography)(() => ({
  color: theme?.palette?.ihclPalette?.hexTwentyNine,
}))

export const StyledLabel = styled(InputLabel)(() => ({
  fontFamily: "supreme",
  fontSize: "1.25vw",
  fontStyle: "normal",
  fontWeight: 300,
  lineHeight: "150%",
  color: theme?.palette?.ihclPalette?.hexTwentyOne,
  "@media (max-width:640px)": {
    fontSize: "3.75vw",
  },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
  fontWeight: 300,
  fontSize: "0.938vw",
  fontFamily: "supreme",
  color: theme?.palette?.ihclPalette?.hexSeventeen,
  padding: "0.417vw 0vw 0.417vw 2.083vw",
  "@media (max-width:640px)": {
    fontWeight: 300,
    fontSize: "2.813vw",
    padding: "1.563vw 0vw 1.563vw 3.125vw",
    color: theme?.palette?.ihclPalette?.hexSeventeen,
  },
}))
