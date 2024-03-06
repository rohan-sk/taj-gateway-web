import { Box } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { ComponentBox, DescriptionContainer } from "./styles/highlights-with-img"
import { useMobileCheck } from "../../utils/isMobilView"
const HighlightsDescriptionComponent = dynamic(() => import("./highlights-description.component"))

const CardWithRightAlignedHighlightsComponent = ({ props }: any) => {
  const CardImage = props[0]?.largeImage?.asset?._ref
  const isMobile = useMobileCheck()
  return (
    <>
      <ComponentBox>
        {CardImage && (
          <Box sx={{ width: isMobile ? "100%" : "45vw" }}>
            <Box
              alt={props?.[0]?.largeImage?.altText || "img"}
              component="img"
              src={CardImage && urlFor(CardImage).url()}
              sx={{
                objectFit: "fill",
                height: isMobile ? "100%" : "25vw",
              }}
            />
          </Box>
        )}
        <DescriptionContainer>
          <HighlightsDescriptionComponent
            title={props[0]?.title}
            subTitle={props[0]?.subTitle}
            primaryAction={props[0]?.primaryAction}
            content={props[0]?.content}
            highLights={props[0]?.highLights}
            description={props[0]?.description}
          />
        </DescriptionContainer>
      </ComponentBox>
    </>
  )
}

export default CardWithRightAlignedHighlightsComponent
