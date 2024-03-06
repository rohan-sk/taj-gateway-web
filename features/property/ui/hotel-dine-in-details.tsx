import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { useRouter } from "next/router"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { RestaurantStore } from "../../../store"
import HotelDineInFoodFacilities from "./hotel-dine-in-food-facilities"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { useMobileCheck } from "../../../utils/isMobilView"

const HotelDineInDetails = ({ contentType, aesthetic }: any) => {
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const restaurantStore = ihclContext?.getGlobalStore(GLOBAL_STORES.restaurantStore) as RestaurantStore
  const [componentData, setComponentData] = useState<any>()
  const [address, setAddress] = useState<any>()
  const [contactInfo, setContactInfo] = useState<any>()
  const [menuInfo, setMenuInfo] = useState({})
  useEffect(() => {
    if (contentType === "restaurantOverview") {
      setComponentData(restaurantStore?.restaurantData[0]?.hotelDetailDiningPage?.restaurantAvailability)
      setAddress(restaurantStore?.restaurantData[0]?.hotelDetailDiningPage?.restaurantAddress)
      if (restaurantStore?.restaurantData?.[0]?.restaurantDocuments) {
        setMenuInfo(
          () =>
            restaurantStore?.restaurantData?.[0]?.restaurantDocuments?.filter(
              (item: any) => item?.identifier === "menu",
            )?.[0],
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <Box
      sx={{
        padding: isMobile
          ? aesthetic?.padding?.mobile || cardPadding?.mobile
          : aesthetic?.padding?.desktop || cardPadding?.desktop,
      }}>
      <HotelDineInFoodFacilities
        props={componentData}
        address={address}
        contactInfo={contactInfo}
        menuInfo={menuInfo}
      />
    </Box>
  )
}

export default observer(HotelDineInDetails)
