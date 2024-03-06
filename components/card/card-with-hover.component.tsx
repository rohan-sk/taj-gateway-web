import { useContext, useEffect, useState } from "react"
import { urlFor } from "../../lib-sanity"
import { ActionProps, ImageProps } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { Grid } from "@mui/material"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { getCookie } from "../../utils/cookie"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { HoverCard } from "./card-foreground-hover-card.component"
import { handleHover } from "../../utils/analytics/events/NonEcommerce/hover-event"

interface analyticsItems {
  eventName: string
  poweredBy: string
}

type CardWithHoverItems = {
  title: string
  description: string
  largeImage: ImageProps
  primaryAction: ActionProps
  headingElementForCard?: any
}

const CardWithHover = ({ props, analyticsData, largeVariant }: any) => {
  const navigate = useAppNavigation()
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [loadedBgImgs, setLoadedBgImgs] = useState<string[]>([])
  const cardColorVariant = largeVariant === "aboutUs.group.split-cards"
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const { getOptimizeImageUrl } = useImageUtility()

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  let pathname = global?.window?.location?.pathname
  useEffect(() => {
    activeIndex !== undefined && handleHover(analyticsData, dataLayer, activeIndex, props, gaStoreData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = props?.map((image: any) => {
      const imgUrl =
        image?.largeImage?.asset?._ref && getOptimizeImageUrl(urlFor(image?.largeImage?.asset?._ref)?.url(), 1)
      const img = new Image()
      img.src = imgUrl || ""
      return img
    })

    Promise.all(preloadedImages?.map((image) => new Promise((resolve) => (image.onload = resolve)))).then(() =>
      setLoadedBgImgs(preloadedImages?.map((image) => image.src)),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleSelected = (handleUrl: any, handleType: any, item: any) => {
    let pathname = global?.window?.location?.pathname
    let isAboutUs = pathname?.includes("about-us")
    navigate(handleUrl, handleType)
    activeIndex !== undefined &&
      !isAboutUs &&
      triggerEvent({
        action: item?.analytics?.clickEvent,
        params: {
          ...dataLayer,
          widget_powered_by: item?.analytics?.poweredBy,
          widget_title: analyticsData?.title?.desktopTitle,
          widget_description: item?.description || "",
          widget_position: activeIndex,
          widget_type: item?._type || "",
          no_of_items: props?.length || "",
          index: activeIndex || "",
          component_id: analyticsData?.metadata?.identifier,
          title: props?.[activeIndex]?.title || "",
          clientId: getCookie("_ga")?.slice(6),
          buttonLinkName: item?.primaryAction?.title,
          link_url: item?.primaryAction?.url || "",
          location: "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          item_name: props?.[activeIndex]?.title,
          item_type: analyticsData?.title?.desktopTitle[0] || "",
          outbound: props?.primaryAction?.urlType === "internal" ? false : true,
          giftCardCategory: "",
          giftCardType: "",
          giftCardValue: "",
          giftCardQuantity: "",
          link_text: item?.primaryAction?.title,
          hamperCategory: "",
          hamperName: "",
          hamperPrice: "",
          hamperQuantity: "",
          hamperType: "",
          pageTitle: item?.primaryAction?.url.replace("/", "").toUpperCase(),
          pageURL: `${global?.window?.location.origin}` + `${item?.primaryAction?.url}`,
          pageSection: analyticsData?.title?.desktopTitle?.[0],
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` +
              `"${PAGE_LANG}",` +
              `"${AFFILIATION}",` +
              `"${item?.primaryAction?.url.replace("/", "").toUpperCase()}"]`,
          ),
        },
      })
  }

  return (
    <Grid
      aria-label="card-with-hover"
      container
      sx={{
        background: `#333 url("${loadedBgImgs[activeIndex ? activeIndex : 0] || ""}") no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transitionDuration: "0.6s !important",
        transitionTimingFunction: "ease-in-out",
        transition: "ease-in-out",
        minHeight: "32.29vw",
      }}>
      {props?.map((item: CardWithHoverItems, index: number) => (
        <HoverCard
          key={index}
          index={index}
          setActiveIndex={setActiveIndex}
          activeIndex={activeIndex}
          item={item}
          cardColorVariant={cardColorVariant}
          handleSelected={handleSelected}
        />
      ))}
    </Grid>
  )
}

export default CardWithHover
