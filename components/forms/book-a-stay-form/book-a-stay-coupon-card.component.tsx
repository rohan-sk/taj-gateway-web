import React, { useContext, useEffect, useState } from "react"
import { theme } from "../../../lib/theme"
import dynamic from "next/dynamic"
import { CONSTANTS, ICONS } from "../../constants"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../../utils/routes"
import Pluralize from "../../../utils/pluralize"
import { useDebounce } from "../../../utils/useDebounce"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { KeyboardArrowDownOutlined } from "@mui/icons-material"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { ExpandMoreIcon, SearchResultBox } from "../../header/styles/booking-menu"
import { CloseIcon, SearchIcon } from "../../../utils/customIcons"
import { fetchHotelInformation } from "../../../utils/fetchRoomData"
import SearchStore from "../../../features/search/store/search.store"
import { formatDateEnGB, formatDateWithHyphen, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ActionProps, aestheticItems, parameterMapItems } from "../../types"
import { Box, Input, InputAdornment, Stack, Typography } from "@mui/material"
import { ErrorDisplayTypography } from "../business-form/business-sme-form"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import {
  ParameterBox,
  HorizontalDivider,
  CouponCodeTextField,
  BookAStayCardTitleBox,
  LocalizationProviderBox,
  BookAStayCardTitleDivider,
  BookAStayCardComponentBox,
  GuestRoomCounterContainer,
  CheckInAndOutLabelTextField,
  ErrorMessageContainer,
  GuestCountFieldContainer,
  StyledDownArrowIcon,
  CouponCodeSection,
  CouponCodeContainer,
} from "../../card/styles/book-a-stay-card-component-styles"
import { BookAStayCardComponentProps, BookAStayCouponCodeErrors, HotelInformation, InputFontStyles } from "./types"
import dayjs from "dayjs"
import { guestTextGenerator, handleDateSelection, handleHotelSearch } from "./utils"
import {
  AutoCompleteInput,
  ColumnBox,
  OptionTypography,
  StyledAutocomplete,
  StyledPaper,
} from "../../card/styles/book-a-stay-default-card.styles"
import OffersStore from "../../../store/global/offers.store"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { UserStore } from "../../../store"
const GuestRoomComponent = dynamic(() => import("../../banner/guestRooms/GuestRoomComponent"))
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))

const initialErrors: BookAStayCouponCodeErrors = {
  search: false,
  couponCode: false,
  date: false,
}

