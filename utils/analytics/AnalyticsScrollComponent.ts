import { useState, useEffect } from "react"
import { debounce } from "lodash"
import { getScrollPercent } from "./scrollUtils"
import { AnalyticsScrollEvent } from "."
import { getCookie } from "../cookie"

const AnalyticsScrollComponent = ({ title, variant, isMobile }: any) => {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [showElement, setShowElement] = useState(false)

  const showChatBot = () => {
    const element = global?.window?.document?.getElementById("ymDivBar") as HTMLElement
    element?.firstElementChild?.classList?.add("showChatBot")
  }
  const handleScroll = debounce(() => {
    setScrollPercentage(getScrollPercent())
    const analyticsData = {
      page_title: title,
      page_type: variant,
      pageReferrer: localStorage?.getItem("previousPageURL"),
      page_path: global?.window?.location?.href,
      pageReferrer_title: localStorage?.getItem("previousPageTitle"),
      device: isMobile ? "Mobile" : "Desktop",
      loyalty_level: global?.window?.localStorage?.getItem("customerHash") ? "neupass" : "",
      customer_id: global?.window?.localStorage?.getItem("customerHash")
        ? global?.window?.localStorage?.getItem("customerHash")?.toString()
        : "",
      percent_Scrolled: getScrollPercent() ? `${parseInt(getScrollPercent().toFixed(0))}%` : "",
      clientId: getCookie("_ga")?.slice(6),
    }
    if (scrollPercentage <= getScrollPercent()) {
      AnalyticsScrollEvent(analyticsData, true)
    } else if (scrollPercentage > getScrollPercent()) {
      AnalyticsScrollEvent(analyticsData, false)
    }
  }, 300)

  useEffect(() => {
    if (scrollPercentage > 3 && !showElement) {
      setShowElement(true)
    }
    if (scrollPercentage > 20) {
      showChatBot()
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleScroll])

  return null
}

export default AnalyticsScrollComponent
