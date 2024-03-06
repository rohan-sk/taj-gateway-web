import React, { Fragment, useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { PathType } from "../../../types"
import { observer } from "mobx-react-lite"
import { Box, Stack, Typography } from "@mui/material"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import fetchRateFilter from "../../../../utils/fetchRateFilter"
import fetchHotelRoomData from "../../../../utils/fetchRoomData"
import { CustomCheckBox } from "../../../hoc/CustomCheckBox/Checkbox"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../../../features/booking/store/globalStore/booking.flow.store"
import { handler as fetchOrderDetails } from "../../../../features/booking/api/handlers/fetch-order-details.service"

//*Styles
import { TitleWrapper, SelectedRooms } from "./edit-rooms-styles"

//*Components
const BackButton = dynamic(() => import("../../back-button"))
const HotelRoomsDetails = dynamic(() => import("./hotel-room-details.component"))
const RenderActionItem = dynamic(() => import("../../../hoc/actions/action-items-ui"))
const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))

import constants from "./modify-constants.json"
import { useAesthetics } from "../../../../utils/fetchAsthetics"

interface RoomsInterface {
  title: string
  subtitle: string
  parameterMap: any
  primaryAction: {
    url: string
    urlType: any
    title: string
    variant: string
    checkBox: PathType | undefined
  }
  secondaryAction: {
    url: string
    urlType: any
    title: string
    variant: string
    checkBox: PathType | undefined
  }
  aesthetic: any
}

