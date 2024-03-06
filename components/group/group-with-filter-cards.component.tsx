import React, { useContext, useState } from "react"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { Box, Grid, Typography, useTheme } from "@mui/material"
import { urlFor } from "../../lib-sanity"
import {
  CardsBox,
  ActionBox,
  ActionGrid,
  ButtonsBox,
  StyledButton,
  ChevronRightIconStyled,
  ExpandMoreIconStyled,
  AlternateAllLinksWrappingBox,
  TitleMainBox,
} from "./styles/group-with-filter-cards"
import { SelectCountryTypography } from "../banner/styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useMobileCheck } from "../../utils/isMobilView"
const VideoPlayerModal = dynamic(() => import("../modal/video-player-modal.component"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import { GAStore, UserStore } from "../../store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { getCookie } from "../../utils/cookie"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { useImageUtility } from "../../utils/hooks/useImageUtility"

import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import VideoSEOScript from "../../utils/VideoSEOScript"

const GroupWithFilterCards = ({ props, alternateAllLinks, analyticsData }: any) => {
  // this Component need to be build under different groups
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  let numberOfCards = CONSTANTS?.SIX
  const theme = useTheme()
  const navigate = useAppNavigation()
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [countToShowCards, setCountToShowCards] = useState(numberOfCards)
  const [selectCountry, setSelectCountry] = useState(
    isMobile ? props?.[0]?.title?.mobileTitle || props?.[0]?.title?.desktopTitle : props?.[0]?.title?.desktopTitle,
  )
  const [videoPlay, setVideoPlay] = useState<boolean>(false)
  const [selectFilterImage, setSelectFilterImage] = useState([...props[0]?.items])
  const [showTitle, setShowTitle] = useState(-1)
  const colorOne = theme?.palette?.ihclPalette?.hexOne
  const colorTwo = theme?.palette?.ihclPalette?.hexTwo
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const handleModelClose = () => setVideoPlay(!videoPlay)
  //will remove commented code after  analytics events got signoff
  // const context = useContext(IHCLContext)
  // const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  // const dataLayer = MemberDataLayer(userStore, gaStoreData)
  // const handleCountry = (title: any, index: number) => {
  //   triggerEvent({
  //     action: "countrySelected",
  //     params: {
  //       ...dataLayer,
  //       index: index,
  //       buttonLinkName: title?.[0],
  //       link_text: title?.[0],
  //       link_url: "",
  //       eventType: "",
  //       eventName: "",
  //       eventPlace: "",
  //       eventTicketsQty: "",
  //       eventDate: "",
  //       destinationSelected: title?.[0],
  //       fucntionDate: "",
  //       isFlexibe: "",
  //       isGuestRooms: "",
  //       currenctLocation: "",
  //       country: title?.[0],
  //       clientId: getCookie("_ga")?.slice(6),
  //       item_name: title?.[0] || "",
  //       item_type: props?.[index]._type,
  //       location: title?.[0],
  //       no_of_items: analyticsData?.items?.length,
  //       widget_title: analyticsData?.heading,
  //       widget_type: analyticsData?._type,
  //       widget_description: "",
  //       widget_position: "",
  //       outbound: false,
  //       specialCode: "",
  //     },
  //   })
  // }
  return (
    <>
      <ButtonsBox>
        {props?.map((item: any, index: number) => (
          <StyledButton
            key={index}
            variant="light-outlined"
            onClick={() => {
              setSelectedIndex(index - 1),
                setCountToShowCards(numberOfCards),
                setSelectFilterImage(item?.items),
                setSelectCountry(
                  isMobile ? item?.title?.mobileTitle || item?.title?.desktopTitle : item?.title?.desktopTitle,
                )
              //will remove commented code after  analytics events got signoff
              // handleCountry(
              //   isMobile
              //     ? item?.title?.mobileTitle || item?.title?.desktopTitle
              //     : item?.title?.desktopTitle,
              //   index
              // )
            }}
            sx={{
              color: index == selectedIndex + 1 ? colorOne : "",
              backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
              "&:hover": {
                color: index == selectedIndex + 1 ? colorOne : "",
                backgroundColor: index == selectedIndex + 1 ? colorTwo : "",
              },
            }}>
            {isMobile ? item?.title?.mobileTitle || item?.title?.desktopTitle : item?.title?.desktopTitle}
            {!alternateAllLinks?.[0]?.title && ` (${item?.items?.length})`}
          </StyledButton>
        ))}
      </ButtonsBox>
      {/* <ActionBox
        onClick={() => setCountToShowCards(countToShowCards + numberOfCards)}>
        <SelectCountryTypography variant="link-m">
          {CONSTANTS?.EXPLORE} {selectCountry}
        </SelectCountryTypography>
        <ChevronRightIconStyled />
      </ActionBox> */}
      {alternateAllLinks?.[0]?.title && (
        <AlternateAllLinksWrappingBox>
          <RenderActionItem
            url={alternateAllLinks?.[0]?.url}
            title={`${alternateAllLinks?.[0]?.title} ${selectCountry}`}
            navigationType={alternateAllLinks?.[0]?.urlType}
            variant={alternateAllLinks?.[0]?.variant}
            isActionButtonType={false}
          />
        </AlternateAllLinksWrappingBox>
      )}

      <Grid container rowGap={"2.083vw"} justifyContent={"center"} columnGap={"2.083vw"} sx={{ marginTop: "3.125vw" }}>
        {selectFilterImage?.slice(0, countToShowCards)?.map((item: any, index: number) => (
          <Grid
            key={index}
            item
            xl={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
            lg={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
            md={item.largeVariant === "ihcl.core.card.social-media-card-image" ? 3.76 : 1.72}
            sm={isMobile ? 6 : item.largeVariant === "ihcl.core.card.social-media-card-image" ? 4 : 1.72}
            xs={10}>
            <CardsBox
              sx={{
                cursor: "pointer",
                position: isMobile ? "unset" : "relative",
              }}
              onClick={() => {
                navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
                item?.mediaType === "video" && setVideoPlay(!videoPlay)
              }}
              onMouseEnter={() => setShowTitle(index)}
              onMouseLeave={() => setShowTitle(-1)}>
              <>
                {item?.mediaType === "video" && videoPlay ? (
                  item?.videoAsset?.videoPlay?.asset?._ref && (
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
                    {item?.largeImage?.asset?._ref && (
                      <Box
                        width={"100%"}
                        height={isMobile ? "auto" : DesktopPxToVw(155)}
                        loading="lazy"
                        component="img"
                        alt="award-image"
                        sx={{ objectFit: "cover" }}
                        src={getOptimizeImageUrl(urlFor(item?.largeImage?.asset?._ref)?.url(), 3)}
                      />
                    )}
                  </>
                )}
              </>
              {item?.title && index === showTitle && (
                <Box
                  sx={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                  }}>
                  <TitleMainBox>
                    <Typography variant="heading-xs" sx={{ color: theme?.palette?.ihclPalette?.hexOne }}>
                      {item?.title}
                    </Typography>
                  </TitleMainBox>
                </Box>
              )}
            </CardsBox>
          </Grid>
        ))}
      </Grid>

      {selectFilterImage?.length > countToShowCards && (
        <ActionGrid item lg={12} xl={12}>
          <ActionBox onClick={() => setCountToShowCards(countToShowCards + numberOfCards)}>
            <Typography variant="link-m">{CONSTANTS?.LOAD_MORE}</Typography>
            <ExpandMoreIconStyled sx={{ fontSize: "1.2vw" }} />
          </ActionBox>
        </ActionGrid>
      )}
    </>
  )
}

export default GroupWithFilterCards
