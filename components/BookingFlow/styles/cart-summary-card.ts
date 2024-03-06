import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { ArrowLeft } from "@mui/icons-material"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const MainBox = styled(Box)(() => ({
  zIndex: 1,
  top: "5.521vw",
  display: "flex",
  position: "sticky",
  flexDirection: "column",
  color: theme?.palette?.text?.primary,
  animation: "500ms ease-in-out 0s normal none 1 running fadeInDown",
}))

export const TimerWrapper = styled(Box)(() => ({
  textAlign: "right",
  display: "flex",
  flexDirection: "column",
}))

export const GuestDetailsBox = styled(Box)(() => ({
  display: "flex",
  margin: "0.416vw 0vw",
}))

export const BoldTypo = styled(Typography)(() => ({
  fontWeight: 700,
}))

export const StyledDivider = styled(Divider)(() => ({
  background: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    height: "0.15625vw",
  },
}))

export const GreyDivider = styled(Divider)(() => ({
  background: theme?.palette?.neuPalette?.hexSixteen,
  "@media (max-width: 640px)": {
    height: DesktopPxToVw(1),
  },
}))

export const PriceDetailsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}))

export const RowGapStack = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const AccordionBox = styled(Box)(() => ({
  display: "flex",
  position: "relative",
  padding: "0vw 1.04vw",
  flexDirection: "column",
}))

export const FlexBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const ColumnStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  rowGap: $isMobile ? MobilePxToVw(18) : DesktopPxToVw(20),
}))

export const CartColumnStack = styled(
  Stack,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  rowGap: $isMobile ? MobilePxToVw(8) : DesktopPxToVw(8),
}))

export const TaxLabelBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}))

export const GrayColorTypo = styled(Typography)(() => ({
  color: theme?.palette?.neuPalette?.hexTwelve,
  paddingTop: DesktopPxToVw(10),
  fontSize: DesktopPxToVw(16),
}))

export const BlockTypography = styled(Typography)(() => ({
  whiteSpace: "nowrap",
}))

export const CtaLAbleTypo = styled(Typography)(() => ({
  fontWeight: 300,
  cursor: "pointer",
  fontSize: "0.833vw",
}))

export const HighLightedBorderBox = styled(Box)(() => ({
  zIndex: -1,
  left: 0,
  width: "100%",
  height: "100%",
  position: "absolute",
  border: `0.10vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
}))

export const StyledLeftArrow = styled(ArrowLeft)(() => ({
  zIndex: 1,
  top: "34%",
  left: "-14px",
  position: "absolute",
  color: theme?.palette?.neuPalette?.hexTwo,
}))

export const SelectedRoomTypography = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "0.83vw",
}))

export const ChangeRoomsTypography = styled(Typography)(() => ({
  fontWeight: 300,
  fontSize: "0.834vw",
}))

export const RoomTaxDetailsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
}))

export const RoomTaxDetailTitleWrapper = styled(Stack)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
  rowGap: DesktopPxToVw(5),
}))

export const RoomPriceDetailsWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  rowGap: DesktopPxToVw(5),
  "@media (max-width: 640px)": {
    rowGap: MobilePxToVw(10),
  },
}))
