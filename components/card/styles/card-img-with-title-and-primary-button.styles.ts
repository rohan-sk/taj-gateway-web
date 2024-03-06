import { Box, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const CardActionContainer = styled(
  Box,
  transientProps
)<{ $isTwoLiner: boolean; $isDynamic: boolean | undefined }>(
  ({ $isTwoLiner, $isDynamic }) => ({
    display: "flex",
    rowGap: DesktopPxToVw(12),
    marginTop: DesktopPxToVw(33),
    justifyContent: "space-between",
    alignItems: $isTwoLiner ? "center" : "baseline",
    flexDirection: "row",

    "@media (max-width:640px)": {
      flexDirection: $isDynamic ? "row" : "column",
      alignItems: "flex-start",

      marginTop: MobilePxToVw(20),
      rowGap: MobilePxToVw(20),
    },
  })
)
