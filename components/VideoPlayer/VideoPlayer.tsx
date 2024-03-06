import React from "react"
import { Box } from "@mui/material"
import { getVideoUrl } from "../../lib-sanity"

export const VideoPlayer = ({ video }: any) => {
  return (
    <>
      {video && (
        <Box sx={{ position: "relative", width: "100%" }}>
          <video width={"100%"} id={"videoPlayer"} controls={true}>
            {<source src={getVideoUrl(video)} type="video/mp4" />}
          </video>
        </Box>
      )}
    </>
  )
}
