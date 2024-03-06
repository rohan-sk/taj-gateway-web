import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { ExpandLessIcon, ExpandMoreIcon } from "../header/styles/booking-menu"
import LoyaltyStore from "../../features/loyalty/store/pageStore/loyalty.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Accordion, AccordionSummary, Collapse, Divider, Typography } from "@mui/material"
import { EPICURE_NEU_COINS_REDEMPTION_CONSTANTS } from "../../features/loyalty/UI/constants"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import {
  currency2DecimalSymbol,
  currencyWithNoDecimalsWithMinus,
  formatCurrencyWithMinusOnlyIndia,
} from "../../utils/currency"
import {
  AccordionDetailsEpicure,
  BoxShowDetails,
  MainEpicureBox,
  MainGridEpicure,
  PriceWrapper,
  StackCardType,
  TypographyPriceCart,
  TypographySummery,
  TypographyTaxFees,
  TypographyTotalEpicure,
} from "./styles/epicure-cart-summery.styles"

const EpicureCartSummery = (props: any) => {
  const [showDetail, setShowDetail] = useState<boolean>(true)
  const [discountText, setDiscountText] = useState<string>("")

  const isLoggedIn = useLoggedIn()
  const pageContext = useContext(PageContext)
  const context = useContext(IHCLContext)

  const { neuCoinRedeemed } = EPICURE_NEU_COINS_REDEMPTION_CONSTANTS

  //global loyalty store
  const { epicureCardData } = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  const { totalAmountPayable, epcTenderModeDetails } = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore,
  ) as LoyaltyStore

  const handleClick = () => {
    setShowDetail(!showDetail)
  }

  useEffect(() => {
    props?.parameterMap?.map((item: any) => {
      if (item?.value !== undefined) {
        if (item?.key?.toLowerCase() === "shareholder" && epicureCardData?.isShareHolder) {
          setDiscountText(item?.value)
        } else if (item?.key?.toLowerCase() === "tata" && epicureCardData?.isTata) {
          setDiscountText(item?.value)
        } else if (
          item?.key?.toLowerCase() === "renewal" &&
          epicureCardData?.memberShipPurchaseType?.toLowerCase() === "renewal"
        ) {
          setDiscountText(item?.value)
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainGridEpicure aria-label={"EpicureCartSummaryCard"}>
      <MainEpicureBox>
        <Typography variant="heading-xs">{props?.title}</Typography>
        <Accordion
          onChange={() => {
            handleClick()
          }}
          elevation={0}
          expanded={true}
          disableGutters={true}
          sx={{
            padding: "1.04vw 0vw",
            borderRadius: "0vw",
            backgroundColor: "transparent",
            "& .MuiAccordionSummary-root": {
              alignItems: "center",
              padding: "0vw",
            },
          }}>
          <>
            <AccordionSummary
              expandIcon={
                !showDetail ? (
                  <ExpandLessIcon sx={{ width: "1.5vw", height: "1.5vw" }} />
                ) : (
                  <ExpandMoreIcon sx={{ cursor: "pointer", width: "1.5vw", height: "1.5vw" }} />
                )
              }
              sx={{
                padding: "0vw",
                cursor: "default",
                minHeight: "fit-content",
                "& .MuiAccordionSummary-content": { margin: "0vw" },
              }}>
              <StackCardType>{`Epicure ${epicureCardData?.epicureType}`}</StackCardType>
            </AccordionSummary>
          </>
          <>
            <AccordionDetailsEpicure>
              <BoxShowDetails>
                <>
                  <Collapse in={showDetail}>
                    <Divider sx={{ marginTop: "1vw", marginBottom: DesktopPxToVw(16) }} />
                    <PriceWrapper>
                      <TypographyPriceCart variant="body-xs">{props?.parameterMap?.[0]?.key}</TypographyPriceCart>
                      <TypographyPriceCart variant="body-xs">
                        {currency2DecimalSymbol(Number(epicureCardData?.price )?? 0)}
                      </TypographyPriceCart>
                    </PriceWrapper>
                    {!!epicureCardData?.discountAmount &&
                      (epicureCardData?.memberShipPurchaseType?.toLowerCase() === "renewal" ||
                        epicureCardData?.isShareHolder ||
                        epicureCardData?.isTata) && (
                        <PriceWrapper sx={{ marginTop: "0.4vw", marginBottom: "0vw" }}>
                          {!!epicureCardData?.discountPercentage && (
                            <TypographyPriceCart variant="body-xs">
                              {`${discountText} (${epicureCardData?.discountPercentage}%)`}
                            </TypographyPriceCart>
                          )}
                          {epicureCardData?.discountAmount && (
                            <TypographyPriceCart sx={{ whiteSpace: "nowrap" }} variant="body-xs">
                              {formatCurrencyWithMinusOnlyIndia(Number(epicureCardData?.discountAmount )?? 0)}
                            </TypographyPriceCart>
                          )}
                        </PriceWrapper>
                      )}
                    {!!epicureCardData?.discountAmount && !!epicureCardData?.price && (
                      <PriceWrapper sx={{ marginTop: "0.4vw", marginBottom: "0vw" }}>
                        <TypographyPriceCart variant="body-xs">{props?.parameterMap?.[5]?.key}</TypographyPriceCart>
                        <TypographyPriceCart variant="body-xs">
                          {currency2DecimalSymbol(
                            Number(epicureCardData?.price ) - Number(epicureCardData?.discountAmount ),
                          )}
                        </TypographyPriceCart>
                      </PriceWrapper>
                    )}
                    <PriceWrapper
                      sx={{
                        margin: "0vw !important",
                        alignItems: "center",
                        height: DesktopPxToVw(30),
                        paddingLeft: DesktopPxToVw(4),
                      }}>
                      <TypographyTaxFees
                        sx={{ cursor: "initial", marginTop: DesktopPxToVw(8) }}
                        lineHeight={"140%"}
                        variant="body-xs">
                        {props?.parameterMap?.[1]?.key}
                      </TypographyTaxFees>
                      <TypographyTotalEpicure
                        variant="body-xs"
                        sx={{
                          cursor: "initial",
                        }}>
                        {currency2DecimalSymbol(
                          Number(epicureCardData?.tax ) - Number(epicureCardData?.discountTax ),
                        )}
                      </TypographyTotalEpicure>
                    </PriceWrapper>
                    {isLoggedIn &&
                      (!!epcTenderModeDetails?.data?.priceSummary?.neuCoins || !!epicureCardData?.neuCoins) && (
                        <PriceWrapper>
                          <TypographyPriceCart variant="body-xs">
                            {epcTenderModeDetails?.data?.priceSummary?.neuCoins > 1
                              ? props?.parameterMap?.[2]?.key
                              : neuCoinRedeemed}
                          </TypographyPriceCart>
                          <TypographyPriceCart variant="body-xs">
                            {!!epcTenderModeDetails?.data?.priceSummary?.neuCoins
                              ? `${currencyWithNoDecimalsWithMinus(
                                  epcTenderModeDetails?.data?.priceSummary?.neuCoins ?? 0
                                )}`
                              : `${currencyWithNoDecimalsWithMinus(epicureCardData?.neuCoins )?? 0}`}
                          </TypographyPriceCart>
                        </PriceWrapper>
                      )}
                    <PriceWrapper sx={{ cursor: "initial", marginTop: DesktopPxToVw(8) }}>
                      <TypographySummery variant="body-xs">{props?.parameterMap?.[3]?.key}</TypographySummery>
                      <TypographySummery variant="body-m" sx={{ fontWeight: 700 }}>
                        {epcTenderModeDetails?.data?.priceSummary?.neuCoins !== undefined
                          ? currency2DecimalSymbol(Number(totalAmountPayable )?? 0)
                          : currency2DecimalSymbol(Number(epicureCardData?.totalPayableAmount )?? 0)}
                      </TypographySummery>
                    </PriceWrapper>
                  </Collapse>
                </>
              </BoxShowDetails>
            </AccordionDetailsEpicure>
          </>
        </Accordion>
      </MainEpicureBox>
    </MainGridEpicure>
  )
}

export default observer(EpicureCartSummery)
