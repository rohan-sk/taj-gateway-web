import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { ActionProps, ImageItems, singleContentInterface } from "../../types"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material"
import { LogoWrapper } from "../../group/styles/main-group-styles"
import { urlFor } from "../../../lib-sanity"
import { GLOBAL_STORES } from "../../../utils/Constants"
import LoyaltyGlobalStore from "../../../features/loyalty/store/globalStore/loyalty-global-store"
import { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import Pluralize from "../../../utils/pluralize"
import { observer } from "mobx-react-lite"

const CustomReadMore = dynamic(() => import("../CustomReadMore"))
const RenderActionItem = dynamic(() => import("../actions/action-items-ui"))
const PortableTextReadMore = dynamic(() => import("../PortableTextReadMore"))

type MultiRowTitleTypes = {
  subTitle: any
  variant?: string
  heading?: string
  title: TitleTypes
  titleVariant?: any
  charactersLimit: number
  alignmentVariant: string
  aesthetic: any
  primaryAction?: ActionProps
  onGroupPrimaryClick?: Function
  isComponentFullWidth: boolean
  isMobileComponentFullWidth: boolean
  isFilterAvailable?: boolean
  subHeadingElement?: any
  isMarginBottomNotRequired?: boolean
  logo?: ImageItems
  largeVariant?: string
  singleGroupContent?: singleContentInterface | singleContentInterface[]
  titleTextColor?: string
}

type TitleTypes = {
  mobileTitle: string[]
  desktopTitle: string[]
  headingElement?: any
}

const MultiRowTitle = ({
  title,
  variant,
  heading,
  subTitle,
  aesthetic,
  titleVariant,
  primaryAction,
  charactersLimit,
  alignmentVariant,
  onGroupPrimaryClick,
  isComponentFullWidth,
  isMobileComponentFullWidth,
  isFilterAvailable,
  subHeadingElement,
  isMarginBottomNotRequired = false,
  logo,
  largeVariant,
  singleGroupContent,
  titleTextColor,
}: MultiRowTitleTypes) => {
  const context = useContext(IHCLContext)
  //global loyalty store
  const epicureGlobalStore = context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore
  const isMobile = useMediaQuery("(max-width:641px)")
  const subTitleLength = charactersLimit ?? 300
  const titleWithOutHyphens = alignmentVariant === "center-aligned-regular-title-with-no-hyphens"
  const headerWithLargerFontSize = alignmentVariant === "center-aligned-regular-title-variable-font-size" // 48px for mobile
  const centerWithSingleDash = alignmentVariant === "center-with-left-hyphen"
  const isCenter =
    alignmentVariant === "center" ||
    titleWithOutHyphens ||
    headerWithLargerFontSize ||
    (centerWithSingleDash && !isMobile)
  const isRegular = alignmentVariant === "regular" || (centerWithSingleDash && isMobile)
  const textColor = aesthetic?.titleColor?.hex || titleTextColor || theme?.palette?.text?.primary
  const Title = isMobile ? (title?.mobileTitle ? title?.mobileTitle : title?.desktopTitle) : title?.desktopTitle
  const headingElement = title?.headingElement || "h2"

  const isSSOThankYouVariant = variant === "authentication.group.membership-carousel"
  const loyaltyVariant = largeVariant === "loyalty.tier-card-with-right-aligned-content"

  const portableContent = Array?.isArray(singleGroupContent)
    ? singleGroupContent
    : singleGroupContent
    ? [singleGroupContent]
    : []

  const CustomDivider = () => {
    return (
      <Divider
        sx={{
          height: "2%",
          width: isMobile ? "6.25vw" : "4.16vw",
          borderColor: isMobile
            ? textColor
              ? textColor
              : theme?.palette?.text?.primary
            : textColor
            ? textColor
            : theme?.palette?.text?.primary,
          background: isMobile
            ? textColor
              ? textColor
              : theme?.palette?.text?.primary
            : textColor
            ? textColor
            : theme?.palette?.text?.primary,
        }}
      />
    )
  }

  const getMarginBottom = (variant: string) => {
    switch (variant) {
      case "myAccount.group.section-specific-details":
        return isMobile ? 20 : 30
      case "myAccount.group.title-with-subHeader":
        return isMobile ? 20 : 30
      case "offers.group.3-column-grid-with-no-borders-lines-for-cards":
        return isMobile ? 20 : 50
      case "offers.group.3-column-grid-with-package-icons":
        return isMobile ? 42 : 50
      case "businessServices.group.group-with-1:2-outer-padding":
        return isMobile ? 40 : 40
      case "ihcl.core.group.multiple-square-card-carousel":
        return isMobile ? 40 : 60
      case "bookings.group.booking-payment-return":
        return isMobile ? 30 : 30
      default:
        return isMobile ? 55 : 80
    }
  }
  const getMaxWidth = (variant: string | undefined) => {
    switch (variant) {
      case "bookings.group.booking-payment-return":
        return isMobile ? MobilePxToVw(463.5) : DesktopPxToVw(462.5)
      default:
        return isMobile ? "100%" : DesktopPxToVw(840)
    }
  }

  return (
    <>
      {
        <>
          {(Title?.length > 0 || heading || subTitle || portableContent?.length > 0) && (
            <Box
              aria-label={isMobile ? `Multi-row-title-${variant}` : `Multi-row-title-${largeVariant}`}
              mb={
                isMarginBottomNotRequired
                  ? 0
                  : isMobile
                  ? Title?.length > 0 || subTitle
                    ? isFilterAvailable
                      ? MobilePxToVw(20)
                      : variant
                      ? MobilePxToVw(getMarginBottom(variant))
                      : MobilePxToVw(55)
                    : "0vw"
                  : isFilterAvailable
                  ? DesktopPxToVw(60)
                  : DesktopPxToVw(getMarginBottom(largeVariant || ""))
              }>
              {(Title?.length > 0 || subTitleLength > 0) && (
                <Stack
                  aria-label="main-stack"
                  margin={isCenter ? "0 auto" : "unset"}
                  textAlign={isCenter ? "center" : "left"}
                  direction={isCenter || isMobile ? "column" : "row"}
                  alignItems={
                    isCenter
                      ? "center"
                      : isMobile
                      ? "flex-start"
                      : isRegular && subTitle && primaryAction?.title
                      ? "flex-start"
                      : "flex-end"
                  }
                  padding={
                    isRegular || isCenter
                      ? isMobile
                        ? isMobileComponentFullWidth
                          ? "0vw 12.97vw"
                          : "0vw"
                        : isComponentFullWidth
                        ? "0vw 12.5vw"
                        : "0vw"
                      : "0vw"
                  }
                  rowGap={
                    isCenter && subTitle
                      ? isMobile
                        ? MobilePxToVw(35)
                        : "2.083vw"
                      : subTitle
                      ? isMobile
                        ? MobilePxToVw(35)
                        : 0
                      : 0
                  }>
                  {Title?.length > 0 && (
                    <Stack
                      direction={"row"}
                      flexBasis={isRegular ? "50%" : "100%"}
                      columnGap={isMobile ? "3.125vw" : "2.083vw"}
                      alignItems={isRegular ? "flex-start" : "center"}>
                      {isCenter && !titleWithOutHyphens && <CustomDivider />}
                      <Stack
                        direction={"column"}
                        component={headingElement}
                        sx={{ marginBlockStart: 0, marginBlockEnd: 0 }}
                        alignItems={isRegular ? "flex-start" : "center"}>
                        {Title?.map((title: string, index: number) => (
                          <Stack
                            key={index}
                            alignItems={"center"}
                            columnGap={isRegular && index === 0 ? "2.083vw" : "0"}
                            direction={isRegular && index === 0 ? "row" : "column"}>
                            {isRegular && index === 0 && <CustomDivider />}
                            <Typography
                              className="multi-row-group-title"
                              lineHeight={"120%"}
                              whiteSpace={"nowrap"}
                              component={"span"}
                              variant={
                                headerWithLargerFontSize && isMobile
                                  ? "m-heading-m"
                                  : titleVariant
                                  ? titleVariant
                                  : isMobile
                                  ? "m-heading-m"
                                  : "heading-l"
                              }
                              color={
                                textColor ? textColor : process.env.NEXT_PUBLIC_IS_GATEWAY ? "red" : "blue" //theme?.palette?.text?.primary
                              }>
                              {loyaltyVariant && epicureGlobalStore?.cardsLength > 1
                                ? Pluralize(title, Title?.length === index + 1 ? 2 : 1, false)?.slice(1)
                                : title}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      {isCenter && !titleWithOutHyphens && !centerWithSingleDash && <CustomDivider />}
                    </Stack>
                  )}
                  <Stack
                    className="multi-row-group-subtitle"
                    direction={"column"}
                    justifyContent={"space-between"}
                    flexBasis={isRegular ? "50%" : "100%"}
                    rowGap={isMobile ? "3.125vw" : "1.35vw"}
                    ml={isRegular && subTitle && !primaryAction?.title && !isMobile ? DesktopPxToVw(24) : 0}
                    maxWidth={
                      isMobile
                        ? getMaxWidth(variant)
                        : isCenter
                        ? getMaxWidth(variant)
                        : isRegular && isComponentFullWidth
                        ? DesktopPxToVw(700)
                        : "100%"
                    }
                    mt={isRegular && subTitle && primaryAction?.title && !isMobile ? DesktopPxToVw(13) : 0}
                    mb={isRegular && subTitle && !primaryAction?.title && !isMobile ? DesktopPxToVw(18) : 0}
                    alignItems={subTitle ? "normal" : "flex-end"}>
                    <Typography
                      className="hide-box multi-row-group-subtitle"
                      variant={isMobile ? "m-body-sl" : "body-ml"}
                      sx={{ textAlign: alignmentVariant }}
                      color={textColor ? textColor : theme?.palette?.text?.primary}>
                      {subTitle?.length > subTitleLength ? (
                        <CustomReadMore
                          length={subTitleLength}
                          variant={isMobile ? "m-body-sl" : "body-ml"}
                          textStyles={{
                            fontSize: isMobile ? "3.438vw" : "1.146vw",
                            color: textColor ? textColor : theme?.palette?.text?.primary,
                          }}>
                          {subTitle}
                        </CustomReadMore>
                      ) : (
                        subTitle
                      )}
                    </Typography>
                    {portableContent?.length > 0 && (
                      <PortableTextReadMore
                        color={aesthetic?.titleColor?.hex || titleTextColor}
                        variant={isMobile ? "m-body-sl" : "body-ml"}
                        length={subTitleLength}>
                        {portableContent}
                      </PortableTextReadMore>
                    )}
                    {variant === "details.group.full-width-media-with-logo" && isCenter && (
                      <LogoWrapper>
                        <Box
                          component="img"
                          alt="logo"
                          src={urlFor(logo?.asset?._ref).url()}
                          width={isMobile ? MobilePxToVw(446) : DesktopPxToVw(446)}
                        />
                      </LogoWrapper>
                    )}
                    {primaryAction?.title && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: isCenter ? "center" : "flex-start",
                        }}>
                        <RenderActionItem
                          url={primaryAction?.url}
                          title={primaryAction?.title}
                          onClick={onGroupPrimaryClick}
                          variant={primaryAction?.variant}
                          navigationType={primaryAction?.urlType}
                          image={primaryAction?.image?.asset?._ref}
                          isActionButtonType={primaryAction?.variant === "link" ? false : true}
                          buttonStyles={{
                            gap: isMobile
                              ? primaryAction?.variant === "link"
                                ? MobilePxToVw(1)
                                : MobilePxToVw(8)
                              : primaryAction?.variant === "link"
                              ? MobilePxToVw(1)
                              : DesktopPxToVw(8),
                            letterSpacing: "0.09em",
                          }}
                          buttonImgStyles={{
                            width:
                              primaryAction?.title === "DOWNLOAD PDF"
                                ? isMobile
                                  ? MobilePxToVw(20)
                                  : DesktopPxToVw(20)
                                : "initial",
                            height:
                              primaryAction?.title === "DOWNLOAD PDF"
                                ? isMobile
                                  ? MobilePxToVw(20)
                                  : DesktopPxToVw(20)
                                : "initial",
                          }}
                          linkStyles={{
                            letterSpacing: isMobile ? "0.281vw" : "unset",
                          }}
                        />
                      </Box>
                    )}
                  </Stack>
                </Stack>
              )}
              {heading && (
                <Box
                  padding={
                    isRegular || isCenter
                      ? isMobile
                        ? isMobileComponentFullWidth
                          ? "0vw 12.97vw"
                          : "0vw"
                        : isComponentFullWidth
                        ? "0vw 12.5vw"
                        : "0vw"
                      : "0vw"
                  }
                  sx={{
                    gap: "2%",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "flex-start",
                    paddingBottom: isMobile ? "6.65vw" : "0vw",
                    justifyContent: isCenter ? "center" : "left",
                  }}>
                  {!titleWithOutHyphens && (
                    <Divider
                      sx={{
                        height: "3%",
                        width: isMobile ? "6.25vw" : "2.16vw",
                        background: theme?.palette?.text?.primary,
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      textAlign: isCenter ? "center" : "left",
                      color: textColor ? textColor : theme?.palette?.text?.primary,
                    }}
                    component={headingElement}
                    variant={
                      isMobile && isSSOThankYouVariant
                        ? "m-heading-xs"
                        : isMobile
                        ? titleWithOutHyphens
                          ? "m-heading-s"
                          : "m-heading-m"
                        : titleWithOutHyphens
                        ? "heading-s"
                        : "heading-m"
                    }>
                    {heading}
                  </Typography>
                  {!titleWithOutHyphens && (
                    <Divider
                      sx={{
                        height: "3%",
                        width: isMobile ? "6.25vw" : "2.16vw",
                        background: theme?.palette?.text?.primary,
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>
          )}
        </>
      }
    </>
  )
}
export default observer(MultiRowTitle)
