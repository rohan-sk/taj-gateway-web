import path from "path"
import { useRouter } from "next/router"
import { ImageProps } from "../../types"
import { Box, Grid } from "@mui/material"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { Fragment, useContext, useEffect, useState } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import AuthenticLoginStore from "../../../features/login/store/authentication.login.store"
import AuthenticRegistrationStore from "../../../features/registration/store/authentic.registration.store"
import { TabsMapComponent, TabsDataInterface, TabsComponentInterface } from "../login-form.types"
import { PageContext, ModalContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { StyledTab, StyledTabs, StyledTypography, HeaderImagesWrapper } from "../Styles/tabs.styles"
import { UserStore } from "../../../store"

const TabsComponent = ({ tabs, title, image, variant }: TabsComponentInterface) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)

  //global user store
  const userStore = Context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const getActiveTab = () => {
    let activeTab = userStore?.loginTabIndex || 0

    return activeTab
  }
  const [value, setValue] = useState(getActiveTab())
  const router = useRouter()
  const pageContext = useContext(PageContext)
  const IHCLContexts = useContext(IHCLContext)
  const urlResolver = IHCLContexts!.urlResolver
  const qs: any = pageContext?.queryParams

  const mobileRegisterTabsData = isMobile
    ? tabs?.map((item: any) => ({
        ...item,
        tabItems: [item?.tabItems?.[0] || undefined],
      }))
    : tabs

  const modalContext = useContext(ModalContext)
  const authenticLoginStore = modalContext?.getPageStore(PAGE_STORES?.loginStore) as AuthenticLoginStore

  const authenticRegistrationStore = modalContext?.getPageStore(
    PAGE_STORES.registrationStore,
  ) as AuthenticRegistrationStore

  useEffect(() => {
    authenticLoginStore && authenticLoginStore?.updateData(tabs)
    authenticRegistrationStore && authenticRegistrationStore?.updateData(tabs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const updateIdentifier = (identifier: string | undefined, index: number) => {
    authenticLoginStore && authenticLoginStore?.updateActiveIndex(index)
    authenticRegistrationStore && authenticRegistrationStore?.updateActiveIndex(index)
    if (identifier !== router?.query?.identifier) {
      router?.replace(urlResolver(path + "?identifier=" + identifier))
    }
  }
  /**Added this use Effect to fix the issue to reset the selected tab value when tabs changes*/
  useEffect(() => {
    setValue(userStore?.loginTabIndex || 0)
    userStore?.setLoginTabIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs])
  return (
    <Grid container aria-label={variant}>
      <Grid item sm={12} md={12} xs={12} lg={12}>
        {!authenticRegistrationStore && (
          <>
            {isMobile ? (
              <>
                <StyledTypography variant="heading-s">{title}</StyledTypography>
                {image?.length > 0 && (
                  <HeaderImagesWrapper>
                    {image?.map((img: ImageProps, index: number) => (
                      <Fragment key={index}>
                        {img?.asset?._ref && (
                          <Box
                            key={index}
                            component={"img"}
                            alt={`logo-img`}
                            sx={{
                              "@media (max-width: 640px)": {
                                width: index === 0 ? "17.969vw" : index === 1 ? "22.344vw" : "15.156vw",
                                marginRight: index === 2 ? "0vw" : "6.4vw",
                                marginBottom: "6.2vw",
                              },
                            }}
                            src={urlFor(img?.asset?._ref)?.url()}
                          />
                        )}
                      </Fragment>
                    ))}
                  </HeaderImagesWrapper>
                )}
              </>
            ) : (
              <>
                <StyledTypography variant="heading-s">{title}</StyledTypography>
                {image?.length > 0 && (
                  <HeaderImagesWrapper>
                    {image?.map((img: ImageProps, index: number) => (
                      <Fragment key={index}>
                        {img?.asset?._ref && (
                          <Box
                            key={index}
                            component={"img"}
                            alt={`logo-img`}
                            sx={{
                              width:
                                index === 0
                                  ? DesktopPxToVw(162)
                                  : index === 1
                                  ? DesktopPxToVw(200)
                                  : DesktopPxToVw(135),
                              marginRight: "1vw",
                            }}
                            src={urlFor(img?.asset?._ref)?.url()}
                          />
                        )}
                      </Fragment>
                    ))}
                  </HeaderImagesWrapper>
                )}
              </>
            )}
          </>
        )}
        {authenticRegistrationStore && (
          <>
            {isMobile ? (
              <>
                {image?.[0]?.asset?._ref && (
                  <Box
                    component={"img"}
                    alt={`logo-img`}
                    sx={{
                      width: DesktopPxToVw(240),
                      margin: "auto auto 2vw auto",
                      "@media (max-width: 640px)": {
                        width: MobilePxToVw(230),
                        marginRight: "1.8vw",
                        marginBottom: "4.2vw",
                        marginTop: "2.8vw",
                      },
                    }}
                    src={urlFor(image?.[0]?.asset?._ref)?.url()}
                  />
                )}
                <StyledTypography variant="heading-s" sx={{ margin: "2vw 0vw 6.4vw 0vw !important" }}>
                  {title}
                </StyledTypography>
              </>
            ) : (
              <>
                <StyledTypography variant="heading-s" sx={{ margin: "4vw 0vw 2.4vw 0vw" }}>
                  {title}
                </StyledTypography>
                {image?.[0]?.asset?._ref && (
                  <Box
                    component={"img"}
                    alt={`logo-img`}
                    sx={{
                      width: DesktopPxToVw(240),
                      margin: "auto auto 2vw auto",
                      "@media (max-width: 640px)": {
                        width: MobilePxToVw(230),
                        marginRight: "2vw",
                        marginBottom: "6vw",
                        marginTop: "3.7vw",
                      },
                    }}
                    src={urlFor(image?.[0]?.asset?._ref)?.url()}
                  />
                )}
              </>
            )}
          </>
        )}
        <StyledTabs
          $index={tabs?.length < 3}
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { background: theme?.palette?.ihclPalette?.hexTwo },
          }}>
          {tabs?.map((item: TabsMapComponent, index: number) => (
            <StyledTab
              $indexOne={tabs?.length > 2 && index === 0}
              $indexTwo={tabs?.length > 2 && index === 2}
              $index={tabs?.length > 2}
              label={item.title}
              key={item.title}
              onClick={updateIdentifier.bind(this, item?.identifier, index)}
            />
          ))}
        </StyledTabs>

        <Box>
          {isMobile && authenticLoginStore ? (
            <Box sx={{ margin: "0vw 8vw" }}>
              {mobileRegisterTabsData?.map((item: TabsMapComponent, index: number) => (
                <TabView value={value} index={index} key={index}>
                  {item?.tabItems?.map((tabData: any, index: number) => {
                    return (
                      <Fragment key={index}>
                        <>
                          {IHCLContexts?.renderComponent(tabData?._type, {
                            ...tabData,
                          })}
                        </>
                      </Fragment>
                    )
                  })}
                </TabView>
              ))}
            </Box>
          ) : (
            <>
              {tabs?.map((item: any, index: number) => (
                <TabView value={value} index={index} key={index}>
                  {item?.tabItems?.map((tabData: TabsDataInterface, index: number) => {
                    return (
                      <Fragment key={index}>
                        <>
                          {index === 0
                            ? IHCLContexts?.renderComponent(tabData?._type, {
                                ...tabData,
                              })
                            : null}
                        </>
                      </Fragment>
                    )
                  })}
                </TabView>
              ))}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  )
}

export default observer(TabsComponent)

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
            p: {
              xs: "2.500vw 0vw !important",
              sm: "2.667vw 0vw !important",
              md: "3vw 0vw !important",
              lg: "2.985vw 0vw !important",
            },
          }}>
          {children}
        </Box>
      )}
    </div>
  )
}
