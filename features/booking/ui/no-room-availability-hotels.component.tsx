import React, { Fragment, useContext, useEffect, useState } from "react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { getClient, urlFor } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, Button, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  MainStack,
  TitleStack,
  StyledDivider,
  HotelCardStack,
  DescriptionTypography,
  ShadeBox,
  ScrollBox,
  ContentStack,
} from "./styles/no-rooms-availability"
import { CONSTANTS, externalNavigation } from "../../../components/constants"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { UserStore } from "../../../store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { getListWithBrandSorting } from "../../../utils/getListWithBrandSorting"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { dateFormatConverter } from "../../../utils/getDate"

const NoRoomsAvailabilityData = ({
  cityName,
  currentHotelId,
  handleModalClose,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const isLogin = useLoggedIn()
  const navigate = useAppNavigation()
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const bookingFlowGlobalStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore
  const [hotelData, setHotelData] = useState<any>([])

  const fetchOtherHotelsInTheCity = async () => {
    const query = groq`*[_type == "hotel" && hotelAddress->city != NULL  && hotelAddress->city =="${cityName}" ] | order(coalesce(score, -1) desc) {hotelId,score,hotelName,identifier,brandName,hotelAddress->,"image":hotelOverview->{basicInfo},"synxisHotelId":searchTaxonomies->.synxisHotelId}`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        setHotelData(
          data?.filter((item: any) => item?.hotelId !== currentHotelId)
        )
      })
  }
  const handleViewHotel = async (hotel: any) => {
    const { endDate, startDate, promoCode, rateCode, agentId, couponCode } =
      bookingFlowGlobalStore?.checkAvailabilityPayload || {}
    if (hotel?.brandName?.toLowerCase() !== "taj") {
      const url = getNonTajBrandCrossURL(
        hotel?.brandName || "",
        hotel?.identifier || "",
        dateFormatConverter(endDate),
        dateFormatConverter(startDate),
        bookingFlowGlobalStore?.guestDetails?.data,
        "",
        promoCode,
        rateCode,
        agentId,
        couponCode,
        hotel?.synxisHotelId
      )
      await CrossSiteNavigation({
        url: url,
        loggedIn: isLogin,
        userStore,
      })
    } else {
      await router.replace({
        pathname: router?.pathname,
        query: { ...router?.query, hotelId: hotel?.hotelId },
      })
      handleModalClose()
    }
  }

  useEffect(() => {
    fetchOtherHotelsInTheCity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHotelId])

  const getFullAddress = (data: any) => {
    const address = [
      data?.addressLine1?.trim(),
      data?.addressLine2?.trim(),
      data?.city?.trim(),
      data?.state?.trim(),
    ]
      ?.filter((item: any) => item)
      ?.join(", ")
    return `${address} ${
      data?.pincode ? `- ${data?.pincode?.toString()?.trim()},` : ""
    } ${data?.country?.trim()}`
  }

  return (
    <MainStack>
      <Stack>
        <TitleStack>
          <Typography
            variant={
              isMobile ? "m-heading-s" : "heading-s"
            }>{`${CONSTANTS?.HOTELS_IN} ${cityName}`}</Typography>
          <DescriptionTypography variant={isMobile ? "m-body-sl" : "body-ml"}>
            {CONSTANTS?.OTHER_HOTELS_DESCRIPTION}
          </DescriptionTypography>
        </TitleStack>
        <ScrollBox>
          {hotelData?.length > 0 &&
            getListWithBrandSorting(hotelData)?.map(
              (hotel: any, index: number) => (
                <Fragment key={index}>
                  <HotelCardStack>
                    <Box
                      component={"img"}
                      alt={"hotel-img"}
                      width={isMobile ? MobilePxToVw(181) : DesktopPxToVw(262)}
                      height={isMobile ? MobilePxToVw(160) : DesktopPxToVw(160)}
                      src={
                        hotel?.image?.basicInfo?.media?.[0]?.imageAsset
                          ?.largeImage?.[0]?.asset?._ref &&
                        urlFor(
                          hotel?.image?.basicInfo?.media?.[0]?.imageAsset
                            ?.largeImage?.[0]?.asset?._ref
                        ).url()
                      }
                      sx={{ flex: 1 }}
                    />
                    <ContentStack>
                      <Stack>
                        <Typography
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          marginBottom={
                            isMobile ? MobilePxToVw(4) : DesktopPxToVw(10)
                          }>
                          {hotel?.hotelName}
                        </Typography>
                        <Typography variant={isMobile ? "m-body-xs" : "body-s"}>
                          {getFullAddress(hotel?.hotelAddress)}
                        </Typography>
                      </Stack>
                      <Button
                        variant="light-contained"
                        sx={{
                          width: isMobile
                            ? MobilePxToVw(201)
                            : DesktopPxToVw(201),
                        }}
                        onClick={() => handleViewHotel(hotel)}>
                        {CONSTANTS?.VIEW_HOTEL}
                      </Button>
                    </ContentStack>
                  </HotelCardStack>
                  <StyledDivider
                    customMargin={
                      !isMobile &&
                      hotelData?.length > 2 &&
                      index === hotelData?.length - 1
                        ? `${DesktopPxToVw(20)} auto ${DesktopPxToVw(70)}`
                        : ""
                    }
                  />
                </Fragment>
              )
            )}
        </ScrollBox>
      </Stack>
      {/* Box for Bottom Shade */}
      <ShadeBox />
    </MainStack>
  )
}

export default NoRoomsAvailabilityData
