import { theme } from "../../../lib/theme"
import AlbumIcon from "@mui/icons-material/Album"
import { transientProps } from "../../../utils/transientProps"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Grid, styled, Stepper, Divider, StepConnector, stepConnectorClasses } from "@mui/material"

export const OrderStatusWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  padding: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
  backgroundColor: theme?.palette?.background?.paper,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
}))

export const HorizontalDivider = styled(
  Divider,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  marginTop: $isMobile ? MobilePxToVw(30) : "unset",
  backgroundColor: `${theme?.palette?.ihclPalette?.hexSixteen} !important`,
}))

export const OrderNumberContainer = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  gap: $isMobile ? MobilePxToVw(10) : "unset",
  padding: $isMobile ? `${MobilePxToVw(20)} 0vw ${MobilePxToVw(30)}` : `${DesktopPxToVw(20)} 0vw`,
}))

export const OrderNumberWrapper = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  gap: $isMobile ? MobilePxToVw(5) : DesktopPxToVw(5),
  alignItems: "baseline",
}))

export const TrackingNumberWrapper = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "baseline",
  gap: $isMobile ? MobilePxToVw(5) : DesktopPxToVw(5),
}))

export const DueDateWrapper = styled(
  Grid,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(5) : DesktopPxToVw(5),
  justifyContent: $isMobile ? "flex-start" : "flex-end",
}))

export const StepperSeparatorContentContainer = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: $isMobile ? "row" : "column",
}))

export const StepperSeparatorContentWrapper = styled(
  Stepper,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  justifyContent: "center",
  flexDirection: $isMobile ? "column" : "unset",
  padding: $isMobile ? `0vw ${MobilePxToVw(40)} 0vw 0vw` : `${DesktopPxToVw(40)} 0vw ${DesktopPxToVw(20)}`,
  rowGap: $isMobile ? MobilePxToVw(74) : "unset",
}))

export const CheckCircleOutlineIconWrapper = styled(
  CheckCircleOutlineIcon,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  color: theme?.palette?.ihclPalette?.hexTwo,
  width: $isMobile ? MobilePxToVw(32) : DesktopPxToVw(32),
  height: $isMobile ? MobilePxToVw(32) : DesktopPxToVw(32),
}))

export const AlbumIconWrapper = styled(
  AlbumIcon,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  width: $isMobile ? MobilePxToVw(32) : DesktopPxToVw(32),
  height: $isMobile ? MobilePxToVw(32) : DesktopPxToVw(32),
}))

export const StepperContentWrapper = styled(
  Stepper,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  flexDirection: $isMobile ? "column" : "unset",
  justifyContent: $isMobile ? "space-between" : "center",
}))

export const OrderStatusContentWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  border: $isMobile ? "unset" : `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
  padding: $isMobile ? `0vw ${MobilePxToVw(32)}` : `${DesktopPxToVw(80)} 0vw`,
}))

export const OrderStatusDescriptionWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  padding: $isMobile ? `0vw 0vw ${MobilePxToVw(35)}` : `0vw ${DesktopPxToVw(267)} ${DesktopPxToVw(18)}`,
}))

export const OrderStatusActionPropsWrapper = styled(
  Box,
  transientProps,
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: $isMobile ? MobilePxToVw(27) : DesktopPxToVw(40),
  marginTop: $isMobile ? MobilePxToVw(55) : "unset",
}))

export const StatusStepConnectorWrapper = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    left: `calc(-50% + ${DesktopPxToVw(16)})`,
    right: `calc(50% + ${DesktopPxToVw(16)})`,
    top: DesktopPxToVw(16),
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme?.palette?.ihclPalette?.hexTwo,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme?.palette?.ihclPalette?.hexTwo,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme?.palette?.ihclPalette?.hexSixteen,
    borderTopWidth: DesktopPxToVw(1),
    borderRadius: DesktopPxToVw(1),
  },
  "@media (max-width: 640px)": {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: `-${MobilePxToVw(80)}`,
      left: "calc(-50% + 20px)",
      right: "calc(50% + 20px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme?.palette?.ihclPalette?.hexTwo,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme?.palette?.ihclPalette?.hexTwo,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      minHeight: `${MobilePxToVw(80)}`,
      borderColor: theme?.palette?.ihclPalette?.hexSixteen,
    },
  },
  "@media (max-width: 540px)and (min-width: 421px)": {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      left: "calc(7%)",
      right: "calc(0%)",
    },
  },
  "@media (max-width: 420px)": {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      left: "calc(-10%)",
      right: "calc(0%)",
    },
  },
  "@media (max-width: 300px)": {
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      left: "calc(-30%)",
    },
  },
}))
