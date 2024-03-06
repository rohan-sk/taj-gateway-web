import React, { Fragment, useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { PAGE_STORES } from "../../../utils/Constants"
import { Divider, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CONSTANTS, NO_PAST_ORDERS, NO_UPCOMING_ORDERS } from "../../constants"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import {
  BookingTitle,
  TabsContainer,
  StyledBookingTabs,
  BookingTabsWrapper,
  SortAndFilterContainer,
} from "./booking-details.styles"
import { DefaultText, FullBox, LoadMoreStack } from "./booking-styles"
import { StyledChevronDown } from "../../group/styles/group-with-facilities-styles"
import data from "./booking-json.json"

const Bookings = dynamic(() => import("./bookings.component"))
const SortAndFilter = dynamic(() => import("./sort-filter.component"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

interface bookingInterface {
  title: string
  primaryAction: {
    url: string
    urlType: string
    title: string
  }
  secondaryAction: {
    url: string
    urlType: string
    title: string
  }
}

const BookingDetails = (props: bookingInterface) => {
  const { title, primaryAction, secondaryAction } = props
  const loadableValue = 6
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)

  const { fetchUserBookingData, userBookingData, loading }: any = pageContext?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore,
  ) as AccountStore

  const [pageCount, setPageCount] = useState<number>(1)
  const [bookingData, setBookingData] = useState<any>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [pastBookings, setPastBookings] = useState<any>([])
  const [selectFilter, setSelectFilter] = useState<string>("")
  const [loadMoreBookings, setLoadMoreBookings] = useState(loadableValue)
  const [filteredBookingData, setFilteredBookingData] = useState<any>([])

  const isUpcomingBooking = activeIndex === 0

  useEffect(() => {
    fetchUserBookingData(pageCount)
    setPageCount(pageCount + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateWithNew = (oldArray: any[], newArray: any[]) => {
    const newValue = newArray?.filter((item: any) => !oldArray?.find((cItem: any) => cItem?.orderId === item?.orderId))
    return newValue
  }

  useEffect(() => {
    if (userBookingData) {
      const newUpComing = updateWithNew(bookingData, userBookingData?.hotelBookings?.upComingBookings)
      const newPast = updateWithNew(pastBookings, userBookingData?.hotelBookings?.pastBookings)
      if (newUpComing?.length > 0) {
        setBookingData(newUpComing)
      }
      if (newPast?.length > 0) {
        setPastBookings(newPast)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userBookingData])

  const handleBookingSort = () => {
    const reversedData = [...filteredBookingData]?.reverse()
    setFilteredBookingData(reversedData)
  }

  useEffect(() => {
    let tempBookings = isUpcomingBooking
      ? userBookingData?.hotelBookings?.upComingBookings
      : userBookingData?.hotelBookings?.pastBookings
    let filteredBookingsBasedOnSelection = tempBookings?.filter((booking: any) => {
      if (!selectFilter || selectFilter?.toLocaleLowerCase() == "all") {
        return booking
      } else if (selectFilter?.toLocaleLowerCase() == "room") {
        return booking?.orderType === "HOTEL_BOOKING"
      } else if (selectFilter?.toLocaleLowerCase() == "holiday") {
        return booking?.orderType === "HOLIDAYS"
      }
    })
    setFilteredBookingData(filteredBookingsBasedOnSelection)
  }, [selectFilter, isUpcomingBooking, userBookingData?.hotelBookings])

  useEffect(() => {
    setLoadMoreBookings(loadableValue)
  }, [selectFilter, isUpcomingBooking])

  return (
    <>
      {loading && <LoadingSpinner />}
      <Grid
        aria-label="BookingDetails"
        justifyContent={isMobile ? "center" : "end"}
        sx={{
          margin: isMobile ? "0vw 7.813vw 17.188vw" : `0}`,
        }}>
        <FullBox
          sx={{
            textAlign: isMobile ? "center" : "start",
            margin: isMobile ? "11.094vw 0  5.469vw" : "",
          }}>
          <BookingTitle variant={isMobile ? "m-heading-m" : "heading-m"}>{title}</BookingTitle>
        </FullBox>
        <BookingTabsWrapper>
          <TabsContainer>
            {data?.bookingHistoryType?.map((bookingType: any, index: number) => (
              <Fragment key={index}>
                <StyledBookingTabs
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  $index={activeIndex === index}
                  onClick={() => setActiveIndex(index)}>
                  {bookingType?.title}
                </StyledBookingTabs>
                {index === 0 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      backgroundColor: theme?.palette?.neuPalette?.hexTwelve,
                    }}
                  />
                )}
              </Fragment>
            ))}
          </TabsContainer>
          <SortAndFilterContainer>
            <SortAndFilter
              setSelectFilter={setSelectFilter}
              selectFilter={selectFilter}
              handleBookingSort={handleBookingSort}
            />
          </SortAndFilterContainer>
        </BookingTabsWrapper>
        {filteredBookingData?.length > 0 ? (
          <>
            {filteredBookingData
              ?.slice(0, loadMoreBookings)
              ?.map((item: any, index: number) => (
                <Bookings
                  key={index}
                  bookingData={item}
                  isPastBooking={!isUpcomingBooking}
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                />
              ))}
          </>
        ) : (
          <>
            {isUpcomingBooking ? (
              <FullBox sx={{ textAlign: "center" }}>
                <DefaultText variant={isMobile ? "m-heading-s" : "heading-s"}>{NO_UPCOMING_ORDERS}</DefaultText>
              </FullBox>
            ) : (
              <DefaultText variant={isMobile ? "m-heading-s" : "heading-s"}>{NO_PAST_ORDERS}</DefaultText>
            )}
          </>
        )}
        {filteredBookingData?.length > loadMoreBookings && (
          <LoadMoreStack
            onClick={() => {
              setLoadMoreBookings((prev: any) => prev + loadableValue)
            }}>
            <Typography variant={isMobile ? "m-link-m" : "link-m"}>{CONSTANTS?.LOAD_MORE}</Typography>
            <StyledChevronDown $more={true} />
          </LoadMoreStack>
        )}
      </Grid>
    </>
  )
}

export default observer(BookingDetails)
