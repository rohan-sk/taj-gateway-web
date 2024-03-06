import styled from "@emotion/styled"
import { Box } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const CardWithImgContentBox = styled(
  Box,
  transientProps
)<{ $parentProps: any }>(({ $parentProps }) => ({
  display: "flex",
  flexDirection: $parentProps % 2 ? "column-reverse" : "column",
  justifyContent: "center",
}))
