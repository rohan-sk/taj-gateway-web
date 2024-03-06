import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, CardMedia, Grid, Typography } from "@mui/material"
import prevImage from "../../public/white-left-arrow.png"
import nextImage from "../../public/white-right-arrow.png"
import { CustomNextArrow, CustomPrevArrow } from "../hoc/custom-arrows"
import { CommonCarouselStyles } from "../hoc/carousal-component-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext, useRef, useState } from "react"
import { CONSTANTS } from "../constants"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useMobileCheck } from "../../utils/isMobilView"
import { Stack, useTheme } from "@mui/system"
import { urlFor } from "../../lib-sanity"
import {
  ActionBox,
  ChipTextButtonBox,
  ChipTextTextWrapBox,
  ContentBox,
  CtaLabelBox,
  DescriptionCard,
  ImageCard,
  PrimaryAndSecondaryActionBox,
  SubTitleBox,
  TitleChipTextWrapBox,
} from "../card/styles/card-with-right-aligned-content"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { ChipTextItems, RichTextItems, parameterMapItems } from "../types"
import { HighLightsBox, StyledBulletIcon } from "../card/styles/card-with-desc"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PortableText } from "../../lib/portable-text-serializers"
import CustomReadMore from "../hoc/CustomReadMore"
import { StyledChevronRight } from "../card/styles/common-styles"
import { gridBreakPointsGenerator } from "../card/SearchResultCards/search-card.component"
import MultiRowTitle from "../hoc/title/multi-row-title"

