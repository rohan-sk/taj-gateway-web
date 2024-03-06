import { Box, Typography } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useMobileCheck } from "../../utils/isMobilView"
import { DescriptionTypo, TabsMainContainer } from "../carousal/styles/tabs-in-carousal"
import { urlFor } from "../../lib-sanity"
import { useRouter } from "next/router"
import { useContext, useEffect, useRef } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
type TabItemCardType = {
  item: any
  index: number
  activeIndex: number
  isNormalTabs: boolean
  itemsCount: number
  leftSlideIndex: number
  rightSlideIndex: number
  carouselVariant: boolean
  selectedPropertyElement: any
  handleFunction: Function
  prevActiveIndex: number | undefined
  maxTabItemHeightSetter: Function
  maxTabItemHeight: number
}
const TabItemCard = ({
  item,
  index,
  activeIndex,
  prevActiveIndex,
  isNormalTabs,
  itemsCount,
  leftSlideIndex,
  handleFunction,
  carouselVariant,
  rightSlideIndex,
  selectedPropertyElement,
  maxTabItemHeightSetter = (tabHeight: number) => {},
  maxTabItemHeight,
}: TabItemCardType) => {
  const navigate = useAppNavigation()
  const isMobile = useMobileCheck()
  const router = useRouter()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const tabItemRef = useRef<any>(null)
  const tabItemHeight = tabItemRef?.current?.getBoundingClientRect()?.height || 0

  useEffect(() => {
    if (!isNaN(tabItemHeight) && tabItemHeight > maxTabItemHeight) {
      maxTabItemHeightSetter(tabItemHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTabItemHeight, tabItemHeight])

  return (
    <TabsMainContainer
      ref={tabItemRef}
      onClick={() => {
        !!item?.url && navigate(item?.url, item?.urlType), handleFunction(item?.title, item?.url, item, index)
        item?.handleProperty && item?.handleProperty(selectedPropertyElement)
      }}
      sx={{
        cursor: "pointer",
        padding: isMobile ? "3.125vw 0vw" : "1.875vw 1.302vw",
        boxShadow:
          (activeIndex === index || prevActiveIndex === index) && item?.urlType !== "dialog"
            ? isMobile
              ? `-6px 10px ${MobilePxToVw(24)} 0px rgba(0, 0, 0, 0.10)`
              : "-6px 10px 1.25vw 0px rgba(0, 0, 0, 0.10)"
            : "unset",
        border: `1px solid ${theme?.palette?.neuPalette?.hexNineteen}`,
        borderWidth: isNormalTabs
          ? index === itemsCount - 1 || index === activeIndex || index === leftSlideIndex
            ? "0vw"
            : "0px 1px 0px 0px"
          : carouselVariant
          ? activeIndex === index
            ? "0vw"
            : leftSlideIndex === index
            ? "0vw 0px 0vw 1px"
            : rightSlideIndex === index
            ? "0px 1px 0px 0px"
            : "0px"
          : "0vw",
        backgroundColor:
          (activeIndex === index || prevActiveIndex === index) && item?.urlType !== "dialog"
            ? theme?.palette?.neuPalette?.hexOne
            : "unset",
        minHeight: maxTabItemHeight > 0 ? maxTabItemHeight : isMobile ? "initial" : DesktopPxToVw(120),
      }}>
      <Box
        className="centeredBox"
        sx={{
          alignItems: "center",
          flexDirection: "column",
          display: "flex !important",
          width: "100%",
          justifyContent: "center",
          marginTop:
            (activeIndex === index || prevActiveIndex === index) && item?.urlType === "dialog" ? `0 !important` : "",
          padding:
            (activeIndex === index || prevActiveIndex === index) && item?.urlType === "dialog" ? `0 !important` : "",
        }}>
        {item?.logo?.asset?._ref && (
          <Box
            alt={item?.logo?.altText || `${item?.title}-img`}
            width={item?.description ? "6vw" : "40px"}
            height={item?.description ? "100%" : "40px"}
            component={"img"}
            className="centerImg"
            mb={isMobile ? "0vw" : item?.title || item?.description ? "1.667vw" : "0"}
            sx={{ cursor: "pointer" }}
            src={urlFor(item?.logo?.asset?._ref).url()}
            onClick={() => !!item?.url && navigate(item?.url)}
          />
        )}
        {item?.tabIcon && !!(activeIndex === index ? item?.tabIcon?.highlightedIcon : item?.tabIcon?.icon) && (
          <Box
            alt={`${item?.title}-img`}
            component={"img"}
            mb={isMobile ? "0vw" : item?.title || item?.description ? "1.667vw" : "0"}
            sx={{
              cursor: "pointer",
              width: item?.description ? "6vw" : "2.083vw",
              height: item?.description ? "100%" : "2.083vw",
            }}
            src={activeIndex === index ? item?.tabIcon?.highlightedIcon : item?.tabIcon?.icon}
            onClick={() => !!item?.url && navigate(item?.url)}
          />
        )}
        {item?.singleContent ? (
          <Typography
            sx={{
              "> span": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                maxWidth: isMobile ? "20.313vw" : "100%",
                color:
                  (activeIndex === index || prevActiveIndex === index) && item?.urlType !== "dialog"
                    ? theme?.palette?.neuPalette?.hexTwo
                    : `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
                fontSize: "1.25vw",
                lineHeight: "1.70vw",
                fontFamily: theme?.palette?.font?.primaryFontFamily,
                letterSpacing: "-0.05em",
              },
            }}>
            {item?.singleContent?.map((content: string | {}, idx: number) => (
              <PortableText blocks={content} key={idx} />
            ))}
          </Typography>
        ) : (
          <Typography
            className="centerText"
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            component={item?.headingElementForTab || item?.headingElementForCard || "h3"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              maxWidth: isMobile ? "20.313vw" : "100%",
              color:
                (activeIndex === index || prevActiveIndex === index) && item?.urlType !== "dialog"
                  ? theme?.palette?.neuPalette?.hexTwo
                  : `${theme?.palette?.neuPalette?.hexSeventeen} !important`,
            }}>
            {item?.title}
          </Typography>
        )}
        {/* {item?.title && (
          <Typography
            className="centerText"
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            component={
              item?.headingElementForTab || item?.headingElementForCard || "h3"
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: router?.asPath?.slice(1)?.split("-")?.includes("gift")
                ? "nowrap"
                : "unset",
              textAlign: "center",
              maxWidth: isMobile ? "20.313vw" : "100%",
              color: theme?.palette?.neuPalette?.hexSeventeen,
            }}>
            {item?.title}
          </Typography>
        )} */}
        {item?.description && <DescriptionTypo variant="body-xs">{item?.description}</DescriptionTypo>}
      </Box>
    </TabsMainContainer>
  )
}
export default TabItemCard
