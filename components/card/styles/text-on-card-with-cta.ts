import styled from "@emotion/styled"
import { Box, positions } from "@mui/system"
import { theme } from "../../../lib/theme"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { transientProps } from "../../../utils/transientProps"

export const GridContainer: any = styled(Box)(() => ({
  textAlign: "center",
  position: "relative",
}))
export const BoxContainer: any = styled(Box)(() => ({
  position: "relative",
}))
export const ContentBox: any = styled(Box)(() => ({
  backgroundColor: theme?.palette?.neuPalette?.hexOne,
  opacity: "0.9",
  position: "absolute",
  top: "7.813vw",
  right: "3.125vw",
  padding: "4.17vw 3.15vw 3.65vw 3.15vw",
  maxWidth: "30.052vw",
  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
  "@media (max-width: 640px)": {
    maxWidth: "74.375vw",
    height: "fit-content",
    padding: "7.969vw 9.375vw",
    bottom: "9.844vw",
    top: "0vw",
    left: "50%",
    right: "unset",
    transform: "translateX(-50%)",
    boxShadow: "unset",
    position: "inherit",
  },
}))

export const StyledKeyboardArrowDownIcon = styled(KeyboardArrowDownIcon)(
  () => ({
    lineHeight: "1.3125vw",
    position: "absolute",
    fontWeight: 400,
    color: theme?.palette?.neuPalette?.hexTwo,
    paddingTop: "2vw",
  })
)
