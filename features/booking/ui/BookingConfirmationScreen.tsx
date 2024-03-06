import React, { Fragment, useContext, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { ROUTES } from "../../../utils/routes"
import { fetchConfirmationPageHeadingDetails } from "../utils"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import BookingConfirmationPageStore from "../store/pageStore/booking.confirmation.store"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

const BookingConfirmationScreen = ({ cases }: any) => {
  const ihclContext = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore
  const { bookingConfirmationResponse, updateShowComponents } = pageContext?.getPageStore(
    PAGE_STORES.BOOKING_STORES.bookingConfirmationPageStore,
  ) as BookingConfirmationPageStore

  const { updateGuestDetails, setGuestBookingSchedule } = bookingFlowGlobalStore

  const [parentHeadingData, setParentHeadingData] = useState<any>(null)

  const isLoading = useMemo(() => {
    if (bookingConfirmationResponse?.booking_status || bookingConfirmationResponse?.data) return false
    else return true
  }, [bookingConfirmationResponse])

  const filteredHeadingData = useMemo(() => {
    if (bookingConfirmationResponse?.booking_status || bookingConfirmationResponse?.data) {
      const tempData = parentHeadingData?.find(
        (data: any) =>
          data?.paymentStatus?.toLowerCase() ===
          bookingConfirmationResponse?.paymentStatus?.split(" ")?.join("")?.toLowerCase(),
      )
      const filteredData = tempData?.items?.find(
        (data: any) =>
          data?.bookingStatus?.toLowerCase() ===
          bookingConfirmationResponse?.booking_status?.split(" ")?.join("")?.toLowerCase(),
      )
      return filteredData
    } else return {}
  }, [parentHeadingData, bookingConfirmationResponse])

  async function InvokeConfirmPageDetails() {
    const fetchedDataFromCMS = await fetchConfirmationPageHeadingDetails()
    setParentHeadingData(fetchedDataFromCMS)
  }

  useEffect(() => {
    filteredHeadingData &&
      updateShowComponents(
        filteredHeadingData?.showTryAgain,
        filteredHeadingData?.showRoomDetails,
        filteredHeadingData?.showGuestDetails,
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHeadingData])

  useEffect(() => {
    InvokeConfirmPageDetails()
  }, [])

  useEffect(() => {
    const roomData = bookingConfirmationResponse?.rooms?.map((room: any) => {
      return { id: room?.roomNumber, adults: room?.adults, child: room?.children, room: "ROOM", isSelected: false }
    })
    updateGuestDetails({
      data: roomData,
    })
    setGuestBookingSchedule(bookingConfirmationResponse?.check_in, bookingConfirmationResponse?.check_out)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingConfirmationResponse])

  return (
    <Box className={"bookingConfirmationPage"}>
      {isLoading ? (
        <LoadingSpinner componentLevel={true} />
      ) : (
        cases
          ?.find((singleCase: any) => {
            if (
              singleCase?.value?.toLowerCase() === "success" &&
              filteredHeadingData?.bookingStatus?.toLowerCase() === "failed"
            ) {
              return singleCase
            } else if (filteredHeadingData?.bookingStatus?.toLowerCase() !== "failed") {
              return singleCase
            }
          })
          ?.item?.map((item: any, index: number) => (
            <Fragment key={index}>
              {ihclContext?.renderComponent(item._type, {
                ...item,
                isConfirmationPage: true,
                logo: filteredHeadingData?.icon,
                title: filteredHeadingData?.title,
                description: filteredHeadingData?.description || "",
                contactDetails: bookingConfirmationResponse?.emailId, //? using to show in the description
                subTitle:
                  bookingConfirmationResponse?.country?.toLocaleUpperCase() === "INDIA"
                    ? filteredHeadingData?.subTitle?.india
                    : filteredHeadingData?.subTitle?.international,
                secondaryAction: filteredHeadingData?.showTryAgain
                  ? {
                      ...filteredHeadingData?.primaryAction,
                      url: `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?hotelId=${bookingConfirmationResponse?.hotelId}`, //? Using to reroute the plan your stay page
                    }
                  : {
                      ...filteredHeadingData?.secondaryAction,
                    },
              })}
            </Fragment>
          ))
      )}
    </Box>
  )
}

export default observer(BookingConfirmationScreen)
