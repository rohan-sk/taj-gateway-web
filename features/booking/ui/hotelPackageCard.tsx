import React, { useContext, useEffect, useState } from "react"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import PackageOffersCard from "./package-offers-card"
import { CONSTANTS } from "../../../components/constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import {
  FlexBox,
  TitleBox,
  ImageBox,
  ImgTitleBox,
  ImageMainBox,
  ContainerBox,
  ColumnListBox,
  FacilitiesStack,
  GalleryButtonBox,
  HighlightPointStack,
  LoadMoreLessMainBox,
  LoadMoreLessInnerBox,
  RateDetailsTypography,
  StarImage,
} from "../../../components/BookingFlow/styles/details-card"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { GAStore, UserStore } from "../../../store"
import { ErrorIcon } from "../../../utils/customIcons"
import ModalStore from "../../../store/global/modal.store"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { HotelDataLayer } from "../../../utils/analytics/hotel-data-layer"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import { getLowInventoryLabel } from "../../../utils/booking/getLowInventoryLabel"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import handleViewItem from "../../../utils/analytics/events/Ecommerce/Booking-Journey/view_item"

const HotelPackageCard = ({
  parentItem,
  primaryAction,
  secondaryAction,
  showWithTaxes,
  isPackagesTab,
  isChangeRooms,
  parameterMap,
  isPromotionsTab,
  isOffersTab,
  activeTab,
  activeKey,
  guestCount,
  currencyCode,
  isMemberDealsTab,
}: any) => {
  const numberOne = CONSTANTS?.ONE
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const hotelDataLayer = HotelDataLayer()
  const modalStore = ModalStore?.getInstance()
  const context: any = useContext(IHCLContext)

  let cardsLength = parentItem?.rooms?.length

  const [viewMore, setViewMore] = useState<number>(CONSTANTS?.TWO)

  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const address = UseAddress(userStore)
  const dataLayer = MemberDataLayer(userStore, gaStoreData)

  const galleryImage = primaryAction?.image?.asset?._ref

  const handleLoadMore = () => {
    viewMore < cardsLength ? setViewMore(viewMore + numberOne) : setViewMore(CONSTANTS?.TWO)
  }

  useEffect(() => {
    setViewMore(CONSTANTS?.TWO)
  }, [activeTab])

  const handleGalleryPopup = () => {
    modalStore?.setPropertyData(parentItem?.basicInfo?.media)
    navigate(primaryAction?.url, primaryAction?.urlType)
  }

  let loopingData = isPackagesTab
    ? parentItem
    : isPromotionsTab
    ? parentItem
    : isOffersTab
    ? parentItem?.offers
    : isMemberDealsTab
    ? parentItem
    : parentItem?.rooms

  return (
    <Box aria-label="hotel-card">
      <ContainerBox>
        <ColumnListBox>
          <ImgTitleBox>
            <Box sx={{ flexDirection: "row" }}>
              <Box
                sx={{
                  marginRight: isMobile ? "0vw" : "1.98vw",
                  pointerEvents: isMobile ? "none" : "",
                }}>
                <ImageMainBox onClick={handleGalleryPopup}>
                  <Box
                    width={"100%"}
                    height={"100%"}
                    loading="lazy"
                    component="img"
                    src={
                      parentItem?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
                        ? urlFor(parentItem?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref).url()
                        : `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/74e7a6cce64b4ef5f4f236507fcad9993d48bd4d-700x560.png`
                    }
                  />
                  {galleryImage && (
                    <GalleryButtonBox>
                      <Box
                        width={"100%"}
                        height={"100%"}
                        loading="lazy"
                        component="img"
                        sx={{ objectFit: "contain" }}
                        src={urlFor(galleryImage)?.url()}
                      />
                    </GalleryButtonBox>
                  )}
                </ImageMainBox>
              </Box>
              {!isMobile && (
                <Stack>
                  {parentItem?.roomModalDetails?.specifications?.length > 0 && (
                    <Grid container marginTop={DesktopPxToVw(4)} rowSpacing={DesktopPxToVw(16)}>
                      {parentItem?.roomModalDetails?.specifications?.map((item: any, index: number) => (
                        <Grid item xs={6} key={index}>
                          <HighlightPointStack>
                            {item?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                              <Box
                                loading="lazy"
                                component="img"
                                src={urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()}
                                sx={{ width: "0.938vw", height: "0.938vw" }}
                              />
                            )}
                            <Typography variant="body-xs">{item?.value}</Typography>
                          </HighlightPointStack>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {parentItem?.roomModalDetails && (
                    <RateDetailsTypography
                      sx={{ mt: DesktopPxToVw(15) }}
                      variant="body-xxs"
                      onClick={() => {
                        modalStore?.setPropertyData({
                          title: parentItem?.basicInfo?.title,
                          description: parentItem?.basicInfo?.description,
                          itemData: parentItem?.roomModalDetails,
                        })
                        navigate(secondaryAction?.url, secondaryAction?.urlType)
                        handleViewItem(
                          "view_item",
                          parentItem,
                          bookingFlowGlobalStore,
                          activeTab,
                          hotelDataLayer,
                          dataLayer,
                          isPackagesTab,
                          isMemberDealsTab,
                          isOffersTab,
                          isPromotionsTab,
                          isLoggedIn,
                          secondaryAction,
                          address,
                          guestCount,
                          loopingData,
                        )
                      }}>
                      {secondaryAction?.title}
                    </RateDetailsTypography>
                  )}
                </Stack>
              )}
            </Box>
            <ColumnListBox>
              <TitleBox>
                {parentItem?.basicInfo?.title && (
                  <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"} sx={{ paddingBottom: "0.625vw" }}>
                    {parentItem?.basicInfo?.title}
                  </Typography>
                )}
                {isMobile &&
                  //? displaying the low inventory warning
                  loopingData?.[0]?.availableInventory < 6 && (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: MobilePxToVw(5),
                      }}>
                      <ErrorIcon
                        sx={{
                          height: MobilePxToVw(14),
                          width: MobilePxToVw(15),
                        }}
                      />
                      <Typography variant="m-body-xs" color={theme.palette.ihclPalette.hexThirtyOne}>
                        {getLowInventoryLabel(loopingData?.[0]?.availableInventory)}
                      </Typography>
                    </Stack>
                  )}
              </TitleBox>
              <>
                <PackageOffersCard
                  currentHotelName={parentItem?.basicInfo?.title}
                  viewMore={viewMore}
                  data={parentItem}
                  showWithTaxes={showWithTaxes}
                  isPackagesTab={isPackagesTab}
                  isChangeRooms={isChangeRooms}
                  isPromotionsTab={isPromotionsTab}
                  isOffersTab={isOffersTab}
                  isMemberDealsTab={isMemberDealsTab}
                  parameterMap={parameterMap}
                  activeTab={activeTab}
                  activeKey={activeKey}
                  guestCount={guestCount}
                  currencyCode={currencyCode}
                  handleGalleryPopup={handleGalleryPopup}
                />
              </>
            </ColumnListBox>
          </ImgTitleBox>
          {cardsLength > CONSTANTS?.TWO && (
            <LoadMoreLessMainBox>
              <LoadMoreLessInnerBox onClick={() => handleLoadMore()}>
                <Typography variant="link-m" sx={{ fontSize: isMobile ? "2.1875vw" : "0.73vw" }}>
                  {viewMore < cardsLength ? CONSTANTS?.VIEW_MORE_RATES : CONSTANTS?.VIEW_LESS_RATES}
                </Typography>
                {viewMore < cardsLength ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
              </LoadMoreLessInnerBox>
            </LoadMoreLessMainBox>
          )}
        </ColumnListBox>
      </ContainerBox>
    </Box>
  )
}

export default HotelPackageCard
