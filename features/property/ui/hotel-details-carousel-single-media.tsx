import { Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { fetchHighlightedCardDataWithIdentifier } from "../../../utils/fetchRoomData"
import { hotelRoute } from "./constants"
import { useRouter } from "next/router"
import { useMobileCheck } from "../../../utils/isMobilView"

const HotelDetailsCarouselSingleMedia = ({
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
  title,
  headingElementForCard,
  isHidden = false,
}: any) => {
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const ihclContext = useContext(IHCLContext)
  const [sectionTitle, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel
  useEffect(() => {
    async function fetchHotelData() {
      const routerArr = router?.asPath?.split("/")
      const hotelRouteIndex = routerArr?.findIndex(
        (route: any) => route === hotelRoute
      )
      let response = await fetchHighlightedCardDataWithIdentifier(
        hotelRouteIndex > -1 ? routerArr?.[hotelRouteIndex + 1] : undefined,
        contentType
      )
      if (response) {
        let { [contentType]: value } = response
        if (contentType === "hotelWellness") {
          setComponentData(value?.wellnessDetails)
          setComponentItemsData(value?.wellnessDetails?.wellnessFacilities)
          setTitle(value?.wellnessDetails?.sectionTitle)
          setHeading(value?.wellnessDetails?.heading)
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
            primaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find(
                    (action: any) => action?.actionType === "primaryAction"
                  )?.primaryAction
                : {},
            alignmentVariant: cardAlignmentVariant,
            secondaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find(
                    (action: any) => action?.actionType === "secondaryAction"
                  )?.secondaryAction
                : {},
            mediaType: item?.basicInfo?.media?.[0]?.mediaType,
            ctaLabel: ctaActionData?.title,
            urlType: ctaActionData?.urlType,
            url: ctaActionData?.url,
            largeVariant: cardLargeVariant,
            variant: cardMobileVariant,
            _type: "card",
            largeImage:
              item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
            videoAsset: item?.basicInfo?.media?.[0]?.videoAsset
              ? item?.basicInfo?.media?.[0]?.videoAsset
              : {},
            headingElementForCard: headingElementForCard,
            parameterMap: item?.specifications,
            title: item?.basicInfo?.title,
            description: item?.basicInfo?.description,
            subTitle: item?.basicInfo?.subTitle,
            highLights: item?.highlights,
            charactersLimit: isMobile
              ? mobileCardCharactersLimit
              : cardCharactersLimit,
          }
        })
      : [],
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: { ...sectionTitle, headingElement: title?.headingElement },
    alignmentVariant: alignmentVariant,
    heading: heading,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
    isHidden: isHidden,
  }
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}
export default HotelDetailsCarouselSingleMedia
