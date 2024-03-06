import React, { useContext, useEffect, useRef, useState, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import { CONSTANTS } from "../constants"
import { Box, Grid } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { ActionProps, ImageProps, parameterMapItems } from "../types"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  MinHeightWrapper,
  LoadMoreActionBox,
  LoadMoreActionGrid,
  AestheticTypography,
  StyledExpandMoreIcon,
  StyledExpandMoreButton,
} from "./styles/common-styled-components"
import { getListWithScoreAndBrandSorting } from "../../utils/getListWithPriorityAndBrandSorting"

const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))

type GroupWithThreeColumnCardsGridProps = {
  variant: string
  isDropDown?: boolean
  isSearchEnabled?: boolean
  preRenderItemsCount: number
  characterLimitForItemDescription?: number
  props: GroupWithThreeColumnCardsGridItems[]
  parameterMap?: any | parameterMapItems[] | undefined
  backgroundColor?: string | undefined
  tabsConfig?: any
  textColor?: string
}
type GroupWithThreeColumnCardsGridItems = {
  _key: string
  title: string
  _type: string
  urlType: string
  variant: string
  image: ImageProps
  description: string
  largeVariant: string
  largeImage: ImageProps
  alignmentVariant: string
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  headingElementForCard?: any
}

const GroupWithThreeColumnCardsGrid = ({
  props,
  variant,
  isDropDown,
  parameterMap,
  isSearchEnabled,
  preRenderItemsCount,
  backgroundColor,
  textColor,
}: GroupWithThreeColumnCardsGridProps) => {
  const isMobile = useMobileCheck()
  const containerRef = useRef(null)
  const context = useContext(IHCLContext)

  const handleLoadMore = (count: number) => setCountToShowCards(countToShowCards + count)
  const initialCardsToShow = preRenderItemsCount ? preRenderItemsCount : isMobile ? CONSTANTS?.FOUR : CONSTANTS?.SIX

  const [loading, setLoading] = useState<boolean>(true)
  const [maxheight, setMaxheight] = useState<number>(0)
  const [descheight, setDescheight] = useState<number>(0)
  const [countToShowCards, setCountToShowCards] = useState<number>(initialCardsToShow)

  const setTitleHeight = useCallback((height: any) => {
    setMaxheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  const setSubTitleHeight = useCallback((height: any) => {
    setDescheight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])
  useEffect(() => {
    setCountToShowCards(initialCardsToShow)
  }, [initialCardsToShow])

  const sortedData = useMemo(() => {
    return props?.length ? getListWithScoreAndBrandSorting(props) : []
  }, [props])

  useEffect(() => {
    //Todo, we are getting no results found message first then showing the cards. Need to check the alternate solution. Fixed issue (SIT-1851)
    setTimeout(() => setLoading(false), 1500)
  }, [])

  return (
    <>
      <>
        {loading && <LoadingSpinner componentLevel={true} containerStyle={{ height: "50vh" }} />}
        <MinHeightWrapper>
          {sortedData?.length > 0 && !loading && (
            <Grid
              sx={{
                justifyContent: sortedData?.length < 3 && !isMobile ? "center" : "initial",
              }}
              container
              columnSpacing={isMobile ? "4.375vw" : "2.10vw"} // this rowSpacing took from global template
              rowSpacing={isMobile ? "8.594vw" : "4.167vw"}
              ref={containerRef}>
              {sortedData
                ?.slice(0, countToShowCards)
                ?.map((item: GroupWithThreeColumnCardsGridItems, index: number) => (
                  <Grid key={index} item xs={12} sm={isMobile ? 12 : 4} md={4} lg={4} xl={4}>
                    {context?.renderComponent(
                      item?._type,
                      {
                        ...item,
                        gridSize: 3,
                        maxheight,
                        setTitleHeight,
                        descheight,
                        setSubTitleHeight,
                      },
                      index,
                    )}
                  </Grid>
                ))}
            </Grid>
          )}
          {sortedData?.length < 1 && (
            <Box>
              <AestheticTypography $color={textColor} variant={isMobile ? "m-heading-xs" : "body-l"}>
                {CONSTANTS?.NO_RESULTS}
              </AestheticTypography>
            </Box>
          )}
        </MinHeightWrapper>
      </>
      {countToShowCards > sortedData?.length - 1 ||
      countToShowCards > (isMobile ? 10 : sortedData?.length - 1) ? null : (
        <LoadMoreActionGrid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginTop: isMobile ? "8.594vw" : "4.167vw" }}>
          {isMobile ? (
            <StyledExpandMoreButton
              $color={textColor}
              sx={{
                minWidth: "37.188vw",
                letterSpacing: isMobile ? "0.281vw" : "unset",
              }}
              variant="light-outlined"
              endIcon={
                <StyledExpandMoreIcon
                  $color={textColor}
                  sx={{
                    height: "3.875vw",
                  }}
                />
              }
              onClick={() => handleLoadMore(2)}>
              {CONSTANTS?.LOAD_MORE}
            </StyledExpandMoreButton>
          ) : (
            <LoadMoreActionBox onClick={() => handleLoadMore(3)} sx={{ gap: DesktopPxToVw(10) }}>
              <AestheticTypography $color={textColor} variant="link-m">
                {CONSTANTS?.LOAD_MORE}
              </AestheticTypography>
              <Box onClick={() => handleLoadMore(3)}>
                <StyledExpandMoreIcon $color={textColor} />
              </Box>
            </LoadMoreActionBox>
          )}
        </LoadMoreActionGrid>
      )}
    </>
  )
}

export default GroupWithThreeColumnCardsGrid
