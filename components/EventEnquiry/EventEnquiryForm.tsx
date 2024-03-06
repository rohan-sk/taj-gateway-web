import React, { useState } from "react"

import { useContext } from "react"

import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export const EventEnquiryForm = (props: any, handleModalClose: Function) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.data?.items?.map((item: any, index: Number) =>
        context?.renderComponent(item?._type, item)
      )}
    </>
  )
}
