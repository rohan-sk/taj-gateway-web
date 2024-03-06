import { Box } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import RenderActionItem from "../../../components/hoc/actions/action-items-ui"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../../utils/Constants"
import LoyaltyStore from "../store/pageStore/loyalty.store"
import PaymentDetails from "../../../components/GenericAccordion/payment/payment.accordion.component"
import { observer } from "mobx-react-lite"

const EpicurePaymentWidget = ({ props }: any) => {
  const pageContext = useContext(PageContext)
  const [show, setShow] = useState<boolean>(false)

  const { epcOrderId } = pageContext?.getPageStore(
    PAGE_STORES.LOYALTY_STORES.loyaltyEpicureCardsStore
  ) as LoyaltyStore

  useEffect(() => {
    if (epcOrderId) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [epcOrderId])

  return (
    <>
      {show && (
        <Box sx={{ margin: "2vw 0vw" }}>
          <PaymentDetails />
        </Box>
      )}
    </>
  )
}

export default observer(EpicurePaymentWidget)
