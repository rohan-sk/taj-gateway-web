import { theme } from "../../../lib/theme"
import { Box, Typography, styled } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const DescriptionTypography = styled(Typography, transientProps)<{ $mobile?: boolean }>(({ $mobile }) => ({
  textAlign: "center",
  maxWidth: $mobile ? "31.094vw" : "16.145vw",
  marginTop: "0.4166vw",
  "@media(max-width:640px)": {
    marginTop: "1.250vw",
  }
}))

export const MainBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  color: theme?.palette?.primary?.main,
}))
