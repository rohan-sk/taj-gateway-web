import Slider from "react-slick"
import { urlFor } from "../../lib-sanity"
import { ActionProps, aestheticItems } from "../types"
import { Box, Typography, useTheme } from "@mui/material"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { MobileCarousalStylesWrapper } from "./styles/common-styles"
import { ContentBox, DescriptionTypo } from "./styles/center-card-carousal"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { useMobileCheck } from "../../utils/isMobilView"

type CenterCardCarousalProps = {
  variant: string
  props: CenterCardCarousalItems[]
  aesthetic: any
}
type CenterCardCarousalItems = {
  image: any
  title: string
  description: string
  primaryAction: ActionProps
}

const CenterCardCarousal = ({ props, variant, aesthetic }: CenterCardCarousalProps) => {
  const theme = useTheme()
  const { cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const isMobileVariant = variant === "aboutUs.group.split-cards"

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    // autoplay: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const backgroundColor = aesthetic?.backgroundColor?.hex === theme?.palette?.ihclPalette?.hexThree?.toLowerCase()
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  return (
    <Box aria-label={"center-card-carousel"} sx={{ width: "100%" }}>
      <MobileCarousalStylesWrapper $inactiveDotWidth={`${MobilePxToVw(400 / props?.length)}`} $backGroundColor={true}>
        <CarouselProgressiveBarStyles $login={false} $backGroundColor={backgroundColor}>
          <Slider {...settings}>
            {props?.map((item: CenterCardCarousalItems, index: number) => (
              <Box
                key={index}
                onClick={() =>
                  !!item?.primaryAction?.url && navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
                }
                sx={{
                  position: "relative",
                  borderRight: isMobileVariant
                    ? `1px solid ${theme?.palette?.ihclPalette?.hexThree}`
                    : `2px solid ${theme?.palette?.ihclPalette?.hexOne}`,
                }}>
                <Box
                  sx={{
                    top: "0",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    pointerEvents: "auto",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(9,9,121,0) 50%, rgba(0,0,0,0.4) 100%);",
                    zIndex: 1,
                  }}
                />
                {item?.image?.asset?._ref && (
                  <Box
                    alt="img"
                    loading={"lazy"}
                    component="img"
                    width={"100%"}
                    height={"100%"}
                    src={getOptimizeImageUrl(urlFor(item?.image?.asset?._ref).url(), isMobile ? 1 : 4)}
                  />
                )}
                <ContentBox>
                  {item?.title && (
                    <Typography
                      textAlign={"center"}
                      variant="m-heading-s"
                      sx={{
                        color: theme?.palette?.ihclPalette?.hexOne,
                        zIndex: 2,
                      }}>
                      {item?.title}
                    </Typography>
                  )}
                  {item?.description && (
                    <DescriptionTypo
                      variant="m-body-sl"
                      sx={{
                        color: theme?.palette?.ihclPalette?.hexOne,
                        zIndex: 2,
                      }}>
                      {item?.description}
                    </DescriptionTypo>
                  )}
                </ContentBox>
              </Box>
            ))}
          </Slider>
        </CarouselProgressiveBarStyles>
      </MobileCarousalStylesWrapper>
    </Box>
  )
}

export default CenterCardCarousal
