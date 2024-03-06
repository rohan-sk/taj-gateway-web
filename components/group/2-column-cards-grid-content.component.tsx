import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import {
  LoadMoreActionBox,
  StyledExpandMoreIcon,
  StyledExpandMoreButton,
  ZoomInAnimationWrapper,
} from "./styles/common-styled-components"
import { parameterMapItems } from "../types"
import { Box, Grid, Typography } from "@mui/material"
const CustomDropDown = dynamic(() => import("../hoc/CustomDropDown").then((module) => module.CustomDropDown))
import { useMobileCheck } from "../../utils/isMobilView"
const CustomSearch = dynamic(() => import("../hoc/Search/CustomSearch").then((module) => module.CustomSearch))
import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  StyledGridItem,
  LoadMoreStyledGridWrapper,
  ParameterMapWrappingContentMSiteBox,
  ParameterMapWrappingContentWebSiteBox,
} from "./styles/2-column-grid"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { getListWithScoreAndBrandSorting } from "../../utils/getListWithPriorityAndBrandSorting"

type GroupWithTwoColumnCardsGridProps = {
  isDropDown?: boolean
  isSearchEnabled?: boolean
  preRenderItemsCount?: number
  props: GroupWithTwoColumnCardsGridItems[]
  parameterMap: parameterMapItems[] | undefined
}
type GroupWithTwoColumnCardsGridItems = {
  _type: string
}

const GroupWithTwoColumnCardsGrid = ({
  props,
  isDropDown,
  parameterMap,
  isSearchEnabled,
  preRenderItemsCount,
}: GroupWithTwoColumnCardsGridProps) => {
  const context = useContext(IHCLContext)

  let data1 = ["MUMBAI", "Delhi"]
  let initialCardsToShow = CONSTANTS?.FOUR
  const isMobile = useMobileCheck()
  const [value, setValue] = useState<string>("")
  const sortedItems = getListWithScoreAndBrandSorting(props)
  const [generatedArray, setGeneratedArray] = useState(props)
  const [packageItemsHeight, setPackageItemsHeight] = useState<number>(0)
  const [dropDownValue, setDropDownValue] = useState<string>("")
  const [countToShowCards, setCountToShowCards] = useState<number>(
    preRenderItemsCount ? preRenderItemsCount : initialCardsToShow,
  )

  const setPackagesHeight = useCallback((height: any) => {
    setPackageItemsHeight((prevValue: any) => (prevValue > height ? prevValue : height))
  }, [])

  useEffect(() => {
    setGeneratedArray(
      props?.filter(function (item: any) {
        return item?.title?.toLowerCase().includes(value) || item?.title?.toUpperCase().includes(value)
      }),
    )
  }, [props, value])

  return (
    <>
      {isDropDown && <CustomDropDown label="City" placeHolder="city" data={data1} value={value} setValue={setValue} />}
      {isSearchEnabled && <CustomSearch value={value} setValue={setValue} placeholder={CONSTANTS?.DESTINATION} />}
      {isMobile ? (
        <>
          {parameterMap && (
            <ParameterMapWrappingContentMSiteBox>
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Box
                  sx={{
                    margin: "2.03vw 0vw",
                  }}
                  key={index}>
                  {item?.key === CONSTANTS?.SEARCH_FIELD && (
                    <Box sx={{ paddingBottom: "6.25vw" }}>
                      <CustomSearch
                        fontSizeProp="3.750vw"
                        value={value}
                        setValue={setValue}
                        placeholder={item?.value}
                        maxWidth={"74.219vw"}
                        styles={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: 300,
                          lineHeight: "150%",
                          color: theme?.palette?.neuPalette?.hexSeventeen,
                        }}
                      />
                    </Box>
                  )}
                  {item?.key === CONSTANTS?.DROP_DOWN && (
                    <CustomDropDown
                      label="City"
                      placeHolder={item?.value}
                      data={data1}
                      value={dropDownValue}
                      minWidth={"74.219vw"}
                      setValue={setDropDownValue}
                    />
                  )}
                </Box>
              ))}
            </ParameterMapWrappingContentMSiteBox>
          )}
        </>
      ) : (
        <>
          {parameterMap && (
            <ParameterMapWrappingContentWebSiteBox
              sx={{
                justifyContent: parameterMap.length <= 1 ? "flex-end" : "flex-start",
                alignItems: "baseline",
              }}>
              {parameterMap?.map((item: parameterMapItems, index: number) => (
                <Box key={index}>
                  {item?.key === CONSTANTS?.SEARCH_FIELD && (
                    <CustomSearch
                      fontSizeProp="1.25vw"
                      value={value}
                      setValue={setValue}
                      placeholder={item?.value}
                      styles={{
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: 300,
                        color: theme?.palette?.neuPalette?.hexSeventeen,
                      }}
                    />
                  )}
                  {item?.key === CONSTANTS?.DROP_DOWN && (
                    <CustomDropDown
                      label="City"
                      placeHolder={item?.value}
                      data={data1}
                      setValue={setDropDownValue}
                      value={dropDownValue}
                      margin={"0vw"}
                    />
                  )}
                </Box>
              ))}
            </ParameterMapWrappingContentWebSiteBox>
          )}
        </>
      )}
      <Grid container rowSpacing={isMobile ? MobilePxToVw(55) : "3.125vw"} columnSpacing={"2.1vw"}>
        {sortedItems?.slice(0, countToShowCards)?.map((item: GroupWithTwoColumnCardsGridItems, index: number) => (
          <ZoomInAnimationWrapper in={true} key={index}>
            <Grid item xs={12} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6}>
              {context?.renderComponent(item?._type, { ...item, packageItemsHeight, setPackagesHeight }, index)}
            </Grid>
          </ZoomInAnimationWrapper>
        ))}
      </Grid>
      {countToShowCards > sortedItems?.length - 1 ? null : (
        <LoadMoreStyledGridWrapper item lg={12} xl={12} md={12} xs={12} sm={12} $isMobile={isMobile}>
          {isMobile ? (
            <StyledExpandMoreButton
              variant="light-outlined"
              endIcon={
                <StyledExpandMoreIcon
                  sx={{
                    height: "3.875vw",
                  }}
                />
              }
              onClick={() => {
                setCountToShowCards(countToShowCards + CONSTANTS?.ONE)
              }}>
              {CONSTANTS?.LOAD_MORE}
            </StyledExpandMoreButton>
          ) : (
            <LoadMoreActionBox>
              <Typography
                variant="link-m"
                sx={{ width: "7vw" }}
                onClick={() => {
                  setCountToShowCards(countToShowCards + CONSTANTS?.TWO)
                }}>
                {CONSTANTS?.LOAD_MORE}
              </Typography>
              <StyledExpandMoreIcon />
            </LoadMoreActionBox>
          )}
        </LoadMoreStyledGridWrapper>
      )}
    </>
  )
}
export default GroupWithTwoColumnCardsGrid
