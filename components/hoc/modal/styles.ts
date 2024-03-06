import { Box, styled } from "@mui/material"
import { CloseSharp } from "@mui/icons-material"
import { transientProps } from "../../../utils/transientProps"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const MainBox = styled(Box)(() => ({
  position: "absolute",
  outline: "none !important",
  "::-webkit-scrollbar": {
    width: "20px",
  },

  "@media(max-width: 600px)": {
    "::-webkit-scrollbar": {
      display: "none",
    },
  },

  "::-webkit-scrollbar-thumb": {
    borderRadius: "16px",
    backgroundColor: "#656263",
    border: "8px solid #FFFFFF",
  },
  " &:focus-visible": {
    outline: "-webkit-focus-ring-color auto 0px",
  },
}))

export const CloseButtonBox = styled(Box)(() => ({
  right: "19%",
  display: "flex",
  alignItems: "center",
  position: "relative",
  marginBottom: "0.78vw",
  justifyContent: "flex-end",
}))

export const InnerBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}))

export const StyledCloseIcon = styled(CloseSharp)(() => ({
  width: "0.93vw",
  height: "0.93vw",
  marginLeft: "0.98vw",

  "@media (max-width: 640px)": {
    top: 0,
    right: 0,
    zIndex: 1,
    width: "6.42vw",
    height: "6.22vw",
    // position: "absolute",
    // margin: "10.5vw 9.3vw",
  },
}))

export const LogoBox = styled(
  Box,
  transientProps
)<{ $isMyAccountCheck?: boolean }>(({ $isMyAccountCheck }) => ({
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  padding: $isMyAccountCheck
    ? `${MobilePxToVw(35)} ${MobilePxToVw(59)} ${MobilePxToVw(
        0
      )} ${MobilePxToVw(54)}`
    : "5vw 9.3vw",
  justifyContent: "space-between",
}))
