import React, { Fragment, useContext, useEffect, useState } from "react"
import { MainGridWrapper } from "./Styles/tabs.styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ModalContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { PAGE_STORES } from "../../utils/Constants"
import { observer } from "mobx-react-lite"
import AuthenticLoginStore from "../../features/login/store/authentication.login.store"
import { Box, Grid, Stack } from "@mui/material"
import { LoginFormWithMultipleTabsInterface } from "./login-form.types"
import { TabsWrapper } from "./Styles/InitialScreen.styles"
import { urlFor } from "../../lib-sanity"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import AuthenticRegistrationStore from "../../features/registration/store/authentic.registration.store"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { PathType } from "../types"
import ModalStore from "../../store/global/modal.store"

const LoginFormWithMultipleTabs = (
  props: LoginFormWithMultipleTabsInterface
) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const modalContext = useContext(ModalContext)
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()

  const authenticLoginStore = modalContext?.getPageStore(
    PAGE_STORES.loginStore
  ) as AuthenticLoginStore

  const authenticRegistrationStore = modalContext?.getPageStore(
    PAGE_STORES.registrationStore
  ) as AuthenticRegistrationStore

  const [columnGridData, setColumnGridData] = useState<any>(
    authenticLoginStore?.data || authenticRegistrationStore?.data
  )

  useEffect(() => {
    setColumnGridData(
      authenticLoginStore?.data || authenticRegistrationStore?.data
    )
  }, [
    authenticLoginStore?.data,
    columnGridData,
    authenticRegistrationStore?.data,
  ])

  useEffect(() => {
    window.addEventListener("popstate", () => {
      modalStore?.closeModal()
    })
  }, [modalStore])

  const isFromLogin: boolean = props?.data?.items?.length > 1
  return (
    <>
      {props?.data?.logo?.asset?._ref && !isMobile && (
        <Box
          component="img"
          src={urlFor(props?.data?.logo?.asset?._ref).url()}
          width={isMobile ? "16.7vw" : DesktopPxToVw(100)}
          onClick={() => {
            navigate("/homepage", PathType?.internal), modalStore?.closeModal()
          }}
          alt="Map Pin-Point"
          sx={{
            margin: isMobile ? "0vw 0vw 0vw 8vw" : "-0.6vw 0vw 0vw 3.229vw",
            cursor: "pointer",
          }}
        />
      )}
      <MainGridWrapper
        container
        sx={{
          marginRight: authenticLoginStore ? "4vw" : "0vw",
          flexDirection: isMobile ? "column-reverse" : "row",
        }}
        $isMobile={isMobile}
        $isSignUp={!authenticLoginStore}>
        {isMobile ? (
          props?.data?.items?.map((item: any, index: number) => {
            return (
              <Grid key={index}>
                {context?.renderComponent(item._type, {
                  ...item,
                })}
              </Grid>
            )
          })
        ) : (
          <>
            <TabsWrapper item>
              <Grid container>
                {props?.data?.items?.map((item: any, index: number) => {
                  return (
                    <Grid
                      item
                      xs={5.5}
                      sm={5.5}
                      md={isFromLogin ? 5.5 : 12}
                      key={index}>
                      {context?.renderComponent(item._type, {
                        ...item,
                      })}
                    </Grid>
                  )
                })}
              </Grid>
            </TabsWrapper>
          </>
        )}
      </MainGridWrapper>
    </>
  )
}

export default observer(LoginFormWithMultipleTabs)
