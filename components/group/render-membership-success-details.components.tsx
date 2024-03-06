import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import dynamic from "next/dynamic"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import { observer } from "mobx-react-lite"
const LoadingSpinner = dynamic(() => import("../../utils/SpinnerComponent"))
import ReloadGiftCardPageStore from "../../features/giftCard/store/pageStore/reloadGC.store"

interface MembershipSuccessDetailsProps {
  props: MembershipSuccessDetailsItems[]
}

type MembershipSuccessDetailsItems = {
  urlType: string
  _type: string
}

const RenderMembershipSuccessDetails = ({
  props,
}: MembershipSuccessDetailsProps) => {
  const pageContext = useContext(PageContext)
  const loyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore
  ) as LoyaltyConfirmationPageStore
  const GiftCardReloadPageStore = pageContext?.getPageStore(
    PAGE_STORES?.GIFTCARD_STORES?.reloadGiftCardStore
  ) as ReloadGiftCardPageStore
  const context = useContext(IHCLContext)
  return (
    <>
      {loyaltyEpicureStore?.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {props?.map((item: MembershipSuccessDetailsItems, index: number) => {
            return (
              <Fragment key={index}>
                {context?.renderComponent(item._type, {
                  ...item,
                })}
              </Fragment>
            )
          })}
        </>
      )}
    </>
  )
}

export default observer(RenderMembershipSuccessDetails)
