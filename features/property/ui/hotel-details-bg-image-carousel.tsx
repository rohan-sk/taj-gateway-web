import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box, useMediaQuery } from "@mui/material"
import { fetchHighlightedCardDataWithIdentifier } from "../../../utils/fetchRoomData"
import { useRouter } from "next/router"
import { hotelRoute } from "./constants"

const HotelDetailsBgImageCarousel = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  primaryAction,
  secondaryAction,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  alignmentVariant,
  groupMobileVariant,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  isHidden = false,
  headingElementForCard,
}: any) => {
  const router: any = useRouter()
  const isMobile = useMediaQuery("(max-width:641px)")
  const ihclContext = useContext(IHCLContext)
  const [title, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
      let response = await fetchHighlightedCardDataWithIdentifier(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        contentType,
      )
      if (response) {
        let { [contentType]: value } = response
        if (contentType === "hotelEventVenues") {
          setComponentData(value?.timelessWeddings)
          setComponentItemsData(value?.timelessWeddings?.weddingEvents)
          setTitle(value?.timelessWeddings?.sectionTitle)
        }
      }
    }
    fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  let groupData = {
    items: componentItemData
      ? componentItemData?.map((item: any, index: any) => {
          return {
            ...item,
            largeVariant: cardLargeVariant,
            variant: cardMobileVariant,
            _type: "card",
            largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
            primaryAction: primaryAction,
            headingElementForCard: headingElementForCard,
            backgroundImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
            title: item?.basicInfo?.title,
            description: item?.basicInfo?.description,
            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
          }
        })
      : [],
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: title,
    titleColor: " #FFFFFF",
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
    secondaryAction: secondaryAction,
    isHidden: isHidden,
  }
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(HotelDetailsBgImageCarousel)
