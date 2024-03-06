import React, { Fragment, useContext, useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { PAGE_STORES } from "../../../utils/Constants"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import { CART_SUMMARY, CONSTANTS, ICONS } from "../../constants"
import data from "../../../mock-data/gift-card/gift-card-reload.json"
import { ConfirmationMailShareIcon } from "../../../utils/customIcons"
import { BOOKING_CONSTANT } from "../../../features/booking/constants"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import ReloadGiftCardPageStore from "../../../features/giftCard/store/pageStore/reloadGC.store"
import { Box, Grid, Modal, Button, Typography } from "@mui/material"
import {
  MarginBox,
  FieldsGrid,
  ButtonBoxStyle,
  BoldTypography,
  StyledSeparator,
  SummaryTypography,
  GridRightTextAligner,
  ReloadGiftCardShareWrapper,
} from "../styles/gift-card-reload-price-breakup"

const PDFGenerator = dynamic(() => import("../../downloadPdf/ReactToPdfDowload"))
const PrintPdf = dynamic(() => import("../../GeneratePdfPrint/render-pdf-print.component"))
const LoyaltyConfirmationShare = dynamic(() => import("../../share/loyalty-share.component"))
const GiftCardReloadPrintComponent = dynamic(() => import("../../GeneratePdfPrint/gift-card-reload-print.component"))

const GiftCardReloadPriceBreakup = (props: any) => {
  const [openShare, setOpenShare] = useState(false)
  const pageContext = useContext(PageContext)

  const GiftCardReloadPageStore = pageContext?.getPageStore(
    PAGE_STORES?.GIFTCARD_STORES?.reloadGiftCardStore,
  ) as ReloadGiftCardPageStore

  const reloadGCResponse = GiftCardReloadPageStore?.paymentConfirmationResponse
  const reloadedGiftCard = reloadGCResponse?.giftCard?.[0]
  const isMobile = useMobileCheck()
  return (
    <>
      <MarginBox>
        {reloadedGiftCard && (
          <Grid container justifyContent={"flex-end"}>
            <Grid item xs={isMobile ? 12 : 5.5}>
              {isMobile && (
                <Grid container sx={{ marginBottom: "3.125vw" }}>
                  <SummaryTypography>{CART_SUMMARY}</SummaryTypography>
                </Grid>
              )}
              <FieldsGrid container>
                <Grid item xs={6}>
                  {data?.price && (
                    <Typography
                      variant={isMobile ? "m-body-s" : "body-s"}
                      sx={isMobile ? { fontsize: "3.348vw" } : { fontSize: "0.989vw" }}>
                      {data?.price}
                    </Typography>
                  )}
                </Grid>
                <GridRightTextAligner item xs={6}>
                  {reloadGCResponse?.priceTotal && (
                    <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>
                      {currencyPrettier(reloadGCResponse?.priceTotal)}
                    </Typography>
                  )}
                </GridRightTextAligner>
              </FieldsGrid>
              <StyledSeparator sx={{ marginBottom: "1.5vw !important" }} />
              <FieldsGrid container justifyContent={"space-between"}>
                {data?.newBalance && (
                  <BoldTypography variant={isMobile ? "m-body-l" : "body-l"}>{data?.newBalance}</BoldTypography>
                )}
                {reloadedGiftCard?.amount && (
                  <BoldTypography variant={isMobile ? "m-body-xl" : "body-xl"}>
                    {currencyPrettier(reloadedGiftCard?.amount)}
                  </BoldTypography>
                )}
              </FieldsGrid>
              <ButtonBoxStyle>
                <PDFGenerator
                  downloadButton={
                    <Button
                      variant={"light-contained"}
                      sx={{ "& .MuiButton-startIcon": { height: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20) } }}
                      startIcon={
                        <Box
                          sx={{
                            paddingRight: isMobile ? MobilePxToVw(0) : DesktopPxToVw(9),
                          }}
                          width={isMobile ? MobilePxToVw(20) : "100%"}
                          alt="mail-icon"
                          component={"img"}
                          src={ICONS?.WHITE_DOWNLOAD_ICON}
                        />
                      }>
                      {BOOKING_CONSTANT.DOWNLOAD}
                    </Button>
                  }
                  type="download"
                  PDFData={<GiftCardReloadPrintComponent props={props} downloadPagePDF={true} />}
                  fileNameForUrl={`${CONSTANTS?.GIFT_CARD_PDF}_${reloadGCResponse?.purchaseOrderNo}`}
                  giftCardPageResolution={true}
                />
                {data?.print && (
                  <ReloadGiftCardShareWrapper $isMobile={isMobile}>
                    <PrintPdf page="gift-card-reload" giftCardReloadConfirmation={props} />
                  </ReloadGiftCardShareWrapper>
                )}
                {data?.share && (
                  <Button
                    sx={{ gap: isMobile ? MobilePxToVw(10) : DesktopPxToVw(15) }}
                    variant="light-contained"
                    onClick={() => setOpenShare(true)}>
                    <ConfirmationMailShareIcon
                      sx={{
                        width: isMobile ? MobilePxToVw(26) : DesktopPxToVw(26),
                        height: isMobile ? MobilePxToVw(22) : DesktopPxToVw(22),
                      }}
                    />
                    <BoldTypography
                      sx={{ color: theme?.palette?.ihclPalette?.hexOne }}
                      variant={isMobile ? "m-body-xs" : "body-s"}>
                      {data?.share}
                    </BoldTypography>
                  </Button>
                )}
              </ButtonBoxStyle>
            </Grid>
          </Grid>
        )}
        {openShare && (
          <Fragment>
            <Modal open={openShare}>
              <>
                <LoyaltyConfirmationShare
                  setOpenShare={setOpenShare}
                  isReloadGiftCard
                  cardNumber={reloadGCResponse?.purchaseOrderNo}
                  props={props}
                />
              </>
            </Modal>
          </Fragment>
        )}
      </MarginBox>
    </>
  )
}
export default observer(GiftCardReloadPriceBreakup)
