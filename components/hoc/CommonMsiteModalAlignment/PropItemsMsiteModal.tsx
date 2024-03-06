import React, { Fragment, useEffect, useState } from "react"
import { Grid, Box, Typography, Button } from "@mui/material"
import BasicModal from "../modal/modal"
import { theme } from "../../../lib/theme"
import { PropItemsMsiteModalData } from "./PropItemsMsiteModalData"
import { ExpandMore, KeyboardArrowDown } from "@mui/icons-material"
import {
  ActionBox,
  ButtonImageGapGrid,
  ButtonsBox,
  CardsBox,
  MsiteStyledButton,
} from "./ModalPropItemStyles"
import { CONSTANTS } from "../../constants"
import { urlFor } from "../../../lib-sanity"
import VideoPlayerModal from "../../modal/video-player-modal.component"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import VideoSEOScript from "../../../utils/VideoSEOScript"

interface propItemsData {
  props: any[]
  setSelectedTab?: Function
  setParentIndex?: Function
  cityCheck?: boolean
  selectedCountryIndex?: any
  initialSlide?: any
}

export const PropItemsMsiteModal = ({
  props,
  setSelectedTab,
  setParentIndex,
  cityCheck,
  selectedCountryIndex,
  initialSlide,
}: propItemsData) => {
  const navigate = useAppNavigation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const modalOpenHandler = () => setOpenModal(!openModal)
  let numberOfCards = CONSTANTS?.SIX
  const [countToShowCards, setCountToShowCards] = useState(numberOfCards)
  const [videoPlay, setVideoPlay] = useState<boolean>(false)
  const handleModelClose = () => setVideoPlay(!videoPlay)
  const [selectedIndex, setSelectedIndex] = useState(
    cityCheck
      ? selectedCountryIndex > -1
        ? selectedCountryIndex
        : 0
      : setSelectedTab
      ? Math.floor(props.length / 2)
      : initialSlide > -1
      ? initialSlide
      : 1
  )
  const isMobile = useMobileCheck()
  const findPropNestedItems = props?.find(
    (item: any, index: number) => index === selectedIndex
  )

  useEffect(() => {
    if (setSelectedTab) {
      setSelectedTab(props?.[selectedIndex]?.title)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, setSelectedTab])

  useEffect(() => {
    setSelectedIndex(
      cityCheck
        ? selectedCountryIndex > -1
          ? selectedCountryIndex
          : 0
        : setSelectedTab
        ? Math.floor(props.length / 2)
        : selectedIndex > -1
        ? 0
        : 1
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountryIndex])

  useEffect(() => {
    if (setParentIndex) {
      setParentIndex(selectedIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex])
  return (
    <>
      {findPropNestedItems?.title && (
        <ButtonsBox
          onClick={() => {
            modalOpenHandler()
          }}>
          <MsiteStyledButton>
            {findPropNestedItems?.title !== undefined &&
            typeof findPropNestedItems?.title === "string"
              ? findPropNestedItems?.title
              : isMobile
              ? findPropNestedItems?.title?.mobileTitle ||
                findPropNestedItems?.title?.desktopTitle
              : findPropNestedItems?.title?.desktopTitle}
          </MsiteStyledButton>
          <KeyboardArrowDown
            style={{
              color: theme?.palette?.neuPalette?.hexOne,
            }}
          />
        </ButtonsBox>
      )}

      {props?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {index === selectedIndex &&
              item?.items
                ?.slice(0, countToShowCards)
                ?.map((item: any, index: number) => (
                  <ButtonImageGapGrid
                    $paddingTop={55}
                    container
                    columnSpacing={4}
                    key={index}>
                    <Grid
                      item
                      key={index}
                      xl={12}
                      lg={12}
                      md={
                        item?.variant ===
                        "ihcl.core.card.social-media-card-image"
                          ? 12
                          : 6
                      }
                      sm={
                        item?.variant ===
                        "ihcl.core.card.social-media-card-image"
                          ? 12
                          : 6
                      }
                      xs={
                        item?.variant ===
                        "ihcl.core.card.social-media-card-image"
                          ? 12
                          : 6
                      }>
                      <CardsBox
                        onClick={() => {
                          navigate(
                            item?.primaryAction?.url,
                            item?.primaryAction?.urlType
                          )
                          item?.mediaType === "video" &&
                            setVideoPlay(!videoPlay)
                        }}
                        sx={{ cursor: "pointer" }}>
                        {item?.mediaType === "video" && videoPlay
                          ? item?.videoAsset?.videoPlay?.asset?._ref && (
                            <>
                              <VideoSEOScript {...item?.videoAsset}/>
                              <VideoPlayerModal
                                videoUrl={
                                  item?.videoAsset?.videoPlay?.asset?._ref
                                }
                                handleModalOpen={videoPlay}
                                handleModalClose={handleModelClose}
                              />
                              </>
                            )
                          : (item?.largeImage?.asset?._ref ||
                              item?.image?.asset?._ref) && (
                              <Box
                                width={"100%"}
                                height={"100%"}
                                component="img"
                                alt="award-image"
                                sx={{ objectFit: "contain" }}
                                src={urlFor(
                                  isMobile && item?.image?.asset?._ref
                                    ? item?.image?.asset?._ref
                                    : item?.largeImage?.asset?._ref
                                )?.url()}
                              />
                            )}
                        {item?.title && (
                          <Typography
                            variant="m-heading-xs"
                            style={{ margin: "4.69vw 0vw 5.30vw 0vw" }}>
                            {item?.title}
                          </Typography>
                        )}
                      </CardsBox>
                    </Grid>
                  </ButtonImageGapGrid>
                ))}
          </Fragment>
        )
      })}

      {findPropNestedItems &&
        findPropNestedItems?.items?.length > countToShowCards && (
          <Grid item lg={12} xl={12}>
            <ActionBox
              sx={{ marginTop: "8.906vw" }}
              onClick={() =>
                setCountToShowCards(countToShowCards + numberOfCards)
              }>
              <Button variant="light-outlined">
                {CONSTANTS?.LOAD_MORE}
                <ExpandMore />
              </Button>
            </ActionBox>
          </Grid>
        )}

      {openModal && (
        <BasicModal
          width="100%"
          height="100%"
          open={openModal}
          bgcolor={theme.palette.background.paper}
          handleClose={modalOpenHandler}
          mobileTop={"10.625vw !important"}
          iconPosition={"absolute !important"}
          iconRight="9.375vw !important"
          Component={
            <PropItemsMsiteModalData
              props={props}
              setOpenModal={setOpenModal}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              numberOfCards={numberOfCards}
              setCountToShowCards={setCountToShowCards}
            />
          }
        />
      )}
    </>
  )
}
