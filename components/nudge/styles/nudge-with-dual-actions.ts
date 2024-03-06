import { Box, styled } from "@mui/system"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const NudgeBox = styled(
  Box,
  transientProps
)<{ $giftCardConfirmation: any }>(({ $giftCardConfirmation }) => ({
  display: "flex",
  gap: DesktopPxToVw(40),
  justifyContent: "center",
  "@media (max-width: 640px)": {
    gap: "6.250vw",
    paddingBottom: "0vw",
    flexDirection: $giftCardConfirmation ? "column" : "row",
  },
  alignItems: "center",
}))
export const NudgeContainer = styled(
  Box,
  transientProps
)<{ $margin: any }>(({ $margin }) => ({
  gap: DesktopPxToVw(50),
  justifyContent: "center",
  padding: $margin?.desktop,
  "@media (max-width: 640px)": {
    gap: "6.250vw",
    paddingBottom: "0vw",
    padding: $margin?.mobile,
  },
}))

export const ShareIconContentWrapper = styled(
  Box,
  transientProps
)<{ $isMobile: boolean }>(({ $isMobile }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: $isMobile ? MobilePxToVw(20) : DesktopPxToVw(20),
  marginTop: $isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
}))
