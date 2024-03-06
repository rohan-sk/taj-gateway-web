import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { TAJ_HOTELS, PAGE_LANG, AFFILIATION } from "../../constants"

export const handleHover = (analyticsData: any, dataLayer: any, activeIndex: number, props: any, gaStoreData: any) => {
  triggerEvent({
    action: analyticsData?.analytics?.clickEvent,
    params: {
      ...dataLayer,
      widget_powered_by: analyticsData?.analytics?.poweredBy,
      location: "",
      widget_title: analyticsData?.title?.desktopTitle?.[0] || "",
      widget_description: analyticsData?.subTitle || "",
      widget_position: activeIndex,
      widget_type: analyticsData?._type || "",
      no_of_items: props?.length || "",
      index: activeIndex || "",
      component_id: analyticsData?.metadata?.identifier || "",
      title: props?.[activeIndex]?.title || "",
      clientId: getCookie("_ga")?.slice(6),
      eventType: "",
      eventName: "",
      eventPlace: "",
      eventTicketsQty: "",
      eventDate: "",
      pageSection: analyticsData?.title?.desktopTitle?.[0] || "",
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}","${PAGE_LANG}","${AFFILIATION}","${gaStoreData?.pageData?.pageTitle}"]`,
      ),
    },
  })
}
