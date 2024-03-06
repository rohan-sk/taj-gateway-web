import Slider from "react-slick"
import { Box, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import "slick-carousel/slick/slick.css"
import { aestheticItems } from "../types"
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import "slick-carousel/slick/slick-theme.css"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { LoginWrapper, MobileCarousalStylesWrapper } from "./styles/common-styles"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { CONSTANTS } from "../constants"
import { Account, AccountNavigation, LoggedIn } from "../forms/gift-card-form/constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { observer } from "mobx-react-lite"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface multiCardsCarousalProps {
  props: any
  aesthetic: any
  alternateAllLinks: any
}
const MultiCardsCarousal = ({ props, aesthetic, alternateAllLinks }: multiCardsCarousalProps) => {
  const context = useContext(IHCLContext)
  const { cardBackgroundColor, extraData } = useAesthetics(aesthetic?._ref) || {}
  const sliderButtonColor = aesthetic?.sliderColor?.hex || theme?.palette?.ihclPalette?.hexSeventeen
  const sliderBackgroundColor = aesthetic?.sliderBackgroundColor?.hex || theme?.palette?.ihclPalette?.hexSeventeen
  const sliderBackgroundColorWithOpacity = `${sliderBackgroundColor}${
    aesthetic?.sliderBackgroundColor?.rgb?.a == 1 ||
    aesthetic?.sliderBackgroundColor?.rgb?.a == null ||
    aesthetic?.sliderBackgroundColor?.rgb?.a == undefined ||
    aesthetic?.sliderBackgroundColor?.rgb?.a == 0.2
      ? 20
      : aesthetic?.[0]?.sliderBackgroundColor?.rgb?.a * 100
  }`
  const backgroundColor =
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexEleven?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexTwentySix?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexThree?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexSeventeen?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexFour
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    centerMode: true,
    speed: 400,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    centerPadding: "10%",
  }

  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)
  const CustomerHash = global?.localStorage?.getItem("customerHash")
  const isMobile = useMobileCheck()

  useEffect(() => {
    if (userStore?.userDetails?.userHash || CustomerHash) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userStore?.userDetails?.userHash, CustomerHash])
  const mrMiss = global?.window?.localStorage.getItem("userSalutation")
  const userFirstName = global?.window?.localStorage.getItem("userFirstName")
  const userLastName = global?.window?.localStorage.getItem("userLastName")
  const [maxheight, setMaxheight] = useState<number>(0)
  const [subTitleMaxHeight, setSubTitleMaxHeight] = useState<number>(0)
  const [contentMaxHeight, setContentMaxHeight] = useState<number>(0)

  const containerRef = useRef(null)
  useEffect(() => {
    setMaxheight(() => 0)
    setSubTitleMaxHeight(() => 0)
    setContentMaxHeight(() => 0)
  }, [isMobile])

  const setTitleHeight = useCallback(
    (height: any) => {
      setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile],
  )
  const setSubTitleHeight = useCallback(
    (height: any) => {
      setSubTitleMaxHeight((prevValue: any) => (prevValue > height ? prevValue : height))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile],
  )
  const setContentHeight = useCallback(
    (height: any) => {
      setContentMaxHeight((prevValue: any) => (prevValue > height ? prevValue : height))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMobile],
  )
  return (
    <Box sx={{ width: "100%" }} aria-label={"multi-card-carousel"}>
      {alternateAllLinks && (
        <Box>
          {alternateAllLinks?.map((item: any, index: number) => (
            <>
              {!isUserLoggedIn ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <RenderActionItem
                    url={item?.url}
                    title={item?.title}
                    navigationType={item?.urlType}
                    variant={item?.variant}
                    isActionButtonType={item?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true}
                    buttonStyles={{ marginBottom: "8.594vw" }}
                  />
                </Box>
              ) : (
                <>
                  {/* the myAccount component is commented for client requirement this component is foe neupass m-site page */}
                  {/* <LoginWrapper>
                    <Typography
                      sx={{
                        marginBottom: isMobile ? "4.68vw" : "none",
                        textAlign: isMobile ? "center" : "",
                      }}
                      variant={isMobile ? "m-heading-xs" : "heading-s"}>
                      {mrMiss + "." + " " + userFirstName + " " + userLastName + ","}
                      <br /> <br />
                      {`You are logged in as ${global?.window?.localStorage?.getItem("userTier")} member.`}
                    </Typography>
                    <RenderActionItem
                      url={AccountNavigation}
                      title={"Account222222222"}
                      variant={item?.variant}
                      navigationType={"internal"}
                      isActionButtonType={true}
                      buttonStyles={{ marginTop: "" }}
                    />
                  </LoginWrapper> */}
                </>
              )}
            </>
          ))}
        </Box>
      )}

      <MobileCarousalStylesWrapper
        sx={{
          "& li": {
            background: `${sliderBackgroundColorWithOpacity} !important`,
          },
        }}
        $backGroundColor={cardBackgroundColor?.toLowerCase()}
        $inactiveDotWidth={`${MobilePxToVw(400 / (props?.length - 1))}`}>
        <CarouselProgressiveBarStyles
          sx={{
            ".slick-slide": {
              padding: "0 2.3vw",
              transition: "transform 0.4s ease",
            },
            ".slick-active": {
              "& .MuiButton-root": {
                display: "inherit",
              },
            },
            ".slick-active .hide-box": {
              display: "flex ",
            },
            // new variant required for SIT-333 in order the hide the description
            // "@media (max-width:640px)": {
            //   "& .slick-slide": {
            //     "& img~div": {
            //       display: "none",
            //     },
            //   },
            //   "& .slick-slide.slick-active.slick-center": {
            //     "& img~div": {
            //       display: "block",
            //     },
            //   },
            // },
            "@media (max-width: 640px)": {
              ".slick-slide .content": {
                display: "none",
              },
              ".slick-active .content": {
                display: "flex",
              },
              "& .slick-dots li.slick-active button": {
                opacity: "1",
                width: MobilePxToVw(80),
                height: MobilePxToVw(2),
                background: `${sliderButtonColor} !important`,
              },
              "& .slick-dots button": {
                opacity: "1",
                width: "15.625vw",
                height: " 0.3125vw",
              },
              "& .slick-dots li": {
                opacity: "1 !important",
                background: `${sliderBackgroundColorWithOpacity} !important`,
              },
              "& .slick-dots li button": {
                opacity: "1 !important",
                width: "100%",
                background: `${sliderBackgroundColorWithOpacity} !important`,
              },
              "& .slick-dots ": {
                "& .slick-active": {
                  background: `${sliderBackgroundColorWithOpacity}!important`,
                  opacity: "unset !important",
                },
              },
              "& .slick-slide .content-box": {
                marginBottom: "3.75vw",
              },
            },
          }}
          $backGroundColor={backgroundColor}>
          <Slider {...settings} ref={containerRef}>
            {props?.map((item: any, index: number) => (
              <Box key={index}>
                {context?.renderComponent(
                  item?._type,
                  {
                    ...item,
                    maxheight,

                    gridSize: settings?.slidesToShow,
                    setTitleHeight,
                    setSubTitleHeight,
                    subTitleMaxHeight,
                    contentMaxHeight,
                    setContentHeight,
                  },
                  index,
                )}
              </Box>
            ))}
          </Slider>
        </CarouselProgressiveBarStyles>
      </MobileCarousalStylesWrapper>
    </Box>
  )
}

export default observer(MultiCardsCarousal)
