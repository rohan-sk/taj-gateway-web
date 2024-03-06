import styled from "@emotion/styled"
import { theme } from "../../../lib/theme"
import { Typography } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const HeroTitleTypography = styled(
  Typography,
  transientProps,
)<{ $width?: any }>(({ $width }) => ({
  maxWidth: $width ?? "26vw",
  color: theme?.palette?.ihclPalette?.hexOne,
  "&:before": {
    content: '""',
    width: "4.166vw",
    display: "inline-block",
    verticalAlign: "middle",
    borderBottom: `0.0520vw solid${theme?.palette?.ihclPalette?.hexOne}`,
  },
  ":not(:empty)::before ": {
    marginRight: "2vw",
  },
}))
