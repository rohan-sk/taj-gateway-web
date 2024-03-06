import { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModelContainer } from "../styles/manage-card.styles"

export const ManageCardsModal = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <ModelContainer>
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </ModelContainer>
  )
}
