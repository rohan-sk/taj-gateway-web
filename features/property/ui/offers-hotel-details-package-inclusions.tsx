import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../../utils/isMobilView"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { OffersStore } from "../../../store"
import { Box, Grid } from "@mui/material"
import {
  VerticalDivider,
  HorizontalDivider,
  MobileHorizontalDivider,
  RenderComponentContentWrapper,
} from "../../../components/group/styles/group-with-three-column-cards-with-border-styles"
import { theme } from "../../../lib/theme"
import { CONSTANTS } from "../../../components/constants"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { gridBreakPointsGenerator } from "../../../components/card/SearchResultCards/search-card.component"

const OffersHotelDetailsPackageInclusions = ({
  aesthetic,
  heading,
  contentType,
  cardActionType,
  charactersLimit,
  cardLargeVariant,
  groupLargeVariant,
  cardCharactersLimit,
  cardAlignmentVariant,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  groupMobileVariant,
  cardMobileVariant,
  alignmentVariant,
  title,
  headingElementForCard,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
}: any) => {
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const offerStore = Context?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore
  const packageInclusions = offerStore?.offersData?.displayGlobal
    ? offerStore?.offersData?.inclusions
    : offerStore?.offersData?.hotels?.inclusions ||
      offerStore?.offersData?.inclusions
  let renderItemsCount = packageInclusions?.length
  let showDivider = packageInclusions?.[0]?.basicInfo?.icon?.icon ? true : false
  const itemCount = packageInclusions?.length
  const fourItems = renderItemsCount === CONSTANTS?.FOUR
  const sixItems = renderItemsCount === CONSTANTS?.SIX
  const threeItems = renderItemsCount === CONSTANTS?.THREE
  const fiveItems = renderItemsCount === CONSTANTS?.FIVE
  const twoItems = renderItemsCount === CONSTANTS?.TWO

  return (
    <>
      {packageInclusions?.length > 0 && (
        <Box
          sx={{
            padding: isMobile
              ? aesthetic?.padding?.mobile
              : aesthetic?.padding?.desktop,
            bgcolor: aesthetic?.backgroundColor?.hex,
          }}>
          <Box
            sx={{
              border: isMobile
                ? showDivider
                  ? `0.05vw solid ${theme?.palette?.neuPalette?.hexTwo}`
                  : "none"
                : `0.05vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
            }}>
            <Box
              p={
                isMobile
                  ? showDivider
                    ? `${MobilePxToVw(90)} 0 0`
                    : 0
                  : `${DesktopPxToVw(60)} 0 ${DesktopPxToVw(50)}`
              }>
              <MultiRowTitle
                subTitle={undefined}
                title={{
                  mobileTitle: [],
                  desktopTitle: [],
                }}
                charactersLimit={
                  isMobile ? mobileCharactersLimit : charactersLimit
                }
                alignmentVariant={alignmentVariant}
                isComponentFullWidth={false}
                isMobileComponentFullWidth={false}
                subHeadingElement={title?.headingElement}
                heading={
                  offerStore?.offersData?.hotels?.inclusionHeadingTitle ||
                  heading
                }
                aesthetic={aesthetic}
                isMarginBottomNotRequired={true}
              />
            </Box>
            <Grid
              container
              columnGap={
                isMobile
                  ? showDivider
                    ? MobilePxToVw(24)
                    : MobilePxToVw(24)
                  : showDivider
                  ? 0
                  : twoItems && !showDivider
                  ? DesktopPxToVw(120)
                  : DesktopPxToVw(40)
              }
              rowGap={
                isMobile
                  ? showDivider
                    ? 0
                    : MobilePxToVw(42)
                  : showDivider
                  ? 0
                  : DesktopPxToVw(50)
              }
              p={
                isMobile
                  ? fourItems && showDivider
                    ? `${MobilePxToVw(0)} ${MobilePxToVw(27)} ${MobilePxToVw(
                        90
                      )}`
                    : (threeItems || sixItems || fiveItems || twoItems) &&
                      showDivider
                    ? `${MobilePxToVw(0)} ${MobilePxToVw(27)} ${MobilePxToVw(
                        90
                      )}`
                    : `${MobilePxToVw(0)}`
                  : fourItems
                  ? `${DesktopPxToVw(0)} ${DesktopPxToVw(38)} ${DesktopPxToVw(
                      60
                    )}`
                  : twoItems || threeItems || sixItems || fiveItems
                  ? `${DesktopPxToVw(0)} ${DesktopPxToVw(123)} ${DesktopPxToVw(
                      60
                    )}`
                  : `${DesktopPxToVw(0)} ${DesktopPxToVw(134)} ${DesktopPxToVw(
                      60
                    )}`
              }
              sx={{ justifyContent: "center" }}>
              {packageInclusions?.map((item: any, index: number) => {
                let cardData = {
                  image:
                    item?.basicInfo?.icon?.icon ||
                    item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
                  title: item?.basicInfo?.title,
                  variant: cardMobileVariant,
                  largeImage:
                    item?.basicInfo?.icon?.icon ||
                    item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
                  headingElementForCard: headingElementForCard,
                  description: item?.basicInfo?.description,
                  largeVariant: cardLargeVariant,
                  renderOriginalWidthImage: true,
                }
                return (
                  <Fragment key={index}>
                    <Grid
                      key={index}
                      item
                      {...gridBreakPointsGenerator(
                        isMobile,
                        showDivider
                          ? fourItems
                            ? 2.7
                            : fiveItems
                            ? 3.125
                            : 3.1
                          : fourItems
                          ? 2.7
                          : 3.7,
                        fourItems
                          ? 5.65
                          : twoItems || threeItems || sixItems || fiveItems
                          ? 5.65
                          : 5.77
                      )}>
                      <RenderComponentContentWrapper
                        $isMobile={isMobile}
                        $fourItems={fourItems}
                        $showDivider={showDivider}>
                        {Context?.renderComponent("card", cardData, index)}
                      </RenderComponentContentWrapper>
                    </Grid>
                    {twoItems &&
                      (index + 1) % 2 !== 0 &&
                      showDivider &&
                      !isMobile && (
                        <Grid>
                          <Box height={"100%"}>
                            <VerticalDivider
                              orientation="vertical"
                              sx={{
                                margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(
                                  100
                                )}`,
                              }}
                            />
                          </Box>
                        </Grid>
                      )}
                    {fourItems &&
                      (index + 1) % 4 !== 0 &&
                      showDivider &&
                      !isMobile && (
                        <Grid>
                          <Box height={"100%"}>
                            <VerticalDivider orientation="vertical" />
                          </Box>
                        </Grid>
                      )}
                    {fiveItems &&
                      (index + 1) % 5 !== 0 &&
                      (index + 1) % 3 !== 0 &&
                      showDivider &&
                      !isMobile && (
                        <Grid>
                          <Box height={"100%"}>
                            <VerticalDivider
                              orientation="vertical"
                              sx={{
                                margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(
                                  60
                                )}`,
                              }}
                            />
                          </Box>
                        </Grid>
                      )}
                    {(threeItems || sixItems) &&
                      (index + 1) % 3 !== 0 &&
                      showDivider &&
                      !isMobile && (
                        <Grid>
                          <Box height={"100%"}>
                            <VerticalDivider
                              orientation="vertical"
                              sx={{
                                margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(
                                  60
                                )}`,
                              }}
                            />
                          </Box>
                        </Grid>
                      )}
                    {(index + 1) % 3 === 0 &&
                      index + 2 < itemCount &&
                      showDivider &&
                      !isMobile && (
                        <Grid xs={12}>
                          <Box width={"100%"}>
                            <HorizontalDivider orientation="horizontal" />
                          </Box>
                        </Grid>
                      )}
                    {isMobile &&
                      sixItems &&
                      showDivider &&
                      (index + 1) % 2 === 0 &&
                      index + 2 < itemCount && (
                        <>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                        </>
                      )}
                    {isMobile &&
                      threeItems &&
                      showDivider &&
                      (index + 1) % 2 === 0 && (
                        <>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                        </>
                      )}
                    {isMobile &&
                      fiveItems &&
                      showDivider &&
                      (index + 1) % 2 === 0 && (
                        <>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider
                                orientation="horizontal"
                                sx={{
                                  margin: `${MobilePxToVw(40)} 0vw`,
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider
                                orientation="horizontal"
                                sx={{
                                  margin: `${MobilePxToVw(40)} 0vw`,
                                }}
                              />
                            </Box>
                          </Grid>
                        </>
                      )}
                    {isMobile &&
                      fourItems &&
                      showDivider &&
                      (index + 1) % 2 === 0 &&
                      index + 2 < itemCount && (
                        <>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                          <Grid xs={5.65}>
                            <Box width={"100%"}>
                              <MobileHorizontalDivider orientation="horizontal" />
                            </Box>
                          </Grid>
                        </>
                      )}
                  </Fragment>
                )
              })}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  )
}

export default OffersHotelDetailsPackageInclusions
