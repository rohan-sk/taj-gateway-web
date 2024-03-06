import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { BrandRestaurantStore, HolidayStore } from "../../../store"
import fetchOtherBrandRestaurants from "../../../utils/fetchOtherBrandRestaurants"
import { restaurantsRoute, tajHolidayExperiencesRoute } from "./constants"
import {
  fetchHolidayOffers,
  fetchHolidayOffersWithidentifier,
} from "../../../utils/fetchHolidayOffers"

const RestaurantThreeCardCarousellayoutPlaceHolder = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  mobileCharactersLimit,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  heading,
  title,
  headingElementForCard,
  isHidden = false,
}: any) => {
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const brandRestaurantStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES.brandRestaurantStore
  ) as BrandRestaurantStore
  const [sectiontitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [groupData, setGroupData] = useState<any>()
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel
  const holidayStore: any = ihclContext?.getGlobalStore(
    GLOBAL_STORES.holidayStore
  ) as HolidayStore

  useEffect(() => {
    async function fetchData() {
      let response =
        contentType === "holidayDetails"
          ? await fetchHolidayOffersWithidentifier(
              holidayStore?.holidayData?.identifier
            )
          : contentType === "holidayOffers"
          ? await fetchHolidayOffers()
          : await fetchOtherBrandRestaurants(
              brandRestaurantStore?.brandRestaurantData?.identifier
            )
      if (response) {
        if (contentType === "otherbrandRestaurants") {
          setComponentData(
            brandRestaurantStore?.brandRestaurantData?.otherBrandsSection
          )
          setTitle(title)
          setComponentItemsData(response)
        } else if (contentType === "holidayOffers") {
          setComponentData({ ...componentData, description: heading })
          setTitle(title)
          setComponentItemsData(response)
        } else if (contentType === "holidayDetails") {
          setComponentData({ ...componentData, description: heading })
          setTitle(title)
          setComponentItemsData(response)
        }
      }
    }
    if (
      contentType === "otherbrandRestaurants" ||
      contentType === "holidayOffers" ||
      contentType === "holidayDetails"
    ) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(
    () => {
      setGroupData({
        items: componentItemData?.map((item: any, index: any) => {
          return {
            ...item,
            title: item?.title,
            description: item?.description,
            ctaLabel: ctaActionData?.title,
            urlType: ctaActionData?.urlType,
            url:
              contentType === "holidayOffers" ||
              contentType === "holidayDetails"
                ? `/${tajHolidayExperiencesRoute}/${item?.identifier}`
                : `/${restaurantsRoute}/${item?.identifier}`,
            largeVariant: cardLargeVariant,
            _type: "card",
            largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
            highlights: [],
            primaryAction:
              cardActionType?.length > 0
                ? {
                    ...cardActionType?.find(
                      (action: any) => action?.actionType === "primaryAction"
                    )?.primaryAction,
                    url:
                      contentType === "holidayOffers" ||
                      contentType === "holidayDetails"
                        ? `/${tajHolidayExperiencesRoute}/${item?.identifier}`
                        : `/${restaurantsRoute}/${item?.identifier}`,
                  }
                : {},
            secondaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find(
                    (action: any) => action?.actionType === "secondaryAction"
                  )?.secondaryAction
                : {},
            alignmentVariant: cardAlignmentVariant,
            variant: cardMobileVariant,
            headingElementForCard: headingElementForCard,
          }
        }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: "ihcl.core.group.carousel-with-three-column-grid",
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title: sectiontitle,
        alignmentVariant: alignmentVariant,
        subTitle: componentData?.description,
        variant: "details.group.center-card-carousel",
        aesthetic: aesthetic,
        isHidden: isHidden,
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData]
  )
  return (
    <Box>
      {groupData?.items?.length > 0 &&
        ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default observer(RestaurantThreeCardCarousellayoutPlaceHolder)
