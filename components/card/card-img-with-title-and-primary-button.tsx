import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { Box, CardMedia, Typography } from "@mui/material"
import { ActionProps, ImageProps } from "../types"
import React, { useContext } from "react"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { getCookie } from "../../utils/cookie"
import { useMobileCheck } from "../../utils/isMobilView"
import { UseAddress } from "../../utils/hooks/useAddress"
import getGiftCardDetails from "../../utils/fetchGiftCardDetails"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { AFFILIATION, PAGE_LANG, TAJ_HOTELS } from "../../utils/analytics/constants"
import { CardActionContainer } from "./styles/card-img-with-title-and-primary-button.styles"
import { CONSTANTS } from "../constants"
import { handleGCSelect } from "../../utils/analytics/events/Ecommerce/GC-Journey/view-item-gc"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardImageWithPrimaryButtonProps = {
  name: string
  subTitle?: string
  largeImage?: ImageProps
  frontCover?: ImageProps | any
  primaryAction: ActionProps
  cardPreview: any
  images: any
  sku: string
  parentProps: any
  heroSubtitle?: string
  eGiftCardSubtitle?: string
  url?: string
  setTitleHeight: (height: number) => void
  maxHeight: number
  largeVariant: string
  isSubCategory?: boolean
  identifier?: string
  isDynamic?: boolean
}

const CardImageWithPrimaryButton = ({
  name,
  primaryAction,
  cardPreview,
  sku,
  parentProps,
  setTitleHeight,
  maxHeight,
  largeVariant,
  identifier,
  isSubCategory,
  largeImage,
  isDynamic,
}: CardImageWithPrimaryButtonProps) => {
  const { index, analyticsEventProps }: any = parentProps
  const img = cardPreview?.frontImage?.largeImage?.asset?._ref || largeImage?.asset?._ref
  const altText = cardPreview?.frontImage?.largeImage?.asset?._ref
    ? cardPreview?.frontImage?.largeImage?.altText
    : largeImage?.altText
  const [gcDetails, setGcDetails] = useState<any>()
  const [imgLoaded, setImgLoaded] = useState<boolean>(false)
  const titleElementRef = useRef<HTMLElement | null>(null)
  const isMobile = useMobileCheck()

  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  const context = useContext(IHCLContext)
  const giftCardGlobalStore: any = context?.getGlobalStore(GLOBAL_STORES?.giftCardStore)

  const IsOutBound = analyticsEventProps?.analyticsData?.items?.[0]?.urlType === "internal"

  const data = parentProps?.analyticsEventProps?.analyticsData

  const IHCLContexts = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const router = useRouter()
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(
    userStore,
    gaStoreData,
    analyticsEventProps?.analyticsData?.title?.mobileTitle?.[0],
    analyticsEventProps?.analyticsData?.subTitle,
    analyticsEventProps?.analyticsData?._type,
  )
  const address = UseAddress(userStore)
  const giftCardType = gcDetails?.isPhysicalGIftCard ? "Physical-gift card" : "E-gift card"

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const handlePurchase = async (theme: string) => {
    await giftCardManageStore?.GCClearCart()
    giftCardGlobalStore?.updateEGiftCardTheme(theme)
    global?.window?.sessionStorage?.setItem("gcPurchaseStartPath", router?.asPath)
    if (isSubCategory) {
      router.push({
        pathname: `/gc/${identifier}`,
      })
      handleGCSelect("select_item", dataLayer, giftCardType, primaryAction, gcDetails, address, data, name, index)
    } else {
      router.push({
        pathname: `/gift-card/details`,
        query: { sku },
      })
      handleGCSelect("view_item", dataLayer, giftCardType, primaryAction, gcDetails, address, data, name, index)
    }
  }

  const handleGcType = (url: any, title: any, name: string) => {
    triggerEvent({
      action: "giftCardTypeSelected",
      params: {
        ...dataLayer,
        buttonLinkName: title || "",
        link_text: title || "",
        link_url: url || "",
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        gifCardValue: "",
        giftCardQuantity: "",
        location: "",
        eventDate: "",
        clientId: getCookie("_ga")?.slice(6),
        giftCardCategory: giftCardType || "",
        giftCardType: name || "",
        outbound: IsOutBound ? false : true || "",
        item_name: name || "",
        item_type: data?._type || "",
        no_of_items: data?.items?.length || "",
        pageSection: data?.title?.mobileTitle?.[0],
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${AFFILIATION}",` + `"${url.replace("/", "").toUpperCase()}"]`,
        ),
        pageURL: `${global?.window?.location.origin}` + `${url}`,
      },
    })
  }

  useMemo(() => {
    const fetchGCDetails = async () => {
      const skuDetails = await getGiftCardDetails(sku)
      setGcDetails(skuDetails?.[0])
    }
    fetchGCDetails()
  }, [sku])

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxHeight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxHeight, setTitleHeight, titleHeight])
  return (
    <Box aria-label={largeVariant} sx={{ display: imgLoaded ? "block" : "none" }}>
      {img && (
        <CardMedia alt={altText || name} component={"img"} onLoad={() => setImgLoaded(true)} src={urlFor(img).url()} />
      )}
      <CardActionContainer $isDynamic={isDynamic && isDynamic} $isTwoLiner={name?.length > CONSTANTS?.FIFTEEN}>
        <Typography
          variant={isMobile ? "m-heading-xs" : "heading-xs"}
          ref={titleElementRef}
          sx={{ height: maxHeight ? maxHeight : "auto" }}>
          {name}
        </Typography>

        <RenderActionItem
          onClick={() => {
            handlePurchase(name), handleGcType(primaryAction?.url, primaryAction?.title, name)
          }}
          url=""
          title={primaryAction?.title}
          navigationType={primaryAction?.urlType}
          isActionButtonType={true}
          variant={primaryAction?.variant}
          buttonStyles={{
            letterSpacing: "1.8px",
            whiteSpace: isMobile ? (isDynamic ? "nowrap !important" : "initial") : "nowrap",
          }}
        />
      </CardActionContainer>
    </Box>
  )
}

export default observer(CardImageWithPrimaryButton)
