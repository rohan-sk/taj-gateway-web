import { useContext, useRef, useEffect } from "react"
import dynamic from "next/dynamic"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { currency2DecimalSymbol } from "../../utils/currency"
import { AccordionDetails, Box, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const PaymentDetails = dynamic(() => import("./payment/payment.accordion.component"))
import { DefaultColor, MainAccordion, MainAccordionSummary, TitleSubTitleWrapper } from "./gift-card.styles"

const AccordionWrapperComponent = ({
  sx,
  item,
  open,
  setActiveAccordion,
  index,
  activeAccordion,
}: any) => {
  const accordionRef = useRef<any>(null)
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const { primaryAction, secondaryAction } = item
  const GCStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const redeemedButton = !!GCStore?.cartDetails?.priceSummary?.neuCoins ? secondaryAction?.title : primaryAction?.title
  useEffect(() => {
    if (accordionRef?.current) {
      accordionRef.current.scrollIntoView({
        block: "center",
        inline: "nearest",
        behavior: "smooth",
      })
    }
  }, [])

  return (
    <Box
      ref={accordionRef}
      aria-label="generic accordion component"
      sx={{
        margin: isMobile
          ? `${MobilePxToVw(40)} ${MobilePxToVw(0)}`
          : `${DesktopPxToVw(40)} 0px`,
        ...sx,
      }}>
      <MainAccordion disableGutters expanded={open} className="redeem-card">
        <MainAccordionSummary
          onClick={() =>
            activeAccordion !== index
              ? setActiveAccordion(index)
              : setActiveAccordion(null)
          }>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            justifyContent={"space-between"}>
            <TitleSubTitleWrapper>
              <DefaultColor
                variant={isMobile ? "m-heading-s" : "heading-s"}
                sx={{ paddingBottom: "0.4vw" }}>
                {item?.title?.desktopTitle?.[0] || item?.title}
              </DefaultColor>

              <Typography variant={isMobile ? "m-body-s" : "body-m"}>
                {item?.subtitle || item?.subTitle}
              </Typography>
              <br />

              {index === 1 && (
                <Typography variant={isMobile ? "m-body-s" : "body-m"}>
                  Total to Pay{" "}
                  {GCStore?.cartDetails?.priceSummary?.totalPayableAmount
                    ? currency2DecimalSymbol(
                        isNaN(
                          GCStore?.cartDetails?.priceSummary?.totalPayableAmount
                        )
                          ? 0
                          : GCStore?.cartDetails?.priceSummary
                              ?.totalPayableAmount
                      )
                    : 0}
                </Typography>
              )}
            </TitleSubTitleWrapper>

            <RenderActionItem
              isActionButtonType={true}
              url=""
              title={index === 0 ? redeemedButton : primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                minWidth: DesktopPxToVw(215),
                letterSpacing: "0.1em",
              }}
            />
          </Stack>
        </MainAccordionSummary>
        <AccordionDetails sx={{ padding: "0vw", height: "fit-Content" }}>
          {index === 1 ? (
            <PaymentDetails />
          ) : (
            context!.renderComponent(item._type, item, index)
          )}
        </AccordionDetails>
      </MainAccordion>
    </Box>
  )
}

export default AccordionWrapperComponent
