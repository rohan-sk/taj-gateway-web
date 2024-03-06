import React, { useContext } from "react"
import { urlFor } from "../../../../lib-sanity"
import { Box, Button, Typography } from "@mui/material"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { StyledChevronRight } from "../../../card/styles/common-styles"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { GAStore, UserStore } from "../../../../store"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { triggerEvent } from "../../../../utils/analytics"
import { MemberDataLayer } from "../../../../utils/analytics/member-data-layer"
import { getCookie } from "../../../../utils/cookie"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { NOT_LOGGEDIN, SIGNUP, SIGNUP_WIDGET_TITLE, widget_Type } from "../../../../utils/analytics/constants"

type RenderActionItemProps = {
  url: string
  image?: any
  router?: any
  title: string
  buttonStyles?: any
  navigationType: any
  buttonImgStyles?: any
  variant: string | any
  isActionButtonType: boolean
  isDisable?: boolean
  type?: any
  onClick?: Function
  linkStyles?: any
  iconStyles?: any
  isDisableRippleEffect?: boolean
  visibility?: boolean
  showArrow?: boolean
  widgetTitle?: string
  widgetType?: any
  isSocialContentGroup?: boolean
  isButtonChevron?: boolean
  buttonProps?: any
  isButtonChevronStyles?: any
}
const RenderActionItem = ({
  url = "",
  image,
  title,
  buttonStyles,
  navigationType,
  buttonImgStyles,
  isActionButtonType,
  variant = "light-contained",
  isDisable = true,
  type = "button",
  onClick,
  linkStyles,
  iconStyles,
  isDisableRippleEffect = false,
  visibility = true,
  showArrow = true,
  widgetTitle,
  isButtonChevron = false,
  widgetType,
  isSocialContentGroup,
  isButtonChevronStyles,
  buttonProps,
}: RenderActionItemProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)
  const handleJoinNow = (url: any, title: string, urlType: any) => {
    let pathname = global?.window?.location?.pathname
    let isHomePage = pathname?.includes("homepage")
    !isSocialContentGroup &&
      isHomePage &&
      triggerEvent({
        action: "neupass_join",
        params: {
          ...dataLayer,
          outbound: urlType === "internal" ? false : true,
          clientId: getCookie("_ga")?.slice(6),
          link_text: title,
          link_url: url,
          buttonLinkName: title,
          LoggedIN: NOT_LOGGEDIN,
          widget_title: widgetTitle || SIGNUP_WIDGET_TITLE,
          pageSection: widgetTitle || SIGNUP_WIDGET_TITLE,
          widget_type: widgetType || widget_Type,
          journeyType: SIGNUP,
        },
      })
  }
  return isActionButtonType ? (
    <>
      {title && (
        <Button
          disableRipple={isDisableRippleEffect}
          type={type}
          variant={variant}
          onClick={
            onClick
              ? () => onClick()
              : () => {
                  if (isDisable) {
                    url && navigate(url, navigationType), handleJoinNow(url, title, type)
                  }
                }
          }
          sx={{
            padding: image ? "0.938vw 1.667vw 0.938vw 0.6406vw" : "auto",
            ...buttonStyles,
            opacity: isDisable ? 1 : 0.7,
            cursor: isDisable ? "pointer" : "not-allowed",
            visibility: visibility ? "unset" : "hidden",
          }}
          {...buttonProps}
        >
          {image && (
            <Box
              alt={`-img`}
              component={"img"}
              src={urlFor(image).url()}
              sx={{
                ...buttonImgStyles,
              }}
            />
          )}
          {title}
          {isButtonChevron && isMobile && (
            <StyledChevronRight
              sx={{
                transform: isButtonChevronStyles ? isButtonChevronStyles : "rotate(90deg)",
                "@media (max-width: 640px)": {
                  width: "4vw !important",
                },
              }}
            />
          )}
        </Button>
      )}
    </>
  ) : (
    (isMobile ? "m-text-link" : "link-m") && (
      <>
        {title && (
          <Box
            sx={{
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
              ...buttonStyles,
            }}>
            {image && (
              <Box
                alt={`-img`}
                component={"img"}
                src={urlFor(image).url()}
                sx={{
                  ...buttonImgStyles,
                }}
              />
            )}
            <Typography
              variant={isMobile ? "m-text-link" : "link-m"}
              onClick={
                onClick
                  ? () => onClick()
                  : () => {
                      if (isDisable) {
                        url && navigate(url, navigationType)
                      }
                    }
              }
              sx={{ ...linkStyles }}>
              {title}
            </Typography>
            {navigationType !== "dialog" && showArrow && <StyledChevronRight sx={{ ...iconStyles }} />}
          </Box>
        )}
      </>
    )
  )
}
export default RenderActionItem
