import React, { useCallback, useContext, useEffect, useState } from "react"
import { CONSTANTS } from "../constants"
import { getClient } from "../../lib-sanity"
import { fetchGiftCards } from "../../lib/utils"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { ActionProps, ImageProps, parameterMapItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardThemeStore from "../../features/giftCard/store/pageStore/giftCardThemeStore"
import {
  LoadMoreActionBox,
  LoadMoreActionGrid,
  StyledExpandMoreIcon,
  StyledExpandMoreButton,
  MinHeightWrapper,
} from "./styles/common-styled-components"
import { GAStore, UserStore } from "../../store"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { UseAddress } from "../../utils/hooks/useAddress"
import { handleViewItemListGC } from "../../utils/analytics/events/Ecommerce/GC-Journey/view-item-list-gc"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"

type GroupWithThreeColumnCardsGridProps = {
  variant: string
  isDropDown?: boolean
  isSearchEnabled?: boolean
  preRenderItemsCount: number
  characterLimitForItemDescription?: number
  props: GroupWithThreeColumnCardsGridItems[]
  parameterMap?: any | parameterMapItems[] | undefined
  parentProps?: any
  analyticsEventProps: any
  isDynamic?: boolean
}
type GroupWithThreeColumnCardsGridItems = {
  _key: string
  title: string
  _type: string
  urlType: string
  variant: string
  image: ImageProps
  description: string
  largeVariant: string
  largeImage: ImageProps
  alignmentVariant: string
  primaryAction: ActionProps
  isMultiBlockContent: boolean
}

const GroupWithThreeColumnGiftCardsGrid = ({
  props,
  preRenderItemsCount,
  parentProps,
  analyticsEventProps,
}: GroupWithThreeColumnCardsGridProps) => {
  const [maxHeight, setMaxHeight] = useState<number>(0)

  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(
    UserStore,
    gaStoreData,
    analyticsEventProps?.analyticsData?.title?.mobileTitle?.[0],
    analyticsEventProps?.analyticsData?.subTitle,
    analyticsEventProps?.analyticsData?._type,
  )
  const address = UseAddress(UserStore)

  const initialCardsToShow = preRenderItemsCount ? preRenderItemsCount : isMobile ? CONSTANTS?.THREE : CONSTANTS?.SIX

  const giftCardThemeStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardThemeStore,
  ) as GiftCardThemeStore

  const [cardsData, setCardsData] = useState<any>([])
  const [countToShowCards, setCountToShowCards] = useState<number>(initialCardsToShow)
  const isGiftCardDynamic = (parentProps?.isDynamic && cardsData?.length === 2) ?? parentProps?.isDynamic
  const pageSectionTitle = isMobile
    ? `${analyticsEventProps?.analyticsData?.title?.mobileTitle[0]}` +
      `${analyticsEventProps?.analyticsData?.title?.mobileTitle[1]}`
    : analyticsEventProps?.analyticsData?.title?.desktopTitle?.[0]
  useEffect(() => {
    setCountToShowCards(initialCardsToShow)
    if (cardsData && cardsData?.length > 1) {
      handleViewItemListGC("view_item_list", dataLayer, cardsData, address, pageSectionTitle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCardsToShow, cardsData?.length > 1])

  const fetchedData = async () => {
    const query = fetchGiftCards()
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setCardsData(data)
      })
  }

  useEffect(() => {
    if (parentProps?.isDynamic) {
      setCardsData(props)
    } else {
      giftCardThemeStore && fetchedData()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentProps?.isDynamic, props])

  const setTitleHeight = useCallback((height: any) => {
    setMaxHeight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])
  return (
    <>
      <MinHeightWrapper>
        <Grid
          justifyContent={parentProps?.isDynamic ? "center" : "initial"}
          container
          rowGap={isMobile ? (isGiftCardDynamic ? MobilePxToVw(41) : MobilePxToVw(55)) : DesktopPxToVw(72)} // this rowSpacing took from global template
          columnGap={isMobile ? MobilePxToVw(35) : isGiftCardDynamic ? DesktopPxToVw(100) : DesktopPxToVw(40)}>
          {cardsData?.slice(0, countToShowCards)?.map((item: GroupWithThreeColumnCardsGridItems, index: number) => (
            <Grid
              key={index}
              item
              xs={isMobile ? (isGiftCardDynamic ? 12 : 5.55) : 5.55}
              sm={isMobile ? (isGiftCardDynamic ? 12 : 5.55) : 3.75}
              md={3.75}
              lg={3.75}
              xl={3.75}>
              {context?.renderComponent(
                "card",
                {
                  ...item,
                  largeVariant: "loyalty.image-aligned-button",
                  variant: "loyalty.image-aligned-button",
                  primaryAction: props?.[0]?.primaryAction,
                  maxHeight,
                  setTitleHeight,
                  isDynamic: isGiftCardDynamic ?? parentProps?.isDynamic,
                },
                (parentProps = { index, analyticsEventProps }),
              )}
            </Grid>
          ))}
        </Grid>
      </MinHeightWrapper>
      {countToShowCards > cardsData?.length || countToShowCards > (isMobile ? 10 : cardsData?.length) ? null : (
        <>
          {countToShowCards < cardsData?.length && (
            <LoadMoreActionGrid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ marginTop: isMobile ? "14.063vw" : "4.167vw" }}>
              <>
                {isMobile ? (
                  <StyledExpandMoreButton
                    sx={{
                      minWidth: "37.188vw",
                    }}
                    variant="light-outlined"
                    endIcon={
                      <StyledExpandMoreIcon
                        sx={{
                          height: "3.875vw",
                        }}
                      />
                    }
                    onClick={() => {
                      setCountToShowCards(countToShowCards + 2)
                    }}>
                    {CONSTANTS?.LOAD_MORE}
                  </StyledExpandMoreButton>
                ) : (
                  <>
                    <LoadMoreActionBox>
                      <Typography
                        variant="link-m"
                        onClick={() => {
                          setCountToShowCards(countToShowCards + 3)
                        }}>
                        {CONSTANTS?.LOAD_MORE}
                      </Typography>
                      <StyledExpandMoreIcon />
                    </LoadMoreActionBox>
                  </>
                )}
              </>
            </LoadMoreActionGrid>
          )}
        </>
      )}
    </>
  )
}

export default GroupWithThreeColumnGiftCardsGrid
