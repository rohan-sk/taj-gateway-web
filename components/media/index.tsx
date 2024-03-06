import React from "react"
import dynamic from "next/dynamic"

const MediaWellness = dynamic(() => import("./media-wellness"))
const MediaCard = dynamic(() => import("../card/media-card.component"))

export const RenderMediaComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    case "details.card.card-with-left-media-right-content-aspect-ratio-2:4":
      return <MediaWellness {...props} />
    case "details.card.card-with-right-media-left-content-aspect-ratio-2:4":
      return <MediaCard {...props} />
    case "media-video":
      return <MediaWellness {...props} />
    default:
      return <></>
  }
}
