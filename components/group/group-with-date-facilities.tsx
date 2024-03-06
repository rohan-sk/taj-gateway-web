import { ActionProps } from "../types"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import React, { Fragment, useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { Grid, Box, Typography, Divider } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  DividerForBorder,
  DividerForCenterGrid,
  PrimaryActionTitleBox,
  LargeHorizontalDivider,
  PrimaryActionContentBox,
  ItemLogoWrapperContainer,
  ItemTitleWrapperTypography,
  CellContainer,
} from "./styles/group-with-facilities-styles"
interface childrenItems {
  text: string
  _type: string
}
interface blockContentItems {
  style: string
  _type: string
  children: childrenItems[]
}
interface menuItemsList {
  blockContent: blockContentItems[]
}
interface DateTimingFacilitiesItems {
  title: string
  _type: string
  logo: LogoItems
  identifier: string
  isHotelInfo: boolean
  showBottomBorder: boolean
  menuItems: menuItemsList[]
  showDividerForBorder: boolean
  headingElementForCard?: any
}
interface AssetItems {
  _ref: string
  _type: string
}
interface LogoItems {
  asset: AssetItems
}
interface DateTimingFacilitiesProps {
  primaryAction: ActionProps
  props: DateTimingFacilitiesItems[]
}
const DateTimingFacilities = ({ props, primaryAction }: DateTimingFacilitiesProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const itemCount = props?.length
  const [pointsToShow, setPointsToShow] = React.useState<number>(2)

  return (
    <>
      <Grid justifyContent={"center"} container columnSpacing={DesktopPxToVw(20)}>
        {props?.map((item: DateTimingFacilitiesItems, id: number) => {
          return (
            <Fragment key={id}>
              <Grid
                item
                md={itemCount === CONSTANTS?.THREE ? 3.99 : 3}
                lg={itemCount === CONSTANTS?.THREE ? 3.99 : 3.7}
                xl={itemCount === CONSTANTS?.THREE ? 3.99 : 3.7}
                sm={isMobile ? 12 : itemCount === CONSTANTS?.THREE ? 3.99 : 3.7}
                xs={12}
                key={id}
                pb={itemCount === CONSTANTS?.THREE ? 0 : 1.2}>
                <CellContainer>
                  {(item?.logo?.asset?._ref || item?.title) && (
                    <Box
                      sx={{
                        flexBasis: isMobile ? "40.57%" : "",
                        flexShrink: "0",
                      }}>
                      <ItemLogoWrapperContainer
                        $isItemCount={itemCount === CONSTANTS?.THREE}
                        $showDividerForBorder={item?.showDividerForBorder}>
                        {item?.logo?.asset?._ref && (
                          <Box
                            loading="lazy"
                            component="img"
                            src={urlFor(item?.logo?.asset?._ref).url()}
                            height="1.2371vw"
                            width="1.2371vw"
                            sx={{
                              objectFit: "contain",
                            }}
                          />
                        )}
                        {item?.title && (
                          <Typography
                            sx={{
                              fontWeight: 400,
                              color: theme?.palette?.ihclPalette?.hexTwelve,
                              "@media (max-width: 640px)": {
                                fontWeight: 700,
                                color: theme?.palette?.ihclPalette?.hexSeventeen,
                              },
                            }}
                            component={item?.headingElementForCard || "h3"}
                            variant={isMobile ? "m-body-sl" : "body-xxs"}>
                            {item?.title}
                          </Typography>
                        )}
                      </ItemLogoWrapperContainer>
                    </Box>
                  )}
                  <Box
                    sx={{
                      flexGrow: "1",
                    }}>
                    {item?.menuItems?.slice(0, pointsToShow)?.map((content: menuItemsList, index: number) => {
                      return (
                        <Box
                          sx={{
                            marginTop: "0.3em",
                          }}
                          key={index}>
                          <Box
                            sx={{
                              margin: "0",
                              display: "flex",
                              alignItems: "center",
                              "& img": {
                                maxWidth: isMobile ? "3.594vw!important" : "",
                                maxHeight: isMobile ? "3.125vw!important" : "",
                              },
                            }}>
                            <PortableText blocks={[...content?.blockContent]} />
                          </Box>
                        </Box>
                      )
                    })}
                  </Box>
                </CellContainer>
                {/* Uncomment once the new variant comes from CMS */}
                {item?.showDividerForBorder &&
                  (isMobile ? <DividerForBorder sx={{ margin: isMobile ? "2.344vw 0vw" : "0.73vw" }} /> : <></>)}
              </Grid>
              {itemCount === CONSTANTS?.THREE && !isMobile && (id + 1) % 3 !== 0 && (
                <Grid>
                  <Box height={"100%"}>
                    <Divider
                      orientation="vertical"
                      sx={{
                        backgroundColor: theme?.palette?.ihclPalette?.hexSixteen,
                      }}
                    />
                  </Box>
                </Grid>
              )}
              {itemCount !== CONSTANTS?.THREE && item?.isHotelInfo && (id + 1) % 3 !== 0 && (
                <Grid item md={0.2} lg={0.2} sm={0.2} sx={{ margin: 0, textAlign: "center" }}>
                  <DividerForCenterGrid orientation="vertical" />
                </Grid>
              )}
            </Fragment>
          )
        })}

        {itemCount === CONSTANTS?.FOUR && !isMobile && (
          <Grid xs={12}>
            <Box width={"100%"}>
              <LargeHorizontalDivider orientation="horizontal" />
            </Box>
          </Grid>
        )}
      </Grid>
      {primaryAction?.title && (
        <PrimaryActionContentBox>
          <PrimaryActionTitleBox>
            {primaryAction?.image?.asset?._ref && (
              <Box
                loading="lazy"
                height="1.0309vw"
                width="1.0309vw"
                component="img"
                src={urlFor(primaryAction?.image?.asset?._ref).url()}
              />
            )}
            <Typography variant="link-m">{primaryAction?.title}</Typography>
          </PrimaryActionTitleBox>
        </PrimaryActionContentBox>
      )}
    </>
  )
}

export default DateTimingFacilities
