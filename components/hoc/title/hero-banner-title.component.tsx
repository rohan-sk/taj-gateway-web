import React from "react"
import { HeroTitleTypography } from "../../banner/styles/hero-banner"

const HeroBannerTitle = (props: any) => {
  const getTitleWidth = (variant: string) => {
    switch (variant) {
      case "title-with-two-rows":
        return "32vw"
      case "short-hero-title-with-two-rows":
        return "27.66vw"
      default:
        return "60vw"
    }
  }

  return (
    <>
      <HeroTitleTypography variant="heading-l" $width={getTitleWidth(props?.variant)}>
        {props?.title}
      </HeroTitleTypography>
    </>
  )
}

export default HeroBannerTitle
