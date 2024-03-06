import Slider from "react-slick"
import { Box, Grid, Typography } from "@mui/material"
import { theme } from "../../lib/theme"
import "slick-carousel/slick/slick.css"
import { ChipTextItems, RichTextItems, SpecificationTagsItems, aestheticItems, parameterMapItems } from "../types"
import React, { useContext, useState } from "react"
import "slick-carousel/slick/slick-theme.css"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { CarouselProgressiveBarStyles } from "../hoc/custom-carousal-dots-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { MobileCarousalStylesWrapper } from "../carousal/styles/common-styles"
import { urlFor } from "../../lib-sanity"
import {
  ActionBoxWrapper,
  BothActionButtonsWrapperBox,
  ChipTextTextBox,
  ChipTextTextMainBox,
  ContentBox,
  FullWidthBox,
  HighlightTextBox,
  MarginTopBox,
  RichTextBox,
  RichTextValueTypo,
} from "../card/styles/card-with-right-aligned-content-for-mSite"
import { StyledBulletIcon } from "../card/styles/card-with-desc"
import { CONSTANTS } from "../constants"
import CustomReadMore from "../hoc/CustomReadMore"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"
import { useMobileCheck } from "../../utils/isMobilView"
import RenderActionItem from "../hoc/actions/action-items-ui"
import MultiRowTitle from "../hoc/title/multi-row-title"

