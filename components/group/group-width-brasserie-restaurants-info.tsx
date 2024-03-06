import React, { Fragment, useContext } from "react"
import { IHCLContext, useMobileCheck } from "../forms/loyalty-form/epicure-imports.component"
import { GroupWidthBrasserieRestaurantsInfoContainer } from "./styles/group-with-bombay-brasserie-info-styles"

const GroupWidthBrasserieRestaurantsInfo = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  return (
    <GroupWidthBrasserieRestaurantsInfoContainer $isMobile={isMobile}>
      {props?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </GroupWidthBrasserieRestaurantsInfoContainer>
  )
}

export default GroupWidthBrasserieRestaurantsInfo
