import React, { Fragment, useContext } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MainGridContainer } from "../styles/manage-card.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const BulkEnquiryComponent = (props: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  return (
    <MainGridContainer $isMobile={isMobile}>
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </MainGridContainer>
  )
}

export default BulkEnquiryComponent
