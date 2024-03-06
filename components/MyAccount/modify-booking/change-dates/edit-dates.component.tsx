import React, { useState, useContext, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { theme } from "../../../../lib/theme"
import { CalenderIcon } from "../../../../utils/customIcons"
import {
  dateFormatConverter,
  differenceInDays,
  firstDateOfSelectedMonth,
  formatDateWithMON,
  getNextDate,
  getPreviousDate,
  getTodayDate,
} from "../../../../utils/getDate"
import { Box, Stack, Typography } from "@mui/material"
import data from "./booking-json.json"

import {
  MainGrid,
  DatesWrapper,
  StyledDivider,
  BoldText,
  DatesStack,
  CalendarBox,
  CalendarStack,
  CalendarTextStack,
  ParentStack,
  DatesText,
} from "./edit-rooms-styles"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BookingFlowGlobalStore from "../../../../features/booking/store/globalStore/booking.flow.store"
import { useMobileCheck } from "../../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import CustomDatePickerComponent from "../../../hoc/CustomDatePicker/custom-date-picker.component"
import AddNumberOfDays from "../../../../utils/addDaysToGivenDate"
import CustomDateTileComponent from "../../../hoc/CustomDatePicker/custom-date-tile.component"
import { useRouter } from "next/router"
import fetchRateOnlyFilter from "../../../../utils/fetchRateOnlyFilterForCalendar"

const EditDateComponent = ({
  date,
  setDate,
  roomDetails,
  disableEdit,
  isComplementary,
  rateCode,
  promoCode,
  promoType,
  agentId,
  agentType,
}: any) => {
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)
  const calendarRef = useRef<any>(null)
  const checkInDate = roomDetails?.[0]?.modifyBooking?.checkIn || roomDetails?.[0]?.checkIn
  const checkOutDate = roomDetails?.[0]?.modifyBooking?.checkOut || roomDetails?.[0]?.checkOut
  // const dateDifference = differenceInDays(checkInDate, checkOutDate)
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES.bookingFlowStore) as BookingFlowGlobalStore
  const { calendarViewData, setCalenderViewData, updateCalenderViewData, isCalendarLoading } = bookingFlowGlobalStore
  const urlParams = new URLSearchParams(global?.window?.location?.search)
  const [open, setOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("check_in")
  const [refresh, setRefresh] = useState<any>(new Date().getTime())
  const router = useRouter()
  useEffect(() => {
    if (open && calendarRef?.current && !disableEdit) {
      const elementTop = calendarRef.current.getBoundingClientRect().top
      const offset = 100 // Adjust this offset as needed
      window.scrollTo({
        top: elementTop + window.scrollY - offset,
        behavior: "smooth", // You can use 'auto' or 'smooth'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const [dateKey, setDateKey] = useState<number>(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const leads: any = calendarViewData || []

  useEffect(() => {
    setDateKey((prev: number) => prev + 1)
  }, [leads])

  const getCalendarData = (startDate: any, endDate: any, update: boolean) => {
    const calendarPayload = {
      hotelId: urlParams?.get("hotelId"),
      startDate: dateFormatConverter(startDate),
      endDate: dateFormatConverter(endDate),
      onlyCheckRequested: "true",
      rateFilter: fetchRateOnlyFilter(),
      lengthOfStay: 1,
      rateCode,
      promoCode,
      promoType,
      agentId,
      agentType,
    }
    update ? updateCalenderViewData(calendarPayload) : setCalenderViewData(calendarPayload)
  }

  useEffect(() => {
    if (urlParams?.get("hotelId")) {
      getCalendarData(getTodayDate(), AddNumberOfDays(getTodayDate(), 31), false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rateCode])

  const handleView = ({ view, activeStartDate, action }: any) => {
    const startDate = activeStartDate
    const endDate = AddNumberOfDays(activeStartDate, 31)
    const hasDate = (date: any) => leads.some((obj: any) => obj?.arrivalDate == dateFormatConverter(date))
    const hasBothDates = hasDate(startDate) && hasDate(getPreviousDate(endDate))
    if (view === "month" && action?.toLowerCase() !== "onchange") {
      if (hasBothDates) {
        return null
      } else {
        getCalendarData(startDate, endDate, true)
      }
    }
  }

  const handleCalendarOpen = () => {
    const startDate = date?.[0] ? firstDateOfSelectedMonth(new Date(date?.[0])) : getTodayDate()
    const endDate = AddNumberOfDays(startDate, 31)
    setOpen(true)
  }

  const handleDate = (pickedDate: any) => {
    const checkInDate = new Date(date?.[0] || pickedDate?.[0])
    const tomorrow = new Date(checkInDate)
    tomorrow.setDate(new Date(checkInDate).getDate() + 1)
    if (selectedType === "check_in") {
      setDate([pickedDate?.[0], getNextDate(pickedDate?.[0])])
      setSelectedType("check_out")
      setOpen(true)
    } else if (
      `${checkInDate?.getDate()}${checkInDate?.getMonth()}${checkInDate?.getFullYear()}` ===
      `${pickedDate?.[0]?.getDate()}${pickedDate?.[0]?.getMonth()}${pickedDate?.[0]?.getFullYear()}`
    ) {
      setDate([checkInDate, tomorrow])
    } else if (pickedDate?.[0] <= checkInDate) {
      setDate([pickedDate?.[0], checkInDate])
    } else {
      setDate([checkInDate, pickedDate?.[0]])
    }
  }

  const keypadCloseForDatePicker = () => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur()
    }
  }

  return (
    <Stack width={"100%"} alignItems={"center"}>
      <MainGrid mt={isMobile ? MobilePxToVw(55) : DesktopPxToVw(40)} container aria-label="EditDateComponent">
        {(checkInDate || checkOutDate) && (
          <DatesWrapper alignItems={"center"} flexDirection={isMobile ? "column" : "row"}>
            <BoldText variant={isMobile ? "m-body-l" : "body-l"}>{data?.currentDates} :</BoldText>
            <Stack
              sx={{ flexDirection: "row", alignItems: "center" }}
              columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>{formatDateWithMON(checkInDate)}</Typography>
              <StyledDivider />
              <Typography variant={isMobile ? "m-body-l" : "body-l"}>{formatDateWithMON(checkOutDate)}</Typography>
            </Stack>
          </DatesWrapper>
        )}
        <ParentStack $isMobile={isMobile}>
          <BoldText variant={isMobile ? "m-body-l" : "body-l"}>{data?.newDates} :</BoldText>
          <DatesStack onClick={() => keypadCloseForDatePicker()} $isMobile={isMobile}>
            <Stack
              width={"100%"}
              sx={{
                "& .styledText": {
                  width: "100%",
                },
              }}>
              {/* using react-date-picker */}
              <CalendarBox ref={calendarRef} key={refresh}>
                <CustomDatePickerComponent
                  date={date}
                  isOpen={open}
                  onChange={handleDate}
                  minDate={new Date()}
                  defaultActiveStartDate={date?.[0] ? firstDateOfSelectedMonth(new Date(date?.[0])) : new Date()}
                  calendarWidth={isMobile ? MobilePxToVw(533) : DesktopPxToVw(533)}
                  onCalendarClose={() => {
                    setRefresh(`${new Date().getTime()}`)
                    setOpen(false)
                  }}
                  calendarIcon={
                    <Box
                      aria-label="calendarIcon"
                      sx={{ cursor: "pointer" }}
                      onClick={(prev: any) => {
                        setOpen(!prev), keypadCloseForDatePicker()
                      }}>
                      <CalenderIcon />
                    </Box>
                  }
                  selectRange={true}
                  allowPartialRange
                  zIndex={false}
                  onCalendarOpen={handleCalendarOpen}
                  isCalendarLoading={isCalendarLoading && open}
                  onActiveStartDateChange={handleView}
                  tileContent={({ activeStartDate, date, view }: any) =>
                    view === "month" &&
                    !isCalendarLoading && (
                      <CustomDateTileComponent
                        leads={leads}
                        date={date}
                        key={dateKey}
                        isComplementary={isComplementary}
                      />
                    )
                  }
                  tileDisabled={({ activeStartDate, date, view }: any) => {
                    const filteredDate =
                      leads && leads?.filter((item: any) => item?.arrivalDate == dateFormatConverter(date))?.[0]
                    return (
                      isCalendarLoading ||
                      (!filteredDate?.available &&
                        view === "month" &&
                        selectedType === "check_in" &&
                        !isCalendarLoading)
                    )
                  }}
                  disableCalendar={disableEdit}
                  renderComponent={
                    <CalendarStack>
                      <CalendarTextStack
                        aria-label={"parent"}
                        onClick={() => {
                          setOpen(true), keypadCloseForDatePicker()
                        }}
                        $isMobile={isMobile}>
                        <DatesText
                          onClick={() => {
                            setSelectedType("check_in")
                          }}
                          aria-label={"check_in"}
                          $color={date?.[0] && !disableEdit ? "unset" : theme.palette.neuPalette.hexTwelve}
                          variant={isMobile ? "m-body-l" : "body-l"}>
                          {date?.[0] ? formatDateWithMON(date?.[0]) : "Check in"}
                        </DatesText>
                        <StyledDivider
                          sx={{
                            width: isMobile ? `${MobilePxToVw(30)} !important` : `${DesktopPxToVw(30)} !important`,
                          }}
                        />
                        <DatesText
                          onClick={() => {
                            setSelectedType("check_out")
                          }}
                          aria-label={"check_out"}
                          $color={date?.[0] && !disableEdit ? "unset" : theme.palette.neuPalette.hexTwelve}
                          variant={isMobile ? "m-body-l" : "body-l"}>
                          {date?.[1] ? formatDateWithMON(date?.[1]) : "Check out"}
                        </DatesText>
                      </CalendarTextStack>
                      {disableEdit && (
                        <Stack alignSelf={"end"} mb={isMobile ? MobilePxToVw(5) : DesktopPxToVw(5)}>
                          <CalenderIcon />
                        </Stack>
                      )}
                    </CalendarStack>
                  }
                />
              </CalendarBox>
            </Stack>
          </DatesStack>
        </ParentStack>
      </MainGrid>
    </Stack>
  )
}

export default observer(EditDateComponent)
