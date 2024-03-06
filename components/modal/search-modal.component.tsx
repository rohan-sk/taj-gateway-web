import React, { useContext, useEffect, useRef, useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import { PathType } from "../../types"
import { observer } from "mobx-react-lite"
import { getClient } from "../../lib-sanity"
import { useVoice } from "../../utils/useVoice"
import { fetchSearchData } from "../../lib/utils"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useDebounce } from "../../utils/useDebounce"
import TabPanel from "../hoc/tabs/tab-panel.component"
import useLocation from "../../utils/hooks/useLocation"
import { useMobileCheck } from "../../utils/isMobilView"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { useAppNavigation } from "../../utils/NavigationUtility"
import searchStore from "../../features/search/store/search.store"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import { searchTabsListing } from "../../utils/getListWithBrandSorting"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS, GINGER_BRAND_NAME, ICONS, externalNavigation } from "../constants"
import { Box, Tabs, useTheme, InputBase, Typography, ClickAwayListener } from "@mui/material"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import {
  FlexBox,
  ActionBox,
  CustomTab,
  ParentBox,
  SearchBarPaper,
  StyledTypography,
  TabPanelParentBox,
  NoResultsFoundBox,
  TabsShadowWrapper,
  GlobalMicIconImageBox,
  HotelDataBorderDivider,
  GlobalSearchIconImageBox,
  ResultNotFoundTypography,
  BackArrowIconSecondImageBox,
  GlobalSearchIconSecondImageBox,
  SearchResultsDestinationTypography,
  ShadeBox,
} from "./styles/global-search"

import { offersRoute, tajHolidayExperiencesRoute } from "../../features/property/ui/constants"
import { handleSelected } from "../../utils/analytics/events/NonEcommerce/search-select-event"

const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

