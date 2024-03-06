import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { DestinationStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { destinationsRoute } from "../../../property/ui/constants"

const DestinationRowCarousel = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  groupLargeVariant,
  groupMobileVariant,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardMobileVariant,
  alignmentVariant,
  title,
  heading,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  headingElementForCard,
}: any) => {
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [groupData, setGroupData] = useState<any>()
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const { selectedCountry } = destinationStore

  const fetchTabBasedProperty = (country: string) => {
    if (selectedCountry?.toLowerCase() === "all") {
      return destinationStore?.destinationData?.filter(
        (val: any) =>
          val?.thumbnail !== null &&
          val?.thumbnail !== undefined &&
          val?.thumbnail?.[0]?.imageAsset !== null &&
          val?.thumbnail?.[0]?.imageAsset !== undefined,
      )
    }
    return destinationStore?.destinationData?.filter(
      (val: any) =>
        val?.country?.toLowerCase() === country?.toLowerCase() &&
        val?.thumbnail !== null &&
        val?.thumbnail !== undefined &&
        val?.thumbnail?.[0]?.imageAsset !== null &&
        val?.thumbnail?.[0]?.imageAsset !== undefined,
    )
  }

  useEffect(() => {
    if (contentType === "allDestinations") {
      setComponentItemsData(
        fetchTabBasedProperty(selectedCountry)
          ?.filter((item: any) => item?.thumbnail)
          ?.sort((a: any, b: any) => {
            if (a?.name < b?.name) {
              return -1
            }
            if (a?.name > b?.name) {
              return 1
            }
            return 0
          })
          ?.sort(({ score: a }: any, { score: b }: any) => b - a),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, selectedCountry])

  useEffect(
    () => {
      setGroupData({
        items: componentItemData?.map((item: any, index: any) => {
          return {
            ...item,
            slidesToDisplay: 8,
            title: item?.name,
            url: `/${destinationsRoute}/hotels-in-${item?.identifier}`,
            largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
            largeVariant: cardLargeVariant,
            variant: cardMobileVariant,
            _type: "card",
            isDestinationNavigation: true,
            headingElementForCard: headingElementForCard,
            heading,
            highLights: item?.inclusions?.[0]?.basicInfo?.description,
            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
          }
        }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: "ihcl.core.group.multiple-square-card-carousel",
        variant: "ihcl.core.group.multiple-square-card-carousel",
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        // title: title,
        centerMode: false,
        heading: heading,
        alignmentVariant: alignmentVariant,
        aesthetic: aesthetic,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )
  return <Box>{groupData?.items?.length > 0 && ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(DestinationRowCarousel)
