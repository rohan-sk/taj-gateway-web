import { Box, Collapse, Grid, Typography } from "@mui/material"
import React from "react"
import dynamic from "next/dynamic"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import {
  MegaMenuBorderGrid,
  MegaMenuContentBox,
  MegaMenuMoreContentBox,
  MegaMenuTitleGrid,
  MegaMenuTitlesContainer,
  StyledTypography,
} from "./styles"
import { urlFor } from "../../lib-sanity"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useImageUtility } from "../../utils/hooks/useImageUtility"

const RewardsDropDown = ({
  dropDownItems,
  bookingData,
  setShowRewordsDropDown,
  showRewordsDropDown,
  GaEvent,
  headerData,
  dataLayer,
  isUserLoggedIn,
}: any) => {
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()

  return (
    <Collapse in={showRewordsDropDown} aria-label="rewards-dropdown`">
      <Grid container sx={{ width: "100%" }} onMouseLeave={() => setShowRewordsDropDown(false)}>
        <Grid item sm={4} md={4} lg={4} xl={4}>
          <MegaMenuContentBox>
            <StyledTypography variant="heading-s">{bookingData?.title}</StyledTypography>
            <StyledTypography variant="body-ml" mt={DesktopPxToVw(5)}>
              {bookingData?.subtitle}
            </StyledTypography>
            <MegaMenuMoreContentBox>
              <RenderActionItem
                isActionButtonType={false}
                url={bookingData?.cta?.url}
                title={bookingData?.cta?.title}
                variant={bookingData?.cta?.variant}
                navigationType={bookingData?.cta?.urlType}
                linkStyles={{ color: theme?.palette?.ihclPalette?.hexOne }}
                iconStyles={{
                  color: `${theme?.palette?.ihclPalette?.hexOne} !important`,
                }}
              />
            </MegaMenuMoreContentBox>
          </MegaMenuContentBox>
        </Grid>
        <MegaMenuTitlesContainer item sm={8} md={8} lg={8} xl={8}>
          <MegaMenuTitleGrid
            container
            display={"flex"}
            flexWrap={"nowrap"}
            pr={DesktopPxToVw(240)}
            pl={DesktopPxToVw(30)}
            pt={DesktopPxToVw(60)}>
            {dropDownItems?.cta?.map((item: any, index: number) => (
              <MegaMenuBorderGrid
                key={index}
                item
                md={12}
                lg={12}
                xl={12}
                onClick={() => {
                  GaEvent(item?.url, item?.urlType, item?.title, dataLayer, isUserLoggedIn, headerData)
                  navigate(item?.url, item?.urlType)
                  setShowRewordsDropDown(false)
                }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                }}>
                {item?.image?.asset?._ref && (
                  <Box
                    loading="lazy"
                    component={"img"}
                    srcSet={getOptimizeImageUrl(urlFor(item?.image?.asset?._ref)?.url(), 1)}
                    width={DesktopPxToVw(248)}
                    height={DesktopPxToVw(170)}
                  />
                )}
                {item?.title && (
                  <Typography
                    variant="body-ml"
                    pt={DesktopPxToVw(30)}
                    sx={{
                      color: theme?.palette?.ihclPalette?.hexTwo,
                      textAlign: "center",
                    }}>
                    {item?.title}
                  </Typography>
                )}
              </MegaMenuBorderGrid>
            ))}
          </MegaMenuTitleGrid>
        </MegaMenuTitlesContainer>
      </Grid>
    </Collapse>
  )
}

export default RewardsDropDown
