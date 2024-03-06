import { Grid } from "@mui/material"
import React, { useContext } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { ImageProps, singleContentInterface } from "../types"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  HorizontalDividerStyle,
  VerticalDividerStyle,
} from "./styles/group-with-sectional-tabs-component.styles"

interface groupWithSectionalTabsComponentItems {
  props: groupWithSectionalTabsComponentProps[]
}
interface groupWithSectionalTabsComponentProps {
  title: string
  _type: string
  aesthetic?: any
  variant: string
  urlType: string
  logo: ImageProps
  parentProps?: number
  largeVariant: string
  alignmentVariant: string
  isComponentFullWidth: boolean
  showBulletForSubTitle: boolean
  singleContent: singleContentInterface[]
}
const GroupWithSectionalTabsComponent = ({ props }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)
  return (
    <Grid
      container
      flexWrap={isMobile ? "wrap" : "nowrap"}
      justifyContent={"center"}
      m={cardPadding?.mobile}
      columnGap={isMobile ? MobilePxToVw(40) : DesktopPxToVw(20)}
      rowGap={isMobile ? MobilePxToVw(35) : 0}>
      {props?.map(
        (item: groupWithSectionalTabsComponentProps, index: number) => {
          return (
            <>
              <Grid
                display={"flex"}
                direction={"column"}
                justifyContent={"space-between"}
                item
                xl={2.74}
                lg={2.74}
                md={2.73}
                sm={isMobile ? 5.49 : 2.735}
                xs={5.49}
                key={index}
                sx={{
                  ".gc-card-image-title-tab": {
                    marginTop: isMobile ? 0 : DesktopPxToVw(36),
                  },
                }}>
                {context?.renderComponent(
                  item._type,
                  {
                    ...item,
                  },
                  index
                )}
                {isMobile && (
                  <Grid width={"100%"}>
                    <HorizontalDividerStyle />
                  </Grid>
                )}
              </Grid>
              {!isMobile && (
                <Grid>
                  {index < props?.length - 1 && (
                    <VerticalDividerStyle orientation="vertical" />
                  )}
                </Grid>
              )}
            </>
          )
        }
      )}
    </Grid>
  )
}

export default GroupWithSectionalTabsComponent
