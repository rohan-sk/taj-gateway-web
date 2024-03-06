import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { PropertyStore } from "../../../../store"

const HotelInformation = ({
  groupLargeVariant,
  aesthetic,
  charactersLimit,
  groupActionType,
  alignmentVariant,
  groupMobileVariant,
  title,
}: any) => {
  const ihclContext = useContext(IHCLContext)
  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const { propertyData } = ihclContext?.getGlobalStore(
    GLOBAL_STORES?.propertyStore
  ) as PropertyStore
  useEffect(() => {
    setComponentData({
      hotelAddress: propertyData?.hotelAddress,
      hotelAvailability: propertyData?.hotelAvailability,
      hotelContact: propertyData?.hotelContact,
      hotelDocuments: propertyData?.hotelDocuments,
    })
    setTitle(propertyData?.hotelAvailability?.sectionTitle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let groupData = {
    items: { data: componentData, groupActionType: groupActionType },
    charactersLimit: charactersLimit,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    isComponentFullWidth: false,
    title: { ...sectionTitle, headingElement: title?.headingElement },
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
  }

  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}

export default HotelInformation
