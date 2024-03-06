import React, { useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { Box, Typography } from "@mui/material"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import {
  TabsWrapper,
  EachTabWrapper,
  TabsWrapperBox,
  MainContentWrapper,
  TabsContentWrapper,
  TabsHorizontalLine,
  TabsContentWrapperTitle,
} from "./SSOLoginFormsStyles"

const SSOLoginEmailTextForm = dynamic(() => import("./SSOLoginEmailTextForm"))
const SSOLoginMobileNumberForm = dynamic(() => import("./SSOLoginMobileNumberForm"))
const SSOLoginMembershipBenefitsCard = dynamic(() => import("./SSOLoginMembershipBenefitsCard"))
const SSOLoginMembershipMobileNumberForm = dynamic(() => import("./SSOLoginMembershipMobileNumberForm"))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function EachTabDataPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const SSOLoginFormTabsModal = (props: any) => {
  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <MainContentWrapper aria-label="SSOLoginFormTabsModal">
      <Box
        sx={{
          "@media (max-width: 640px)": {
            width: "100%",
          },
        }}>
        <SSOLoginMembershipBenefitsCard props={props} />
      </Box>
      <TabsContentWrapper
        sx={{
          width: DesktopPxToVw(1056),
          "@media (max-width: 640px)": {
            width: "100%",
          },
        }}>
        <TabsContentWrapperTitle variant={"heading-s"}>{props?.title}</TabsContentWrapperTitle>
        <Box>
          <TabsWrapperBox sx={{ position: "relative" }}>
            <TabsWrapper
              TabIndicatorProps={{
                sx: { backgroundColor: theme?.palette?.neuPalette?.hexTwo },
              }}
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
              {props?.tabs?.map((tabItems: any, index: number) => (
                <EachTabWrapper key={index} label={tabItems?.title} {...a11yProps(index)} />
              ))}
            </TabsWrapper>
            <TabsHorizontalLine orientation="horizontal" />
          </TabsWrapperBox>
          <EachTabDataPanel value={value} index={0}>
            <SSOLoginMobileNumberForm props={props} />
          </EachTabDataPanel>
          <EachTabDataPanel value={value} index={1}>
            <SSOLoginEmailTextForm props={props} />
          </EachTabDataPanel>
          <EachTabDataPanel value={value} index={2}>
            <SSOLoginMembershipMobileNumberForm props={props} />
          </EachTabDataPanel>
        </Box>
      </TabsContentWrapper>
    </MainContentWrapper>
  )
}

export default SSOLoginFormTabsModal
