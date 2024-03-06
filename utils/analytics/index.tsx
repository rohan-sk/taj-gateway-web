import { getCookie } from "../cookie"

// log the pageview with their URL
export const analyticsPageview = (
  pageURL: URL | string,
  pageTitle: string,
  pageType: string,
  pageReferrerURL: string | Window,
  pageReferrerTitle: string | Window,
  customerID: string | undefined,
  loyalty_level: string
) => {
  global?.window?.dataLayer?.push({
    event: "page_view",
    pageURL,
    pageTitle,
    pageType,
    pageReferrerURL,
    pageReferrerTitle,
    platform: window?.innerWidth > 768 ? "PWA" : "MobilePWA",
    customerID,
    loyalty_level,
    clientId: getCookie("_ga")?.slice(6),
  })
}

interface Event {
  action: string
  params: {}
}

// log specific events happening.
export const triggerEvent = ({ action, params }: Event) => {
  if (typeof window != "undefined") {
    window?.dataLayer?.push({ ...{ event: action }, ...params })
  }
}

export const AnalyticsScrollEvent = (data: any, scrollEventType = true) => {
  try {
    const analyticsData = {
      action: scrollEventType ? "scroll_up" : "scroll_down",
      params: {
        ...data,
      },
    }
    triggerEvent(analyticsData)
  } catch (error) {
    console.log("error", error) /* eslint-disable-line */
  }
}
