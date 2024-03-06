import styled from "@emotion/styled"
import { Box } from "@mui/system"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { transientProps } from "../../../../utils/transientProps"
import { Grid } from "@mui/material"

export const Aminity = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-start",
  gap: "0.938vw",
  "@media (max-width:640px)": {
    gap: "2.813vw",
  },
}))

export const FilterContainer: any = styled(
  Grid,
  transientProps
)<{ $isMobile: boolean; $margin: string; $filterAlignment: string }>(
  ({ $isMobile, $margin, $filterAlignment }) => ({
    display: "flex",
    flexWrap: "wrap",
    flexDirection: $isMobile ? "column" : "row",
    alignItems: $isMobile
      ? "center"
      : $filterAlignment?.toLowerCase() === "center"
      ? "flex-end"
      : "flex-start",
    justifyContent: $isMobile
      ? "center"
      : $filterAlignment?.toLowerCase() === "end"
      ? "flex-end"
      : $filterAlignment?.toLowerCase() === "center"
      ? "space-between"
      : "flex-start",
    width: "100%",
    marginBottom: $margin ? $margin : $isMobile ? "7.031vw" : "3.118vw",
    // marginTop: $margin ? $margin : $isMobile ? "7.031vw" : "3.4vw",
    marginRight: $filterAlignment?.toLowerCase() === "end" ? "0" : "auto",
  })
)

export const ActionBtnContainer = styled(
  Box,
  transientProps
)<{ $isMobile: boolean; $restaurants: boolean }>(
  ({ $isMobile, $restaurants }) => ({
    display: "flex",
    width: "100%",
    marginBottom: DesktopPxToVw(0),
    padding: $isMobile ? "2.656vw 4.688vw" : "",
    justifyContent: $restaurants ? "flex-end" : "space-between",
  })
)
