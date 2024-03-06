import Box from "@mui/material/Box"
import { theme } from "../../lib/theme"
import { Fragment, ReactElement, useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import {
  MainBox,
  StyledDivider,
  StyledTab,
  StyledTabs,
} from "../tabs/styles/basic-tab"
interface TabGroupProps {
  items: Items[]
  itemRenderer: (item: any) => ReactElement | null
  tabItemSize?: string
  tapEventCallback?: Function
  analyticsData?: any
}
interface Items {
  tabItems: any
  _type: string
  title: string
  identifier: string
}

export const TabGroup = ({ items }: TabGroupProps) => {
  const router = useRouter()
  const pageContext = useContext(PageContext)
  const Context = useContext(IHCLContext)
  const qs: any = pageContext?.queryParams
  const path: string = pageContext?.path
  const urlResolver = Context!.urlResolver
  const [numberOfTabs, setNumberOfTabs] = useState<number>()

  const getActiveTab = () => {
    let activeTab = 0
    if (qs) {
      items.map((item, index) => {
        if (item.identifier === qs.identifier) {
          activeTab = index
        }
      })
    }
    return activeTab
  }
  const [value, setValue] = useState(getActiveTab())
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const updateIdentifier = (identifier: string) => {
    if (identifier !== router?.query?.identifier) {
      router.replace(urlResolver(path + "?identifier=" + identifier))
    }
  }

  useEffect(() => {
    setNumberOfTabs(items?.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [global?.window?.location?.pathname])

  return (
    <>
      <MainBox>
        <StyledTabs
          centered
          value={value}
          variant={"standard"}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: theme?.palette?.neuPalette?.hexTwo },
          }}
        >
          {items?.map((item) => (
            <StyledTab
              key={item.title}
              label={item.title}
              sx={{
                margin: numberOfTabs === 9 ? "0vw 1.875vw" : "0vw 2.60vw",
              }}
              onClick={updateIdentifier.bind(this, item?.identifier)}
            />
          ))}
        </StyledTabs>
        <StyledDivider />
      </MainBox>

      {items?.map((item, index) => (
        <TabView value={value} index={index} key={index}>
          {item?.tabItems?.map((tabData: any, index: number) => {
            return (
              <Fragment key={index}>
                {Context?.renderComponent(tabData?._type, {
                  ...tabData,
                })}
              </Fragment>
            )
          })}
        </TabView>
      ))}
    </>
  )
}

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
        <Box component={"div"} sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  )
}
