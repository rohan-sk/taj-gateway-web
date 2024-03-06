import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const MultiRowTitle = dynamic(() => import("../hoc/title/multi-row-title"))
import React, { Fragment, useContext, useEffect, useState } from "react"
import getGiftCardDetails from "../../utils/fetchGiftCardDetails"
import { GLOBAL_STORES } from "../../utils/Constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"

const GiftCardDynamicTitle = ({ aesthetic, isMobileComponentFullWidth }: any) => {
  const router = useRouter()
  const { sku } = router.query

  const [skuDetails, setSkuDetails] = useState<any>()
  const IHCLContexts = useContext(IHCLContext)

  const giftCardFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  useEffect(() => {
    if (sku) {
      const skuDetails: any = getGiftCardDetails(sku)
      skuDetails.then((data: any) => {
        setSkuDetails(data?.[0])
        giftCardFormDetailsStore?.updateGCThemeData(data?.[0])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku])

  return (
    <Fragment>
      <MultiRowTitle
        title={skuDetails?.title}
        isComponentFullWidth={false}
        isMobileComponentFullWidth={isMobileComponentFullWidth}
        subTitle={skuDetails?.description}
        charactersLimit={250}
        alignmentVariant={"center"}
        aesthetic={aesthetic}
      />
    </Fragment>
  )
}

export default GiftCardDynamicTitle
