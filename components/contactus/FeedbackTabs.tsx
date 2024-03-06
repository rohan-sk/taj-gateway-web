import { useContext, useEffect, useRef, useState } from "react"
import { theme } from "../../lib/theme"
import { useRouter } from "next/router"
import { Box, Select } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { KeyboardArrowDown } from "@mui/icons-material"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { FeedbackFormControl, FeedbackMenuItem, StyledTab, StyledTabs } from "./styles/FeedBack-component-styles"

const FeedbackTabs = ({ props }: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)

  const [value, setValue] = useState(0)

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (router?.asPath?.includes("#careTajness")) {
      const element = document?.getElementById("feedback-form")
      if (element) {
        const offset = isMobile
          ? element?.getBoundingClientRect()?.height
          : -element?.getBoundingClientRect()?.height / 2
        window?.scrollTo({
          top: element?.getBoundingClientRect()?.top + offset,
          behavior: "smooth",
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady, isMobile])

  return (
    <Box sx={{ width: "100%" }} id="feedback-form">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          borderBottom: isMobile ? "" : `1.5px solid ${theme?.palette?.ihclPalette?.hexNineteen}`,
          justifyContent: "center",
        }}>
        {isMobile ? (
          //dropdown for mSite
          <Box sx={{ width: "100%" }}>
            <FeedbackFormControl variant={"standard"} sx={{ width: "100%" }}>
              <Select
                value={props?.tabs?.[value]?.title}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                IconComponent={() => (
                  <KeyboardArrowDown
                    sx={{
                      color: theme?.palette?.ihclPalette?.hexSeventeen,
                      fontWeight: 300,
                    }}
                  />
                )}>
                {props?.tabs?.map((item: any, index: number) => (
                  <FeedbackMenuItem key={index} value={item?.title} onClick={(e: any) => handleChange(e, index)}>
                    {item?.title}
                  </FeedbackMenuItem>
                ))}
              </Select>
            </FeedbackFormControl>
          </Box>
        ) : (
          <StyledTabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: { background: theme?.palette?.ihclPalette?.hexTwo },
            }}>
            {props?.tabs?.map((item: any, index: number) => (
              <StyledTab key={index} label={item?.title} />
            ))}
          </StyledTabs>
        )}
      </Box>
      <Box>
        {isMobile ? (
          <>
            {context?.renderComponent(props?.tabs?.[value]?.tabItems?.[0]?._type, props?.tabs?.[value]?.tabItems?.[0])}
          </>
        ) : (
          props?.tabs?.map((item: any, index: number) => (
            <TabPanel value={value} index={index} key={index}>
              {context?.renderComponent(item?.tabItems?.[0]?._type, item?.tabItems?.[0])}
            </TabPanel>
          ))
        )}
      </Box>
    </Box>
  )
}

export default FeedbackTabs

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props
  const isMobile = useMobileCheck()

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box pt={isMobile ? MobilePxToVw(48) : "3.125vw"}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  )
}
