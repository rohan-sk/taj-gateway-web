import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { CONSTANTS } from "../../../../components/constants"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import MultiRowTitle from "../../../../components/hoc/title/multi-row-title"
import BookingFlowGlobalStore from "../../../booking/store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  LoadMoreActionBox,
  StyledExpandMoreIcon,
  StyledExpandMoreButton,
} from "../../../../components/group/styles/common-styled-components"
import { NoResultsFoundBox } from "../../../../components/modal/styles/global-search"
import {
  NoResultContainer,
  NoResultTypography,
} from "../../../../components/card/SearchResultCards/styles/search-card"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import SearchCardComponent from "../../../destination/ui/searchComponent/search-card-component"
import { OffersStore } from "../../../../store"
import DestinationOffersCityCardCarousel from "../offer-destination-city-carousel"
import { theme } from "../../../../lib/theme"

const OffersDestinationsGroup = ({
  aesthetic,
  title,
  cardActionType,
  heading,
}: any) => {
  const ihclContext = useContext(IHCLContext)
  const offerStore: any = ihclContext?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore
  const bookingFlowGlobalStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore
  const { destinationAvailability, setGlobalSearchedData } =
    bookingFlowGlobalStore
  const [countToShowCards, setCountToShowCards] = useState(5)
  const [activeSlide, setActiveSlide] = useState(0)
  const [hotelsData, setHotelsData] = useState<any>([])

  const isMobile = useMobileCheck()

  useEffect(() => {
    setHotelsData(
      offerStore?.offersData?.participatingDestinations?.[activeSlide]
        ?.participatingHotels
    )
  }, [offerStore?.offersData?.participatingDestinations, activeSlide])

  const getHotelData = (id: any) => {
    const priceData =
      destinationAvailability?.availabilityResponse?.data?.getHotelLeadAvailability?.leadAvailability?.filter(
        (lead: any) => lead?.hotel?.hudiniId == id
      )?.[0]?.price
    return priceData?.filter((item: any) => item?.type == "Minimum")?.[0]
  }

  return (
    <>
      {offerStore?.offersData?.offerType === "4d_offer" && (
        <Box>
          <Box>
            <MultiRowTitle
              title={{
                ...title,
                headingElement: title?.headingElement,
              }}
              charactersLimit={160}
              aesthetic={aesthetic}
              subTitle={heading}
              alignmentVariant={"center"}
              isComponentFullWidth={true}
              isMobileComponentFullWidth={true}
            />
          </Box>
          <Box sx={{ padding: "0 0 3.12vw 0" }}>
            <DestinationOffersCityCardCarousel
              items={offerStore?.offersData?.participatingDestinations}
              setActiveSlide={setActiveSlide}
              activeSlide={activeSlide}
            />
          </Box>
          <Box sx={{ padding: isMobile ? "0 8.215vw 2vw" : "0vw 12.5vw" }}>
            <Typography
              sx={{
                color: `${theme?.palette?.neuPalette?.hexSeventeen}`,
                textAlign: "center",
                padding: "0 0 2.12vw 0",
              }}
              component={"h3"}
              variant={isMobile ? "m-heading-s" : "heading-s"}>
              Getaways from{" "}
              {
                offerStore?.offersData?.participatingDestinations?.[activeSlide]
                  ?.name
              }
            </Typography>
            {hotelsData?.length > 0 ? (
              getListWithBrandSorting(hotelsData)
                ?.slice(0, countToShowCards)
                .map((item: any, index: number) => {
                  return (
                    <SearchCardComponent
                      dynamicHotelData={getHotelData(item?.hotelId)}
                      setGlobalSearchedData={setGlobalSearchedData}
                      key={index}
                      cardActionType={cardActionType}
                      {...item}
                    />
                  )
                })
            ) : (
              <NoResultContainer>
                <NoResultsFoundBox
                  sx={{
                    minHeight: isMobile
                      ? MobilePxToVw(800)
                      : DesktopPxToVw(420),
                  }}>
                  <NoResultTypography
                    variant={isMobile ? "m-body-l" : "body-ml"}
                    sx={{ textAlign: "center", margin: "auto" }}>
                    {CONSTANTS?.SEARCH_RESULTS_NOT_FOUND}
                  </NoResultTypography>
                </NoResultsFoundBox>
              </NoResultContainer>
            )}
            {hotelsData?.length > 0 && (
              <LoadMoreActionBox
                sx={{
                  justifyContent: "center",
                  paddingBottom: isMobile ? "14.063vw" : "5.729vw",
                }}>
                {countToShowCards < hotelsData?.length &&
                  hotelsData?.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: DesktopPxToVw(34),
                      }}
                      onClick={() => {
                        setCountToShowCards(countToShowCards + CONSTANTS?.FIVE)
                      }}>
                      {isMobile ? (
                        <>
                          <StyledExpandMoreButton
                            variant="light-outlined"
                            endIcon={
                              <StyledExpandMoreIcon
                                sx={{ height: "3.875vw" }}
                              />
                            }>
                            {CONSTANTS?.LOAD_MORE}
                          </StyledExpandMoreButton>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant={isMobile ? "m-text-link" : "link-m"}>
                            {CONSTANTS?.LOAD_MORE}
                          </Typography>
                          <StyledExpandMoreIcon />
                        </>
                      )}
                    </Box>
                  )}
              </LoadMoreActionBox>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default observer(OffersDestinationsGroup)
