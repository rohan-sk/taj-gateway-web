import { Box, Stack, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"

export const MainBox = styled(Box)(() => ({
  width: "50.208vw",
  padding: "4.167vw 0vw",
  background: theme.palette.ihclPalette.hexOne,
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
}))

export const InnerBox = styled(Box)(() => ({
  gap: "2.083vw",
  display: "flex",
  margin: "0 auto",
  maxWidth: "36.458vw",
  alignItems: "center",
  flexDirection: "column",
}))

export const CloseTextStack = styled(Stack)(() => ({
  gap: "1.042vw",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "1.563vw",
  justifyContent: "flex-end",
}))

export const ButtonsStack = styled(Stack)(() => ({
  gap: "2.083vw",
  flexDirection: "row",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    padding: "0vw 7.813vw ",
    flexDirection: "column",
  },
}))

export const MainStack = styled(Stack)(() => ({
  width: "100%",
  height: "100%",
  justifyContent: "space-between",
  padding: "4.688vw 0vw 7.813vw 0vw",
  background: theme.palette.ihclPalette.hexOne,
}))

export const ContentStack = styled(Stack)(() => ({
  gap: "3.125vw",
  alignItems: "center",
  margin: "0vw 11.719vw 16.6vw",
}))

export const LogoStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  margin: "0vw 8.438vw",
  justifyContent: "space-between",
}))
