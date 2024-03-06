import styled from "@emotion/styled"
import { theme } from "../../lib/theme"
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
const whiteColor = theme?.palette?.neuPalette?.hexOne

export const MainBox = styled(Box)(() => ({
  position: "relative",
  background: theme?.palette?.neuPalette?.hexFive,
  borderTop: `0.052vw solid ${theme?.palette?.neuPalette?.hexFourteen}`,

  "@media (max-width: 640px)": {
    borderTop: `0.156vw solid ${theme?.palette?.neuPalette?.hexFourteen}`,
  },
}))

export const InnerBox = styled(Box)(() => ({
  padding: `${DesktopPxToVw(86)} ${DesktopPxToVw(240)} ${DesktopPxToVw(26)}`,
  "@media (max-width: 640px)": {
    padding: `${MobilePxToVw(90)} ${MobilePxToVw(82)} ${MobilePxToVw(34)}`,
  },
}))

export const LogoImageBox = styled(Box)(() => ({
  width: "5.83vw",
  height: "1.98vw",
  marginBottom: "2.96vw",

  "@media (max-width: 640px)": {
    width: "17.5vw",
    height: "5.93vw",
    marginBottom: "5.31vw",
  },
}))

export const InputFieldBox = styled(Box)(() => ({
  gap: DesktopPxToVw(21),
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  marginTop: DesktopPxToVw(36),
  "@media (max-width: 640px)": {
    gap: MobilePxToVw(11.5),
    marginTop: MobilePxToVw(26),
  },
}))

export const ErrorWrapper = styled(Box)(() => ({
  height: "1.8vw",
  "@media (max-width: 640px)": {
    height: "8.8vw",
  },
}))

export const FlexBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const FooterTagLine = styled(Typography)(() => ({
  opacity: "0.5",
  color: whiteColor,
  letterSpacing: "0.05em",
}))

export const CustomerSupportTypo = styled(Typography)(() => ({
  opacity: "0.5",
  color: whiteColor,
}))

export const SupportDetailsBox = styled(Box)(() => ({
  gap: "7.5vw",
  display: "flex",
  marginTop: "0.6vw",
  flexDirection: "row",

  "@media (max-width: 640px)": {
    justifyContent: "space-between",
  },
}))

export const CustomerNumberTypo = styled(Typography)(() => ({
  color: whiteColor,
  lineHeight: "150%",
  whiteSpace: "nowrap",
  "@media (max-width: 640px)": {
    padding: "1vw 0vw 0vw 0vw",
  },
}))

export const TollFreeTypo = styled(Typography)(() => ({
  color: whiteColor,
  lineHeight: "140%",

  "@media (max-width: 640px)": {
    lineHeight: "240%",
  },
}))

export const StyledButton = styled(Button)(() => ({
  // this button is hidden in web view
  letterSpacing: "2.2px",
  width: MobilePxToVw(475),
  height: `${MobilePxToVw(70)} !important`,
  "@media (max-width: 640px)": {
    marginTop: "6vw",
  },
}))

export const SupportMailTypo = styled(Typography)(() => ({
  padding: "0vw",
  color: whiteColor,
  fontWeight: 300,
  lineHeight: "150%",
}))

export const SocialIconsBox = styled(Box)(() => ({
  display: "flex",
  padding: "0vw",
  "@media (max-width: 640px)": {
    padding: "3.8125vw 0vw 8vw",
  },
}))

export const QuickLinksTitleTypo = styled(Typography)(() => ({
  opacity: "0.5",
  color: whiteColor,
  lineHeight: "150%",
  letterSpacing: "0.05em",
}))

export const QuickLinksTypo = styled(Typography)(() => ({
  color: whiteColor,
  cursor: "pointer",
  display: "inline",
  lineHeight: "150%",

  "@media (max-width: 640px)": {
    lineHeight: "250%",
  },
}))

export const CopyRightGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
}))

export const FooterTextField = styled(TextField)(() => ({
  width: "50%",
  "& input": {
    fontSize: "1.25vw",
    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
    },
  },
  "& .MuiInputLabel-root": {
    opacity: 0.5,
    fontWeight: 300,
    color: whiteColor,
    lineHeight: "150%",
    fontSize: "1.25vw",
    fontStyle: "normal",
    marginTop: "-0.677vw",
    letterSpacing: "-0.03em",

    "@media (max-width: 640px)": {
      fontSize: "3.75vw",
      lineHeight: "125%",
      marginTop: "-2.03vw",
    },
  },
  "& label.Mui-focused": {
    color: theme?.palette?.neuPalette?.hexSix,
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: theme?.palette?.neuPalette?.hexSix,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: whiteColor,
    },
  },

  "@media (max-width: 640px)": {
    width: "70%",
  },
}))

