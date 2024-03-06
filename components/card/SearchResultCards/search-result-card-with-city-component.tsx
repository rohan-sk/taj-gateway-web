import { Box, Grid, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../utils/Constants"
import searchResultsListing from "../../../features/search/store/pageStore/searchListingPage.store"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CONSTANTS } from "../../constants"
import {
  LoadMoreActionBox,
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
} from "../../group/styles/common-styled-components"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import dynamic from "next/dynamic"
const SearchResultPageFilter = dynamic(() => import("./search-results-page-filter.component"))
const SearchCardComponent = dynamic(() => import("./search-card.component"))

const SearchResultCardComponentWithCity = ({
  parameterMap,
  metadata: { journeyName },
  metadata,
}: any) => {
  const router = useRouter()
  const pageContextUse = useContext(PageContext)
  const searchResultsListing = pageContextUse?.getPageStore(
    PAGE_STORES.searchResultsPage
  ) as searchResultsListing
  const [countToShowCards, setCountToShowCards] = useState(5)
  const [userCategory, setCategory] = useState<any>("hotel")
  const [searchFilters, setSearchFilters] = useState<any>({
    brand_name: "",
    hotel_type: "",
    hotel_feature: "",
    q: "",
    category: "hotel",
    city: journeyName || "goa",
  })

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  const reduceObject = (obj: any) => {
    return Object?.entries(obj)?.reduce((acc: any, [key, value]: any) => {
      if (value !== "") {
        acc[key] = value
      }
      return acc
    }, {})
  }

  useEffect(() => {
    setCategory("hotel")
    const params = reduceObject(searchFilters)
    params && searchResultsListing?.searchResultListingApi(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])

  const city: string | string[] | undefined = journeyName || "goa"
  const getFilterComponent = (facets: any) => {
    return (
      <SearchResultPageFilter
        filters={parameterMap}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
        setCountToShowCards={setCountToShowCards}
      />
    )
  }
  const isMobile = useMobileCheck()
  return (
    <Box sx={{ padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw" }}>
      {getFilterComponent(
        searchResultsListing?.searchResultsListingResponse?.facets
      )}
      {searchResultsListing?.searchResultsListingResponse?.data?.length > 0 &&
        userCategory && (
          <Box
            sx={{
              display: "flex",
              marginBottom: isMobile ? "3.125vw" : "1.46vw",
              textTransform: "capitalize",
            }}>
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              <b>{`${
                searchResultsListing?.searchResultsListingResponse?.data?.length
              } ${userCategory}${
                searchResultsListing?.searchResultsListingResponse?.data
                  ?.length > 1
                  ? "s"
                  : ""
              }`}</b>
              <span
                style={{
                  margin: isMobile
                    ? `0vw ${MobilePxToVw(4)}`
                    : `0vw ${DesktopPxToVw(4)}`,
                }}>
                {city ? "in" : ""}
              </span>
            </Typography>
            {city && (
              <Typography variant={isMobile ? "m-body-m" : "body-m"}>
                {city}
              </Typography>
            )}
          </Box>
        )}
      {searchResultsListing?.searchResultsListingResponse?.data
        ?.slice(0, countToShowCards)
        .map((item: any, index: number) => {
          return (
            <SearchCardComponent
              key={index}
              {...item}
              category={userCategory}
            />
          )
        })}
      {searchResultsListing?.searchResultsListingResponse?.data?.length > 0 && (
        <LoadMoreActionBox
          sx={{
            justifyContent: "center",
            paddingBottom: isMobile ? "14.063vw" : "5.729vw",
          }}>
          <Box
            sx={{
              display:
                searchResultsListing?.searchResultsListingResponse?.data
                  ?.length < countToShowCards
                  ? "none"
                  : "flex",
            }}
            onClick={() => {
              setCountToShowCards(countToShowCards + CONSTANTS?.FIVE)
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
              <>
                <Typography variant={isMobile ? "m-text-link" : "link-m"}>
                  {CONSTANTS?.LOAD_MORE}
                </Typography>
                <StyledExpandMoreIcon />
              </>
            )}
          </Box>
        </LoadMoreActionBox>
      )}
    </Box>
  )
}

export default observer(SearchResultCardComponentWithCity)
