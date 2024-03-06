import React, { Fragment, useContext } from "react"
import { RoomDetailsModalContainer } from "./Styles"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export const RoomDetailsModal = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  return (
    <RoomDetailsModalContainer $isMobile={isMobile}>
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </RoomDetailsModalContainer>
  )
}
