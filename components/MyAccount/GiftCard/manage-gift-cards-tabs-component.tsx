import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import React, { Fragment, useContext, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  VerticalDivider,
  GiftCardsTabContent,
  ManageGiftCardsWrapper,
  ManageGiftCardsTabsWrapper,
  VerticalTabsDivider,
} from "./manage-gift-cards-tabs-component-styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { aestheticItems } from "../../types"
import { useAesthetics } from "../../../utils/fetchAsthetics"
interface ManageGiftCardsTabsComponent {
  tabs: any
  _key: string
  metadata: any
  _type: string
  title: string
  variant: string
  parentProps: number
  aesthetic: aestheticItems
}

const ManageGiftCardsTabsComponent = ({
  tabs,
  title,
  variant,
  aesthetic,
}: ManageGiftCardsTabsComponent) => {
  const IHCLContexts = useContext(IHCLContext)
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const [value, setValue] = useState<number>(0)

  const handleChange = (newValue: number) => {
    setValue(newValue)
  }
  const isMobile = useMobileCheck()
  return (
    <Box
      aria-label={variant}
      p={isMobile ? cardPadding?.mobile : cardPadding?.desktop}>
      <ManageGiftCardsWrapper>
        <Box>
          <Typography
            sx={{
              textTransform: "capitalize",
            }}
            variant={isMobile ? "m-heading-s" : "heading-s"}>
            {title.toLowerCase()}
          </Typography>
        </Box>
        {tabs && (
          <ManageGiftCardsTabsWrapper
            value={value}
            TabIndicatorProps={{
              style: {
                background: theme?.palette?.neuPalette?.hexTwo,
              },
            }}>
            {tabs?.map((item: any, index: number) => {
              return (
                <>
                  <GiftCardsTabContent
                    label={item?.title}
                    disableRipple
                    onClick={() => handleChange(index)}
                    key={item?.index}
                    sx={{
                      color:
                        value === index
                          ? theme?.palette?.neuPalette?.hexTwo
                          : theme?.palette?.neuPalette?.hexSeventeen,
                      opacity: 1,
                    }}
                  />
                  {index !== tabs?.length - 1 && (
                    <VerticalTabsDivider orientation="vertical" flexItem />
                  )}
                </>
              )
            })}
          </ManageGiftCardsTabsWrapper>
        )}
      </ManageGiftCardsWrapper>
      {tabs && (
        <Box>
          {tabs?.map((item: any, index: number) => (
            <TabView
              value={value}
              index={index}
              key={index}
              isMobile={isMobile}>
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
    </Box>
  )
}

export default ManageGiftCardsTabsComponent

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
        <Box
          component={"div"}
          sx={{
            width: "100%",
            "& .my-account-e-gift-card-main-container": {
              padding: isMobile
                ? `${MobilePxToVw(35)} ${MobilePxToVw(32)} 0vw`
                : `${DesktopPxToVw(35)} 0vw 0vw`,
            },
            "& .my-account-e-gift-card-content": {
              backgroundColor: theme?.palette?.neuPalette?.hexTwentyNine,
            },
            "& .tab-order-status": {
              maxHeight: "none",
              overflow: "none",
            },
            "& .order-status-data": {
              p: isMobile
                ? `${MobilePxToVw(35)} ${MobilePxToVw(32)} 0vw`
                : `${DesktopPxToVw(35)}  0vw 0vw`,
            },
          }}>
          {children}
        </Box>
      )}
    </div>
  )
}
