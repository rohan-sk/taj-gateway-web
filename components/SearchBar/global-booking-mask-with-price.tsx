import React, { useContext, useEffect, useRef, useState } from "react"
import dayjs from "dayjs"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { ActionProps, ImageProps } from "../types"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useDebounce } from "../../utils/useDebounce"
import { useMobileCheck } from "../../utils/isMobilView"
import fetchRateFilter from "../../utils/fetchRateFilter"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { DestinationStore, UserStore } from "../../store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { SearchMenuList } from "../header/styles/booking-menu"
import { useAppNavigation } from "../../utils/NavigationUtility"
import SearchStore from "../../features/search/store/search.store"
import fetchRateOnlyFilter from "../../utils/fetchRateOnlyFilterForCalendar"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import { CONSTANTS, GINGER_BRAND_NAME, externalNavigation } from "../constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box, CircularProgress, ClickAwayListener, Stack, Typography } from "@mui/material"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { getTomorrowDate, getDayAfterTomorrowDate, formatDateWithMON, dateFormatConverter } from "../../utils/getDate"
import {
  DateTypography,
  PriceMaskDivider,
  PriceMaskContainer,
  PriceMaskTextField,
  PriceMaskDateContainer,
  PriceMaskFieldsContainer,
  ResultSectionSeparator,
  SearchOptionContainer,
  SearchOptionTypography,
  SpecialCodeContainer,
  SpecialCodeTypography,
} from "../banner/guestRooms/GuestRoomStyles"
import { StyledArrowIcon } from "../forms/common/form-components"
import { DateBox, BookNowButton, DateBoxDivider, TypographyStyle, StyledDivider } from "../banner/styles"

//* Components
const GuestRoomComponent = dynamic(() => import("../banner/guestRooms/GuestRoomComponent"))
const BookingFlowSpecialCodeComponent = dynamic(() => import("../header/booking-special-code.component"))
const CustomDatePickerComponent = dynamic(() => import("../hoc/CustomDatePicker/custom-date-picker.component"))

interface GlobalBookingForPriceProps {
  imageAsset: ImageProps
  largeVariant: string
  mediaType: string
  primaryAction: ActionProps
  searchFieldVariant: string
  title: any
  variant: string
  _type: string
}

