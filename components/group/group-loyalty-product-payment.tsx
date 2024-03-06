import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { observer } from "mobx-react-lite"

const LoyaltyGroupProductPayment = ({ props }: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </>
  )
}

export default observer(LoyaltyGroupProductPayment)
