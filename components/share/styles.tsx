import { theme } from "../../lib/theme"
import ClearIcon from "@mui/icons-material/Clear"
import { Box, ButtonBase, Divider, styled, TextField, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { transientProps } from "../../utils/transientProps"

export const ParentBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: "0.521vw 11.5vw 0.521vw 12.5vw",

  "@media (max-width: 640px)": {
    padding: "2.8vw 5.625vw 1vw 12.5vw",
  },
}))

export const InnerBox = styled(Box)(() => ({
  minWidth: "17.70vw",
  borderRadius: "0vw",
  padding: "1.04vw 1.04vw 0 1.04vw",
  backgroundColor: "transparent",

  "@media (max-width: 640px)": {
    minWidth: "70.625vw",
    padding: "3.43vw 0vw 0vw 3.5vw",
  },
}))

export const SharePopUpMainBox = styled(Box)(() => ({
  zIndex: 1,
  maxWidth: "23.54vw",
  maxHeight: "23.43vw",
  position: "absolute",
  padding: "1.14vw 1.04vw 1.82vw 1.71vw",
  boxShadow: "-0.31vw 0.52vw 1.25vw rgba(0, 0, 0, 0.1)",
  backgroundColor: theme?.palette?.ihclPalette?.hexOne,

  "@media (max-width: 640px)": {
    right: "5.8vw",
    minWidth: "70.625vw",
    maxHeight: "70.625vw",
    padding: "3.43vw 3.125vw 5.46vw 4.84vw",
  },
}))

export const HotelInfoBox = styled(Box)(() => ({
  gap: "0.99vw",
  display: "flex",
  padding: "0.675vw 0",
  flexDirection: "row",
  marginRight: "0.68vw",
  "@media (max-width: 640px)": {
    gap: "2.97vw",
    padding: "2.03vw 0",
  },
}))
export const HotelImageBox = styled(Box)(() => ({
  width: "5.93vw",
  height: "4.16vw",

  "@media (max-width: 640px)": {
    width: "17.8vw",
    height: "12.5vw",
  },
}))

export const HotelNameBox = styled(Box)(() => ({
  gap: "0.416vw",
  display: "flex",
  flexDirection: "column",

  "@media (max-width: 640px)": {
    gap: "1.25vw",
    justifyContent: "center",
  },
}))

export const HotelLinkTypo = styled(Typography)(() => ({
  opacity: 0.6,
  color: theme?.palette?.primary?.main,
}))

export const SocialContentMainBox = styled(Box)(() => ({
  padding: "0.78vw 0vw 1vw 0vw",

  "@media (max-width: 640px)": {
    padding: "2.34vw 0vw 4.68vw 0vw",
  },
}))

export const SocialIconsBox = styled(Box)(() => ({
  display: "flex",
  width: "3.125vw",
  height: "3.125vw",
  cursor: "pointer",
  textAlign: "center",
  alignItems: "center",
  borderRadius: "2.6vw",
  justifyContent: "center",
  border: `0.05vw solid ${theme?.palette?.primary?.main}`,

  "@media (max-width: 640px)": {
    width: "9.375vw",
    height: "9.375vw",
    borderRadius: "7.8125vw",
    border: `0.157vw solid ${theme?.palette?.primary?.main}`,
  },
}))

export const ShareSocialImagesData = styled(Box)(() => ({
  gap: "1.04vw",
  display: "flex",
  paddingTop: "0.5vw",
  flexDirection: "row",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    paddingTop: "2.18vw",
  },
}))

export const SocialShareBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  padding: "0.52vw 0vw 0.625vw 0vw",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    padding: "1.56vw 0vw 2.5vw 0vw",
  },
}))

export const ShareTheProductTitle = styled(Typography)(() => ({
  letterSpacing: "-0.05em",
  color: theme?.palette?.primary?.main,
}))

export const CopyTextBox = styled(Box)(() => ({
  gap: "0.625vw",
  display: "flex",
  flexDirection: "column",

  "@media (max-width: 640px)": {
    gap: "1.875vw",
  },
}))

export const StyledButton = styled(ButtonBase)(() => ({
  minWidth: "5.88vw",
  minHeight: "2.55vw",
  backgroundColor: theme?.palette?.primary?.main,
  "&:hover": {
    backgroundColor: theme?.palette?.primary?.main,
  },
  letterSpacing: "0.052vw",
  color: theme?.palette?.ihclPalette?.hexOne,

  "@media (max-width: 640px)": {
    minHeight: "7.65vw",
    minWidth: "17.65vw",
    letterSpacing: "0.156vw",
  },
}))

export const StyledTextField = styled(TextField)(() => ({
  marginRight: "0.68vw",
  "& fieldset": { border: "none", padding: "0vw" },
  backgroundColor: theme?.palette?.ihclPalette?.hexSix,

  "@media (max-width: 640px)": {
    marginRight: "2.03vw",
  },
}))

export const ShareTextBox = styled(Box)(() => ({
  gap: "0.52vw",
  display: "flex",
  alignItems: "center",
  paddingTop: DesktopPxToVw(11),
  "@media (max-width: 640px)": {
    gap: "2vw",
    paddingTop: "2.813vw",
  },
}))

export const ShareImgBox = styled(Box)(() => ({
  width: "0.9vw",
  height: "0.7vw",
  display: "flex",

  "@media (max-width: 640px)": {
    width: "4.51vw",
    height: "3.15vw",
  },
}))

export const StyledClearIconBox = styled(Box)(() => ({
  position: "relative",
  cursor: "pointer",
}))

export const StyledClearIcon = styled(ClearIcon)(() => ({
  zIndex: 1,
  right: "0vw",
  opacity: 0.4,
  cursor: "pointer",
  position: "absolute",
  "@media (max-width: 640px)": {
    marginTop: "0vw",
  },
}))

export const StyledDivider = styled(Divider)(() => ({
  opacity: 0.3,
  height: "0.052vw",
  backgroundColor: theme?.palette?.primary?.main,

  "@media (max-width: 640px)": {
    height: "0.156vw",
  },
}))

export const ShareTitleTypography = styled(Typography)(() => ({
  fontWeight: 700,
  cursor: "pointer",
  lineHeight: "1.3vw",
  letterSpacing: "0.1em",
}))

export const BreadCrumbsTypography = styled(
  Typography,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  lineHeight: "140%",
  opacity: "0.7",
  textTransform: "capitalize",
  fontSize: $isMobile ? MobilePxToVw(21) : DesktopPxToVw(18),
}))

export const BreadcrumbsWrappingBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
}))

export const PageTitleShare: any = styled(Typography)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": "2",
  "-webkit-box-orient": "vertical",
}))
