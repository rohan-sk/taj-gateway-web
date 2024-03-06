import React, { useContext } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { urlFor } from "../../../lib-sanity"
import { ROUTES } from "../../../utils/routes"
import { Box, Stack, Typography } from "@mui/material"
import { CONSTANTS } from "../../../components/constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { MainStack } from "./styles/no-rooms-available-at-payment-init"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"


const CartClearanceDialog = ({
  title,
  subtitle,
  largeImage,
  handleClose,
  primaryAction,
  secondaryAction,
  handleEmptyCart,
  isTajLogoClicked,
  isMyAccountClicked,
  pressedBackButton,
  setPressedBackButton,
}: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const pageContext = useContext(PageContext)
  const context: any = useContext(IHCLContext)
  const prevPath: any = globalThis?.sessionStorage?.getItem("prevPath")

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES.bookingFlowStore
  ) as BookingFlowGlobalStore
  const bookingFlowPageStore = pageContext?.getPageStore(
    PAGE_STORES?.bookingFlowStore
  ) as BookingsFlowStore

  const { currentStepper } = bookingFlowPageStore
  const { setInitiatePaymentSDK } = bookingFlowGlobalStore
  const isReservationTab = currentStepper?.stepName == CONSTANTS?.RESERVATION

  return (
    <MainStack sx={{ background: "none", width: isMobile ? "100%" : DesktopPxToVw(800) }}>
      {largeImage?.asset?._ref && (
        <Box
          alt={`-img`}
          loading="lazy"
          component={"img"}
          width={isMobile ? "37.656vw" : "14vw"}
          sx={{ marginBottom: isMobile ? "18vw" : "0vw" }}
          src={urlFor(largeImage?.asset?._ref).url()}
        />
      )}
      {title && <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>}
      {subtitle && <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>{subtitle}</Typography>}
      <Stack sx={{ flexDirection: "row", gap: isMobile ? MobilePxToVw(20) : DesktopPxToVw(20) }}>
        {primaryAction && (
          //* NO
          <RenderActionItem
            url={primaryAction?.url}
            isActionButtonType={true}
            title={primaryAction?.title}
            variant={primaryAction?.variant}
            navigationType={primaryAction?.urlType}
            buttonStyles={{
              width: isMobile ? "30.4vw" : "14vw",
            }}
            onClick={handleClose}
          />
        )}
        {secondaryAction && (
          //* YES
          <RenderActionItem
            isActionButtonType={true}
            url={secondaryAction?.url}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            buttonStyles={{
              width: isMobile ? "30.4vw" : "14vw",
            }}
            onClick={async () => {
              await handleEmptyCart()
              setInitiatePaymentSDK(false)
              if (isTajLogoClicked) {
                router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING.HOMEPAGE)
              } else if (isMyAccountClicked) {
                router?.push(ROUTES.WITHOUTSEO_FOR_ROUTING.MY_ACCOUNT.OVERVIEW)
              } else if (pressedBackButton) {
                //? if user not in the Reservation tab then only redirecting to previous page else we are clearing the cart and landing on the room listing page.
                if (!isReservationTab) {
                  router?.push(prevPath ? prevPath : ROUTES.WITHOUTSEO_FOR_ROUTING.HOMEPAGE)
                  setPressedBackButton(false)
                }
              }
            }}
          />
        )}
      </Stack>
    </MainStack>
  )
}

export default observer(CartClearanceDialog)
