import React, { useContext, useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { Box, Typography, Button } from "@mui/material"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import UserDetailsStore from "../store/globalStore/user-details.store"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
const CustomCheckBox = dynamic(() =>
  import("../../../components/hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { handler as fetchOrderDetails } from "../../booking/api/handlers/fetch-order-details.service"
import { triggerEvent } from "../../../utils/analytics"

import {
  MainBox,
  ContentStack,
  ButtonsStack,
  BottomDivider,
  ItemsCenterBox,
  AlignItemsCenterBox,
  WrapperCustomCheckBox,
} from "./styles/cancel-room-selection-template"

const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))
const RoomDetailsCard = dynamic(() => import("./booked-room-details.component"))
const BackButton = dynamic(() => import("../../../components/MyAccount/back-button"))
const CancelRoomRefundDetails = dynamic(() => import("./cancel-room-refund-details.component"))

import data from "./cancel-room-data.json"
import { GAStore, UserStore } from "../../../store"
import { getCookie } from "../../../utils/cookie"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { CHAMBERS_TIER, EPICURE_TIER, USER_TIRE, isUserLoggedIn } from "../../../utils/analytics/constants"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import { fetchConfirmRoomData } from "../../../utils/fetchRoomData"
import useStorage from "../../../utils/useStorage"
import BookingsFlowStore from "../../booking/store/pageStore/booking.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"

const RoomSelectionTemplate = (props: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const navigate: any = useAppNavigation()
  const orderId = router?.query?.orderId
  const context: any = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)
  const pageContext = useContext(PageContext)
  const { loading, fetchCancelOrder, setLoading } = context?.getGlobalStore(
    GLOBAL_STORES?.userDetailsStore,
  ) as UserDetailsStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const BookingFlowPageStore = pageContext?.getPageStore(PAGE_STORES?.bookingFlowStore) as BookingsFlowStore
  const [TCCheck, setTcCheck] = useState<boolean>(false)
  const [roomDetails, setRoomDetails] = useState<any>(null)

  const [selectedRooms, setSelectedRooms] = useState<any>([])
  const [bookingDetails, setBookingDetails] = useState<any>([])
  const [cancellationReason, setCancellationReason] = useState<string>("")
  const [cancelReason, setCancelReason] = useState<string>("")
  const [cancellationRequested, setCancellationRequested] = useState<boolean>(false)
  const [cancellationDetails, setCancellationDetails] = useState<any>({})

  const isAllRoomsSelected = selectedRooms?.every((box: any) => box)
  const isRoomSelectedForCancellation: any = selectedRooms?.some((room: any) => room === true)
  const isReasonEntered = cancellationReason === "other" ? cancelReason : cancellationReason
  const isReasonSelected =
    TCCheck && cancellationReason?.length > 0 && isRoomSelectedForCancellation && isReasonEntered?.length > 0
  const authorizationToken: any = global?.window?.localStorage?.getItem("accessToken")
  const address = UseAddress(userStore)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer: any = MemberDataLayer(userStore, gaStoreData)
  const hotelDataLayer = HotelDataLayer()

  const { getItem } = useStorage()
  const handleSelect = () => {
    if (selectedRooms?.every((box: any) => box)) {
      setSelectedRooms(Array.from({ length: roomDetails?.rooms?.length }, () => false))
    } else {
      setSelectedRooms(Array.from({ length: roomDetails?.rooms?.length }, () => true))
    }
  }

  const handleCancelOrder = async (cancelType: string) => {
    const selectedRoomFilter = selectedRooms?.map((item: any, index: number) => {
      if (item) {
        return {
          roomNumber: roomDetails?.rooms?.[index]?.roomNumber,
        }
      } else {
        return null
      }
    })
    const selectedRoomNumbers = selectedRoomFilter?.filter(function (value: any) {
      return value !== null
    })

    await fetchCancelOrder(
      {
        orderId: orderId,
        room: selectedRoomNumbers,
        hotelId: roomDetails?.hotelId,
        isFullCancellation: isAllRoomsSelected,
        cancelType: cancelType,
        cancelReason: cancellationReason === "other" ? cancelReason : cancellationReason,
      },
      authorizationToken,
    )
      .then(async (res) => {
        let response = await fetchConfirmRoomData(res?.data?.hotelId)
        setCancellationRequested(true)
        setCancellationDetails(res?.data)
        if (cancelType === "C") {
            fetchOrderDetail()
        }
        let adultCount: number = 0
        let childCount: number = 0
        cancellationDetails?.rooms?.map((room: any) => {
          if (room?.adults) {
            adultCount = adultCount + room?.adults
          }
          if (room?.children) {
            childCount = childCount + room?.children
          }
        })
        let checkInDate = new Date(cancellationDetails?.check_in)
        let checkOutDate = new Date(cancellationDetails?.check_out)
        if (cancellationDetails && cancellationDetails?.rooms?.length > 0) {
          const dateString = res?.data?.createdTimestamp
          const dateObject = new Date(dateString)
          const epochTimeCreated = dateObject?.getTime() / 1000
          if (isAllRoomsSelected) {
            await triggerEvent({
              action: "refund",
              params: {
                ...dataLayer,
                ...hotelDataLayer,
                noOfRooms: cancellationDetails?.rooms?.length,
                noOfAdults: adultCount,
                noOfChild: childCount,
                totalNoOfGuests: adultCount + childCount,
                location: "",
                clientId: getCookie("_ga")?.slice(6),
                eventType: "",
                eventName: "",
                eventPlace: "",
                eventTicketsQty: "",
                eventDate: "",
                userPinCode: address?.pinCode ? address?.pinCode : "",
                userState: address?.state ? address?.state : "",
                userCity: address?.cityTown ? address?.cityTown : "",
                visitSource: "",
                datesToBook: "",
                arrivalDate: cancellationDetails?.check_in,
                departureDate: cancellationDetails?.check_out,
                brandName: response?.brandName || "",
                giftCardCategory: "",
                giftCardType: "",
                giftCardValue: "",
                giftCardQuantity: "",
                offerName: "",
                offerCode: "",
                offerID: "",
                offerCategory: "",
                offerValidity: "",
                redemptionType: "",
                redemptionName: "",
                redemptionDescription: "",
                pointsType: "",
                pointstobeRedeemed: "",
                bookingPaymentType: "",
                bookingType: cancellationDetails?.transactionType,
                buttonLinkName: cancellationRequested ? props?.primaryAction?.title : data?.CONTINUE,
                link_url: props?.primaryAction?.url,
                link_text: cancellationRequested ? props?.primaryAction?.title : data?.CONTINUE,
                outbound: props?.primaryAction?.urlType == "internal" ? false : true,
                paymentType: "",
                hotelBrand: response?.brandName,
                hotelCity: response?.hotelAddress?.city,
                hotelCode: response?.synxisHotelId,
                hotelCountry: response?.hotelAddress?.country,
                hotelName: response?.hotelAddress?.title?.split(",")?.[0],
                hotelPinCode: response?.hotelAddress?.pincode,
                hotelState: response?.hotelAddress?.state,
                hotelType: response?.hotelType,
                ecommerce: {
                  transaction_id: `${res?.data?.itinerary_number}-${epochTimeCreated}`,
                },
              },
            })
          } else {
            await triggerEvent({
              action: "refund",
              params: {
                ...dataLayer,
                ...hotelDataLayer,
                noOfRooms: cancellationDetails?.rooms?.length,
                noOfAdults: adultCount,
                noOfChild: childCount,
                totalNoOfGuests: adultCount + childCount,
                location: "",
                clientId: getCookie("_ga")?.slice(6),
                eventType: "",
                eventName: "",
                eventPlace: "",
                eventTicketsQty: "",
                eventDate: "",
                userPinCode: address?.pinCode ? address?.pinCode : "",
                userState: address?.state ? address?.state : "",
                userCity: address?.cityTown ? address?.cityTown : "",
                visitSource: "",
                datesToBook: "",
                arrivalDate: cancellationDetails?.check_in,
                departureDate: cancellationDetails?.check_out,
                brandName: response?.brandName || "",
                giftCardCategory: "",
                giftCardType: "",
                giftCardValue: "",
                giftCardQuantity: "",
                offerName: "",
                offerCode: "",
                offerID: "",
                offerCategory: "",
                offerValidity: "",
                redemptionType: "",
                redemptionName: "",
                redemptionDescription: "",
                pointsType: "",
                pointstobeRedeemed: "",
                bookingPaymentType: "",
                bookingType: cancellationDetails?.transactionType,
                buttonLinkName: cancellationRequested ? props?.primaryAction?.title : data?.CONTINUE,
                link_url: props?.primaryAction?.url,
                link_text: cancellationRequested ? props?.primaryAction?.title : data?.CONTINUE,
                outbound: props?.primaryAction?.urlType == "internal" ? false : true,
                paymentType: "",
                hotelBrand: response?.brandName,
                hotelCity: response?.hotelAddress?.city,
                hotelCode: response?.synxisHotelId,
                hotelCountry: response?.hotelAddress?.country,
                hotelName: response?.hotelAddress?.title?.split(",")?.[0],
                hotelPinCode: response?.hotelAddress?.pincode,
                hotelState: response?.hotelAddress?.state,
                hotelType: response?.hotelType,
                ecommerce: {
                  transaction_id: `${cancellationDetails?.itinerary_number}-${epochTimeCreated}`,
                  items: cancellationDetails?.rooms?.map((room: any, index: number) => {
                    return {
                      item_id: `${response?.synxisHotelId}_${room?.room_name}_${room?.packageName}`,
                      item_name: room?.room_name || "",
                      affiliation: response?.brandName || "",
                      index: index,
                      item_brand: cancellationDetails?.hotelName || "",
                      item_category: room?.[index]?.isPackageCode === true ? "Package" : "Room",
                      item_category2: room?.packageName || "",
                      item_category3:
                        BookingFlowPageStore?.selectedRoomPrice?.[index] ||
                        global?.window?.localStorage?.getItem("roomType"),
                      item_category4: isUserLoggedIn
                        ? `${
                            getItem("chambersMemberTier") ||
                            CHAMBERS_TIER ||
                            getItem("epicureMemberTier") ||
                            EPICURE_TIER ||
                            "Neupass"
                          } - ${getItem("userTier") || USER_TIRE}`
                        : "",
                      item_category5: response?.hotelAddress?.city,
                      price: Number(room?.packageData.package_amount) || "",
                      quantity: "1",
                      room_nights: Math.ceil((checkOutDate?.getTime() - checkInDate?.getTime()) / 86400000) || "",
                    }
                  }),
                },
              },
            })
          }
        }
      })
      .catch(() => {
        setCancellationRequested(false)
        setCancellationDetails({})
      })
    if (cancellationRequested) {
      //**Invoking the cancel success or failure modal based on cancel order API response
      await navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)
    }
  }

  const fetchOrderDetail = () => {
    if (orderId) {
      const res: any = fetchOrderDetails.apiCall(orderId)
      setLoading(true)
      res
        ?.then((data: any) => {
          const nonCancelledRooms = data?.data?.orderLineItems?.[0]?.hotel?.rooms?.filter(
            (item: any) => item?.status?.toLowerCase() !== "cancelled",
          )
          setRoomDetails({
            ...data?.data?.orderLineItems?.[0]?.hotel,
            rooms: nonCancelledRooms,
          })
          setBookingDetails({
            ...data?.data,
          })
        })
        .catch((err: any) => console.error(err))
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    orderId && fetchOrderDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  useMemo(() => {
    setSelectedRooms(Array.from({ length: roomDetails?.rooms?.length }, () => false))
  }, [roomDetails?.rooms?.length])

  return (
    <>
      {loading && <LoadingSpinner />}
      {roomDetails?.rooms?.length > 0 ? (
        <Box
          aria-label="RoomSelectionTemplate"
          sx={{
            padding: isMobile
              ? cardPadding?.mobile || props?.aesthetic?.padding?.mobile
              : cardPadding?.desktop || props?.aesthetic?.padding?.desktop,
          }}>
          <BackButton />
          <ContentStack>
            <Typography
              variant={isMobile ? "m-heading-s" : "heading-s"}
              sx={{ marginBottom: isMobile ? "1.7vw" : "1vw" }}>
              {props?.title}
            </Typography>
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>{props?.subtitle}</Typography>
          </ContentStack>
          <MainBox>
            <AlignItemsCenterBox sx={{ justifyContent: "space-between" }}>
              <Typography variant={isMobile ? "m-body-m" : "body-ml"} fontWeight={"bold"}>
                {data?.selectRooms}
              </Typography>
              <ItemsCenterBox>
                <CustomCheckBox
                  withBorder
                  checked={isAllRoomsSelected}
                  onChange={handleSelect}
                  isCheckBoxDisabled={cancellationRequested}
                />
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                  {isAllRoomsSelected ? "Unselect All" : "Select All"}
                </Typography>
              </ItemsCenterBox>
            </AlignItemsCenterBox>
            <RoomDetailsCard
              isComplementary={roomDetails?.voucherRedemption?.isComplementary}
              complementaryBasePrice={roomDetails?.complementaryBasePrice}
              roomDetails={roomDetails}
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              bookingDetails={bookingDetails}
              cancellationReason={cancellationReason}
              cancellationDetails={cancellationDetails}
              cancellationRequested={cancellationRequested}
            />
            {!isMobile && cancellationRequested && <BottomDivider />}
            {!isMobile && cancellationRequested && (
              <CancelRoomRefundDetails
                props={data}
                cancellationReason={cancellationReason}
                setCancellationReason={setCancellationReason}
                selectedRooms={selectedRooms}
                roomDetails={roomDetails}
                bookingDetails={bookingDetails}
                setCancelReason={setCancelReason}
                cancelReason={cancelReason}
                cancellationDetails={cancellationDetails}
              />
            )}
          </MainBox>
          {isMobile && cancellationRequested && (
            <CancelRoomRefundDetails
              props={data}
              cancellationReason={cancellationReason}
              setCancellationReason={setCancellationReason}
              selectedRooms={selectedRooms}
              roomDetails={roomDetails}
              bookingDetails={bookingDetails}
              setCancelReason={setCancelReason}
              cancelReason={cancelReason}
              cancellationDetails={cancellationDetails}
            />
          )}
          <WrapperCustomCheckBox $isMobile={isMobile} $isChecked={TCCheck}>
            <CustomCheckBox
              withBorder
              checked={TCCheck}
              onChange={() => {
                setTcCheck(!TCCheck)
              }}
            />
            {props?.singleContent && <PortableText blocks={props?.singleContent?.[0]} />}
          </WrapperCustomCheckBox>
          <ButtonsStack>
            {props?.primaryAction && (
              <Button
                onClick={() => {
                  handleCancelOrder(cancellationRequested ? "C" : "R")
                }}
                disabled={cancellationRequested ? !isReasonSelected : !isRoomSelectedForCancellation || !TCCheck}
                variant={props?.primaryAction?.variant}>
                {cancellationRequested ? props?.primaryAction?.title : data?.CONTINUE}
              </Button>
            )}
            {props?.secondaryAction && (
              <RenderActionItem
                isActionButtonType={true}
                url={props?.secondaryAction?.url}
                title={props?.secondaryAction?.title}
                onClick={() => window?.history?.back()}
                variant={props?.secondaryAction?.variant}
                navigationType={props?.secondaryAction?.urlType}
                buttonStyles={{
                  letterSpacing: "0.1em",
                }}
              />
            )}
          </ButtonsStack>
        </Box>
      ) : (
        <>
          {loading ? (
            <Box height={"100vh"}>{/* hides footer while loading */}</Box>
          ) : (
            <Box sx={{ padding: "4vw 2vw" }}>
              <Typography variant="heading-l" textAlign="center">
                {data?.NO_ROOMS_AVAILABLE}
              </Typography>
              <Box height={"100vh"}></Box>
            </Box>
          )}
        </>
      )}
    </>
  )
}

export default observer(RoomSelectionTemplate)
