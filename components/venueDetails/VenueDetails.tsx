import { Box } from "@mui/material"
/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useContext } from "react"
import { ButtonsWrapper, PopUpGrid } from "./Styles"
import { useMobileCheck } from "../../utils/isMobilView"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

export const VenueDetails = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const primaryAction = props?.items?.[0]?.primaryAction
  return (
    <PopUpGrid $isMobile={isMobile}>
      {props?.items?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            {context?.renderComponent(item._type, {
              ...item,
            })}
          </Fragment>
        )
      })}
      <ButtonsWrapper>
        {primaryAction && (
          <Box sx={{ marginLeft: "2vw" }}>
            <RenderActionItem
              url={primaryAction?.url}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              isActionButtonType={true}
            />
          </Box>
        )}
      </ButtonsWrapper>
    </PopUpGrid>
  )
}
