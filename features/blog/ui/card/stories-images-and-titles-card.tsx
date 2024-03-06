import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import Slider from "react-slick"
import { MobileCarousalStylesWrapper } from "../../../../components/carousal/styles/common-styles"
import { CarouselProgressiveBarStyles } from "../../../../components/hoc/custom-carousal-dots-styles"
import { aestheticItems } from "../../../../components"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { observer } from "mobx-react-lite"
import { CardContentWrapper, StoriesImageAndTitleWrapper, TitleHyphenDivider } from "../styles/blog-cards-styles"
import { fetchThemeRelatedBlogs } from "../../../../lib/utils"
import { getClient } from "../../../../lib-sanity"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const BlogTopStories = dynamic(() => import("./top-stories-card-data"))

const data = {
  heading: "Top Stories",
  description: "",
  items: [
    {
      cardImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuaaEuL9dLDjLa9s-pOZ-g5xpfbLptgnIN22Ab_uSmauJ8tozF2D9Z-Ichln8COfvty4w&usqp=CAU",
      cardTitle: "Top 5 Destinations to visit in Monsoon",
    },
    {
      cardImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Velb4WTMSb5h9nXcIbiwhbsWe-dQXswwFg&usqp=CAU",
      cardTitle: "Top 5 Offbeat Things to do in Darjeeling",
    },
    {
      cardImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKeRPJ6Cu_cdiLiDb_ffrn6r0oi09bJXoGyA&usqp=CAU",
      cardTitle: "Beach, Lakes & Hills - Quick Getaways from Mumbai",
    },
    {
      cardImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpeWkywJ2vxKXyS7sdKDD1rThgpS4akDtqYWVOgOTpGp6nekt-myZ-OkeI5sHjZEFirZM&usqp=CAU",
      cardTitle: "The Beauty of the Backwaters – A Luxury Holiday in Kerala",
    },
  ],
}

type StoriesCardTypes = {
  title: string
  componentFullWidth: boolean
  cardAesthetics: aestheticItems
  blogStoriesCardContentType: string
}

const StoriesImageTitleCard = (props: StoriesCardTypes) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const routerPathArray = router?.asPath?.split("/")?.slice(2, 3)
  const routerPath = routerPathArray?.[0]
  const { title, cardAesthetics, componentFullWidth, blogStoriesCardContentType } = props
  const dynamicCardAesthetics = useAesthetics(cardAesthetics?._ref)?.cardPadding
  const [topStories, setTopStories] = useState<any>([])

  async function fetchData(routerPath: any) {
    const query = fetchThemeRelatedBlogs(routerPath)
    try {
      const client = getClient(true)
      const data = await client?.fetch(query)
      return data
    } catch (error) {
      console?.error("Error fetching data", error)
      return null
    }
  }

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchData(routerPath)
      if (data) {
        setTopStories(data?.[0]?.blogs?.sort((blogA: any, blogB: any) => (blogB?.likes || 0) - (blogA?.likes || 0)))
      }
    }

    fetchDataAndUpdate()
  }, [routerPath])

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    centerMode: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      {isMobile ? (
        <Box sx={{ width: "100%", padding: dynamicCardAesthetics?.mobile }}>
          <Box sx={{ marginBottom: isMobile ? MobilePxToVw(50) : "auto" }}>
            <CardContentWrapper sx={{ marginLeft: componentFullWidth ? "11vw" : "0vw" }}>
              {title && (
                <>
                  <TitleHyphenDivider />
                  <Typography variant={"m-heading-m"} sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
                    {title}
                  </Typography>
                </>
              )}
            </CardContentWrapper>
            {data?.description && (
              <Typography variant={"m-body-sl"} sx={{ display: "block", marginTop: "3.125vw" }}>
                {data?.description}
              </Typography>
            )}
          </Box>
          <MobileCarousalStylesWrapper
            $inactiveDotWidth={`${MobilePxToVw(400 / data?.items?.length)}`}
            $backGroundColor={false}>
            <CarouselProgressiveBarStyles
              sx={{
                "& .slick-dots": {
                  margin: `${MobilePxToVw(84)} 0vw 0vw 0vw`,
                },
                ".slick-slide": {
                  padding: `0vw ${MobilePxToVw(14)}`,
                },
              }}
              $login={false}
              $backGroundColor={false}>
              <Slider {...settings}>
                {blogStoriesCardContentType === "blogTopStories" &&
                  topStories?.slice(0, 3)?.map((topStory: any, index: number) => (
                    <Box key={index}>
                      <BlogTopStories topStoryData={topStory} itemIndex={index} />
                    </Box>
                  ))}

                {(blogStoriesCardContentType === "blogPopularStories" ||
                  blogStoriesCardContentType === "blogRelatedStories") &&
                  data?.items?.map((item: any, index: number) => (
                    <Box key={index}>
                      {item?.cardImage && (
                        <Box alt="Stories image" component="img" width={"100%"} src={item?.cardImage} />
                      )}
                      {item?.cardTitle && (
                        <Typography variant={"m-body-sl"} sx={{ display: "block", marginTop: "5.62vw" }}>
                          {item?.cardTitle}
                        </Typography>
                      )}
                    </Box>
                  ))}
              </Slider>
            </CarouselProgressiveBarStyles>
          </MobileCarousalStylesWrapper>
        </Box>
      ) : (
        <Box sx={{ padding: dynamicCardAesthetics?.desktop }}>
          {title && (
            <Typography variant={"heading-xs"} sx={{ letterSpacing: "1.2px" }}>
              {title}
            </Typography>
          )}
          {data?.description && (
            <Typography variant={"body-ml"} sx={{ display: "block", marginTop: "1.04vw" }}>
              {data?.description}
            </Typography>
          )}
          {blogStoriesCardContentType === "blogTopStories" &&
            topStories?.slice(0, 3)?.map((topStory: any, index: number) => (
              <Box key={index}>
                <BlogTopStories topStoryData={topStory} itemIndex={index} />
              </Box>
            ))}

          {(blogStoriesCardContentType === "blogPopularStories" ||
            blogStoriesCardContentType === "blogRelatedStories") &&
            data?.items?.map((item: any, index: number) => (
              <StoriesImageAndTitleWrapper
                key={index}
                sx={{
                  margin: index === data?.items?.length - 1 ? "1.04vw 0vw 0vw 0vw" : "1.04vw 0vw",
                }}>
                {item?.cardImage && <Box alt="Stories image" component="img" width={"100%"} src={item?.cardImage} />}
                {item?.cardTitle && (
                  <Typography variant={"body-ml"} sx={{ paddingLeft: "1.04vw" }}>
                    {item?.cardTitle}
                  </Typography>
                )}
              </StoriesImageAndTitleWrapper>
            ))}
        </Box>
      )}
    </>
  )
}

export default observer(StoriesImageTitleCard)
