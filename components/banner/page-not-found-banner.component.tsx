import React, { useState } from "react"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { Box } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const GoToDown = dynamic(() => import("./back-to-down-component"))
const SearchModal = dynamic(() => import("../modal/search-modal.component"))
import { useAppNavigation } from "../../utils/NavigationUtility"
import { TopGradientBox, BottomItemsBox, BottomGradientBox, StyledInputBase } from "./styles"
import {
  ContentBox404,
  TitleTypography,
  BannerActionBox,
  ActionItemTypography,
  PageNotFoundContainerBox,
  BackToHomePageArrowBackIos,
  PageNotFoundSubTitleTypography,
} from "./styles/404-banner"
import {
  GlobalSearchBarMicIconBox,
  GlobalSearchBarPaper,
  GlobalSearchBarSearchIconBox,
} from "../SearchBar/StyledComponets/global-search-bar-component-styles"

const PageNotFoundBanner = (props: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  const chatBot = props?.chatBot?.image?.asset?._ref
  const bannerImage = isMobile
    ? props?.imageAsset?.image?.[0]?.asset?._ref
    : props?.imageAsset?.largeImage?.[0]?.asset?._ref
  const [fromMic, setFromMic] = useState<boolean>(false)
  const [openModel, setOpenModel] = useState<boolean>(false)
  const handleOpenMic = () => {
    setFromMic(true)
  }
  const handleModelOpening = () => (openModel === true ? setOpenModel(false) : setOpenModel(true))

  return (
    <PageNotFoundContainerBox>
      <Box
        sx={{
          position: "relative",
        }}>
        {bannerImage && (
          <Box
            alt={
              (isMobile ? props?.imageAsset?.image?.[0]?.altText : props?.imageAsset?.largeImage?.[0]?.altText) ||
              `bannerImage`
            }
            width={"100%"}
            height={"100%"}
            loading={"lazy"}
            component={"img"}
            src={urlFor(bannerImage).url()}
          />
        )}
        <TopGradientBox
          sx={{
            height: "40% !important",
          }}
        />
        <BottomGradientBox
          sx={{
            background: "linear-gradient(180deg, rgba(56, 56, 56, 0) 0%, #13130F 100%) !important",
          }}
        />
      </Box>
      <ContentBox404>
        {props?.title &&
          (isMobile ? (
            <TitleTypography variant={"m-heading-s"}>{props?.title?.mobileTitle}</TitleTypography>
          ) : (
            <TitleTypography variant={"heading-s"}>{props?.title?.desktopTitle}</TitleTypography>
          ))}
        {props?.subTitle && (
          <PageNotFoundSubTitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
            {props?.subTitle}
          </PageNotFoundSubTitleTypography>
        )}

        {props?.primaryAction?.title && (
          <BannerActionBox onClick={() => navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)}>
            <BackToHomePageArrowBackIos />
            <ActionItemTypography variant={isMobile ? "m-text-link" : "link-m"}>
              {props?.primaryAction?.title}
            </ActionItemTypography>
          </BannerActionBox>
        )}
        {!isMobile && <GoToDown />}
      </ContentBox404>
      {!isMobile && (
        <BottomItemsBox sx={{ padding: "0vw 12.5vw" }}>
          <Box
            sx={{
              width: "87.5vw",
            }}
            onClick={() => handleModelOpening()}>
            <GlobalSearchBarPaper component="form">
              <GlobalSearchBarSearchIconBox
                alt={`search-icon`}
                loading={"lazy"}
                component={"img"}
                src={ICONS?.GLOBAL_SEARCH_ICON}
              />
              <StyledInputBase readOnly placeholder={props?.placeholderText} />
              <GlobalSearchBarMicIconBox
                alt={`mic-img`}
                loading={"lazy"}
                component={"img"}
                src={ICONS?.GLOBAL_SEARCH_MIC_ICON}
                onClick={() => handleOpenMic()}
              />
            </GlobalSearchBarPaper>
          </Box>
          {chatBot && (
            <Box sx={{ p: "0 5vw 0 3.2vw" }}>
              <Box
                loading={"lazy"}
                component={"img"}
                alt={"chatBot-img"}
                src={urlFor(chatBot).url()}
                sx={{ height: "4.16vw", width: "4.16vw", cursor: "pointer" }}
              />
            </Box>
          )}
        </BottomItemsBox>
      )}
      {(openModel || fromMic) && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          open={openModel}
          bgcolor={""}
          ModalCloseButtonColor={theme?.palette?.background?.paper}
          handleClose={() => {
            handleModelOpening()
            fromMic && setFromMic(false)
          }}
          CloseIcon={ICONS?.CLOSE_WHITE_ICON}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          Component={
            <SearchModal
              handleClose={() => {
                handleModelOpening()
                fromMic && setFromMic(false)
              }}
              fromMic={fromMic}
              props={props}
            />
          }
        />
      )}
    </PageNotFoundContainerBox>
  )
}

export default PageNotFoundBanner
