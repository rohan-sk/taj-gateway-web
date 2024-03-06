import React from "react"
import { theme } from "../../lib/theme"
import BasicModal from "../hoc/modal/modal"
import { getVideoUrl } from "../../lib-sanity"
import { VideoPlayerBox } from "./styles/video-player-modal"
import { useMobileCheck } from "../../utils/isMobilView"
import { ICONS } from "../constants"

interface VideoPlayerModalProps {
  videoUrl: string
  handleModalOpen: boolean
  handleModalClose: Function
}

const VideoPlayerModal = ({ videoUrl, handleModalOpen, handleModalClose }: VideoPlayerModalProps) => {
  const isMobile = useMobileCheck()
  return (
    <>
      <BasicModal
        width={"100%"}
        height={"100%"}
        open={handleModalOpen}
        handleClose={handleModalClose}
        bgcolor={theme?.palette?.ihclPalette?.hexThree}
        ModalCloseButtonColor={theme?.palette?.ihclPalette?.hexOne}
        webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
        ModalCloseButtonStyles={{ marginBottom: "1.30vw", right: "12.5vw" }}
        Component={
          <VideoPlayerBox
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100% !important",
            }}>
            <video
              autoPlay
              id={"videoPlayer"}
              width={"100%"}
              height={"100%"}
              controls={true}
              style={{ objectFit: isMobile ? "contain" : "fill" }}>
              {videoUrl && <source src={getVideoUrl(videoUrl)} type="video/mp4" />}
            </video>
          </VideoPlayerBox>
        }
      />
    </>
  )
}

export default VideoPlayerModal
