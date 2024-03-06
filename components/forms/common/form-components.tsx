import { Box, InputAdornment } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Error_icon } from "../gift-card-form/constants"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { theme } from "../../../lib/theme"

export const FormErrorIcon = () => (
  <InputAdornment position="end">
    <Box
      sx={{
        height: "auto",
        width: DesktopPxToVw(24),
        "@media (max-width:640px)": {
          width: MobilePxToVw(24),
        },
      }}
      component="img"
      src={Error_icon}
      alt="Expand Image"
    />
  </InputAdornment>
)

export const FormSelectArrowIcon = ({ sx = {}, ...rest }: any) => {
  return (
    <KeyboardArrowDownIcon
      {...rest}
      sx={{
        color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
        width: DesktopPxToVw(30),
        "@media (max-width:640px)": {
          width: MobilePxToVw(24),
        },
        ...sx,
      }}
    />
  )
}
export const StyledArrowIcon = ({ toggle, styles }: any) => {
  return (
    <KeyboardArrowDownIcon
      sx={{
        color: `${theme?.palette?.ihclPalette?.hexSeventeen}`,
        width: DesktopPxToVw(30),
        height: DesktopPxToVw(24),
        transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
        "@media (max-width:640px)": {
          width: MobilePxToVw(24),
          height: MobilePxToVw(24),
        },

        ...styles,
      }}
    />
  )
}

export const FormMenuProps = {
  PaperProps: {
    elevation: 0,
    sx: {
      maxHeight: 200,
      backgroundColor: theme?.palette?.background?.default,
      borderRadius: "0",
      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
    },
  },
}
