import { useContext, useEffect, useState } from "react"
import { theme } from "../../../lib/theme"
import { useDebounce } from "../../../utils/useDebounce"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CONSTANTS, ICONS } from "../../constants"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import { AutoCompleteInput } from "../../forms/gift-card-form/styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { FilterContainer } from "./styles/search-card"
import { Box, Paper, Typography, Autocomplete, InputAdornment } from "@mui/material"
import { useRouter } from "next/router"
import { triggerEvent } from "../../../utils/analytics"
import { GAStore, UserStore } from "../../../store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { getCookie } from "../../../utils/cookie"
import ClearIcon from "@mui/icons-material/Clear"
import { AFFILIATION } from "../../../utils/analytics/constants"

const SearchResultPageFilter = ({
  filters,
  setSearchFilters,
  searchFilters,
  setPaginationFilter,
  facets,
  getKey,
  city,
  search,
  setCountToShowCards,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  const [textSearchState, setTextSearchState] = useState<any>({
    city: city || "",
    search: router?.query?.q || "",
  })

  const filterWidth = 100 / filters?.length - 2.1
  const debouncedTextSearchState = useDebounce(textSearchState, 600)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  const handleCitySearchEvent = (value: any, keyName: any) => {
    let isDestination = keyName?.toLowerCase() === "city"
    isDestination &&
      triggerEvent({
        action: "destinationSelected",
        params: {
          ...dataLayer,
          destinationSelected: value,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          brandName: AFFILIATION,
          link_url: "",
          link_text: value,
          widget_title: "",
          widget_description: "",
          widget_type: filters?.[0]?.key,
          widget_position: "",
          outbound: false,
          item_name: value,
          item_type: "",
          no_of_items: "",
          location: value || "",
          city: value,
        },
      })
  }
  const handleChange = (event: any, newValue: any, keyName: string) => {
    setPaginationFilter([])
    const { value } = event.target
    if (keyName?.toLowerCase() === "city") {
      setSearchFilters({
        ...searchFilters,
        city: city,
        [keyName]: newValue || value,
      })
      setTextSearchState((prev: any) => ({ ...prev, city: value }))
    } else {
      setTextSearchState((prev: any) => ({ ...prev, search: value }))
    }
    handleCitySearchEvent(value, keyName)
    setCountToShowCards(CONSTANTS?.FIVE)
  }

  const handleDropDownSelect = (newValue: any, keyName: any) => {
    let isCuisine = keyName === "cuisines"
    isCuisine &&
      triggerEvent({
        action: "cuisineSelected",
        params: {
          ...dataLayer,
          eventType: "",
          eventName: "",
          eventPlace: "",
          eventTicketsQty: "",
          eventDate: "",
          clientId: getCookie("_ga")?.slice(6),
          visitSource: "",
          brandName: AFFILIATION,
          link_url: "",
          link_text: newValue,
          widget_title: "",
          widget_description: "",
          widget_type: filters?.[0]?.key,
          widget_position: "",
          outbound: false,
          location: "",
          cuisineType: newValue,
          restaurantName: "",
          restaurantCity: "",
          restaurantCountry: "",
          holidayType: "",
          themeType: "",
          businessType: "",
          buttonLinkName: newValue,
        },
      })
  }
  const handleDropDownSearch = (event: any, newValue: any, keyName: string) => {
    setPaginationFilter([])
    const { value } = event.target
    let localPathName: any = router?.query?.pid
    const { pid, ...params } = router?.query
    if (keyName) {
      setSearchFilters({
        ...searchFilters,
        [keyName]: newValue || value,
      })
      if (isMobile && document?.activeElement !== null) {
        if (document?.activeElement instanceof HTMLInputElement) {
          document?.activeElement?.blur()
        }
      }
      if (value || newValue) {
        router.push({
          pathname: localPathName.join("/"),
          query: {
            ...params,
            [keyName]: (newValue || value) ?? "",
          },
        })
      } else {
        params?.[keyName] && delete params?.[keyName]
        router.push({
          pathname: localPathName.join("/"),
          query: {
            ...params,
          },
        })
      }
    } else {
      setSearchFilters({
        ...searchFilters,
      })
    }
    handleDropDownSelect(newValue, keyName)
    setCountToShowCards(CONSTANTS?.FIVE)
  }

  useEffect(() => {
    if (city) {
      let textValues = {
        city: "",
        search: router?.query?.q,
      }
      if (city !== textSearchState?.city) {
        textValues = {
          ...textValues,
          city: city,
        }
      }
      setTextSearchState(textValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city])

  useEffect(() => {
    const { pid, ...rest } = router?.query
    let localPathName: any = router?.query?.pid
    let payloadValues = {}
    if (debouncedTextSearchState?.city) {
      payloadValues = {
        ...payloadValues,
        city: debouncedTextSearchState?.city,
      }
    } else {
      !debouncedTextSearchState?.city && delete rest?.city
    }
    if (debouncedTextSearchState?.search) {
      payloadValues = {
        ...payloadValues,
        q: debouncedTextSearchState?.search,
      }
    } else {
      !debouncedTextSearchState?.q && delete rest?.q
    }

    if (
      router?.query?.city !== textSearchState?.city ||
      router?.query?.q !== textSearchState?.search
    ) {
      router.push({
        pathname: localPathName.join("/"),
        query: {
          ...rest,
          ...payloadValues,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTextSearchState])

  const getDefaultValue = (value: string) => {
    switch (value) {
      case "Hotel Brand":
        return router?.query?.brand_name
      case "Hotel Type":
        return router?.query?.hotel_type
      case "Hotel Feature":
        return router?.query?.hotel_feature
      default:
        return ""
    }
  }
  return (
    <FilterContainer $isMobile={isMobile} aria-label="SearchResultPageFilter">
      {filters.map((item: any, index: number) => {
        switch (item.key) {
          case "searchField":
            return (
              <AutoCompleteInput
                key={index}
                sx={{
                  "& .MuiInputBase-root": {
                    alignItems: "center",
                  },
                  width: isMobile ? "100%" : filters?.length > 4 ? "18%" : `${filterWidth}%`,
                }}
                variant="standard"
                placeholder={getKey(index, searchFilters) === "city" ? item?.value : item?.value}
                name={item.value}
                onChange={(event: any) => handleChange(event, "", getKey(index, searchFilters))}
                title={getKey(index, searchFilters) === "city" ? item?.value : item?.value}
                value={
                  getKey(index, searchFilters) === "city"
                    ? textSearchState?.city
                    : textSearchState?.search
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        alt={`search img`}
                        component={"img"}
                        src={ICONS?.GLOBAL_SEARCH_ICON}
                        sx={{
                          height: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                          width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {(getKey(index, searchFilters) === "city"
                        ? textSearchState?.city
                        : textSearchState?.search
                      )?.length > 0 && (
                        <ClearIcon
                          onClick={() => {
                            if (getKey(index, searchFilters)?.toLowerCase() === "city") {
                              setSearchFilters({
                                ...searchFilters,
                                city: city,
                                [getKey(index, searchFilters)]: "",
                              })
                              setTextSearchState((prev: any) => ({
                                ...prev,
                                city: "",
                              }))
                            } else {
                              setTextSearchState((prev: any) => ({
                                ...prev,
                                search: "",
                              }))
                            }
                          }}
                          sx={{
                            cursor: "pointer",
                            opacity: "0.7",
                            width: isMobile ? MobilePxToVw(25) : DesktopPxToVw(25),
                          }}
                        />
                      )}
                    </>
                  ),
                }}
              />
            )
          case "dropDown":
            return (
              <Autocomplete
                onChange={(event: any, newValue: any) =>
                  handleDropDownSearch(event, newValue, getKey(index, searchFilters))
                }
                key={index}
                popupIcon={<ExpandMoreIcon />}
                sx={{
                  width: isMobile ? "100%" : filters?.length > 4 ? "17%" : `${filterWidth}%`,
                }}
                options={facets ? facets?.[getKey(index, searchFilters)] : []}
                PaperComponent={({ children }: any) => (
                  <Paper
                    sx={{
                      backgroundColor: theme?.palette?.background.default,
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                      borderRadius: 0,
                    }}>
                    {children}
                  </Paper>
                )}
                renderOption={(props: any) => {
                  return (
                    <Typography
                      {...props}
                      variant={isMobile ? "m-body-m" : "body-m"}
                      sx={{ padding: "1vw", fontWeight: "300" }}>
                      {props.key}
                    </Typography>
                  )
                }}
                value={searchFilters?.[getKey(index, searchFilters)]}
                renderInput={(params) => (
                  <AutoCompleteInput
                    variant="standard"
                    name={item.value}
                    {...params}
                    sx={{ fontSize: "20px", fontWeight: "300" }}
                    placeholder={item.value}
                  />
                )}
              />
            )
          default:
            break
        }
      })}
    </FilterContainer>
  )
}

export default SearchResultPageFilter
