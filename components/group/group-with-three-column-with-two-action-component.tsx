import { Box, Grid } from "@mui/material"
import React, { Fragment, useContext } from "react"
import dynamic from "next/dynamic"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  TwoActionComponentGrid,
  AlternateAllLinksWrapper,
} from "./styles/groupwith-three-column-with-two-action-component-styles"
function GroupWithThreeColumnWithTwoActionComponent({
  props,
  alternateAllLinks,
}: any) {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  return (
    <TwoActionComponentGrid container>
      {props?.map((item: any) => (
        <Grid item xs={12} sm={12} md={3.8} lg={3.8} key={item?._key}>
          <Box
            margin={"0 auto"}
            maxWidth={isMobile ? "unset" : DesktopPxToVw(410)}>
            {context?.renderComponent(item?._type, item)}
          </Box>
        </Grid>
      ))}
      <AlternateAllLinksWrapper $isMobile={isMobile}>
        {alternateAllLinks?.map((item: any, index: number) => (
          <Fragment key={index}>
            <RenderActionItem
              url={item?.url}
              title={item?.title}
              navigationType={item?.urlType}
              variant={item?.variant}
              isActionButtonType={true}
              buttonStyles={{
                padding: isMobile ? "0vw" : "",
              }}
            />
          </Fragment>
        ))}
      </AlternateAllLinksWrapper>
    </TwoActionComponentGrid>
  )
}

export default GroupWithThreeColumnWithTwoActionComponent
