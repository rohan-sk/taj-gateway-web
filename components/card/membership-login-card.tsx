import React, { useContext, useEffect, useState } from "react"
import { ActionProps, ImageProps, aestheticItems } from "../types"
import dynamic from "next/dynamic"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { observer } from "mobx-react-lite"
import { Box, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  GradientMainBox,
  ContentBox,
  TitleTypography,
  DescriptionTypography,
  MobileDescriptionBox,
  MobileContentBox,
  MobileGradientBox,
} from "./styles/membership-login-card.styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import LoyaltyGlobalStore from "../../features/loyalty/store/globalStore/loyalty-global-store"
import { useLoggedIn } from "../forms/loyalty-form/epicure-imports.component"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

interface MembershipLoginCardProps {
  _key: string
  _type: string
  title: string
  urlType: string
  variant: string
  isMobile: boolean
  image: ImageProps
  parentProps: number
  description: string
  largeVariant: string
  largeImage: ImageProps
  isHeroTitleFont: boolean
  aesthetic: aestheticItems
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  secondaryAction: ActionProps
}

const MembershipLoginCard = ({
  title,
  image,
  variant,
  aesthetic,
  largeImage,
  description,
  largeVariant,
  primaryAction,
}: MembershipLoginCardProps) => {
  const context = useContext(IHCLContext)

  //global loyalty store
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  //store
  const userStore = context?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const { getOptimizeImageUrl } = useImageUtility()

  const [epicureUserNumber, setEpicureUserNumber] = useState<any>()

  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref
  const isLargeVariant = largeVariant === "loyalty.card.neupass-membership-login"
  const isVariant = variant === "loyalty.card.neupass-membership-login"

  const isEpicureMember = global?.window?.localStorage?.getItem("epicureMemberID")
  const isRenewal = epicureGlobalStore?.epicurePageData?.subType?.toLowerCase() === "renewal"
  const userLastName = userStore?.userDetails?.lastName || global?.window?.localStorage?.getItem("userLastName")
  const userTitle = userStore?.userDetails?.salutation || global?.window?.localStorage?.getItem("userSalutation")
  const userFirstName = userStore?.userDetails?.firstName || global?.window?.localStorage?.getItem("userFirstName")

  useEffect(() => {
    global?.window?.addEventListener("storage", function (e) {
      setEpicureUserNumber(global?.window?.localStorage?.getItem("epicureMemberID"))
    })
  }, [isLoggedIn])

  return (
    <>
      {((isEpicureMember && !isRenewal) || (isLoggedIn && (isLargeVariant || isVariant))) && (
        <Box
          key={epicureUserNumber}
          sx={{
            height: isMobile ? "76.500vw" : "unset",
            padding: isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop,
          }}
          aria-label={isMobile ? variant : largeVariant}>
          <Box sx={{ position: "relative" }}>
            <Box
              alt={(isMobile ? image?.altText : largeImage?.altText) || "img"}
              component="img"
              sx={{ cursor: "pointer", width: "100%" }}
              src={getOptimizeImageUrl(urlFor(isMobile ? mobileImage : webImage).url(), 1)}
            />
            {isMobile ? (
              <>
                <MobileGradientBox>
                  <MobileContentBox>
                    <Box sx={{ marginBottom: "1.094vw" }}>
                      <Typography
                        sx={{ color: `${theme?.palette?.ihclPalette?.hexOne}`, textTransform: "capitalize" }}
                        variant="m-heading-xs">
                        {title}&nbsp;
                        {`${userTitle ? `${userTitle}.` : ``}`}&nbsp;
                        {userFirstName}&nbsp;
                        {userLastName}
                      </Typography>
                    </Box>
                    <MobileDescriptionBox>
                      <Typography
                        sx={{
                          color: `${theme?.palette?.ihclPalette?.hexOne}`,
                          fontSize: MobilePxToVw(18),
                        }}
                        variant={"m-body-sl"}>
                        {description}
                      </Typography>
                    </MobileDescriptionBox>
                    <Box sx={{ margin: "4.688vw 0vw" }}>
                      <RenderActionItem
                        url={primaryAction?.url}
                        isActionButtonType={true}
                        title={primaryAction?.title}
                        variant={primaryAction?.variant}
                        navigationType={primaryAction?.urlType}
                        buttonStyles={{
                          letterSpacing: "0.1em",
                        }}
                      />
                    </Box>
                  </MobileContentBox>
                </MobileGradientBox>
              </>
            ) : (
              <GradientMainBox>
                <ContentBox sx={{ justifyContent: "space-evenly", marginLeft: "6vw" }}>
                  <Box>
                    <TitleTypography sx={{ textTransform: "capitalize" }} variant={"heading-s"}>
                      {title} {`${userTitle ? `${userTitle}.` : ``}`} &nbsp;
                      {userFirstName}&nbsp;
                      {userLastName}
                    </TitleTypography>
                    <DescriptionTypography
                      sx={{
                        color: `${theme?.palette?.ihclPalette?.hexOne}`,
                        fontSize: DesktopPxToVw(18),
                      }}
                      variant={"body-ml"}>
                      {description}
                    </DescriptionTypography>
                  </Box>
                  <Box sx={{ marginTop: "10px" }}>
                    <RenderActionItem
                      url={primaryAction?.url}
                      isActionButtonType={true}
                      title={primaryAction?.title}
                      variant={primaryAction?.variant}
                      navigationType={primaryAction?.urlType}
                      buttonStyles={{
                        letterSpacing: "0.1em",
                        marginTop: "",
                      }}
                    />
                  </Box>
                </ContentBox>
              </GradientMainBox>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export default observer(MembershipLoginCard)
