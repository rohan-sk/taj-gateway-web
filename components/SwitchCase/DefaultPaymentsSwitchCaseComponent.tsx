import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Fragment, useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import manageGCStore from "../../features/giftCard/store/pageStore/manageGC.store"

const DefaultPaymentsSwitchCaseComponent = (props: any) => {
  const { cases, defaultCase } = props
  const context = useContext(IHCLContext)
  const [orderStatus, setOrderStatus] = useState(defaultCase)
  const pageContext = useContext(PageContext)
  const loyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const giftCardManageStore = pageContext?.getPageStore(PAGE_STORES?.giftCardManageCard) as manageGCStore

  const orderId = global?.window?.sessionStorage?.getItem("order_id")
  useEffect(() => {
    if (loyaltyEpicureStore?.error || giftCardConfirmationPageStore?.error) {
      setOrderStatus("FAILURE")
    }
  }, [loyaltyEpicureStore?.error, giftCardConfirmationPageStore?.error])
  useEffect(() => {
    if (orderId) {
      setOrderStatus(defaultCase)
      giftCardManageStore?.clearOrderId()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {cases?.map(({ item, value }: any, key: React.Key | null | undefined) => (
        <Fragment key={key}>
          {orderStatus === value
            ? context?.renderComponent(item?.[0]?._type, {
                ...item?.[0],
              })
            : null}
        </Fragment>
      ))}
    </Box>
  )
}

export default observer(DefaultPaymentsSwitchCaseComponent)
