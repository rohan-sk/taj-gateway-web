import React, { useContext, useEffect, useState } from "react"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../../utils/routes"
import { GLOBAL_STORES } from "../../../utils/Constants"
import fetchRateFilter from "../../../utils/fetchRateFilter"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { ExpandMoreIcon } from "../../header/styles/booking-menu"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { CalenderIcon, CloseIcon, SearchIcon } from "../../../utils/customIcons"
import {
  getDayAfterTomorrowDate,
  getTomorrowDate,
  formatDateWithMON,
  dateFormatConverter,
  differenceInDays,
  getTodayDate,
  getPreviousDate,
  addDaysToDate,
} from "../../../utils/getDate"
import { Box, Input, InputAdornment, Stack, Select, Typography } from "@mui/material"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../features/booking/store/globalStore/booking.flow.store"
import dayjs from "dayjs"
import { guestTextGenerator, handleBookAHotelSearch } from "./utils"
import { BookAStayCardComponentProps, BookAStayPackageErrors } from "./types"
import OffersStore from "../../../store/global/offers.store"
import { KeyboardArrowDown } from "@mui/icons-material"
import { Error_icon } from "../gift-card-form/constants"
import AddNumberOfDays from "../../../utils/addDaysToGivenDate"
import { StyledDivider } from "../../banner/styles"
import { FullBox } from "../../MyAccount/booking-history/booking-styles"
import fetchRateOnlyFilter from "../../../utils/fetchRateOnlyFilterForCalendar"
import { BookAStayErrorMessages } from "../../forms/gift-card-form/constants"
import dynamic from "next/dynamic"
import { groq } from "next-sanity"
import { UserStore } from "../../../store"
import { getClient } from "../../../lib-sanity"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import {
  ParameterBox,
  BookAStayCardTitleBox,
  BookAStayCardTitleDivider,
  BookAStayCardComponentBox,
  ErrorDisplayTypography,
  StyledDownArrowIcon,
} from "../../card/styles/book-a-stay-card-component-styles"
import {
  GuestRoomContainer,
  AutoCompleteInput,
  DatePickerContainer,
  ColumnBox,
  OptionTypography,
  PackageContainer,
  StyledAutocomplete,
  StyledPaper,
} from "../../card/styles/book-a-stay-default-card.styles"
import {
  ErrorMessageTypography,
  NewsLetterFormControl,
  NewsLetterMenuItem,
  NewsLetterStyledLabel,
} from "../enquiry-forms/news-letter-form/news-letter-form.styles"
import { ColumnFlexBox } from "../../forms/enquiry-forms/khazana-enquiry-form/khazana-enquiry-form.styles"
import { getListWithBrandSorting } from "../../../utils/getListWithBrandSorting"
import { getSortedData } from "../../../utils/getSortedData"

const CustomDateTileComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-tile.component"))
const CustomDatePickerComponent = dynamic(() => import("../../hoc/CustomDatePicker/custom-date-picker.component"))
const GuestRoomComponent = dynamic(() => import("../../banner/guestRooms/GuestRoomComponent"))
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))

interface DefaultErrors {
  package: any
  search: boolean
  date: boolean
}

const initialErrors: BookAStayPackageErrors = {
  search: false,
  package: false,
  date: false,
}

export interface HotelInformation {
  hotelName: string
  hotelId: string
  brandName: string
  identifier: string
}

const initialGuestInformationValue = {
  adult: 1,
  child: 0,
  text: "1 Adult, 0 Child - 1 Room",
}

const initialRoomCountValue = [{ id: 1, adults: 1, child: 0, room: "ROOM", isSelected: false }]

