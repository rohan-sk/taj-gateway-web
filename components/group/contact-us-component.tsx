import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const ContactUsComponent = ({ props }: any) => {
  const context = useContext(IHCLContext)

  return (
    <div>
      {props?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ContactUsComponent
