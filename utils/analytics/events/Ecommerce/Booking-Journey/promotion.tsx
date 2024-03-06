import { triggerEvent } from "../../.."
import { getCookie } from "../../../../cookie"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../../constants"

export const handlePromotion = (
  eventName: string,
  dataLayer: any,
  props: any,
  activeIndex: any,
  gaStoreData: any,
  url?: any,
  urlType?: any,
  title?: string,
  item?: any
) => {
  let isViewPromotion = eventName === "view_promotion"
  triggerEvent({
    action: eventName,
    params: {
      ...dataLayer,
      buttonLinkName: isViewPromotion ? "" : title,
      link_url: isViewPromotion ? "" : url,
      link_text: isViewPromotion ? "" : title,
      clientId: getCookie("_ga")?.slice(6),
      item_type: isViewPromotion
        ? props?.items?.[activeIndex]?._type
        : item?._type,
      item_name: isViewPromotion
        ? props?.items?.[activeIndex]?.title
        : item?.title,
      widget_type: props?._type,
      pageSection:
        `${props?.title?.desktopTitle?.[0]}` +
        `${props?.title?.desktopTitle?.[1]}`,
      widget_title:
        `${props?.title?.desktopTitle?.[0]}` +
        `${props?.title?.desktopTitle?.[1]}`,
      outbound: urlType == "internal" ? false : true,
      widget_description: props?.subTitle,
      pageTitle: isViewPromotion
        ? gaStoreData?.pageData?.pageTitle
        : url?.replaceAll("/", "").toUpperCase(),
      pageURL: isViewPromotion
        ? global?.window?.location?.href
        : `${global?.window?.location.origin}` + `${url}`,
      pageHierarchy: JSON.parse(
        `["${TAJ_HOTELS}",` +
          `"${PAGE_LANG}",` +
          `"${AFFILIATION}",` +
          `"${
            isViewPromotion
              ? gaStoreData?.pageData?.pageTitle
              : url?.replaceAll("/", "").toUpperCase()
          }"]`
      ),
      ecommerce: {
        promotion_id: "",
        promotion_name: isViewPromotion
          ? props?.items?.[activeIndex]?.title
          : item?.title,
        promotion_description: isViewPromotion
          ? props?.items?.[activeIndex]?.description
          : item?.description,
        creative_name: " ",
        creative_slot:
          `${props?.title?.desktopTitle?.[0]}` +
          `${props?.title?.desktopTitle?.[1]}`,
      },
    },
  })
}
