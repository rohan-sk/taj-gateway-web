/**
 *
 * For dynamic tab filtering
 *
 */

import React, { useState, useEffect, useContext } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { useTheme } from "@mui/system"
import "slick-carousel/slick/slick.css"
import { urlFor } from "../../lib-sanity"
import "slick-carousel/slick/slick-theme.css"
import { Box, Divider, SelectChangeEvent } from "@mui/material"
import prevImage from "../../public/taj-grey-left-arrow.png"
import nextImage from "../../public/taj-grey-right-arrow.png"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { DescriptionTypo, StyledTitle } from "./styles/tabs-in-carousal"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { aestheticItems } from "../types"
import { useRouter } from "next/router"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { getCookie } from "../../utils/cookie"
import { AFFILIATION, PAGELANG } from "../../features/booking/constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))

interface dataItems {
  props: itemsProps[] | any
  largeVariant: string
  initialSlide: number | undefined
  aesthetic: aestheticItems
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

const CarousalTabs = ({ props, initialSlide, largeVariant, aesthetic, analytics, analyticsData }: dataItems) => {
  const [activeTab, setActiveTab] = useState<(number | undefined)[]>()
  const isMobile = useMobileCheck()
  const theme = useTheme()
  const navigate = useAppNavigation()
  const { cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const carouselVariant = largeVariant === "ihcl.core.group.carousel-with-tabs"
  const insertion = () => {
    const filtered = Array.from(global?.window?.document?.getElementsByClassName("slick-active"))?.filter(
      (slide: any) => {
        slide && slide?.closest(`.${props?.[0]?.title?.replace(/" "/g, "-")}`)
      },
    )
    for (const slide of filtered) {
      slide.classList.remove("custom-left")
      slide.classList.remove("custom-right")
    }
    filtered?.[0]?.classList?.add("custom-right")
    filtered?.[filtered.length - 1]?.classList?.add("custom-left")
  }
  const router = useRouter()

  const getActiveTab = () => {
    return props?.map((tab: any, index: number) => {
      if (tab?.url === router?.asPath) {
        return index
      }
    })
  }
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleFunction = (title: any, url: any, item: any, index: number) => {
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
        datesToBook: "",
        package: "",
        theme: "",
        fucntionDate: "",
        isFlexibe: "",
        isGuestRooms: "",
        currenctLocation: "",
        additionalEvent: "",
        weddingFunctionName: title || "",
        visitSource: "",
        clientId: getCookie("_ga")?.slice(6),
        country: title || "",
        location: title || "",
        brandName: AFFILIATION,
        no_of_items: props?.length,
        outbound: item?.urlType == "internal" ? false : true,
        widget_type: item?._type,
        widget_title: isMobile ? analyticsData.title?.mobileTitle[1] : analyticsData?.title?.desktopTitle[0],
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
      },
    })
  }
  useEffect(() => {
    const tab = getActiveTab()
    setActiveTab(tab)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedPropertyElement, setSelectedPropertyElement] = useState("")

  const [settings, setSettings] = useState<object>({
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: activeTab,
    slidesToShow: props?.length >= 5 ? 5 : props?.length,
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
    beforeChange: () => {
      const PrevTargetElement: any = document?.querySelector(".slick-center")?.querySelector("h4")?.textContent
      setSelectedPropertyElement(PrevTargetElement)
      carouselVariant && insertion()
    },
    afterChange: () => {
      const NextTargetElement: any = document?.querySelector(".slick-center")?.querySelector("h4")?.textContent
      setSelectedPropertyElement(NextTargetElement)
      carouselVariant && insertion()
    },
  })
  useEffect(() => {
    const currentUrl = router?.query?.pid ? router?.query?.pid?.[0] : ""
    const selectedIndex = Array?.isArray(props) ? props?.findIndex((item: any) => `/${currentUrl}` === item?.url) : 0
    setSettings((previousSettings) => ({
      ...previousSettings,
      initialSlide: selectedIndex,
    }))
  }, [props, router.query.pid])
  useEffect(() => {
    carouselVariant && insertion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const listItems = props?.map((item: titleTypeDeclaration) => item?.title)
  const [value, setValue] = useState<string>(listItems?.[1])
  const handleChange = (event: SelectChangeEvent<any>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    if (props?.[0]?.handleProperty) {
      props?.[0]?.handleProperty(selectedPropertyElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPropertyElement])

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
          padding: isMobile ? "0vw " : props?.length < 2 ? "0vw" : "0vw 12.5vw",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // minHeight: "8.93vw !important",
          background: cardBackgroundColor,
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
              color: theme?.palette?.ihclPalette?.hexTwo,
              fontSize: isMobile ? "3.75vw" : "1.25vw",
            },
            ".slick-center .centerImg": {
              color: theme?.palette?.ihclPalette?.hexTwo,
              filter: `opacity(1) drop-shadow(0 0 0 #eda805)`,
            },
            ".slick-center .centeredBox": {
              width: "100%",
              padding: isMobile ? "3.125vw 0vw" : "1.875vw 1.302vw",
              borderRight: "none",
              backgroundColor: theme?.palette?.ihclPalette?.hexOne,
              boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
              minHeight: "6.46vw",
            },
            ".custom-left": {
              borderLeft: props?.length >= 5 ? `1px solid ${theme?.palette?.ihclPalette?.hexNine}` : "none",
            },
            ".custom-right": {
              borderRight: props?.length >= 5 ? `1px solid ${theme?.palette?.ihclPalette?.hexNine}` : "none",
            },
          }}>
          <Slider {...settings}>
            {props?.map((item: any, index: number) => (
              <Box key={index}>
                <Box
                  onClick={() => {
                    item?.url && navigate(item?.url), handleFunction(item?.title, item?.url, item, index)
                    item?.handleProperty && item?.handleProperty(selectedPropertyElement)
                  }}
                  className="centeredBox"
                  sx={{
                    cursor: "pointer",
                    marginBottom: props?.length >= 5 ? "1.250vw" : "1.25vw",
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
                      loading={"lazy"}
                      component={"img"}
                      className="centerImg"
                      mb={isMobile ? "0vw" : item?.title || item?.description ? "1.667vw" : "0"}
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        whiteSpace: router?.asPath?.slice(1)?.split("-")?.includes("gift") ? "nowrap" : "unset",
                      }}>
                      {item?.title}
                    </StyledTitle>
                  )}
                  {item?.description && <DescriptionTypo variant="body-xs">{item?.description}</DescriptionTypo>}
                </Box>
                {/* {props?.length < 5 &&
                  !(index === 0) &&
                  initialSlide !== index &&
                  initialSlide! + 1 !== index && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        height: DesktopPxToVw(120),
                        position: "absolute",
                        bottom: DesktopPxToVw(30),
                      }}
                    />
                  )} */}
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
      </Box>
      {/* )} */}
    </>
  )
}

export default CarousalTabs
