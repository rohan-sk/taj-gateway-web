import React, { Fragment, useContext, useEffect } from "react"
import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { PAGE_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { FlexBoxWrapper, MainBox, GridBoxWrapper } from "./my-account.styles"
import AccountStore from "../../features/my-account/store/pageStore/account.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"

const RenderAccountComponents = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const pageContextUse = useContext(PageContext)

  const { currentTab, currentTabViewer } = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore
  ) as AccountStore

  useEffect(() => {
    window.scrollTo(0, 0); 
    const items = Array.from(
      document?.getElementsByClassName("mobile-myaccount-tabs")
    )
    const dividers = Array.from(document?.getElementsByClassName("divider"))
    if (isMobile) {
      items?.forEach((element: any, index: number) => {
        if (index !== items?.length - 1) {
          element?.classList?.add("gmnoprint")
        }
      })
      dividers?.forEach((element: any) => {
        element?.classList?.add("gmnoprint")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTabViewer, isMobile])

  return (
    <GridBoxWrapper>
      <MainBox sx={{
        "& .divider hr": {
          width: "100% !important"
        }}}>
        {props?.map?.((item: any, index: number) => {
          return (
            <Fragment key={index}>
              {context?.renderComponent(item._type, { ...item })}
            </Fragment>
          )
        })}
      </MainBox>
      <Box sx={{ width: "100%", mt: isMobile ? "0vw" : "1.156vw" }}>
        {currentTabViewer?.data?.tabItems?.length !== 0 &&
          currentTabViewer?.data?.title === currentTab?.value && (
            <Fragment>
              {context?.renderComponent(
                currentTabViewer?.data?.tabItems?.[0]?._type,
                {
                  ...currentTabViewer?.data?.tabItems?.[0],
                }
              )}
            </Fragment>
          )}
      </Box>
    </GridBoxWrapper>
  )
}
export default observer(RenderAccountComponents)
