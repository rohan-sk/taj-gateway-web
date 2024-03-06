import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Box } from "@mui/material"
import { fetchHotelGalleryData } from "../../../utils/fetchRoomData"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { hotelRoute } from "./constants"
import { useRouter } from "next/router"
import { RestaurantStore } from "../../../store"
import { GLOBAL_STORES } from "../../../utils/Constants"

const HotelDetailsGallery = ({
  contentType,
  groupLargeVariant,
  alignmentVariant,
  aesthetic,
  cardActionType,
  title,
  isHidden = false,
}: any) => {
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const restaurantStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES.restaurantStore
  ) as RestaurantStore
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex(
        (route: any) => route === hotelRoute
      )
      let response = await fetchHotelGalleryData(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        contentType
      )
      if (response) {
        let { [contentType]: value } = response
        if (contentType === "hotelGallery") {
          setComponentData(value)
          setComponentItemsData(value?.mediaDetails)
          setTitle(value?.sectionTitle)
        }
      }
    }
    if (contentType === "hotelGallery") {
      fetchHotelData()
    } else {
      setTitle(title)
      setComponentItemsData(
        restaurantStore?.restaurantData?.[0]?.restaurantGallery
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  let groupData = {
    items: {
      contentType: contentType,
      componentItemData: componentItemData,
      primaryAction:
        cardActionType?.length > 0
          ? cardActionType?.find(
              (action: any) => action?.actionType === "primaryAction"
            )?.primaryAction
          : {},
    },
    largeVariant: groupLargeVariant,
    variant: groupLargeVariant,
    isComponentFullWidth: false,
    title: { ...sectionTitle, headingElement: title?.headingElement },
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
    isHidden: isHidden,
  }

  return (
    <Box>
      {groupData?.items?.componentItemData?.length > 0 &&
        ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default observer(HotelDetailsGallery)
