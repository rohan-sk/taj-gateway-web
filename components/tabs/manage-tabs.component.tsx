import { Box } from "@mui/material"
import React, { Fragment, useContext, useState } from "react"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  CustomTab,
  MainBoxWrapper,
  RegisterAddressTabs,
  StyledTitle,
  TabsContainer,
} from "../modal/styles/manage-card.styles"
import { useMobileCheck } from "../../utils/isMobilView"

const ManageTabsComponent = ({ tabs, title }: any) => {
  const [value, setValue] = useState(0)
  const IHCLContexts = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <MainBoxWrapper>
      <StyledTitle variant={isMobile ? "m-heading-s" : "heading-s"}>{title}</StyledTitle>
      <TabsContainer
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { background: theme?.palette?.ihclPalette?.hexTwo },
        }}>
        {tabs?.map((item: any) => (
          <CustomTab label={item?.title} key={item?.title} />
        ))}
      </TabsContainer>
      <RegisterAddressTabs>
        {tabs?.map((item: any, index: number) => (
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
      </RegisterAddressTabs>
    </MainBoxWrapper>
  )
}
export default ManageTabsComponent

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
        <Box component={"div"} className="tabpanel" sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  )
}