const LoyaltyTabsChambersCardCarousal = ({ props, selectTabIndex }: any) => {
  const extractItemsData = props?.tabs?.[selectTabIndex]?.tabItems?.[0]?.items
  let selectedGroupTitleProps = props?.tabs?.[selectTabIndex]?.tabItems?.[0]
  const imgRef: any = useRef(null)
  const imgElements = imgRef.current?.getElementsByTagName("img")
  const arrowPosition = imgElements?.[0]?.clientHeight / 2
  const Context = useContext(IHCLContext)
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const [more, setMore] = useState<number>(props?.charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)

  const settings = {
    arrows: true,
    // infinite: props?.length > 2 ? true : false,
    centerMode: true,
    swipeToSlide: true,
    speed: 800,
    initialSlide: 0,
    slidesToScroll: 1,
    centerPadding: "12.5%",
    slidesToShow: 2,
    prevArrow: (
      <CustomPrevArrow
        cssData={{
          top: `${arrowPosition}px`,
          left: "10.9vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${prevImage?.src}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
    nextArrow: (
      <CustomNextArrow
        cssData={{
          top: `${arrowPosition}px`,
          right: "10.5vw",
          width: "3.125vw",
          height: "3.125vw",
          background: `url(${nextImage?.src}) no-repeat`,
          borderRadius: "50%",
          boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
        }}
      />
    ),
  }

  return (
    <>
      <MultiRowTitle {...selectedGroupTitleProps} />
      <Box width={"100%"}>
        <CommonCarouselStyles
          sx={{
            ".slick-slider": {
              overflow: "hidden",
            },
            ".slick-list": {
              margin: "0 -1.04vw",
            },
            ".slick-slide": {
              opacity: "0.4",
              padding: "0 1.04vw",
            },
            ".slick-active": {
              opacity: "1",
            },
            "& .slick-active .hide-box": {
              display: "flex !important",
            },
            ".slick-active + .slick-active ~ .slick-slide ": {
              opacity: "0.4",
              "& .hide-box": {
                display: "none!important",
              },
            },
            "& .hide-box": {
              display: "none!important",
            },

            ".slick-slide .title-box": {
              minHeight: "2.60vw",
              display: "flex",
              justifyContent: "flex-start",
            },
          }}>
          <Slider {...settings}>
            {extractItemsData?.map((itemsList: any, index: number) => (
              <Box key={index}>
                {itemsList?.largeImage?.asset?._ref && (
                  <Box position={"relative"}>
                    <ImageCard>
                      <CardMedia alt="media" component="img" src={urlFor(itemsList?.largeImage?.asset?._ref)?.url()} />
                    </ImageCard>
                    <ContentBox $isMobile={isMobile} $padding={itemsList?.highLights}>
                      {(itemsList?.title || itemsList?.chipText || itemsList?.specificationTags) && (
                        <TitleChipTextWrapBox>
                          {itemsList?.title && (
                            <Typography variant={"heading-xs"} sx={{ color: theme?.palette?.primary?.main }}>
                              {itemsList?.title}
                            </Typography>
                          )}
                          {itemsList?.chipText?.length > 0 && (
                            <ChipTextTextWrapBox>
                              {itemsList?.chipText?.map((item: ChipTextItems, index: number) => (
                                <ChipTextButtonBox key={index}>
                                  <Typography
                                    variant="body-s"
                                    sx={{
                                      color: theme?.palette?.ihclPalette?.hexTwo,
                                    }}>
                                    {item?.chipTextValue}
                                  </Typography>
                                </ChipTextButtonBox>
                              ))}
                            </ChipTextTextWrapBox>
                          )}
                          {itemsList?.specificationTags?.length > 0 && (
                            <ChipTextTextWrapBox>
                              {itemsList?.specificationTags?.map((item: any, index: number) => (
                                <ChipTextButtonBox key={index}>
                                  <Typography
                                    variant="body-s"
                                    sx={{
                                      color: theme?.palette?.ihclPalette?.hexTwo,
                                    }}>
                                    {item?.tag}
                                  </Typography>
                                </ChipTextButtonBox>
                              ))}
                            </ChipTextTextWrapBox>
                          )}
                        </TitleChipTextWrapBox>
                      )}
                      {itemsList?.subTitle && (
                        <SubTitleBox>
                          <Typography variant="body-ml">{itemsList?.subTitle}</Typography>
                        </SubTitleBox>
                      )}
                      {itemsList?.highLights && (
                        <SubTitleBox sx={{ marginTop: "0.83vw" }}>
                          <StyledBulletIcon />
                          <Typography variant="body-s">{itemsList?.highLights}</Typography>
                        </SubTitleBox>
                      )}
                      {itemsList?.highlights &&
                        itemsList?.highlights?.map((item: any, index: number) => (
                          <HighLightsBox className="hide-box highlights" key={index}>
                            <StyledBulletIcon />
                            <Typography variant={"body-s"}>{typeof item === typeof "" ? item : item?.term}</Typography>
                          </HighLightsBox>
                        ))}
                      {itemsList?.singleContent && (
                        <Box mt={DesktopPxToVw(10)}>
                          {itemsList?.singleContent?.map((content: string | {}, idx: number) => (
                            <PortableText blocks={content} key={idx} />
                          ))}
                        </Box>
                      )}
                      {itemsList?.description && (
                        <DescriptionCard
                          variant="body-s"
                          sx={{
                            overflow: "hidden",
                            display: "webkitBox",
                            WebkitLineClamp: 2,
                            lineClamp: 2,
                            webkitBoxOrient: "vertical",
                          }}
                          className="hide-box description">
                          {itemsList?.description.length > more ? (
                            <CustomReadMore length={more} variant={"body-s"}>
                              {itemsList?.description}
                            </CustomReadMore>
                          ) : (
                            itemsList?.description
                          )}
                        </DescriptionCard>
                      )}
                      {/* for keys and value labels */}
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
                                  marginBottom: index < itemsList?.parameterMap?.length / 2 ? "0.521vw" : "0",
                                }}>
                                {item?.keyType === "image" ? (
                                  <Typography variant={"body-s"}>
                                    {item?.imageAsset?.largeImage?.[0]?.asset?._ref && (
                                      <Box
                                        component="img"
                                        alt={`-image`}
                                        width={"17px"}
                                        height={"13px"}
                                        sx={{
                                          objectFit: "fill",
                                          display: "inline-block !important",
                                          marginRight: "10px",
                                        }}
                                        src={urlFor(item?.imageAsset?.largeImage?.[0]?.asset?._ref).url()}
                                      />
                                    )}
                                    <b
                                      style={{
                                        color: item?.value?.includes("@") ? "#AD8B3A" : "inherit",
                                      }}>
                                      {item?.value}
                                    </b>
                                  </Typography>
                                ) : (
                                  <Typography variant={"body-s"}>
                                    {item?.key} :<b> {item?.value}</b>
                                  </Typography>
                                )}
                              </Grid>
                            ))}
                        </Grid>
                      ) : (
                        <>
                          {itemsList?.parameterMap && (
                            <Stack
                              className="hide-box"
                              direction={"row"}
                              justifyContent={"space-evenly"}
                              sx={{
                                marginTop: itemsList?.parameterMap?.[0]?.key ? "0.521vw" : "0vw",
                              }}>
                              {itemsList?.parameterMap?.map((item: parameterMapItems, index: number) => (
                                <Box key={index} sx={{ width: "100%" }}>
                                  <Typography variant={"body-s"}>
                                    {item?.key} :<b> {item?.value}</b>
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          )}
                        </>
                      )}
                      {itemsList?.content?.length > 0 && (
                        <Box
                          sx={{
                            marginTop: "0.531vw",
                            display: "flex",
                            justifyContent: "space-evenly",
                            "&>div": {
                              width: "100%",
                            },
                            fontSize: "0.94vw",
                          }}>
                          {itemsList?.content?.map((item: RichTextItems, index: number) => (
                            <>
                              {Context?.renderComponent(item._type, {
                                ...item,
                              })}
                            </>
                          ))}
                        </Box>
                      )}
                      {(itemsList?.primaryAction?.title ||
                        itemsList?.ctaLabel ||
                        itemsList?.secondaryAction?.title) && (
                        <ActionBox
                          sx={{
                            marginTop: itemsList?.content?.length > 0 ? "1.09vw" : DesktopPxToVw(20),
                            justifyContent:
                              itemsList?.primaryAction?.title || itemsList?.secondaryAction?.title
                                ? "space-between"
                                : "flex-start",
                          }}
                          className="hide-box">
                          {(itemsList?.primaryAction?.title || itemsList?.secondaryAction?.title) && (
                            <PrimaryAndSecondaryActionBox>
                              {itemsList?.primaryAction?.title && (
                                <RenderActionItem
                                  url={itemsList?.primaryAction?.url}
                                  title={itemsList?.primaryAction?.title}
                                  navigationType={itemsList?.primaryAction?.urlType}
                                  variant={itemsList?.primaryAction?.variant}
                                  isActionButtonType={itemsList?.primaryAction?.variant === "link" ? false : true}
                                  buttonStyles={{
                                    letterSpacing: "0.1em",
                                    fontSize: "0.94vw",
                                  }}
                                />
                              )}
                              {itemsList?.secondaryAction?.title && (
                                <>
                                  <RenderActionItem
                                    url={itemsList?.secondaryAction?.url}
                                    title={itemsList?.secondaryAction?.title}
                                    navigationType={itemsList?.secondaryAction?.urlType}
                                    variant={itemsList?.secondaryAction?.variant}
                                    isActionButtonType={true}
                                    buttonStyles={{
                                      letterSpacing: "0.1em",
                                      fontSize: "0.94vw",
                                    }}
                                    image={itemsList?.secondaryAction?.image?.asset?._ref}
                                    buttonImgStyles={{ width: "1.93vw" }}
                                  />
                                </>
                              )}
                            </PrimaryAndSecondaryActionBox>
                          )}
                          {itemsList?.ctaLabel && (
                            <CtaLabelBox
                              onClick={() => {
                                navigate(itemsList?.url, itemsList?.urlType)
                              }}>
                              <Typography variant="link-m">{itemsList?.ctaLabel}</Typography>
                              {itemsList?.urlType !== CONSTANTS?.DIALOG && <StyledChevronRight />}
                            </CtaLabelBox>
                          )}
                        </ActionBox>
                      )}
                    </ContentBox>
                  </Box>
                )}
              </Box>
            ))}
          </Slider>
        </CommonCarouselStyles>
      </Box>
    </>
  )
}
export default LoyaltyTabsChambersCardCarousal
