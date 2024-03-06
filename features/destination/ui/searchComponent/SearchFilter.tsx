import { Box, Typography, Autocomplete, InputAdornment, Grid, Stack } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { CONSTANTS, ICONS } from "../../../../components/constants"
import { AutoCompleteInput } from "../../../../components/forms/gift-card-form/styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { triggerEvent } from "../../../../utils/analytics"
import { getCookie } from "../../../../utils/cookie"
import { AFFILIATION } from "../../../../utils/analytics/constants"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { GAStore, UserStore } from "../../../../store"
import { AutocompletePaper } from "../../../../components/card/styles/card-with-experience-form"
import ClearIcon from "@mui/icons-material/Clear"
import { FormSelectArrowIcon } from "../../../../components/forms/common/form-components"

const SearchFilter = ({
  filters,
  setSearchFilters,
  searchFilters,
  facets,
  getKey,
  search,
  setCountToShowCards,
  filterAlignment,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  useEffect(() => {
    setSearchFilters((prev: any) => ({
      ...prev,
      [getKey(0, searchFilters)]: "",
      [getKey(1, searchFilters)]: "",
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router || !setSearchFilters])
  const handleChange = (event: any, newValue: any, keyName: string) => {
    const { value } = event.target
    setSearchFilters({
      ...searchFilters,
      [keyName]: newValue || value || "",
    })
    setCountToShowCards && setCountToShowCards(CONSTANTS?.FIVE)
    let isCuisine = keyName === "cuisine_search"
    let isCity = keyName === "city"
    let isTheme = keyName === "theme"
    if (isCuisine) {
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
          link_text: event.target.value || newValue,
          widget_title: "",
          widget_description: "",
          widget_type: filters?.[0]?.key,
          widget_position: "",
          outbound: false,
          location: "",
          cuisineType: event.target.value || newValue,
          restaurantName: "",
          restaurantCity: "",
          restaurantCountry: "",
          holidayType: "",
          themeType: "",
          businessType: "",
          buttonLinkName: "",
        },
      })
    }
    //Analytics search events on hold for MVP1 .
    // else if (isCity) {
    //   triggerEvent({
    //     action: "citySelected",
    //     params: {
    //       ...dataLayer,
    //       destinationSelected: event.target.value,
    //       eventType: "",
    //       eventName: "",
    //       eventPlace: "",
    //       eventTicketsQty: "",
    //       eventDate: "",
    //       clientId: getCookie("_ga")?.slice(6),
    //       visitSource: "",
    //       brandName: AFFILIATION,
    //       link_url: "",
    //       link_text: event.target.value,
    //       widget_title: "",
    //       widget_description: "",
    //       widget_type: filters?.[0]?.key,
    //       widget_position: "",
    //       outbound: false,
    //       item_name: event.target.value,
    //       item_type: "",
    //       no_of_items: "",
    //       location: event.target.value || "",
    //       city: event.target.value,
    //     },
    //   })
    // }
    else if (isTheme) {
      triggerEvent({
        action: "themeSelected",
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
          widget_type: "",
          widget_position: "",
          outbound: false,
          item_name: newValue,
          item_type: "",
          no_of_items: facets?.theme?.length,
          location: "",
          theme: newValue,
          themeType: newValue,
          offerName: "",
          offerCode: "",
          offerID: "",
          offerCategory: "",
          offerValidity: "",
          // pageSection: label,
        },
      })
    }
  }
  const checkEachFilterWidth = () => {
    if (filters?.length < 4) {
      return 4
    } else if (filters?.length < 5) {
      return 3
    } else if (filters?.length < 6) {
      return 2.5
    }
  }

  const getReleventOptions = (filter: any, index: number) => {
    switch (filter) {
      case "Hotel Brand":
        return facets?.uniqueHotelBrand
      case "Hotel Type":
        return facets?.uniqueHotelType
      case "Hotel Feature":
        return facets?.uniqueHotelFeatures
      case "Cuisine":
        return facets?.cuisine_search
      default:
        return facets && facets?.[getKey(index, searchFilters)] ? facets?.[getKey(index, searchFilters)] : []
    }
  }

  return (
    <Stack sx={{ paddingBottom: isMobile ? MobilePxToVw(55) : DesktopPxToVw(60) }}>
      <Grid
        container
        spacing={DesktopPxToVw(40)}
        alignItems={"start"}
        justifyContent={filterAlignment?.toLowerCase() || "start"}>
        {filters?.map((item: any, index: number) => {
          switch (item.key) {
            case "searchField":
              return (
                <Grid
                  key={index}
                  item
                  sx={{ width: "100%" }}
                  lg={item?.colSize || checkEachFilterWidth() || 3}
                  xs={12}
                  md={12}>
                  <AutoCompleteInput
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        alignItems: "center",
                      },
                    }}
                    value={searchFilters?.[getKey(index, searchFilters)] || ""}
                    variant="standard"
                    placeholder={search || item?.value}
                    name={item.value}
                    onChange={(event: any) => handleChange(event, "", getKey(index, searchFilters))}
                    title={search || item?.value}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            alt={`search img`}
                            loading="lazy"
                            component={"img"}
                            src={ICONS?.GLOBAL_SEARCH_ICON}
                            sx={{
                              height: isMobile ? MobilePxToVw(25) : DesktopPxToVw(25),
                              width: isMobile ? MobilePxToVw(28) : DesktopPxToVw(28),
                            }}
                          />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <>
                          {searchFilters?.[getKey(index, searchFilters)]?.length > 0 && (
                            <ClearIcon
                              onClick={() =>
                                setSearchFilters((prev: any) => ({
                                  ...prev,
                                  [getKey(index, searchFilters)]: "",
                                }))
                              }
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
                </Grid>
              )
            case "dropdown":
              return (
                <Grid item sx={{ width: "100%" }} lg={item?.colSize || checkEachFilterWidth() || 3} xs={12} md={12}>
                  <Autocomplete
                    popupIcon={<FormSelectArrowIcon />}
                    onChange={(event: any, newValue: any) =>
                      handleChange(event, newValue, getKey(index, searchFilters))
                    }
                    value={searchFilters?.[getKey(index, searchFilters)] || null}
                    key={index}
                    sx={{
                      width: "100%",
                    }}
                    PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
                    noOptionsText={"No results found for your search"}
                    options={getReleventOptions(item.value, index) || []}
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
                    renderInput={(params: any) => {
                      return (
                        <AutoCompleteInput
                          variant="standard"
                          name={item.value}
                          {...params}
                          sx={{
                            fontSize: "20px",
                            fontWeight: "300",
                            width: "100%",
                            paddingBottom: isMobile ? "0vw !important" : "initial",
                            "& .MuiAutocomplete-inputRoot": {
                              paddingRight: "0vw !important",
                            },
                          }}
                          placeholder={searchFilters?.[getKey(index, searchFilters)] || item.value}
                        />
                      )
                    }}
                  />
                </Grid>
              )
            default:
              break
          }
        })}
      </Grid>
    </Stack>
  )
}

export default SearchFilter
