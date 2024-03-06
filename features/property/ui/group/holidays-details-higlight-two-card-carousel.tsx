import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { HamperStore, HolidayStore, OffersStore, UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { HotelTypeData, HotelTypeDataWithoutBrandFilter } from "../../../../utils/fetchRoomData"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import { Box } from "@mui/material"
import { externalNavigation } from "../../../../components/constants"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { LOGIN_NAVIGATION } from "../../../../components/forms/gift-card-form/constants"
import { PathType } from "../../../../types"
import { fetchHamperDataWithCategory, fetchHamperDataWithIdCheck } from "../../../../utils/fetchHamperDataWithCategory"
import ModalStore from "../../../../store/global/modal.store"

const HOLIDAYSHIGLIGHTEDTWOCARDCAROUSEL = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  groupMobileVariant,
  cardMobileVariant,
  title,
  heading,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  cardAlignmentVariant,
  alignmentVariant,
}: any) => {
  const isLogin = useLoggedIn()
  const navigate = useAppNavigation()
  const router: any = useRouter()
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const modalStore = ModalStore?.getInstance()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [groupData, setGroupData] = useState<any>()
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore
  const holidayStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.holidayStore) as HolidayStore
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const hamperStore = ihclContext?.getGlobalStore(GLOBAL_STORES.hamperStore) as HamperStore

  const removeDuplicates = (arr: any, keys: any) => {
    return arr?.filter(
      (
        (s) => (o: any) =>
          ((k) => !s?.has(k) && s?.add(k))(keys.map((k: any) => o?.[k])?.join("|"))
      )(new Set()),
    )
  }

  useEffect(() => {
    const fetchHotelType = async (type: string = "Palaces") => {
      let response = await HotelTypeDataWithoutBrandFilter(type)
      if (response) {
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
        }
      }
    }
    const fetchHamperData = async (type: string) => {
      let response = await fetchHamperDataWithCategory(type)
      if (response) {
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
        }
      }
    }
    const fetchHamperDetailData = async (type: string, id: string) => {
      let response = await fetchHamperDataWithIdCheck(type, id)
      if (response) {
        if (Array?.isArray(response)) {
          setComponentItemsData(response)
        }
      }
    }
    if (contentType === "holidayOffers") {
      setComponentItemsData(holidayStore?.holidayData?.participatingOffers)
    }
    if (contentType === "holidayThemes") {
      let themes: any = []
      holidayStore?.holidayData?.map((val: any) => {
        themes = [...themes, ...val?.participatingOffers]
      })
      setComponentItemsData(removeDuplicates(themes, ["identifier"]))
    }
    if (
      contentType === "Palaces" ||
      contentType === "Resorts" ||
      contentType === "Safaris" ||
      contentType === "Hotels"
    ) {
      fetchHotelType(contentType)
    }
    if (contentType?.includes("hamperTypes_")) {
      fetchHamperData(contentType?.split("hamperTypes_")?.[1])
    }
    if (contentType === "hamperDetails") {
      fetchHamperDetailData(hamperStore?.hamperData?.[0]?.hamperId, hamperStore?.hamperData?.[0]?.identifier)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentType, router])

  useEffect(
    () => {
      setGroupData({
        items:
          contentType === "Palaces" ||
          contentType === "Resorts" ||
          contentType === "Safaris" ||
          contentType === "Hotels"
            ? getListWithBrandSorting(componentItemData)?.map((item: any, index: any) => {
                let primaryAction =
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                    : {}
                primaryAction = {
                  ...primaryAction,
                  url: `${primaryAction?.url}?hotelId=${item?.hotelId || ""}`,
                }
                let secondaryAction =
                  cardActionType?.length > 0
                    ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                    : {}
                const onCtaClick = async () => {
                  const brand = item?.brandName?.toUpperCase()
                  const navUrl = externalNavigation[brand]
                  if (item?.brandName?.toLowerCase() !== "taj") {
                    CrossSiteNavigation({
                      url: `${navUrl}/${item?.identifier}?`,
                      loggedIn: isLogin,
                      userStore,
                    })
                  } else {
                    navigate(`${ctaActionData?.url}/${item?.identifier}`)
                  }
                }
                return {
                  ...item,
                  largeImage: item?.thumbnail?.largeImage?.[0],
                  image: item?.thumbnail?.image?.[0],
                  title: item?.hotelName,
                  mediaType: "image",
                  highLights: item?.highlights,
                  description: item?.description,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  alignmentVariant: cardAlignmentVariant,
                  primaryAction,
                  secondaryAction,
                  onCtaClick: onCtaClick,
                  ctaLabel: ctaActionData?.title,
                  // urlType: item?.brandName === "Taj" ?  ctaActionData?.urlType : "external",
                  // url: item?.brandName === "Taj" ? `${ctaActionData?.url}/${item?.identifier}` : "",
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                  _type: "card",
                }
              })
            : componentItemData?.map((item: any, index: any) => {
                const onPrimaryClick = async () => {
                  if (contentType?.includes("hamperTypes_") || contentType === "hamperDetails") {
                    await modalStore?.setPropertyData({
                      hamperTitle: item?.title,
                      hotelsData: item?.participatingHotels
                        ?.map((hotel: any) => {
                          return item?.hamperSet?.map((singleSet: any) => ({
                            hotelName: hotel?.hotelName || "",
                            hamperId: hotel?.hamperId || "",
                            email: hotel?.email?.find((item: any) => item?.type === "business")?.email || "",
                            title: singleSet?.title,
                          }))
                        })
                        ?.flat(),
                    })
                    navigate(
                      cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url,
                      cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                        ?.urlType,
                    )
                  } else {
                    await offerStore?.setSelectedOfferTitle({
                      title: item.title,
                      rateCode: item?.rateCode,
                      promoCode: item?.promoCode,
                      lengthOfStay: item?.lengthOfStay,
                      participatingHotels: item?.participatingHotels ?? [],
                      selectedOfferType: item?.packageType,
                      packages: item?.packages,
                      isFromExperiences: true,
                    })
                    if (!isLogin && item?.memberSpecific) {
                      navigate(LOGIN_NAVIGATION, PathType?.dialog)
                    } else {
                      navigate(
                        cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                          ?.url,
                        cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                          ?.urlType,
                      )
                    }
                  }
                }
                return {
                  ...item,
                  title: item?.title,
                  description: item?.description,
                  ctaLabel: ctaActionData?.title,
                  urlType: ctaActionData?.urlType,
                  url: `${ctaActionData?.url}${item?.identifier}`,
                  largeVariant: cardLargeVariant,
                  variant: cardMobileVariant,
                  _type: "card",
                  largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
                  image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
                  galleryImages: item?.gallery,
                  isFromProperty: contentType === "hotelSignatureDining" ? true : false,
                  onPrimaryClick: onPrimaryClick,
                  primaryAction:
                    cardActionType?.length > 0
                      ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                      : {},
                  secondaryAction:
                    cardActionType?.length > 0
                      ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                      : {},
                  charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                }
              }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: "ihcl.core.group.highlighted-2-card-carousel",
        variant: groupMobileVariant,
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title: title,
        alignmentVariant: alignmentVariant || "regular",
        subTitle: heading,
        aesthetic: aesthetic,
      })
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )

  return <Box>{groupData?.items?.length > 0 && ihclContext?.renderComponent("group", groupData)}</Box>
}

export default observer(HOLIDAYSHIGLIGHTEDTWOCARDCAROUSEL)
