import React from "react"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, Divider, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useAesthetics } from "../../../utils/fetchAsthetics"

const HeroBannerMultiLineTitle = (props: any) => {
  const { textColor } = useAesthetics(props?.aesthetic?._ref)
  const isMobile = useMobileCheck()
  const bannerTitleColor = textColor
    ? textColor
    : props?.aesthetic?.titleColor?.hex
    ? props?.aesthetic?.titleColor?.hex
    : theme?.palette?.ihclPalette?.hexOne
  const title = isMobile ? props?.title?.mobileTitle || props?.title?.desktopTitle : props?.title?.desktopTitle

  return (
    <Box component={props?.headingElement || "h2"} sx={{ marginBlockEnd: "0vw" }}>
      {title?.length > 0 &&
        title?.map((title: string, index: number) => (
          <Stack
            key={index}
            columnGap={index === 0 ? (isMobile ? MobilePxToVw(20) : DesktopPxToVw(40)) : "0"}
            direction={index === 0 ? "row" : "column"}
            alignItems={index === 0 ? "center" : "flex-start"}>
            {index === 0 && (
              <Divider
                sx={{
                  background: bannerTitleColor,
                  borderColor: bannerTitleColor,
                  width: isMobile ? "12.500vw" : "4.167vw",
                  height: isMobile ? "0.156vw" : "0.055vw",
                }}
              />
            )}
            <Typography
              color={bannerTitleColor}
              lineHeight={"120%"}
              whiteSpace={"nowrap"}
              component={"span"}
              variant={isMobile ? "m-heading-l" : "heading-l"}>
              {title}{" "}
            </Typography>
          </Stack>
        ))}
    </Box>
  )
}

export default HeroBannerMultiLineTitle
