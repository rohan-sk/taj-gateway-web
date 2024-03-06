import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import { HolidayStore, OffersStore, UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import SearchFilter from "../../../destination/ui/searchComponent/SearchFilter"
import { getFilterStringCheck } from "../../../../utils/getFilterStringCheck"
import { groq } from "next-sanity"
import { getClient } from "../../../../lib-sanity"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { externalNavigation } from "../../../../components/constants"
import { CrossSiteNavigation } from "../../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { hotelRoute, offersRoute } from "../constants"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"

const ThreeColumnGridHolidayDetails = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardActionType,
  alignmentVariant,
  cardAlignmentVariant,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  groupMobileVariant,
  cardMobileVariant,
  heading,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  title,
  parameterMap,
  filterAlignment,
}: any) => {
  const navigate = useAppNavigation()
  const router: any = useRouter()
  const isMobile = useMobileCheck()
  const isLogin = useLoggedIn()
  const ihclContext = useContext(IHCLContext)
  const [fetchResponse, setFetchResponse] = useState<any>()
  const [facets, setFacets] = useState<any>({ destination: [], theme: [] })
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [groupData, setGroupData] = useState<any>()
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const holidayStore: any = ihclContext?.getGlobalStore(GLOBAL_STORES.holidayStore) as HolidayStore
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const [searchFilters, setSearchFilters] = useState<any>({
    destination: "",
    theme: "",
  })
  const [selectedMultipackageOfferData, setSelectedMultipackageOfferData] = useState<any>()
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore
  const removeDuplicates = (arr: any, keys: any) => {
    return arr?.filter(
      (
        (s) => (o: any) =>
          ((k) => !s?.has(k) && s?.add(k))(keys.map((k: any) => o?.[k])?.join("|"))
      )(new Set()),
    )
  }

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  useEffect(() => {
    if (contentType === "holidayOffers") {
      let hotels: any = []
      holidayStore?.holidayData?.themes?.map?.((obj: any) => {
        hotels = [
          ...hotels,
          ...obj?.participatingHotels?.filter((hotelData: any) => {
            return obj?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
          }),
        ]
      })
      setComponentItemsData(removeDuplicates(hotels, ["hotelId", "identifier"]))
      setFetchResponse(removeDuplicates(hotels, ["hotelId", "identifier"]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    let themeArr = holidayStore?.holidayData?.themes?.map(({ title }: any) => title)
    setFacets({
      ...facets,
      theme: themeArr?.length > 0 ? themeArr : [],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResponse])

  useEffect(() => {
    let hotels: any = []
    holidayStore?.holidayData?.themes?.map?.((obj: any) => {
      hotels = [
        ...hotels,
        ...obj?.participatingHotels?.filter((hotelData: any) => {
          return obj?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
        }),
      ]
    })
    if (parameterMap?.length > 0 && contentType === "holidayOffers") {
      const searchQueryFilter =
        searchFilters?.theme && searchFilters?.theme !== ""
          ? holidayStore?.holidayData?.themes
              ?.filter((val: any) => {
                return val?.title?.toLowerCase() === searchFilters?.theme?.toLowerCase()
              })?.[0]
              ?.participatingHotels?.filter((hotelData: any) => {
                return (
                  holidayStore?.holidayData?.themes
                    ?.filter((val: any) => {
                      return val?.title?.toLowerCase() === searchFilters?.theme?.toLowerCase()
                    })?.[0]
                    ?.comparingHotels?.findIndex((val: any) => val?.identifier === hotelData?.identifier) > -1
                )
              })
          : removeDuplicates(hotels, ["hotelId", "identifier"])
      const filterCheck =
        searchFilters?.destination && searchFilters?.destination !== ""
          ? searchQueryFilter?.filter((val: any) => {
              return getFilterStringCheck(val?.hotelName)?.includes(getFilterStringCheck(searchFilters?.destination))
            })
          : searchQueryFilter

      setComponentItemsData(filterCheck)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilters])
  const selectedPackageOffer = async (hotel_ref?: string | undefined) => {
    const query = groq`*[_type == "offerPackages" && offerType != "cug" && holidayOffer == true && hotels[].participatingHotels[]._ref match "${hotel_ref}"]{
      "inclusionIdentifier":identifier,lengthOfStay,
        title}`
    let data
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
        // setParticipatingHotels(res?.hotels?.[0]?.participatingHotels)
        setSelectedMultipackageOfferData(res)
        return res
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  useEffect(
    () => {
      setGroupData({
        items: componentItemData?.map((item: any, index: any) => {
          const ctaLabelAction = () => {
            if (contentType === "holidayOffers") {
              const brand = item?.brandName?.toUpperCase()
              const navUrl = externalNavigation[brand]
              if (item?.brandName?.toLowerCase() !== "taj") {
                CrossSiteNavigation({
                  url: `${navUrl}/${item?.identifier}/${offersRoute}?`,
                  loggedIn: isLogin,
                  userStore,
                })
              } else {
                navigate(`/${hotelRoute}/${item?.identifier}/${offersRoute}#hotelHolidays`)
              }
            } else {
              navigate(ctaActionData?.url, ctaActionData?.urlType)
            }
          }
          const onPrimaryClick = async () => {
            const primaryActionData =
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                : {}
            const data = await selectedPackageOffer(item?._id)
            await offerStore?.setSelectedOfferTitle({
              title: item.hotelName,
              rateCode: item?.rateCode,
              promoCode: item?.promoCode,
              participatingHotels: [],
              packages: data || selectedMultipackageOfferData,
              hotelInformation: {
                hotelName: item.hotelName,
                hotelId: item?.hotelId,
                brandName: item?.brandName,
                city: item?.hotelAddress?.city,
                country: item?.hotelAddress?.country,
                pincode: item?.hotelAddress?.pincode,
                state: item?.hotelAddress?.state,
                hotelType: item?.hotelType,
                synxisHotelId: item?.synxisHotelId,
                hotelCode: item?.hotelCode,
                identifier: item?.identifier,
              },
            })
            navigate(primaryActionData?.url, primaryActionData?.urlType)
          }

          return {
            ...item,
            title: item?.hotelName,
            description: item?.hotelDescription,
            ctaLabel: ctaActionData?.title,
            urlType: ctaActionData?.urlType,
            url: ctaActionData?.url,
            largeVariant: cardLargeVariant,
            _type: "card",
            largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
            image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
            onPrimaryClick,
            ctaLabelAction,
            highlights: [],
            primaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                : {},
            secondaryAction:
              cardActionType?.length > 0
                ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
                : {},
            alignmentVariant: cardAlignmentVariant,
            variant: cardMobileVariant,
            charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
          }
        }),
        charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
        largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
        isComponentFullWidth: isComponentFullWidth,
        isMobileComponentFullWidth: isMobileComponentFullWidth,
        title: "",
        alignmentVariant: alignmentVariant,
        subTitle: "",
        variant: groupMobileVariant,
        aesthetic: aesthetic,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [componentItemData],
  )

  const getFilterComponent = () => {
    return (
      <SearchFilter
        filters={parameterMap}
        filterAlignment={filterAlignment}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
      />
    )
  }

  return (
    <Box
      sx={{
        background: aesthetic?.backgroundColor?.hex,
        padding: contentType === "holidayOffers" ? `0  ${isMobile ? "12.8vw" : "0"}` : "5.45vw 0",
      }}>
      <Box>
        <MultiRowTitle
          title={{
            ...title,
            headingElement: title?.headingElement,
          }}
          charactersLimit={charactersLimit}
          aesthetic={aesthetic}
          subTitle={heading}
          alignmentVariant={alignmentVariant}
          isComponentFullWidth={true}
          isMobileComponentFullWidth={true}
          isFilterAvailable={parameterMap?.length > 0}
        />
      </Box>
      {parameterMap?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw 0vw 12.5vw",
          }}>
          {getFilterComponent()}
        </Box>
      )}
      {ihclContext?.renderComponent("group", groupData)}
    </Box>
  )
}

export default observer(ThreeColumnGridHolidayDetails)
