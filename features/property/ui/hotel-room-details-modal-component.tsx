import React, { useEffect, useRef, useState, useContext } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { getClient, urlFor } from "../../../lib-sanity"
import { CONSTANTS, CONTENT_TYPE } from "../../../components/constants"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
const CustomReadMore = dynamic(() => import("../../../components/hoc/CustomReadMore"))
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import {
  HighlightsStarRate,
  CategoryItemsSquareSharp,
  AmenitiesTitleTypography,
  AmenitiesWrapperContainer,
  HighlightsWrapperContainer,
  CategoryItemsWrapperContainer,
  SpecificationsWrapperContainer,
  SpecificationsItemsWrapperContainer,
  AminitiesMobileview,
  AminitiesViewMore,
  AminitiesMainGrid,
  AminitiesTitle,
  StyledDivider,
  ModalScrollContainer,
  ActionItemsContainer,
  RoomDetailsMainContainer,
  StyledHorizontalDivider,
  IconsStack,
  DescriptionContainer,
} from "./styles/hotel-room-model-component-styles"
import { StyledChevronDown } from "../../../components/group/styles/group-with-facilities-styles"
import { StyledBulletIcon } from "../../../components/card/styles/card-with-desc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore } from "../../../store"
import groq from "groq"
const ListItemComponent = ({ content }: any) => {
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "start", gap: MobilePxToVw(12) }}>
      <Stack
        sx={{
          justifyContent: "center",
          minHeight: `${DesktopPxToVw(30)}`,
          "@media (max-width:640px)": {
            minHeight: `${MobilePxToVw(26)}`,
          },
        }}>
        <StyledBulletIcon />
      </Stack>
      <Typography variant={"m-body-s"} sx={{ lineHeight: "140%" }}>
        {content}
      </Typography>
    </Stack>
  )
}

const HotelRoomDetailsModelComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalWidthRef = useRef<any>(null)
  const modalStore = ModalStore.getInstance()

  const [viewMore, setViewMore] = useState<any>(3)
  const [more, setMore] = useState<number>(isMobile ? props?.mobileCharactersLimit : props?.charactersLimit)
  const context: any = useContext(IHCLContext)
  const propertyStore = context?.getGlobalStore(GLOBAL_STORES?.propertyStore) as PropertyStore
  const [mobileAmenitiesData, setMobileAmenitiesData] = useState<any>([])
  const fetchRef = async (ref: string) => {
    const query = groq`*[_id in ["${ref}"]][0]`
    await getClient(true)
      .fetch(query)
      .then((data: any) => {
        setMobileAmenitiesData(data?.mobileAmenities)
      })
  }

  useEffect(() => {
    if (modalStore?.propertyData?.itemData?.mobileAmenitiesWithIcons?._ref !== undefined && isMobile) {
      fetchRef(modalStore?.propertyData?.itemData?.mobileAmenitiesWithIcons?._ref)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CustomDivider = () => {
    return (
      <Divider
        sx={{
          height: "5%",
          width: "5.16vw",
          borderColor: theme?.palette?.text?.primary,
        }}
      />
    )
  }

  return (
    <>
      <ModalScrollContainer ref={modalWidthRef}>
        <RoomDetailsMainContainer $isMobile={isMobile}>
          <Stack
            sx={{
              padding: isMobile ? `${MobilePxToVw(50)} 12.5vw 0vw` : `0vw`,
            }}>
            {modalStore?.propertyData?.title && (
              <Box sx={{ textAlign: "center" }}>
                <Typography variant={isMobile ? "m-heading-s" : "heading-xs"}>
                  {modalStore?.propertyData?.title}
                </Typography>
              </Box>
            )}
            {modalStore?.propertyData?.description && (
              <DescriptionContainer mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(18)}>
                <CustomReadMore length={more} variant={isMobile ? "m-body-sl" : "body-s"}>
                  {modalStore?.propertyData?.description}
                </CustomReadMore>
              </DescriptionContainer>
            )}
            {modalStore?.propertyData?.itemData?.specifications && (
              <SpecificationsWrapperContainer mt={isMobile ? MobilePxToVw(34) : DesktopPxToVw(20)} $isMobile={isMobile}>
                {modalStore?.propertyData?.itemData?.specifications?.map((item: any, index: number) => {
                  return (
                    <SpecificationsItemsWrapperContainer key={index} $isMobile={isMobile}>
                      {item?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                        <Box
                          alt={`-img`}
                          loading="lazy"
                          component={"img"}
                          src={urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()}
                        />
                      )}
                      <Typography variant={isMobile ? "m-body-s" : "body-s"} sx={{ fontWeight: 700 }}>
                        {item?.value}
                      </Typography>
                    </SpecificationsItemsWrapperContainer>
                  )
                })}
              </SpecificationsWrapperContainer>
            )}

            {modalStore?.propertyData?.itemData?.highlights && (
              <Box mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(15)}>
                {modalStore?.propertyData?.itemData?.highlights?.map((item: any, index: number) => {
                  return (
                    <HighlightsWrapperContainer key={index} $isMobile={isMobile}>
                      <IconsStack>
                        <HighlightsStarRate $isMobile={isMobile} />
                      </IconsStack>
                      <Typography
                        variant={isMobile ? "m-body-sl" : "body-s"}
                        sx={{ color: theme?.palette?.neuPalette?.hexTwo }}>
                        {item}
                      </Typography>
                    </HighlightsWrapperContainer>
                  )
                })}
              </Box>
            )}
          </Stack>

          {!isMobile ? (
            modalStore?.propertyData?.itemData?.amenities?.length > 0 ? (
              <Stack maxHeight={DesktopPxToVw(400)} height={"fit-content"}>
                <StyledHorizontalDivider
                  orientation="horizontal"
                  sx={{ m: `${DesktopPxToVw(22)} 0vw  ${DesktopPxToVw(30)}` }}
                />
                <AmenitiesWrapperContainer>
                  {modalStore?.propertyData?.itemData?.amenities?.map((item: any, index: number) => {
                    return (
                      <Box key={index}>
                        <AmenitiesTitleTypography variant={"body-s"}>{item?.category}</AmenitiesTitleTypography>
                        {item?.items && (
                          <Grid container mt={DesktopPxToVw(10)}>
                            {item?.items?.map((item: any, index: number) => {
                              return (
                                <Grid item lg={6} xl={6} md={6} key={index}>
                                  <CategoryItemsWrapperContainer>
                                    <Box>
                                      <IconsStack>
                                        <CategoryItemsSquareSharp />
                                      </IconsStack>
                                    </Box>
                                    <Typography variant={"body-s"}>{item}</Typography>
                                  </CategoryItemsWrapperContainer>
                                </Grid>
                              )
                            })}
                          </Grid>
                        )}
                      </Box>
                    )
                  })}
                </AmenitiesWrapperContainer>
                <StyledHorizontalDivider
                  orientation="horizontal"
                  sx={{ m: `${DesktopPxToVw(30)} 0vw  ${DesktopPxToVw(22)}` }}
                />
              </Stack>
            ) : (
              <></>
            )
          ) : modalStore?.propertyData?.contentType?.toLowerCase() === "hoteleventvenues" ||
            modalStore?.propertyData?.contentType?.toLowerCase() === CONTENT_TYPE?.ALL_EVENTS_VENUES?.toLowerCase() ? (
            <Stack
              sx={{
                padding: `0vw ${MobilePxToVw(81)}`,
                marginTop: MobilePxToVw(42),
              }}>
              <StyledDivider />
              <Stack
                sx={{
                  padding: `${MobilePxToVw(52)} 0vw ${MobilePxToVw(60)}`,
                  gap: MobilePxToVw(40),
                }}>
                {modalStore?.propertyData?.itemData?.amenities?.map((item: any, index: number) => (
                  <Stack key={index} gap={MobilePxToVw(30)}>
                    <Typography
                      variant="m-body-s"
                      sx={{
                        letterSpacing: "0.1em",
                        color: `${theme?.palette?.neuPalette?.Eleven}50 !important`,
                        fontWeight: "700",
                      }}>
                      {item?.category}
                    </Typography>
                    <Stack sx={{ gap: MobilePxToVw(8) }}>
                      {item?.items?.map((childItem: any, index: number) => (
                        <ListItemComponent key={index} content={childItem} />
                      ))}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <StyledDivider />
            </Stack>
          ) : (
            <>
              {mobileAmenitiesData && (
                <Box
                  mt={MobilePxToVw(35)}
                  sx={{
                    backgroundColor: theme?.palette?.neuPalette?.hexTwentyNine,
                    padding: ` ${MobilePxToVw(55)} ${MobilePxToVw(80)} ${MobilePxToVw(55)}`,
                  }}>
                  <AminitiesTitle>
                    <CustomDivider />
                    <Typography variant={"m-heading-s"}>
                      {modalStore?.propertyData?.itemData?.mobileAmenitiesTitle}
                    </Typography>
                  </AminitiesTitle>
                  <AminitiesMainGrid justifyContent={"space-between"} container rowGap={MobilePxToVw(37)}>
                    {mobileAmenitiesData?.slice(0, viewMore)?.map((item: any, index: number) => {
                      return (
                        <>
                          <Grid key={index} item sm={3.9} xs={3.9} textAlign="center">
                            <AminitiesMobileview>
                              {item?.imageAsset?.largeImage.map((imageAsset: any, index: number) => {
                                return (
                                  <>
                                    {imageAsset?.asset?._ref && (
                                      <Box
                                        key={index}
                                        loading="lazy"
                                        component={"img"}
                                        src={urlFor(imageAsset?.asset?._ref).url()}
                                        width={MobilePxToVw(20)}
                                        height={MobilePxToVw(20)}
                                        alt="aminites"
                                        style={{ objectFit: "contain" }}
                                      />
                                    )}
                                  </>
                                )
                              })}

                              <Typography variant="m-body-sl">{item?.value}</Typography>
                            </AminitiesMobileview>
                          </Grid>
                        </>
                      )
                    })}
                    <AminitiesViewMore sx={{ width: "100%" }}>
                      {viewMore <= 3 && (
                        <Button
                          sx={{
                            fontWeight: 700,
                            textTransform: "none",
                            letterSpacing: "0.1em",
                            padding: "0.1vw 7.625vw",
                          }}
                          variant="light-outlined"
                          onClick={() => {
                            setViewMore(mobileAmenitiesData?.length)
                          }}>
                          {CONSTANTS?.VIEW_MORE?.toUpperCase()}
                          <StyledChevronDown $more={true} />
                        </Button>
                      )}
                    </AminitiesViewMore>
                  </AminitiesMainGrid>
                </Box>
              )}
            </>
          )}
          {props?.groupActionType?.[0]?.primaryAction?.title && (
            <ActionItemsContainer $isMobile={isMobile}>
              <RenderActionItem
                isActionButtonType={true}
                url={props?.groupActionType?.[0]?.primaryAction?.url}
                title={props?.groupActionType?.[0]?.primaryAction?.title}
                variant={props?.groupActionType?.[0]?.primaryAction?.variant}
                navigationType={props?.groupActionType?.[0]?.primaryAction?.urlType}
                buttonStyles={{
                  lineHeight: "140%",
                  letterSpacing: "1.8px",
                }}
                onClick={() => {
                  modalStore?.closeModal()
                  if (modalStore?.propertyData?.primaryAction?.url) {
                    navigate(
                      modalStore?.propertyData?.primaryAction?.url,
                      modalStore?.propertyData?.primaryAction?.urlType,
                    )
                  } else {
                    navigate(
                      `${props?.groupActionType?.[0]?.primaryAction?.url}?hotelId=${propertyStore?.propertyData?.hotelId}`,
                      props?.groupActionType?.[0]?.primaryAction?.urlType,
                    )
                  }
                }}
              />
            </ActionItemsContainer>
          )}
        </RoomDetailsMainContainer>
      </ModalScrollContainer>
    </>
  )
}

export default observer(HotelRoomDetailsModelComponent)
