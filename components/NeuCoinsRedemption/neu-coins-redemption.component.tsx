/**
 *  Gift card and epicure purchase neu coins redemption component
 */

import { Box } from "@mui/system"
import { observer } from "mobx-react-lite"
import { useContext, useState, useEffect } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../features/booking/store/globalStore/booking.flow.store"
import { GLOBAL_STORES } from "../../utils/Constants"
import LoadingSpinner from "../../utils/SpinnerComponent"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import NeuCoinsRedemption from "./redeem.component"
const NeuCoinsRedemptionComponent = (props: any) => {
  const isLoggedIn = useLoggedIn()
  const context: any = useContext(IHCLContext)

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore

  const {
    loading,
    setInitiatePaymentSDK,
    initiatePaymentSDK,
    setTerminatePaymentSDK,
  } = bookingFlowGlobalStore

  const [expandedAccordion, setExpandedAccordion] = useState<boolean>(false)

  const handleAccordion = () => {
    if (initiatePaymentSDK && !expandedAccordion) {
      setInitiatePaymentSDK(false)
      setTerminatePaymentSDK(true)
    }
    setExpandedAccordion(!expandedAccordion)
  }

  //* using to collapse the redeem and save accordion, if it it in open expanded state
  useEffect(() => {
    if (initiatePaymentSDK && expandedAccordion) {
      handleAccordion()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initiatePaymentSDK])
  return (
    <>
      {loading && <LoadingSpinner />}
      <Box aria-label="NeuCoinsRedemptionComponent">
        {isLoggedIn ? <NeuCoinsRedemption {...props} /> : "login first"}
      </Box>
    </>
  )
}

export default observer(NeuCoinsRedemptionComponent)
