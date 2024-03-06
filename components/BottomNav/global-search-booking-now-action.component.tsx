import { Box } from "@mui/material"
import { ICONS } from "../constants"
import { ActionProps } from "../types"
import { theme } from "../../lib/theme"
import React, { useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  PrimaryActionWrapperContentBox,
  NavigationButtonTitleTypography,
  TwoActionButtonsWrapperContentBox,
  PrimaryActionButtonTitleTypography,
  SearchBookingActionWrapperContentBox,
} from "./styles/global-search-booking-now-action-component.styles"
import dynamic from "next/dynamic"
const SearchModalComponent = dynamic(() => import("../modal/search-modal.component"))
const BasicModal = dynamic(() => import("../hoc/modal/modal"))

interface globalSearchBookingNowActionComponentItems {
  url: string
  _type: string
  variant: string
  ctaLabel: string
  urlType: string | any
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isMultiBlockContent: boolean
  searchData?: any
}

const GlobalSearchBookingNowActionComponent = ({
  url,
  urlType,
  ctaLabel,
  searchData,
  primaryAction,
  secondaryAction,
}: globalSearchBookingNowActionComponentItems) => {
  const navigate = useAppNavigation()
  const [mobilOpenModel, setMobilOpenModel] = useState<boolean>(false)
  const handleModelOpening = () => (mobilOpenModel === true ? setMobilOpenModel(false) : setMobilOpenModel(true))

  return (
    <SearchBookingActionWrapperContentBox aria-label="default-bottom-nav">
      {ctaLabel && (
        <TwoActionButtonsWrapperContentBox
          sx={{
            borderRight: `0.156vw solid ${theme?.palette?.ihclPalette?.hexSeventeen}`,
          }}
          onClick={() => {
            navigate(url, urlType)
          }}>
          <Box
            component={"img"}
            alt="-search"
            height={"4.063vw"}
            width={"4.063vw"}
            src={ICONS?.OFFERS_ICON}
            sx={{ marginRight: "2.031vw" }}
          />
          <NavigationButtonTitleTypography variant="m-body-m">{ctaLabel}</NavigationButtonTitleTypography>
        </TwoActionButtonsWrapperContentBox>
      )}
      {secondaryAction?.title && (
        <TwoActionButtonsWrapperContentBox onClick={() => handleModelOpening()}>
          <Box
            component={"img"}
            alt="-search"
            height={"4.063vw"}
            width={"4.063vw"}
            src={ICONS?.SEARCH_ICON}
            sx={{ marginRight: "2.031vw" }}
          />
          <NavigationButtonTitleTypography variant="m-body-m">{secondaryAction?.title}</NavigationButtonTitleTypography>
        </TwoActionButtonsWrapperContentBox>
      )}
      {primaryAction?.title && (
        <PrimaryActionWrapperContentBox
          onClick={() => {
            navigate(primaryAction?.url, primaryAction?.urlType)
          }}>
          <PrimaryActionButtonTitleTypography variant="m-body-m">
            {primaryAction?.title}
          </PrimaryActionButtonTitleTypography>
        </PrimaryActionWrapperContentBox>
      )}
      <>
        {mobilOpenModel && (
          <BasicModal
            width={"100%"}
            height={"100%"}
            open={mobilOpenModel}
            bgcolor={theme?.palette?.background?.paper}
            handleClose={handleModelOpening}
            Component={<SearchModalComponent handleClose={handleModelOpening} props={{ searchData: searchData }} />}
            isMsiteCloseIconVisible={false}
          />
        )}
      </>
    </SearchBookingActionWrapperContentBox>
  )
}

export default GlobalSearchBookingNowActionComponent
