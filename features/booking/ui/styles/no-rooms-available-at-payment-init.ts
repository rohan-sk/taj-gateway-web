import { Button, Stack, styled } from "@mui/material"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainStack = styled(Stack)(() => ({
  margin: "0 auto",
  textAlign: "center",
  alignItems: "center",
  gap: DesktopPxToVw(40),
  width: DesktopPxToVw(946),
  padding: `${DesktopPxToVw(80)} 0`,
  background: theme.palette.background.default,

  "@media (max-width: 640px)": {
    width: "100%",
    margin: "auto 0",
    gap: MobilePxToVw(40),
    padding: `0 ${MobilePxToVw(82)}`,
  },
}))

export const ButtonsStack = styled(Stack)(() => ({
  flexDirection: "row",
  gap: DesktopPxToVw(20),

  "@media (max-width: 640px)": {
    gap: MobilePxToVw(20),
  },
}))

export const StyledButton = styled(Button)(() => ({
  width: DesktopPxToVw(179),

  "@media (max-width: 640px)": {
    width: MobilePxToVw(180),
  },
}))
