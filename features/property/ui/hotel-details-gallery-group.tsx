import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import dynamic from "next/dynamic"
import { urlFor } from "../../../lib-sanity"
import React, { useEffect, useState } from "react"
import { CONSTANTS } from "../../../components/constants"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
const BasicModal = dynamic(() => import("../../../components/hoc/modal/modal"))
import { Box, Button, Grid, Typography } from "@mui/material"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const VideoPlayerModal = dynamic(() => import("../../../components/modal/video-player-modal.component"))
import { PropItemsMsiteModalData } from "../../../components/hoc/CommonMsiteModalAlignment/PropItemsMsiteModalData"
import { ButtonsBox, CardsBox, StyledButton } from "../../../components/group/styles/group-with-filter-cards"
import {
  LoadMoreWrapper,
  StyledExpandMoreIcon,
  GalleryButtonWrapper,
  LoadMoreGridContainer,
  LoadMoreButtonContainer,
  StyledGalleryExpandMoreIcon,
  MobileGalleryButtonContainer,
} from "./styles/hotel-details-gallery-group-styles"
import VideoSEOScript from "../../../utils/VideoSEOScript"
const CardTitleOnHoverComponent = dynamic(()=> import("../../../components/card/card-title-on-hover.component"))

const HotelDetailsGalleryGroup = ({ componentItemData, primaryAction, contentType }: any) => {
  const modalStore = ModalStore.getInstance()
  const [videoPlay, setVideoPlay] = useState<boolean>(false)
  const navigate = useAppNavigation()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isMobile = useMobileCheck()
  let numberOfCards = isMobile ? CONSTANTS?.FOUR : CONSTANTS?.SIX
  const [selectFilterImage, setSelectFilterImage] = useState<any>()
  const colorOne = theme?.palette?.neuPalette?.hexOne
  const [countToShowCards, setCountToShowCards] = useState(numberOfCards)
  const handleModelClose = () => setVideoPlay(!videoPlay)
  const colorTwo = theme?.palette?.neuPalette?.hexTwo
  const [selectedVideo, setSelectedVideo] = useState<any>()
  const { getOptimizeImageUrl } = useImageUtility()
  const [openModel, setOpenModel] = useState<boolean>(false)
  const modalOpenHandler = () => setOpenModel(!openModel)
  const allSlides =
    contentType === "hotelGallery"
      ? componentItemData?.flatMap((item: any) => item?.media)
      : componentItemData?.[0]?.images
  useEffect(() => {
    setSelectFilterImage([componentItemData?.[0]])
  }, [componentItemData])
  const galleryItem = componentItemData?.find((item: any, index: number) => index === selectedIndex)
  useEffect(() => {
    if (isMobile) {
      setSelectFilterImage([galleryItem])
    }
  }, [galleryItem, isMobile])
  useEffect(() => {
    setSelectedIndex(isMobile ? 0 : -1)
  }, [isMobile])

  return (
    <Box aria-label="hotels-gallery">
      <Box display={"none"}>
        {isMobile ? (
          <MobileGalleryButtonContainer>
            <GalleryButtonWrapper
              endIcon={<StyledGalleryExpandMoreIcon />}
              onClick={() => {
                modalOpenHandler()
              }}>
              {galleryItem?.categoryTitle !== undefined && typeof galleryItem?.categoryTitle === "string"
                ? galleryItem?.categoryTitle
                : galleryItem?.categoryTitle}
              {` (${galleryItem?.media?.length})`}{" "}
            </GalleryButtonWrapper>
          </MobileGalleryButtonContainer>
        ) : (
          <ButtonsBox>
            {componentItemData?.map((item: any, index: number) => (
              <StyledButton
                key={index}
                variant="light-outlined"
                onClick={() => {
                  setSelectedIndex(index - 1), setCountToShowCards(numberOfCards), setSelectFilterImage([item])
                }}
                sx={{
                  color: index == selectedIndex + 1 ? colorOne : "",
                  backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
                  "&:hover": {
                    color: index == selectedIndex + 1 ? colorOne : "",
                    backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
                  },
                }}>
                {`${item?.categoryTitle} (${item?.media?.length})`}
              </StyledButton>
            ))}
          </ButtonsBox>
        )}
      </Box>
      <Grid
        container
        rowSpacing={isMobile ? MobilePxToVw(40) : DesktopPxToVw(40)}
        justifyContent={"center"}
        columnSpacing={isMobile ? "unset" : DesktopPxToVw(53)}
        sx={{ marginTop: "1.042vw" }}>
        {/* {selectFilterImage?.map((item: any, index: number) => (
          <> */}
        {allSlides?.slice(0, countToShowCards)?.map((imageComponent: any, innerIndex: number) => (
          <Grid key={innerIndex} item xl={4} lg={4} md={4} sm={12} xs={12}>
            <CardTitleOnHoverComponent
              {...imageComponent}
              primaryAction={primaryAction}
              onClick={() => {
                if (imageComponent?._type === "videoAsset") {
                  imageComponent?.videoPlay && setSelectedVideo(imageComponent?.videoPlay)
                  setVideoPlay(true)
                } else {
                  modalStore?.setCurrentIndex(innerIndex)
                  modalStore?.setPropertyData(allSlides)
                  navigate(primaryAction?.url, primaryAction?.urlType)
                }
              }}
            />
          </Grid>
        ))}
        {countToShowCards >= allSlides?.length ? null : (
          <LoadMoreGridContainer item xs={12} sm={12} md={12} lg={12} xl={12} $isMobile={isMobile}>
            {isMobile ? (
              <LoadMoreButtonContainer
                variant="light-outlined"
                endIcon={
                  <StyledExpandMoreIcon
                    sx={{
                      height: "3.875vw",
                    }}
                  />
                }
                onClick={() => {
                  setCountToShowCards(countToShowCards + 2)
                }}
                $isMobile={isMobile}>
                {CONSTANTS?.LOAD_MORE}
              </LoadMoreButtonContainer>
            ) : (
              <LoadMoreWrapper
                onClick={() => {
                  setCountToShowCards(countToShowCards + 6)
                }}>
                <Typography variant="link-m" sx={{ width: "7vw" }}>
                  {CONSTANTS?.LOAD_MORE}
                </Typography>
                <StyledExpandMoreIcon
                  sx={{
                    height: "1.2vw",
                  }}
                />
              </LoadMoreWrapper>
            )}
          </LoadMoreGridContainer>
        )}
        {/* </>
        ))} */}
      </Grid>
      {videoPlay && selectedVideo?.asset?._ref && (
        <>
        <VideoSEOScript {...selectedVideo}/>
        <VideoPlayerModal
          videoUrl={selectedVideo?.asset?._ref}
          handleModalOpen={videoPlay}
          handleModalClose={handleModelClose}
        />
        </>
      )}
      {openModel && (
        <BasicModal
          width="100%"
          height="auto"
          open={openModel}
          bgcolor={theme.palette.background.paper}
          handleClose={modalOpenHandler}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
          Component={
            <PropItemsMsiteModalData
              props={componentItemData?.map((item: any) => ({
                title: item?.categoryTitle,
              }))}
              setOpenModal={setOpenModel}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              numberOfCards={numberOfCards}
              setCountToShowCards={setCountToShowCards}
            />
          }
        />
      )}
    </Box>
  )
}

export default observer(HotelDetailsGalleryGroup)
