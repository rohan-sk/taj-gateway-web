import React, { useContext, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import SignIn from "../hoc/SignIn.tsx/SignIn"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import { ActionProps, ImageProps, PathType, aestheticItems } from "../types"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { StyledBox } from "./styles/nudge-with-background.style"
import { observer } from "mobx-react-lite"
import {
  Account,
  AccountNavigation,
  LoggedIn,
} from "../forms/gift-card-form/constants"
interface childrenInterface {
  marks: any
  text: string
  _type: string
}
interface markDefsItems {
  href: string
  type: string
  _type: string
}
interface singleContentInterface {
  children: childrenInterface[]
  markDefs: markDefsItems[]
  style: string
  _type: string
}
interface propsInterface {
  aesthetic: aestheticItems
  largeImage: ImageProps
  parameterMap: propsInterface[]
  title: string
  subtitle: string
  description: string
  secondaryAction: ActionProps
  singleContent: singleContentInterface[]
  isMultiBlockContent: boolean
  primaryAction: ActionProps
  urlType: string
  variant: string
  _key: string
  _type: string
  value: any
}
interface parameterMapInterface {
  value: string
}

const NudgeWithLoginForm = (props: propsInterface) => {
  const { cardPadding } = useAesthetics(props?.aesthetic?._ref)
  const isMobile = useMobileCheck()
  const [login, setLogin] = useState<boolean>(false)
  const IHCLContexts = useContext(IHCLContext)
  const CustomerHash = global?.localStorage?.getItem("customerHash")

  //store
  const userStore = IHCLContexts?.getGlobalStore(
    GLOBAL_STORES.userStore
  ) as UserStore

  useEffect(() => {
    if (userStore?.userDetails?.userHash || CustomerHash) {
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [userStore?.userDetails?.userHash, CustomerHash])

  return (
    <>
      {!login ? (
        <Box
          sx={{
            backgroundColor: theme?.palette?.background?.paper,
            padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
          }}
        >
          <SignIn
            primaryAction={props?.primaryAction}
            title={props?.title}
            description={props?.description}
            parameterMap={props?.parameterMap}
            secondaryAction={props?.secondaryAction}
            singleContent={props?.singleContent}
            variant={props?.variant}
          />
        </Box>
      ) : (
        <StyledBox>
          <Typography variant={isMobile ? "m-heading-xs" : "heading-s"}>
            {LoggedIn}
          </Typography>
          <RenderActionItem
            url={AccountNavigation}
            title={Account}
            variant={props?.primaryAction?.variant}
            navigationType={PathType?.internal}
            isActionButtonType={true}
            buttonStyles={{
              width: isMobile ? "80vw" : DesktopPxToVw(270),
              marginTop: isMobile ? "4vw" : "2.083vw",
            }}
          />
        </StyledBox>
      )}
    </>
  )
}

export default observer(NudgeWithLoginForm)
