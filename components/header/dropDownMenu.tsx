import React, { useContext } from "react"
import { useTheme, Box, Grid, Collapse } from "@mui/material"
import dynamic from "next/dynamic"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { useAppNavigation } from "../../utils/NavigationUtility"
import {
  MegaMenuTitle,
  StyledTypography,
  MegaMenuTitleGrid,
  MegaMenuBorderGrid,
  MegaMenuContentBox,
  MegaMenuMoreContentBox,
  MegaMenuTitlesContainer,
} from "./styles"
import { urlFor } from "../../lib-sanity"

export interface AccordionSchema {
  dropDownItems: ItemProps[]
  dropDownListItems: ListItems
  setShowDropDownMenu: Function
  showDropDownMenu: any
  headerData: any
  GaEvent: any
  dataLayer: any
  isUserLoggedIn: boolean
}

interface ItemProps {
  url: string
  title: string
  variant: string
  urlType?: string
  checkBox?: string
  image?: any
}

interface ListItems {
  cta: CTAProps
  title?: string
  subtitle?: string
}

interface CTAProps {
  url?: any
  title: string
  _type: string
  variant: string
  urlType: string
}

const DropDownMenu = (props: AccordionSchema) => {
  const {
    dropDownListItems,
    dropDownItems,
    setShowDropDownMenu,
    showDropDownMenu,
    GaEvent,
    headerData,
    dataLayer,
    isUserLoggedIn,
  } = props
  const theme = useTheme()
  const navigate = useAppNavigation()
  const firstMenuList = dropDownItems?.slice(0, 5)
  const secondMenuList = dropDownItems?.slice(5)

  return (
    <Collapse in={showDropDownMenu}>
      <Grid
        container
        onMouseLeave={() =>
          setTimeout(() => {
            setShowDropDownMenu(false)
          }, 500)
        }
        sx={{
          borderTop: `1px solid ${theme?.palette?.ihclPalette?.hexThirteen}`,
        }}>
        <Grid item sm={4} md={4} lg={4} xl={4}>
          <MegaMenuContentBox>
            <StyledTypography variant="heading-s">{dropDownListItems?.title}</StyledTypography>
            <StyledTypography variant="body-ml" mt={DesktopPxToVw(5)}>
              {dropDownListItems?.subtitle}
            </StyledTypography>
            <MegaMenuMoreContentBox>
              <RenderActionItem
                isActionButtonType={false}
                url={dropDownListItems?.cta?.url}
                title={dropDownListItems?.cta?.title}
                variant={dropDownListItems?.cta?.variant}
                navigationType={dropDownListItems?.cta?.urlType}
                linkStyles={{ color: theme?.palette?.ihclPalette?.hexOne }}
                iconStyles={{
                  color: `${theme?.palette?.ihclPalette?.hexOne} !important`,
                }}
              />
            </MegaMenuMoreContentBox>
          </MegaMenuContentBox>
        </Grid>
        <MegaMenuTitlesContainer item sm={3.95} md={3.95} lg={3.95} xl={3.95}>
          <MegaMenuTitleGrid container rowGap={DesktopPxToVw(20)}>
            {firstMenuList?.map((item: ItemProps, index: number) => (
              <MegaMenuBorderGrid key={index} item md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    margin:
                      index < 1 ? `${DesktopPxToVw(47)} 0 0% ${DesktopPxToVw(60)}` : `0% 10% 0% ${DesktopPxToVw(60)}`,
                  }}>
                  <MegaMenuTitle
                    variant="body-ml"
                    onClick={() => {
                      GaEvent(item?.url, item?.urlType, item?.title, dataLayer, isUserLoggedIn, headerData)
                      navigate(item?.url), setShowDropDownMenu(false)
                    }}>
                    {item?.image?.asset?._ref && (
                      <Box
                        alt={`${item?.title}-img`}
                        loading="lazy"
                        component={"img"}
                        src={urlFor(item?.image?.asset?._ref).url()}
                        sx={{
                          marginRight: DesktopPxToVw(12),
                        }}
                      />
                    )}
                    {item?.title}
                  </MegaMenuTitle>
                </Box>
              </MegaMenuBorderGrid>
            ))}
          </MegaMenuTitleGrid>
        </MegaMenuTitlesContainer>
        <MegaMenuTitlesContainer item sm={4.05} md={4.05} lg={4.05} xl={4.05}>
          <MegaMenuTitleGrid container rowGap={DesktopPxToVw(20)}>
            {secondMenuList?.map((item: ItemProps, index: number) => (
              <MegaMenuBorderGrid key={index} item md={12} lg={12} xl={12}>
                <Box
                  sx={{
                    margin:
                      index < 1 ? `${DesktopPxToVw(47)} 0 0% ${DesktopPxToVw(60)}` : `0% 10% 0% ${DesktopPxToVw(60)}`,
                  }}>
                  <MegaMenuTitle
                    sx={{ display: "flex", alignItems: "center" }}
                    variant="body-ml"
                    onClick={() => {
                      GaEvent(item?.url, item?.urlType, item?.title, dataLayer, isUserLoggedIn, headerData)
                      navigate(item?.url), setShowDropDownMenu(false)
                    }}>
                    {item?.image?.asset?._ref && (
                      <Box
                        alt={`${item?.title}-img`}
                        loading="lazy"
                        component={"img"}
                        src={urlFor(item?.image?.asset?._ref).url()}
                        sx={{
                          marginRight: DesktopPxToVw(12),
                        }}
                      />
                    )}
                    {item?.title}
                  </MegaMenuTitle>
                </Box>
              </MegaMenuBorderGrid>
            ))}
          </MegaMenuTitleGrid>
        </MegaMenuTitlesContainer>
      </Grid>
    </Collapse>
  )
}

export default DropDownMenu
