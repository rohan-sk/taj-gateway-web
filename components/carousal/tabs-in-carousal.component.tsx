import React, { useState, useEffect, useContext, useCallback } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, SelectChangeEvent } from "@mui/material"
import prevImage from "../../public/taj-grey-left-arrow.png"
import nextImage from "../../public/taj-grey-right-arrow.png"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useMobileCheck } from "../../utils/isMobilView"
import { useRouter } from "next/router"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { getCookie } from "../../utils/cookie"
import { AFFILIATION } from "../../features/booking/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import {
  giftingAndShoppingRoute,
} from "../../features/property/ui/constants"
import { PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
const TabItemCard =dynamic(() => import("../card/tab-item.card.component"))
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)

interface dataItems {
  props: itemsProps[] | any
  largeVariant: string
  initialSlide: number | undefined
  aesthetic: any
  analytics: analyticsItems
  analyticsData: analyticsItems
}
interface itemsProps {
  title: string
  urlType: string
  description: string
}
interface analyticsItems {
  primaryAction: any
  subTitle: string
  title: any
  poweredBy: string
  clickEvent: string
}

export type titleTypeDeclaration = {
  title: string
}

const CarousalTabs = ({
  props,
  initialSlide,
  largeVariant,
  aesthetic,
  analytics,
  analyticsData,
  disablePaddings = false,
}: any) => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  const cardBackgroundColor = aesthetic?.backgroundColor?.hex
  const listItems = props?.map((item: titleTypeDeclaration) => item?.title)
  const carouselVariant =
    largeVariant === "ihcl.core.group.carousel-with-tabs" ||
    largeVariant === "ihcl.core.group.multi-static-with-tabs"

  const [activeTab, setActiveTab] = useState<number>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [selectedPropertyElement, setSelectedPropertyElement] = useState("")
  const [prevActiveIndex, setPrevActiveIndex] = useState<number | undefined>()
  const [maxTabItemHeight, setMaxTabItemHeight] = useState<number>(0)

  const maxTabItemHeightSetter = useCallback((tabHeight: number) => {
    if (tabHeight > maxTabItemHeight) {
      setMaxTabItemHeight((prev: number) =>
        tabHeight > prev ? tabHeight : prev
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getActiveTab = () => {
    let activeTabIndex = 0
    props?.map((item: any, index: number) => {
      if (item?.url === router?.asPath) {
        activeTabIndex = index
      }
    })
    return activeTabIndex
  }
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const currentUrl = router.asPath

  const handleFunction = (title: any, url: any, item: any, index: number) => {
    item?.urlType === "dialog" && setPrevActiveIndex(activeTab)
    let pathname = global?.window?.location?.pathname
    let isGiftCard =
      props?.[index]?.analytics?.clickEvent === "giftCardCategorySelected"
    let isPersonalCard = pathname?.includes("asya")
    let isWeddingCard = pathname?.includes("wedding")
    let isHolidayCard = pathname?.includes("taj-holidays")
    if (isGiftCard) {
      triggerEvent({
        action: props?.[index]?.analytics?.clickEvent,
        params: {
          ...dataLayer,
          widget_powered_by: props?.[index]?.analytics?.poweredBy || "",
          index: index,
          buttonLinkName: title || "",
          link_text: title || "",
          link_url: url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          theme: "",
          visitSource: "",
          clientId: getCookie("_ga")?.slice(6),
          location: "",
          brandName: AFFILIATION,
          no_of_items: props?.length,
          outbound: item?.urlType == "internal" ? false : true,
          widget_type: item?._type,
          widget_title: isMobile
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0] || "",
          item_name: title || "",
          item_type: analyticsData?.primaryAction?._type || "",
          widget_description: analyticsData?.subTitle
            ? analyticsData?.subTitle
            : "",
          specialCode: "",
          giftCardCategory: title || "",
          giftCardType: "",
          pageTitle: url?.replace("/", "").toUpperCase(),
          pageURL: `${global?.window?.location.origin}` + `${url}`,
          pageSection: isMobile
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0] || "",
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` +
              `"${PAGE_LANG}",` +
              `"${AFFILIATION}",` +
              `"${url?.replaceAll("/", "").toUpperCase()}"]`
          ),
        },
      })
    } else if (isPersonalCard) {
      triggerEvent({
        action: analytics?.clickEvent,
        params: {
          ...dataLayer,
          widget_powered_by: analytics?.poweredBy || "",
          index: index,
          buttonLinkName: title || "",
          link_text: title || "",
          link_url: url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          currentLocation: "",
          visitSource: "",
          clientId: getCookie("_ga")?.slice(6),
          brandName: AFFILIATION,
          no_of_items: props?.length,
          outbound: item?.urlType == "internal" ? false : true,
          widget_type: item?._type,
          widget_title: isMobile
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0],
          item_name: title || "",
          item_type: analyticsData?.primaryAction?._type || "",
          widget_description: analyticsData?.subTitle,
          specialCode: "",
          location: "",
          personalCareType: title || "",
          pageSection: isMobile
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0] || "",
        },
      })
    } else if (isWeddingCard) {
      triggerEvent({
        action: analytics?.clickEvent,
        params: {
          ...dataLayer,
          widget_powered_by: analytics?.poweredBy || "",
          index: index,
          buttonLinkName: title || "",
          link_text: title || "",
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
          weddingFunctionName: title || "",
          visitSource: "",
          clientId: getCookie("_ga")?.slice(6),
          brandName: AFFILIATION,
          no_of_items: props?.length,
          outbound: item?.urlType == "internal" ? false : true,
          widget_type: item?._type,
          widget_title: isMobile
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0],
          item_name: title || "",
          item_type: analyticsData?.primaryAction?._type || "",
          departureDate: "",
          arrivalDate: "",
          widget_description: analyticsData?.subTitle,
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
            ? analyticsData.title?.mobileTitle[1]
            : analyticsData?.title?.desktopTitle[0] || "",
        },
      })
    } else if (!isHolidayCard) {
      triggerEvent({
        action: analytics?.clickEvent,
        params: {
          ...dataLayer,
          widget_powered_by: analytics?.poweredBy || "",
          index: index,
          buttonLinkName: title || "",
          link_text: title || "",
          link_url: url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          destinationSelected: title || "",
          currentLocation: "",
          visitSource: "",
          clientId: getCookie("_ga")?.slice(6),
          country: title || "",
          location: title || "",
          brandName: AFFILIATION,
          no_of_items: props?.length,
          outbound: item?.urlType == "internal" ? false : true,
          widget_type: item?._type,
          widget_title: isMobile
            ? analyticsData.title?.mobileTitle?.[1]
            : analyticsData?.title?.desktopTitle?.[0],
          item_name: title || "",
          item_type: props?.[index]?._type || "",
          widget_description: analyticsData?.subTitle,
          specialCode: "",
          pageSection: isMobile
            ? analyticsData.title?.mobileTitle?.[1]
            : analyticsData?.title?.desktopTitle?.[0] || "",
        },
      })
    }
  }

  useEffect(() => {
    const tab = getActiveTab()
    setActiveTab(tab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const itemsCount = props?.length || 0
  const leftSlideIndex = activeIndex === 0 ? props?.length - 1 : activeIndex - 1
  const rightSlideIndex =
    activeIndex === props?.length - 1 ? 0 : activeIndex + 1
  const isNormalTabs = props?.length <= 5

  const [settings, setSettings] = useState<object>({
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: activeTab || 0,
    slidesToShow: props?.length >= 5 ? 5 : props?.length,
    slidesToScroll: 1,
    className: "center",
    centerPadding: "30px",
    focusOnSelect: true,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          left: "-5vw",
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
    beforeChange: (oldIndex: any, currentIndex: any) => {
      setActiveIndex(currentIndex)
      setSelectedPropertyElement(currentIndex)
    },
    afterChange: (currentIndex: any) => {
      if (currentIndex > -1) setSelectedPropertyElement(currentIndex)
    },
  })

  useEffect(() => {
    const pageUrl = router?.query?.pid?.[0]
    const currentUrl =
      pageUrl === giftingAndShoppingRoute
        ? router?.asPath
        : router?.query?.pid
        ? pageUrl
        : ""
    const selectedIndex = Array?.isArray(props)
      ? props?.findIndex((item: any) =>
          pageUrl === giftingAndShoppingRoute
            ? `${currentUrl}` === item?.url
            : `/${currentUrl}` === item?.url
        )
      : 0

    ;(router?.query?.pid?.[0] === giftingAndShoppingRoute || selectedIndex >= 0) && setActiveIndex(selectedIndex)
    setSettings((previousSettings) => ({
      ...previousSettings,
      slidesToShow: props?.length >= 5 ? 5 : props?.length,
      initialSlide: selectedIndex,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, router.query.pid])

  useEffect(() => {
    if (props?.[0]?.handleProperty) {
      props?.[0]?.handleProperty(selectedPropertyElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyElement, props])

  return (
    <>
      {/* {isMobile ? (
        <DropdownContentWrapper sx={{border:"1px solid red"}}>
          <DropdownItemText>{listItems?.[0]}</DropdownItemText>
          <DropdownSelectWrapper
            value={value}
            renderValue={(value: any) => value}
            onChange={handleChange}
            endAdornment={<ExpandMoreIcon />}
          >
            {props?.map((items: titleTypeDeclaration, index: number) => (
              <MenuItem key={index} value={items?.title}>
                {items?.title}
              </MenuItem>
            ))}
          </DropdownSelectWrapper>
        </DropdownContentWrapper>
      ) : ( */}
      <Box
        className={props?.[0]?.title?.replace(/ /g, "-")}
        sx={{
          padding: disablePaddings
            ? "0vw"
            : isMobile
            ? "0vw "
            : props?.length < 2 || props?.[0]?.isdynamicPadding
            ? "0vw"
            : "0vw 12.5vw",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // minHeight: "8.93vw !important",
          background: cardBackgroundColor,
        }}>
        <CommonCarouselStyles
          sx={{
            ".slick-track": {
              display: "flex",
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
            },
            ".slick-list": {
              margin: "0vw -1.04vw",
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
            },
          }}>
          <Slider {...{ ...settings, initialSlide: activeTab }}>
            {props?.map((item: any, index: number) => (
              <TabItemCard
                key={index}
                {...{
                  handleFunction,
                  item,
                  index,
                  activeIndex,
                  prevActiveIndex,
                  isNormalTabs,
                  itemsCount,
                  leftSlideIndex,
                  carouselVariant,
                  rightSlideIndex,
                  selectedPropertyElement,
                  maxTabItemHeight,
                  maxTabItemHeightSetter,
                }}
              />
            ))}
          </Slider>
        </CommonCarouselStyles>
      </Box>
      {/* )} */}
    </>
  )
}

export default CarousalTabs
