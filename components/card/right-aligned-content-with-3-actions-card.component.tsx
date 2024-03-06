import { urlFor } from "../../lib-sanity"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { singleContentInterface } from "../types"
import React, { useContext, useState, useRef, useEffect } from "react"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { RichTextValueTypography } from "./styles/card-with-desc"
import { Box, CardMedia, Typography, Card, useTheme } from "@mui/material"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { ImageProps, ActionProps, RichTextItems, parameterMapItems } from "../types"
import {
  ContentBox,
  RichTextBox,
  InnerActionBox,
  DescriptionTypo,
  BrochureSaveAlt,
  ParentActionBox,
  ContentBoxActionWrapper,
} from "./styles/right-aligned-content-with-3-actions"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const BasicModal = dynamic(() => import("../hoc/modal/modal"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithRightAlignedContentAndThreeActionsProps = {
  urlType: string
  url: string
  title: string
  _type: string
  ctaLabel: string
  subTitle: string
  image: ImageProps
  description: string
  largeImage: ImageProps
  charactersLimit: number
  alignmentVariant: string
  richText: RichTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
  isMultiBlockContent: boolean
  parameterMap: parameterMapItems[]
  singleContent: singleContentInterface[]
  content: any
  titleRef?: any
  maxheight?: any
  setTitleHeight?: Function
}

const CardWithRightAlignedContentAndThreeActions = ({
  url,
  title,
  image,
  urlType,
  ctaLabel,
  subTitle,
  richText,
  largeImage,
  description,
  parameterMap,
  primaryAction,
  singleContent,
  secondaryAction,
  content,
  titleRef,
  maxheight,
  charactersLimit,
  setTitleHeight,
}: CardWithRightAlignedContentAndThreeActionsProps) => {
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  const mobileImage = image?.asset?._ref
  const webImage = largeImage?.asset?._ref

  const [more, setMore] = useState(400)
  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState("")
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  // const handleModal = (url: string) => {
  //   setDialogType(url)
  //   setOpen(true)
  // }

  const handleModalClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      {((isMobile && mobileImage) || (!isMobile && webImage)) && (
        <Box>
          {open && (
            <BasicModal
              width={"100%"}
              height={"100%"}
              open={open}
              toggle={false}
              handleClose={handleModalClose}
              Component={<></>}
            />
          )}
          <Card sx={{ "&.MuiCard-root": { borderRadius: "0" } }}>
            <CardMedia
              alt={(isMobile ? image?.altText : largeImage?.altText) || "media"}
              component="img"
              src={getOptimizeImageUrl(urlFor(isMobile ? mobileImage : webImage).url(), 2)}
            />
          </Card>
          <ContentBox className="title-box">
            {title && (
              <Typography
                ref={titleElementRef}
                variant="heading-xs"
                sx={{
                  maxWidth: "90%",
                  height: maxheight ? maxheight : "auto",
                  color: theme?.palette?.text?.primary,
                  fontSize: isMobile ? "3.75vw" : "1.25vw",
                  lineHeight: isMobile ? "5.25vw" : "1.70vw",
                }}>
                {title}
              </Typography>
            )}
            {subTitle && (
              <Typography mt={"0.16vw"} variant="body-s">
                {subTitle}
              </Typography>
            )}
            {description && (
              <DescriptionTypo variant="body-s" className="hide-box">
                {description.length > charactersLimit ? (
                  <>
                    <CustomReadMore length={charactersLimit} variant={isMobile ? "m-body-l" : "body-ml"}>
                      {description}
                    </CustomReadMore>
                  </>
                ) : (
                  description
                )}
              </DescriptionTypo>
            )}
            {parameterMap?.length > 0 && (
              <RichTextBox className="hide-box">
                {parameterMap?.map((item: parameterMapItems, index: number) => (
                  <Box key={index} sx={{ flexBasis: "50%" }}>
                    <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                      {item?.key}:<b> {item?.value}</b>
                    </Typography>
                  </Box>
                ))}
              </RichTextBox>
            )}
            {richText?.length > 0 && (
              <RichTextBox className="hide-box">
                {richText?.map((item: RichTextItems, index: number) => (
                  <Box key={index}>
                    <Typography variant="body-s">{item?.richTextKey}</Typography>
                    <RichTextValueTypography variant="body-s">{item?.richTextValue}</RichTextValueTypography>
                  </Box>
                ))}
              </RichTextBox>
            )}
            {singleContent && (
              <Typography
                variant="body-s"
                sx={{
                  margin: "0.15vw 0vw 0.93vw 0vw",
                  "& span": {
                    fontSize: DesktopPxToVw(18),
                  },
                }}>
                <PortableText blocks={singleContent} />
              </Typography>
            )}
            {content?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  "& div": {
                    flexBasis: "50%",
                  },
                  "& span": {
                    fontSize: DesktopPxToVw(18),
                  },
                }}>
                {content?.map((item: RichTextItems, index: number) => (
                  <>
                    {Context?.renderComponent(item._type, {
                      ...item,
                    })}
                  </>
                ))}
              </Box>
            )}
            {(primaryAction?.title || secondaryAction?.title || ctaLabel) && (
              <ContentBoxActionWrapper>
                <ParentActionBox className="hide-box">
                  <InnerActionBox
                    sx={{
                      gap: "1.042vw",
                    }}>
                    {primaryAction?.title && primaryAction?.urlType === "dialog" ? (
                      <RenderActionItem
                        url={primaryAction?.url}
                        title={primaryAction?.title}
                        navigationType={primaryAction?.urlType}
                        variant={primaryAction?.variant}
                        isActionButtonType={true}
                        buttonStyles={{
                          minWidth: "12.42vw",
                          height: "3.17vw",
                          letterSpacing: "0.1em",
                        }}
                      />
                    ) : (
                      <>
                        {primaryAction?.title && (
                          <RenderActionItem
                            url={primaryAction?.url}
                            title={primaryAction?.title}
                            navigationType={primaryAction?.urlType}
                            variant={primaryAction?.variant}
                            isActionButtonType={true}
                            buttonStyles={{
                              minWidth: "10.36vw",
                              height: "3.17vw",
                              letterSpacing: "0.1em",
                            }}
                          />
                        )}
                      </>
                    )}
                    {secondaryAction?.title && (
                      <RenderActionItem
                        isActionButtonType={true}
                        url={secondaryAction?.url}
                        title={secondaryAction?.title}
                        variant={secondaryAction?.variant}
                        navigationType={secondaryAction?.urlType}
                        // buttonImgStyles={{ width: "8.711vw", height: "3.17vw" }}
                        buttonStyles={{
                          minWidth: "8.8vw",
                          letterSpacing: "0.1em",
                          gap: "0.521vw",
                        }}
                        image={secondaryAction?.image?.asset?._ref}
                      />
                    )}
                  </InnerActionBox>
                </ParentActionBox>
                {ctaLabel && (
                  <InnerActionBox className="hide-box" sx={{ gap: "0.47vw", cursor: "pointer" }}>
                    {ctaLabel === CONSTANTS?.BROCHURE && <BrochureSaveAlt />}
                    <RenderActionItem
                      isActionButtonType={false}
                      url={url}
                      title={ctaLabel}
                      variant={"link-m"}
                      navigationType={urlType}
                    />
                  </InnerActionBox>
                )}
              </ContentBoxActionWrapper>
            )}
          </ContentBox>
        </Box>
      )}
    </Box>
  )
}

export default CardWithRightAlignedContentAndThreeActions