const GlobalBookingForPrice = ({ title }: GlobalBookingForPriceProps) => {
  const router = useRouter()
  const isLogin = useLoggedIn()
  const boxRef: any = useRef(null)
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context: any = useContext(IHCLContext)

  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const searchStore = context.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const destinationStore = context?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    guestDetails,
    updateGuestDetails,
    guestBookingSchedule,
    userEnteredPromoCode,
    globalSearchedData,
    setGlobalSearchedData,
    setGuestBookingSchedule,
    setUserEnteredPromoCode,
    setDestinationAvailability,
  } = bookingFlowGlobalStore

  const { searchResults, searchLoading } = searchStore

  const [open, setOpen] = useState<boolean>(false)
  const [adultCount, setAdultCount] = useState<number>(1)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(0)
  const [selectedHotel, setSelectedHotel] = useState<any>("")
  const [openOffers, setOpenOffers] = useState<boolean>(false)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [roomsCount, setRoomsCount] = useState(guestDetails?.data)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState(
    destinationStore?.destinationData?.[0]?.city || globalSearchedData?.city,
  )
  const [date, setDate] = useState<any>([
    guestBookingSchedule?.userCheckInDate ? new Date(guestBookingSchedule?.userCheckInDate) : dayjs(getTomorrowDate()),
    guestBookingSchedule?.userCheckOutDate
      ? new Date(guestBookingSchedule?.userCheckOutDate)
      : getDayAfterTomorrowDate(),
  ])

  const endDate = dateFormatConverter(date?.[1])
  const startDate = dateFormatConverter(date?.[0])
  const disableSearchButton = (date?.[0] && date?.[1] === null) || searchLoading || searchValue?.length < 2
  const isPromoCodeSelected = //* Using to show the selected promo code.
    userEnteredPromoCode?.promoCode || userEnteredPromoCode?.couponCode || userEnteredPromoCode?.agentId
  const filteredIDs = bookingFlowGlobalStore?.filteredHotelData
    ?.map((hotel: any) => hotel?.hotelId)
    ?.filter((item: any) => item?.toLowerCase() !== "null" && item)
  const isGinger = selectedHotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()
  const hotelIds = filteredIDs?.filter((item: any) => item)
  let hotelName
  if (typeof title === "string") {
    hotelName = title
  } else {
    if (isMobile) {
      hotelName = title?.[0]?.mobileTitle?.[0]
    } else {
      hotelName = title?.desktopTitle?.[0]
    }
  }

  const debouncedSearchTerm = useDebounce(searchValue, 300)
  // Input Search
  const handleSearch = (event: any) => {
    const { value } = event?.target
    setSearchValue(value)
  }

  //** Invoking the autoCompleteSearch API
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        searchStore?.autoCompleteSearch(searchValue || "")
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearchTerm],
  )

  const handleSpecialCode = () => {
    setOpenOffers(!openOffers)
  }

  const handleCreatePayload = () => {
    hotelIds?.length > 0 &&
      setDestinationAvailability({
        hotelIds: hotelIds,
        startDate: dateFormatConverter(startDate),
        endDate: dateFormatConverter(endDate),
        numRooms: 1,
        adults: roomsCount?.[0]?.adults,
        children: roomsCount?.[0]?.child,
        rateFilter: fetchRateOnlyFilter() || "RRC",
      })
  }

  const handleBooking = async () => {
    updateGuestDetails({
      data: roomsCount,
    })
    hotelIds?.length > 0 &&
      setDestinationAvailability({
        hotelIds: hotelIds,
        startDate: startDate,
        endDate: endDate,
        numRooms: 1,
        adults: roomsCount?.[0]?.adults,
        children: roomsCount?.[0]?.child,
        rateFilter: fetchRateFilter() || "RRC",
      })
  }

  const handleNavigation = (data: any, searchType: any) => {
    if (searchType === "hotel") {
      if (data?.brand_name?.toLowerCase() !== "taj" && data?.hotel_type?.toLowerCase() === "hotels") {
        handleUserNavigation(data)
      } else {
        navigate(`/hotels/${data?.identifier}`)
      }
    } else if (searchType === "destination") {
      router.push({
        pathname: `/destination/hotels-in-${data?.city?.toLowerCase()?.replaceAll(" ", "-")}`,
        query: { hotel_type: data?.hotel_type },
      })
    }
  }

  const handleUserNavigation = async (item: any) => {
    const brand = item?.brand_name?.toUpperCase()
    const navUrl = externalNavigation[brand]
    if (item?.brand_name?.toLowerCase() !== "taj") {
      CrossSiteNavigation({
        url: `${navUrl}/${item?.identifier}?`,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      navigate(`/hotels/${item?.identifier}`)
    }
  }

  const handleDateSelection = (date: any) => {
    if (
      `${date?.[0]?.getDate()}${date?.[0]?.getMonth()}${date?.[0]?.getFullYear()}` ===
      `${date?.[1]?.getDate()}${date?.[1]?.getMonth()}${date?.[1]?.getFullYear()}`
    ) {
      const tomorrow = new Date(date?.[1])
      tomorrow.setDate(new Date(date?.[1]).getDate() + 1)
      setDate([date?.[0], tomorrow])
    } else {
      setDate(date)
    }
  }

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  useEffect(() => {
    setSearchValue(destinationStore?.destinationData?.[0]?.city)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationStore?.destinationData?.[0]?.city])

  useEffect(() => {
    if (bookingFlowGlobalStore?.filteredHotelData?.length > 0) handleCreatePayload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingFlowGlobalStore?.filteredHotelData])

  useEffect(() => {
    const adults = guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue.adults)
    }, 0)
    const children = guestDetails?.data?.reduce((accumulator: number, currentValue: any) => {
      return accumulator + Number.parseInt(currentValue.child)
    }, 0)
    setAdultCount(adults)
    setChildCount(children)
    setGuestCount(adults + children)
    setRoomsCount(guestDetails?.data)
  }, [guestDetails?.data, roomsCount])

  const handleScroll = () => {
    if (boxRef?.current) {
      const elementTop = boxRef?.current?.getBoundingClientRect()?.top
      const offset = 80 // Adjust this offset as needed
      global?.window?.scrollTo({
        top: elementTop + global?.window?.scrollY - offset,
        behavior: "smooth", // You can use 'auto' or 'smooth'
      })
    }
  }

  useEffect(() => {
    ;(open || expandGuestRoomCount) && handleScroll()
  }, [open, expandGuestRoomCount])

  return (
    <>
      <PriceMaskContainer ref={boxRef} aria-label="GlobalBookingForPrice">
        <PriceMaskFieldsContainer>
          <ClickAwayListener onClickAway={() => setOpenSearch(false)}>
            <Stack position={"relative"}>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <PriceMaskTextField
                  value={searchValue}
                  variant="standard"
                  placeholder="Find a hotel or destination"
                  onChange={(e: any) => handleSearch(e)}
                  onFocus={() => setOpenSearch(true)}
                  onClick={() => setOpenSearch(true)}
                  inputProps={{
                    style: {
                      fontWeight: 300,
                      fontSize: "1.25vw",
                      fontFamily: "Inter",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                {searchLoading && (
                  <CircularProgress
                    sx={{
                      position: "absolute",
                      right: DesktopPxToVw(-13),
                      width: "1.2vw !important",
                      height: "1.2vw !important",
                    }}
                  />
                )}
              </Stack>
              {openSearch && searchResults?.hotels?.data?.length > 0 && searchValue && (
                <SearchMenuList key={searchValue}>
                  {searchResults?.hotels?.destinations?.length > 0 && (
                    <>
                      <Typography variant="body-s">{CONSTANTS?.DESTINATIONS}</Typography>
                      <ResultSectionSeparator />
                    </>
                  )}
                  {searchResults?.hotels?.destinations?.slice(0, 2)?.map((destination: any, index: number) => (
                    <SearchOptionContainer key={index}>
                      <SearchOptionTypography
                        variant="body-l"
                        onClick={() => {
                          setOpenSearch(false)
                          setSearchValue(destination?.name)
                          setGlobalSearchedData(destination)
                          handleNavigation(destination, "destination")
                        }}>
                        {destination?.name}
                      </SearchOptionTypography>
                    </SearchOptionContainer>
                  ))}
                  {searchResults?.hotels?.data?.length > 0 && (
                    <>
                      <Typography variant="body-s" color={theme.palette.neuPalette.hexTwelve} pb={DesktopPxToVw(20)}>
                        {CONSTANTS?.HOTELS}
                      </Typography>
                      <ResultSectionSeparator />
                    </>
                  )}
                  {searchResults?.hotels?.data?.slice(0, 5)?.map((hotel: any, index: number) => (
                    <SearchOptionContainer key={index}>
                      <SearchOptionTypography
                        variant="body-l"
                        onClick={() => {
                          setOpenSearch(false)
                          setSelectedHotel(hotel)
                          setSearchValue(hotel?.name)
                          setGlobalSearchedData(hotel)
                          handleNavigation(hotel, "hotel")
                          if (hotel?.brand_name?.toLowerCase() === GINGER_BRAND_NAME?.toLowerCase()) {
                            setUserEnteredPromoCode({
                              title: "",
                              index: null,
                              agentId: null,
                              promoCode: null,
                              couponCode: null,
                            })
                          }
                        }}>
                        {hotel?.name}
                      </SearchOptionTypography>
                    </SearchOptionContainer>
                  ))}
                </SearchMenuList>
              )}
            </Stack>
          </ClickAwayListener>
          <PriceMaskDivider orientation="vertical" flexItem />
          <PriceMaskDateContainer>
            <Box position={"relative"} width={"100%"} key={refresh}>
              <CustomDatePickerComponent
                date={date}
                isOpen={open}
                onChange={handleDateSelection}
                minDate={new Date()}
                defaultActiveStartDate={new Date()}
                calendarWidth={DesktopPxToVw(1158)}
                calendarIcon={null}
                showDoubleView={true}
                selectRange={true}
                onCalendarClose={() => {
                  setRefresh(`${new Date().getTime()}`)
                  setOpen(false)
                }}
                focusSelectedMonth={true}
                renderComponent={
                  <Stack
                    alignItems={"center"}
                    flexDirection={"row"}
                    onClick={() => setOpen(!open)}
                    columnGap={DesktopPxToVw(10)}>
                    <DateTypography $Date={date?.[0]} variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                    </DateTypography>
                    <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                    <DateTypography $Date={date?.[0]} variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                    </DateTypography>
                  </Stack>
                }
              />
            </Box>
          </PriceMaskDateContainer>
          <PriceMaskDivider orientation="vertical" flexItem />
          <DateBox onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)} sx={{ position: "relative" }}>
            <TypographyStyle variant="body-l">
              {Pluralize(CONSTANTS?.GUESTS.slice(0, 5), guestCount, false)}
            </TypographyStyle>
            <DateBoxDivider />
            <TypographyStyle variant="body-l">
              {Pluralize(CONSTANTS?.ROOMS?.slice(0, 4), roomsCount?.length, false)}
            </TypographyStyle>
            {expandGuestRoomCount && (
              <GuestRoomComponent
                top={"2.95vw"}
                right={"-14.8vw"}
                roomsCount={roomsCount}
                setGuestCount={setGuestCount}
                setRoomsCount={setRoomsCount}
                expandGuestRoomCount={expandGuestRoomCount}
                setExpandGuestRoomCount={setExpandGuestRoomCount}
              />
            )}
          </DateBox>
          <PriceMaskDivider orientation="vertical" flexItem />
          <SpecialCodeContainer>
            <SpecialCodeTypography variant="body-l" onClick={() => handleSpecialCode()}>
              {isPromoCodeSelected
                ? userEnteredPromoCode?.title
                  ? userEnteredPromoCode?.title
                  : CONSTANTS?.SPECIAL_CODE
                : CONSTANTS?.SPECIAL_CODE}
            </SpecialCodeTypography>
            <StyledArrowIcon toggle={openOffers} />
            {openOffers && (
              <BookingFlowSpecialCodeComponent
                boxStyles={{
                  top: "3.8vw !important",
                  right: "13.2vw !important",
                }}
                openOffers={openOffers}
                handleSpecialCode={handleSpecialCode}
                currentRoomCount={roomsCount?.length}
                isGinger={isGinger}
              />
            )}
          </SpecialCodeContainer>
        </PriceMaskFieldsContainer>
        <BookNowButton
          variant="light-contained"
          disabled={disableSearchButton}
          sx={{
            whiteSpace: "noWrap",
          }}
          onClick={() => {
            handleBooking()
          }}>
          {CONSTANTS?.SEARCH}
        </BookNowButton>
      </PriceMaskContainer>
    </>
  )
}

export default observer(GlobalBookingForPrice)
