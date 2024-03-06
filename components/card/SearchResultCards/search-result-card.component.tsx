import { useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { CONSTANTS } from "../../constants"
import { Box, Typography } from "@mui/material"
import Pluralize from "../../../utils/pluralize"
import { useMobileCheck } from "../../../utils/isMobilView"
import LoadingSpinner from "../../../utils/SpinnerComponent"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import useLocation from "../../../utils/hooks/useLocation"
import { NoResultsFoundBox } from "../../modal/styles/global-search"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { dateFormatConverter, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import searchResultsListing from "../../../features/search/store/pageStore/searchListingPage.store"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import {
  LoadMoreActionBox,
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
} from "../../group/styles/common-styled-components"
import { NoResultContainer, NoResultTypography } from "./styles/search-card"
const SearchCardComponent = dynamic(() => import("./search-card.component"))
const SearchResultPageFilter = dynamic(() => import("./search-results-page-filter.component"))

const SearchResultCardComponent = ({ parameterMap }: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const getLocation = useLocation()
  const ihclContext = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)
  const search: string | string[] | undefined = router?.query?.query

  const searchResultsListing = pageContextUse?.getPageStore(PAGE_STORES.searchResultsPage) as searchResultsListing
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    destinationAvailabilityData
  } = bookingFlowGlobalStore

  const [pageCount, setPageCount] = useState<number>(1)
  const [city, setCity] = useState(router?.query?.city || "")
  const [countToShowCards, setCountToShowCards] = useState<number>(5)
  const [paginationFilter, setPaginationFilter] = useState<any[]>([])
  const [userCategory, setCategory] = useState<any>(router?.query?.category || "hotels")
  const [searchFilters, setSearchFilters] = useState<any>({
    city: "",
    brand_name: router?.query?.["brand_name"],
    hotel_type: router?.query?.["hotel_type"],
    hotel_feature: router?.query?.["hotel_feature"],
    q: router?.query?.q,
    category: userCategory?.substring(0, userCategory.length - 1),
  })
  const [searchHolidaysFilters, setSearchHolidaysFilters] = useState<any>({
    city: "",
    experience: router?.query?.["experience"],
    theme: "",
    q: router?.query?.q,
    category: userCategory?.substring(0, userCategory.length - 1),
  })
  const [searchRestuarantFilters, setSearchRestuarantFilters] = useState<any>({
    city: "",
    restaurant_type: router?.query?.["restaurant_type"],
    cuisines: router?.query?.["cuisines"],
    dress_code: router?.query?.["dress_code"],
    q: router?.query?.q,
    category: userCategory?.substring(0, userCategory.length - 1),
  })

  const getKey: any = (index: number, filters: any): string => (filters ? Object?.keys(filters)?.[index] : "")

  const reduceObject = (obj: any) => {
    return Object?.entries(obj)?.reduce((acc: any, [key, value]: any) => {
      if (value !== "") {
        acc[key] = value
      }
      return acc
    }, {})
  }
  const fetchCategoryFilters = () => {
    switch (String(userCategory).toLowerCase()) {
      case "restaurants":
        return searchRestuarantFilters
      case "holidays":
        return searchHolidaysFilters
      case "hotels":
        return searchFilters
      default:
        return searchFilters
    }
  }
  const fetchSetterCategory = () => {
    switch (String(userCategory).toLowerCase()) {
      case "restaurants":
        return setSearchRestuarantFilters
      case "holidays":
        return setSearchHolidaysFilters
      case "hotels":
        return setSearchFilters
      default:
        return setSearchFilters
    }
  }

  const fetchData = async (isPagination: boolean) => {
    setCategory(router?.query?.category || "hotels")
    const { pid, ...params } = router?.query
    const queryParams = reduceObject({
      ...params,
      category: userCategory?.substring(0, userCategory.length - 1),
      distance: 200,
      latitude: String(getLocation?.latitude),
      longitude: String(getLocation?.longitude),
      limit: 5,
      page: pageCount,
    })
    params && router?.isReady && (await searchResultsListing?.searchResultListingApi(queryParams))
    searchResultsListing?.searchResultsListingResponse?.data &&
      setPaginationFilter((prevData: any) =>
        isPagination
          ? [...prevData, ...searchResultsListing?.searchResultsListingResponse?.data]
          : [...searchResultsListing?.searchResultsListingResponse?.data],
      )
  }

  useEffect(() => {
    setPageCount(1)
    fetchData(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLocation?.longitude, getLocation?.latitude, router?.query])

  useEffect(() => {
    pageCount > 1 && fetchData(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount])

  useEffect(() => {
    searchResultsListing?.searchResultsListingResponse?.facets?.city &&
      setCity(searchResultsListing?.searchResultsListingResponse?.facets?.city)
  }, [searchResultsListing?.searchResultsListingResponse?.facets?.city])

  const getHotelData = (id: any) => {
    const priceData =
      destinationAvailabilityData?.filter(
        (lead: any) => lead?.hotel?.hudiniId == id,
      )?.[0]?.price
    return priceData?.filter((item: any) => item?.type == "Minimum")?.[0]
  }

  useEffect(() => {
    if (userCategory === "hotels" || userCategory === "holidays") {
      let hotelIdsData = searchResultsListing?.searchResultsListingResponse?.data?.map((temp: any) => {
        return {
          hotelId: temp?.id,
        }
      })
      bookingFlowGlobalStore?.setFilteredHotelData(hotelIdsData ? [...hotelIdsData] : [])
      if (isMobile && userCategory?.toLowerCase() !== "restaurants") {
        const filteredIDs = bookingFlowGlobalStore?.filteredHotelData
          ?.map((hotel: any) => hotel?.hotelId)
          ?.filter((item: any) => item?.toLowerCase() !== "null" && item)

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResultsListing?.searchResultsListingResponse?.data, userCategory])

  const getFilterComponent = (facets: any) => {
    return (
      <SearchResultPageFilter
        filters={parameterMap}
        setSearchFilters={fetchSetterCategory()}
        searchFilters={fetchCategoryFilters()}
        setPaginationFilter={setPaginationFilter}
        facets={facets}
        getKey={getKey}
        city={city || searchResultsListing?.searchResultsListingResponse?.facets?.city}
        search={search}
        setCountToShowCards={setCountToShowCards}
      />
    )
  }
  return (
    <Box
      aria-label="SearchResultCardComponent"
      sx={{
        padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw",
      }}>
      {getFilterComponent(searchResultsListing?.searchResultsListingResponse?.facets)}
      {paginationFilter?.length > 0 && userCategory && (
        <Box
          sx={{
            display: "flex",
            marginBottom: isMobile ? "3.125vw" : "1.406vw",
            textTransform: "capitalize",
          }}>
          {searchResultsListing?.searchResultsListingResponse?.count == undefined ? (
            ""
          ) : (
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              <b>{`${(router?.query?.hotel_type &&
                Pluralize(
                  router?.query?.hotel_type?.toString()?.slice(0, -1),
                  searchResultsListing?.searchResultsListingResponse?.count,
                  false,
                )) ||
                Pluralize(userCategory?.slice(0, -1), searchResultsListing?.searchResultsListingResponse?.count, false)
                }`}</b>
              <span
                style={{
                  marginLeft: isMobile ? `${MobilePxToVw(4)}` : `${DesktopPxToVw(4)}`,
                }}>
                {"found"}
              </span>
              <span
                style={{
                  margin: isMobile ? `0vw ${MobilePxToVw(4)}` : `0vw ${DesktopPxToVw(4)}`,
                }}>
                {searchResultsListing?.searchResultsListingResponse?.facets?.city ? "in" : ""}
              </span>
            </Typography>
          )}
          {searchResultsListing?.searchResultsListingResponse?.facets?.city && (
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              {searchResultsListing?.searchResultsListingResponse?.facets?.city}
            </Typography>
          )}
        </Box>
      )}
      {paginationFilter?.map((item: any, index: number) => {
        return (
          <SearchCardComponent
            key={index}
            {...item}
            searchFilters={fetchCategoryFilters()}
            category={userCategory}
            dynamicHotelData={getHotelData(item?.id)}
          />
        )
      })}
      {searchResultsListing?.loading ? (
        <LoadingSpinner componentLevel={true}></LoadingSpinner>
      ) : (
        <>
          {paginationFilter?.length <= 0 && (
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
        </>
      )}
      {paginationFilter?.length > 0 &&
        paginationFilter?.length != searchResultsListing?.searchResultsListingResponse?.count &&
        searchResultsListing?.searchResultsListingResponse?.data?.length > 0 && (
          <LoadMoreActionBox
            sx={{
              justifyContent: "center",
              paddingBottom: isMobile ? "14.063vw" : "4.7vw",
            }}>
            <Box
              sx={{
                display:
                  paginationFilter?.length == searchResultsListing?.searchResultsListingResponse?.count
                    ? "none"
                    : "flex",
              }}
              onClick={() => {
                setCountToShowCards(countToShowCards + CONSTANTS?.FIVE)
                setPageCount(pageCount + CONSTANTS?.ONE)
              }}>
              {isMobile ? (
                <>
                  <StyledExpandMoreButton
                    variant="light-outlined"
                    endIcon={
                      <StyledExpandMoreIcon
                        sx={{
                          height: "3.875vw",
                        }}
                      />
                    }>
                    {CONSTANTS?.LOAD_MORE}
                  </StyledExpandMoreButton>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: isMobile ? "auto" : DesktopPxToVw(40),
                  }}>
                  <Typography variant={isMobile ? "m-text-link" : "link-m"}>{CONSTANTS?.LOAD_MORE}</Typography>
                  <StyledExpandMoreIcon />
                </Box>
              )}
            </Box>
          </LoadMoreActionBox>
        )}
    </Box>
  )
}

export default observer(SearchResultCardComponent)
