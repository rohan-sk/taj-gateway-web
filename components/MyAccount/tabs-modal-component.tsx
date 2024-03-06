import React, { useContext } from "react"
import { theme } from "../../lib/theme"
import { observer } from "mobx-react-lite"
import { PAGE_STORES } from "../../utils/Constants"
import { Box, Stack, Typography } from "@mui/material"
import { HorizontalDivider } from "./my-account.styles"
import AccountStore from "../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"

const TabsListInModal = (props: any) => {
  const pageContext = useContext(PageContext)
  const accountStore = pageContext?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const { updateCurrentTab, updateCurrentTabViewer, updateTabsData } = accountStore

  const modifiedTabs = props?.tabs?.map((tab: any) => {
    return {
      ...tab,
      tabKey: tab?._key,
    }
  })

  const handleTabClick = (clickedIndex: number, tabTitle: string, item: any, tabKey: any) => {
    updateCurrentTab({
      key: tabKey,
      value: tabTitle,
      index: clickedIndex,
    })
    updateCurrentTabViewer({ data: item })
    updateTabsData({
      data: modifiedTabs,
    })
    props?.handleModelOpening(false)
  }
  return (
    <Box sx={{ width: "100%", padding: "9.7vw 9.688vw 1vw 8.438vw " }}>
      {props?.tabs?.map((tab: any, index: number) => (
        <Stack key={index}>
          <Typography
            variant="m-body-ml"
            sx={{
              lineHeight: "320%",
              color: theme?.palette?.ihclPalette?.hexTwo,
            }}
            onClick={(e: any) => handleTabClick(index, tab?.title, tab, tab?._key)}>
            {tab?.title}
          </Typography>
          <HorizontalDivider
            sx={{
              height: "0.165vw",
            }}
          />
        </Stack>
      ))}
    </Box>
  )
}

export default observer(TabsListInModal)
