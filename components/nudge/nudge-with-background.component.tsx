import React, { useContext, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import { UserStore } from "../../store"
import { urlFor } from "../../lib-sanity"
import SignIn from "../hoc/SignIn.tsx/SignIn"
import { ActionProps, ImageProps } from "../types"
import { GLOBAL_STORES } from "../../utils/Constants"
import { useMobileCheck } from "../../utils/isMobilView"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  BoxWrapper,
  ImageWrapper,
  NudgeSignInWrapper,
  StyledBox,
} from "./styles/nudge-with-background.style"
import RenderActionItem from "../hoc/actions/action-items-ui"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { observer } from "mobx-react-lite"
import { LoggedIn } from "../forms/gift-card-form/constants"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
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
  value: any
  title: string
}
interface CardWithBackgroundInterface {
  image: ImageProps
  largeImage: ImageProps
  parameterMap: propsInterface[]
  title: string
  subtitle?: string
  description?: string
  secondaryAction: ActionProps
  singleContent: singleContentInterface[]
  isMultiBlockContent: boolean
  primaryAction: ActionProps
  urlType: string
  variant: string
  _key: string
  _type: string
}

const CardWithBackground = (props: CardWithBackgroundInterface) => {
  const { largeImage, image } = props
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const IHCLContexts = useContext(IHCLContext)
  const bgImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref

  const [login, setLogin] = useState<boolean>(false)

  const isLoggedIn = useLoggedIn()
  //store

  useEffect(() => {
    if (isLoggedIn) {
      setLogin(true)
    } else {
      setLogin(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const Salutation = global?.window?.localStorage.getItem("userSalutation")
  const userFirstName = global?.window?.localStorage.getItem("userFirstName")
  const userLastName = global?.window?.localStorage.getItem("userLastName")
  return (
    <>
      <Box sx={{ position: "relative" }}>
        {bgImage && (
          <ImageWrapper
            component="img"
            alt="award-neupass"
            src={getOptimizeImageUrl(urlFor(bgImage).url(), 1)}
          />
        )}
        <BoxWrapper
          width={
            login
              ? isMobile
                ? MobilePxToVw(476)
                : DesktopPxToVw(675)
              : isMobile
              ? MobilePxToVw(476)
              : DesktopPxToVw(675)
          }>
          {!login ? (
            <NudgeSignInWrapper>
              <SignIn
                primaryAction={props?.secondaryAction}
                title={props?.title}
                description={props?.description}
                parameterMap={props?.parameterMap}
                secondaryAction={props?.secondaryAction}
                singleContent={props?.singleContent}
              />
            </NudgeSignInWrapper>
          ) : (
            <Box width={"100%"}>
              <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
                {Salutation + "." + " " + userFirstName + " " + userLastName + ","}
                <br /> <br />
                {`You are logged in as ${global?.window?.localStorage?.getItem(
                  "userTier"
                )} member.`}
              </Typography>
              <RenderActionItem
                url={props?.primaryAction?.url}
                title={props?.primaryAction?.title}
                variant={props?.primaryAction?.variant}
                navigationType={props?.primaryAction?.urlType}
                isActionButtonType={true}
                buttonStyles={{
                  width: isMobile ? MobilePxToVw(300) : DesktopPxToVw(270),
                  marginTop: isMobile ? MobilePxToVw(32) : "2.083vw",
                }}
              />
            </Box>
          )}
        </BoxWrapper>
      </Box>
    </>
  )
}

export default observer(CardWithBackground)
