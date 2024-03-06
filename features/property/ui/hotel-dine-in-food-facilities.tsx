import React, { useContext } from "react"
import { fonts, theme } from "../../../lib/theme"
import { getVideoUrl, urlFor } from "../../../lib-sanity"
import { Grid, Box, Divider, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  LargeVerticalDivider,
  BlocksPortableTextBox,
  LargeHorizontalDivider,
  HotelInfoTitleTypography,
  ItemTitleWrapperContainer,
  FacilityTitle,
  FacilityTitleContainer,
  FacilityCell,
  ActionsStack,
} from "../../../components/group/styles/group-with-facilities-styles"
import { gridBreakPointsGenerator } from "../../../components/card/SearchResultCards/search-card.component"
import { CONSTANTS, ICONS } from "../../../components/constants"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import useLocation from "../../../utils/hooks/useLocation"
import { useBrowserCheck } from "../../../utils/hooks/useBrowserCheck"
import dynamic from "next/dynamic"
interface childrenItems {
  text: string
  _type: string
}
interface blockContentItems {
  children: childrenItems[]
  style: string
  _type: string
}
interface menuItemsList {
  blockContent: blockContentItems[]
}
interface listItems {
  item: string
}
interface FoodTimingFacilitiesItems {
  title: string
  _type: string
  icon: LogoItems
  identifier: string
  isHotelInfo: boolean
  menuItems: menuItemsList[]
  list: listItems[]
  showDividerForBorder: boolean
}
interface AssetItems {
  _ref: string
  _type: string
}
interface LogoItems {
  asset: AssetItems
}
interface AddressInfo {
  city: string
  state: string
  country: string
  pincode: number
  latitude: string
  longitude: string
  addressLine1: string
  type: string
}
interface FoodTimingFacilitiesProps {
  props: FoodTimingFacilitiesItems[]
  address: AddressInfo
  contactInfo: string
  menuInfo: any
}
const HotelDineInFoodFacilities = ({ props, address, contactInfo, menuInfo }: FoodTimingFacilitiesProps) => {
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const getLocation = useLocation()
  const facilitiesInfo = props?.slice(0, props?.length - CONSTANTS?.THREE)
  const { isIos } = useBrowserCheck()

  if (menuInfo?.file?.asset?._ref) facilitiesInfo?.push(menuInfo)
  const restaurantContact = props?.slice(props?.length - CONSTANTS?.THREE, props?.length)

  let remainingCardsLength = facilitiesInfo?.length - Math?.floor(facilitiesInfo?.length / 3) * 3
  let remainingCardsWidth =
    remainingCardsLength <= 1 ? 12 : (12 - 0.282 * (remainingCardsLength - 1)) / remainingCardsLength
  const redirectToGoogleMaps = async (DestinationLat: string, DestinationLng: string, url: string) => {
    const origin =
      getLocation?.latitude && getLocation?.longitude ? `${getLocation?.latitude},${getLocation?.longitude}` : ""
    const storeLat = DestinationLat || ""
    const storeLng = DestinationLng || ""
    const destination = storeLat && storeLng ? `${storeLat},${storeLng}` : ""
    if (isIos) {
      window.open(`maps://?saddr=${origin}&daddr=${destination}`, "_blank")
    } else {
      window.open(`${url}?api=1&origin=${origin}&destination=${destination}&travelmode=car`, "_blank")
    }
  }
  return (
    <Grid container aria-label="hotel-dine-in-food-facilities">
      <Grid {...gridBreakPointsGenerator(isMobile, 7.93)}>
        <Grid container justifyContent={"space-between"}>
          {facilitiesInfo?.map((item: any, index: number) => {
            switch (item?.identifier) {
              case "menu":
                return isMobile ? (
                  <></>
                ) : (
                  <>
                    <Grid
                      {...gridBreakPointsGenerator(
                        isMobile,
                        facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                          ? index === facilitiesInfo?.length - 1
                            ? facilitiesInfo?.length % 2 === 0
                              ? 6.7
                              : 12
                            : index % 2 === 0
                            ? 5
                            : 6.7
                          : index < Math?.floor(facilitiesInfo?.length / 3) * 3
                            ? 3.812
                            : remainingCardsWidth,
                      )}
                      key={index}>
                      <FacilityCell
                        $isMobile={isMobile}
                        $isBorderRight={
                          facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                            ? (index + 1) % 2 !== 0 && index < facilitiesInfo?.length - 1
                            : (index + 1) % 3 !== 0 && index < facilitiesInfo?.length - 1
                        }
                        $isBorderBottom={isMobile}>
                        <FacilityTitleContainer>
                          <FacilityTitle variant={isMobile ? "m-body-sl" : "body-xxs"}>{item?.title}</FacilityTitle>
                        </FacilityTitleContainer>

                        <ItemTitleWrapperContainer>
                          {item?.file?.asset?._ref && (
                            <>
                              <Box
                                alt={`-img`}
                                loading="lazy"
                                component={"img"}
                                src={urlFor("image-7ac06d18532e980221f7bcb3bbb300029ed9d900-20x20-png").url()}
                                height={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                                width={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                                sx={{
                                  objectFit: "contain",
                                }}
                              />
                              <RenderActionItem
                                url={`${getVideoUrl(item?.file?.asset?._ref)}`}
                                image={""}
                                variant={"light-contained"}
                                title={"DOWNLOAD"}
                                isActionButtonType={false}
                                navigationType={"dialog"}
                                buttonStyles={{
                                  maxWidth: "fit-content",
                                  display: "flex",
                                  gap: "0.521vw",
                                }}
                                onClick={() => {
                                  window?.open(`${getVideoUrl(item?.file?.asset?._ref)}`)
                                }}
                              />
                            </>
                          )}
                        </ItemTitleWrapperContainer>
                      </FacilityCell>
                    </Grid>
                    {!isMobile &&
                      (facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                        ? (index + 1) % 2 === 0 && index + 1 !== facilitiesInfo?.length
                        : (index + 1) % 3 === 0 && index + 1 !== facilitiesInfo?.length) && (
                        <Grid container>
                          <Divider
                            sx={{
                              width: "100%",
                              margin: `${DesktopPxToVw(18)} 0vw`,
                            }}
                            orientation="horizontal"
                          />
                        </Grid>
                      )}
                  </>
                )
              default:
                return (
                  <>
                    <Grid
                      {...gridBreakPointsGenerator(
                        isMobile,
                        facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                          ? index === facilitiesInfo?.length - 1
                            ? facilitiesInfo?.length % 2 === 0
                              ? 6.7
                              : 12
                            : index % 2 === 0
                            ? 5
                            : 6.7
                          : index < Math?.floor(facilitiesInfo?.length / 3) * 3
                          ? 3.812
                          : remainingCardsWidth,
                      )}
                      key={index}>
                      <FacilityCell
                        $isMobile={isMobile}
                        $isBorderRight={
                          facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                            ? (index + 1) % 2 !== 0 && index < facilitiesInfo?.length - 1
                            : (index + 1) % 3 !== 0 && index < facilitiesInfo?.length - 1
                        }
                        $isBorderBottom={isMobile}>
                        <FacilityTitleContainer>
                          <FacilityTitle variant={isMobile ? "m-body-sl" : "body-xxs"}>{item?.title}</FacilityTitle>
                        </FacilityTitleContainer>

                        <ItemTitleWrapperContainer>
                          {item?.icon?.asset?._ref && (
                            <Box
                              loading="lazy"
                              component="img"
                              src={urlFor(item?.icon?.asset?._ref).url()}
                              height={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                              width={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                              sx={{
                                objectFit: "contain",
                              }}
                            />
                          )}
                          {item?.list?.length > 0 && (
                            <Stack flexDirection={"column"}>
                              {item?.list?.map((content: any) => {
                                return (
                                  <BlocksPortableTextBox
                                    key={index}
                                    $Padding={props?.length - (index + 1) < 3}
                                    fontWeight={700}
                                    sx={{
                                      "&, & *": {
                                        color: theme?.palette?.neuPalette?.hexSeventeen,
                                        fontFamily: fonts?.body,
                                        fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                                      },
                                    }}>
                                    {content?.item}
                                  </BlocksPortableTextBox>
                                )
                              })}
                            </Stack>
                          )}
                        </ItemTitleWrapperContainer>
                      </FacilityCell>
                    </Grid>
                    {!isMobile &&
                      (facilitiesInfo?.length == 3 || facilitiesInfo?.length == 4
                        ? (index + 1) % 2 === 0 && index + 1 !== facilitiesInfo?.length
                        : (index + 1) % 3 === 0 && index + 1 !== facilitiesInfo?.length) && (
                        <Grid container>
                          <Divider
                            sx={{
                              width: "100%",
                              margin: `${DesktopPxToVw(18)} 0vw`,
                            }}
                            orientation="horizontal"
                          />
                        </Grid>
                      )}
                  </>
                )
            }
          })}
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid>
          <Box height={"100%"}>
            <Divider
              sx={{
                opacity: 0.2,
                margin: `0vw ${DesktopPxToVw(20)} 0vw ${DesktopPxToVw(15)}`,
                backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
              }}
              orientation="vertical"
            />
          </Box>
        </Grid>
      )}
      <Grid {...gridBreakPointsGenerator(isMobile, 3.75)}>
        <Grid container direction={"column"}>
          <Box mb={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
            <HotelInfoTitleTypography
              variant={isMobile ? "m-body-sl" : "body-xxs"}
              fontSize={isMobile ? MobilePxToVw(14) : DesktopPxToVw(14)}>
              {restaurantContact?.[0]?.title}
            </HotelInfoTitleTypography>
          </Box>
          {restaurantContact?.map((item: any, index: number) => {
            return (
              <ItemTitleWrapperContainer
                key={index}
                fontWeight={item?.title === "EMAIL" ? 300 : 700}
                sx={{
                  alignItems: "flex-start",
                  paddingBottom: isMobile ? MobilePxToVw(14) : DesktopPxToVw(14),
                }}>
                {item?.icon?.asset?._ref && (
                  <Box
                    loading="lazy"
                    component="img"
                    src={urlFor(item?.icon?.asset?._ref).url()}
                    height={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                    width={isMobile ? MobilePxToVw(21) : "1.2371vw"}
                    sx={{
                      objectFit: "contain",
                    }}
                  />
                )}
                {item?.list?.slice(0, item?.list?.length)?.map((content: any, index: any) => {
                  return (
                    <BlocksPortableTextBox
                      key={index}
                      sx={{
                        "&, & *": {
                          fontFamily: fonts?.body,
                        },
                        color:
                          content?.item?.includes("@") || item?.title === "PHONE"
                            ? theme?.palette?.neuPalette?.hexTwo
                            : theme?.palette?.neuPalette?.hexSeventeen,

                        alignItems: "flex-start",
                        fontSize: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                        fontWeight: content?.item?.includes("@") || item?.title === "PHONE" ? 300 : 700,
                        display: "inline",
                      }}
                      $Padding={props?.length - (index + 1) < 3}>
                      {content?.item}
                      {/* {item?.title === "CONTACT" && (
                        <RenderActionItem
                          title={"VIEW MAP"}
                          url={""}
                          onClick={() => {
                            redirectToGoogleMaps(
                              address?.latitude,
                              address?.longitude,
                              "https://www.google.com/maps/dir/",
                            )
                          }}
                          variant={"light-contained"}
                          isActionButtonType={false}
                          navigationType={"dialog"}
                          buttonStyles={{
                            maxWidth: "fit-content",
                            display: "inline",
                            marginLeft: isMobile ? MobilePxToVw(5) : DesktopPxToVw(5),
                          }}
                          linkStyles={{
                            color: theme?.palette?.neuPalette?.hexTwo,
                          }}
                        />
                      )} */}
                    </BlocksPortableTextBox>
                  )
                })}
              </ItemTitleWrapperContainer>
            )
          })}
        </Grid>
      </Grid>
      {isMobile && (
        <>
          <Grid container>
            <Box width={"100%"}>
              <LargeHorizontalDivider
                orientation="horizontal"
                sx={{
                  backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
                }}
              />
            </Box>
          </Grid>
          <Grid container mt={MobilePxToVw(55)}>
            <ActionsStack>
              {menuInfo?.file?.asset?._ref && (
                <RenderActionItem
                  url={getVideoUrl(menuInfo?.file?.asset?._ref)}
                  variant={"light-outlined"}
                  title={"VIEW MENU"}
                  navigationType={"dialog"}
                  isActionButtonType={true}
                  buttonStyles={{
                    maxWidth: "fit-content",
                    display: "flex",
                    gap: "0.521vw",
                  }}
                  onClick={() => {
                    window?.open(getVideoUrl(menuInfo?.file?.asset?._ref))
                  }}
                />
              )}
              {restaurantContact?.[2]?.list?.[0]?.item && (
                <RenderActionItem
                  url={"/"}
                  variant={"light-contained"}
                  title={"CLICK TO CALL"}
                  navigationType={"dialog"}
                  isActionButtonType={true}
                  buttonStyles={{
                    maxWidth: "fit-content",
                    display: "flex",
                    gap: "0.521vw",
                  }}
                />
              )}
            </ActionsStack>
          </Grid>
        </>
      )}
      {!isMobile && (
        <Grid xs={12}>
          <Box width={"100%"}>
            <LargeHorizontalDivider
              orientation="horizontal"
              sx={{
                backgroundColor: theme?.palette?.neuPalette?.hexSeventeen,
              }}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default HotelDineInFoodFacilities
