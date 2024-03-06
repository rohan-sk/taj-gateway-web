import React from "react"
import { Box } from "@mui/material"
import { StoriesImageAndTitleWrapper, TopStoriesTitle } from "../styles/blog-cards-styles"
import { urlFor } from "../../../../lib-sanity"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useRouter } from "next/router"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { PathType } from "../../../../types"

const BlogTopStories = ({ topStoryData, itemIndex }: any) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  const navigate = useAppNavigation()
  const routerBasePath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const routerPath = `${routerBasePath}/${topStoryData?.theme?.identifier}/${topStoryData?.identifier}`

  return (
    <>
      {isMobile ? (
        <Box>
          {topStoryData?.bannerImage?.[0]?.imageAsset?.image?.[0]?.asset?._ref && (
            <Box
              alt="Top Stories Image"
              component="img"
              width={"100%"}
              height={"75vw"}
              onClick={() => {
                navigate(routerPath, PathType?.internal)
              }}
              sx={{ cursor: "pointer" }}
              src={urlFor(topStoryData?.bannerImage?.[0]?.imageAsset?.image?.[0]?.asset?._ref)?.url()}
            />
          )}
          {topStoryData?.bannerTitle?.mobileTitle && (
            <TopStoriesTitle
              variant={"m-body-sl"}
              onClick={() => {
                navigate(routerPath, PathType?.internal)
              }}>
              {topStoryData?.bannerTitle?.mobileTitle?.join(" ")}
            </TopStoriesTitle>
          )}
        </Box>
      ) : (
        <StoriesImageAndTitleWrapper
          sx={{
            margin: itemIndex === 2 ? "1.04vw 0vw 0vw 0vw" : "1.04vw 0vw",
          }}>
          {topStoryData?.bannerImage?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref && (
            <Box
              alt="Top Stories Image"
              component="img"
              width={"100%"}
              height={"6.25vw"}
              onClick={() => {
                navigate(routerPath, PathType?.internal)
              }}
              sx={{ cursor: "pointer" }}
              src={urlFor(topStoryData?.bannerImage?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()}
            />
          )}
          {topStoryData?.bannerTitle?.desktopTitle && (
            <TopStoriesTitle
              variant={"body-ml"}
              onClick={() => {
                navigate(routerPath, PathType?.internal)
              }}>
              {topStoryData?.bannerTitle?.desktopTitle?.join(" ")}
            </TopStoriesTitle>
          )}
        </StoriesImageAndTitleWrapper>
      )}
    </>
  )
}

export default BlogTopStories
