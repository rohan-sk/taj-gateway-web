import { CONSTANTS } from "../constants"
import React, { Fragment, useContext, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const EventMediaCardFilter = (props: any) => {
  const context = useContext(IHCLContext)
  return (
    <>
      {props?.items.map((item: any, index: number) => {
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

export default EventMediaCardFilter
