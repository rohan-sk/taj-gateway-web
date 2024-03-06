import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import { Box, Grid, Paper, Stack, styled, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const SummaryContainer = styled(
  Box,
  transientProps
)<{ $padding: any }>(({ $padding }) => ({
  display: "flex",
  padding: $padding?.desktop,
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  "@media (max-width: 640px)": {
    padding: $padding?.mobile,
    top: "42.81vw",
  },
}))

export const SummaryTitle = styled(Typography)(() => ({
  paddingBottom: "1.4vw",
}))

export const GiftFlex = styled(Box)(() => ({
  display: "flex",
  gap: "12vw",
  padding: "1.4vw 0vw",
}))

export const ButtonContainer = styled(Typography)(() => ({
  display: "flex",
  gap: "1.04vw",
  paddingTop: DesktopPxToVw(60),
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "6.250vw",
    margin: "auto",
    width: "fit-content",
    paddingTop: MobilePxToVw(55),
    flexDirection: "column",
  },
}))

export const ShareButtonContainer = styled(Typography)(() => ({
  gap: "1.04vw",
  display: "flex",
  paddingTop: "2.08vw",
  alignItems: "center",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    paddingTop: "6.250vw",
  },
}))

export const StyledPaper: any = styled(Paper)(() => ({
  width: "100%",
  borderRadius: "0",
  padding: "0.260vw",

  "@media (max-width: 640px)": {
    padding: "0vw",
    width: "fit-content",
  },
}))

export const LabelValueTypography = styled(Typography)(() => ({
  marginTop: "0.521vw",

  "@media (max-width: 640px)": {
    marginTop: "1.563vw",
  },
}))

export const ColumnDirectionBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const GridItem = styled(Grid)(() => ({
  marginTop: "2.344vw",

  "@media (max-width: 640px)": {
    marginTop: "6.250vw",
  },
}))

export const CustomerDetailsWrapper = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  backgroundColor: theme?.palette?.background?.paper,
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(35),
  padding: $isMobile
    ? `${MobilePxToVw(40)} ${MobilePxToVw(20)}`
    : DesktopPxToVw(40),
}))

export const PurchaseOrderContentWrapper = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  justifyContent: "space-between",
  flexDirection: $isMobile ? "column" : "row",
  gap: $isMobile ? MobilePxToVw(20) : "unset",
  marginBottom: $isMobile ? "unset" : DesktopPxToVw(5),
}))

export const GiftCardSummeryFieldTitle = styled(
  Typography,
  transientProps,
)<{ $printPage: boolean; $isMobile: boolean; $downloadPagePDF: boolean }>(
  ({ $printPage, $isMobile, $downloadPagePDF }) => ({
    fontSize: $printPage
      ? $isMobile
        ? "1.8vw"
        : "1.458vw"
      : $downloadPagePDF
      ? $isMobile
        ? "2.3vw"
        : "1.46vw"
      : "auto",
  }),
)

export const GiftCardReceiverData = styled(
  Typography,
  transientProps,
)<{ $printPage: boolean; $isMobile: boolean; $downloadPagePDF: boolean }>(
  ({ $printPage, $isMobile, $downloadPagePDF }) => ({
    fontSize: $printPage ? ($isMobile ? "2vw" : "1.771vw") : $downloadPagePDF ? ($isMobile ? "3.2vw" : "2vw") : "auto",
  }),
)
