import styled from "@emotion/styled"
import { Box, Card } from "@mui/material"
import { transientProps } from "../../../utils/transientProps"

export const StyledCard = styled(
  Card,
  transientProps
)<{ $mediaType: string; $bgColor: string }>(({ $mediaType, $bgColor }) => ({
  display: "flex",
  boxShadow: "none",
  flexDirection: "row",
  "&.MuiCard-root": { borderRadius: "0" },
  backgroundColor: $bgColor,
  padding:  "0vw 12.5vw",

  "@media (max-width: 640px)": {
    padding: "14.05vw 9vw",
    flexDirection: "column",
  },
}))

export const VideoBox = styled(Box)(() => ({
  width: "144vw",

  "@media (max-width: 640px)": {
    width: "100%",
    height: "100%",
  },
}))

export const CardContentParentBox = styled(Box)(() => ({
  gap: "1.6vw",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "6.3405vw",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "2.5vw",
    paddingLeft: "0vw",
  },
}))

export const CardContentInnerBox = styled(Box)(() => ({
  gap: "0.85vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  "@media (max-width: 640px)": {
    gap: "2.85vw",
  },
}))

export const ActionContentBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",

  "@media (max-width: 640px)": {
    flexDirection: "row-reverse",
  },
}))
