import React, { useContext, useEffect, useState } from "react"
import { CONSTANTS } from "../../../../components/constants"
import dynamic from "next/dynamic"
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material"
import { urlFor } from "../../../../lib-sanity"
import {
  CardsBox,
  ActionBox,
  ActionGrid,
  ButtonsBox,
  StyledButton,
  ExpandMoreIconStyled,
  AlternateAllLinksWrappingBox,
  TitleMainBox,
} from "../../../../components/group/styles/group-with-filter-cards"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { useMobileCheck } from "../../../../utils/isMobilView"
const VideoPlayerModal = dynamic(() => import("../../../../components/modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../../../../components/hoc/actions/action-items-ui"))
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { DestinationStore, GAStore, UserStore } from "../../../../store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useImageUtility } from "../../../../utils/hooks/useImageUtility"
import { useRouter } from "next/router"
import { destinationsRoute } from "../../../property/ui/constants"
const MultiRowTitle = dynamic(() => import("../../../../components/hoc/title/multi-row-title"))
import { observer } from "mobx-react-lite"
import { PropItemsMsiteModal } from "../../../../components/hoc/CommonMsiteModalAlignment/PropItemsMsiteModal"
import {
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
} from "../../../../components/group/styles/common-styled-components"
import { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import VideoSEOScript from "../../../../utils/VideoSEOScript"

const DestinationGroupWithFilterCards = (props: any) => {
  const cardPadding = props?.aesthetic?.padding
  // this Component need to be build under different groups
  const isMobile = useMobileCheck()
  const router = useRouter()
  const { getOptimizeImageUrl } = useImageUtility()
  let numberOfCards = CONSTANTS?.SIX
  const theme = useTheme()
  const navigate = useAppNavigation()
  const [selectedIndex, setSelectedIndex] = useState<any>(-1)
  const [countToShowCards, setCountToShowCards] = useState(numberOfCards)
  const [selectCountry, setSelectCountry] = useState<string>()
  const [videoPlay, setVideoPlay] = useState<boolean>(false)
  const [selectFilterImage, setSelectFilterImage] = useState([])
  const [tabs, setTabs] = useState<any>([])
  const [showTitle, setShowTitle] = useState(-1)
  const colorOne = theme?.palette?.ihclPalette?.hexOne
  const colorTwo = theme?.palette?.ihclPalette?.hexTwo
  const IHCLContexts = useContext(IHCLContext)
  const destinationStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.destinationStore) as DestinationStore
  const { selectedCountry } = destinationStore
  const handleModelClose = () => setVideoPlay(!videoPlay)

  const removeDuplicates = (arr: any) => {
    return arr?.filter((item: any, index: number) => arr?.indexOf(item) === index && item !== null)
  }

  const fetchTabBasedProperty = (country: string) => {
    if (country?.toLowerCase() === "all") {
      return destinationStore?.destinationData?.filter(
        (val: any) =>
          val?.thumbnail !== null &&
          val?.thumbnail !== undefined &&
          val?.thumbnail?.[0]?.imageAsset !== null &&
          val?.thumbnail?.[0]?.imageAsset !== undefined,
      )
    } else {
      return destinationStore?.destinationData?.filter(
        (val: any) =>
          val?.country?.toLowerCase() === country?.toLowerCase() &&
          val?.thumbnail?.[0]?.imageAsset !== null &&
          val?.thumbnail?.[0]?.imageAsset !== undefined &&
          val?.thumbnail !== null &&
          val?.thumbnail !== undefined,
      )
    }
  }

  useEffect(() => {
    let arr = destinationStore?.destinationData?.map(({ country }: any) => {
      return country
    })
    arr?.unshift("All")
    arr && setTabs(removeDuplicates([...arr]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    setSelectFilterImage(fetchTabBasedProperty(selectedCountry || tabs?.[0]))
    setSelectCountry(selectedCountry)
    setSelectedIndex(
      tabs?.findIndex((val: string) => {
        return val?.toLowerCase() === selectedCountry?.toLowerCase()
      }) - 1,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, tabs])

  useEffect(() => {
    setSelectFilterImage(fetchTabBasedProperty(selectCountry || tabs?.[0]))
    setSelectCountry(selectCountry)
    setCountToShowCards(numberOfCards)
    // handleCountry(selectCountry, selectedIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCountry])
  return (
    <Box
      sx={{
        padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
      }}>
      <>
        <Box>
          <MultiRowTitle
            title={{
              ...props?.heading,
              headingElement: props?.title?.headingElement,
            }}
            subTitle={""}
            heading={props?.heading}
            aesthetic={props?.aesthetic}
            charactersLimit={props?.charactersLimit}
            alignmentVariant={props?.alignmentVariant}
            isComponentFullWidth={true}
            isMobileComponentFullWidth={true}
          />
        </Box>
        {isMobile ? (
          <Stack mb={MobilePxToVw(40)}>
            <PropItemsMsiteModal
              props={tabs?.map((tab: string) => ({ title: tab }))}
              setSelectedTab={setSelectCountry}
              setParentIndex={setSelectedIndex}
              selectedCountryIndex={tabs?.findIndex(
                (val: string) => selectedCountry?.toLowerCase() === val?.toLowerCase(),
              )}
              cityCheck={props?.contentType === "allDestinations" ? true : false}
            />
          </Stack>
        ) : (
          <ButtonsBox>
            {tabs?.map((item: any, index: number) => (
              <StyledButton
                key={index}
                variant="light-outlined"
                onClick={() => {
                  setSelectedIndex(index - 1), setCountToShowCards(numberOfCards)
                  setSelectFilterImage(fetchTabBasedProperty(item))
                  setSelectCountry(item)
                  // handleCountry(item, index)
                }}
                sx={{
                  color: index == selectedIndex + 1 ? colorOne : "",
                  backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
                  "&:hover": {
                    color: index == selectedIndex + 1 ? colorOne : "",
                    backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
                  },
                }}>
                {item?.toUpperCase()}
              </StyledButton>
            ))}
          </ButtonsBox>
        )}
        {!isMobile && selectCountry?.toLowerCase() !== "all" && (
          <AlternateAllLinksWrappingBox>
            <RenderActionItem
              url={`${destinationsRoute}/hotels-in-${
                selectCountry?.toLowerCase()?.replace(/ /g, "-") || tabs?.[0]?.toLowerCase()?.replace(/ /g, "-")
              }`}
              title={`Explore ${selectCountry || tabs?.[0]}`?.toUpperCase()}
              navigationType={"internal"}
              variant={"link"}
              isActionButtonType={false}
            />
          </AlternateAllLinksWrappingBox>
        )}

        <Grid
          container
          rowGap={isMobile ? "4.844vw" : "2.083vw"}
          justifyContent={"center"}
          columnGap={isMobile ? "9.688vw" : "2.083vw"}
          sx={{ marginTop: "3.125vw" }}>
          {selectFilterImage?.slice(0, countToShowCards)?.map((item: any, index: number) => (
            <Grid
              key={index}
              item
              xl={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
              lg={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
              md={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
              sm={isMobile ? 5 : item.largeVariant === "ihcl.core.card.social-media-card-image" ? 4 : 1.72}
              xs={10}>
              <CardsBox
                sx={{
                  cursor: "pointer",
                  position: isMobile ? "unset" : "relative",
                }}
                onClick={() => {
                  navigate(`/${destinationsRoute}/hotels-in-${item?.identifier}`, item?.primaryAction?.urlType)
                  item?.mediaType === "video" && setVideoPlay(!videoPlay)
                }}
                onMouseEnter={() => setShowTitle(index)}
                onMouseLeave={() => setShowTitle(-1)}>
                <>
                  {item?.thumbnail?.[0]?.mediaType === "video" && videoPlay ? (
                    item?.thumbnail?.[0]?.videoAsset?.videoPlay?.asset?._ref && (
                      <>
                        <VideoSEOScript {...item?.videoAsset} />
                        <VideoPlayerModal
                          videoUrl={item?.videoAsset?.videoPlay?.asset?._ref}
                          handleModalOpen={videoPlay}
                          handleModalClose={handleModelClose}
                        />
                      </>
                    )
                  ) : (
                    <>
                      {item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                        <Box
                          width={"100%"}
                          height={"auto"}
                          loading="lazy"
                          component="img"
                          alt="award-image"
                          sx={{ objectFit: "contain" }}
                          src={getOptimizeImageUrl(
                            urlFor(item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url(),
                            3,
                          )}
                        />
                      )}
                    </>
                  )}
                </>
              </CardsBox>
              <Typography textAlign="center" variant={isMobile ? "heading-l" : "heading-xs"} pt={1}>
                {item?.name?.toUpperCase()}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {selectFilterImage?.length > countToShowCards && (
          <ActionGrid item lg={12} xl={12}>
            {isMobile ? (
              <StyledExpandMoreButton
                variant="light-outlined"
                endIcon={
                  <StyledExpandMoreIcon
                    sx={{
                      height: "3.875vw",
                    }}
                  />
                }
                onClick={() => {
                  setCountToShowCards(countToShowCards + 1)
                }}>
                {CONSTANTS?.LOAD_MORE}
              </StyledExpandMoreButton>
            ) : (
              <ActionBox onClick={() => setCountToShowCards(countToShowCards + numberOfCards)}>
                <Typography variant="link-m">{CONSTANTS?.LOAD_MORE}</Typography>
                <ExpandMoreIconStyled sx={{ fontSize: "1.2vw" }} />
              </ActionBox>
            )}
          </ActionGrid>
        )}
      </>
    </Box>
  )
}

export default observer(DestinationGroupWithFilterCards)
