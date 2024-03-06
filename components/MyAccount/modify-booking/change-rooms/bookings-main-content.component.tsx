import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../../../PresentationalComponents/lib/prepare-page-context"
import BookingsFlowStore from "../../../../features/booking/store/pageStore/booking.store"
import { PAGE_STORES } from "../../../../utils/Constants"
import { BookingsMainContentTypes } from "../../../../features/booking/types"

const BookingsMainContent = (props: any) => {
  const { cases, defaultCase } = props

  const context = useContext(IHCLContext)
  const pageContext = useContext(PageContext)

  const BookingFlowStore = pageContext?.getPageStore(
    PAGE_STORES?.bookingFlowStore
  ) as BookingsFlowStore

  const { currentStepper } = BookingFlowStore

  useEffect(() => {
    BookingFlowStore.updateCurrentStepper({
      stepName: defaultCase,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
