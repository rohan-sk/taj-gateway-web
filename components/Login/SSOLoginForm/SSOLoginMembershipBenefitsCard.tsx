import React from "react"
import Slider from "react-slick"
import { Box, Divider } from "@mui/material"
import { urlFor } from "../../../lib-sanity"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MobileCarousalStylesWrapper } from "../../carousal/styles/common-styles"
import { CarouselProgressiveBarStyles } from "../../hoc/custom-carousal-dots-styles"
import { theme } from "../../../lib/theme"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import {
  CardSubTitleTypography,
  CardTitleText,
  MembershipBenefitsCardImagesWrapper,
  MembershipBenefitsCardTitle,
  MembershipBenefitsCardWrapper,
  NeupassLogoWrapper,
} from "./SSOLoginFormsStyles"

const SSOLoginMembershipBenefitsCard = ({ props }: any) => {
  const propItems = props?.tabs?.[0]?.tabItems?.[1]
  const isMobile = useMobileCheck()
  const { cardBackgroundColor } = useAesthetics(propItems?.aesthetic?._ref)
  const backgroundColor = cardBackgroundColor === theme?.palette?.ihclPalette?.hexThree?.toLowerCase()

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToShow: 2,
    slidesToScroll: 1,
  }

  return (
    <MembershipBenefitsCardWrapper
      sx={{
        width: DesktopPxToVw(876),
        "@media (max-width: 640px)": {
          width: "100%",
        },
      }}>
      {isMobile && <Divider flexItem={true} />}

      {propItems?.title?.desktopTitle && (
        <CardTitleText variant={"heading-s"}>{propItems?.title?.desktopTitle}</CardTitleText>
      )}
      <NeupassLogoWrapper>
        {propItems?.logo?.asset?._ref && (
          <Box component={"img"} alt={`Neupass-logo-img`} src={urlFor(propItems?.logo?.asset?._ref)?.url()} />
        )}
        {propItems?.subTitle && <CardSubTitleTypography>{propItems?.subTitle}</CardSubTitleTypography>}
      </NeupassLogoWrapper>
      {isMobile ? (
        <Box sx={{ width: "100%" }}>
          <MobileCarousalStylesWrapper
            sx={{
              ".slick-slide": {
                padding: MobilePxToVw(10),
              },
            }}
            $inactiveDotWidth={`${MobilePxToVw(400 / propItems?.items?.length)}`}
            $backGroundColor={backgroundColor}>
            <CarouselProgressiveBarStyles
              sx={{
                "& .slick-dots": {
                  margin: `${MobilePxToVw(35)} 0vw`,
                },
              }}
              $login={false}
              $backGroundColor={false}>
              <Slider {...settings}>
                {propItems?.items?.map((membershipItems: any, index: number) => (
                  <Box key={index}>
                    {membershipItems?.largeImage?.asset?._ref && (
                      <>
                        <Box
                          component={"img"}
                          alt={`Membership-card-img`}
                          width="100%"
                          src={urlFor(membershipItems?.largeImage?.asset?._ref)?.url()}
                        />
                        <MembershipBenefitsCardTitle>{membershipItems?.title}</MembershipBenefitsCardTitle>
                      </>
                    )}
                  </Box>
                ))}
              </Slider>
            </CarouselProgressiveBarStyles>
          </MobileCarousalStylesWrapper>
        </Box>
      ) : (
        <MembershipBenefitsCardImagesWrapper>
          {propItems?.items?.map((membershipItems: any, index: number) => (
            <Box key={index}>
              {membershipItems?.largeImage?.asset?._ref && (
                <>
                  <Box
                    component={"img"}
                    alt={`Membership-card-img`}
                    width="100%"
                    src={urlFor(membershipItems?.largeImage?.asset?._ref)?.url()}
                  />
                  <MembershipBenefitsCardTitle>{membershipItems?.title}</MembershipBenefitsCardTitle>
                </>
              )}
            </Box>
          ))}
        </MembershipBenefitsCardImagesWrapper>
      )}

      {isMobile && propItems?.primaryAction?.title && (
        <RenderActionItem
          url={propItems?.primaryAction?.url}
          isActionButtonType={true}
          title={propItems?.primaryAction?.title}
          variant={propItems?.primaryAction?.variant}
          navigationType={propItems?.primaryAction?.urlType}
          buttonStyles={{
            fontSize: DesktopPxToVw(18),
            "@media (max-width: 640px)": {
              marginBottom: MobilePxToVw(35),
            },
          }}
        />
      )}

      {!isMobile && propItems?.secondaryAction?.title && (
        <RenderActionItem
          url={propItems?.secondaryAction?.url}
          isActionButtonType={true}
          title={propItems?.secondaryAction?.title}
          variant={propItems?.secondaryAction?.variant}
          navigationType={propItems?.secondaryAction?.urlType}
          buttonStyles={{
            fontSize: DesktopPxToVw(18),
            margin: `${DesktopPxToVw(30)} auto 0vw auto`,
            "@media (max-width: 640px)": {
              marginBottom: MobilePxToVw(35),
            },
          }}
        />
      )}
    </MembershipBenefitsCardWrapper>
  )
}

export default SSOLoginMembershipBenefitsCard
