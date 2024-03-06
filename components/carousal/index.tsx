import React from "react"
import dynamic from "next/dynamic"

const SixCardsCarousal = dynamic(() => import("./six-cards-carousal.component"))
const MediaCardWithBgImageCarousal = dynamic(
  () => import("./media-card-with-bg-img.component")
)
const MultiCardsCarousalWithBgImage = dynamic(
  () => import("./multi-cards-carousal-with-bg.component")
)

export const RenderCarouselComponent = (props: any) => {
  const variant = props?.variant

  switch (variant) {
    case "single-card-carousel-with-bg-image":
      return <MediaCardWithBgImageCarousal {...props} />
    case "ihcl.core.group.carousel-with-back-ground-image":
      return <MultiCardsCarousalWithBgImage {...props} />
    case "6-card-carousel":
      return <SixCardsCarousal {...props} />
    default:
      return <></>
  }
}
