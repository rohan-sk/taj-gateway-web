import { useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import SearchFilter from "./SearchFilter"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { DestinationStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import fetchRateFilter from "../../../../utils/fetchRateFilter"
import { CONSTANTS, ICONS } from "../../../../components/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { getFilterStringCheck } from "../../../../utils/getFilterStringCheck"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import { NoResultsFoundBox } from "../../../../components/modal/styles/global-search"
import BookingFlowGlobalStore from "../../../booking/store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { dateFormatConverter, getDayAfterTomorrowDate, getTomorrowDate } from "../../../../utils/getDate"
import { NoResultContainer, NoResultTypography } from "../../../../components/card/SearchResultCards/styles/search-card"
import {
  LoadMoreActionBox,
  StyledExpandMoreIcon,
  StyledExpandMoreButton,
} from "../../../../components/group/styles/common-styled-components"

const SearchCardComponent = dynamic(() => import("./search-card-component"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))
const MultiRowTitle = dynamic(() => import("../../../../components/hoc/title/multi-row-title"))

const SearchResultCardDestinationComponent = ({
  parameterMap,
  aesthetic,
  filterAlignment,
  title,
  metadata: { journeyName },
  cardActionType,
}: any) => {
  const router = useRouter()
  const ihclContext = useContext(IHCLContext)

  //* Stores
  const destinationStore = ihclContext?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  //* Store variables
  const { loading, destinationAvailabilityData, setGlobalSearchedData } = bookingFlowGlobalStore

  const [countToShowCards, setCountToShowCards] = useState(5)
  const [facets, setFacets] = useState<any>({
    brand_name: [],
    hotel_type: [],
    hotel_feature: [],
  })
  const [hotelsData, setHotelsData] = useState<any>(destinationStore?.destinationData?.[0]?.participatingHotels || [])
  const [searchFilters, setSearchFilters] = useState<any>({
    brand_name: router?.query?.brand_name,
    hotel_type: router?.query?.hotel_type,
    hotel_feature: router?.query?.hotel_feature,
    q: router?.query?.q,
  })

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  const removeDuplicates = (arr: any) => {
    return arr?.filter((item: any, index: number) => arr?.indexOf(item) === index)
  }

  useEffect(() => {
    setSearchFilters({
      brand_name: router?.query?.brand_name,
      hotel_type: router?.query?.hotel_type,
      hotel_feature: router?.query?.hotel_feature,
      q: router?.query?.q,
    })
  }, [router])

  useEffect(() => {
    const searchQueryFilter =
      searchFilters?.q && searchFilters?.q !== "" && searchFilters?.q?.length > 2
        ? destinationStore?.destinationData?.[0]?.participatingHotels.filter((val: any) => {
            const finalString = [
              val?.hotelName || "",
              val?.hotelAddress?.state || "",
              val?.hotelAddress?.city || "",
              val?.hotelAddress?.country || "",
              val?.hotelAddress?.addressLine1 || "",
              val?.hotelAddress?.pincode || "",
              val?.description || "",
              ...[val?.facilities || []],
            ]?.toString()
            return getFilterStringCheck(finalString)?.includes(getFilterStringCheck(searchFilters?.q))
          })
        : destinationStore?.destinationData?.[0]?.participatingHotels
    const brandFilter =
      searchFilters?.brand_name && searchFilters?.brand_name !== ""
        ? searchQueryFilter.filter((val: any) => {
            return val?.brandName === searchFilters?.brand_name
          })
        : searchQueryFilter

    const hotelTypeFilter =
      searchFilters?.hotel_type && searchFilters?.hotel_type !== ""
        ? brandFilter?.filter((val: any) => {
            return val?.searchTaxonomies?.hotelType === searchFilters?.hotel_type
          })
        : brandFilter

    const hotelFeatureFilter =
      searchFilters?.hotel_feature && searchFilters?.hotel_feature !== ""
        ? hotelTypeFilter.filter((val: any) => {
            return val?.searchTaxonomies?.hotelFeature?.includes?.(searchFilters?.hotel_feature)
          })
        : hotelTypeFilter

    bookingFlowGlobalStore?.setFilteredHotelData(hotelFeatureFilter ? [...hotelFeatureFilter] : [])

    if (hotelFeatureFilter?.length > 0) {
      const filteredIDs = hotelFeatureFilter?.map((hotel: any) => hotel?.hotelId)
      const hotelIds = filteredIDs?.filter((item: any) => item)
      hotelIds?.length > 0 &&
        bookingFlowGlobalStore?.setDestinationAvailability({
          hotelIds: hotelIds,
          startDate: dateFormatConverter(getTomorrowDate()),
          endDate: dateFormatConverter(getDayAfterTomorrowDate()),
          numRooms: 1,
          adults: 1,
          children: 0,
          rateFilter: fetchRateFilter() || "RRC",
        })
    }
    setHotelsData(hotelFeatureFilter ? [...hotelFeatureFilter] : [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationStore?.destinationData, searchFilters, hotelsData?.length])

  useEffect(() => {
    let brandsArr = destinationStore?.destinationData?.[0]?.participatingHotels
      ?.map(({ brandName }: any) => brandName)
      ?.filter((item: any) => item)
    let brandFacets = removeDuplicates(brandsArr)
    let hotelTypeArr = destinationStore?.destinationData?.[0]?.participatingHotels
      ?.map(({ searchTaxonomies }: any) => searchTaxonomies?.hotelType)
      ?.filter((item: any) => item)
    let hotelTypeFacets = removeDuplicates(hotelTypeArr)
    let hotelFeatureArr = destinationStore?.destinationData?.[0]?.participatingHotels
      ?.map(({ searchTaxonomies }: any) => searchTaxonomies?.hotelFeature)
      ?.filter((item: any) => item)
    let hotelFeatureFacets = removeDuplicates(hotelFeatureArr)
    setFacets({
      brand_name: brandFacets,
      hotel_type: hotelTypeFacets,
      hotel_feature: hotelFeatureFacets,
    })
  }, [destinationStore])

  // Remove Duplicates in the Filters Array of Arrays or else Array of values
  const getRelevantTypeofValues = (hotelFeatureItems: any, getDynamicValue: any) => {
    if (typeof hotelFeatureItems === "string") {
      const isItemExist = getDynamicValue.some(
        (finalItems: any) => finalItems?.toLowerCase() === hotelFeatureItems?.toLowerCase(),
      )
      if (!isItemExist && hotelFeatureItems) {
        getDynamicValue.push(hotelFeatureItems)
      }
    } else {
      hotelFeatureItems?.map((hotelFeatureSubItems: any, index: number) => {
        const isItemExist = getDynamicValue.some(
          (finalItems: any) => finalItems?.toLowerCase() === hotelFeatureSubItems?.toLowerCase(),
        )
        if (!isItemExist && hotelFeatureSubItems) {
          getDynamicValue.push(hotelFeatureSubItems)
        }
      })
    }
  }

  const filteredData: any = useMemo(() => {
    let uniqueHotelBrand: any[] = []
    facets?.brand_name?.length > 0 &&
      facets?.brand_name?.map((hotelFeatureItems: any, index: number) => {
        getRelevantTypeofValues(hotelFeatureItems, uniqueHotelBrand)
      })

    let uniqueHotelType: any[] = []
    facets?.hotel_type?.length > 0 &&
      facets?.hotel_type?.map((hotelFeatureItems: any, index: number) => {
        getRelevantTypeofValues(hotelFeatureItems, uniqueHotelType)
      })

    let uniqueHotelFeatures: any[] = []
    facets?.hotel_feature?.length > 0 &&
      facets?.hotel_feature?.map((hotelFeatureItems: any, index: number) => {
        getRelevantTypeofValues(hotelFeatureItems, uniqueHotelFeatures)
      })

    return { uniqueHotelBrand, uniqueHotelType, uniqueHotelFeatures }
  }, [facets])

  const getFilterComponent = () => {
    return (
      <SearchFilter
        filters={parameterMap}
        filterAlignment={filterAlignment}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={filteredData}
        getKey={getKey}
        setCountToShowCards={setCountToShowCards}
      />
    )
  }

  const isMobile = useMobileCheck()

  const getHotelData = (id: any) => {
    const priceData =
      destinationAvailabilityData?.filter(
        (lead: any) => lead?.hotel?.hudiniId == id,
      )?.[0]?.price
    return priceData?.filter((item: any) => item?.type == "Minimum")?.[0]
  }
  return (
    <Box aria-label="search-card-in-destinations">
      <Box>
        <MultiRowTitle
          title={{
            ...destinationStore?.destinationData?.[0]?.hotelsTab?.sectionTitle,
            headingElement: title?.headingElement,
          }}
          charactersLimit={160}
          aesthetic={aesthetic}
          subTitle={destinationStore?.destinationData?.[0]?.hotelsTab?.description}
          alignmentVariant={"center"}
          isComponentFullWidth={true}
          isMobileComponentFullWidth={true}
        />
      </Box>
      <Box sx={{ padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw" }}>
        {getFilterComponent()}
        {hotelsData?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              marginBottom: isMobile ? "3.125vw" : "1.46vw",
              textTransform: "capitalize",
            }}>
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              <b>
                {hotelsData?.length}{" "}
                {searchFilters?.hotel_type ? searchFilters?.hotel_type : `hotel${hotelsData?.length > 1 ? "s" : ""}`}
              </b>
              <span
                style={{
                  margin: isMobile ? `0vw ${MobilePxToVw(4)}` : `0vw ${DesktopPxToVw(4)}`,
                }}>
                {destinationStore?.destinationData?.[0]?.identifier ? "in" : ""}
              </span>
            </Typography>
            {destinationStore?.destinationData?.[0]?.identifier && (
              <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                {destinationStore?.destinationData?.[0]?.identifier}
              </Typography>
            )}
          </Box>
        )}
        <>
          {loading && <LoadingSpinner />}
          {hotelsData?.length > 0 ? (
            getListWithBrandSorting(hotelsData)
              ?.slice(0, countToShowCards)
              .map((item: any, index: number) => {
                return (
                  <SearchCardComponent
                    dynamicHotelData={getHotelData(item?.hotelId)}
                    setGlobalSearchedData={setGlobalSearchedData}
                    key={index}
                    cardActionType={cardActionType}
                    {...item}
                  />
                )
              })
          ) : (
            <NoResultContainer>
              <NoResultsFoundBox
                sx={{
                  minHeight: isMobile ? MobilePxToVw(800) : DesktopPxToVw(420),
                }}>
                <NoResultTypography
                  variant={isMobile ? "m-body-l" : "body-ml"}
                  sx={{ textAlign: "center", margin: "auto" }}>
                  {CONSTANTS?.SEARCH_RESULTS_NOT_FOUND}
                </NoResultTypography>
              </NoResultsFoundBox>
            </NoResultContainer>
          )}
          {hotelsData?.length > 0 && (
            <LoadMoreActionBox
              sx={{
                justifyContent: "center",
                paddingBottom: isMobile ? "14.063vw" : "5.729vw",
              }}>
              {countToShowCards < hotelsData?.length && hotelsData?.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: DesktopPxToVw(34),
                  }}
                  onClick={() => {
                    setCountToShowCards(countToShowCards + CONSTANTS?.FIVE)
                  }}>
                  {isMobile ? (
                    <>
                      <StyledExpandMoreButton
                        variant="light-outlined"
                        endIcon={<StyledExpandMoreIcon sx={{ height: "3.875vw" }} />}>
                        {CONSTANTS?.LOAD_MORE}
                      </StyledExpandMoreButton>
                    </>
                  ) : (
                    <>
                      <Typography variant={isMobile ? "m-text-link" : "link-m"}>{CONSTANTS?.LOAD_MORE}</Typography>
                      <StyledExpandMoreIcon />
                    </>
                  )}
                </Box>
              )}
            </LoadMoreActionBox>
          )}
        </>
      </Box>
    </Box>
  )
}

export default observer(SearchResultCardDestinationComponent)
