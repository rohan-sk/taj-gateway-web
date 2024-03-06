import Slider from "react-slick"
import dynamic from "next/dynamic"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { urlFor } from "../../lib-sanity"
import { useTheme } from "@mui/system"
import { useEffect, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, CardMedia, Typography, Card, Button } from "@mui/material"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { useRouter } from "next/router"
import Link from "next/link"
const CustomNextArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomNextArrow)
)
const CustomPrevArrow = dynamic(() =>
import("../hoc/custom-arrows").then((module) => module.CustomPrevArrow)
)


const Inclusive = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const [activeIndex, setActiveIndex] = useState(1)
  const [nextArrowTitle, setNextArrowTitle] = useState("")
  const [prevArrowTitle, setPrevArrowTitle] = useState("")
  const router = useRouter()
  const theme = useTheme()
  const settings = {
    arrows: true,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "30%",
    prevArrow: (
      <CustomPrevArrow
        prevArrowTitle={prevArrowTitle}
        cssData={{ width: "36px", height: "36px", left: "50px" }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        nextArrowTitle={nextArrowTitle}
        cssData={{ width: "36px", height: "36px", right: "50px" }}
      />
    ),
    afterChange: (sliderIndex: number) => setActiveIndex(sliderIndex),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
          infinite: true,
          centerMode: false,
          swipeToSlide: true,
          speed: 500,
          initialSlide: 0,
          slidesToScroll: 1,
          centerPadding: "0",
          slidesToShow: 1.06,
        },
      },
    ],
  }
  useEffect(() => {
    setNextArrowTitle(props?.[activeIndex + 1]?.title)
    setPrevArrowTitle(props?.[activeIndex - 1]?.title)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <Box width={"100%"} height={"100%"}>
      <Box width={"100%"} m={"auto"}>
        <CommonCarouselStyles>
          <Slider {...settings}>
            {props?.map((data: any, index: number) => {
              return (
                <>
                  <Card>
                    {(props?.image?.asset?._ref ||
                      props?.largeImage?.asset?._ref) && (
                      <CardMedia
                        alt="media"
                        component="img"
                        src={urlFor(
                          isMobile
                            ? props?.image?.asset?._ref
                            : props?.largeImage?.asset?._ref
                        ).url()}
                      />
                    )}
                  </Card>
                  <Box
                    sx={{
                      top: "-170px",
                      float: "right",
                      p: "16px 20px",
                      display: "flex",
                      minHeight: "300px",
                      position: "relative",
                      alignSelf: "flex-end",
                      flexDirection: "column",
                      transform: "translateY(50%)",
                      boxShadow: "0px 1px 1px gray",
                      justifyContent: "space-evenly",
                      width: isMobile ? "85%" : "97%",
                      background: "black",
                    }}>
                    <Typography variant="heading-xs" sx={{ maxWidth: "80%" }}>
                      {props?.title}
                    </Typography>
                    <Typography variant="body-ml">{props?.subTitle}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <Box>
                        <Button
                          href={router?.asPath}
                          variant={"light-contained"}>
                          {props?.action?.[0]?.primaryAction?.[0]?.title}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          href={router?.asPath}
                          variant={"light-contained"}>
                          {props?.action?.[0]?.primaryAction?.[0]?.title}
                        </Button>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#897553",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "700",
                            lineHeight: "150%",
                            letterSpacing: "0.15em",
                            textDecorationLine: "underline",
                          }}>
                          MORE
                        </Typography>
                      </Box>
                    </Box>

                    {/* <Link href={props?.action?.[0]?.secondaryAction?.[0]?.url || router?.asPath}>
                                                <Typography
                                                    variant='link-m'
                                                    sx={{ cursor: props?.action?.[0]?.secondaryAction?.[0]?.url ? "pointer" : "none" }}>
                                                    {props?.action?.[0]?.secondaryAction?.[0]?.title}
                                                </Typography>
                                            </Link> */}
                  </Box>
                </>
              )
            })}
          </Slider>
        </CommonCarouselStyles>
      </Box>
    </Box>
  )
}
export default Inclusive
