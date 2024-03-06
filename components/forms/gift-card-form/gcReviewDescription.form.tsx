import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import { GAStore, UserStore } from "../../../store"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ButtonTickIcon } from "../../../utils/customIcons"
import { UseAddress } from "../../../utils/hooks/useAddress"
import { PDF_CONSTANT } from "../../GeneratePdfPrint/constants"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
import { ActionProps, singleContentInterface } from "../../types"
const CustomCheckBox = dynamic(() =>
  import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox),
)
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { MemberDataLayer } from "../../../utils/analytics/member-data-layer"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { handleGCAddToCart } from "../../../utils/analytics/events/Ecommerce/GC-Journey/add-to-cart-gc"
import manageGCStore from "../../../features/giftCard/store/pageStore/manageGC.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import GiftCardStore from "../../../features/giftCard/store/globalStore/gift-card.store"
import {
  TCBox,
  FormBox,
  StyledButton,
  PortableTextBox,
  GcReviewTotalAmountBox,
  ErrorMessageTypography,
  RenderActionsButtonsBox,
} from "./styles"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import useStorage from "../../../utils/useStorage"

type GcReviewDescriptionFormData = {
  primaryAction?: ActionProps
  secondaryAction?: ActionProps
  singleContent?: singleContentInterface[]
}

