import { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"
import { OffersStore } from "../../../store"
import { GLOBAL_STORES } from "../../../utils/Constants"

const OffersRichTextCardLayoutPlaceholder = ({
  cardLargeVariant,
  aesthetics,
  cardMobileVariant,
  title,
  groupLargeVariant,
  groupMobileVariant,
  cardAesthetic,
}: any) => {
  const context = useContext(IHCLContext)
  const offerStore = context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore

  const componentProps: any = {
    content: offerStore?.offersData?.bookNowWidget,
    largeVariant: cardLargeVariant,
    variant: cardMobileVariant || cardLargeVariant,
    aesthetic: cardAesthetic,
    isHidden: offerStore?.offersData?.hideBookNowWidget,
    _type: "card",
  }

  return <>{context?.renderComponent(componentProps?._type, { ...componentProps })}</>
}
export default observer(OffersRichTextCardLayoutPlaceholder)
