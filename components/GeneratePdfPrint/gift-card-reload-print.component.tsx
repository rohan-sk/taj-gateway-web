import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { PAGE_STORES } from "../../utils/Constants"
import { Box, Grid, Typography } from "@mui/material"
import { currencyPrettier } from "../../utils/currency"
import { useMobileCheck } from "../../utils/isMobilView"
import { useBrowserCheck } from "../../utils/hooks/useBrowserCheck"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardReloadDetailsComponent from "../card/gift-card-reload-details.component"
import ReloadGiftCardPageStore from "../../features/giftCard/store/pageStore/reloadGC.store"
import {
  BoldTypography,
  FieldsGrid,
  GridRightTextAligner,
  MarginBox,
  StyledSeparator,
} from "../card/styles/gift-card-reload-price-breakup"
import MultiRowTitle from "../hoc/title/multi-row-title"
import { GIFT_CARD_CONSTANTS } from "../forms/gift-card-form/constants"

const GiftCardReloadPrint = ({ props, downloadPagePDF = false, isPrintAction = false }: any) => {
  const pageContext = useContext(PageContext)
  const GiftCardReloadPageStore = pageContext?.getPageStore(
    PAGE_STORES?.GIFTCARD_STORES?.reloadGiftCardStore,
  ) as ReloadGiftCardPageStore

  const isMobile = useMobileCheck()
  const { isSafari, isIos } = useBrowserCheck()

  const reloadGCResponse = GiftCardReloadPageStore?.paymentConfirmationResponse
  const reloadedGiftCard = reloadGCResponse?.giftCard?.[0]
  return (
    <Box
      width={
        isMobile
          ? isIos
            ? downloadPagePDF
              ? MobilePxToVw(1280)
              : "100%"
            : downloadPagePDF
            ? MobilePxToVw(1280)
            : "100%"
          : DesktopPxToVw(1920)
      }
      sx={{
        marginTop: isPrintAction ? (isMobile ? MobilePxToVw(20) : DesktopPxToVw(80)) : 0,
      }}>
      <Box
        sx={{
          ".multi-row-group-title": { fontSize: isMobile && downloadPagePDF ? "7vw" : "3.75vw !important" },
          ".multi-row-group-subtitle": {
            fontSize: isMobile && downloadPagePDF ? "3vw" : "1.667vw",
            maxWidth: isMobile && downloadPagePDF ? MobilePxToVw(950) : "62vw",
          },
        }}>
        <MultiRowTitle
          subTitle={props?.description}
          title={{
            mobileTitle: [props.title],
            desktopTitle: [props.title],
            headingElement: undefined,
          }}
          charactersLimit={props?.description?.length}
          alignmentVariant={"center"}
          aesthetic={undefined}
          isComponentFullWidth={false}
          isMobileComponentFullWidth={false}
        />
      </Box>
      <GiftCardReloadDetailsComponent
        parameterMap={props?.parameterMap}
        printPage={isPrintAction}
        downloadPagePDF={downloadPagePDF}
      />
      <MarginBox>
        <Grid container justifyContent={"flex-end"}>
          <Grid lg={5.5} md={5.5} xs={5.5} sm={5.5}>
            {reloadGCResponse?.priceTotal && (
              <FieldsGrid container>
                <Grid xs={6}>
                  <Typography
                    variant={isMobile ? "m-body-s" : "body-s"}
                    fontSize={isMobile ? (downloadPagePDF ? "2.8vw" : "1.8vw") : "1.458vw"}>
                    {GIFT_CARD_CONSTANTS?.PRICE}
                  </Typography>
                </Grid>
                <GridRightTextAligner xs={6}>
                  <Typography
                    variant={isMobile ? "m-body-ml" : "body-ml"}
                    fontSize={isMobile ? (downloadPagePDF ? "3vw" : "2vw") : "1.771vw"}>
                    {currencyPrettier(reloadGCResponse?.priceTotal)}
                  </Typography>
                </GridRightTextAligner>
              </FieldsGrid>
            )}
            <StyledSeparator sx={{ marginBottom: "1.5vw !important" }} />
            {reloadedGiftCard?.amount && (
              <FieldsGrid container justifyContent={"space-between"}>
                <BoldTypography
                  variant={isMobile ? "m-body-l" : "body-l"}
                  fontSize={isMobile ? (downloadPagePDF ? "3.5vw" : "1.771vw") : "1.771vw"}>
                  {GIFT_CARD_CONSTANTS?.NEW_BALANCE}
                </BoldTypography>
                <BoldTypography
                  variant={isMobile ? "m-body-xl" : "body-xl"}
                  fontSize={isMobile ? (downloadPagePDF ? "3.5vw" : "2.188vw") : "2.188vw"}>
                  {currencyPrettier(reloadedGiftCard?.amount)}
                </BoldTypography>
              </FieldsGrid>
            )}
          </Grid>
        </Grid>
      </MarginBox>
    </Box>
  )
}

export default observer(GiftCardReloadPrint)
