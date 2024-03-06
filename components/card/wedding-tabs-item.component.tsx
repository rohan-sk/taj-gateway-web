import React, { useEffect, useRef } from "react"
import { theme } from "../../lib/theme"
import { StyledTitle, WeddingTabsMainContainer } from "../carousal/styles/tabs-in-carousal"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { handleWedding } from "../../utils/analytics/events/NonEcommerce/wedding-selected-event"

const WeddingTabsItemComponent = ({
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
}: any) => {
  const isMobile = useMobileCheck()
  const tabItemRef = useRef<any>(null)
  const tabItemHeight = tabItemRef?.current?.getBoundingClientRect()?.height || 0

  useEffect(() => {
    if (!isNaN(tabItemHeight) && tabItemHeight > maxTabItemHeight) {
      maxTabItemHeightSetter(tabItemHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTabItemHeight, tabItemHeight])

  return (
    <WeddingTabsMainContainer
      ref={tabItemRef}
      className="centeredBox"
      sx={{
        marginBottom: itemsCount >= 5 ? "1.250vw" : "1.25vw",
        border: activeIndex === index ? "1px solid" : `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}`,
        borderImage:
          activeIndex === index
            ? "linear-gradient(to right,rgba(69, 68, 63, 0), #AD8B3A, rgba(69, 68, 63, 0)) 1 0 1 0"
            : "unset",
        background:
          activeIndex === index
            ? "linear-gradient(270deg, rgba(255, 212, 202, 0.00) 0.33%, #FFD4CA 51.67%, rgba(255, 212, 202, 0.00) 100%)"
            : "unset",
        borderWidth:
          activeIndex === index
            ? "1px"
            : leftSlideIndex === index
            ? "0vw 1px 0vw 0vw"
            : rightSlideIndex === index
            ? "0px 0px 0px 1px"
            : "0px",
        minHeight: maxTabItemHeight > 0 ? maxTabItemHeight : isMobile ? "initial" : DesktopPxToVw(120),
      }}>
      {item?.title && (
        <StyledTitle
          className="centerText"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          $mobile={isMobile}
          onClick={() => {
            handleWedding(
              item,
              index,
              item?.title,
              item?.tabItems?.[0]?.urlType,
              props,
              dataLayer,
              isMobile,
              "weddingFunction_Selected",
            )
          }}>
          {item?.title}
        </StyledTitle>
      )}
    </WeddingTabsMainContainer>
  )
}

export default WeddingTabsItemComponent
