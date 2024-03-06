import React, { useContext } from "react"
import { PathType } from "../types"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { Box, Collapse, Grid, Stack, Typography } from "@mui/material"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  ParentBox,
  StyledDivider,
  ActionItemBox,
  WhiteBgColorBox,
  YellowBgColorBox,
  VerticalAlignmentBox,
  StyledChevronDown,
  StyledChevronLeft,
} from "./styles/mobile-main-menu"
import { MegaMenuBorderGrid } from "./styles"
import { urlFor } from "../../lib-sanity"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { ageFromDOB } from "../../utils/getDate"
import { UseAddress } from "../../utils/hooks/useAddress"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../utils/isMobilView"
import { GAStore, UserStore } from "../../store"
import { getCookie } from "../../utils/cookie"
import { GLOBAL_STORES } from "../../utils/Constants"
import { triggerEvent } from "../../utils/analytics"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { AFFILIATION } from "../../features/booking/constants"
import { TAJ_HOTELS, PAGE_LANG } from "../../utils/analytics/constants"

const MobileMainMenu = ({
  appRef,
  megaMenuData,
  dropDownListItems,
  handleHamBurgerClick,
  setOpenRewards,
  openRewards,
  rewardsData,
  headerData,
}: any) => {
  const router = useRouter()
  const navigate = useAppNavigation()
  const primaryDisplayItems = megaMenuData?.slice(0, 5)
  const secondaryDisplayItems = megaMenuData?.slice(6, megaMenuData?.length)
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const isLoggedIn = useLoggedIn()
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const handleMoreClick = (url: any, urlType: PathType | undefined) => {
    if (url?.length > 0) {
      navigate(url, urlType)
      handleHamBurgerClick()
    }
  }
  const dropDownTitle = rewardsData?.title
  const getHeight = () => {
    const appBarHeight = Number(appRef?.current?.clientHeight)
    const windowHeight = Number(global?.window?.innerHeight)
    return `${windowHeight - appBarHeight}px`
  }
  const handleEnquiry = (router: any, url: string, item: any) => {
    triggerEvent({
      action: "TopNavigationBar_Clicked",
      params: {
        ...dataLayer,
        pageTitle: url?.replace("/", "").toUpperCase(),
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        location: "",
        eventType: "",
        arrival_date: "",
        departure_date: "",
        LoggedIN: isLoggedIn ? "LoggedIn" : "Not LoggedIn",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        visitSource: "",
        buttonLinkName: item?.title,
        clientId: getCookie("_ga")?.slice(6),
        linkUrl: item?.url,
        outbound: item?.urlType === PathType?.internal ? false : true,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` + `"${PAGE_LANG}",` + `"${AFFILIATION}",` + `"${url?.replace("/", "").toUpperCase()}"]`,
        ),
        pageSection: headerData?.[0]?.title,
        widget_title: headerData?.[0]?.title,
        widget_type: headerData?.[0]?._type,
        link_url: url,
        link_text: item?.title,
        journey_type: !isLoggedIn && item?.title === "LOGIN / JOIN" ? "LogIn" : "",
      },
    })
  }

  return (
    <ParentBox $height={getHeight()} aria-label="mobile-menu">
      <WhiteBgColorBox>
        <Box sx={{ padding: "4.1vw 0vw 0vw 8.43vw" }}>
          {primaryDisplayItems?.map((item: any, index: number) => (
            <>
              <VerticalAlignmentBox
                key={index}
                $isDropDown={item?.title?.toUpperCase()?.includes(dropDownTitle)}
                onClick={() => {
                  if (item?.title?.toUpperCase()?.includes(dropDownTitle)) {
                    setOpenRewards(!openRewards)
                  } else {
                    navigate(item?.url, item?.urlType)
                    handleHamBurgerClick()
                  }
                  handleEnquiry(router, item?.url, item)
                }}>
                <Typography
                  variant="m-body-xl"
                  sx={{
                    color: theme?.palette?.neuPalette?.hexTwo,
                    fontSize: "4.688vw",
                  }}>
                  {item?.title}
                </Typography>
                {item?.title?.toUpperCase()?.includes(dropDownTitle) && (
                  <StyledChevronDown $openRewards={openRewards} />
                )}
              </VerticalAlignmentBox>
              {item?.title?.toUpperCase()?.includes(dropDownTitle) && (
                <Collapse in={openRewards}>
                  <Grid container>
                    {rewardsData?.cta?.map((item: any, index: number) => (
                      <Grid item key={index} xs={6}>
                        {item?.title && (
                          <Stack
                            onClick={() => {
                              navigate(item?.url, item?.urlType)
                              setOpenRewards(false)
                              handleHamBurgerClick()
                            }}
                            flexDirection={"row"}>
                            <StyledChevronLeft />
                            <Typography
                              variant="m-body-sxl"
                              pt={MobilePxToVw(10)}
                              pb={MobilePxToVw(10)}
                              sx={{
                                color: theme?.palette?.neuPalette?.hexTwo,
                                textAlign: "center",
                              }}>
                              {item?.title}
                            </Typography>
                          </Stack>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              )}
            </>
          ))}
        </Box>
        <Box sx={{ padding: "0vw 0vw 6.40vw 8.43vw" }}>
          {secondaryDisplayItems?.map((item: any, index: number) => (
            <VerticalAlignmentBox key={index}>
              <Typography
                variant="m-body-ml"
                sx={{
                  color: theme?.palette?.neuPalette?.hexTwo,
                  lineHeight: "200%",
                  fontSize: item?.image ? "3.438vw" : "4.688vw",
                }}
                onClick={() => {
                  navigate(item?.url, item?.urlType)
                  handleHamBurgerClick()
                }}>
                {item?.image?.asset?._ref && (
                  <Box
                    alt={`${item?.title}-img`}
                    loading="lazy"
                    component={"img"}
                    src={urlFor(item?.image?.asset?._ref).url()}
                    sx={{
                      marginRight: MobilePxToVw(12),
                    }}
                  />
                )}
                {item?.title}
              </Typography>
            </VerticalAlignmentBox>
          ))}
        </Box>
      </WhiteBgColorBox>
      <YellowBgColorBox>
        {dropDownListItems?.title && (
          <Typography variant="m-heading-s" color={theme?.palette?.neuPalette?.hexOne}>
            {dropDownListItems?.title}
          </Typography>
        )}
        {dropDownListItems?.subtitle && (
          <Typography variant="m-body-l" color={theme?.palette?.neuPalette?.hexOne}>
            {dropDownListItems?.subtitle}
          </Typography>
        )}
        {dropDownListItems?.cta?.title && (
          <ActionItemBox onClick={handleHamBurgerClick}>
            <RenderActionItem
              url={dropDownListItems?.cta?.url}
              title={dropDownListItems?.cta?.title}
              navigationType={dropDownListItems?.cta?.urlType}
              variant={dropDownListItems?.cta?.variant}
              isActionButtonType={false}
              linkStyles={{ color: theme?.palette?.neuPalette?.hexOne }}
              iconStyles={{
                color: `${theme?.palette?.neuPalette?.hexOne} !important`,
              }}
            />
          </ActionItemBox>
        )}
      </YellowBgColorBox>
    </ParentBox>
  )
}

export default MobileMainMenu
