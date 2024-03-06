import React, { useContext, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import { urlFor } from "../../lib-sanity"
import { ActionProps, ImageProps } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledChevronRight } from "./styles/common-styles"
import { CardMedia, Typography, useTheme, Box } from "@mui/material"
import { ActionBox, ParentBox, ContentBox, CardMediaImageContent } from "./styles/card-with-cta"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { triggerEvent } from "../../utils/analytics"
import { AFFILIATION } from "../../features/booking/constants"
import { TAJ_HOTELS, PAGE_LANG, POWERED_BY_WIDGET } from "../../utils/analytics/constants"
import { getCookie } from "../../utils/cookie"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

type CardWithCtaProps = {
  title: string
  subTitle: string
  image: ImageProps
  largeImage: ImageProps
  primaryAction: ActionProps
  variant: string
  largeVariant: string
  gridSize?: number
  headingElementForCard?: any
  _type?: any
  parentProps?: any
  maxheight: number
  setTitleHeight?: any
}

const CardWithCta = ({
  title,
  image,
  subTitle,
  largeImage,
  primaryAction,
  variant,
  largeVariant,
  gridSize = 2,
  headingElementForCard,
  _type,
  parentProps,
  maxheight,
  setTitleHeight,
}: CardWithCtaProps) => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const cardAltText = isMobile ? image?.altText : largeImage?.altText
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const { getOptimizeImageUrl } = useImageUtility()
  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  const handelClick = (url: string) => {
    url && router?.push(url)
  }
  const widgetData = parentProps?.parentProps
  const handleGcSelectedFunction = (url: any) => {
    let pathname = global?.window?.location?.pathname
    let isGiftCard = pathname?.includes("gifting-and-shopping")
    let widgetTitle = `${widgetData?.title?.desktopTitle?.[0]}` + `${widgetData?.title?.desktopTitle?.[1]}`
    let isGiftCardSelected = widgetTitle === "Taj ExperiencesGift Cards"
    if (isGiftCard && isGiftCardSelected) {
      triggerEvent({
        action: "giftCardCategorySelected",
        params: {
          ...dataLayer,
          widget_powered_by: POWERED_BY_WIDGET || "",
          index: parentProps?.index,
          buttonLinkName: primaryAction?.title || "",
          link_text: primaryAction?.title || "",
          link_url: url || "",
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          theme: "",
          clientId: getCookie("_ga")?.slice(6),
          location: "",
          brandName: AFFILIATION,
          no_of_items: widgetData?.items?.length,
          outbound: primaryAction?.urlType == "internal" ? false : true,
          widget_type: _type,
          widget_title: isMobile
            ? `${widgetData?.title?.mobileTitle?.[0]}` + `${widgetData?.title?.mobileTitle?.[1]}`
            : `${widgetData?.title?.desktopTitle?.[0]}` + `${widgetData?.title?.desktopTitle?.[1]}` || "",
          item_name: primaryAction?.title || "",
          item_type: primaryAction?._type || "",
          widget_description: widgetData?.subTitle ? widgetData?.subTitle : "",
          specialCode: "",
          giftCardCategory: title || "",
          giftCardType: "",
          pageTitle: url?.replace("/", "").toUpperCase(),
          pageURL: `${global?.window?.location.origin}` + `${url}`,
          pageSection: isMobile
            ? `${widgetData?.title?.mobileTitle?.[0]}` + `${widgetData?.title?.mobileTitle?.[1]}`
            : `${widgetData?.title?.desktopTitle?.[0]}` + `${widgetData?.title?.desktopTitle?.[1]}` || "",
          pageHierarchy: JSON.parse(
            `["${TAJ_HOTELS}",` +
              `"${PAGE_LANG}",` +
              `"${AFFILIATION}",` +
              `"${url?.replaceAll("/", "").toUpperCase()}"]`,
          ),
        },
      })
    }
  }

  return (
    <>
      {cardImage && (
        <ParentBox aria-label={isMobile ? variant : largeVariant}>
          <CardMediaImageContent onClick={() => handelClick(primaryAction?.url)}>
            <CardMedia
              alt={cardAltText || "media"}
              component="img"
              loading="lazy"
              width={"100%"}
              height={"100%"}
              src={getOptimizeImageUrl(urlFor(cardImage).url(), gridSize)}
            />
          </CardMediaImageContent>
          <ContentBox
            sx={{
              background: theme?.palette?.neuPalette?.hexOne,
            }}>
            {title && (
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                ref={titleElementRef}
                sx={{
                  color: theme?.palette?.text?.primary,
                  height: maxheight ? maxheight : "auto",
                }}
                component={headingElementForCard || "h3"}>
                {title}
              </Typography>
            )}
            {subTitle && (
              <Box mt={"0.73vw"}>
                <Typography
                  variant={isMobile ? "m-body-ml" : "body-ml"}
                  sx={{
                    color: theme?.palette?.text?.primary,
                  }}>
                  {subTitle}
                </Typography>
              </Box>
            )}
            {primaryAction?.title && (
              <ActionBox>
                <Typography
                  variant={isMobile ? "m-text-link" : "link-m"}
                  sx={{ letterSpacing: "1.8px" }}
                  onClick={() => {
                    handelClick(primaryAction?.url), handleGcSelectedFunction(primaryAction?.url)
                  }}>
                  {primaryAction?.title}
                </Typography>
                <StyledChevronRight />
              </ActionBox>
            )}
          </ContentBox>
        </ParentBox>
      )}
    </>
  )
}

export default CardWithCta
