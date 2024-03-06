import { useContext, useMemo, useState, useEffect } from "react"
import { ImageProps } from "../types"
import { CONSTANTS } from "./constants"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { useRouter } from "next/router"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, Typography, ClickAwayListener, Link } from "@mui/material"
import {
  InnerBox,
  ParentBox,
  CopyTextBox,
  ShareImgBox,
  HotelNameBox,
  HotelInfoBox,
  StyledButton,
  ShareTextBox,
  StyledDivider,
  HotelImageBox,
  HotelLinkTypo,
  SocialShareBox,
  SocialIconsBox,
  StyledTextField,
  StyledClearIcon,
  SharePopUpMainBox,
  StyledClearIconBox,
  SocialContentMainBox,
  ShareTheProductTitle,
  ShareSocialImagesData,
  ShareTitleTypography,
  BreadCrumbsTypography,
  BreadcrumbsWrappingBox,
  PageTitleShare,
} from "./styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { OffersStore, PropertyStore } from "../../store"
import { observer } from "mobx-react-lite"
import { BREADCRUMB_CONSTANTS } from "../constants"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { globalOffersRoute, tajHolidaysThemeDetailsRoute } from "../../features/property/ui/constants"

interface ShareModalProps {
  title: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  mediaIcons: MediaIconItems[]
  backgroundColor?: BGColor
  pageBackgroundImage?: any
}

type BGColor = {
  hex?: string
}

type MediaIconItems = {
  url: string
  image: ImageProps
  title: string
}

