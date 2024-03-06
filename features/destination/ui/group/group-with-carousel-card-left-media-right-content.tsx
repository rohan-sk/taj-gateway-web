import { Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useRouter } from "next/router"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import DestinationStore from "../../../../store/global/destination.store"
import { fetchDestinationRestaurants } from "../../../../utils/fetchDestinationRestaurants"
import { observer } from "mobx-react-lite"
import { hotelRoute, restaurantsRoute } from "../../../property/ui/constants"
import { CONTACT_MAIL_ICON, CONTACT_PHONE_ICON } from "../../../../components/forms/gift-card-form/constants"
import { useMobileCheck } from "../../../../utils/isMobilView"

const DestinationCarouselSingleMedia = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  groupMobileVariant,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  title,
  headingElementForCard,
  mobileCharactersLimit,
  cardCharactersLimit,
  mobileCardCharactersLimit,
}: any) => {
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [sectionTitle, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  useEffect(() => {
    async function fetchData() {
      const mapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `participatingHotels[]._ref match "${obj?._id}"`
      })
      let response = await fetchDestinationRestaurants(mapString?.join("||"))
      if (response) {
        if (contentType === "destinationsDining") {
          setComponentData(destinationStore?.destinationData?.[0]?.diningTab)
          setTitle(destinationStore?.destinationData?.[0]?.diningTab?.sectionTitle)
          setComponentItemsData(response)
        }
      }
    }
    if (contentType === "destinationsHighlights") {
      setComponentData(destinationStore?.destinationData?.[0]?.aboutDestination)
      setComponentItemsData(destinationStore?.destinationData?.[0]?.aboutDestination?.attractionList)
      setTitle(destinationStore?.destinationData?.[0]?.aboutDestination?.sectionTitle)
      setHeading("")
    } else if (contentType === "destinationsDining") {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const getIcons = (item: any) => {
    return item === "phone" ? (
      <Box loading="lazy" component={"img"} src={CONTACT_PHONE_ICON} alt="phone-icon" />
    ) : (
      <Box loading="lazy" component={"img"} src={CONTACT_MAIL_ICON} alt="mail-icon" />
    )
  }

  let groupData = {
    items: componentItemData
      ? componentItemData?.map((item: any, index: any) => {
          let arr = []
          if (contentType !== "destinationsDining") {
            if (item?.contact?.email?.length > 0) {
              const filteredArr = item?.contact?.email.filter((val: any) => {
                return val?.type?.toLowerCase() === "business"
              })
              if (filteredArr?.length > 0) {
                arr.push({
                  richTextKey: getIcons("email"),
                  richTextValue: filteredArr?.[0]?.email,
                  highlightColor: true,
                })
              }
            }
          }
          if (item?.contact?.phone?.length > 0) {
            const filteredArr = item?.contact?.phone.filter((val: any) => {
              return val?.type?.toLowerCase() === "business"
            })
            if (filteredArr?.length > 0) {
              arr.push({
                richTextKey: getIcons("phone"),
                richTextValue: filteredArr?.[0]?.mobile,
                highlightColor: true,
              })
            }
          }
          return {
            ...item,
            primaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                : {},
            alignmentVariant: cardAlignmentVariant,
            secondaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                : {},
            mediaType: item?.media?.[0]?.mediaType,
            largeVariant: cardLargeVariant,
            variant: cardMobileVariant,
            _type: "card",
            ctaLabel: ctaActionData?.title,
            urlType: ctaActionData?.urlType,
            url: `/${hotelRoute}/${item?.hotelIdentifier}/${restaurantsRoute}/${item?.identifier}`,
            richText: contentType === "destinationsDining" ? [...arr] : [],
            largeImage:
              contentType === "destinationsDining"
                ? item?.image?.[0]?.imageAsset?.largeImage?.[0]
                : item?.media?.[0]?.imageAsset?.largeImage?.[0],
            image:
              contentType === "destinationsDining"
                ? item?.image?.[0]?.imageAsset?.image?.[0]
                : contentType === "destinationsHighlights"
                  ? item?.media?.[0]?.imageAsset?.largeImage?.[0]
                  : item?.media?.[0]?.imageAsset?.image?.[0],
            videoAsset: item?.media?.[0]?.videoAsset ? item?.media?.[0]?.videoAsset : {},
            title: item?.title,
            description: item?.description,
            subTitle: item?.subTitle,
            headingElementForCard: headingElementForCard,
            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
          }
        })
      : [],
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: "details.group.group-with-carousel-card-left-media-right-content-aspect-ratio-2:4",
    variant: "details.group.center-card-carousel",
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: { ...sectionTitle, headingElement: title?.headingElement },
    alignmentVariant: alignmentVariant,
    heading: heading,
    subTitle: componentData?.description,
    aesthetic: aesthetic,
  }
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}
export default observer(DestinationCarouselSingleMedia)
