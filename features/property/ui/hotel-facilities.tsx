import { groq } from "next-sanity"
import { Box, Grid, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { KeyboardArrowDown } from "@mui/icons-material"
import { getClient, urlFor } from "../../../lib-sanity"
import { CONSTANTS } from "../../../components/constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { Fragment, useContext, useEffect, useState } from "react"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import { FullBox } from "../../../components/forms/business-form/business-sme-form"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { gridBreakPointsGenerator } from "../../../components/card/SearchResultCards/search-card.component"
import {
  ListBox,
  DividerForBorder,
  BottomBorderGrid,
  StyledChevronDown,
  MobileLogoBoxWrapper,
  StyledLoadMoreButton,
  MobileViewMoreButton,
  ListMoreTypographyWrapper,
  ItemLogoImageComponentBox,
  MobileViewMoreButtonWrapper,
  Diamond,
} from "../../../components/group/styles/group-with-facilities-styles"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { PropertyStore } from "../../../store"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"

const HotelFacilities = ({
  aesthetic,
  contentType,
  alignmentVariant,
  title,
}: any) => {
  const ihclContext = useContext(IHCLContext)
  const propertyStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES?.propertyStore
  ) as PropertyStore
  const [sectionTitle, setTitle] = useState<any>()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [mobileComponentItemData, setMobileComponentItemData] = useState<any>()
  const [itemsToShowInMobile, setItemsToShowInMobile] = useState(
    CONSTANTS?.NINE
  )
  const [more, setMore] = useState<number[]>([])
  const [mobileMoreState, setMobileMoreState] = useState<boolean>(true)
  const isMobile = useMobileCheck()
  let titleData: any = {
    title: { ...sectionTitle, headingElement: title?.headingElement },
    alignmentVariant: alignmentVariant,
  }
  useEffect(() => {
    async function fetchHotelData() {
      if (contentType === "hotelFacilities") {
        setMobileComponentItemData(
          propertyStore?.propertyData?.hotelFacilities?.mobileFacilities
        )
        setComponentItemsData(
          propertyStore?.propertyData?.hotelFacilities?.facilityDetails
        )
        setTitle(propertyStore?.propertyData?.hotelFacilities?.sectionTitle)
      }
    }
    fetchHotelData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleShow = (index: number, more: boolean) => {
    if (more) {
      setMore((previousArray: number[]) => {
        return previousArray?.filter(
          (singleMore: number) => index !== singleMore
        )
      })
    } else {
      setMore((previousArray: number[]) => {
        return [...previousArray, index]
      })
    }
  }

  useEffect(() => {
    if (isMobile) {
      setMore(() => [])
    } else {
      const initialMoreStates = componentItemData?.reduce(
        (previousArray: number[], item: any, index: number) => {
          if (item?.list?.length > CONSTANTS?.FOUR) {
            return [...previousArray, index]
          } else {
            return [...previousArray]
          }
        },
        []
      )
      setMore(initialMoreStates)
    }
  }, [componentItemData, isMobile])
  const checkIndexExist = (index: number) => {
    return more?.some((singleMore: number) => index == singleMore)
  }
  return (
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
      <MultiRowTitle {...titleData} />
      {!isMobile ? (
        <Grid container justifyContent={"space-between"} rowGap={"unset"}>
          {componentItemData
            ?.slice(
              0,
              mobileMoreState ? CONSTANTS?.NINE : componentItemData?.length
            )
            ?.map?.((item: any, index: number) => {
              item?.data?.length
              return (
                <Fragment key={index.toString()}>
                  <BottomBorderGrid
                    sx={{
                      borderTopWidth: index == 0 || index == 1 ? "1px" : "0px",
                    }}
                    item
                    {...gridBreakPointsGenerator(
                      isMobile,
                      5.833,
                      CONSTANTS?.FOUR
                    )}
                    key={index}
                    pb={1.2}>
                    {item?.showDividerForBorder &&
                      (index === 0 || index === 1) && <DividerForBorder />}
                    <FullBox sx={{ marginBottom: "0.885vw" }}>
                      <MobileLogoBoxWrapper>
                        <ItemLogoImageComponentBox
                          sx={{ padding: "0vw!important", gap: "0.781vw" }}
                          $showDividerForBorder={item?.showDividerForBorder}>
                          {item?.icon?.asset?._ref && (
                            <Box
                            loading="lazy"
                              component="img"
                              src={urlFor(item?.icon?.asset?._ref).url()}
                              height={"1.2371vw"}
                              width={"1.2371vw"}
                              sx={{
                                objectFit: "contain",
                              }}
                            />
                          )}
                          <Typography
                            variant={
                              item?.isHotelInfo ? "heading-xxs" : "heading-xs"
                            }>
                            {item?.title}
                          </Typography>
                        </ItemLogoImageComponentBox>
                      </MobileLogoBoxWrapper>
                    </FullBox>
                    <Box>
                      <ListBox>
                        {item?.list
                          ?.slice(
                            0,
                            checkIndexExist(index)
                              ? CONSTANTS?.FOUR
                              : item?.list?.length
                          )
                          ?.map?.((content: any, index: number) => {
                            return (
                              <Box
                                sx={{ display: "flex", gap: "0.5vw" }}
                                key={index}>
                                <Box
                                  sx={{
                                    flexShrink: "0",
                                    height: "1.56vw",
                                    display: "flex",
                                    alignItems: "center",
                                  }}>
                                  <Diamond />
                                </Box>
                                <Typography variant="body-ml">
                                  {content?.item}
                                </Typography>
                              </Box>
                            )
                          })}
                      </ListBox>
                      {item?.list?.length > CONSTANTS?.FOUR && (
                        <ListMoreTypographyWrapper>
                          <Typography
                            onClick={() => {
                              handleShow(index, checkIndexExist(index))
                            }}
                            sx={{
                              textDecoration: "none",
                              fontSize: "1.146vw",
                            }}
                            variant={"link-m"}>
                            {checkIndexExist(index) ? "...more" : "...less"}
                          </Typography>
                        </ListMoreTypographyWrapper>
                      )}
                    </Box>
                  </BottomBorderGrid>
                </Fragment>
              )
            })}
        </Grid>
      ) : (
        <Grid container justifyContent={"unset"} rowGap={"9.375vw"}>
          {mobileComponentItemData
            ?.slice(0, itemsToShowInMobile)
            ?.map((mobileItem: any, index: number) => {
              return (
                <Grid
                  {...gridBreakPointsGenerator(
                    isMobile,
                    5.833,
                    CONSTANTS?.FOUR
                  )}
                  key={index}
                  pb={1.2}
                  item>
                  <FullBox sx={{ marginBottom: "0.885vw" }}>
                    <MobileLogoBoxWrapper>
                      <ItemLogoImageComponentBox
                        sx={{ padding: "0vw!important", gap: "0.781vw" }}
                        $showDividerForBorder={
                          mobileItem?.showDividerForBorder
                        }>
                        <Stack
                          flexDirection="column"
                          alignItems="center"
                          rowGap={MobilePxToVw(20)}>
                          {mobileItem?.imageAsset?.image?.[0]?.asset?._ref && (
                            <Box
                            loading="lazy"
                              component="img"
                              src={urlFor(
                                mobileItem?.imageAsset?.image?.[0]?.asset?._ref
                              ).url()}
                              height={"6.25vw"}
                              width={"6.25vw"}
                              sx={{
                                objectFit: "contain",
                              }}
                            />
                          )}
                          <Box sx={{ textWrap: "balance" }}>
                            <Typography variant={"m-body-s"}>
                              {mobileItem?.value}
                            </Typography>
                          </Box>
                        </Stack>
                      </ItemLogoImageComponentBox>
                    </MobileLogoBoxWrapper>
                  </FullBox>
                </Grid>
              )
            })}
          {mobileComponentItemData?.length > itemsToShowInMobile && (
            <MobileViewMoreButtonWrapper>
              <MobileViewMoreButton
                variant="light-outlined"
                onClick={() => {
                  setItemsToShowInMobile(itemsToShowInMobile + CONSTANTS?.THREE)
                }}>
                {CONSTANTS?.VIEW_MORE}
                <KeyboardArrowDown />
              </MobileViewMoreButton>
            </MobileViewMoreButtonWrapper>
          )}
        </Grid>
      )}
      {isMobile && componentItemData?.length > CONSTANTS?.NINE && (
        <Grid container justifyContent={"center"}>
          <StyledLoadMoreButton
            variant="outlined"
            onClick={() =>
              setMobileMoreState((previousState) => !previousState)
            }>
            <Typography>{`${CONSTANTS?.VIEW} ${
              mobileMoreState ? CONSTANTS?.MORE : CONSTANTS?.LESS
            }`}</Typography>
            <StyledChevronDown $more={mobileMoreState} />
          </StyledLoadMoreButton>
        </Grid>
      )}
    </Box>
  )
}

export default HotelFacilities