const HotelRoomsComponent = ({ title, subtitle, primaryAction, secondaryAction, aesthetic }: RoomsInterface) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES.bookingFlowStore) as BookingFlowGlobalStore

  const {
    loading,
    setHotelDetails,
    selectedRoomsDetails,
    setModifyCheckAvailability,
    updateStepperDetails,
    updateNewChangedRooms,
    setSelectedRoomsDetails,
    setInitialModifiedRooms,
  } = bookingFlowGlobalStore

  const [roomsData, setRoomsData] = useState<any>(null)
  const [selectedRooms, setSelectedRooms] = useState<boolean[]>([])
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const orderId = router?.query?.orderId
  const isAllRoomsSelected = selectedRooms?.every((box: any) => box)
  const editableRooms = roomsData?.rooms?.filter((room: any) => room?.status?.toLowerCase() === constants?.confirmed)

  useEffect(() => {
    const rooms = selectedRoomsDetails?.length > 0 ? selectedRoomsDetails : editableRooms
    const isSelectedRoom = rooms?.map((room: any, index: any) => {
      return {
        id: room?.roomNumber,
        numRooms: 1,
        room: "ROOM",
        isSelected: index === 0,
        modified: false,
        child: room?.modifyBooking?.children || room?.children,
        adults: room?.modifyBooking?.adult || room?.adult,
        hotelId: roomsData?.hotelId,
        startDate: room?.modifyBooking?.checkIn || room?.checkIn,
        endDate: room?.modifyBooking?.checkOut || room?.checkOut,
        rateCode:
          roomsData?.promoType === "offer" && (room?.modifyBooking?.rateCode || room?.rateCode)
            ? room?.modifyBooking?.rateCode || room?.rateCode
            : null,
        rateFilter: fetchRateFilter(),
        memberTier: global?.window?.localStorage?.getItem("userTier") || "Copper",
        isOfferLandingPage: false,
        package: "PKG",
        promoCode:
          roomsData?.promoType !== "COUPON" && roomsData?.promoCode && roomsData?.promoType !== "IATA"
            ? roomsData?.promoCode
            : null,
        promoType:
          roomsData?.promoType && roomsData?.promoType !== "IATA" && roomsData?.promoType !== "offer"
            ? roomsData?.promoType
            : null,
        couponCode: roomsData?.promoType === "COUPON" && roomsData?.promoCode ? roomsData?.promoCode : null,
        agentId: roomsData?.promoType === "IATA" ? roomsData?.promoCode : null,
        agentType: roomsData?.promoType === "IATA" ? roomsData?.promoType : null,
        isMyAccount: false,
        isCorporate: roomsData?.promoType?.toLowerCase() === "corporate",
        isLogin: Boolean(global?.localStorage?.getItem("accessToken")),
      }
    })
    updateStepperDetails({ data: isSelectedRoom })
    if (selectedRoomsDetails) {
      updateNewChangedRooms(
        selectedRoomsDetails?.map((item: any) => {
          const room = item?.modifyBooking || item
          return {
            isModified: false,
            isPackageCode: room?.isPackage,
            message: room?.message || "",
            cost: room?.price,
            adult: room?.adult,
            roomId: room?.roomId,
            roomName: room?.roomName,
            children: room?.children,
            packageCode: room?.packageCode,
            roomTypeCode: room?.roomType,
            isServiceable: false,
            checkIn: room?.checkIn,
            checkOut: room?.checkOut,
            rateCode: room?.rateCode,
            currency: room?.currency,
            roomNumber: room?.roomNumber,
            packageName: room?.packageName,
            roomImgUrl: room?.roomImgUrl,
          }
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoomsDetails, editableRooms?.length])

  //* handling the parent checkbox for room selection
  const handleSelect = () => {
    if (selectedRooms?.every((box: any) => box)) {
      setSelectedRoomsDetails([])
      setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
    } else {
      setSelectedRoomsDetails(editableRooms)
      setSelectedRooms(Array.from({ length: editableRooms?.length }, () => true))
    }
  }

  //* clears all selected constants
  const beforeChange = () => {
    setSelectedRoomsDetails([])
    setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
  }

  //*Getting the order details
  useEffect(() => {
    const res: any = fetchOrderDetails.apiCall(orderId)
    res?.then((data: any) => setRoomsData(data?.data?.orderLineItems?.[0]?.hotel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSelectedRooms(Array.from({ length: editableRooms?.length }, () => false))
  }, [editableRooms?.length])

  //* To get the hotel address details from CMS
  useEffect(() => {
    async function fetchHotelData() {
      let response = await fetchHotelRoomData(roomsData?.hotelId || "")
      setHotelDetails(
        response?.hotelBannerTitle?.desktopTitle?.join(","),
        response?.hotelAddress?.addressLine1,
        response?.hotelAddress?.pincode,
        response?.hotelAddress?.state,
      )
    }
    fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsData?.hotelId])

  //* Continue to Modify rooms
  const handleContinue = async (url: any) => {
    setInitialModifiedRooms()
    if (selectedRoomsDetails?.length > 0) {
      await setModifyCheckAvailability()
      await router?.push(`${url}?order_id=${orderId}&hotelId=${roomsData?.hotelId}`)
    }
  }

  //* goes back to previous page
  const handleBack = () => {
    beforeChange()
    window?.history?.back()
  }

  useEffect(() => {
    setSelectedRoomsDetails([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      aria-label="HotelRoomsComponent change rooms"
      p={
        isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop
      }>
      {loading && <LoadingSpinner />}
      <BackButton beforeChange={beforeChange} />
      <TitleWrapper>
        <Typography
          variant={isMobile ? "m-heading-s" : "heading-s"}
          mb={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
          {title}
        </Typography>
        <Typography
          variant={isMobile ? "m-body-sl" : "body-s"}
          mb={isMobile ? MobilePxToVw(35) : DesktopPxToVw(60)}
          sx={{
            width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(696),
            marginX: "auto",
          }}>
          {subtitle}
        </Typography>
      </TitleWrapper>
      <SelectedRooms>
        <Stack
          flexDirection={isMobile ? "column" : "row"}
          textAlign={"center"}
          rowGap={MobilePxToVw(20)}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Typography variant={isMobile ? "m-body-ml" : "body-ml"} sx={{ fontWeight: 700 }}>
            {constants?.selectRooms}
          </Typography>
          <Stack sx={{ alignItems: "center", flexDirection: "row" }} mb={isMobile ? MobilePxToVw(20) : ""}>
            <CustomCheckBox withBorder checked={isAllRoomsSelected} onChange={handleSelect} />
            <Typography minWidth={isMobile ? "unset" : DesktopPxToVw(128)} variant={isMobile ? "m-body-m" : "body-m"}>
              {isMobile ? constants?.selectAll : isAllRoomsSelected ? constants?.unSelectRooms : constants?.selectAll}
            </Typography>
          </Stack>
        </Stack>
        {editableRooms?.map((roomData: any, index: number) => (
          <Fragment key={index}>
            <HotelRoomsDetails
              index={index}
              roomDetails={roomData?.modifyBooking || roomData}
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              selectedRoomsData={selectedRoomsDetails}
              setSelectedRoomsData={setSelectedRoomsDetails}
            />
          </Fragment>
        ))}
      </SelectedRooms>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(60)}
        gap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
        <RenderActionItem
          isActionButtonType={true}
          url={"/"}
          title={secondaryAction?.title}
          variant={secondaryAction?.variant}
          navigationType={secondaryAction?.urlType}
          onClick={handleBack}
          buttonStyles={{
            minWidth: isMobile ? MobilePxToVw(130) : DesktopPxToVw(130),
          }}
        />
        <RenderActionItem
          isDisable={selectedRoomsDetails?.length > 0}
          isActionButtonType={true}
          url={"/"}
          title={primaryAction?.title}
          variant={primaryAction?.variant}
          navigationType={primaryAction?.urlType}
          onClick={() => handleContinue(primaryAction?.url)}
          buttonStyles={{
            minWidth: isMobile ? MobilePxToVw(179) : DesktopPxToVw(179),
          }}
        />
      </Stack>
    </Box>
  )
}

export default observer(HotelRoomsComponent)
