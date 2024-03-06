import React from "react"
import { fetchVideoSchema } from "../schemas/videoSchema"
import { urlFor } from "../lib-sanity"
import { useRouter } from "next/router"

export const VideoSEOScript = (videoAsset: any) => {
  const router = useRouter()

  const formateDate = (date: any) => {
    const val = new Date(date);
    const day = val.getDate();
    const month = val.getMonth() + 1;
    const fullYear = val.getFullYear();
    const formattedDate = `${fullYear}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
    return date?formattedDate:""
  }

  const videoSchema = fetchVideoSchema(videoAsset?.name, videoAsset?.description, videoAsset?.videoUrl, formateDate(videoAsset?.uploadDate), videoAsset?.duration, videoAsset?.videoThumbnail?.asset?._ref ? urlFor(
    videoAsset?.videoThumbnail?.asset?._ref
  )?.url() : "", `${process.env.NEXT_PUBLIC_DOMAIN_URL}${router?.asPath?.length > 0 ?  router?.asPath?.substring(1) : ''}`)

  return (
    <script key="video"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(videoSchema),
      }} />
  )
}

export default VideoSEOScript
