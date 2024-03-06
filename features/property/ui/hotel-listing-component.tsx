import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

import { Box } from "@mui/material"
import { fetchHotelListingData } from "../../../utils/fetchRoomData"
import { useMobileCheck } from "../../../utils/isMobilView"

const AllHotelsListingComponent = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  isHidden = false,
}: any) => {
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [title, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()

  const getAllHotelListing = async () => {
    const data = await fetchHotelListingData()
    setComponentItemsData(data)
  }
  useEffect(() => {
    getAllHotelListing()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let groupData = {
    items: componentItemData?.map((item: any, index: any) => {
      return {
        ...item,
        _type: "card",
        title: item?.hotelName,
        description: item?.hotelDescription,
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
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        url: ctaActionData?.url,
        largeVariant: cardLargeVariant,
        charactersLimit: isMobile
          ? mobileCardCharactersLimit
          : cardCharactersLimit,
        largeImage: {
          _type: "image",
          asset: {
            _ref: "image-e9edd89086a6722308c9818d9e66e40dda913e06-700x430-png",
            _type: "reference",
          },
        },
      }
    }),
    largeVariant: groupLargeVariant,
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    variant: "loyalty.image-aligned-button",
    isComponentFullWidth: false,
    title: title,
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
    isHidden: isHidden,
  }
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(AllHotelsListingComponent)
