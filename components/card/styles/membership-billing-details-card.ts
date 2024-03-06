import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Grid, Stack, Divider, Accordion, TableCell, Typography, TableRow } from "@mui/material"

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: DesktopPxToVw(18),
  "@media (max-width:640px)": {
    fontSize: MobilePxToVw(18),
  },
}))

export const ButtonBoxStyle = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  gap: "1.042vw",
  letterSpacing: "0.1em",
  "@media (max-width:640px)": {
    gap: "3.125vw",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}))
export const ButtonBoxStyleEp = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  gap: "1.042vw",
  letterSpacing: "0.1em",
  "@media (max-width:640px)": {
    gap: "3.125vw",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}))
export const StyledSeperator = styled(
  Divider,
  transientProps,
)<{ $giftCardPaymentConfirmation: any }>(({ $giftCardPaymentConfirmation }) => ({
  width: "100%",
  height: DesktopPxToVw(4),
  marginBottom: $giftCardPaymentConfirmation ? DesktopPxToVw(20) : "4.688vw",
  borderBottom: `${DesktopPxToVw(3)} solid ${theme?.palette?.neuPalette?.hexSeventeen} !important`,
  "@media (max-width:640px)": {
    width: "100%",
    height: MobilePxToVw(2),
    marginBottom: $giftCardPaymentConfirmation ? MobilePxToVw(7) : "4.688vw",
    borderBottom: `${DesktopPxToVw(1)} solid ${theme?.palette?.neuPalette?.hexSeventeen} !important`,
  },
}))
export const CustomAccordianStyle = styled(Accordion)(() => ({
  boxShadow: "none",
  background: "inherit",
  width: "8.5vw",
  "@media (max-width:640px)": {
    width: "28vw",
  },
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-content.MuiAccordionSummary-contentGutters": {
    margin: 0,
  },
  "& .MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters": {
    minHeight: "unset",
  },
}))

export const FieldsGrid = styled(Grid)(() => ({
  alignItems: "center",
  marginBottom: "1.024vw",
  "@media (max-width:640px)": {
    marginBottom: "3.125vw",
  },
}))

export const MarginBox = styled(
  Box,
  transientProps,
)<{ $giftCardConfirmation?: boolean }>(({ $giftCardConfirmation }) => ({
  margin: $giftCardConfirmation ? `${DesktopPxToVw(60)} 0` : "3.125vw 1vw 2.10vw 1vw",
  "@media (max-width:640px)": {
    margin: $giftCardConfirmation ? `${MobilePxToVw(55)} 0` : "3.125vw 1vw 7.5vw 1vw",
  },
}))
export const SummaryTypography = styled(Box)(() => ({
  "@media (max-width:640px)": {
    fontWeight: 700,
    fontSize: "3.75vw",
    fontFamily: "Inter",
    lineHeight: "5.469vw",
  },
}))
export const GridRightTextAligner = styled(Grid)(() => ({
  textAlign: "end",
}))

export const TableCellHead = styled(
  TableCell,
  transientProps,
)<{ $isMobile?: boolean; printMode?: boolean; isPrintAction?: boolean; $isIos?: any }>(
  ({ $isMobile, isPrintAction, printMode, $isIos }) => ({
    padding: $isMobile ? `${MobilePxToVw(5)} ${MobilePxToVw(0)}` : `${DesktopPxToVw(5)} ${DesktopPxToVw(0)}`,
    backgroundColor: $isMobile ? "unset" : " rgba(224, 224, 224, 1)",
    width: "100%",
    fontWeight: "700",
    alignItems: "center",
    display: "flex",
    justifyItems: "center",
    paddingLeft: $isMobile ? "unset" : DesktopPxToVw(10),
    fontSize: printMode && isPrintAction ? "1.354vw" : $isMobile ? MobilePxToVw(18) : DesktopPxToVw(18),
  }),
)

export const TableCellHeadDownload = styled(
  TableCell,
  transientProps,
)<{ $isMobile?: boolean; printMode?: boolean; isPrintAction?: boolean; $isIos?: any }>(
  ({ $isMobile, isPrintAction, printMode, $isIos }) => ({
    padding: $isMobile ? `${MobilePxToVw(5)} ${MobilePxToVw(0)}` : `${DesktopPxToVw(5)} ${DesktopPxToVw(0)}`,
    backgroundColor: $isMobile ? "unset" : " rgba(224, 224, 224, 1)",
    width: "100%",
    fontWeight: "700",
    alignItems: "center",
    display: "flex",
    justifyItems: "center",
    paddingLeft: $isMobile ? "unset" : DesktopPxToVw(10),
  }),
)
export const TableCellBodyFirst = styled(
  TableCell,
  transientProps,
)<{ $isMobile?: boolean; printMode?: boolean; isPrintAction?: boolean; $comparativesItems: boolean }>(
  ({ $isMobile, isPrintAction, printMode, $comparativesItems }) => ({
    padding: `${DesktopPxToVw(10)} ${DesktopPxToVw(0)} ${DesktopPxToVw(1)} ${DesktopPxToVw(0)}`,
    fontSize: printMode && isPrintAction ? "1.354vw" : $isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
    minWidth: $isMobile ? MobilePxToVw(300) : isPrintAction ? "50%" : DesktopPxToVw(580),
    maxWidth: $isMobile ? MobilePxToVw(300) : isPrintAction ? "50%" : DesktopPxToVw(580),
    borderBottom: 0,
  }),
)

