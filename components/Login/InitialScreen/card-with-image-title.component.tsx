import React from "react"
import { Box } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import { ImageProps } from "../../types"
import { useMobileCheck } from "../../../utils/isMobilView"
import {
  ImageBoxWrapper,
  ContentWrapper,
  StyledTitle,
} from "../Styles/InitialScreen.styles"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"

interface TwoCardGridInterface {
  props: { largeImage: ImageProps; title: string }
}

const TwoCardGrid = ({ props }: TwoCardGridInterface) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  return (
    <ImageBoxWrapper>
      <ContentWrapper>
        {props?.largeImage?.asset?._ref && (
          <Box
            alt="-image"
            component="img"
            width={isMobile ? "37.500vw" : "12.480vw"}
            height={isMobile ? "21.250vw" : "6.250vw"}
            src={
              isMobile
                ? getOptimizeImageUrl(
                    urlFor(props?.largeImage?.asset?._ref).url(),
                    2
                  )
                : getOptimizeImageUrl(
                    urlFor(props?.largeImage?.asset?._ref).url(),
                    2
                  )
            }
            sx={{ gap: isMobile ? "0vw" : "1.2vw" }}
          />
        )}
        <StyledTitle variant={isMobile ? "m-body-s" : "body-s"}>
          {props?.title}
        </StyledTitle>
      </ContentWrapper>
    </ImageBoxWrapper>
  )
}
export default TwoCardGrid