function BookAStayCouponCardComponent({
  title,
  aesthetic,
  parameterMap,
  primaryAction,
  alignmentVariant,
  ...props
}: BookAStayCardComponentProps) {
  //* utils
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const isCustomerLoggedIn = useLoggedIn()
  const { cardPadding } = useAesthetics(aesthetic?._ref)

  //* search store values
  const searchStore = context?.getGlobalStore(GLOBAL_STORES.searchStore) as SearchStore
  const { searchResults } = searchStore

  //* booking store values
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const {
    updateGuestDetails,
    setRoomsAvailability,
    setCheckAvailabilityPayload,
    setGuestBookingSchedule,
    setUserEnteredPromoCode,
  } = bookingFlowGlobalStore
  //* user store values
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  //* offer store values
  const offerStore = context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore

  //*local states
  const [error, setError] = useState<BookAStayCouponCodeErrors>(initialErrors)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [couponCode, setCouponCode] = useState<string>("")
  const [searchResultsResponseData, setResultsResponseData] = useState<any>([])
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(null)
  const [roomsCount, setRoomsCount] = useState([{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }])
  const [guestInformation, setGuestInformation] = useState<any>({
    adult: 1,
    child: 0,
    text: "1 Adult, 0 Child - 1 Room",
  })
  const [date, setDate] = useState<any>([dayjs(getTomorrowDate()), dayjs(getDayAfterTomorrowDate())])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const withHyphens = alignmentVariant === "preceding-hyphen-title"
  const endDate = formatDateWithHyphen(formatDateEnGB(date?.[1]))
  const startDate = formatDateWithHyphen(formatDateEnGB(date?.[0]))
  const debouncedSearchTerm = useDebounce(hotelInformation, 300)

  const handleChange = ({ target: { name, value } }: any) => {
    setCouponCode(value)
    setError((prev: BookAStayCouponCodeErrors) => ({
      ...prev,
      couponCode: value?.length === 0,
    }))
  }
  useEffect(() => {
    if (searchResults?.hotel) {
      setResultsResponseData([
        {
          hotelsData: JSON?.parse(JSON?.stringify(searchResults?.hotel))?.slice(0, CONSTANTS?.FIVE),
        },
      ])
    }
  }, [searchResults])

  useEffect(() => {
    setGuestInformation((prev: any) => guestTextGenerator(roomsCount))
  }, [roomsCount])

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStore?.autoCompleteSearch(hotelInformation?.name ?? "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, searchStore])

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    setError((prev: BookAStayCouponCodeErrors) => ({
      ...prev,
      date: startDate?.length === 0 || endDate?.length === 0,
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  const handleSearchClose = () => {
    setError((prev: BookAStayCouponCodeErrors) => ({
      ...prev,
      search: true,
    }))
    setHotelInformation((prev: any) => null)
  }

  const checkInvalidFields = () => {
    setError((prev: BookAStayCouponCodeErrors) => ({
      ...prev,
      search:
        prev?.search ||
        hotelInformation?.name === undefined ||
        hotelInformation?.name === null ||
        hotelInformation?.name?.length === 0,
      couponCode: prev?.couponCode || couponCode?.length === 0,
      date: !(startDate?.length > 0 && endDate?.length > 0 && date[0] && date[1]),
    }))
  }

  const handleRedirection = async () => {
    const URL = getNonTajBrandCrossURL(
      hotelInformation?.brand_name || "",
      hotelInformation?.identifier || "",
      endDate,
      startDate,
      roomsCount,
      "",
      "",
      offerStore?.offersData?.rateCode,
      "",
      couponCode || "",
      hotelInformation?.synxis_hotel_id,
    )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isCustomerLoggedIn,
      userStore,
    })
  }

  const handleBooking = async () => {
    updateGuestDetails({
      data: roomsCount,
    })
    setUserEnteredPromoCode({
      title: "",
      index: 6,
      agentId: null,
      promoCode: null,
      couponCode: couponCode,
      rateCode: offerStore?.offersData?.rateCode,
    })
    setCheckAvailabilityPayload(
      guestInformation?.child,
      guestInformation?.adult,
      roomsCount?.length,
      endDate,
      startDate,
      hotelInformation?.id,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      true,
      offerStore?.offersData?.rateCode,
      "",
      couponCode,
      "",
    )
    await setRoomsAvailability()

    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (hotelInformation?.brand_name?.toLocaleLowerCase() !== "taj" && hotelInformation?.brand_name) {
      handleRedirection()
    } else {
      if (hotelInformation?.id) {
        navigateURL = `${navigateURL}` + `hotelId=${hotelInformation?.id}`
      }
      navigate(navigateURL)
    }
  }

  return (
    <Box
      sx={{
        padding: `${isMobile ? cardPadding?.mobile : cardPadding?.desktop}`,
      }}>
      <BookAStayCardComponentBox $mobile={isMobile}>
        {title && (
          <BookAStayCardTitleBox $mobile={isMobile}>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
          </BookAStayCardTitleBox>
        )}
        {parameterMap && (
          <>
            <ParameterBox $mobile={isMobile}>
              <ColumnBox sx={{ width: "100%" }}>
                <StyledAutocomplete
                  onChange={(event: any, newValue: any) => {
                    handleHotelSearch(event, setHotelInformation, setError, newValue)
                  }}
                  onInput={(event: any) => {
                    handleHotelSearch(event, setHotelInformation, setError)
                  }}
                  getOptionLabel={(option: any) => option.name}
                  popupIcon={<ExpandMoreIcon />}
                  value={hotelInformation}
                  options={hotelInformation?.name ? searchResultsResponseData?.[0]?.hotelsData || [] : []}
                  PaperComponent={({ children }: any) => <StyledPaper>{children}</StyledPaper>}
                  renderOption={(props: any) => {
                    return (
                      <OptionTypography variant={isMobile ? "m-body-m" : "body-m"} {...props}>
                        {props.key}
                      </OptionTypography>
                    )
                  }}
                  renderInput={(params: any) => {
                    const { InputProps } = params

                    const temp = {
                      ...params,
                      InputProps: {
                        ...InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon
                              sx={{
                                height: "auto",
                                marginBottom: "0.22vw",
                                width: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: hotelInformation?.name && hotelInformation?.name?.length > 0 && (
                          <InputAdornment position="end">
                            <Box component={"div"} onClick={handleSearchClose}>
                              <CloseIcon
                                sx={{
                                  cursor: "pointer",
                                  height: isMobile ? "auto" : "0.8vw",
                                  width: isMobile ? "2.5vw" : "1vw",
                                }}
                              />
                            </Box>
                          </InputAdornment>
                        ),
                      },
                    }
                    return <AutoCompleteInput variant="standard" name={"name"} placeholder="Find a Hotel" {...temp} />
                  }}
                />
                {error?.search && (
                  <ErrorMessageContainer>
                    <ErrorDisplayTypography
                      sx={{
                        marginBottom: isMobile ? "1.563vw" : "0.541vw",
                        position: "absolute",
                      }}>
                      {"Please fill the hotel field"}
                    </ErrorDisplayTypography>
                  </ErrorMessageContainer>
                )}
              </ColumnBox>
              <ColumnBox>
                <Box
                  sx={{
                    borderBottom: `1px solid ${theme?.palette?.ihclPalette?.hexTwelve}`,
                    width: isMobile ? "100%" : "24.063vw",
                  }}>
                  <LocalizationProviderBox
                    sx={{
                      width: isMobile ? "100%" : "24.063vw",
                      padding: "0!important",
                      alignItems: "baseline !important",
                    }}>
                    <Box
                      loading="lazy"
                      component={"img"}
                      src={ICONS?.CALENDER_ICON}
                      alt={"calender"}
                      width={isMobile ? "2.656vw" : "0.938vw"}
                    />
                  </LocalizationProviderBox>
                </Box>
                {error?.date && (
                  <ErrorMessageContainer>
                    <ErrorDisplayTypography>{"Please enter the valid date"}</ErrorDisplayTypography>
                  </ErrorMessageContainer>
                )}
              </ColumnBox>
              <GuestCountFieldContainer>
                <Input
                  inputProps={{
                    style: {
                      fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                      fontFamily: "supreme",
                    },
                  }}
                  sx={{ width: isMobile ? "100%" : "17.708vw" }}
                  onClick={(e: any) => setExpandGuestRoomCount((prev: boolean) => !prev)}
                  onKeyDown={(e: any) => e?.preventDefault()}
                  endAdornment={
                    <InputAdornment sx={{ cursor: "pointer" }} position="end">
                      <StyledDownArrowIcon />
                    </InputAdornment>
                  }
                  value={guestInformation?.text}
                />
                <GuestRoomCounterContainer>
                  {expandGuestRoomCount && (
                    <GuestRoomComponent
                      top={"0vw"}
                      right={isMobile ? "" : "-1.5vw"}
                      roomsCount={roomsCount}
                      setGuestCount={setGuestCount}
                      setRoomsCount={setRoomsCount}
                      expandGuestRoomCount={expandGuestRoomCount}
                      setExpandGuestRoomCount={setExpandGuestRoomCount}
                    />
                  )}
                </GuestRoomCounterContainer>
              </GuestCountFieldContainer>
            </ParameterBox>
            <CouponCodeSection>
              <CouponCodeContainer>
                <CouponCodeTextField
                  variant="standard"
                  placeholder={parameterMap?.[3]?.value}
                  value={couponCode}
                  onChange={handleChange}
                  InputProps={{
                    style: InputFontStyles,
                  }}
                  $isMobile={isMobile}
                />
                {error?.couponCode && (
                  <ErrorMessageContainer>
                    <ErrorDisplayTypography>{"Please Enter Valid Coupon Code"}</ErrorDisplayTypography>
                  </ErrorMessageContainer>
                )}
              </CouponCodeContainer>
            </CouponCodeSection>
          </>
        )}
        {primaryAction && (
          <Box
            sx={{
              paddingTop: isMobile ? "2.344vw" : "3.125vw",
            }}>
            <RenderActionItem
              onClick={() => {
                if (
                  date[0] &&
                  date[1] &&
                  !error?.search &&
                  !error?.couponCode &&
                  couponCode?.length > 0 &&
                  hotelInformation?.name &&
                  hotelInformation?.name?.length > 0
                )
                  handleBooking()
                else {
                  checkInvalidFields()
                }
              }}
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title || "SUBMIT"}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
              }}
            />
          </Box>
        )}
      </BookAStayCardComponentBox>
    </Box>
  )
}

export default observer(BookAStayCouponCardComponent)
