import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import OffersStore from "../../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import { useMobileCheck } from "../../../utils/isMobilView"
import dynamic from "next/dynamic"
const OffersStayDatesCard = dynamic(() => import("../../../components/card/offers-stay-dates-card.component"))
const OffersDatesTemplate = ({
  contentType,
  groupLargeVariant,
  ctaActionData,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  aesthetic,
  cardLargeVariant,
  alignmentVariant,
  title,
  isHidden = false,
}: any) => {
  const Context = useContext(IHCLContext)
  const offerStore = Context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore

  return (
    <>
      {offerStore?.offersData && !isHidden && (
        <OffersStayDatesCard aesthetic={aesthetic} data={offerStore?.offersData} />
      )}
    </>
  )
}

export default observer(OffersDatesTemplate)
