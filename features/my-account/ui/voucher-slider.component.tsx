import React, { useState } from "react"
import dynamic from "next/dynamic"
import Slider from "react-slick"
const CustomPrevArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomPrevArrow),
)
const CustomNextArrow = dynamic(() =>
  import("../../../components/hoc/custom-arrows").then((module) => module.CustomNextArrow),
)
import { MobileCarousalStylesWrapper } from "../../../components/carousal/styles/common-styles"
import { CarouselProgressiveBarStyles } from "../../../components/hoc/custom-carousal-dots-styles"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import prevImage from "../../../public/taj-grey-left-arrow.png"
import nextImage from "../../../public/taj-grey-right-arrow.png"

const SingleVoucherCardComponent = dynamic(() => import("./single-voucher-card.component"))

const VoucherSliderComponent = ({
  card,
  cmsVouchersData,
  primaryAction,
  selectedStatus,
  backgroundColor,
  productCategory,
}: any) => {
  const checkCardItemsLength = card?.length
  const isMobile = useMobileCheck()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const settings = {
    dots: isMobile,
    arrows: !isMobile,
    infinite: false,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    prevArrow: (
      <CustomPrevArrow
        onClick={() => {
          if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1)
          }
        }}
        disabled={selectedIndex === 0}
        cssData={{
          left: "-2vw",
          width: "3.125vw",
          height: "3.125vw",
          borderRadius: "50%",
          boxShadow: " -6px 10px 24px rgba(0, 0, 0, 0.1)",
          background: `url(${prevImage?.src}), no-repeat`,
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        onClick={() => {
          if (selectedIndex < checkCardItemsLength - 1) {
            setSelectedIndex(selectedIndex + 1)
          }
        }}
        disabled={selectedIndex === checkCardItemsLength - 1}
        cssData={{
          right: "-2vw",
          width: "5.125vw",
          height: "5.125vw",
          borderRadius: "50%",
          background: `url(${nextImage?.src}), no-repeat`,
        }}
      />
    ),
    afterChange: (slick: any) => {
      setSelectedIndex(slick)
    },
    beforeChange: (slick: any) => {
      setSelectedIndex(slick)
    },
  }
  return (
    <MobileCarousalStylesWrapper $inactiveDotWidth={`${MobilePxToVw(400 / card?.length)}`} $backGroundColor={true}>
      <CarouselProgressiveBarStyles
        sx={{
          "& .slick-dots": {
            "@media (max-width: 640px)": {
              margin: "0vw 0vw 5.46vw 0vw",
            },
          },
        }}
        $login={false}
        $backGroundColor={backgroundColor}>
        <Slider {...settings}>
          {card?.map((cardChild: any, idx: number) => (
            <SingleVoucherCardComponent
              key={idx}
              index={idx}
              cardChild={cardChild}
              cmsVouchersData={cmsVouchersData}
              primaryAction={primaryAction}
              selectedStatus={selectedStatus}
              productCategory={productCategory}
            />
          ))}
        </Slider>
      </CarouselProgressiveBarStyles>
    </MobileCarousalStylesWrapper>
  )
}

export default VoucherSliderComponent
