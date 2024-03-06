import React, { useContext, useEffect, useMemo, useState } from "react"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import Pluralize from "../../utils/pluralize"
import { GLOBAL_STORES } from "../../utils/Constants"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { Box, Accordion, Typography, AccordionDetails, AccordionSummary } from "@mui/material"
import { MainBox, StyledDivider, BoldTypography, CardBoxWrapper } from "./styles/shopping-sticky-card.component.styles"
import { currency2DecimalSymbol, numberFormatWithoutSymbol } from "../../utils/currency"

const ShoppingStickyCard = (props: any) => {
  const { parameterMap: labels, title } = props || {}
  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  const IHCLContexts = useContext(IHCLContext)
  const GCStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  let formValues: any = GCStore?.formValues

  let giftCardName: any = GCStore?.GCThemeData?.title?.desktopTitle?.toString()?.replaceAll(",", " ")

  const cardAmount: number = Number(
    GCStore?.buyingJourneySteps?.[1]?.selected
      ? formValues?.amount
      : GCStore?.cartDetails?.items?.giftCardDetails?.[0]?.amount,
  )
  const cardQty: number = Number(
    GCStore?.buyingJourneySteps?.[1]?.selected ? formValues?.quantity : GCStore?.cartDetails?.items?.quantity,
  )
  const totalPrice: number = cardAmount * cardQty
  const fetchCart = async () => {
    await GCStore?.gcFetchCart()
  }
  useMemo(() => {
    const isCartEmpty = Object.keys(GCStore?.cartDetails).length === 0
    if (isCartEmpty && GCStore?.buyingJourneySteps?.[2]?.selected) {
      fetchCart()
      let updateSteps: any = JSON.parse(JSON.stringify(GCStore?.buyingJourneySteps))
      updateSteps[1].selected = false
      updateSteps[1].completed = true
      updateSteps[2].selected = true
      updateSteps[3].selected = false
      GCStore?.updateBuyingJourneySteps(updateSteps)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GCStore?.cartDetails, GCStore?.buyingJourneySteps?.[2]?.selected])

  useEffect(() => {
    if (!GCStore?.buyingJourneySteps?.[3]?.selected) {
      GCStore.cartDetails = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Box sx={{ position: "relative", height: "100%" }} aria-label="shoppingCardComponent">
        <MainBox>
          <Typography variant="heading-xs" sx={{ padding: "1.04vw" }}>
            {title}
          </Typography>
          <StyledDivider sx={{ marginX: "19px" }} />

          <Box sx={{ position: "relative" }}>
            <Accordion
              onChange={() => setIsExpanded((wasExpanded: boolean) => !wasExpanded)}
              elevation={0}
              expanded={isExpanded}
              disableGutters={true}
              style={{
                padding: "1.04vw",
                backgroundColor: "transparent",
              }}>
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      cursor: "pointer",
                      width: DesktopPxToVw(24),
                      height: DesktopPxToVw(24),
                    }}
                  />
                }
                style={{
                  padding: "0px",
                  minHeight: "fit-content",
                }}
                sx={{
                  "& .MuiAccordionSummary-content": { margin: "0px" },
                }}>
                <BoldTypography variant="body-s" sx={{ width: "70%" }}>
                  {giftCardName}
                </BoldTypography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "0vw",
                }}>
                <CardBoxWrapper>
                  <Typography variant={"body-xs"} mt={DesktopPxToVw(8)}>
                    {labels?.[0]?.key}
                  </Typography>
                  <Typography variant={"body-xs"} mt={DesktopPxToVw(8)}>
                    {cardAmount ? currency2DecimalSymbol(cardAmount) : currency2DecimalSymbol(0)}
                  </Typography>
                </CardBoxWrapper>
                <CardBoxWrapper>
                  <Typography variant={"body-xs"} mt={DesktopPxToVw(8)}>
                    {labels?.[1]?.key}
                  </Typography>
                  <Typography variant={"body-xs"} mt={DesktopPxToVw(8)}>
                    {(isNaN(cardQty) ? 0 : cardQty) ?? 0}
                  </Typography>
                </CardBoxWrapper>
                <StyledDivider sx={{ marginY: DesktopPxToVw(20) }} />
                <CardBoxWrapper>
                  <BoldTypography variant={"body-s"}>{labels?.[2]?.key}</BoldTypography>
                  <BoldTypography variant={"body-s"}>
                    {GCStore?.buyingJourneySteps?.[1]?.selected
                      ? totalPrice
                        ? currency2DecimalSymbol(totalPrice)
                        : currency2DecimalSymbol(0)
                      : GCStore?.cartDetails?.priceSummary?.totalPrice
                      ? currency2DecimalSymbol(GCStore?.cartDetails?.priceSummary?.totalPrice)
                      : currency2DecimalSymbol(0)}
                  </BoldTypography>
                </CardBoxWrapper>
                {!!GCStore?.cartDetails?.priceSummary?.neuCoins && !GCStore?.buyingJourneySteps?.[1]?.selected && (
                  <CardBoxWrapper>
                    <Typography variant={"body-xs"}>
                      {`${
                        Pluralize(CONSTANTS?.NEU_COIN, GCStore?.cartDetails?.priceSummary?.neuCoins, false)?.split(
                          " ",
                        )?.[1]
                      } ${CONSTANTS?.REDEEMED}`}
                    </Typography>
                    <Typography variant={"body-xs"}>
                      {GCStore?.cartDetails?.priceSummary?.neuCoins
                        ? `- ${numberFormatWithoutSymbol(GCStore?.cartDetails?.priceSummary?.neuCoins)}`
                        : 0}
                    </Typography>
                  </CardBoxWrapper>
                )}
                <CardBoxWrapper alignItems={"flex-end"}>
                  <BoldTypography variant={"body-s"} mt={DesktopPxToVw(8)}>
                    {labels?.[4]?.key}
                  </BoldTypography>
                  <BoldTypography
                    variant={"body-xs"}
                    mt={DesktopPxToVw(8)}
                    fontSize={DesktopPxToVw(20)}
                    whiteSpace={"nowrap"}>
                    {GCStore?.cartDetails?.priceSummary?.totalPayableAmount &&
                    !GCStore?.buyingJourneySteps?.[1]?.selected
                      ? currency2DecimalSymbol(
                          isNaN(GCStore?.cartDetails?.priceSummary?.totalPayableAmount)
                            ? 0
                            : GCStore?.cartDetails?.priceSummary?.totalPayableAmount,
                        )
                      : GCStore?.buyingJourneySteps?.[1]?.selected
                      ? currency2DecimalSymbol(isNaN(totalPrice) ? 0 : totalPrice)
                      : currency2DecimalSymbol(0)}
                  </BoldTypography>
                </CardBoxWrapper>
              </AccordionDetails>
            </Accordion>
          </Box>
        </MainBox>
      </Box>
    </>
  )
}

export default observer(ShoppingStickyCard)
