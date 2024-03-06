import React, { useContext, useState } from "react"
import { urlFor } from "../../lib-sanity"
import { Grid, Box, Typography } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  DividerForBorder,
  VisibleDataTypography,
  ItemLogoImageComponentBox,
} from "./styles/group-with-facilities-styles"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
const PortableTextForFacilities = dynamic(() => import("./portable-text-for-facilities.component"))

interface childrenItems {
  text: string
  _type: string
}
interface blockContentItems {
  children: childrenItems[]
  style: string
  _type: string
}
interface menuItemsList {
  blockContent: blockContentItems[]
}
interface DateTimingFacilitiesItems {
  identifier: string
  isHotelInfo: boolean
  menuItems: menuItemsList[]
  showDividerForBorder: boolean
  title: string
  _type: string
  logo: LogoItems
}
interface AssetItems {
  _ref: string
  _type: string
}
interface LogoItems {
  asset: AssetItems
}
interface DateTimingFacilitiesProps {
  props: DateTimingFacilitiesItems[]
}
const FacilitiesGrid = ({ props }: DateTimingFacilitiesProps) => {
  // const isHotelInfo = props?.isHotelInfo
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const [show, setShow] = React.useState(false)
  const [pointsToShow, setPointsToShow] = React.useState(CONSTANTS?.FOUR)
  return (
    <>
      <Grid container columnSpacing={3}>
        {props?.map((item: DateTimingFacilitiesItems, index: number) => {
          return (
            <Grid item md={3} lg={6} sm={12} key={index} pb={1.2}>
              {item?.showDividerForBorder && (index === 0 || index === 1) && (
                <DividerForBorder />
              )}
              <ItemLogoImageComponentBox
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
                <Typography
                  variant={item?.isHotelInfo ? "heading-xxs" : "heading-xs"}>
                  {item?.title}
                </Typography>
              </ItemLogoImageComponentBox>
              {item?.menuItems?.map((content: menuItemsList, index: number) => {
                return (
                  <Box key={index}>
                    <PortableTextForFacilities
                      index={index}
                      props={props}
                      content={content}
                    />
                  </Box>
                )
              })}
              {/* {item?.menuItems?.length > 3 && (
                  <>
                    {show ? (
                      <VisibleDataTypography
                        variant="body-ml"
                        onClick={() => {
                          setPointsToShow(2), setShow(!show)
                        }}
                      >
                        {`... ${CONSTANTS?.VIEW_LESS_TEXT}`}
                      </VisibleDataTypography>
                    ) : (
                      <VisibleDataTypography
                        variant="body-ml"
                        onClick={() => {
                          setPointsToShow(item?.menuItems.length),
                            setShow(!show)
                        }}
                      >
                        {`... ${CONSTANTS?.MORE_TO_EXPAND_TEXT}`}
                      </VisibleDataTypography>
                    )}
                  </>
                )} */}
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default FacilitiesGrid