export const TableCellBodyFirstDownload = styled(
  TableCell,
  transientProps,
)<{ $isMobile?: boolean; printMode?: boolean; isPrintAction?: boolean; $comparativesItems: boolean }>(
  ({ $isMobile, isPrintAction, printMode, $comparativesItems }) => ({
    padding: `${DesktopPxToVw(10)} ${DesktopPxToVw(0)} ${DesktopPxToVw(1)} ${DesktopPxToVw(0)}`,
    width: $isMobile ? "50%" : $comparativesItems ? "17%" : "4px",
    fontSize: printMode && isPrintAction ? "1.354vw" : $isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
  }),
)

export const TableCellBodySecond = styled(
  TableCell,
  transientProps,
)<{ $isMobile?: boolean; $isPrintAction: boolean }>(({ $isMobile, $isPrintAction }) => ({
  padding: `${DesktopPxToVw(1)} ${DesktopPxToVw(0)}`,
  textAlign: "center",
  minWidth: $isMobile ? MobilePxToVw(130) : $isPrintAction ? "50%" : DesktopPxToVw(200),
  maxWidth: $isMobile ? MobilePxToVw(130) : $isPrintAction ? "50%" : DesktopPxToVw(200),
  borderBottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}))
export const EpicureCompBox = styled(Box)(() => ({
  display: "grid",
  textAlign: "center",
}))

export const GiftCardContentWrapper = styled(Grid)(() => ({
  alignItems: "center",
  marginBottom: DesktopPxToVw(20),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(20),
  },
}))

export const GiftCardContentTotalPriceWrapper = styled(Grid)(() => ({
  alignItems: "center",
  justifyContent: "space-between",
  margin: `${DesktopPxToVw(40)} 0 ${DesktopPxToVw(10)}`,
  "@media (max-width:640px)": {
    margin: `0 0 ${MobilePxToVw(20)}`,
  },
}))

export const GiftCardContentBottomDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: "100%",
  height: DesktopPxToVw(1),
  marginTop: $isMobile ? MobilePxToVw(90) : DesktopPxToVw(110),
}))

export const LoyaltyLeftSideImageContent = styled(Stack)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "unset",
  gap: DesktopPxToVw(47),
  "@media (max-width:640px)": {
    marginBottom: MobilePxToVw(34),
    gap: MobilePxToVw(40),
  },
}))
export const BoxTitleComp = styled(Box)(() => ({
  display: "grid",
}))

export const TypographyTitleComp = styled(Typography)(() => ({
  fontWeight: "400",
}))
export const TableRowEpicure = styled(
  TableRow,
  transientProps,
)<{ $isMobile?: boolean }>(({ $isMobile }) => ({
  padding: `${DesktopPxToVw(1)} ${DesktopPxToVw(0)}`,
  display: "flex",
  flexDirection: "row",
  columnGap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(40),
  borderBottom: `1px solid ${theme?.palette?.neuPalette?.hexSixteen}`,
}))

export const BoxTableHeadTitle = styled(
  Box,
  transientProps,
)<{ $isMobile?: boolean; printMode?: boolean; isPrintAction?: boolean; $isIos?: any }>(
  ({ $isMobile, $isIos, isPrintAction, printMode }) => ({
    fontSize: isPrintAction && printMode ? "1.354vw" : $isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
  }),
)

export const GiftcardActionButtonsWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
  letterSpacing: "0.1em",
  gap: DesktopPxToVw(20),
  marginTop: DesktopPxToVw(40),
  "& .MuiButtonBase-root": {
    padding: `${DesktopPxToVw(18)} ${DesktopPxToVw(36)}`,
    letterSpacing: DesktopPxToVw(1.6),
  },
  "@media (max-width:640px)": {
    flexWrap: "wrap",
    gap: MobilePxToVw(10),
    justifyContent: "center",
    marginTop: MobilePxToVw(35),
    "& .MuiButtonBase-root": {
      padding: `${MobilePxToVw(18)} ${MobilePxToVw(25)}`,
      letterSpacing: MobilePxToVw(1.6),
    },
  },
}))

export const GiftcardPrintActionButtonsWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  ".MuiButtonBase-root": {
    gap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(20),
    ".MuiBox-root": {
      width: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
      height: $isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
    },
  },
}))

export const EpicureBenefitsContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  overflowX: "auto",
  overflowY: "clip",
  "&::-webkit-scrollbar": {
    width: $isMobile ? MobilePxToVw(0) : DesktopPxToVw(4),
    height: $isMobile ? MobilePxToVw(4) : DesktopPxToVw(4),
  },
}))

export const EpicureBenefitsTitlesWrapper = styled(
  Stack,
  transientProps,
)<{ $isMobile: boolean; $isPrintAction: boolean }>(({ $isMobile, $isPrintAction }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: $isPrintAction ? "100%" : "fit-content",
  paddingBottom: DesktopPxToVw(14),
  columnGap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(40),
  borderBottom: $isMobile ? `${MobilePxToVw(2)} solid ${theme?.palette?.neuPalette?.hexTwo}` : "",
}))

export const TableCellBenefitsContent = styled(
  TableCell,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: 0,
  width: "100%",
  borderBottom: 0,
  display: "flex",
  flexDirection: "row",
  columnGap: $isMobile ? MobilePxToVw(10) : DesktopPxToVw(20),
}))
