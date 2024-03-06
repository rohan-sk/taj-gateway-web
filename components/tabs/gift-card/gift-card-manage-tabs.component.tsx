import { Box, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import {
  CustomTab,
  MainBoxWrapper,
  CustomTabDivider,
  CustomTabsContentWrapper,
  ManageGiftCardTabContentWrapper,
} from "./styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { Fragment, useContext, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GiftCardManageTabsComponentWrapper } from "../../modal/styles/manage-card.styles"

const GiftCardManageTabsComponent = ({
  tabs,
  title,
  variant,
  aesthetic,
}: any) => {
  const [value, setValue] = useState(0)
  const IHCLContexts = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <MainBoxWrapper
      aria-label={variant}
      sx={{
        padding: isMobile
          ? aesthetic?.padding?.mobile
          : aesthetic?.padding?.desktop,
      }}>
      <Typography
        sx={{
          paddingBottom: isMobile ? MobilePxToVw(55) : DesktopPxToVw(40),
        }}
        variant={isMobile ? "m-heading-s" : "heading-s"}>
        {title}
      </Typography>
      <Box position={"relative"}>
        <CustomTabsContentWrapper
          sx={{
            flexDirection: "row !important",
          }}
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              background: theme?.palette?.neuPalette?.hexTwo,
            },
          }}
          $isMobile={isMobile}>
          {tabs?.map((item: any) => (
            <CustomTab label={item?.title} key={item?.title} />
          ))}
        </CustomTabsContentWrapper>
        <CustomTabDivider orientation="horizontal" $isMobile={isMobile} />
      </Box>
      <ManageGiftCardTabContentWrapper $isMobile={isMobile}>
        {tabs?.map((item: any, index: number) => (
          <TabView value={value} index={index} key={index} isMobile={isMobile}>
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
      </ManageGiftCardTabContentWrapper>
    </MainBoxWrapper>
  )
}
export default GiftCardManageTabsComponent

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  isMobile: boolean
}

function TabView(props: TabPanelProps) {
  const { children, value, index, isMobile } = props

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <GiftCardManageTabsComponentWrapper
          component={"div"}
          $isMobile={isMobile}>
          {children}
        </GiftCardManageTabsComponentWrapper>
      )}
    </div>
  )
}
