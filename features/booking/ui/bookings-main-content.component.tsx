import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { BookingsMainContentTypes } from "../types"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import BookingsFlowStore from "../store/pageStore/booking.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"

const BookingsMainContent = (props: BookingsMainContentTypes) => {
  const { cases, defaultCase } = props

  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const BookingFlowStore = pageContext?.getPageStore(
    PAGE_STORES?.bookingFlowStore
  ) as BookingsFlowStore

  const bookingFlowGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.bookingFlowStore
  ) as BookingFlowGlobalStore

  const { currentStepper } = BookingFlowStore

  useEffect(() => {
    BookingFlowStore.updateCurrentStepper({
      stepName: defaultCase,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingFlowGlobalStore?.roomsAvailability])

  return (
    <>
      {cases?.map(({ item, value }: any, index: number) => (
        <>
          {value === currentStepper?.stepName && (
            <>
              {item?.map((subItems: any) =>
                context?.renderComponent(subItems?._type, subItems, index)
              )}
            </>
          )}
        </>
      ))}
    </>
  )
}

export default observer(BookingsMainContent)
