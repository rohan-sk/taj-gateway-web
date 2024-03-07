import { useContext, useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import { urlFor } from "../../lib-sanity"
import "slick-carousel/slick/slick-theme.css"
import { CONSTANTS } from "../constants"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { Typography, Box, Card, useTheme } from "@mui/material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { StyledChevronRight } from "../card/styles/common-styles"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { GradientBox } from "./styles/media-card-with-bg-image-carousal"
import { NextArrow, PrevArrow } from "../hoc/actions/transparent-arrows"
import { ImageProps, ActionProps, aestheticItems, PathType } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { handlePromotion } from "../../utils/analytics/events/Ecommerce/Booking-Journey/promotion"
import {
  ActionBox,
  CardContentBox,
  CarousalCardContainer,
  ImageBox,
  TitleBox,
} from "./styles/multi-cards-with-bg-image"

const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))

type MultiCardsCarousalWithBgImageProps = {
  props: {
    title: string
    subTitle: string
    textColor: string
    componentTopPadding: string
    secondaryAction: ActionProps
    componentBottomPadding: string
    items: MultiCardsCarousalWithBgImageItems[]
    aesthetic?: aestheticItems
  }
}

type MultiCardsCarousalWithBgImageItems = {
  aesthetic: aestheticItems
  title: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  primaryAction: ActionProps
  backgroundImage: ImageProps
  headingElementForCard?: any
  charactersLimit?: number
}

