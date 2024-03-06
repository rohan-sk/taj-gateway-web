import React, { useContext, useEffect, useRef, useState } from "react"
import { CardMedia, Typography, Box, Divider, Stack, useTheme } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledChevronRight } from "./styles/common-styles"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { ImageProps, ActionProps, RichTextItems, parameterMapItems } from "../types"
import {
  StyledBulletIcon,
  SubTitleBox,
  InclusionTitle,
  ListItemBulletText,
  BulletContainer,
} from "./styles/card-with-desc"
import {
  ImageCard,
  DescriptionCard,
  ActionBox,
  PrimaryAndSecondaryActionBox,
  CtaLabelBox,
} from "./styles/card-with-verticle-aligned-content"
import { CONSTANTS } from "../constants"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

type CardWithRightAlignedContentProps = {
  content: any
  url: string
  urlType: any
  title: string
  subTitle: string
  ctaLabel: string
  image: ImageProps
  highLights: string
  description: string
  largeImage: ImageProps
  charactersLimit?: number
  richText: RichTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap: parameterMapItems[]
  packageInclusionsTitle?: string
  packageInclusions?: string[]
  onPrimaryClick?: Function
  packageItemsHeight: number
  setPackagesHeight: Function
}

const CardWithVerticleAlignedContent = ({
  content,
  url,
  urlType,
  title,
  subTitle,
  ctaLabel,
  image,
  highLights,
  description,
  largeImage,
  charactersLimit,
  primaryAction,
  parameterMap,
  secondaryAction,
  packageInclusionsTitle,
  packageInclusions,
  onPrimaryClick,
  packageItemsHeight,
  setPackagesHeight,
}: CardWithRightAlignedContentProps) => {
  const [HideMore, setHideMore] = useState<boolean>(false)
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const Context = useContext(IHCLContext)
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const itemHeading = title?.split(",")
  const isRichTextAvailable = content?.length > 0
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const packageItemElementRef = useRef<any>(null)
  const packageItemHeight = packageItemElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setPackagesHeight && packageItemHeight && packageItemsHeight < packageItemHeight) {
      setPackagesHeight(packageItemHeight)
    }
  }, [packageItemHeight, packageItemsHeight, setPackagesHeight])

  return (
    <Box>
      {cardImage && (
        <Box>
          <ImageCard>
            <CardMedia
              alt={(isMobile ? image?.altText : largeImage?.altText) || "media"}
              component="img"
              src={urlFor(cardImage)?.url()}
            />
          </ImageCard>
          <Box
            sx={{
              padding: isMobile ? "6.250vw 4.219vw" : "2.291vw",
              border: `0.052vw solid ${theme?.palette?.neuPalette?.hexTwo}`,
            }}>
            {itemHeading?.[0] && (
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                sx={{ color: theme?.palette?.text?.primary }}>{`${itemHeading?.[0]} ${
                itemHeading?.[1] ? "," : ""
              }`}</Typography>
            )}
            {itemHeading?.[1] && (
              <Typography
                variant={isMobile ? "m-heading-xs" : "heading-xs"}
                sx={{ color: theme?.palette?.primary?.main }}>
                {itemHeading?.[1]}
              </Typography>
            )}
            {subTitle && (
              <SubTitleBox>
                <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>{subTitle}</Typography>
              </SubTitleBox>
            )}
            {highLights && (
              <SubTitleBox>
                <StyledBulletIcon />
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>{highLights}</Typography>
              </SubTitleBox>
            )}
            {description && (
              <Box
                sx={{
                  marginTop: isMobile ? "2.156vw" : "0.677vw",
                  paddingBottom: isMobile ? "3.125vw" : "0.677vw",
                }}>
                <DescriptionCard
                  variant={isMobile ? "m-body-ml" : "body-ml"}
                  sx={{
                    overflow: "hidden",
                    display: "webkitBox",
                    WebkitLineClamp: 2,
                    lineClamp: 2,
                    webkitBoxOrient: "vertical",
                    fontSize: isMobile ? DesktopPxToVw(56) : DesktopPxToVw(18),
                  }}
                  className="hide-box">
                  {description.length > more ? (
                    <>
                      <CustomReadMore length={more} variant={isMobile ? "m-body-s" : "body-ml"}>
                        {description}
                      </CustomReadMore>
                    </>
                  ) : (
                    description
                  )}
                </DescriptionCard>
              </Box>
            )}
            {parameterMap && (
              <Box sx={{ mt: parameterMap?.[0]?.key ? "2.08vw" : "" }}>
                {parameterMap?.map((item: parameterMapItems, index: number) => (
                  <Box key={index}>
                    <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                      {item?.key} :<b> {item?.value}</b>
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
            {packageInclusionsTitle && (
              <Stack>
                <Divider sx={{ width: "100%" }} />
                <InclusionTitle variant={isMobile ? "m-body-s" : "body-s"}>{packageInclusionsTitle}</InclusionTitle>
                <Box sx={{ minHeight: !isMobile && packageItemsHeight ? packageItemsHeight : "auto" }}>
                  <Box ref={packageItemElementRef}>
                    {packageInclusions?.map((val: any, index: number) => (
                      <ListItemBulletText key={index}>
                        <BulletContainer>
                          <StyledBulletIcon />
                        </BulletContainer>
                        <Typography mt={isMobile ? "0.2vw" : ""} variant={isMobile ? "m-body-s" : "body-s"}>
                          {val}
                        </Typography>
                      </ListItemBulletText>
                    ))}
                  </Box>
                </Box>
              </Stack>
            )}
            {isRichTextAvailable && (
              <>
                <Box>
                  <Divider />
                  <Box
                    sx={{
                      marginTop: isMobile ? "3.125vw" : "0.9vw",
                      minHeight: "8.021vw",
                    }}>
                    {content?.map((item: RichTextItems, index: number) => (
                      <>
                        <Box
                          sx={{
                            marginBottom: isMobile ? "1.875vw" : "0.625vw",
                          }}>
                          {Context?.renderComponent(item._type, {
                            ...item,
                          })}
                        </Box>
                      </>
                    ))}
                  </Box>
                </Box>
              </>
            )}
            {(primaryAction?.title || ctaLabel || secondaryAction?.title) && (
              <ActionBox
                sx={{
                  marginTop: isRichTextAvailable ? "1.09vw" : "1.75vw",
                  justifyContent: isMobile
                    ? ctaLabel && primaryAction
                      ? "space-between!important"
                      : "center!important"
                    : "space-between!important",
                }}>
                {(primaryAction?.title || secondaryAction?.title) && (
                  <PrimaryAndSecondaryActionBox>
                    {primaryAction?.title && (
                      <RenderActionItem
                        url={primaryAction?.url}
                        title={primaryAction?.title}
                        navigationType={primaryAction?.urlType}
                        variant={primaryAction?.variant}
                        isActionButtonType={true}
                        buttonStyles={{
                          letterSpacing: "0.1em",
                          fontSize: "0.94vw",
                        }}
                        onClick={() => {
                          if (onPrimaryClick) {
                            onPrimaryClick()
                          } else {
                            navigate(primaryAction?.url, primaryAction?.urlType)
                          }
                        }}
                      />
                    )}
                    {secondaryAction?.title && (
                      <>
                        <RenderActionItem
                          url={secondaryAction?.url}
                          title={secondaryAction?.title}
                          navigationType={secondaryAction?.urlType}
                          variant={secondaryAction?.variant}
                          isActionButtonType={true}
                          buttonStyles={{
                            letterSpacing: "0.1em",
                            fontSize: "0.94vw",
                          }}
                          image={secondaryAction?.image?.asset?._ref}
                          buttonImgStyles={{ width: "1.93vw" }}
                        />
                      </>
                    )}
                  </PrimaryAndSecondaryActionBox>
                )}
                {ctaLabel && (
                  <CtaLabelBox onClick={() => navigate(url, urlType)}>
                    <Typography variant={isMobile ? "m-text-link" : "link-m"}>{ctaLabel}</Typography>
                    {urlType !== CONSTANTS?.DIALOG && <StyledChevronRight />}
                  </CtaLabelBox>
                )}
              </ActionBox>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CardWithVerticleAlignedContent