function BookAStayPackageCardComponent({
  title,
  aesthetic,
  parameterMap,
  primaryAction,
  alignmentVariant,
  variant,
  largeVariant,
  ...props
}: BookAStayCardComponentProps) {
  const withHyphens = alignmentVariant === "preceding-hyphen-title"

  //* utils
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const isCustomerLoggedIn = useLoggedIn()

  //* stores
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const offerStore = context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const {
    updateGuestDetails,
    setRoomsAvailability,
    setGuestBookingSchedule,
    setCheckAvailabilityPayload,
    setUserEnteredPromoCode,
    isCalendarLoading,
    setCalenderViewData,
    updateCalenderViewData,
    clearCalenderViewData,
    userEnteredPromoCode,
  } = bookingFlowGlobalStore

  const lengthOfStay = offerStore?.offersData?.lengthOfStay || 1
  const userTier = global?.window?.localStorage?.getItem("userTier")

  //* states
  const [packages, setPackages] = useState<any[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [dateKey, setDateKey] = useState<number>(0)
  const [guestCount, setGuestCount] = useState<number>(1)
  const [userPackage, setUserPackage] = useState<any>("")
  const [error, setError] = useState<DefaultErrors>(initialErrors)
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const [roomsCount, setRoomsCount] = useState(initialRoomCountValue)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [participatingHotels, setParticipatingHotels] = useState<any[]>([])
  const [expandGuestRoomCount, setExpandGuestRoomCount] = useState<boolean>(false)
  const [hotelInformation, setHotelInformation] = useState<HotelInformation | null>(null)
  const [guestInformation, setGuestInformation] = useState<any>(initialGuestInformationValue)
  const [userSelectedPackageFetchedData, setUserSelectedPackageFetchedData] = useState<any>([])
  const [date, setDate] = useState<any>([
    dayjs(getTomorrowDate()),
    dayjs(lengthOfStay ? addDaysToDate(getTomorrowDate(), lengthOfStay) : getDayAfterTomorrowDate()),
  ])

  const endDate = dateFormatConverter(date?.[1])
  const startDate = dateFormatConverter(date?.[0])

  const handleChange = ({ target: { name, value } }: any) => {
    setUserPackage(value)
    setHotelInformation(() => null)
    setError((prev: BookAStayPackageErrors) => ({
      ...prev,
      package: value?.length === 0,
    }))
  }

  const handleDateSelection = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0])
    if (selectedType === "check_in") {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
      setSelectedType("check_out")
      setOpen(true)
    } else if (
      //? if user selects same date
      `${checkInDate?.getDate()}${checkInDate?.getMonth()}${checkInDate?.getFullYear()}` ===
      `${pickedDate?.[0]?.getDate()}${pickedDate?.[0]?.getMonth()}${pickedDate?.[0]?.getFullYear()}`
    ) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else if (pickedDate?.[0] <= checkInDate) {
      setDate([pickedDate?.[0], addDaysToDate(pickedDate?.[0], lengthOfStay ? lengthOfStay : 1)])
    } else if (differenceInDays(checkInDate, pickedDate?.[0]) < lengthOfStay) {
      setDate([checkInDate, addDaysToDate(checkInDate, lengthOfStay ? lengthOfStay : 1)])
    } else {
      setDate([checkInDate, pickedDate?.[0]])
    }
  }

  const handleSearchClose = () => {
    setError((prev: DefaultErrors) => ({
      ...prev,
      search: true,
    }))
    setHotelInformation((prev: any) => null)
  }

  const checkInvalidFields = () => {
    setError((prev: any) => ({
      ...prev,
      search:
        prev?.search ||
        hotelInformation?.hotelName === undefined ||
        hotelInformation?.hotelName === null ||
        hotelInformation?.hotelName?.length === 0,
      package: prev?.package || userPackage?.length === 0,
      date: !(startDate?.length > 0 && endDate?.length > 0 && date[0] && date[1]),
    }))
  }

  const handleRedirection = async () => {
    const URL = getNonTajBrandCrossURL(
      hotelInformation?.brandName || "",
      hotelInformation?.identifier || "",
      endDate,
      startDate,
      roomsCount,
      "",
      userSelectedPackageFetchedData?.promoCode,
      userSelectedPackageFetchedData?.rateCode,
    )
    await CrossSiteNavigation({
      url: URL,
      loggedIn: isCustomerLoggedIn,
      userStore,
    })
  }

  //* API Call
  const handleBooking = async () => {
    updateGuestDetails({
      data: roomsCount,
    })
    setUserEnteredPromoCode({
      title: "Special Offer Code",
      index: userSelectedPackageFetchedData?.rateCode ? null : userSelectedPackageFetchedData?.promoCode ? 5 : null,
      agentId: null,
      promoCode: userSelectedPackageFetchedData?.promoCode || null,
      couponCode: null,
      rateCode: null,
    })
    setCheckAvailabilityPayload(
      guestInformation?.child,
      guestInformation?.adult,
      roomsCount?.length,
      endDate,
      startDate,
      hotelInformation?.hotelId,
      fetchRateFilter() || undefined,
      global?.window?.localStorage?.getItem("userTier") || undefined,
      true,
      userSelectedPackageFetchedData?.rateCode,
      userSelectedPackageFetchedData?.promoCode,
      "",
      "",
      false,
    )
    await setRoomsAvailability()
    let navigateURL = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
    if (hotelInformation?.brandName?.toLocaleLowerCase() !== "taj" && hotelInformation?.brandName) {
      handleRedirection()
    } else {
      if (hotelInformation?.hotelId) {
        navigateURL = `${navigateURL}` + `hotelId=${hotelInformation?.hotelId}`
      }
      if (userPackage?.basicInfo?.title) {
        navigateURL = `${navigateURL}` + `&offerName=${userPackage?.basicInfo?.title}`
      }
      if (userSelectedPackageFetchedData?.rateCode) {
        navigateURL =
          `${navigateURL}` + `${"&isFromOLP=true"}&offerRateCode=${userSelectedPackageFetchedData?.rateCode}`
      }
      if (userSelectedPackageFetchedData?.promoCode) {
        navigateURL =
          `${navigateURL}` + `${"&isFromOLP=true"}&offerPromoCode=${userSelectedPackageFetchedData?.promoCode}`
      }
      if (lengthOfStay) {
        navigateURL = `${navigateURL}` + `&minLOS=${lengthOfStay}`
      }
      if (userEnteredPromoCode?.promoCode) {
        navigateURL = `${navigateURL}` + `&sc=${userEnteredPromoCode?.title}`
      }
      navigate(navigateURL)
    }
  }

  const selectedPackageOffer = async (identifier?: string | undefined) => {
    const query = groq`*[_type == "offerPackages" && identifier == "${identifier}"] { title,packageType,identifier,promoCode,rateCode,"hotels":hotels[]{participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,identifier,lengthOfStay}}}[0]`
    let data
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
        setUserSelectedPackageFetchedData(data)
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  useEffect(() => {
    if (userPackage?.inclusionIdentifier) {
      selectedPackageOffer(userPackage?.inclusionIdentifier)
    }
  }, [userPackage])

  const removeDuplicateHotels = (arr: any) => {
    const uniqueIds: any = []
    const unique = arr?.filter((element: any) => {
      const isDuplicate = uniqueIds?.includes(element?.identifier)
      if (!isDuplicate) {
        uniqueIds.push(element?.identifier)
        return true
      }
      return false
    })
    return unique
  }

  useEffect(() => {
    const participatingHotelsData: any = []
    userSelectedPackageFetchedData?.hotels?.map((val: any) => {
      val?.participatingHotels?.map((hotel: any) => {
        participatingHotelsData.push({ ...hotel })
      })
    })
    setParticipatingHotels(removeDuplicateHotels(getListWithBrandSorting(participatingHotelsData)) || [])
    setPackages(
      getSortedData(offerStore?.offersData?.hotels?.[0]?.inclusions, (item: any) => item?.basicInfo?.title || ""),
    )
  }, [offerStore, userSelectedPackageFetchedData])

  useEffect(() => {
    setGuestInformation((prev: any) => guestTextGenerator(roomsCount))
  }, [roomsCount])

  useEffect(() => {
    setGuestBookingSchedule(startDate, endDate)
    setError((prev: any) => ({
      ...prev,
      date: startDate?.length === 0 || endDate?.length === 0,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = bookingFlowGlobalStore?.calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
  }, [leads])

  // used to update calendar view
  const handleView = async ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 62)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (
      view === "month" &&
      hotelInformation?.hotelId &&
      hotelInformation?.hotelId?.toLocaleLowerCase() !== "null" &&
      hotelInformation?.hotelId?.toLocaleLowerCase() !== null &&
      hotelInformation?.brandName?.toLowerCase() === "taj"
    ) {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const getCalendarData = async (startDate: any, endDate: any, update: boolean) => {
    const calendarPayload = {
      hotelId: hotelInformation?.hotelId,
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: lengthOfStay || 1,
      rateCode: userSelectedPackageFetchedData?.rateCode,
      promoCode: userSelectedPackageFetchedData?.promoCode,
      promoType: userSelectedPackageFetchedData?.promoCode ? "promotion" : null,
      agentId: null,
      agentType: null,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (hotelInformation?.hotelId) {
      clearCalenderViewData()
      getCalendarData(getTodayDate(), AddNumberOfDays(getTodayDate(), 62), false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelInformation?.hotelId, userTier])

  return (
    <Box
      aria-label="BookAStayPackageCardComponent"
      sx={{
        padding: isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop,
      }}>
      <BookAStayCardComponentBox $mobile={isMobile}>
        {title && (
          <BookAStayCardTitleBox $mobile={isMobile}>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
            {withHyphens && !isMobile && <BookAStayCardTitleDivider />}
          </BookAStayCardTitleBox>
        )}
        <PackageContainer sx={{ marginTop: isMobile ? "8.594vw!important" : "" }}>
          <Box
            sx={{
              width: isMobile ? "100%" : "22.604vw",
            }}>
            <NewsLetterFormControl variant={"standard"} sx={{ width: "100%" }}>
              {userPackage?.length === 0 && <NewsLetterStyledLabel>{"Select Package"}</NewsLetterStyledLabel>}
              <Select
                sx={{
                  width: "100%",
                }}
                label={"Select Package"}
                aria-label={"Select Package"}
                value={userPackage}
                name={"package"}
                onChange={handleChange}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                IconComponent={(props) =>
                  error?.package ? (
                    <InputAdornment position="end">
                      <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
                    </InputAdornment>
                  ) : (
                    <KeyboardArrowDown
                      {...props}
                      sx={{
                        color: theme?.palette?.neuPalette?.hexSeventeen,
                        fontWeight: 300,
                      }}
                    />
                  )
                }>
                {packages?.map((item: any, index: number) => (
                  <NewsLetterMenuItem key={index} value={item}>
                    {item?.basicInfo?.title}
                  </NewsLetterMenuItem>
                ))}
              </Select>
            </NewsLetterFormControl>
            {error?.package && (
              <Box width={"100%"} textAlign={"start"}>
                <ErrorMessageTypography>{"Please select any package"}</ErrorMessageTypography>
              </Box>
            )}
          </Box>
        </PackageContainer>
        <ParameterBox
          sx={{
            margin: isMobile ? "6vw 0vw 0vw!important" : "2.083vw 0vw 0vw!important",
          }}
          $mobile={isMobile}>
          <ColumnBox sx={{ width: "100%" }}>
            <StyledAutocomplete
              disableClearable={!!hotelInformation?.hotelName || hotelInformation?.hotelName?.length === 0}
              onChange={(event: any, newValue: any) => {
                handleBookAHotelSearch(event, setHotelInformation, setError, newValue)
              }}
              onInput={(event: any) => {
                setError((prev: any) => ({
                  ...prev,
                  package: userPackage?.basicInfo?.title ? userPackage?.basicInfo?.title?.length === 0 : true,
                }))
                handleBookAHotelSearch(event, setHotelInformation, setError)
              }}
              popupIcon={<ExpandMoreIcon />}
              sx={{
                width: "100%",
                "& .MuiAutocomplete-inputRoot": {
                  paddingRight: "0vw!important",
                },
              }}
              getOptionLabel={(option: any) => option.hotelName}
              noOptionsText={"No results found for your search"}
              value={hotelInformation}
              options={
                participatingHotels?.length > 0
                  ? hotelInformation == null || hotelInformation?.hotelName?.length === 0
                    ? participatingHotels
                    : participatingHotels
                  : []
              }
              PaperComponent={({ children }: any) => <StyledPaper>{children}</StyledPaper>}
              renderOption={(props: any) => {
                return (
                  <OptionTypography variant={isMobile ? "m-body-m" : "body-m"} {...props}>
                    {props.key}
                  </OptionTypography>
                )
              }}
              renderInput={(params) => {
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
                    endAdornment: hotelInformation?.hotelName && hotelInformation?.hotelName?.length > 0 && (
                      <>
                        <InputAdornment position="end">
                          <Box component={"div"} onClick={() => handleSearchClose()}>
                            <CloseIcon
                              sx={{
                                cursor: "pointer",
                                height: isMobile ? "auto" : "0.8vw",
                                width: isMobile ? "2.5vw" : "1vw",
                              }}
                            />
                          </Box>
                        </InputAdornment>
                      </>
                    ),
                  },
                }
                return <AutoCompleteInput variant="standard" name={"name"} placeholder="Find a Hotel" {...temp} />
              }}
            />
            <Box>
              {error?.search && (
                <ErrorDisplayTypography
                  sx={{
                    marginBottom: isMobile ? "1.563vw" : "0.541vw",
                    position: "absolute",
                  }}>
                  {BookAStayErrorMessages?.HOTEL}
                </ErrorDisplayTypography>
              )}
            </Box>
          </ColumnBox>

          <ColumnFlexBox sx={{ width: "100%" }}>
            <DatePickerContainer key={refresh}>
              <CustomDatePickerComponent
                date={date}
                isOpen={open}
                onChange={handleDateSelection}
                minDate={new Date()}
                defaultActiveStartDate={new Date()}
                calendarWidth={isMobile ? MobilePxToVw(476) : DesktopPxToVw(1158)}
                sx={{
                  "@media (max-width: 640px)": {
                    "& .react-calendar": {
                      padding: `${MobilePxToVw(30)} ${MobilePxToVw(10)} !important`,
                    },
                  },
                }}
                calendarIcon={<CalenderIcon sx={{ width: isMobile ? "2.656vw" : "0.833vw" }} />}
                selectRange={true}
                onCalendarOpen={() => setOpen(true)}
                onActiveStartDateChange={handleView}
                showDoubleView={isMobile ? false : true}
                onCalendarClose={() => {
                  setRefresh(`${new Date().getTime()}`), setOpen(false)
                }}
                allowPartialRange
                tileContent={({ activeStartDate, date, view }: any) =>
                  view === "month" &&
                  !isCalendarLoading &&
                  hotelInformation?.hotelId && (
                    <CustomDateTileComponent leads={leads} date={date} key={dateKey} lengthOfStay={lengthOfStay} />
                  )
                }
                tileDisabled={({ activeStartDate, date, view }: any) => {
                  const filteredDate =
                    leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                  return (
                    !filteredDate?.available &&
                    view === "month" &&
                    !isCalendarLoading &&
                    selectedType === "check_in" &&
                    hotelInformation?.hotelId
                  )
                }}
                focusSelectedMonth={true}
                renderComponent={
                  <Stack
                    alignItems={"center"}
                    flexDirection={"row"}
                    onClick={() => setOpen(!open)}
                    columnGap={DesktopPxToVw(10)}>
                    <Typography
                      whiteSpace={"nowrap"}
                      color={theme.palette.neuPalette.Seventeen}
                      onClick={() => setSelectedType("check_in")}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                    </Typography>
                    <StyledDivider sx={{ width: `${DesktopPxToVw(30)} !important` }} />
                    <Typography
                      whiteSpace={"nowrap"}
                      color={theme.palette.neuPalette.hexSeventeen}
                      onClick={() => setSelectedType("check_out")}
                      variant={isMobile ? "m-body-l" : "body-l"}>
                      {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                    </Typography>
                  </Stack>
                }></CustomDatePickerComponent>
            </DatePickerContainer>
            {error?.date && (
              <Box position={"relative"} width={"100%"}>
                <ErrorDisplayTypography position={"absolute"}>{BookAStayErrorMessages?.DATE}</ErrorDisplayTypography>
              </Box>
            )}
          </ColumnFlexBox>
          <FullBox
            sx={{ display: "flex", flexDirection: "column" }}
            onClick={() => setExpandGuestRoomCount(!expandGuestRoomCount)}>
            <Input
              inputProps={{
                style: {
                  fontWeight: 300,
                  fontSize: isMobile ? MobilePxToVw(24) : DesktopPxToVw(24),
                  fontFamily: "Inter",
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
            {expandGuestRoomCount && (
              <GuestRoomContainer>
                <GuestRoomComponent
                  top={"0vw"}
                  right={isMobile ? "" : "-1.5vw"}
                  roomsCount={roomsCount}
                  setGuestCount={setGuestCount}
                  setRoomsCount={setRoomsCount}
                  expandGuestRoomCount={expandGuestRoomCount}
                  setExpandGuestRoomCount={setExpandGuestRoomCount}
                />
              </GuestRoomContainer>
            )}
          </FullBox>
        </ParameterBox>

        {primaryAction && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: isMobile ? "8.594vw" : "3.125vw",
            }}>
            <RenderActionItem
              onClick={() => {
                if (
                  date[0] &&
                  date[1] &&
                  !error?.search &&
                  !error?.package &&
                  hotelInformation?.hotelName &&
                  hotelInformation?.brandName?.length > 0
                ) {
                  handleBooking()
                } else {
                  checkInvalidFields()
                }
              }}
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title || "BOOK NOW"}
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

export default observer(BookAStayPackageCardComponent)
