import { Box, Stack, Typography, styled } from "@mui/material"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

export const ModalBox = styled(Box)(() => ({
  top: "50%",
  left: "50%",
  width: "fit-content",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
}))

export const MainBox = styled(Box)(() => ({
  display: "flex",
  width: "49.271vw",
  margin: "0vw auto",
  background: "#fff",
  height: "25.990vw",
  alignItems: "center",
  flexDirection: "column",
  padding: "5.521vw 0vw 4.271vw 0vw",
  "@media (max-width: 640px)": {
    width: "100vw",
    height: "100vh",
    textAlign: "center",
    padding: `0 ${MobilePxToVw(60)}`,
    justifyContent: "center",
  },
}))

export const RightImage: any = styled(Box)(() => ({
  width: "3.646vw",
  height: "3.646vw",
  marginBottom: "1.667vw",

  "@media (max-width: 640px)": {
    width: "10.938vw",
    height: "10.938vw",
    marginBottom: "7.344vw",
  },
}))

export const ButtonsStack = styled(Stack)(() => ({
  gap: "2.083vw",
  flexDirection: "row",
  marginTop: "2.448vw",

  "@media (max-width: 640px)": {
    gap: "3.125vw",
    marginTop: "7.344vw",
    flexDirection: "column",
  },
}))

export const CloseCTAStack = styled(Stack)(() => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: "1.563vw",
  justifyContent: "flex-end",
}))

export const CloseCTATypography = styled(Typography)(() => ({
  cursor: "pointer",
  fontWeight: "bold",
}))

export const CloseCTAImage: any = styled(Box)(() => ({
  width: "0.938vw",
  height: "0.938vw",
  cursor: "pointer",
  marginLeft: "1.016vw",
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
