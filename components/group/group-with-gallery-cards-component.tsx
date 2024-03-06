import React, { useState, useEffect } from "react"
import { ImageProps } from "../types"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { Box, Grid, Typography, useTheme } from "@mui/material"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
import { ButtonsBox, StyledButton } from "./styles/group-with-filter-cards"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  LoadMoreActionBox,
  LoadMoreActionGrid,
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
  ImageTitleTypo,
} from "./styles/common-styled-components"
import VideoSEOScript from "../../utils/VideoSEOScript"

type GroupWithGalleryProps = {
  props: GroupWithGalleryItems[]
}

type GroupWithGalleryItems = {
  title: string
  items: GroupWithGallerySubItems[]
}

type GroupWithGallerySubItems = {
  videoAsset: any
  mediaType: string
  largeImage: ImageProps
  title: string
}

const GroupWithGallery = ({ props }: GroupWithGalleryProps) => {
  const isMobile = useMobileCheck()
  let numberOfCards = isMobile ? CONSTANTS?.SIX : CONSTANTS?.TWELVE
  const theme = useTheme()
  const [video, setVideo] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  const [videoAsset, setVideoAsset] = useState<any>()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [countToShowCards, setCountToShowCards] = useState<number>(numberOfCards)
  useEffect(() => {
    setCountToShowCards(numberOfCards)
  }, [numberOfCards])
  const handleModelClose = () => setOpen(false)

  return (
    <>
      <ButtonsBox>
        {props?.map((item: GroupWithGalleryItems, index: number) => (
          <StyledButton
            key={index}
            variant="light-outlined"
            onClick={() => {
              setSelectedIndex(index), setCountToShowCards(numberOfCards)
            }}
            sx={{
              color: index == selectedIndex ? theme?.palette?.ihclPalette?.hexOne : "",
              backgroundColor: index == selectedIndex ? theme?.palette?.ihclPalette?.hexTwo : "",
              "&:hover": {
                color: theme?.palette?.ihclPalette?.hexTwo,
                backgroundColor: theme?.palette?.ihclPalette?.hexOne,
              },
            }}>
            {`${item?.title} (${item?.items?.length})`}
          </StyledButton>
        ))}
      </ButtonsBox>
      <>
        <Grid container spacing={"2.083vw"}>
          {props?.[selectedIndex]?.items
            ?.slice(0, countToShowCards)
            ?.map((item: GroupWithGallerySubItems, index: number) => (
              <Grid key={index} item xl={4} lg={4} md={4} xs={12} sm={isMobile ? 12 : 4}>
                {(item?.largeImage?.asset?._ref || item?.videoAsset?.videoThumbnail?.asset?._ref) && (
                  <>
                    <Box
                      width="100%"
                      component="img"
                      loading="lazy"
                      alt="-img"
                      sx={{
                        objectFit: "contain",
                        cursor: item?.mediaType === "video" ? "pointer" : "",
                      }}
                      src={
                        item?.mediaType === "video"
                          ? item?.videoAsset?.videoThumbnail?.asset?._ref &&
                            urlFor(item?.videoAsset?.videoThumbnail?.asset?._ref)?.url()
                          : item?.largeImage?.asset?._ref && urlFor(item?.largeImage?.asset?._ref)?.url()
                      }
                      onClick={
                        item?.videoAsset?.videoPlay?.asset?._ref &&
                        (() => {
                          setVideoAsset(item?.videoAsset)
                          setVideo(item?.videoAsset?.videoPlay?.asset?._ref), setOpen(true)
                        })
                      }
                    />
                    {isMobile && <ImageTitleTypo>{item?.title}</ImageTitleTypo>}
                  </>
                )}
              </Grid>
            ))}
          {countToShowCards > (props?.[selectedIndex]?.items?.length - 1 || countToShowCards) ? null : (
            <LoadMoreActionGrid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {isMobile ? (
                <StyledExpandMoreButton
                  variant="light-outlined"
                  endIcon={
                    <StyledExpandMoreIcon
                      sx={{
                        height: "3.875vw",
                      }}
                    />
                  }
                  onClick={() => {
                    setCountToShowCards(countToShowCards + 1)
                  }}>
                  {CONSTANTS?.LOAD_MORE}
                </StyledExpandMoreButton>
              ) : (
                <LoadMoreActionBox
                  onClick={() => {
                    setCountToShowCards(countToShowCards + 3)
                  }}>
                  <Typography variant="link-m">{CONSTANTS?.LOAD_MORE}</Typography>
                  <StyledExpandMoreIcon />
                </LoadMoreActionBox>
              )}
            </LoadMoreActionGrid>
          )}
        </Grid>
      </>
      <VideoSEOScript {...videoAsset} />
      {open && <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />}
    </>
  )
}
export default GroupWithGallery
