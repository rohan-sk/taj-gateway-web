import { theme } from "../../lib/theme"
import React, { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import { Grid, Box, Divider } from "@mui/material"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  LargeVerticalDivider,
  BlocksPortableTextBox,
  LargeHorizontalDivider,
  HotelInfoTitleTypography,
  ItemTitleWrapperContainer,
} from "./styles/group-with-facilities-styles"
import { pageGroqFragment } from "../../lib/utils"
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
interface FoodTimingFacilitiesItems {
  title: string
  _type: string
  logo: LogoItems
  identifier: string
  isHotelInfo: boolean
  menuItems: menuItemsList[]
  showDividerForBorder: boolean
}
interface AssetItems {
  _ref: string
  _type: string
}
interface LogoItems {
  asset: AssetItems
}
interface FoodTimingFacilitiesProps {
  props: FoodTimingFacilitiesItems[]
}
const FoodTimingFacilities = ({ props }: FoodTimingFacilitiesProps) => {
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const isMobile = useMobileCheck()
  const [pointsToShow, setPointsToShow] = React.useState(3)
  const firstItemList = props?.slice(0, 3)
  const secondItemList = props?.slice(3, 5)
  const thirdItemList = props?.slice(5)
  return (
    <Grid container>
      <Grid lg={8.1}>
        <Grid container>
          {firstItemList?.map((item: FoodTimingFacilitiesItems, index: number) => {
            return (
              <>
                <Grid
                  item
                  md={3}
                  lg={(index === 0 && 3.82) || (index === 1 && 3.82) || (index === 2 && 3.82)}
                  sm={12}
                  xs={12}
                  sx={{
                    marginBottom: isMobile ? "3.125vw" : "unset",
                    borderBottom: isMobile ? `1px solid ${theme?.palette?.ihclPalette?.hexFive}20` : "unset",
                  }}
                  key={index}>
                  <Box sx={{ marginBottom: isMobile ? "2.500vw" : "unset" }}>
                    <ItemTitleWrapperContainer>
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
                      <HotelInfoTitleTypography variant={isMobile ? "m-body-sl" : "body-xxs"}>
                        {item?.title}
                      </HotelInfoTitleTypography>
                    </ItemTitleWrapperContainer>
                    {item?.menuItems?.slice(0, pointsToShow)?.map((content: menuItemsList, index: number) => {
                      return (
                        <BlocksPortableTextBox key={index} $Padding={props?.length - (index + 1) < 3}>
                          <PortableText blocks={content?.blockContent} />
                        </BlocksPortableTextBox>
                      )
                    })}
                  </Box>
                </Grid>
                {index + 1 !== 3 && !isMobile && (
                  <Grid>
                    <Box height={"100%"}>
                      <LargeVerticalDivider orientation="vertical" />
                    </Box>
                  </Grid>
                )}
              </>
            )
          })}
          {!isMobile && (
            <Grid xs={11.7}>
              <Box width={"100%"}>
                <LargeHorizontalDivider
                  orientation="horizontal"
                  sx={{
                    backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
                    marginBottom: DesktopPxToVw(20),
                  }}
                />
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid container>
          {secondItemList?.map((item: FoodTimingFacilitiesItems, index: number) => {
            return (
              <>
                <Grid
                  item
                  md={3}
                  lg={5.8}
                  sm={12}
                  xs={12}
                  key={index}
                  sx={{
                    marginBottom: isMobile ? "3.125vw" : "unset",
                    borderBottom: isMobile ? `1px solid ${theme?.palette?.ihclPalette?.hexFive}20` : "unset",
                  }}>
                  <Box sx={{ marginBottom: isMobile ? "2.500vw" : "unset" }}>
                    <ItemTitleWrapperContainer>
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
                      <HotelInfoTitleTypography variant={isMobile ? "m-body-sl" : "body-xxs"}>
                        {item?.title}
                      </HotelInfoTitleTypography>
                    </ItemTitleWrapperContainer>
                    {item?.menuItems?.slice(0, pointsToShow)?.map((content: menuItemsList, index: number) => {
                      return (
                        <BlocksPortableTextBox key={index} $Padding={props?.length - (index + 1) < 3}>
                          <PortableText blocks={content?.blockContent} />
                        </BlocksPortableTextBox>
                      )
                    })}
                  </Box>
                </Grid>
                {!isMobile && index !== secondItemList?.length - 1 && (
                  <Grid>
                    <Box height={"100%"}>
                      <LargeVerticalDivider orientation="vertical" />
                    </Box>
                  </Grid>
                )}
              </>
            )
          })}
        </Grid>
      </Grid>
      <Grid lg={3.9}>
        <Grid container>
          {thirdItemList?.map((item: FoodTimingFacilitiesItems, index: number) => {
            return (
              <>
                {!isMobile && (
                  <Grid>
                    <Box height={"100%"}>
                      <LargeVerticalDivider orientation="vertical" />
                    </Box>
                  </Grid>
                )}
                <Grid
                  item
                  md={3}
                  lg={11}
                  sm={12}
                  key={index}
                  sx={{
                    marginBottom: isMobile ? "3.125vw" : "unset",
                    borderBottom: isMobile ? `1px solid ${theme?.palette?.ihclPalette?.hexFive}20` : "unset",
                  }}>
                  <Box sx={{ marginBottom: isMobile ? "2.500vw" : "unset" }}>
                    <ItemTitleWrapperContainer>
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
                      <HotelInfoTitleTypography variant={isMobile ? "m-body-sl" : "body-xxs"}>
                        {item?.title}
                      </HotelInfoTitleTypography>
                    </ItemTitleWrapperContainer>
                    {item?.menuItems?.slice(0, pointsToShow)?.map((content: menuItemsList, index: number) => {
                      return (
                        <BlocksPortableTextBox
                          sx={{ marginBottom: isMobile ? "1.875vw" : "0.529vw" }}
                          key={index}
                          $Padding={props?.length - (index + 1) < 3}>
                          <PortableText blocks={content?.blockContent} />
                        </BlocksPortableTextBox>
                      )
                    })}
                  </Box>
                </Grid>
              </>
            )
          })}
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid xs={12}>
          <Box width={"100%"}>
            <LargeHorizontalDivider
              orientation="horizontal"
              sx={{
                backgroundColor: theme?.palette?.ihclPalette?.hexSeventeen,
              }}
            />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export default FoodTimingFacilities
