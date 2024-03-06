import { Box, Divider, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import { transientProps } from "../../../utils/transientProps"

export const MainBox = styled(Box)(() => ({
  zIndex: 1,
  top: "5.521vw",
  display: "flex",
  position: "sticky",
  flexDirection: "column",
  color: theme?.palette?.text?.primary,
  animation: "500ms ease-in-out 0s normal none 1 running fadeInDown",
  border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
}))

export const CardBoxWrapper = styled(Box)(() => ({
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
}))

export const StyledDivider = styled(
  Divider,
  transientProps
)(() => ({
  background: theme?.palette?.neuPalette?.hexTwelve,
  "@media (max-width: 640px)": {
    height: "0.15625vw",
  },
}))

export const BoldTypography = styled(Typography)(() => ({
  fontWeight: 700,
}))
