import { Box, styled } from "@mui/material"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  gap: "1.50vw",
  display: "flex",
  width: "49.271vw",
  margin: "0vw auto",
  background: "#fff",
  alignItems: "center",
  padding: "4.167vw 12vw",
  flexDirection: "column",
  "@media (max-width: 640px)": {
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    padding: `0 ${MobilePxToVw(74)}`
  },
}))

export const AbsoluteBox = styled(Box)(() => ({
  position: "unset",
  top: "unset",
  "@media (max-width: 640px)": {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  },
}))
