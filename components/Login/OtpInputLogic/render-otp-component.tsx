import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const RenderOtpComponent = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.data?.items && (
        <>
          {props?.data?.items?.map((item: any, index: number) => {
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

export default RenderOtpComponent