const GcReviewDescriptionForm = ({ primaryAction, secondaryAction, singleContent }: GcReviewDescriptionFormData) => {
  const pageContext = useContext(PageContext)
  const isMobile = useMobileCheck()
  const [apiResCheck, setApiResCheck] = useState<any>("")
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const router = useRouter()
  const isLoggedIn = useLoggedIn()
  const { getItem } = useStorage()
  const GCStore = context?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore
  const isUserLoggedIn: any = global?.localStorage?.getItem("customerHash")
  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const address = UseAddress(UserStore)
  const isDisable = GCStore?.isChecked && GCStore?.isButtonDisabled

  const handleGCOpenPayment = async () => {
    if (isMobile && !GCStore?.isButtonDisabled) {
      GCStore?.updateIsButtonDisabled(!GCStore?.isButtonDisabled)
    }

    if (giftCardManageStore?.showRedeemAndPayment) {
      return
    }

    const response = await GCStore?.createGCOrder()
    if (!response.error) {
      GCStore?.updateIsButtonDisabled(true)
      const updateSteps: any = JSON.parse(JSON.stringify(GCStore?.buyingJourneySteps))
      updateSteps[2].selected = false
      updateSteps[2].completed = true
      updateSteps[3].selected = true
      GCStore?.updateBuyingJourneySteps(updateSteps)
      giftCardManageStore?.updateOrderId(response?.data?.orderId)

      // Add a new query parameter
      const updatedQuery = {
        orderId: response?.data?.orderId,
        sku: router?.query?.sku as string,
      }

      // Create a new URL with the updated query parameters
      const updatedUrl = `${window.location?.pathname}?${new URLSearchParams(updatedQuery).toString()}`
      // Update the browser URL
      window.history.replaceState({}, "", updatedUrl)

      giftCardManageStore?.updateActiveAccordion(isLoggedIn ? 0 : 1)
      giftCardManageStore?.updateShowRedeemAndPayment(true)
    } else {
      GCStore?.updateIsButtonDisabled(false)
      setApiResCheck(response?.data)
    }
  }

  const backToEditDetails = () => {
    GCStore?.updateTcCheck(false)
    if (isMobile && GCStore?.isButtonDisabled) {
      return
    }
    router.push({
      pathname: primaryAction?.url,
      query: { sku: GCStore?.GCThemeData?.sku, editing: true },
    })
  }
  useEffect(() => {
    handleGCAddToCart("view_cart", dataLayer, address, GCStore, isUserLoggedIn, getItem)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <FormBox sx={{ margin: isMobile ? "3vw 0vw" : "2vw 3vw" }} aria-label="gc-review-description-form">
        <Box>
          <GcReviewTotalAmountBox>
            <Typography textTransform={"uppercase"} variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {PDF_CONSTANT?.TOTAL} &nbsp;
            </Typography>
            <Typography
              component={"span"}
              variant={isMobile ? "m-heading-s" : "heading-s"}
              sx={{ color: theme?.palette?.ihclPalette?.hexTwo }}>
              {currencyPrettier(GCStore?.cartDetails?.priceSummary?.totalPrice ?? 0)}
            </Typography>
          </GcReviewTotalAmountBox>
          <TCBox
            sx={{
              gap: isMobile ? `${MobilePxToVw(0)} !important` : `${DesktopPxToVw(20)} !important`,
              mb: isMobile ? `${MobilePxToVw(42)} !important` : `${DesktopPxToVw(0)} !important`,
            }}>
            <CustomCheckBox
              isCheckBoxDisabled={isMobile ? GCStore?.isButtonDisabled ?? false : isDisable ?? false}
              withBorder={true}
              checked={GCStore?.isChecked ?? false}
              onChange={() => {
                GCStore?.updateTcCheck(!GCStore?.isChecked)
              }}
              name={"TCTitle"}
            />

            <PortableTextBox
              $isMobile={isMobile}
              sx={{
                "& span": {
                  fontSize: isMobile ? `${MobilePxToVw(18)} !important` : `${DesktopPxToVw(18)} !important`,
                },
              }}>
              {singleContent?.map((item: singleContentInterface, idx: number) => (
                <PortableText blocks={item} key={idx} />
              ))}
            </PortableTextBox>
          </TCBox>
          {apiResCheck?.message && (
            <ErrorMessageTypography sx={{ textAlign: "center", mb: "2vw", mt: "0vw" }}>
              {apiResCheck?.message}
            </ErrorMessageTypography>
          )}
        </Box>

        {(primaryAction?.title || secondaryAction?.title) && (
          <RenderActionsButtonsBox $isMobile={isMobile} $isCurrentPage={true}>
            <RenderActionItem
              isDisableRippleEffect={isDisable ? isDisable : false}
              isDisable={isMobile ? !GCStore?.isButtonDisabled ?? false : !isDisable ?? false}
              isActionButtonType={true}
              url={(primaryAction?.url as string) || ""}
              title={(primaryAction?.title as string) || ""}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              onClick={() => !isDisable && backToEditDetails()}
              buttonStyles={{
                whiteSpace: "nowrap !important",
                padding: isMobile ? "" : `${DesktopPxToVw(17.8)} ${DesktopPxToVw(57)}`,
                letterSpacing: "0.1em",
                backgroundColor: isDisable ? theme?.palette?.ihclPalette?.hexSixteen : "",
                color: isDisable ? theme?.palette?.ihclPalette?.hexTwelve : "",
                " &:hover": {
                  backgroundColor: isDisable ? theme?.palette?.ihclPalette?.hexSixteen : "",
                  cursor: isDisable ? "not-allowed" : "pointer",
                },
              }}
            />
            <StyledButton
              $active={true}
              disabled={!GCStore?.isChecked}
              name={secondaryAction?.title}
              onClick={() => {
                !giftCardManageStore?.showRedeemAndPayment && GCStore?.isChecked && handleGCOpenPayment()
                handleGCAddToCart(
                  "begin_checkout",
                  dataLayer,
                  address,
                  GCStore,
                  isUserLoggedIn,
                  getItem,
                  secondaryAction?.title,
                  secondaryAction?.url,
                  secondaryAction?.urlType,
                )
              }}
              startIcon={
                (GCStore?.isButtonDisabled || isDisable) &&
                !isMobile && (
                  <ButtonTickIcon
                    sx={{
                      width: isMobile ? MobilePxToVw(30) : DesktopPxToVw(30),
                    }}
                  />
                )
              }
              sx={{
                height: isMobile ? `${MobilePxToVw(61)} !important` : `${DesktopPxToVw(61)} !important`,
                letterSpacing: "0.1em",
                backgroundColor: !GCStore?.isChecked ? theme?.palette?.ihclPalette?.hexTwentyNine : "",
                color: !GCStore?.isChecked ? theme?.palette?.ihclPalette?.hexTwelve : "",
                " &:hover": {
                  backgroundColor: !GCStore?.isChecked ? theme?.palette?.ihclPalette?.hexTwentyNine : "",
                  cursor: !GCStore?.isChecked ? "not-allowed" : "pointer",
                },
                borderColor: !GCStore?.isChecked ? `${theme?.palette?.ihclPalette?.hexTwentyNine} !important` : "",
                padding: isMobile
                  ? GCStore?.isButtonDisabled ?? isDisable
                    ? `${MobilePxToVw(18)}  ${MobilePxToVw(26)} !important`
                    : `${MobilePxToVw(18)}  ${MobilePxToVw(36)} !important`
                  : "",
                fontWeight: "700 !important",
                fontSize: isMobile ? `${MobilePxToVw(18)} !important` : `${DesktopPxToVw(18)} !important`,
              }}>
              {secondaryAction?.title}
            </StyledButton>
          </RenderActionsButtonsBox>
        )}
      </FormBox>
    </>
  )
}

export default observer(GcReviewDescriptionForm)
