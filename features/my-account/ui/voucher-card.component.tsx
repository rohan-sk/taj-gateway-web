import React, { Fragment, useState } from "react"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { LoadMoreStack } from "./styles/voucher-card"
import { useMobileCheck } from "../../../utils/isMobilView"
import dynamic from "next/dynamic"
import { CONSTANTS, OVER_VIEW_FILTER_VOUCHERS } from "../../../components/constants"
import {
  NoBookingsSection,
  NoBookingsSectionText,
} from "../../../components/MyAccount/over-view/styles/render-over-view"
import { StyledChevronDown } from "../../../components/group/styles/group-with-facilities-styles"

const SingleVoucherCardComponent = dynamic(() => import("./single-voucher-card.component"))
const VoucherSliderComponent = dynamic(() => import("./voucher-slider.component"))

const VoucherCard = ({
  primaryAction,
  selectedStatus,
  filteredVouchers,
  cmsVouchersData,
  getCardBackgroudColor,
  productCategory,
}: any) => {
  const isMobile = useMobileCheck()
  const loadableVouchers = 6
  const [loadAvailableVouchers, setLoadAvailableVouchers] = useState(loadableVouchers)
  const [loadRedeemVouchers, setLoadRedeemVouchers] = useState(loadableVouchers)
  const isAvailableVouchers = selectedStatus?.toLowerCase() === "available"
  const loadableValue = isAvailableVouchers ? loadAvailableVouchers : loadRedeemVouchers

  const backgroundColor =
    (getCardBackgroudColor ? getCardBackgroudColor : theme?.palette?.neuPalette?.hexOne?.toLowerCase()) ===
    theme?.palette?.neuPalette?.hexThree?.toLowerCase()

  return (
    <Box sx={{ marginTop: isMobile ? "5.469vw" : "initial" }} aria-label="VouchersContainer">
      {filteredVouchers !== undefined && filteredVouchers?.length > 0 ? (
        <>
          {filteredVouchers?.slice(0, loadableValue)?.map((card: any, index: number) => (
            <Fragment key={index}>
              {Array?.isArray(card) ? (
                <>
                  <VoucherSliderComponent
                    card={card}
                    cmsVouchersData={cmsVouchersData}
                    primaryAction={primaryAction}
                    selectedStatus={selectedStatus}
                    backgroundColor={backgroundColor}
                    productCategory={productCategory}
                  />
                </>
              ) : (
                <>
                  <SingleVoucherCardComponent
                    cardChild={card}
                    cmsVouchersData={cmsVouchersData}
                    primaryAction={primaryAction}
                    selectedStatus={selectedStatus}
                    productCategory={productCategory}
                  />
                </>
              )}
            </Fragment>
          ))}
          {isAvailableVouchers ? (
            <>
              {filteredVouchers?.length > loadAvailableVouchers && (
                <LoadMoreStack
                  onClick={() => {
                    setLoadAvailableVouchers((prev: any) => prev + loadableVouchers)
                  }}>
                  <Typography variant={isMobile ? "m-link-m" : "link-m"}>{CONSTANTS?.LOAD_MORE}</Typography>
                  <StyledChevronDown $more={true} />
                </LoadMoreStack>
              )}
            </>
          ) : (
            <>
              {filteredVouchers?.length > loadRedeemVouchers && (
                <LoadMoreStack
                  onClick={() => {
                    setLoadRedeemVouchers((prev: any) => prev + loadableVouchers)
                  }}>
                  <Typography variant={isMobile ? "m-link-m" : "link-m"}>{CONSTANTS?.LOAD_MORE}</Typography>
                  <StyledChevronDown $more={true} />
                </LoadMoreStack>
              )}
            </>
          )}
        </>
      ) : (
        <NoBookingsSection $mobile={isMobile}>
          <NoBookingsSectionText $mobile={isMobile}>{OVER_VIEW_FILTER_VOUCHERS}</NoBookingsSectionText>
        </NoBookingsSection>
      )}
    </Box>
  )
}

export default observer(VoucherCard)
