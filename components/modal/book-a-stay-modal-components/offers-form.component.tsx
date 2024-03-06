import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { FormGridContainer } from "./offers-form-styles"

const OfferFormComponent = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <FormGridContainer id="book-a-stay-modal">
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </FormGridContainer>
  )
}

export default OfferFormComponent