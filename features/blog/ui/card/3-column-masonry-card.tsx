import React, { useContext, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { CONSTANTS } from "../../../../components/constants"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import { theme } from "../../../../lib/theme"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import BlogStore from "../../store/blog.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { formatDateWithMONTH, formatNumberCount } from "../../../../utils/getDate"
import { urlFor } from "../../../../lib-sanity"
import VenueSearchFilter from "../../../property/ui/venues-search-filter"
import { BlogTypesDeclarations } from "../blogTypes/blogTypesDeclarations"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useRouter } from "next/router"
import { PathType } from "../../../../types"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import {
  LikesCountTypography,
  LikesIconAndCountBox,
  MasonryCardActionBox,
  NoResultsFoundText,
  ThemeListingContentBox,
  ThemeListingContentWrapper,
  ThemeListingLikesWrapper,
  ThemeListingWrapperBox,
  TitleHyphenDivider,
  ThemeListingCommentsWrapper,
} from "../styles/blog-cards-styles"

const CustomReadMore = dynamic(() => import("../../../../components/hoc/CustomReadMore"))

const BlogMasonryThemesCard = (props: BlogTypesDeclarations) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const router = useRouter()
  const routerPath = router?.asPath?.split("/")?.slice(0, 2)?.join("/")
  const ihclContext = useContext(IHCLContext)
  const masonryCardPadding = useAesthetics(props?.cardAesthetics?._ref)?.cardPadding
  const ctaLabelAction = props?.groupActionTypes?.[0]?.ctaLabel
  const initialCardsToShow = isMobile ? CONSTANTS?.THREE : CONSTANTS?.SIX
  const [themeCardShows, setThemeCardShows] = useState<number>(initialCardsToShow)
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const [originalData, setOriginalData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])
  const [more, setMore] = useState<number>(
    props?.charactersLimitCount ? props?.charactersLimitCount : CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT,
  )

  const [searchFilters, setSearchFilters] = useState<any>({ recent_theme: "" })
  const [facets, setFacets] = useState<any>({ recent_theme: ["Most Liked"] })

  useEffect(() => {
    setThemeCardShows(initialCardsToShow)
  }, [initialCardsToShow])

  const getKey: any = (index: number, filters: any): string => {
    return filters ? Object?.keys(filters)?.[index] : ""
  }

  useEffect(() => {
    setOriginalData(blogStore?.blogListingData?.blogs)
    setFilteredData(blogStore?.blogListingData?.blogs)
  }, [blogStore?.blogListingData?.blogs, props?.parameterMapValues?.length])

  const thumbIconStyles = {
    width: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
    height: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
  }

  const getFilterComponent = () => {
    return (
      <VenueSearchFilter
        originalData={originalData}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
        filters={props?.parameterMapValues}
        setSearchFilters={setSearchFilters}
        searchFilters={searchFilters}
        facets={facets}
        getKey={getKey}
        filtersPadding={true}
      />
    )
  }

  return (
    <>
      {props?.parameterMapValues?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? "0vw 8.215vw" : "initial",
          }}>
          {getFilterComponent()}
        </Box>
      )}
      <ThemeListingWrapperBox>
        {filteredData &&
          filteredData?.slice(0, themeCardShows)?.map((eachThemeData: any, index: number) => (
            <Box key={index} sx={{ marginBottom: isMobile ? MobilePxToVw(90) : "auto" }}>
              {eachThemeData?.bannerImage?.[0]?.imageAsset && (
                <Box sx={{ position: "relative" }}>
                  <Box
                    alt="Theme Image"
                    component="img"
                    width={"100%"}
                    height={isMobile ? "75vw" : "16.67vw"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        `${routerPath}/${eachThemeData?.theme?.identifier}/${eachThemeData?.identifier}`,
                        PathType?.internal,
                      )
                    }}
                    src={
                      isMobile
                        ? urlFor(eachThemeData?.bannerImage?.[0]?.imageAsset?.image?.[0]?.asset?._ref)?.url()
                        : urlFor(eachThemeData?.bannerImage?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
                    }
                  />
                  <ThemeListingCommentsWrapper>
                    <LikesIconAndCountBox>
                      {eachThemeData?.commentsCount > 0 ? (
                        <ChatBubbleIcon
                          style={{
                            ...thumbIconStyles,
                            fill: theme?.palette?.neuPalette?.hexTwo,
                          }}
                        />
                      ) : (
                        <ChatBubbleOutlineIcon
                          style={{
                            ...thumbIconStyles,
                          }}
                        />
                      )}
                      <LikesCountTypography>
                        {eachThemeData?.commentsCount > 0 ? formatNumberCount(eachThemeData?.commentsCount) : 0}
                      </LikesCountTypography>
                    </LikesIconAndCountBox>
                  </ThemeListingCommentsWrapper>
                  <ThemeListingLikesWrapper>
                    <LikesIconAndCountBox>
                      {eachThemeData?.likes > 0 ? (
                        <ThumbUpIcon
                          style={{
                            ...thumbIconStyles,
                            fill: theme?.palette?.neuPalette?.hexTwo,
                          }}
                        />
                      ) : (
                        <ThumbUpOffAltIcon
                          style={{
                            ...thumbIconStyles,
                          }}
                        />
                      )}
                      <LikesCountTypography>
                        {eachThemeData?.likes ? formatNumberCount(eachThemeData?.likes) : 0}
                      </LikesCountTypography>
                    </LikesIconAndCountBox>
                  </ThemeListingLikesWrapper>
                </Box>
              )}
              <ThemeListingContentWrapper sx={{ padding: isMobile ? masonryCardPadding?.mobile : "0vw" }}>
                <TitleHyphenDivider />
                <ThemeListingContentBox>
                  {eachThemeData?.bannerTitle && (
                    <Typography
                      variant={isMobile ? "m-heading-m" : "heading-xs"}
                      sx={{ letterSpacing: isMobile ? "0vw" : "1.2px" }}>
                      {isMobile ? eachThemeData?.bannerTitle?.mobileTitle : eachThemeData?.bannerTitle?.desktopTitle}
                    </Typography>
                  )}

                  {eachThemeData?.description && (
                    <Typography
                      variant={isMobile ? "m-body-sl" : "body-ml"}
                      sx={{ display: "block", margin: isMobile ? "3.125vw 0vw 6.25vw 0vw" : "1.04vw 0vw 2.08vw 0vw" }}>
                      {eachThemeData?.description.length > more ? (
                        <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                          {eachThemeData?.description}
                        </CustomReadMore>
                      ) : (
                        eachThemeData?.description
                      )}
                    </Typography>
                  )}

                  {eachThemeData?.authorInfo?._createdAt && (
                    <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{`By ${
                      eachThemeData?.authorInfo?.title
                    } on ${formatDateWithMONTH(eachThemeData?.authorInfo?._createdAt, true)}`}</Typography>
                  )}
                </ThemeListingContentBox>
              </ThemeListingContentWrapper>
            </Box>
          ))}
        {filteredData?.length < 1 && <NoResultsFoundText>{props?.themesErrorText}</NoResultsFoundText>}
      </ThemeListingWrapperBox>
      {filteredData?.length > themeCardShows && ctaLabelAction?.title && (
        <MasonryCardActionBox
          onClick={() => {
            setThemeCardShows(themeCardShows + CONSTANTS?.FOUR)
          }}>
          <RenderActionItem
            url={ctaLabelAction?.url}
            isActionButtonType={true}
            variant={ctaLabelAction?.variant}
            navigationType={ctaLabelAction?.urlType}
            title={ctaLabelAction?.title}
            onClick={() => {}}
            buttonStyles={{
              letterSpacing: "1.8px",
              fontWeight: 400,
              padding: "0vw",
              height: "auto",
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
              },
              "@media (max-width: 640px)": {
                fontWeight: 700,
                padding: "0vw",
                height: "auto",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "none",
                },
              },
            }}
          />
          <ExpandMoreIcon sx={{ color: theme?.palette?.neuPalette?.hexTwo }} />
        </MasonryCardActionBox>
      )}
    </>
  )
}

export default observer(BlogMasonryThemesCard)
