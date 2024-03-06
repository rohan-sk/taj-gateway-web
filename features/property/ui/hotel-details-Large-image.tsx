import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { fetchHighlightedCardDataWithIdentifier } from "../../../utils/fetchRoomData"
import { Box } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useRouter } from "next/router"
import { hotelRoute } from "./constants"

const HotelDetailsLargeImage = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  groupMobileVariant,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  isHidden = false,
}: any) => {
  const isMobile = useMobileCheck()
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const [title, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr.findIndex(
        (route: any) => route === hotelRoute
      )
      let response = await fetchHighlightedCardDataWithIdentifier(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        contentType
      )
      if (response) {
        let { [contentType]: value } = response
        if (contentType === "hotelWellness") {
          setComponentData(value?.dividerImage)
          setComponentItemsData(value?.dividerImage)
          setTitle(value?.dividerImage?.sectionTitle)
          setHeading(value?.dividerImage?.heading)
        }
      }
    }
    fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let groupData = {
    items: componentItemData?.map((item: any, index: any) => {
      return {
        ...item,
        title: item?.basicInfo?.title,
        description: item?.basicInfo?.description,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        url: ctaActionData?.url,
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
        _type: "card",
        largeImage: item?.imageAsset?.largeImage?.[0],
        image: item?.imageAsset?.image?.[0],
        parameterMap: item?.specifications,
        highLights: item?.highlights,
        primaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find(
                (action: any) => action?.actionType === "primaryAction"
              )?.primaryAction
            : {},
        secondaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find(
                (action: any) => action?.actionType === "secondaryAction"
              )?.secondaryAction
            : {},
        alignmentVariant: cardAlignmentVariant,
        charactersLimit: isMobile
          ? mobileCardCharactersLimit
          : cardCharactersLimit,
      }
    }),
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: title,
    alignmentVariant: alignmentVariant,
    heading: heading,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
    isHidden: isHidden,
  }
  return (
    <Box>
      {groupData?.items?.length > 0 &&
        ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default HotelDetailsLargeImage
