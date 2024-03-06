import { Box } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useRouter } from "next/router"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import DestinationStore from "../../../../store/global/destination.store"
import { fetchDestinationCityOffers, fetchSearchHotelOffers } from "../../../../utils/fetchDestinationCityOffers"
import { observer } from "mobx-react-lite"
import { OffersStore } from "../../../../store"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { LOGIN_NAVIGATION } from "../../../../components/forms/gift-card-form/constants"
import { PathType } from "../../../../types"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { CONSTANTS } from "../../../../components/constants"

const DestinationOfferCard = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  cardMobileVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  title,
  heading,
  headingElementForCard,
  groupActionType,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
}: any) => {
  const navigate = useAppNavigation()
  const isLoggedIn = useLoggedIn()
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [sectionTitle, setTitle] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  useEffect(() => {
    async function fetchData() {
      const mapString = destinationStore?.destinationData?.[0]?.participatingHotels?.map((obj: any) => {
        return `hotels[].participatingHotels[]._ref match "${obj?._id}"`
      })
      let response = await fetchDestinationCityOffers(mapString?.join("||"))
      if (response?.length > 0) {
        if (contentType === "destinationsHotels" || contentType === "destinationsDining") {
          setComponentItemsData(response)
          setComponentData(destinationStore?.destinationData?.[0]?.offers)
          setTitle(destinationStore?.destinationData?.[0]?.offers?.sectionTitle)
        }
      }
    }

    async function fetchSearchHotelOfferDetails() {
      let response = await fetchSearchHotelOffers()
      if (response?.length > 0) {
        if (contentType === "searchHotelOffers") {
          setComponentItemsData(response)
          setComponentData({ ...componentData, description: heading })
          setTitle(title)
        }
      }
    }
    if (contentType === "destinationsHotels" || contentType === "destinationsDining") {
      fetchData()
    } else if (contentType === "searchHotelOffers") {
      fetchSearchHotelOfferDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  let groupData = {
    items: componentItemData
      ? componentItemData?.map((item: any, index: any) => {
          const primaryActionData = cardActionType?.find(
            (action: any) => action?.actionType === "primaryAction",
          )?.primaryAction
          const onPrimaryClick = async () => {
            await offerStore?.setSelectedOfferTitle({
              title: item.title,
              rateCode: item?.rateCode,
              promoCode: item?.promoCode,
              participatingHotels: item?.participatingHotels || [],
              selectedOfferType: item?.packageType,
              packages: item?.packages,
              lengthOfStay: item?.lengthOfStay,
            })
            if (!isLoggedIn && item?.memberSpecific) {
              navigate(LOGIN_NAVIGATION, PathType?.dialog)
            } else {
              navigate(primaryActionData?.url, primaryActionData?.urlType)
            }
          }
          let guestUserEnrolNowButton: any = {}
          if (!isLoggedIn && item?.memberSpecific) {
            guestUserEnrolNowButton = {
              ...primaryActionData,
              title: CONSTANTS?.LOGIN_JOIN,
            }
          }
          return {
            ...item,
            title: item?.title,
            description: item?.description,
            ctaLabel: ctaActionData?.title,
            urlType: ctaActionData?.urlType,
            url: `/offers/${item?.identifier}`,
            largeVariant: cardLargeVariant,
            _type: "card",
            largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
            highlights: [],
            primaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => {
                    let actionObj: any
                    if (action?.actionType === "primaryAction") {
                      actionObj = action?.primaryAction
                    }
                    return (actionObj = {
                      ...actionObj,
                      url: `${actionObj?.url}?hotelId=${item?.hotelId}`,
                    })
                  })?.primaryAction
                : {},
            secondaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                : {},
            alignmentVariant: cardAlignmentVariant,
            variant: cardMobileVariant,
            headingElementForCard: headingElementForCard,
            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
            onPrimaryClick,
            guestUserEnrolNowButton,
          }
        })
      : [],
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: { ...sectionTitle, headingElement: title?.headingElement },
    highlights: [],
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    largeVariant: "details.group.3-card-carousel",
    variant: "details.group.center-card-carousel",
    aesthetic: aesthetic,
    groupActionType: groupActionType,
  }

  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>
}
export default observer(DestinationOfferCard)