const SearchModal = ({ handleClose, fromMic, props }: any) => {
  const theme = useTheme()
  const isLogin = useLoggedIn()
  const isMobile = useMobileCheck()
  const getLocation = useLocation()
  const navigate = useAppNavigation()
  const listInnerRef = useRef<any>(null)
  const context: any = useContext(IHCLContext)
  const { listenedText, isListening, listen, listeningTypo } = useVoice()

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as searchStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { searchLoading } = searchStore
  const { setGlobalSearchedData } = bookingFlowGlobalStore

  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const [value, setValue] = useState<number>(0)
  const [searchValue, setSearchValue] = useState("")
  const [searchData, setSearchData] = useState<any>()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [buttonName, setButtonName] = useState<string | null>("HOTELS")
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])

  const handleChange = (_event: React.SyntheticEvent | null, newValue: number) => {
    setValue(newValue)
  }
  const handleSearch = (event: any) => {
    let isFormValid = false
    const { name, value } = event.target
    isFormValid = value.length >= 2 && value.match(/^[a-zA-Z ]{0,50}$/)
    //removed validations SIT-748
    // if (value.match(/^[a-zA-Z ]{0,50}$/)) {
    setSearchValue(value)
    // }
    if (event?.key === "Enter" && buttonName) {
      searchValue.length > 0 &&
        navigate(
          `/en-in/search-by-${buttonName?.toLowerCase()}?q=${searchValue?.toLowerCase()}&category=${buttonName?.toLowerCase()}`,
          PathType.external,
        )
    }
  }
  const debouncedSearchTerm = useDebounce(searchValue, 300)

  const Highlighted = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text?.split(regex)
    return (
      <span>
        {parts
          ?.filter((part) => part)
          ?.map((part, i) => (regex.test(part) ? <b key={i}>{part}</b> : <span key={i}>{part}</span>))}
      </span>
    )
  }
  const fetchedSearchData = async () => {
    const SearchQuery = fetchSearchData()
    await getClient(true)
      .fetch(SearchQuery)
      .then((data) => {
        setSearchData(data)
      })
  }
  useEffect(() => {
    fetchedSearchData()
  }, [])

  const NoResultsFound = () => (
    <NoResultsFoundBox>
      <GlobalSearchIconSecondImageBox alt={`global-img`} component={"img"} src={ICONS?.GLOBAL_SEARCH_ICON} />
      <ResultNotFoundTypography variant={isMobile ? "m-body-l" : "body-ml"}>
        {(searchResultsResponseData?.[value]?.tabTitle.toLowerCase() ===
          searchData?.[0]?.searchTabs?.[value]?.tabTitle?.toLowerCase() &&
          searchData?.[0]?.searchTabs?.[value]?.message?.message) ||
          CONSTANTS?.RESULT_NOT_FOUND}
      </ResultNotFoundTypography>
      <Typography variant={isMobile ? "m-body-l" : "body-ml"} sx={{ textAlign: "center" }}>
        {(searchResultsResponseData?.[value]?.tabTitle.toLowerCase() ===
          searchData?.[0]?.searchTabs?.[value]?.tabTitle?.toLowerCase() &&
          searchData?.[0]?.searchTabs?.[value]?.message?.description) ||
          CONSTANTS?.RESULT_NOT_FOUND_DESC}
      </Typography>
    </NoResultsFoundBox>
  )

  useEffect(() => {
    const tabsSet = props?.searchData?.searchTabs?.map((tab: any) => {
      return {
        tabTitle: tab?.tabTitle,
        category:
          searchValue?.length === 0
            ? tab?.tabIdentifier?.toLowerCase() === "restaurants"
              ? String(getLocation?.latitude) !== "null"
                ? "RESTAURANTS"
                : tab?.popularItems?.title
              : tab?.popularItems?.title
            : tab?.tabTitle,
        destination: "DESTINATIONS",
        relatedDataTitle: `RELATED ${tab?.tabTitle?.toUpperCase()}`,
        relatedData:
          searchValue?.length === 0
            ? {}
            : searchStore?.searchResults?.[tab?.tabIdentifier?.toLowerCase()]?.[
                tab?.tabIdentifier?.toLowerCase() === "hotels"
                  ? "relatedHotels"
                  : tab?.tabIdentifier?.toLowerCase() === "restaurants"
                  ? "relatedRestaurants"
                  : ""
              ],
        componentData:
          searchValue?.length === 0
            ? tab?.tabIdentifier?.toLowerCase() === "restaurants"
              ? String(getLocation?.latitude) !== "null"
                ? searchStore.searchResults?.restaurants?.data?.length > 0
                  ? searchStore.searchResults?.restaurants
                  : {
                      data: tab?.popularItems?.itemList,
                    }
                : {
                    data: tab?.popularItems?.itemList,
                  }
              : {
                  data: tab?.popularItems?.itemList,
                }
            : searchStore?.searchResults?.[tab?.tabIdentifier?.toLowerCase()],
        inspirations:
          tab?.tabIdentifier?.toLowerCase() === "restaurants"
            ? String(getLocation?.latitude) !== "null"
              ? {}
              : {
                  data: tab?.popularInspirations?.itemList,
                }
            : {
                data: tab?.popularInspirations?.itemList,
              },
        inspirationsTitle: tab?.popularInspirations?.title,
      }
    })
    if (searchValue?.length === 0) {
      setResultsResponseData(
        searchTabsListing(
          tabsSet,
          props?.searchData?.searchTabs?.map((item: any) => item?.tabTitle?.toUpperCase()),
        ),
      )
    } else {
      // Filter out objects based on specified conditions
      const filteredTabsData = searchTabsListing(
        tabsSet,
        props?.searchData?.searchTabs?.map((item: any) => item?.tabTitle?.toUpperCase()),
      )?.filter((tab: any) => {
        if (
          (tab?.tabTitle?.toLowerCase() === "holidays" &&
            (searchStore?.searchResults?.holidays?.data?.length > 0 ||
              searchStore?.searchResults?.holidays?.destinations?.length > 0)) ||
          (tab?.tabTitle?.toLowerCase() === "restaurants" &&
            (searchStore?.searchResults?.restaurants?.data?.length > 0 ||
              searchStore?.searchResults?.restaurants?.destinations?.length > 0 ||
              searchStore?.searchResults?.restaurants?.data?.relatedRestaurants > 0)) ||
          (tab?.tabTitle?.toLowerCase() === "hotels" &&
            (searchStore?.searchResults?.hotels?.data?.length > 0 ||
              searchStore?.searchResults?.hotels?.destinations?.length > 0 ||
              searchStore?.searchResults?.hotels?.data?.relatedHotels > 0))
        ) {
          return true // Keeps the object
        }
        return false // Removes the object
      })
      setResultsResponseData(filteredTabsData)
      if (filteredTabsData?.[0]?.tabTitle && filteredTabsData?.length > 0) {
        setButtonName(filteredTabsData?.[0]?.tabTitle)
        handleChange(null, 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStore.searchResults, getLocation])
  useEffect(() => {
    if (searchResultsResponseData?.length) {
      setButtonName(searchResultsResponseData?.[value]?.tabTitle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, searchResultsResponseData?.length])

  var ua = global?.window?.navigator?.userAgent
  var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
  var webkit = !!ua.match(/WebKit/i)
  var iOSSafari = iOS && webkit && !ua.match(/CriOS/i)

  useEffect(
    () => {
      searchStore.autoCompleteSearch(
        searchValue,
        props?.searchData?.distance,
        String(getLocation?.latitude),
        String(getLocation?.longitude),
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm, getLocation], // Only call effect if debounced search term changes
  )
  const updatedButtonName = searchResultsResponseData?.length === 0 ? "HOTELS" : buttonName

  useEffect(() => {
    if (listenedText !== "") {
      setSearchValue(listenedText)
    }
  }, [listenedText])

  const handleUserNavigation = async (item: any, isHolidays: boolean) => {
    const brand = item?.brand_name?.toUpperCase()
    const navUrl = externalNavigation[brand]
    if (item?.brand_name?.toLowerCase() !== "taj") {
      CrossSiteNavigation({
        url: `${navUrl}/${item?.identifier}${
          isHolidays && GINGER_BRAND_NAME?.toLowerCase() !== item?.brand_name?.toLowerCase() ? `/${offersRoute}` : ""
        }?`,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      navigate(`/hotels/${item?.identifier}`)
    }
  }

  useEffect(() => {
    if (fromMic) {
      listen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromMic])

  const onScroll = () => {
    if (listInnerRef?.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef?.current
      const isNearBottom = scrollTop + clientHeight >= scrollHeight
      setIsScrolled(isNearBottom)
    }
  }

  useEffect(() => {
    const listInnerElement = listInnerRef?.current

    if (listInnerElement) {
      listInnerElement?.addEventListener("scroll", onScroll)

      return () => {
        listInnerElement?.removeEventListener("scroll", onScroll)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <ClickAwayListener
        onClickAway={() => {
          isListening && listen()
          handleClose()
        }}>
        <ParentBox aria-label="SearchModal">
          <SearchBarPaper
            sx={{
              "&.MuiPaper-root": {
                backgroundColor: theme?.palette?.neuPalette?.hexOne,
              },
            }}>
            {isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: `${MobilePxToVw(32)} ${MobilePxToVw(26)}`,
                }}>
                <BackArrowIconSecondImageBox
                  alt={`back-Arrow`}
                  component={"img"}
                  src={ICONS?.BACK_ARROW_BUTTON}
                  onClick={() => {
                    handleClose()
                    isListening && listen()
                  }}
                />
              </Box>
            )}
            <GlobalSearchIconImageBox alt={`search-img`} component={"img"} src={ICONS?.GLOBAL_SEARCH_ICON} />
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                "& .MuiInputBase-input": {
                  fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(24),
                },
              }}
              value={searchValue}
              autoFocus={!iOSSafari || iOS}
              onChange={(e: any) => handleSearch(e)}
              onKeyPress={(e: any) => handleSearch(e)}
            />
            <GlobalMicIconImageBox
              alt={`mic-img`}
              component={"img"}
              src={ICONS?.GLOBAL_SEARCH_MIC_ICON}
              onClick={listen}
            />
          </SearchBarPaper>
          <TabsShadowWrapper>
            <Tabs
              value={value}
              variant={"fullWidth"}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { background: "none" },
              }}
              sx={{
                borderWidth: "0px",
                backgroundColor: theme?.palette?.neuPalette?.hexOne,
                "& .MuiTab-root.Mui-selected": {
                  color: theme?.palette?.neuPalette?.hexTwo,
                  backgroundColor: theme?.palette?.background?.default,
                  borderWidth: "0px",
                  "@media (max-width:640px)": {
                    border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
                    borderWidth: "0px 0px 3px 0px",
                    position: "relative",
                    top: "2px",
                  },
                },
                "& .MuiTabs-flexContainer": {
                  justifyContent: "center",
                  maxHeight: "3.177vw",
                  "@media (max-width:640px)": {
                    border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}20`,
                    borderWidth: "1px 0px",
                    maxHeight: "8vh",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    backgroundColor: theme?.palette?.neuPalette?.hexOne,
                  },
                },
                "& .MuiButtonBase-root": {
                  "@media (max-width:640px)": {
                    minWidth: "fit-content",
                    maxWidth: "fit-content",
                    letterSpacing: "0.8px",
                    padding: `${MobilePxToVw(19)} 0vw`,
                  },
                },
              }}>
              {listeningTypo && (
                <CustomTab
                  label={"...Listening"}
                  sx={{
                    color: theme?.palette?.text?.primary,
                  }}
                />
              )}
              {!listeningTypo &&
                searchResultsResponseData?.map((item: any, index: number) => (
                  <CustomTab
                    key={index}
                    label={item?.tabTitle}
                    sx={{
                      color: theme?.palette?.text?.primary,
                    }}
                    onClick={() => setButtonName(item?.tabTitle)}
                  />
                ))}
            </Tabs>
            <Box
              sx={{
                position: "relative",
                maxWidth: "62.5vw",
                padding: "0.471vw 0.1vw 0vw 0vw",
                backgroundColor: theme?.palette?.background?.default,
                "@media (max-width:640px)": {
                  maxWidth: "100%",
                  padding: "0vw 0.781vw 0vw 0vw",
                },
              }}>
              {!isScrolled && <ShadeBox></ShadeBox>}
              {searchLoading && isMobile && (
                <LoadingSpinner
                  componentLevel={true}
                  containerStyle={{
                    height: "80vh",
                  }}
                />
              )}
              <TabPanelParentBox
                ref={listInnerRef}
                sx={{
                  height: isMobile ? `${MobilePxToVw(840)} !important` : "",
                  backgroundColor: theme?.palette?.background?.default,
                }}>
                {searchLoading && !isMobile && (
                  <LoadingSpinner
                    componentLevel={true}
                    containerStyle={{
                      height: "50vh",
                    }}
                  />
                )}
                <TabPanel value={value} index={value}>
                  {/* destinations search results */}
                  {!searchLoading && searchResultsResponseData?.[value]?.componentData?.destinations?.length > 0 && (
                    <>
                      <FlexBox>
                        <SearchResultsDestinationTypography
                          $isMarginTopRequired={true}
                          variant={isMobile ? "m-body-s" : "body-s"}>
                          {searchResultsResponseData?.[value]?.destination}
                        </SearchResultsDestinationTypography>
                        {searchResultsResponseData?.[value]?.componentData?.destinations
                          ?.slice(0, 2)
                          ?.map((item: any, index: number) => (
                            <StyledTypography
                              key={index}
                              variant={isMobile ? "m-body-l" : "body-l"}
                              onClick={() => {
                                handleClose()
                                setGlobalSearchedData(item)
                                if (
                                  (searchResultsResponseData?.[value].tabTitle as string) === "RESTAURANTS" &&
                                  ((item?.restaurant_brand === null && item?.restaurant_cuisine !== null) ||
                                    (item?.restaurant_brand !== null && item?.restaurant_cuisine === null))
                                ) {
                                  let restaurantNavigationURL = `/restaurants?destination=${item?.city
                                    ?.toLowerCase()
                                    ?.replaceAll(" ", "-")}`
                                  if (item?.restaurant_brand !== null) {
                                    restaurantNavigationURL =
                                      restaurantNavigationURL + `&restaurant_brand=${item?.restaurant_brand}`
                                  }
                                  if (item?.restaurant_cuisine !== null) {
                                    restaurantNavigationURL =
                                      restaurantNavigationURL + `&restaurant_cuisine=${item?.restaurant_cuisine}`
                                  }
                                  navigate(restaurantNavigationURL)
                                } else {
                                  navigate(
                                    `/destination/${
                                      (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                      "restaurants"
                                        ? "restaurants"
                                        : (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                          "holidays"
                                        ? "holiday-packages"
                                        : "hotels"
                                    }-in-${item?.city?.toLowerCase()?.replaceAll(" ", "-")}${
                                      item?.hotel_type?.toLowerCase() !== "hotels"
                                        ? `?hotel_type=${item?.hotel_type}`
                                        : ""
                                    }`,
                                  )
                                }
                                handleSelected(
                                  item,
                                  searchResultsResponseData?.[value],
                                  "destinationSelected",
                                  dataLayer,
                                  props,
                                )
                              }}>
                              <Highlighted highlight={searchValue} text={item?.name} />
                            </StyledTypography>
                          ))}
                      </FlexBox>
                      <HotelDataBorderDivider $isMobile={isMobile} />
                    </>
                  )}
                  {/* hotels search results */}

                  {!searchLoading ? (
                    searchResultsResponseData?.[value]?.componentData?.data?.length > 0 ? (
                      <>
                        <FlexBox>
                          <SearchResultsDestinationTypography
                            $isMarginTopRequired={false}
                            variant={isMobile ? "m-body-s" : "body-s"}>
                            {searchResultsResponseData?.[value]?.category}
                          </SearchResultsDestinationTypography>
                          {searchResultsResponseData?.[value]?.componentData?.data?.map((item: any, index: number) => (
                            <StyledTypography
                              key={index}
                              variant={isMobile ? "m-body-l" : "body-l"}
                              onClick={() => {
                                handleClose()
                                setGlobalSearchedData(item)
                                if (
                                  (item?.brand_name?.toLowerCase() !== "taj" &&
                                    ((searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                      "hotels" ||
                                      (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                        "holidays") &&
                                    searchValue?.length > 0) ||
                                  (item?.hotel_brand_name?.toLowerCase() !== "taj" &&
                                    (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                      "restaurants")
                                ) {
                                  handleUserNavigation(
                                    item,
                                    (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                      "holidays",
                                  )
                                } else if (
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                  "restaurants"
                                ) {
                                  navigate(
                                    `/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`,
                                  )
                                } else if (
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) === "holidays"
                                ) {
                                  if (searchValue?.length) {
                                    navigate(`/hotels/${item?.identifier}/${offersRoute}#hotelHolidays`)
                                  } else {
                                    navigate(`/${tajHolidayExperiencesRoute}/${item?.identifier}`)
                                  }
                                } else {
                                  navigate(`/hotels/${item?.identifier}`)
                                }
                                handleSelected(
                                  item,
                                  searchResultsResponseData?.[value],
                                  (searchResultsResponseData?.[value].tabTitle as string).toLowerCase().slice(0, -1) +
                                    "Selected",
                                  dataLayer,
                                  props,
                                )
                              }}>
                              <Highlighted
                                highlight={searchValue}
                                text={
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                  "restaurants"
                                    ? `${item?.restaurant_name ? `${item?.restaurant_name} -` : ""} ` +
                                      `${item?.hotel_name ? item?.hotel_name : item?.name}`
                                    : (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                      "holidays"
                                    ? `${item?.experience ? `${item?.experience} -` : ""} ` + item?.name
                                    : `${item?.experience ? `${item?.experience} -` : ""} ` +
                                      item?.name +
                                      `${item?.theme ? `- ${item?.theme} ` : ""} `
                                }
                              />
                            </StyledTypography>
                          ))}
                        </FlexBox>
                        <HotelDataBorderDivider $isMobile={isMobile} />
                      </>
                    ) : (
                      searchValue?.length > 0 && <NoResultsFound />
                    )
                  ) : null}
                  {/* Inspirations search results */}
                  {!searchLoading &&
                    searchValue?.length === 0 &&
                    searchResultsResponseData?.[value]?.inspirations?.data?.length > 0 && (
                      <>
                        <FlexBox>
                          <SearchResultsDestinationTypography
                            $isMarginTopRequired={false}
                            variant={isMobile ? "m-body-s" : "body-s"}>
                            {searchResultsResponseData?.[value]?.inspirationsTitle}
                          </SearchResultsDestinationTypography>
                          {searchResultsResponseData?.[value]?.inspirations?.data?.map((item: any, index: number) => (
                            <StyledTypography
                              key={index}
                              variant={isMobile ? "m-body-l" : "body-l"}
                              onClick={() => {
                                handleClose()
                                setGlobalSearchedData(item)
                                navigate(
                                  `/en-in/search-by-${buttonName?.toLowerCase()}?q=${item}&category=${buttonName?.toLowerCase()}`,
                                  PathType.external,
                                )
                              }}>
                              <Highlighted highlight={searchValue} text={item} />
                            </StyledTypography>
                          ))}
                        </FlexBox>
                      </>
                    )}
                  {/* related hotels search results */}
                  {searchResultsResponseData?.[value]?.relatedData?.length > 0 && (
                    <>
                      <FlexBox>
                        <SearchResultsDestinationTypography
                          $isMarginTopRequired={false}
                          variant={isMobile ? "m-body-s" : "body-s"}>
                          {searchResultsResponseData?.[value]?.relatedDataTitle}
                        </SearchResultsDestinationTypography>
                        {searchResultsResponseData?.[value]?.relatedData?.map((item: any, index: number) => (
                          <StyledTypography
                            key={index}
                            variant={isMobile ? "m-body-l" : "body-l"}
                            onClick={() => {
                              handleClose()
                              setGlobalSearchedData(item)
                              if (
                                (item?.brand_name?.toLowerCase() !== "taj" &&
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                    "hotels") ||
                                (item?.hotel_brand_name?.toLowerCase() !== "taj" &&
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                    "restaurants")
                              ) {
                                handleUserNavigation(
                                  item,
                                  (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                    "holidays",
                                )
                              } else if (
                                (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                "restaurants"
                              ) {
                                navigate(`/hotels/${item?.hotel_identifier}/restaurants/${item?.restaurant_identifier}`)
                              } else if (
                                (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) === "holidays"
                              ) {
                                if (searchValue?.length) {
                                  navigate(`/hotels/${item?.identifier}/${offersRoute}#hotelHolidays`)
                                } else {
                                  navigate(`/${tajHolidayExperiencesRoute}/${item?.identifier}`)
                                }
                              } else {
                                navigate(`/hotels/${item?.identifier}`)
                              }
                              handleSelected(
                                item,
                                searchResultsResponseData?.[value],
                                "relatedHotelsSelected",
                                dataLayer,
                                props,
                              )
                              global?.window?.localStorage?.setItem("hotelJourneyPageType", "bannerSearch")
                            }}>
                            <Highlighted
                              highlight={searchValue}
                              text={
                                (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                "restaurants"
                                  ? `${item?.restaurant_name ? `${item?.restaurant_name} -` : ""} ` +
                                    `${item?.hotel_name ? item?.hotel_name : item?.name}`
                                  : (searchResultsResponseData?.[value]?.tabTitle?.toLowerCase() as string) ===
                                    "holidays"
                                  ? `${item?.experience ? `${item?.experience} -` : ""} ` + item?.name
                                  : `${item?.experience ? `${item?.experience} -` : ""} ` +
                                    item?.name +
                                    `${item?.theme ? `- ${item?.theme} ` : ""} `
                              }
                            />
                          </StyledTypography>
                        ))}
                      </FlexBox>
                    </>
                  )}
                </TabPanel>
              </TabPanelParentBox>
            </Box>
            {!searchLoading ? (
              <ActionBox
                sx={{
                  backgroundColor: theme?.palette?.neuPalette?.hexOne,
                  "@media (max-width: 640px)": {
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    padding: "4.688vw",
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 25.88%, ${theme?.palette?.neuPalette?.hexOne} 100%)`,
                  },
                }}>
                <RenderActionItem
                  url={`/en-in/search-by-${updatedButtonName?.toLowerCase()}?category=${updatedButtonName?.toLowerCase()}`}
                  title={`VIEW ALL ${updatedButtonName}`}
                  variant={"link"}
                  navigationType="external"
                  isActionButtonType={false}
                />
              </ActionBox>
            ) : (
              <Box sx={{ height: DesktopPxToVw(105.2), backgroundColor: theme?.palette?.neuPalette?.hexOne }} />
            )}
          </TabsShadowWrapper>
        </ParentBox>
      </ClickAwayListener>
    </>
  )
}

export default observer(SearchModal)
