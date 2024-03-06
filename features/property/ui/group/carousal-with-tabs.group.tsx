import React, { useState, useEffect, useContext, useMemo } from "react"
import Slider from "react-slick"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Stack } from "@mui/material"
import prevImage from "../../../../public/taj-grey-left-arrow.png"
import nextImage from "../../../../public/taj-grey-right-arrow.png"
import {
  DescriptionTypo,
  StyledTitle,
  TabsMainContainer,
} from "../../../../components/carousal/styles/tabs-in-carousal"
import { CommonCarouselStyles } from "../../../../components/hoc/carousal-component-styles"
import {
  CustomPrevArrow,
  CustomNextArrow,
} from "../../../../components/hoc/custom-arrows"
import { urlFor } from "../../../../lib-sanity"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { DestinationStore, GAStore, UserStore } from "../../../../store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { triggerEvent } from "../../../../utils/analytics"
import { getCookie } from "../../../../utils/cookie"
import { PropItemsMsiteModal } from "../../../../components/hoc/CommonMsiteModalAlignment/PropItemsMsiteModal"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"

const CarousalTabsPlaceHolder = ({
  props,
  title,
  heading,
  charactersLimit,
  alignmentVariant,
  isComponentFullWidth,
  isMobileComponentFullWidth,
  contentType,
  initialSlide,
  largeVariant,
  aesthetic,
  _type,
}: any) => {
  const isMobile = useMobileCheck()
  const theme = useTheme()
  const navigate = useAppNavigation()
  const carouselVariant = largeVariant === "ihcl.core.group.carousel-with-tabs"
  const insertion = () => {
    const filtered = Array.from(
      global?.window?.document?.getElementsByClassName("slick-active")
    )?.filter((slide: any) => {
      slide && slide?.closest(`.${props?.[0]?.title?.replace(/" "/g, "-")}`)
    })
    for (const slide of filtered) {
      slide.classList.remove("custom-left")
      slide.classList.remove("custom-right")
    }
    filtered?.[0]?.classList?.add("custom-right")
    filtered?.[filtered.length - 1]?.classList?.add("custom-left")
  }
  const ihclContext = useContext(IHCLContext)
  const destinationStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES.destinationStore
  ) as DestinationStore
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const [cardsData, setCardsData] = useState<{ title: string }[] | any>([
    { title: "ALL" },
  ])

  const { setSelectedCountry } = destinationStore
  useEffect(() => {
    let countryData: Array<{ title: string }> = []

    destinationStore?.destinationData?.map(
      (data: any) =>
        !countryData?.includes(data?.country) &&
        data?.country !== null &&
        countryData.push({ title: data?.country })
    )
    const uniqueArray = Array.from(
      new Set(countryData.map((item) => item.title))
    ).map((title) => {
      return {
        title: title,
      }
    })
    //appending All tab card to the existing country tabs if all tab doesn't exist
    if (
      destinationStore?.destinationData?.findIndex((item: any) => {
        item?.title?.toLowerCase() === "all"
      }) === -1
    ) {
      setCardsData([{ title: "ALL" }, ...uniqueArray])
    } else {
      setCardsData([...uniqueArray])
    }
  }, [destinationStore?.destinationData])

  const [selectedTab, setSelectedTab] = useState<Number | any>(0)

  const leftSlideIndex =
    selectedTab === 0 ? cardsData?.length - 1 : selectedTab - 1
  const rightSlideIndex =
    selectedTab === cardsData?.length - 1 ? 0 : selectedTab + 1
  const itemsCount = cardsData?.length || 0
  const isNormalTabs = cardsData?.length <= 5 && cardsData?.length > 3

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: cardsData && cardsData?.length >= 5 ? 5 : cardsData?.length,
    slidesToScroll: 1,
    className: "center",
    centerPadding: "30px",
    focusOnSelect: true,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "-5.7vw",
          top: "38%",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${prevImage?.src}), no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          right: "-6vw",
          top: "44%",
          width: "5.125vw",
          height: "5.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
    beforeChange: (next: any, currentSlide: any) => {
      setSelectedTab(currentSlide)
      carouselVariant && insertion()
    },
    afterChange: (next: any) => {
      setSelectedTab(next)
      carouselVariant && insertion()
    },
  }

  useEffect(() => {
    carouselVariant && insertion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isMobile) {
      if (cardsData) setSelectedCountry(cardsData?.[selectedTab]?.title)
    } else {
      if (cardsData)
        setSelectedCountry(
          cardsData?.[
            cardsData?.findIndex((item: any) => selectedTab === item?.title)
          ]?.title || ""
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, cardsData])

  const handleCountry = (item: any, index: number) => {
    index >= 0 &&
      triggerEvent({
        action: "countrySelected",
        params: {
          ...dataLayer,
          index: index,
          buttonLinkName: item?.title,
          link_text: item?.title,
          link_url: "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          destinationSelected: item?.title,
          datesToBook: "",
          package: "",
          theme: "",
          fucntionDate: "",
          isFlexibe: "",
          isGuestRooms: "",
          currenctLocation: "",
          country: item?.title,
          clientId: getCookie("_ga")?.slice(6),
          item_name: item?.title || "",
          item_type: _type,
          location: item?.title,
          no_of_items: cardsData?.length,
          widget_title: !isMobile ? title?.desktopTitle?.[0] : "",
          widget_type: _type,
          widget_description: heading,
          widget_position: "",
          outbound: false,
          pageSection: !isMobile ? title?.desktopTitle?.[0] : "",
        },
      })
  }
  return (
    <>
      <Box
        sx={{
          padding: isMobile
            ? aesthetic?.padding?.mobile
            : aesthetic?.padding?.desktop
            ? aesthetic?.padding?.desktop
            : "0vw 12.5vw",
          background: aesthetic?.backgroundColor?.hex || "",
        }}>
        <MultiRowTitle
          title={title}
          charactersLimit={charactersLimit}
          aesthetic={aesthetic}
          subTitle={heading}
          alignmentVariant={alignmentVariant}
          isComponentFullWidth={isComponentFullWidth}
          isMobileComponentFullWidth={isMobileComponentFullWidth}
        />
        <Box
          className={props?.[0]?.title?.replace(/ /g, "-")}
          sx={{
            padding: isMobile
              ? "0vw "
              : props?.length < 2
              ? "0vw"
              : "0vw 12.5vw",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          {isMobile ? (
            <Stack>
              <PropItemsMsiteModal
                props={cardsData}
                setSelectedTab={setSelectedTab}
                cityCheck={contentType === "allDestinations" ? true : false}
              />
            </Stack>
          ) : (
            <CommonCarouselStyles
              sx={{
                ".slick-track": {
                  display: "flex",
                  alignItems: "stretch",
                },
                ".slick-slide": {
                  height: "100%",
                },
                ".slick-list": {
                  margin: "0 -1.04vw",
                },
                ".slick-center .centerText": {
                  textAlign: "center",
                  color: theme?.palette?.neuPalette?.hexTwo,
                  fontSize: isMobile ? "3.75vw" : "1.25vw",
                },
                ".slick-center .centerImg": {
                  color: theme?.palette?.neuPalette?.hexTwo,
                  filter: `opacity(1) drop-shadow(0 0 0 #eda805)`,
                },
                ".slick-center .centeredBox": {
                  width: "100%",
                  padding: isMobile ? "3.125vw 0vw" : "",
                  borderRight: "none",
                  backgroundColor: theme?.palette?.neuPalette?.hexOne,
                  boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                },
              }}>
              <Slider {...settings}>
                {cardsData?.map((item: any, index: number) => (
                  <TabsMainContainer
                    key={index}
                    sx={{
                      minHeight: "6.46vw",
                      border: `1px solid ${theme?.palette?.neuPalette?.hexNineteen}`,
                      borderWidth: isNormalTabs
                        ? index === itemsCount - 1 ||
                          index === selectedTab ||
                          index === leftSlideIndex
                          ? "0vw"
                          : "0px 1px 0px 0px"
                        : selectedTab === index
                        ? "0vw"
                        : leftSlideIndex === index
                        ? "0vw 0px 0vw 1px"
                        : rightSlideIndex === index
                        ? "0px 1px 0px 0px"
                        : "0px",
                    }}>
                    <Box
                      onClick={() => {
                        item?.handleProperty &&
                          item?.handleProperty(selectedTab)
                      }}
                      className="centeredBox"
                      sx={{
                        cursor: "pointer",
                        alignItems: "center",
                        flexDirection: "column",
                        display: "flex !important",
                        justifyContent: "center",
                      }}>
                      {item?.logo?.asset?._ref && (
                        <Box
                          alt={`${item?.title}-img`}
                          width={item?.description ? "6vw" : "40px"}
                          height={item?.description ? "100%" : "40px"}
                          component={"img"}
                          className="centerImg"
                          mb={
                            isMobile
                              ? "0vw"
                              : item?.title || item?.description
                              ? "1.667vw"
                              : "0"
                          }
                          sx={{ cursor: "pointer" }}
                          src={urlFor(item?.logo?.asset?._ref).url()}
                          onClick={() => navigate(item?.url)}
                        />
                      )}
                      {item?.title && (
                        <StyledTitle
                          className="centerText"
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          $mobile={isMobile}
                          sx={{
                            textTransform: "uppercase",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            handleCountry(item, index)
                          }}>
                          {item?.title}
                        </StyledTitle>
                      )}
                      {item?.description && (
                        <DescriptionTypo variant="body-xs">
                          {item?.description}
                        </DescriptionTypo>
                      )}
                    </Box>
                  </TabsMainContainer>
                ))}
              </Slider>
            </CommonCarouselStyles>
          )}
        </Box>
      </Box>
    </>
  )
}

export default observer(CarousalTabsPlaceHolder)