const Share = ({
  title,
  image,
  largeImage,
  description,
  mediaIcons,
  backgroundColor,
  pageBackgroundImage,
}: ShareModalProps) => {
  const IHCLContexts = useContext(IHCLContext)
  const propertyStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const offerStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const router = useRouter()
  const isMobile = useMobileCheck()
  const activePath = global?.window?.location?.href
  const routerArr = router?.asPath?.split("/")
  const globalOffersRouteIndex = routerArr?.findIndex((route: any) => route === globalOffersRoute)
  const isGlobalOffersDetailsPage = globalOffersRouteIndex === 1
  const isTajHolidaysThemeDetailsRoute = router?.asPath?.includes(tajHolidaysThemeDetailsRoute)

  const [open, setOpen] = useState<boolean>(false)
  const [linkCopy, setLinkCopy] = useState<boolean>(false)

  const handleClick = (url: string, title: string, description: string) => {
    url &&
      global?.window?.open(
        url + encodeURIComponent(`${description ? description : ""}\n${title ? title : "Checkout:"} ${activePath}`),
      )
  }
  const [displayTitle, setDisplayTitle] = useState<any>("")
  const [displayImage, setDisplayImage] = useState<any>("")
  const [hotelImage, setHotelImage] = useState<any>()

  const handleOpenSharePopUp = () => {
    setOpen(true)
    setLinkCopy(false)
  }
  const handleCloseSharePopUp = () => setOpen(false)
  const filteredPaths = ["experiences", "incredible-escapes"]
  const isFilteredSubPathExist = (arr: string[], subPath: string): boolean => {
    return arr?.some((item: string) => item?.toLocaleLowerCase() === subPath?.toLocaleLowerCase())
  }

  // this is the same "generateBreadcrumbs" function, but placed
  // inside a "useMemo" call that is dependent on "router.asPath"
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const { asPath, query } = router
      const asPathWithoutQuery = router.asPath.split("?")[0]
      let asPathNestedRoutes = asPathWithoutQuery.split(/\/|\?/).filter((v) => v.length > 0)
      if (asPathNestedRoutes?.findIndex((item: any) => item?.toLocaleLowerCase() === "taj-holidays") > -1) {
        asPathNestedRoutes = asPathNestedRoutes?.filter((item: any) => !isFilteredSubPathExist(filteredPaths, item))
      }

      const loc =
        typeof location !== "undefined"
          ? {
              query: Object.fromEntries(new URLSearchParams(location.search)),
              pathname: location?.pathname?.split("/en-in")?.[1],
            }
          : {
              query,
              pathname: asPath?.split("/en-in")?.[1],
            }

      let asPathParts = loc.pathname?.split(/\/|\?/)
      if (asPathParts?.findIndex((item: any) => item?.toLocaleLowerCase() === "taj-holidays") > -1) {
        asPathParts = asPathParts?.filter((item: any) => !isFilteredSubPathExist(filteredPaths, item))
      }
      const crumblist = asPathParts?.map((subpath: any, idx: number) => {
        const href =
          subpath === "destination" ? "destinations" : subpath !== "" ? asPathNestedRoutes.slice(0, idx).join("/") : ""
        return { href, text: subpath === "" ? "Home" : subpath }
      })

      return crumblist ? [...crumblist] : []
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  )
  useEffect(() => {
    if (propertyStore?.propertyData?.hotelOverview?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0])
      setHotelImage(propertyStore?.propertyData?.hotelOverview?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0])
    else {
      setHotelImage(largeImage)
    }
  }, [largeImage, propertyStore])

  useEffect(() => {
    const fetchData = async () => {
      var metaTag = global?.window?.document?.getElementsByTagName("meta")
      var h1 = global?.window?.document?.getElementsByTagName("h1")
      var h2 = global?.window?.document?.getElementsByTagName("h2")
      var title = global?.window?.document?.title
        ? global?.window?.document?.title
        : h1?.[0]?.outerText
        ? h1?.[0]?.outerText
        : h2?.[0]?.outerText
      var image
      for (var i = 0; i < metaTag?.length; i++) {
        if (metaTag[i]?.name === "image") {
          image = metaTag?.[i]?.content
        }
      }
      setDisplayTitle(title)
      setDisplayImage(image)
    }
    fetchData()
  }, [])

  const returnCrumb = (index: any, text: any) => {
    return (
      <BreadCrumbsTypography
        variant={isMobile ? "m-body-l" : "body-s"}
        sx={{
          color: pageBackgroundImage ? theme?.palette?.ihclPalette?.hexOne : theme?.palette?.ihclPalette?.hexSeventeen,
        }}
        $isMobile={isMobile}>
        {`
           ${
             BREADCRUMB_CONSTANTS?.[text?.replace(/-/g, "_")?.toUpperCase()]
               ? BREADCRUMB_CONSTANTS?.[text?.replace(/-/g, "_")?.toUpperCase()]?.replace(/ and /gi, " & ")
               : text.replace(/-/g, " ").replace(/ and /gi, " & ")
           }`}
      </BreadCrumbsTypography>
    )
  }

  // Each individual "crumb" in the breadcrumbs list
  function Crumb({ text, href, last = false, index }: any) {
    // All other crumbs will be rendered as links that can be visited
    return (
      <>
        {last ? (
          returnCrumb(index, router?.asPath?.includes("vouchers") ? decodeURIComponent(text) : text)
        ) : (
          <>
            <Link underline="hover" color="inherit" href={`/en-in/${href}`}>
              {returnCrumb(index, text)}
            </Link>
            <Typography
              component={"span"}
              sx={{
                fontSize: isMobile ? `${MobilePxToVw(16)}` : `${DesktopPxToVw(16)}`,
                margin: isMobile ? "0vw 0vw 0vw 1vw" : "0vw 0vw 0vw 0.25vw",
                color: pageBackgroundImage
                  ? theme?.palette?.ihclPalette?.hexOne
                  : theme?.palette?.ihclPalette?.hexSeventeen,
                opacity: "0.7",
              }}>
              /
            </Typography>
          </>
        )}
      </>
    )
  }
  return (
    <>
      <ParentBox
        aria-label="share-modal"
        sx={{
          backgroundColor: backgroundColor?.hex,
        }}>
        <ClickAwayListener onClickAway={handleCloseSharePopUp}>
          <InnerBox>
            {open && (
              <>
                <SharePopUpMainBox>
                  {/* cross icon */}
                  <StyledClearIconBox>
                    <StyledClearIcon fontSize={"medium"} onClick={handleCloseSharePopUp} />
                  </StyledClearIconBox>
                  {title && (
                    <SocialShareBox>
                      <ShareTheProductTitle variant={isMobile ? "m-heading-xs" : "heading-s"}>
                        {title}
                      </ShareTheProductTitle>
                    </SocialShareBox>
                  )}
                  <Box marginRight={isMobile ? "2.03vw" : "0.68vw"}>
                    <StyledDivider />
                    <HotelInfoBox>
                      {(displayImage || hotelImage?.asset?._ref) && (
                        <HotelImageBox>
                          <Box
                            width="100%"
                            height="100%"
                            component="img"
                            sx={{ objectFit: "cover" }}
                            src={displayImage || urlFor(hotelImage?.asset?._ref).url()}
                          />
                        </HotelImageBox>
                      )}
                      <HotelNameBox>
                        <HotelLinkTypo variant={isMobile ? "m-body-xs" : "body-xs"}>
                          {global?.window?.location?.host}
                        </HotelLinkTypo>
                        <PageTitleShare
                          variant={isMobile ? "m-body-l" : "body-ml"}
                          sx={{ color: theme?.palette?.primary?.main }}>
                          {displayTitle || propertyStore?.propertyData?.hotelName || CONSTANTS?.TAJ_HOTEL_NAME}
                        </PageTitleShare>
                      </HotelNameBox>
                    </HotelInfoBox>
                    <StyledDivider />
                  </Box>
                  <SocialContentMainBox>
                    <Typography variant={isMobile ? "m-body-s" : "body-l"}>{CONSTANTS?.SHARE_LINK_TEXT}</Typography>
                    <ShareSocialImagesData>
                      {mediaIcons?.map((item: MediaIconItems, index: number) => {
                        return (
                          <SocialIconsBox
                            key={index}
                            onClick={() => {
                              handleClick(
                                item?.url,
                                item?.title,
                                isGlobalOffersDetailsPage || isTajHolidaysThemeDetailsRoute
                                  ? `${global?.window?.location?.host}: ${offerStore?.offersData?.title}: ${offerStore?.offersData?.description}`
                                  : description,
                              )
                            }}>
                            {item?.image?.asset?._ref && (
                              <Box
                                sx={{
                                  display: "grid",
                                  placeItems: "center",
                                }}>
                                <Box
                                  width="100%"
                                  height="100%"
                                  component="img"
                                  src={urlFor(item?.image?.asset?._ref).url()}
                                  sx={{ objectFit: "fill" }}
                                />
                              </Box>
                            )}
                          </SocialIconsBox>
                        )
                      })}
                    </ShareSocialImagesData>
                  </SocialContentMainBox>
                  <CopyTextBox>
                    <Typography variant={isMobile ? "m-body-s" : "body-l"}>{CONSTANTS?.COPY_LINK_TEXT}</Typography>
                    <StyledTextField
                      value={activePath}
                      InputProps={{
                        style: {
                          margin: 0,
                          padding: 0,
                          borderRadius: 0,
                          position: "relative",
                          height: isMobile ? "7.65vw" : "2.55vw",
                          paddingLeft: isMobile ? "0.625vw" : "0.20vw",
                        },
                        endAdornment: (
                          <StyledButton
                            onClick={() => {
                              navigator.clipboard.writeText(activePath)
                              setLinkCopy(true)
                            }}>
                            {linkCopy ? CONSTANTS?.COPIED : CONSTANTS?.COPY}
                          </StyledButton>
                        ),
                      }}
                    />
                  </CopyTextBox>
                </SharePopUpMainBox>
              </>
            )}
            <BreadcrumbsWrappingBox>
              <Box sx={{ textAlign: "end" }}>
                {breadcrumbs?.map((crumb, idx) => (
                  <Crumb {...crumb} key={idx} last={idx === breadcrumbs?.length - 1} index={idx} />
                ))}
              </Box>
              <ShareTextBox>
                {image?.asset?._ref && (
                  <ShareImgBox>
                    <Box component="img" width={"100%"} height={"100%"} src={urlFor(image?.asset?._ref).url()} />
                  </ShareImgBox>
                )}
                {title && (
                  <ShareTitleTypography
                    variant={isMobile ? "m-body-s" : "body-s"}
                    sx={{
                      color: pageBackgroundImage
                        ? theme?.palette?.ihclPalette?.hexOne
                        : theme?.palette?.ihclPalette?.hexSeventeen,
                    }}
                    onClick={handleOpenSharePopUp}>
                    {title}
                  </ShareTitleTypography>
                )}
              </ShareTextBox>
            </BreadcrumbsWrappingBox>
          </InnerBox>
        </ClickAwayListener>
      </ParentBox>
    </>
  )
}
export default observer(Share)