const MultiCardsCarousalWithBgImage = ({ props, padding }: any) => {
  const textColor = props?.aesthetic?.titleColor?.hex
  const theme = useTheme()
  const recViewRef = useRef()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isUserLoggedIn = useLoggedIn()
  const context: any = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()

  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [nextSlideIndex, setNextSlideIndex] = useState<number>(0)
  const [nextArrowTitle, setNextArrowTitle] = useState<string>("")
  const [prevArrowTitle, setPrevArrowTitle] = useState<string>("")
  const [isInTransition, setIsInTransition] = useState<boolean>(false)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  if (props?.viewEventCallback) {
    props?.viewEventCallback(props, recViewRef)
  }

  const onBeforeChange = (index: number) => {
    setNextArrowTitle("")
    setPrevArrowTitle("")
    setIsInTransition(() => true)
  }
  const onAfterChange = (sliderIndex: number) => {
    setActiveIndex(sliderIndex), setIsInTransition(() => false)
  }
  const handleLeftArrow = () => {
    setNextSlideIndex(() => (activeIndex === 0 ? props?.items?.length - 1 : activeIndex - 1))
  }
  const handleRightArrow = () => {
    setNextSlideIndex(() => (activeIndex === props?.items?.length - 1 ? 0 : activeIndex + 1))
  }

  const onSwipeHandler = (direction: string): Function => {
    switch (direction?.toLowerCase()) {
      case "right":
        return handleLeftArrow
      case "left":
        return handleRightArrow
      default:
        return handleLeftArrow
    }
  }

  const backgroundGradient = props?.aesthetic?.gradient
    ? props?.aesthetic?.gradient
    : "linear-gradient(180deg, rgba(18, 60, 34, 0.9) 20%, rgba(18, 60, 34, 0) 100%)"

  const CarousalBackgroundImage = props?.aesthetic?.isGradientEnabled
    ? props?.aesthetic?.gradient
      ? `url(${getOptimizeImageUrl(
          urlFor(props?.items?.[nextSlideIndex]?.backgroundImage?.asset?._ref)?.url(),
          1,
        )}), linear-gradient(black,black)`
      : backgroundGradient
    : ""
  const settings = {
    arrows: true,
    infinite: true,
    swipeToSlide: true,
    speed: 1000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    beforeChange: onBeforeChange,
    onSwipe: (direction: string) => {
      onSwipeHandler(direction)()
    },
    prevArrow: (
      <PrevArrow
        handleClick={handleLeftArrow}
        prevArrowTitle={prevArrowTitle}
        items={props}
        activeIndex={activeIndex}
      />
    ),
    nextArrow: (
      <NextArrow
        handleClick={handleRightArrow}
        nextArrowTitle={nextArrowTitle}
        items={props}
        activeIndex={activeIndex}
      />
    ),
    afterChange: onAfterChange,
  }

  useEffect(() => {
    setNextArrowTitle(
      activeIndex == props?.items?.length - 1 ? props?.items?.[0]?.title : props?.items?.[activeIndex + 1]?.title,
    )
    setPrevArrowTitle(
      activeIndex == 0 ? props?.items?.[props?.items?.length - 1]?.title : props?.items?.[activeIndex - 1]?.title,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const getSide = (activeIndex: number, index: number) => {
    const length = props?.items?.length
    if (activeIndex === index) {
      return "center"
    } else if (activeIndex === 0) {
      if (index === length - 1) {
        return "left"
      } else {
        return "right"
      }
    } else if (activeIndex === length - 1) {
      if (index === 0) {
        return "right"
      } else {
        return "left"
      }
    } else if (index < activeIndex) {
      return "left"
    } else {
      return "right"
    }
  }

  //analytics event call when user visits particular offer section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries?.forEach((entry) => {
          if (entry?.isIntersecting) {
            handlePromotion("view_promotion", dataLayer, props, activeIndex, gaStoreData)
            observer?.disconnect()
          }
        })
      },
      {
        threshold: 0.5,
      },
    )
    if (recViewRef?.current) {
      observer?.observe(recViewRef?.current)
    }
    return () => {
      observer?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <Box
      aria-label="carousel-with-img-bg"
      ref={recViewRef}
      sx={{
        width: "100%",
        position: "relative",
        background: CarousalBackgroundImage,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        padding: isMobile ? props?.aesthetic?.padding?.mobile : props?.aesthetic?.padding?.desktop,
      }}>
      <TitleBox>
        <MultiRowTitle {...props} />
      </TitleBox>
      <GradientBox $gradientColor={props?.aesthetic?.isGradientEnabled ? backgroundGradient : ""} />
      <Box>
        <CommonCarouselStyles
          sx={{
            ".slick-active .in-active-box": {
              filter: "none",
            },
          }}>
          <Slider {...settings}>
            {props?.items?.map((item: MultiCardsCarousalWithBgImageItems, index: number) => {
              let cardBackgroundColor
              let textColor
              if (item?.aesthetic?._ref) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const response = useAesthetics(item?.aesthetic?._ref)
                cardBackgroundColor = response?.cardBackgroundColor
                textColor = response?.textColor
              }

              return (
                <CarousalCardContainer key={index}>
                  <Box
                    sx={{
                      borderImage:
                        getSide(nextSlideIndex, index) === "center"
                          ? "unset"
                          : getSide(nextSlideIndex, index) === "left"
                          ? "linear-gradient(270deg, #FEFEFE, rgba(255, 255, 255, 0) 50%) 1 / 1.5px"
                          : getSide(nextSlideIndex, index) === "right"
                          ? "linear-gradient(90deg, #FEFEFE, rgba(255, 255, 255, 0) 50%) 1 / 1.5px"
                          : "unset",
                      WebkitTransition: "1s linear",
                    }}>
                    <Card
                      key={index}
                      sx={{
                        width: "100%",
                        "&.MuiCard-root": {
                          minHeight: "34.1vw",
                          borderRadius: "0",
                          boxShadow: "none",
                          backgroundColor: cardBackgroundColor ?? theme?.palette?.background?.default,
                          opacity: isInTransition
                            ? index === nextSlideIndex
                              ? 1
                              : index === activeIndex
                              ? 0
                              : 0
                            : index === activeIndex
                            ? 1
                            : 0,
                          WebkitTransition: ".5s linear",
                        },
                      }}>
                      {item?.largeImage?.asset?._ref && (
                        <ImageBox>
                          <Box
                            alt={item?.largeImage?.altText || "image"}
                            component="img"
                            // loading="lazy"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              WebkitTransition: "transform 1s ease-in-out",
                              MozTransition: "transform 1s ease-in-out",
                              msTransition: "transform 1s ease-in-out",
                            }}
                            src={getOptimizeImageUrl(urlFor(item?.largeImage?.asset?._ref).url(), isMobile ? 1 : 2)}
                          />
                        </ImageBox>
                      )}
                      <CardContentBox>
                        {item?.title && (
                          <Typography
                            variant="heading-xs"
                            component={item?.headingElementForCard || "h3"}
                            color={textColor ?? theme?.palette?.text?.primary}>
                            {item?.title}
                          </Typography>
                        )}
                        {item?.description && (
                          <Typography
                            variant={isMobile ? "m-body-sl" : "body-ml"}
                            sx={{
                              color: textColor ? textColor : theme?.palette?.ihclPalette?.hexSeventeen,
                            }}>
                            {item?.description.length >
                            (item?.charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT) ? (
                              <>
                                <CustomReadMore
                                  length={item?.charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT}
                                  variant={isMobile ? "m-body-l" : "body-ml"}>
                                  {item?.description}
                                </CustomReadMore>
                              </>
                            ) : (
                              item?.description
                            )}
                          </Typography>
                        )}
                        {item?.primaryAction?.url && (
                          <ActionBox
                            onClick={() => {
                              if (item?.title?.toUpperCase() == "NEUPASS") {
                                if (!isUserLoggedIn) {
                                  navigate("/neupass-login", PathType.dialog)
                                } else {
                                  navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
                                }
                              } else {
                                navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
                                handlePromotion(
                                  "select_promotion",
                                  dataLayer,
                                  props,
                                  activeIndex,
                                  gaStoreData,
                                  item?.primaryAction?.url,
                                  item?.primaryAction?.urlType,
                                  item?.primaryAction?.title,
                                  item,
                                )
                              }
                            }}>
                            <Typography variant="link-m" sx={{ letterSpacing: "0.1em" }}>
                              {item?.title?.toUpperCase() == "NEUPASS"
                                ? !isUserLoggedIn
                                  ? CONSTANTS?.LOGIN_JOIN
                                  : item?.primaryAction?.title
                                : item?.primaryAction?.title}
                            </Typography>
                            <StyledChevronRight />
                          </ActionBox>
                        )}
                      </CardContentBox>
                    </Card>
                  </Box>
                </CarousalCardContainer>
              )
            })}
          </Slider>
        </CommonCarouselStyles>
      </Box>
      {props?.secondaryAction?.url && (
        <Box
          sx={{
            display: "flex",
            marginTop: "2.86vw",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Typography
            variant="link-m"
            sx={{
              zIndex: 99,
              cursor: "pointer",
              color: textColor ?? theme?.palette?.text?.primary,
            }}
            onClick={() => navigate(props?.secondaryAction?.url, props?.secondaryAction?.urlType)}>
            {props?.secondaryAction?.title}
          </Typography>
          <StyledChevronRight
            sx={{
              zIndex: 99,
              color: `${textColor} !important` ?? theme?.palette?.text?.primary,
            }}
          />
        </Box>
      )}
    </Box>
  )
}
export default MultiCardsCarousalWithBgImage
