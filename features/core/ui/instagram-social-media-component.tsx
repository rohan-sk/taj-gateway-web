import { PathType } from "../../../types"
import { getClient, urlFor } from "../../../lib-sanity"
import React, { Fragment, useContext, useEffect, useState } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { CONSTANTS } from "../../../components/constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { fetchBrandData } from "../../../utils/fetchRoomData"
import { ActionProps, ImageProps } from "../../../components"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { SocialIconBox } from "../../../components/card/styles/multi-cards"
import { handler as SocialMediaHandler } from "../api/handlers/social-media-feed.service"
import {
  LoadMoreWrapper,
  WebLoadMoreWrapper,
  WebExpandMoreWrapper,
  MobileLoadMoreWrapper,
  SocialMediaCardWrapper,
  MobileExpandMoreWrapper,
} from "./instagram-social-media-component-styles"
import SocialContentTitle from "../../../components/hoc/title/social-content-title.component"
import { groq } from "next-sanity"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { SocialContentPrimaryActionButton } from "../../../components/hoc/title/styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore } from "../../../store"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"
import { hotelRoute } from "../../property/ui/constants"

type MultiCardItems = {
  title: string
  logo: ImageProps
  image: ImageProps
  largeImage: ImageProps
  primaryAction: ActionProps
}

const InstagramSocialMediaComponent = ({
  logo,
  primaryAction,
  aesthetic,
  brandId,
  title,
  description,
  charactersLimit,
  isHidden,
}: any) => {
  const router = useRouter()
  const [posts, setPosts] = useState<any>([])
  const [sectionData, setSectionData] = useState<any>()

  const [countToShowCards, setCountToShowCards] = useState<number>(
    CONSTANTS?.EIGHT
  )
  const [countToShowMobileCards, setCountToShowMobileCards] = useState<number>(
    CONSTANTS?.FOUR
  )
  function addMonths(date: any, months: any) {
    date.setMonth(date.getMonth() + months)
    return date
  }
  const currentDate = new Date()
  const sixMonthsFromToday = addMonths(new Date(), -6)
  const Context = useContext(IHCLContext)
  const propertyStore = Context?.getGlobalStore(
    GLOBAL_STORES?.propertyStore
  ) as PropertyStore
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex(
    (route: any) => route === hotelRoute
  )

  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  useEffect(() => {
    async function fetchData() {
      if (global?.window !== undefined) {
        let urlParams = new URLSearchParams(global?.window?.location?.search)
        const currentHotelId =
          hotelRouteIndex === 1
            ? propertyStore?.propertyData?.hotelId || urlParams?.get("hotelId")
            : urlParams?.get("hotelId")
        const hotelBrandData: any =
          currentHotelId !== null ? await fetchBrandData(currentHotelId) : {}
        if (hotelBrandData?.hotelSocialInfo) {
          setSectionData({
            title: hotelBrandData?.hotelSocialInfo?.sectionTitle,
            subTitle: hotelBrandData?.hotelSocialInfo?.description,
            secondaryAction: primaryAction,
            instagramHandle: hotelBrandData?.hotelSocialInfo?.socialHandle,
            charactersLimit: charactersLimit,
          })
        } else {
          setSectionData({
            title: { desktopTitle: [title] },
            subTitle: description,
            secondaryAction: primaryAction,
            instagramHandle: primaryAction?.url,
            charactersLimit: charactersLimit,
          })
        }
        const response = await SocialMediaHandler.apiCall(
          `${Math.floor(sixMonthsFromToday.getTime() / 1000.0)}` ||
            "1686549201",
          `${Math.floor(currentDate.getTime() / 1000.0)}` || "1689314001",
          currentHotelId !== null ? hotelBrandData?.brandId : brandId || "801"
        )
        if (!response?.error) {
          let filtertedData = response?.data?.data?.filter(
            (item: any) =>
              item?.attachmentMetadata?.mediaContents?.[0]?.thumbUrl
          )
          if (filtertedData?.length > 0) {
            setPosts(filtertedData?.slice(0, 8))
          }
        }
      }
    }
    if (!isHidden) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryAction])
  return (
    <>
      {posts?.length > 0 && !isHidden && (
        <Box
          sx={{
            background: aesthetic?.isGradientEnabled
              ? `${aesthetic?.gradient}`
              : aesthetic?.backgroundColor?.hex,
            padding: isMobile
              ? aesthetic?.padding?.mobile
              : aesthetic?.padding?.desktop,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}>
          <SocialContentTitle {...sectionData} />
          <Grid container spacing={isMobile ? "4.21vw" : "2.083vw"}>
            {posts
              ?.slice(0, isMobile ? countToShowMobileCards : countToShowCards)
              ?.map((item: any, index: number) => (
                <Fragment key={index}>
                  {item?.attachmentMetadata?.mediaContents?.[0]?.thumbUrl && (
                    <Grid
                      key={index}
                      item
                      xs={6}
                      sm={isMobile ? 6 : 3}
                      md={3}
                      lg={3}
                      xl={3}>
                      <SocialMediaCardWrapper
                        sx={{
                          backgroundImage:
                            item?.attachmentMetadata?.mediaContents?.[0]
                              ?.thumbUrl &&
                            `url(
                              ${item?.attachmentMetadata?.mediaContents?.[0]?.thumbUrl}
                           )`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          height: isMobile
                            ? MobilePxToVw(225)
                            : DesktopPxToVw(330),
                        }}
                        // commented as per the discussion with tarun
                        // onClick={() => {
                        //   navigate(item?.redirectionURL, PathType?.external)
                        // }}
                      >
                        <SocialIconBox>
                          <Box
                            width={"100%"}
                            height={"100%"}
                            component={"img"}
                            alt={"social-media-icon"}
                            src={
                              logo?.asset?._ref
                                ? urlFor(logo?.asset?._ref).url()
                                : `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/7084a72ab5fabe7411995381efe17e3f411dae7a-20x20.png`
                            }
                          />
                        </SocialIconBox>
                      </SocialMediaCardWrapper>
                    </Grid>
                  )}
                </Fragment>
              ))}
          </Grid>
          {sectionData?.secondaryAction && isMobile && (
            <SocialContentPrimaryActionButton
              variant={"light-outlined"}
              onClick={() =>
                navigate(
                  sectionData?.instagramHandle ||
                    sectionData?.secondaryAction?.url,
                  PathType?.external || sectionData?.secondaryAction?.urlType
                )
              }>
              {sectionData?.secondaryAction?.image && (
                <Box
                  width={MobilePxToVw(22)}
                  alt={`top-img`}
                  component={"img"}
                  src={urlFor(sectionData?.secondaryAction?.image).url()}
                />
              )}

              {sectionData?.secondaryAction?.title}
            </SocialContentPrimaryActionButton>
          )}
        </Box>
      )}
    </>
  )
}

export default observer(InstagramSocialMediaComponent)
