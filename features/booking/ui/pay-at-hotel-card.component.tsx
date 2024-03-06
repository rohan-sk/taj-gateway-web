import React from "react"
import { Box, Divider, Stack } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"
import { PortableText } from "../../../lib/portable-text-serializers"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

const PayAtHotelCard = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <Box>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: isMobile ? "6.250vw" : "1.042vw ",
        }}>
        {props?.image?.asset?._ref && (
          <Box
            alt="lock icon"
            component="img"
            sx={{
              m: isMobile ? "0vw 1.563vw 0vw 0vw" : "0vw 0.521vw 0vw 0vw",
            }}
            height={isMobile ? MobilePxToVw(20) : DesktopPxToVw(19)}
            width={isMobile ? MobilePxToVw(20) : DesktopPxToVw(11)}
            src={urlFor(props?.image?.asset?._ref).url()}
          />
        )}
        <PortableText blocks={props?.singleContent} />
      </Stack>
      <Divider
        sx={{
          mt: isMobile ? MobilePxToVw(40) : DesktopPxToVw(30),
          background: theme?.palette?.neuPalette?.hexSixteen,
        }}
      />
    </Box>
  )
}

export default PayAtHotelCard
