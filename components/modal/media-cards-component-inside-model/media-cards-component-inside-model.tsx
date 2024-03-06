import React, { Fragment, useContext } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MediaCardComponentInsideModelWrapper } from "../styles/manage-card.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const MediaCardsComponentInsideTheModel = (props: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  return (
    <MediaCardComponentInsideModelWrapper $isMobile={isMobile}>
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
    </MediaCardComponentInsideModelWrapper>
  )
}

export default MediaCardsComponentInsideTheModel
