import React, { useCallback, useContext, useState } from "react"
import Slider from "react-slick"
import dynamic from "next/dynamic"
import { useTheme } from "@mui/system"
import { Box, Button } from "@mui/material"
import prevArrowImage from "../../public/taj-gold-left-arrow.svg"
import nextArrowImage from "../../public/taj-gold-right-arrow.svg"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { useMobileCheck } from "../../utils/isMobilView"
import { aestheticItems } from "../types"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PropItemsMsiteModalData } from "../hoc/CommonMsiteModalAlignment/PropItemsMsiteModalData"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"

import { GAStore, UserStore } from "../../store"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { GLOBAL_STORES } from "../../utils/Constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { AFFILIATION } from "../../features/booking/constants"
import { getCookie } from "../../utils/cookie"
const CustomNextArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomNextArrow))
const CustomPrevArrow = dynamic(() => import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow))
const WeddingTabsCarousalItems = dynamic(() => import("./wedding-tabs-carousal-items"))
const WeddingTabsItemComponent = dynamic(() => import("../card/wedding-tabs-item.component"))
const BasicModal = dynamic(() => import("../hoc/modal/modal"))

interface dataItems {
  props: itemsProps[] | any
  largeVariant?: string
  initialSlide?: number | undefined
  aesthetic: any
}
interface itemsProps {
  title: string
  urlType: string
  description: string
}

export type titleTypeDeclaration = {
  title: string
}

const WeddingTabsWithBackgroundColor = ({ props, initialSlide, largeVariant, aesthetic }: dataItems) => {
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const isMobile = useMobileCheck()
  const theme = useTheme()

  const [selectedIndex, setSelectedIndex] = useState<any>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [maxTabItemHeight, setMaxTabItemHeight] = useState<number>(0)

  const maxTabItemHeightSetter = useCallback((tabHeight: number) => {
    if (tabHeight > maxTabItemHeight) {
      setMaxTabItemHeight((prev: number) => (tabHeight > prev ? tabHeight : prev))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const modalOpenHandler = () => setOpenModal(!openModal)

  const itemsCount = props?.items?.[0]?.tabs?.length || 0

  const leftSlideIndex = activeIndex < 2 ? itemsCount - 2 + activeIndex : activeIndex - 2
  const rightSlideIndex = activeIndex + 2 >= itemsCount ? (activeIndex + 2) % itemsCount : activeIndex + 2

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: selectedIndex,
    slidesToShow: 5,
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
          background: `url(${prevArrowImage?.src}), no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          right: "-6vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          background: `url(${nextArrowImage?.src}), no-repeat`,
        }}
      />
    ),
    beforeChange: (oldIndex: any, currentIndex: any) => {
      setActiveIndex(currentIndex)
    },
    afterChange: (slick: any) => {
      setSelectedIndex(slick)
    },
  }

  return (
    <>
      <Box
        sx={{
          padding: isMobile ? "0vw 12.5vw 8.594vw" : "0vw 12.5vw",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: aesthetic?.backgroundColor?.hex,
        }}>
        {isMobile ? (
          <>
            <Button
              variant="contained"
              onClick={modalOpenHandler}
              sx={{
                display: "flex",
                margin: "auto",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                letterSpacing: "1.8px",
                paddingRight: MobilePxToVw(18),
                ":hover": {
                  backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
                },
              }}>
              {props?.items?.[0]?.tabs?.[selectedIndex]?.title}
              <ExpandMoreIcon style={{ marginLeft: MobilePxToVw(30) }} />
            </Button>
            {openModal && (
              <BasicModal
                width="100%"
                height="100%"
                open={openModal}
                bgcolor={theme.palette.background.paper}
                handleClose={modalOpenHandler}
                mobileTop={"10.625vw !important"}
                iconPosition={"absolute !important"}
                iconRight="9.375vw !important"
                Component={
                  <Box
                    sx={{
                      "& .msite-modal": {
                        height: "50vh",
                      },
                    }}>
                    <PropItemsMsiteModalData
                      props={props?.items?.[0]?.tabs}
                      setOpenModal={setOpenModal}
                      selectedIndex={selectedIndex}
                      setSelectedIndex={setSelectedIndex}
                      setActiveIndex={setActiveIndex}
                      activeIndex={activeIndex}
                    />
                  </Box>
                }
              />
            )}
          </>
        ) : (
          <CommonCarouselStyles
            sx={{
              ".slick-slide": {
                marginTop: DesktopPxToVw(24),
                maxWidth: DesktopPxToVw(287),
              },
              ".slick-track": {
                display: "flex",
                alignItems: "center",
                margin: "auto",
                justifyContent: "center",
              },
              ".slick-list": {
                margin: "0 -1.04vw",
              },
              ".slick-center .centerText": {
                textAlign: "center",
                color: theme?.palette?.ihclPalette?.hexSeventeen,
                fontSize: isMobile ? "3.75vw" : "1.25vw",
              },
              ".slick-center .centerImg": {
                color: theme?.palette?.ihclPalette?.hexSeventeen,
                filter: `opacity(1) drop-shadow(0 0 0 #eda805)`,
              },
              ".slick-center .centeredBox": {
                width: "100%",
                padding: isMobile ? "3.125vw 0vw" : "1.875vw 1.302vw",
                borderRight: "none",
              },
              ".custom-left": {
                borderLeft: props?.length >= 3 ? `1px solid ${theme?.palette?.ihclPalette?.hexNine}` : "none",
              },
              ".custom-right": {
                borderRight: props?.length >= 3 ? `1px solid ${theme?.palette?.ihclPalette?.hexNine}` : "none",
              },
            }}>
            <Slider {...settings}>
              {props?.items?.[0]?.tabs?.map((item: any, index: number) => (
                <WeddingTabsItemComponent
                  key={index}
                  {...{
                    activeIndex,
                    index,
                    leftSlideIndex,
                    rightSlideIndex,
                    item,
                    itemsCount,
                    maxTabItemHeight,
                    maxTabItemHeightSetter,
                    props,
                    dataLayer,
                  }}
                />
              ))}
            </Slider>
          </CommonCarouselStyles>
        )}
      </Box>
      <WeddingTabsCarousalItems props={props} selectedIndex={activeIndex} />
    </>
  )
}

export default WeddingTabsWithBackgroundColor
