import React from "react"
import { Box, Typography, styled } from "@mui/material"
import { useMobileCheck } from "./isMobilView"
import { theme } from "../lib/theme"
import CloseIcon from "@mui/icons-material/Close"
import DesktopPxToVw, { MobilePxToVw } from "./DesktopFontCalc"
import { ICONS } from "../components/constants"
import { transientProps } from "./transientProps"

export const Wrapper = styled(
  Box,
  transientProps
)<{ lat: number; lng: number }>(({ lat, lng }) => ({
  position: "relative",
  width: DesktopPxToVw(23),
  height: DesktopPxToVw(34),
  backgroundImage: `url(${ICONS?.MARKER_MAP_ICON})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  "-webkit-user-select": "none",
  "-moz-user-select": "none",
  "-ms-user-select": "none",
  "-webkit-transform": "translate(-50%, -50%)",
  "-ms-transform": "translate(-50%, -50%)",
  transform: "translate(-50%, -50%)",
  cursor: "grab",
  "@media (max-width: 640px)": {
    width: MobilePxToVw(23),
    height: MobilePxToVw(34),
  },
}))

const Marker = ({
  text,
  onClick,
  lat,
  lng,
  showToolTip,
  setShowToolTip,
}: any) => {
  const isMobile = useMobileCheck()
  const handleCloseClick = (e: any) => {
    e.stopPropagation()
    setShowToolTip(false)
  }
  return (
    <>
      <Wrapper onClick={onClick} lat={lat} lng={lng} />
      <Box
        width={isMobile ? MobilePxToVw(319) : DesktopPxToVw(319)}
        display={showToolTip && text ? "flex" : "none"}
        position={"absolute"}
        flexDirection={"row"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        sx={{
          padding: isMobile ? "2.031vw 1.563vw 3.906vw" : "10px",
          borderRadius: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
          bottom: isMobile ? MobilePxToVw(10) : DesktopPxToVw(10),
          backgroundColor: theme?.palette?.background?.default,
          "-webkit-user-select": "none",
          "-moz-user-select": "none",
          "-ms-user-select": "none",
          "-webkit-transform": "translate(-50%, -50%)",
          "-ms-transform": "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
          "& ::before": {
            content: "''",
            width: isMobile ? MobilePxToVw(13) : DesktopPxToVw(13),
            height: isMobile ? MobilePxToVw(13) : DesktopPxToVw(13),
            position: "absolute",
            bottom: isMobile ? `-${MobilePxToVw(10)}` : `-${DesktopPxToVw(10)}`,
            left: "50%",
            transform: "rotate(45deg) translateX(-50%)",
            backgroundColor: theme?.palette?.background?.default,
            whiteSpace: "nowrap",
          },
        }}>
        <Typography variant={isMobile ? "m-body-xxs" : "body-xxxs"}>
          {text}
        </Typography>
        <CloseIcon
          cursor={"pointer"}
          fontSize="small"
          onClick={handleCloseClick}></CloseIcon>
      </Box>
    </>
  )
}

export default Marker
