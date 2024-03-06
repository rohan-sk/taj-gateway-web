/**
 *
 * For dynamic tab filtering
 *
 */

import React, { useState, useEffect, useMemo, useContext } from "react"
import Slider from "react-slick"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Typography } from "@mui/material"
import prevImage from "../../../public/taj-grey-left-arrow.png"
import nextImage from "../../../public/taj-grey-right-arrow.png"
import { useMobileCheck } from "../../isMobilView"
import { useAppNavigation } from "../../NavigationUtility"
import { useAesthetics } from "../../fetchAsthetics"
import {
  CustomNextArrow,
  CustomPrevArrow,
} from "../../../components/hoc/custom-arrows"
import { CommonCarouselStyles } from "../../../components/hoc/carousal-component-styles"
import {
  DescriptionTypo,
  StyledTitle,
} from "../../../components/carousal/styles/tabs-in-carousal"
import { PropItemsMsiteModal } from "../../../components/hoc/CommonMsiteModalAlignment/PropItemsMsiteModal"
import { triggerEvent } from "../../analytics"
import { GAStore, UserStore } from "../../../store"
import { MemberDataLayer } from "../../analytics/member-data-layer"
import { getCookie } from "../../cookie"
import { AFFILIATION } from "../../analytics/constants"
import { GLOBAL_STORES } from "../../Constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const TabFilterLogic = ({ props, setFilteredProps, originalData }: any) => {
  const headingElementForTab: any = props?.tabsConfig?.headingElementForTab
  const isWeddingCarousel =
    props?.tabsConfig?.largeVariant === "events.group.carousel-tabs"
  const isMobile = useMobileCheck()
  const theme = useTheme()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const aestheticData = useAesthetics(props?.aesthetic?._ref)
  const { cardPadding } = useAesthetics(props?.tabsConfig?.aesthetic?._ref)
  const BackgroundColor =
    aestheticData?.cardBackgroundColor ||
    originalData?.tabsConfig?.backgroundColor

  const [selectedTab, setSelectedTab] = useState("all")
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const preparedTabs = useMemo(() => {
    let formattedData: any[] = []
    originalData?.items?.map((item: any) => {
      const isItemExists = formattedData.some(
        (cItem: any) =>
          cItem.title?.toLowerCase() === item.tabTerm?.toLowerCase()
      )
      if (!isItemExists) {
        formattedData.push({
          title: item.tabTerm,
        })
      }
    })
    let filteredFormattedData = formattedData?.filter(
      (item: any) => item?.title
    )
    filteredFormattedData.splice(
      Math.floor(filteredFormattedData.length / 2),
      0,
      { title: "ALL" }
    )
    return filteredFormattedData
  }, [originalData?.items])

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 4,
    slidesToShow: originalData?.tabsConfig?.minimumItems || 5,
    slidesToScroll: 1,
    className: "center",
    centerPadding: "30px",
    focusOnSelect: true,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "-5.7vw",
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
          width: "5.125vw",
          height: "5.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
    beforeChange: (_: any, newIndex: any) =>
      setSelectedTab(preparedTabs?.[newIndex]?.title),
    afterChange: (index: any) => setSelectedTab(preparedTabs?.[index]?.title),
  }

  useEffect(() => {
    if (selectedTab) {
      let filteredArr = originalData?.items?.filter((card: any) => {
        let tabTerm = card?.["tabTerm"]?.toLowerCase()
        if (tabTerm?.includes(selectedTab?.toLowerCase())) {
          return card
        }
      })
      {
        setFilteredProps({
          ...props,
          items: filteredArr,
        })
      }
      if (selectedTab?.length === 0 || selectedTab?.toLowerCase() === "all") {
        setFilteredProps({ ...props, items: originalData?.items })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab])

  const handleWedding = (item: any, index: number, url: any) => {
    isWeddingCarousel === true &&
      triggerEvent({
        action: "weddingFunction_Selected",
        params: {
          ...dataLayer,
          index: index,
          buttonLinkName: item?.title || "",
          link_text: item?.title || "",
          link_url: url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          datesToBook: "",
          package: "",
          theme: "",
          functionDate: "",
          isFlexibe: "",
          isGuestRooms: "",
          currentLocation: "",
          additionalEvent: "",
          weddingFunctionName: item?.title || "",
          visitSource: "",
          clientId: getCookie("_ga")?.slice(6),
          brandName: AFFILIATION,
          no_of_items: originalData?.items?.length,
          outbound:
            originalData?.items[0]?.urlType == "internal" ? false : true,
          widget_type: props?._type,
          widget_title: isMobile
            ? props?.title?.mobileTitle[1]
            : props?.title?.desktopTitle[0],
          item_name: item?.title || "",
          item_type: originalData?.items[0]?._type,
          departureDate: "",
          arrivalDate: "",
          widget_description: props?.subTitle,
          noOfAdults: "",
          noOfChild: "",
          noOfRooms: "",
          offerCategory: "",
          offerCode: "",
          offerID: "",
          offerName: "",
          offerValidity: "",
          specialCode: "",
          location: "",
          pageSection: isMobile
            ? props?.title?.mobileTitle[1]
            : props?.title?.desktopTitle[0],
        },
      })
  }
  return (
    <>
      {!isMobile ? (
        <Box
          className={props?.[0]?.title?.replace(/ /g, "-")}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: BackgroundColor || "#f6f5f5",
            padding: cardPadding?.desktop ? cardPadding?.desktop : "0vw 12.5vw",
          }}>
          <CommonCarouselStyles
            sx={{
              ".slick-slide": {
                padding: "0vw 1.50vw",
              },
              ".slick-track": {
                display: "flex",
                alignItems: "center",
              },
              ".slick-list": {
                margin: "0 -1.04vw",
              },
              ".slick-center .centerText": {
                textAlign: "center",
                color: isWeddingCarousel
                  ? theme?.palette?.neuPalette?.hexSeventeen
                  : theme?.palette?.neuPalette?.hexTwo,
                fontSize: isMobile ? "3.75vw" : "1.25vw",
              },
              ".slick-center .centerImg": {
                color: isWeddingCarousel
                  ? theme?.palette?.neuPalette?.hexSeventeen
                  : theme?.palette?.neuPalette?.hexTwo,
                filter: `opacity(1) drop-shadow(0 0 0 #eda805)`,
              },
              ".slick-center .centeredBoxtrue": {
                width: "100%",
                padding: isMobile ? "3.125vw 0vw" : "1.875vw 1.302vw",
                borderRight: "none",
                borderWidth: "1px",
                borderStyle: "solid !important",
                borderImage:
                  "linear-gradient(to right,rgba(69, 68, 63, 0), #AD8B3A, rgba(69, 68, 63, 0)) 1 0 1 0",
                background:
                  "linear-gradient(270deg, rgba(255, 212, 202, 0.00) 0.33%, #FFD4CA 51.67%, rgba(255, 212, 202, 0.00) 100%)",
                minHeight: "6.46vw",
              },
              ".slick-center .centeredBoxfalse": {
                width: "100%",
                padding: isMobile ? "3.125vw 0vw" : "1.875vw 1.302vw",
                borderRight: "none",
                backgroundColor: theme?.palette?.neuPalette?.hexOne,
                boxShadow: "-6px 10px 24px 0px rgba(0, 0, 0, 0.10)",
                minHeight: "6.46vw",
                marginBottom: "30px",
              },
              ".custom-left": {
                borderLeft:
                  props?.length >= 5
                    ? `1px solid ${theme?.palette?.neuPalette?.hexNine}`
                    : "none",
              },
              ".custom-right": {
                borderRight:
                  props?.length >= 5
                    ? `1px solid ${theme?.palette?.neuPalette?.hexNine}`
                    : "none",
              },
            }}>
            <Slider {...settings}>
              {preparedTabs?.map((item: any, index: number) => (
                <Box key={index}>
                  <Box
                    className={`centeredBox${isWeddingCarousel}`}
                    sx={{
                      cursor: "pointer",
                      marginBottom: props?.length >= 5 ? "1.250vw" : "1.25vw",
                      alignItems: "center",
                      flexDirection: "column",
                      display: "flex !important",
                      justifyContent: "center",
                    }}>
                    {item?.img && (
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
                        src={item?.img}
                        onClick={() => navigate(item?.url)}
                      />
                    )}
                    {item?.title && (
                      <Typography
                        className="centerText"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          maxWidth: isMobile ? "20.313vw" : "100%",
                          color: theme?.palette?.neuPalette?.hexSeventeen
                        }}
                        variant={isMobile ? "m-heading-xs" : "heading-xs"}
                        component={headingElementForTab || "h3"}
                        onClick={() => {
                          setSelectedTab(item?.title),
                            handleWedding(item, index, item?.url)
                        }}>
                        {item?.title}
                      </Typography>
                    )}
                    {item?.description && (
                      <DescriptionTypo variant="body-xs">
                        {item?.description}
                      </DescriptionTypo>
                    )}
                  </Box>
                </Box>
              ))}
            </Slider>
          </CommonCarouselStyles>
        </Box>
      ) : (
        <Box
          sx={{
            padding: cardPadding?.mobile
              ? cardPadding?.mobile
              : "8.594vw 12.5vw",
            background: BackgroundColor || "#f6f5f5",
          }}>
          <PropItemsMsiteModal
            props={preparedTabs && preparedTabs}
            setSelectedTab={setSelectedTab}
          />
        </Box>
      )}
    </>
  )
}

export default TabFilterLogic