const LoyaltyTabsChambersCardCarousalMsite = ({ props, selectTabIndex, aesthetic }: any) => {
  const extractItemsData = props?.tabs?.[selectTabIndex]?.tabItems?.[0]?.items
  let selectedGroupTitleProps = props?.tabs?.[selectTabIndex]?.tabItems?.[0]
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const { cardBackgroundColor } = useAesthetics(aesthetic?._ref)
  const [more, setMore] = useState<number>(props?.charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const backgroundColor =
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexEleven?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexTwentySix?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexThree?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexSeventeen?.toLowerCase() ||
    cardBackgroundColor === theme?.palette?.ihclPalette?.hexFour
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: false,
    centerMode: true,
    speed: 1000,
    initialSlide: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    centerPadding: "10%",
  }
  return (
    <>
      <MultiRowTitle {...selectedGroupTitleProps} />
      <Box sx={{ width: "100%" }} aria-label={"multi-card-carousel"}>
        <MobileCarousalStylesWrapper
          $backGroundColor={cardBackgroundColor?.toLowerCase()}
          $inactiveDotWidth={`${MobilePxToVw(400 / extractItemsData?.length - 1)}`}>
          <CarouselProgressiveBarStyles
            sx={{
              ".slick-slide": {
                padding: "0 2.3vw",
              },
              ".slick-active": {
                "& .MuiButton-root": {
                  display: "inherit",
                },
              },
              ".slick-active .hide-box": {
                display: "flex ",
              },
              "@media (max-width: 640px)": {
                ".slick-slide .content": {
                  display: "none",
                },
                ".slick-active .content": {
                  display: "flex",
                },
                "& .slick-dots .slick-active": {
                  "& button": {
                    width: MobilePxToVw(80),
                    height: MobilePxToVw(2),
                    background: cardBackgroundColor
                      ? theme?.palette?.ihclPalette?.hexOne
                      : theme?.palette?.ihclPalette?.hexSeventeen,
                  },
                },
                "& .slick-slide .content-box": {
                  marginBottom: "3.75vw",
                },
              },
            }}
            $backGroundColor={backgroundColor}>
            <Slider {...settings}>
              {extractItemsData?.map((itemsList: any, index: number) => (
                <>
                  <Box aria-label="card-with-right-aligned-content-" position={"relative"}>
                    {itemsList?.image?.asset?._ref && (
                      <Box
                        width={"100%"}
                        height={"100%"}
                        component="img"
                        alt="card-Image"
                        sx={{ objectFit: "contain" }}
                        src={urlFor(itemsList?.image?.asset?._ref).url()}
                      />
                    )}
                    <ContentBox className="content-box" sx={{ marginTop: MobilePxToVw(-22) }}>
                      {itemsList?.chipText?.length > 0 && (
                        <ChipTextTextMainBox>
                          {itemsList?.chipText?.map((item: ChipTextItems, index: number) => (
                            <ChipTextTextBox key={index}>
                              <Typography
                                variant="m-body-s"
                                sx={{
                                  color: theme?.palette?.ihclPalette?.hexTwo,
                                }}>
                                {item?.chipTextValue}
                              </Typography>
                            </ChipTextTextBox>
                          ))}
                        </ChipTextTextMainBox>
                      )}
                      {itemsList?.specificationTags?.length > 0 && (
                        <ChipTextTextMainBox>
                          {itemsList?.specificationTags?.map((item: SpecificationTagsItems, index: number) => (
                            <ChipTextTextBox key={index}>
                              <Typography
                                variant="m-body-s"
                                sx={{
                                  color: theme?.palette?.ihclPalette?.hexTwo,
                                }}>
                                {item?.tag}
                              </Typography>
                            </ChipTextTextBox>
                          ))}
                        </ChipTextTextMainBox>
                      )}
                      {itemsList?.title && (
                        <Typography variant="m-heading-xs" sx={{ color: theme?.palette?.text?.primary }}>
                          {itemsList?.title}
                        </Typography>
                      )}
                      {itemsList?.subTitle && (
                        <MarginTopBox>
                          <Typography variant="m-body-s">{itemsList?.subTitle}</Typography>
                        </MarginTopBox>
                      )}
                      {itemsList?.highLights && (
                        <Box sx={{ marginTop: MobilePxToVw(15) }}>
                          <StyledBulletIcon />
                          <Typography variant="m-body-s">{itemsList?.highLights}</Typography>
                        </Box>
                      )}
                      {itemsList?.highlights &&
                        itemsList?.highlights?.map((item: any, index: number) => (
                          <HighlightTextBox key={index}>
                            <StyledBulletIcon />
                            <Typography variant="m-body-s" sx={{ color: theme?.palette?.text?.primary }}>
                              {typeof item === typeof "" ? item : item?.term}
                            </Typography>
                          </HighlightTextBox>
                        ))}
                      {itemsList?.description && (
                        <MarginTopBox>
                          {itemsList?.description.length > more ? (
                            <CustomReadMore length={more} variant={"m-body-sl"}>
                              {itemsList?.description}
                            </CustomReadMore>
                          ) : (
                            itemsList?.description
                          )}
                        </MarginTopBox>
                      )}
                      {itemsList?.isFromProperty ? (
                        <Grid
                          container
                          sx={{
                            marginTop: itemsList?.parameterMap?.[0]?.key ? "0.521vw" : "0vw",
                          }}
                          className="hide-box">
                          {itemsList?.parameterMap &&
                            itemsList?.parameterMap?.map((item: any, index: number) => (
                              <Grid
                                item
                                {...gridBreakPointsGenerator(isMobile, 6, 12)}
                                key={index}
                                sx={{
                                  marginTop: index == 0 ? MobilePxToVw(14) : "0px",
                                  marginBottom: index == 1 ? MobilePxToVw(20) : "0px",
                                }}>
                                {item?.keyType === "image" ? (
                                  <Typography
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    variant={"m-body-sl"}>
                                    {item?.imageAsset?.image?.[0]?.asset?._ref && (
                                      <Box
                                        component="img"
                                        alt={`-image`}
                                        width={"17px"}
                                        height={"13px"}
                                        sx={{
                                          objectFit: "fill",
                                          display: "inline-block",
                                          marginRight: "10px",
                                        }}
                                        src={urlFor(item?.imageAsset?.image?.[0]?.asset?._ref).url()}
                                      />
                                    )}
                                    <b>{item?.value}</b>
                                  </Typography>
                                ) : (
                                  <Typography variant={"m-body-sl"}>
                                    {item?.key} :<b> {item?.value}</b>
                                  </Typography>
                                )}
                              </Grid>
                            ))}
                        </Grid>
                      ) : (
                        <>
                          {itemsList?.parameterMap?.length > 0 && (
                            <>
                              {itemsList?.parameterMap?.map((item: parameterMapItems, index: number) => (
                                <FullWidthBox
                                  key={index}
                                  sx={{
                                    marginTop: index == 0 ? MobilePxToVw(14) : "0px",
                                    marginBottom: index == 1 ? MobilePxToVw(20) : "0px",
                                  }}>
                                  <Typography variant={"m-body-sl"}>
                                    {item?.key} :<b> {item?.value}</b>
                                  </Typography>
                                </FullWidthBox>
                              ))}
                            </>
                          )}
                        </>
                      )}
                      {itemsList?.isContentAvailable && (
                        <Box mt={"1.875vw"}>
                          {itemsList?.content?.map((item: RichTextItems, index: number) => (
                            <Typography
                              key={index}
                              variant="m-body-s"
                              sx={{
                                "& span": {
                                  fontSize: "2.813vw",
                                },
                                "& img": {
                                  "@media (max-width: 640px)": {
                                    width: MobilePxToVw(17),
                                  },
                                },
                                "&>div": {
                                  marginTop: "2.425vw",
                                },
                              }}>
                              {itemsList?.Context?.renderComponent(item._type, {
                                ...item,
                              })}
                            </Typography>
                          ))}
                        </Box>
                      )}
                      {itemsList?.richText?.length > 0 && (
                        <MarginTopBox>
                          {itemsList?.richText?.map((item: RichTextItems, index: number) => (
                            <RichTextBox key={index} sx={{ marginTop: "0.78vw" }}>
                              <Typography variant="m-body-l">{item?.richTextKey}</Typography>
                              <RichTextValueTypo variant="m-body-l">{item?.richTextValue}</RichTextValueTypo>
                            </RichTextBox>
                          ))}
                        </MarginTopBox>
                      )}
                      {(itemsList?.ctaLabel ||
                        itemsList?.primaryAction?.title ||
                        itemsList?.secondaryAction?.title) && (
                        <ActionBoxWrapper
                          sx={{
                            flexDirection: itemsList?.secondaryAction?.title
                              ? itemsList?.urlType === itemsList?.PathType?.internal
                                ? "row"
                                : "column"
                              : "row",
                            alignItems: itemsList?.urlType === itemsList?.PathType?.internal ? "center" : "left",
                            justifyContent:
                              isMobile &&
                              itemsList?.primaryAction?.title &&
                              !itemsList?.secondaryAction?.title &&
                              !itemsList?.ctaLabel
                                ? "end"
                                : "space-between",
                          }}>
                          {itemsList?.ctaLabel && (
                            <Box
                              sx={{
                                margin: itemsList?.secondaryAction?.title
                                  ? itemsList?.urlType === itemsList?.PathType?.internal
                                    ? "0vw 0vw 0vw"
                                    : "0vw 0vw 4.6875vw 0vw"
                                  : "0vw",
                              }}>
                              <RenderActionItem
                                url={itemsList?.url}
                                title={itemsList?.ctaLabel}
                                variant={"m-text-link"}
                                buttonStyles={{ letterSpacing: "0.1em" }}
                                navigationType={itemsList?.urlType}
                                isActionButtonType={false}
                              />
                            </Box>
                          )}
                          {(itemsList?.primaryAction?.title || itemsList?.secondaryAction?.title) && (
                            <BothActionButtonsWrapperBox>
                              {itemsList?.secondaryAction?.title && (
                                <RenderActionItem
                                  isActionButtonType={true}
                                  url={itemsList?.secondaryAction?.url}
                                  title={itemsList?.secondaryAction?.title}
                                  variant={itemsList?.secondaryAction?.variant}
                                  navigationType={itemsList?.secondaryAction?.urlType}
                                  buttonStyles={{ letterSpacing: "0.1em" }}
                                  image={itemsList?.secondaryAction?.image?.asset?._ref}
                                />
                              )}
                              {itemsList?.primaryAction?.title && (
                                <RenderActionItem
                                  isActionButtonType={
                                    itemsList?.primaryAction?.variant === CONSTANTS?.VARIANT_LINK_TYPE ? false : true
                                  }
                                  url={itemsList?.primaryAction?.url}
                                  title={itemsList?.primaryAction?.title}
                                  variant={itemsList?.primaryAction?.variant}
                                  navigationType={itemsList?.primaryAction?.urlType}
                                  buttonStyles={{
                                    letterSpacing: "0.1em",
                                    whiteSpace: itemsList?.primaryAction?.title?.length < 11 ? "nowrap" : "unset",
                                  }}
                                />
                              )}
                            </BothActionButtonsWrapperBox>
                          )}
                        </ActionBoxWrapper>
                      )}
                    </ContentBox>
                  </Box>
                </>
              ))}
            </Slider>
          </CarouselProgressiveBarStyles>
        </MobileCarousalStylesWrapper>
      </Box>
    </>
  )
}

export default LoyaltyTabsChambersCardCarousalMsite
