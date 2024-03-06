import { triggerEvent } from "../.."
import { getCookie } from "../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../constants"

export const handleFooter = (
  eventName: string,
  title: any,
  url: any,
  dataLayer: any,
  gaStoreData: any,
  widgetType: any,
  widgetTitle: any,
  headingTitle: string,
  titleSelected?: string,
) => {
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      option_Selected: `${headingTitle}|${titleSelected || title}`,
      buttonLinkName: title || "",
      link_url: url || "",
      link_text: title || "",
      brandName: AFFILIATION,
      clientId: getCookie("_ga")?.slice(6),
      pageTitle: url || "",
      pageURL: `${global?.window?.location.origin}` + `${url}`,
      item_type: widgetType,
      widget_type: widgetType,
      widget_title: widgetTitle,
      widget_position: widgetTitle,
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` +
          `"${PAGE_LANG}",` +
          `"${AFFILIATION || ""}",` +
          `"${url || gaStoreData?.pageData?.pageTitle}"]`,
      ),
      //   outbound: urlType == "internal" ? false : true,
      pageSection: widgetType,
    },
  })
}
