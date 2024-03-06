import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { Fragment, useContext, useEffect, useState } from "react"
import BookingsFlowStore from "../../features/booking/store/pageStore/booking.store"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"

const LoyaltyConfirmationCardComponent = (props: any) => {
  const { cases, defaultCase } = props
  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)
  const [orderStatus, setOrderStatus] = useState(defaultCase)

  const loyaltyConfirmPageStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES?.loyaltyConfirmationStore
  ) as LoyaltyConfirmationPageStore

  useEffect(() => {
    let orderId = global?.window?.sessionStorage?.getItem("order_id")
    const urlParams = new URLSearchParams(global?.window?.location?.search)
    if (orderId) {
      setOrderStatus(
        urlParams?.get("status") === "CHARGED" ? "SUCCESS" : "FAILURE"
      )
      loyaltyConfirmPageStore?.confirmLoyaltyOrder(orderId || "")
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

export default observer(LoyaltyConfirmationCardComponent)
