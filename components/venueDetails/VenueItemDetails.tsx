import { Divider } from "@mui/material"
import React, { Fragment, useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { BulletItemContainer, VenuItemGrid } from "./Styles"

const VenueItemDetails = ({ props }: any) => {
  const context = useContext(IHCLContext)
  return (
    <VenuItemGrid>
      {props?.slice?.(0, 1)?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
      <BulletItemContainer>
        {props?.slice?.(1)?.map((item: any, index: number) => {
          return (
            <Fragment key={index}>
              {context?.renderComponent(item._type, {
                ...item,
              })}
            </Fragment>
          )
        })}
      </BulletItemContainer>
      <Divider />
    </VenuItemGrid>
  )
}

export default VenueItemDetails