export const QrCodeImagesContainer = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "flex-start",
}))

export const QrCodeImageGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  paddingBottom: "3.125vw",
  alignItems: "flex-start",
}))

export const QrCodeImageBox = styled(Box)(() => ({
  width: "5.67vw",
  height: "5.67vw",
}))

export const QrCodeTitleTypo = styled(Typography)(() => ({
  opacity: "0.5",
  color: whiteColor,
  fontSize: "0.831vw",
  letterSpacing: "-0.029em",
}))

export const DownloadButtonBox = styled(Box)(() => ({
  gap: "4.21vw",
  display: "flex",
  marginTop: "7.65vw",
  justifyContent: "center",
}))

export const ButtonImageBox = styled(Box)(() => ({
  width: "32.95vw",
  height: "10.5vw",
}))

export const SocialIconsContainer = styled(Box)(() => ({
  display: "flex",
  gap: "1.563vw",
  width: "100%",
}))

export const SocialIconsGrid = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}))

export const BrandImagesGrid = styled(Grid)(() => ({
  display: "flex",
  padding: "2% 0",
  justifyContent: "space-around",
  alignItems: "center",
  "@media (max-width: 640px)": {
    padding: "0vw",
    rowGap: MobilePxToVw(42),
  },
}))

export const BrandImagesTopDivider = styled(Divider)(() => ({
  width: "100%",
  opacity: "0.4",
  height: "0.5px",
  margin: "1.979vw 0vw 2.396vw 0vw",
  background: theme?.palette?.neuPalette?.hexSeven,

  "@media (max-width: 640px)": {
    height: "0.156vw",
    margin: "11.16vw 0vw 6.56vw 0vw",
  },
}))

export const BrandImagesBottomDivider = styled(Divider)(() => ({
  height: "1%",
  width: "100%",
  opacity: "0.4",
  margin: "1.979vw 0vw 2.396vw 0vw",
  background: theme?.palette?.neuPalette?.hexSeven,

  "@media (max-width: 640px)": {
    height: "0.156vw",
    margin: "9.35vw 0vw 6.71vw 0vw",
  },
}))

export const CopyRightBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",

  "@media (max-width: 640px)": {
    justifyContent: "flex-start",
  },
}))

export const ColumnReverseBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    flexDirection: "column-reverse",
  },
}))

export const CopyRightLinksBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: DesktopPxToVw(14),

  "@media (max-width: 640px)": {
    marginBottom: MobilePxToVw(26),
  },
}))

export const CopyRightLinksTypo = styled(Typography)(() => ({
  color: whiteColor,
  cursor: "pointer",
  lineHeight: "150%",
  whiteSpace: "nowrap",
}))

export const CopyRightLinksDivider = styled(Divider)(() => ({
  opacity: "0.2",
  height: DesktopPxToVw(24),
  margin: `0 ${DesktopPxToVw(20)}`,
  backgroundColor: whiteColor,

  "@media (max-width: 640px)": {
    height: MobilePxToVw(24),
    margin: `0 ${MobilePxToVw(15)}`,
  },
}))

export const CopyRightLinksBottomDivider = styled(Divider)(() => ({
  opacity: "0.2",
  height: "0.156vw",
  backgroundColor: whiteColor,
  margin: "2.35vw 0vw 4.68vw 0vw",
}))

export const ScrollUpButtonBox = styled(Box)(() => ({
  left: "4.68vw",
  bottom: "3.5vw",
  display: "flex",
  width: "3.125vw",
  cursor: "pointer",
  padding: "0.90vw",
  height: "3.125vw",
  borderRadius: "50%",
  position: "absolute",
  background: "#2B2B26",
  justifyContent: "center",
  alignItems: "center",
}))

export const ScrollUpImageBox = styled(Box)(() => ({
  display: "grid",
  placeItems: "center",
  width: "1.04vw",
  height: "0.520vw",
}))

export const CTABox = styled(Box)(() => ({
  display: "flex",
  gap: "2vw",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    gap: "6vw",
  },
}))
