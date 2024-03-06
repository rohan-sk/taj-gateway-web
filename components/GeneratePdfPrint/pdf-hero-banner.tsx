import React from "react"
import { theme } from "../../lib/theme"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Divider, Stack, Typography } from "@mui/material"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { BottomGradientBox } from "../banner/styles"
import { ICONS } from "../constants"

const PDFHeroBanner = ({ imgUrl, title, ...rest }: any) => {
  const isMobile = useMobileCheck()
  const { isIos } = useBrowserCheck()
  return (
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "auto" : DesktopPxToVw(780),
      }}>
      <BottomGradientBox $isIos={isIos}
        $gradient={theme?.palette?.neuPalette?.linearGradientBottom} />
      <Box
        sx={{
          position: "absolute",
          left: isMobile ? MobilePxToVw(10) : DesktopPxToVw(80),
          bottom: isMobile ? 0 : DesktopPxToVw(46),
        }}>
        <Box component={"h2"}>
          <Stack
            columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(40)}
            direction={"row"}
            alignItems={"center"}>
            <Divider
              sx={{
                background: theme?.palette?.neuPalette?.hexOne,
                borderColor: theme?.palette?.neuPalette?.hexOne,
                width: isMobile ? MobilePxToVw(40) : DesktopPxToVw(80),
                height: isMobile ? MobilePxToVw(2) : DesktopPxToVw(2),
              }}
            />
            <Typography
              color={theme?.palette?.neuPalette?.hexOne}
              component={"span"}
              sx={{
                fontFamily: theme?.palette?.font?.primaryFontFamily,
                fontSize: isMobile || isIos ? "1.625rem" : DesktopPxToVw(80),
                fontWeight: 400,
                lineHeight: isMobile ? "140%" : DesktopPxToVw(88),
                letterSpacing: "-0.05em",
              }}>
              {title}
            </Typography>
          </Stack>
        </Box>
      </Box>
      <Box
        loading="lazy"
        component={"img"}
        alt="hotel img"
        width={"100%"}
        src={imgUrl}
        height={isMobile || isIos ? "24.375rem" : DesktopPxToVw(780)}
      />
    </Box>
  )
}

export default PDFHeroBanner

export const PrintTajLogo = () => {
  const isMobile = useMobileCheck()
  const { isIos } = useBrowserCheck()
  return (
    <Box
      loading="lazy"
      component="img"
      src={ICONS?.TAJ_GOLD_LOGO}
      alt="TAJ-LOGO"
      width={isMobile ? "6.25rem" : DesktopPxToVw(100)}
      height={isMobile ? "5.5rem" : DesktopPxToVw(88)}
      sx={{
        marginBottom: isMobile ? MobilePxToVw(20) : isIos ? "20px" : DesktopPxToVw(40),
      }}
    />
  )
}
