import { useContext } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { Grid, Stack } from "@mui/material"
import { GAStore, UserStore } from "../../../store"
import { aestheticItems } from "../../../components"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { FormSelectArrowIcon } from "../../../components/forms/common/form-components"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { dropdownSelect } from "../../../utils/analytics/events/NonEcommerce/dropdown-event"
import { AutoCompleteInput } from "../../../components/card/styles/book-a-stay-default-card.styles"
import { gridBreakPointsGenerator } from "../../../components/card/SearchResultCards/search-card.component"
import { AutoCompleteCloseIcon, AutocompleteSearchIcon } from "../../../components/card/card-with-welllness-enquiry"
import {
  AutocompleteOptionTypography,
  AutocompletePaper,
  SearchAutocomplete,
} from "../../../components/card/styles/card-with-experience-form"

const CustomSearch = dynamic(() =>
  import("../../../components/hoc/Search/CustomSearch").then((module) => module.CustomSearch),
)

type TitleTypes = {
  mobileTitle: string[]
  desktopTitle: string[]
  headingElement?: any
}
const filterDataOnKey = (key: string, value: any, arr: any[]) => {
  switch (key) {
    case "recent_theme":
      return value === "Most Liked"
        ? arr?.sort((blogA: any, blogB: any) => parseFloat(blogB?.likes || 0) - parseFloat(blogA?.likes || 0))
        : value
        ? arr?.sort(
            (blogA: any, blogB: any) =>
              new Date(blogB?.createdDate)?.valueOf() - new Date(blogA?.createdDate)?.valueOf(),
          )
        : arr
    case "recent_tag":
      return value === "Most Liked"
        ? arr?.sort((blogA: any, blogB: any) => parseFloat(blogB?.likes || 0) - parseFloat(blogA?.likes || 0))
        : value
        ? arr?.sort(
            (blogA: any, blogB: any) =>
              new Date(blogB?.createdDate)?.valueOf() - new Date(blogA?.createdDate)?.valueOf(),
          )
        : arr
    case "hotel_name":
      return value
        ? arr?.filter((item: any) => item?.hotelName?.toLowerCase()?.includes(value?.toLowerCase()?.trim()))
        : arr
    case "seating_style":
      return value ? arr?.filter((item: any) => item?.seatingStyles?.includes(value)) : arr
    case "capacity":
      return value
        ? arr?.filter(
            (item: any) =>
              !isNaN(item?.capacity) && Number(item?.capacity) >= value?.min && Number(item?.capacity) <= value?.max,
          )
        : arr
    case "event":
      return value
        ? arr?.filter((item: any) => item?.basicInfo?.title?.toLowerCase()?.includes(value?.toLowerCase()?.trim()))
        : arr
    case "hotel_type":
      return value
        ? arr?.filter((item: any) => item?.hotelType?.toLowerCase()?.includes(value?.toLowerCase()?.trim()))
        : arr
    case "search":
      return value
        ? arr?.filter((item: any) => item?.basicInfo?.subTitle?.toLowerCase()?.includes(value?.toLowerCase()?.trim()))
        : arr
    default:
      return arr
  }
}
const getFilterWidth = (colSize: number): number => {
  if (colSize < 5) {
    switch (colSize) {
      case 1:
        return 12
      case 2:
        return 5.73
      case 3:
        return 3.77
      case 4:
        return 2.74
      default:
        return 3.77
    }
  } else {
    return colSize ?? 3.77
  }
}
type StaticFilters = {
  filters: any
  facets: any[]
  getKey: Function
  title?: TitleTypes
  searchFilters: any
  originalData: any[]
  filteredData?: any[]
  filtersPadding?: boolean
  filterAlignment?: string
  sectionTitle?: TitleTypes
  setFilteredData: Function
  setSearchFilters: Function
  aesthetic?: aestheticItems
}
const VenueSearchFilter = ({
  title,
  facets,
  getKey,
  filters,
  aesthetic,
  originalData,
  sectionTitle,
  searchFilters,
  setFilteredData,
  filterAlignment,
  setSearchFilters,
  filtersPadding = false,
}: StaticFilters) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const { textColor } = useAesthetics(aesthetic?._ref)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  const desktopTitle = title?.desktopTitle?.[0] || ""
  const mobileTitle = `${title?.mobileTitle?.[0]}${title?.mobileTitle?.[1]}`
  const sectionMobileTitle = `${sectionTitle?.mobileTitle?.[0]}` + `${sectionTitle?.mobileTitle?.[1]}`
  const sectionDesktopTitle = `${sectionTitle?.desktopTitle?.[0]}` + `${sectionTitle?.desktopTitle?.[1]}`

  const handleChange = (e: any, key: string, index: number, filterType: string, newValue?: any) => {
    const { value } = e?.target
    let tempFilteredData = []
    if (key) {
      switch (filterType) {
        case "searchField":
          setSearchFilters((prev: any) => ({ ...prev, [key]: value }))
          tempFilteredData = Object?.keys(searchFilters)?.reduce(
            (acc: any, currentKey: any) =>
              filterDataOnKey(currentKey, currentKey === key ? value : searchFilters?.[currentKey], acc),

            [...originalData],
          )
          setFilteredData(tempFilteredData)
          break
        case "dropdown":
          setSearchFilters((prev: any) => ({
            ...prev,
            [key]: newValue || value,
          }))
          tempFilteredData = Object?.keys(searchFilters)?.reduce(
            (acc: any, currentKey: any) =>
              filterDataOnKey(currentKey, currentKey === key ? newValue || value : searchFilters?.[currentKey], acc),

            [...originalData],
          )
          setFilteredData(tempFilteredData)
          break
        case "searchSuggestions":
          setSearchFilters((prev: any) => ({
            ...prev,
            [key]: newValue || value,
          }))
          tempFilteredData = Object?.keys(searchFilters)?.reduce(
            (acc: any, currentKey: any) =>
              filterDataOnKey(currentKey, currentKey === key ? newValue || value : searchFilters?.[currentKey], acc),

            [...originalData],
          )
          setFilteredData(tempFilteredData)
          break
        default:
          break
      }
    }
  }

  return (
    <Stack
      sx={{ paddingBottom: isMobile ? (filtersPadding ? MobilePxToVw(40) : MobilePxToVw(55)) : DesktopPxToVw(60) }}>
      <Grid
        container
        columnGap={DesktopPxToVw(40)}
        rowGap={MobilePxToVw(35)}
        alignItems={"start"}
        justifyContent={filterAlignment?.toLowerCase() || "start"}>
        {filters?.map((filter: any, index: number) => {
          switch (filter?.key) {
            case "searchField":
              return (
                <Grid
                  sx={{ marginTop: "0.2vw" }}
                  key={index}
                  item
                  {...gridBreakPointsGenerator(isMobile, getFilterWidth(filter?.colSize), 12)}>
                  <CustomSearch
                    textColor={textColor}
                    value={searchFilters?.[getKey(index, searchFilters)]}
                    setValue={() => {}}
                    onChange={(e: any) => {
                      handleChange(e, getKey(index, searchFilters), index, filter?.key)
                    }}
                    maxWidth={"100%"}
                    placeholder={filter?.value}
                    fontSizeProp={isMobile ? "3.750vw" : "1.250vw"}
                    styles={{
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 300,
                      fontSize: "1.25vw",
                      lineHeight: "150%",
                      color: theme?.palette?.neuPalette?.hexSeventeen,
                    }}
                  />
                </Grid>
              )
            case "searchSuggestions":
              return (
                <Grid
                  sx={{ position: "relative" }}
                  key={index}
                  item
                  {...gridBreakPointsGenerator(isMobile, getFilterWidth(filter?.colSize), 12)}>
                  <SearchAutocomplete
                    sx={{ mt: isMobile ? "0vw" : "0.4vw" }}
                    onChange={(e: any, newValue: any) => {
                      handleChange(e, getKey(index, searchFilters), index, filter?.key, newValue)
                    }}
                    onOpen={() => {
                      if (global?.window !== undefined) {
                        document.body.style.overflow = "hidden"
                      }
                    }}
                    onClose={() => {
                      if (global?.window !== undefined) {
                        document.body.style.overflow = "auto"
                      }
                    }}
                    noOptionsText={"No results found for your search"}
                    value={searchFilters?.[getKey(index, searchFilters)]}
                    options={facets ? facets?.[getKey(index, searchFilters)] : []}
                    PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
                    renderOption={(props: any) => {
                      return (
                        <AutocompleteOptionTypography {...props} variant={isMobile ? "m-body-m" : "body-m"}>
                          {props.key}
                        </AutocompleteOptionTypography>
                      )
                    }}
                    renderInput={(params: any) => {
                      const temp = {
                        ...params,
                        InputProps: {
                          ...params?.InputProps,
                          startAdornment: <AutocompleteSearchIcon />,
                          endAdornment:
                            searchFilters?.[getKey(index, searchFilters)]?.length > 0 ? (
                              <AutoCompleteCloseIcon
                                handleClick={() => {
                                  setSearchFilters((prev: any) => ({
                                    ...prev,
                                    [getKey(index, searchFilters)]: "",
                                  }))
                                  handleChange(
                                    { target: { name: "", value: "" } },
                                    getKey(index, searchFilters),
                                    index,
                                    filter?.key,
                                    "",
                                  )
                                }}
                              />
                            ) : (
                              <></>
                            ),
                        },
                      }
                      return <AutoCompleteInput variant="standard" placeholder={filter?.value} {...temp} />
                    }}
                  />
                </Grid>
              )
            case "dropdown":
              return (
                <Grid item key={index} {...gridBreakPointsGenerator(isMobile, getFilterWidth(filter?.colSize), 12)}>
                  <Stack
                    sx={{
                      "& .MuiFormControl-root": {
                        width: "100%",
                        marginBottom: "0vw !important",
                      },
                    }}>
                    <SearchAutocomplete
                      sx={{ mt: isMobile ? "0vw" : "0.4vw" }}
                      popupIcon={<FormSelectArrowIcon />}
                      onChange={(e: any, newValue: any, reason: any) => {
                        if (reason) {
                          if (reason?.toLowerCase() === "selectoption") {
                            handleChange(e, getKey(index, searchFilters), index, filter?.key, newValue)
                            dropdownSelect(
                              e,
                              filter?.value,
                              filter?.key,
                              facets ? facets?.[getKey(index, searchFilters)] : [],
                              newValue,
                              dataLayer,
                              isMobile,
                              mobileTitle,
                              sectionMobileTitle,
                              desktopTitle,
                              sectionDesktopTitle,
                            )
                          } else if (reason?.toLowerCase() === "clear") {
                            handleChange(e, getKey(index, searchFilters), index, filter?.key, "")
                          }
                        }
                      }}
                      value={
                        searchFilters?.[getKey(index, searchFilters)]
                          ? searchFilters?.[getKey(index, searchFilters)]
                          : undefined
                      }
                      onOpen={() => {
                        if (global?.window !== undefined) {
                          document.body.style.overflow = "hidden"
                        }
                      }}
                      onClose={() => {
                        if (global?.window !== undefined) {
                          document.body.style.overflow = "auto"
                        }
                      }}
                      noOptionsText={"No results found for your search"}
                      options={facets ? facets?.[getKey(index, searchFilters)] || [] : []}
                      PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
                      renderOption={(props: any) => {
                        return (
                          <AutocompleteOptionTypography {...props} variant={isMobile ? "m-body-m" : "body-m"}>
                            {props.key}
                          </AutocompleteOptionTypography>
                        )
                      }}
                      renderInput={(params: any) => {
                        return (
                          <AutoCompleteInput
                            variant="standard"
                            placeholder={filter?.value}
                            {...params}
                            onChange={(e: any) => {
                              handleChange(e, getKey(index, searchFilters), index, filter?.key, "")
                            }}
                          />
                        )
                      }}
                    />
                  </Stack>
                </Grid>
              )
            default:
              return <></>
          }
        })}
      </Grid>
    </Stack>
  )
}

export default VenueSearchFilter
