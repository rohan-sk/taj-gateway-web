import React, { useState } from "react"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { ImageProps, VideoProps } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import VideoSEOScript from "../../utils/VideoSEOScript"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))

interface SimpleCardProps {
  mediaType: string
  image: ImageProps
  largeImage: ImageProps
  videoAsset: VideoProps
  gridSize?: number
}

const SimpleCard = (props: SimpleCardProps) => {
  const { mediaType, image, largeImage, videoAsset, gridSize = 1 } = props
  const { getOptimizeImageUrl } = useImageUtility()
  const isMobile = useMobileCheck()
  const videoUrl = videoAsset?.videoPlay?.asset?._ref
  const videoThumbnail = videoAsset?.videoThumbnail?.asset?._ref
  const smallVideoThumbnail = videoAsset?.smallVideoThumbnail?.asset?._ref
  const playIcon = videoAsset?.playIcon?.asset?._ref
  const videoPlayPauseIcon = videoAsset?.videoPlay?.asset?._ref
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const cardAltText = isMobile ? image?.altText : largeImage?.altText

  const [open, setOpen] = useState(false)
  const [video, setVideo] = useState<string>("")

  const handleModelClose = () => setOpen(false)

  return (
    <>
      {mediaType === "video" ? (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}>
          <Box
            alt={"img"}
            component="img"
            sx={{
              cursor: "pointer",
              position: "absolute",
            }}
            src={playIcon && urlFor(playIcon).url()}
            onClick={() => {
              videoUrl && setVideo(videoUrl), setOpen(true)
            }}
          />
          <Box
            alt={"img"}
            component="img"
            width={"100%"}
            height={"100%"}
            sx={{ cursor: "pointer" }}
            src={
              isMobile
                ? getOptimizeImageUrl(smallVideoThumbnail && urlFor(smallVideoThumbnail).url(), isMobile ? 1 : gridSize)
                : getOptimizeImageUrl(videoThumbnail && urlFor(videoThumbnail).url(), isMobile ? 1 : gridSize)
            }
            onClick={() => {
              videoUrl && setVideo(videoUrl), setOpen(true)
            }}
          />
        </Box>
      ) : (
        <>
          {cardImage && (
            <Box
              alt={cardAltText || `img`}
              width={"100%"}
              height={"100%"}
              component={"img"}
              loading="lazy"
              src={getOptimizeImageUrl(urlFor(cardImage).url(), isMobile ? 1 : gridSize)}
            />
          )}
        </>
      )}
      <VideoSEOScript {...videoAsset} />
      <VideoPlayerModal videoUrl={video} handleModalOpen={open} handleModalClose={handleModelClose} />
    </>
  )
}

export default SimpleCard
