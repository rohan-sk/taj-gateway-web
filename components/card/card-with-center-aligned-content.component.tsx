import React from "react"
import { urlFor } from "../../lib-sanity"
import { Box, Typography } from "@mui/material"
import { DescriptionTypography, MainBox } from "./styles/card-with-center-aligned-title"
import { useMobileCheck } from "../../utils/isMobilView"

const CardWithCenterAlignedTitle = (props: any) => {
  const isMobile = useMobileCheck()

  return (
    <MainBox className="package-image-container">
      {(props?.largeImage?.asset?._ref || props?.image?.asset?._ref) && (
        <Box>
          <Box
            alt={(isMobile ? props?.image?.altText : props?.largeImage?.altText) || "img"}
            component="img"
            width={props?.renderOriginalWidthImage ? "null" : "100%"}
            height={"100%"}
            src={urlFor(
              isMobile
                ? props?.image?.asset?._ref
                : props?.largeImage?.asset?._ref
            ).url()}
            className="package-images"
          />
        </Box>
      )}
      {props?.title && (
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          component={props?.headingElementForCard || "h3"}
          sx={{
            mt: isMobile ? "4.688vw" : "1.5625vw",
            textAlign: props?.renderOriginalWidthImage ? "center" : "",
          }}
          className="package-icon-title">
          {props?.title}
        </Typography>
      )}
      {props?.description && (
        <DescriptionTypography
          variant={isMobile ? "m-body-s" : "body-s"}
          $mobile={isMobile}>
          {props?.description}
        </DescriptionTypography>
      )}
    </MainBox>
  )
}

export default CardWithCenterAlignedTitle
