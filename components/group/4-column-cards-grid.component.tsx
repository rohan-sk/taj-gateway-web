import { UserStore } from "../../store"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../utils/Constants"
import { Box, Grid, Typography } from "@mui/material"
const CustomDropDown = dynamic(() => import("../hoc/CustomDropDown").then((module) => module.CustomDropDown))
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { ImageProps, parameterMapItems } from "../types"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import React, { useContext, useEffect, useState } from "react"
import { StyledBox } from "../nudge/styles/nudge-with-background.style"
import { ParameterMapWrappingBox } from "./styles/common-styled-components"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Account, LoggedIn, AccountNavigation } from "../forms/gift-card-form/constants"

type FourColumnCardsGridProps = {
  items: FourColumnCardsGridItems[]
  alternateAllLinks?: any
  parameterMap?: parameterMapItems[] | undefined
  primaryAction: any
  variant: string
  largeVariant: string
}

type FourColumnCardsGridItems = {
  _type: string
  title: string
  image: ImageProps
  largeImage: ImageProps
}

const FourColumnCardsGrid = ({
  items,
  variant,
  largeVariant,
  parameterMap,
  primaryAction,
  alternateAllLinks,
}: FourColumnCardsGridProps) => {
  const context = useContext(IHCLContext)
  const IHCLContexts = useContext(IHCLContext)
  //global user store
  const userStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  const CustomerHash = global?.localStorage?.getItem("customerHash")
  const [dropDownValue, setDropDownValue] = useState<string>("")

  useEffect(() => {
    if (userStore?.userDetails?.userHash || CustomerHash) {
      setIsUserLoggedIn(true)
    } else {
      setIsUserLoggedIn(false)
    }
  }, [userStore?.userDetails?.userHash, CustomerHash])

  let dropDownData = [""]
  const isMobile = useMobileCheck()
  const salutation =
    global?.window?.localStorage.getItem("userSalutation") !== "null" &&
    global?.window?.localStorage.getItem("userSalutation") !== null &&
    global?.window?.localStorage.getItem("userSalutation")
  const userFirstName = global?.window?.localStorage.getItem("userFirstName")
  const userLastName = global?.window?.localStorage.getItem("userLastName")
  return (
    <Box aria-label={isMobile ? variant : largeVariant}>
      {alternateAllLinks?.map((item: any, index: number) => (
        <>
          {!isUserLoggedIn ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <RenderActionItem
                url={item?.url}
                title={item?.title}
                navigationType={item?.urlType}
                variant={item?.variant}
                isActionButtonType={
                  item?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                }
                buttonStyles={{
                  marginBottom: DesktopPxToVw(70),
                  letterSpacing: "0.1em",
                }}
              />
            </Box>
          ) : (
            <>
              {/* the myAccount component is commented for client requirement this component is foe neupass web page */}
              {/* <StyledBox>
                <Typography variant={isMobile ? "m-heading-xs" : "heading-s"} textAlign={"center"}>
                  {`${salutation ? `${salutation}. ` : ""}`}
                  {`${userFirstName} ${userLastName},`}
                  <br /> <br />
                  {`You are logged in as ${global?.window?.localStorage?.getItem("userTier")} member.`}
                </Typography>
                <RenderActionItem
                  url={AccountNavigation}
                  title={Account}
                  variant={primaryAction?.variant}
                  navigationType={primaryAction?.urlType}
                  isActionButtonType={true}
                  buttonStyles={{
                    width: isMobile ? "80vw" : DesktopPxToVw(270),
                    marginTop: isMobile ? "4vw" : "2.083vw",
                    marginBottom: "6.083vw",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                />
              </StyledBox> */}
            </>
          )}
        </>
      ))}
      {parameterMap && (
        <ParameterMapWrappingBox
          sx={{
            justifyContent:
              parameterMap?.length > 1 ? "flex-start" : "flex-end",
            alignItems: "baseline",
          }}>
          {parameterMap?.map((item: parameterMapItems, index: number) => (
            <Box key={index}>
              {item?.key === CONSTANTS?.DROP_DOWN && (
                <CustomDropDown
                  label={item?.value}
                  placeHolder={item?.value}
                  data={dropDownData}
                  value={dropDownValue}
                  setValue={setDropDownValue}
                />
              )}
            </Box>
          ))}
        </ParameterMapWrappingBox>
      )}
      <Grid container spacing={"2.081vw"}>
        {items?.map((item: FourColumnCardsGridItems, index: number) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={isMobile ? 12 : 3}
            md={3}
            lg={3}
            xl={3}>
            {context?.renderComponent(
              item?._type,
              { ...item, gridSize: 4 },
              index
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default observer(FourColumnCardsGrid)
