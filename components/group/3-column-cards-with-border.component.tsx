import { CONSTANTS } from "../constants"
import { theme } from "../../lib/theme"
import dynamic from "next/dynamic"
import React, { useContext } from "react"
import { Box, Grid } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  VerticalDivider,
  HorizontalDivider,
  MobileHorizontalDivider,
  RenderComponentContainer,
} from "./styles/group-with-three-column-cards-with-border-styles"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"

const GroupWithThreeColumnCardsWithBorder = ({ props, showDivider, renderItemsCount }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const itemCount = props?.items?.length
  const fourItems = renderItemsCount === CONSTANTS?.FOUR
  const sixItems = renderItemsCount === CONSTANTS?.SIX
  const threeItems = renderItemsCount === CONSTANTS?.THREE
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)
  return (
    <Box
      sx={{
        margin: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
        border: isMobile
          ? showDivider
            ? `0.05vw solid ${theme?.palette?.ihclPalette?.hexTwo}`
            : "none"
          : `0.05vw solid ${theme?.palette?.ihclPalette?.hexTwo}`,
      }}>
      <Box pt={isMobile ? (showDivider ? "14.063vw" : "0vw") : "3.125vw"}>
        <MultiRowTitle {...props} />
      </Box>
      <Grid
        container
        columnGap={isMobile ? (showDivider ? MobilePxToVw(24) : MobilePxToVw(24)) : showDivider ? 0 : DesktopPxToVw(40)}
        rowGap={isMobile ? (showDivider ? 0 : MobilePxToVw(42)) : showDivider ? 0 : DesktopPxToVw(50)}
        p={
          isMobile
            ? showDivider && fourItems
              ? `${MobilePxToVw(0)} ${MobilePxToVw(40)} ${MobilePxToVw(55)}`
              : (threeItems || sixItems) && showDivider
              ? `${MobilePxToVw(0)} ${MobilePxToVw(27)} ${MobilePxToVw(90)}`
              : `${MobilePxToVw(0)}`
            : fourItems && showDivider
            ? `${DesktopPxToVw(0)} ${DesktopPxToVw(38)} ${DesktopPxToVw(60)}`
            : (threeItems || sixItems) && showDivider
            ? `${DesktopPxToVw(0)} ${DesktopPxToVw(123)} ${DesktopPxToVw(60)}`
            : `${DesktopPxToVw(0)} ${DesktopPxToVw(134)} ${DesktopPxToVw(60)}`
        }
        sx={{ justifyContent: "center" }}>
        {props?.items?.map((item: any, index: number) => {
          let isCustomOddIndex = index + 1 === props?.items?.length && (index + 1) % 2 !== 0
          return (
            <>
              <Grid
                key={index}
                item
                {...gridBreakPointsGenerator(
                  isMobile,
                  showDivider ? (fourItems ? 2.7 : 3.12) : 3.72,
                  isMobile
                    ? showDivider && fourItems
                      ? 5.69
                      : showDivider && (threeItems || sixItems)
                      ? isCustomOddIndex
                        ? 10
                        : 5.65
                      : 5.77
                    : showDivider
                    ? fourItems
                      ? 2.7
                      : 3.18
                    : 3.72,
                )}>
                <RenderComponentContainer $isMobile={isMobile} $showDivider={showDivider}>
                  {context?.renderComponent(item?._type, item, {
                    index,
                    isCustomOddIndex,
                  })}
                </RenderComponentContainer>
              </Grid>
              {fourItems && (index + 1) % 4 !== 0 && showDivider && !isMobile && (
                <Grid>
                  <Box height={"100%"}>
                    <VerticalDivider orientation="vertical" />
                  </Box>
                </Grid>
              )}
              {(threeItems || sixItems) &&
                (index + 1) % 3 !== 0 &&
                showDivider &&
                !isMobile &&
                !(itemCount === CONSTANTS?.FOUR && index === CONSTANTS?.THREE) && (
                  <Grid>
                    <Box height={"100%"}>
                      <VerticalDivider
                        orientation="vertical"
                        sx={{
                          margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(60)}`,
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              {index > 0 &&
                (index + 1) % 3 === 0 &&
                Math.floor((index + 1) / 3) < Math.ceil(itemCount / 3) &&
                showDivider &&
                !isMobile && (
                  <Grid xs={12} key={`divider-${index}`}>
                    <Box width={"100%"}>
                      <HorizontalDivider orientation="horizontal" />
                    </Box>
                  </Grid>
                )}

              {isMobile && sixItems && showDivider && (index + 1) % 2 === 0 && index + 2 < itemCount && (
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
              {isMobile && threeItems && showDivider && (index + 1) % 2 === 0 && (
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
              {isMobile && fourItems && showDivider && (index + 1) % 2 === 0 && index + 2 < itemCount && (
                <>
                  <Grid xs={5.69}>
                    <Box width={"100%"}>
                      <MobileHorizontalDivider orientation="horizontal" />
                    </Box>
                  </Grid>
                  <Grid xs={5.69}>
                    <Box width={"100%"}>
                      <MobileHorizontalDivider orientation="horizontal" />
                    </Box>
                  </Grid>
                </>
              )}
            </>
          )
        })}
      </Grid>
    </Box>
  )
}

export default GroupWithThreeColumnCardsWithBorder
