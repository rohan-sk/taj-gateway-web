import { useEffect, useState } from "react"
import { triggerEvent as AnalyticEvent } from "./index"

export const ViewEvent = (ref: { current: Element }, digitalData: any) => {
  const [isEventFired, setEventFired] = useState(false)

  try {
    const callbackFunction: any = (entries: [any]) => {
      const [entry] = entries
      if (entry.isIntersecting && !isEventFired) {
        let data = {
          action: "view",
          params: digitalData,
        }
        AnalyticEvent(data)
        setEventFired(true)
      }
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    }

    useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, options)
      if (ref?.current) observer.observe(ref?.current)
      return () => {
        if (ref?.current)
          observer.unobserve(ref?.current) /* eslint-disable-line */
      }
      /* eslint-disable-next-line */
    }, [ref, options])
  } catch (error) {
    /* eslint-disable-next-line */
    console.log("ViewEvent failed", error)
  }
}

export const fireViewAnalytics = (
  props: {
    analyticsData?: any
    items: any
    source?: any
    previousIndex?: any
    widgetIndex: any
    metadata: any
    _type?: any
    variant?: any
    title?: any
    subtitle?: any
    parentVariant?: any
    customPayload?: any
  },
  ref: any
) => {
  const {
    _type,
    variant,
    metadata,
    title,
    subtitle,
    widgetIndex,
    parentVariant,
    customPayload,
    items,
  } = props
  if (parentVariant) {
    props = { ...props, widgetIndex: props?.analyticsData?.widgetIndex }
    return
  }
  // Check if there are any Group inside a Group
  const returnItemLength = (itemArray: any[]) => {
    let length = 0
    itemArray &&
      itemArray.forEach((item: { _type: string; items: any }) => {
        if (item?._type === "group") length += returnItemLength(item?.items)
        else length++
      })
    return length
  }

  const digitalData = {
    page_referrer:
      global?.window?.localStorage?.getItem("previousPageURL") ?? "",
    page_path: global?.window?.location?.href,
    page_referrer_title:
      global?.window?.localStorage?.getItem("previousPageTitle") ?? "",
    device: global?.window?.innerWidth > 768 ? "PWA" : "MobilePWA",
    loyalty_level: global?.window?.localStorage?.getItem("customerHash")
      ? "neupass"
      : "",
    customer_id: global?.window?.localStorage?.getItem("customerHash")
      ? global?.window?.localStorage?.getItem("customerHash")?.toString()
      : "",
    component_id: metadata?.identifier,
    event_type: "view",
    widget_type: _type,
    item_type: items?.[0]?._type,
    widget_powered_by: props?.items?.[0]?.source ?? "sanity",
    widget_title: title,
    widget_description: subtitle,
    widget_position: widgetIndex,
    no_of_items: returnItemLength(props?.items),
    index: widgetIndex,
  }
  ViewEvent(ref, digitalData)
}
