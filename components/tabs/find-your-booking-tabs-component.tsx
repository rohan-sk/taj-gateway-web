import { theme } from "../../lib/theme"
import { Box, Typography } from "@mui/material"
import { ImageProps, aestheticItems } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import React, { Fragment, useContext, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  MainContentWrapper,
  MainContentTabsWrapper,
  MainContentTabContainer,
  MainContentTitleWrapper,
  SubtitleContentWrapper,
  TabsHorizontalBar,
} from "./styles/find-your-booking-tabs-component-styles"

interface FindYourBookingTabsComponentProps {
  tabs: any
  _key: string
  title: string
  _type: string
  metadata: any
  variant: string
  subTitle: string
  image: ImageProps[]
  parentProps: number
  viewEventCallback: any
  aesthetic: aestheticItems
}

const FindYourBookingTabsComponent = ({
  tabs,
  title,
  image,
  subTitle,
  aesthetic,
}: FindYourBookingTabsComponentProps) => {
  const isMobile = useMobileCheck()
  const IHCLContexts = useContext(IHCLContext)
  const [value, setValue] = useState<number>(0)
  const { cardPadding } = useAesthetics(aesthetic?._ref)

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box
      aria-label="myAccount.tabs.find-booking-tabs"
      sx={{
        padding: isMobile
          ? cardPadding?.mobile || aesthetic?.padding?.mobile
          : cardPadding?.desktop || aesthetic?.padding?.desktop,
      }}>
      <MainContentWrapper $isMobile={isMobile}>
        <MainContentTitleWrapper $isMobile={isMobile}>
          {title && (
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</Typography>
          )}
          {subTitle && (
            <SubtitleContentWrapper $isMobile={isMobile}>
              <Typography
                variant={isMobile ? "m-body-sl" : "body-ml"}
                sx={{ textAlign: "center" }}
                padding={isMobile ? `0vw ${MobilePxToVw(25)}` : "unset"}>
                {subTitle}
              </Typography>
            </SubtitleContentWrapper>
          )}
        </MainContentTitleWrapper>
        {tabs && (
          <MainContentTabsWrapper
            value={value}
            TabIndicatorProps={{
              style: {
                background: theme?.palette?.neuPalette?.hexTwo,
              },
            }}
            $isMobile={isMobile}>
            {tabs
              ?.filter((prop: any) => !prop?.isHidden)
              ?.map((item: any, index: number) => {
                return (
                  <>
                    <MainContentTabContainer
                      label={item?.title}
                      disableRipple
                      onClick={() => handleChange(index)}
                      key={item?.index}
                      sx={{
                        color:
                          value === index
                            ? theme?.palette?.neuPalette?.hexTwo
                            : theme?.palette?.neuPalette?.hexSeventeen,
                      }}
                      $isMobile={isMobile}
                    />
                  </>
                )
              })}
            <TabsHorizontalBar orientation="horizontal" />
          </MainContentTabsWrapper>
        )}
        {tabs && (
          <Box width={"100%"}>
            {tabs
              ?.filter((prop: any) => !prop?.isHidden)
              ?.map((item: any, index: number) => (
                <TabView value={value} index={index} key={index}>
                  {item?.tabItems?.map((tabData: any, index: number) => {
                    return (
                      <Fragment key={index}>
                        {index === 0
                          ? IHCLContexts?.renderComponent(tabData?._type, {
                              ...tabData,
                            })
                          : null}
                      </Fragment>
                    )
                  })}
                </TabView>
              ))}
          </Box>
        )}
      </MainContentWrapper>
    </Box>
  )
}

export default FindYourBookingTabsComponent

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabView(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box
          component={"div"}
          sx={{
            width: "100%",
          }}>
          {children}
        </Box>
      )}
    </div>
  )
}
