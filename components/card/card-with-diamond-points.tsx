import { useTheme } from "@mui/system"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { getCookie } from "../../utils/cookie"
import { GAStore, UserStore } from "../../store"
import { triggerEvent } from "../../utils/analytics"
import { GLOBAL_STORES } from "../../utils/Constants"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import ModalStore from "../../store/global/modal.store"
import { useMobileCheck } from "../../utils/isMobilView"
import { StyledBulletIcon } from "./styles/card-with-desc"
import { StyledChevronRight } from "./styles/common-styles"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { CardMedia, Typography, Box, Stack, Grid } from "@mui/material"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  ImageProps,
  ActionProps,
  RichTextItems,
  ChipTextItems,
  parameterMapItems,
  SpecificationTagsItems,
} from "../types"
import {
  ActionBox,
  ImageCard,
  ContentBox,
  CtaLabelBox,
  SubTitleBox,
  ContentTextBox,
  DescriptionCard,
  ChipTextButtonBox,
  ChipTextTextWrapBox,
  TitleChipTextWrapBox,
  PrimaryAndSecondaryActionBox,
} from "./styles/card-with-diamond-points.style"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type CardWithDiamondPointsProps = {
  content: any
  url: string
  urlType: any
  title: string
  variant: string
  subTitle: string
  ctaLabel: string
  image: ImageProps
  highLights: string
  galleryImages?: any
  description: string
  largeVariant: string
  largeImage: ImageProps
  roomModalDetails?: any
  isFromProperty?: boolean
  charactersLimit?: number
  richText: RichTextItems[]
  chipText: ChipTextItems[]
  primaryAction: ActionProps
  secondaryAction: ActionProps
  parameterMap: parameterMapItems[]
  specificationTags: SpecificationTagsItems[]
  _type?: any
  headingElementForCard?: any
  setPackagesHeight?: Function
  packageItemsHeight?: number
}

const CardWithDiamondPoints = ({
  url,
  title,
  image,
  content,
  urlType,
  variant,
  subTitle,
  ctaLabel,
  chipText,
  highLights,
  largeImage,
  description,
  parameterMap,
  largeVariant,
  galleryImages,
  primaryAction,
  charactersLimit,
  secondaryAction,
  roomModalDetails,
  specificationTags,
  isFromProperty = false,
  headingElementForCard,
  _type,
  setPackagesHeight,
  packageItemsHeight,
}: CardWithDiamondPointsProps) => {
  const modalStore = ModalStore.getInstance()
  const [more, setMore] = useState<number>(charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT)
  const Context = useContext(IHCLContext)
  const theme = useTheme()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const isRichTextAvailable = content?.length > 0
  const cardImage = isMobile ? image?.asset?._ref : largeImage?.asset?._ref
  const [generatedHotelID, setGeneratedHotelID] = useState<string | undefined>("")
  const IHCLContexts = useContext(IHCLContext)
  const userStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  const context = useContext(IHCLContext)
  const gaStoreData = context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(userStore, gaStoreData)
  const contentElementRef = useRef<HTMLElement | null>(null)
  const contentHeight = contentElementRef?.current?.getBoundingClientRect()?.height

  // set content items height
  useEffect(() => {
    if (setPackagesHeight && contentHeight) {
      setPackagesHeight(contentHeight)
    }
  }, [setPackagesHeight, contentHeight])

  const handleDestinationBooking = (handleUrl: any, handleType: any) => {
    navigate(handleUrl, handleType)
    triggerEvent({
      action: "destinationSelected",
      params: {
        ...dataLayer,
        destinationSelected: title,
        buttonLinkName: primaryAction?.title,
        link_url: url,
        link_text: primaryAction?.title,
        pageTitle: title,
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        widget_type: _type,
        widget_title: title,
      },
    })
  }
  const handleHotelDetailsViewed = (handleUrl: any, handleType: any) => {
    triggerEvent({
      action: "hotelDetailsViewed",
      params: {
        ...dataLayer,
        buttonLinkName: ctaLabel,
        link_url: url,
        link_text: ctaLabel,
        eventType: "",
        eventName: "",
        eventPlace: "",
        eventTicketsQty: "",
        eventDate: "",
        offerName: "",
        offerCode: "",
        offerID: "",
        offerCategory: "",
        offerValidity: "",
        datesToBook: "",
        arrivalDate: "",
        departureDate: "",
        noOfAdults: "",
        noOfChild: "",
        noOfRooms: "",
        specialCode: "",
        clientId: getCookie("_ga")?.slice(6),
        visitSource: "",
        brandName: "",
        hotelName: title,
        hotelCode: "",
        hotelType: "",
        hotelBrand: "",
        hotelCountry: "",
        hotelState: "",
        hotelPinCode: "",
        bunglowCode: "",
        error_message: "",
        error_type: "",
        widget_type: _type,
        widget_position: "",
        item_name: "",
        item_type: "",
        no_of_items: "",
        pageTitle: title,
        pageURL: `${global?.window?.location.origin}` + `${url}`,
      },
    })
  }
  useEffect(() => {
    if (global?.window !== undefined) {
      let urlParams = new URLSearchParams(global?.window?.location?.search)
      setGeneratedHotelID(urlParams?.get("hotelId") || undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box aria-label={isMobile ? variant : largeVariant}>
      {cardImage && (
        <Box position={"relative"}>
          <ImageCard>
            <CardMedia alt="media" component="img" src={urlFor(cardImage)?.url()} />
          </ImageCard>
          <ContentBox $isMobile={isMobile} $padding={highLights}>
            {(title || chipText || specificationTags) && (
              <TitleChipTextWrapBox>
                {title && (
                  <Typography
                    variant="heading-xs"
                    component={headingElementForCard || "h3"}
                    sx={{ color: theme?.palette?.primary?.main }}>
                    {title}
                  </Typography>
                )}
                {chipText?.length > 0 && (
                  <ChipTextTextWrapBox>
                    {chipText?.map((item: ChipTextItems, index: number) => (
                      <ChipTextButtonBox key={index}>
                        <Typography variant="body-s" sx={{ color: theme?.palette?.neuPalette?.hexTwo }}>
                          {item?.chipTextValue}
                        </Typography>
                      </ChipTextButtonBox>
                    ))}
                  </ChipTextTextWrapBox>
                )}
                {specificationTags?.length > 0 && (
                  <ChipTextTextWrapBox>
                    {specificationTags?.map((item: any, index: number) => (
                      <ChipTextButtonBox key={index}>
                        <Typography variant="body-s" sx={{ color: theme?.palette?.neuPalette?.hexTwo }}>
                          {item?.tag}
                        </Typography>
                      </ChipTextButtonBox>
                    ))}
                  </ChipTextTextWrapBox>
                )}
              </TitleChipTextWrapBox>
            )}
            {subTitle && (
              <SubTitleBox>
                <Typography variant="body-s">{subTitle}</Typography>
              </SubTitleBox>
            )}
            {highLights && (
              <SubTitleBox sx={{ marginTop: "0.83vw" }}>
                <StyledBulletIcon />
                <Typography variant="body-s">{highLights}</Typography>
              </SubTitleBox>
            )}
            {description && (
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
                {description.length > more ? (
                  <CustomReadMore length={more} variant={"body-s"}>
                    {description}
                  </CustomReadMore>
                ) : (
                  description
                )}
              </DescriptionCard>
            )}
            {/* for keys and value labels */}
            {isFromProperty ? (
              <Grid container>
                {parameterMap &&
                  parameterMap?.map((item: any, index: number) => (
                    <Grid
                      item
                      lg={6}
                      xl={6}
                      key={index}
                      sx={{
                        marginBottom: index < parameterMap?.length / 2 ? "10px" : "0",
                      }}>
                      {item?.keyType === "image" ? (
                        <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                          <Box
                            component={"img"}
                            alt={(isMobile ? image?.altText : largeImage?.altText) || `-image`}
                            width={"17px"}
                            height={"13px"}
                            sx={{
                              objectFit: "fill",
                              display: "inline-block",
                              marginRight: "10px",
                            }}
                            src={urlFor(
                              isMobile
                                ? item?.imageAsset?.image?.[0]?.asset?._ref
                                : item?.imageAsset?.largeImage?.[0]?.asset?._ref,
                            ).url()}
                          />
                          <b>{item?.value}</b>
                        </Typography>
                      ) : (
                        <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                          {item?.key} :<b> {item?.value}</b>
                        </Typography>
                      )}
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <>
                {parameterMap && (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    sx={{
                      marginTop: parameterMap?.[0]?.key ? "0.521vw" : "0vw",
                    }}>
                    {parameterMap?.map((item: parameterMapItems, index: number) => (
                      <Box key={index}>
                        <Typography variant={isMobile ? "m-body-l" : "body-s"}>
                          {item?.key} :<b> {item?.value}</b>
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </>
            )}
            {isRichTextAvailable && (
              <ContentTextBox
                sx={{
                  height: packageItemsHeight ? packageItemsHeight : "auto",
                }}
                ref={contentElementRef}
                mt={isMobile ? "1.563vw" : "0.521vw"}>
                {content?.map((item: RichTextItems, index: number) => (
                  <>
                    {Context?.renderComponent(item._type, {
                      ...item,
                    })}
                  </>
                ))}
              </ContentTextBox>
            )}
            {(primaryAction?.title || ctaLabel || secondaryAction?.title) && (
              <ActionBox
                sx={{
                  marginTop: isRichTextAvailable ? DesktopPxToVw(24) : DesktopPxToVw(20),
                  justifyContent: primaryAction?.title || secondaryAction?.title ? "space-between" : "flex-start",
                }}
                className="hide-box">
                {(primaryAction?.title || secondaryAction?.title) && (
                  <PrimaryAndSecondaryActionBox>
                    {primaryAction?.title && (
                      <RenderActionItem
                        url={primaryAction?.url}
                        title={primaryAction?.title}
                        navigationType={primaryAction?.urlType}
                        variant={primaryAction?.variant}
                        isActionButtonType={primaryAction?.variant === "link" ? false : true}
                        buttonStyles={{
                          letterSpacing: "0.1em",
                          fontSize: "0.94vw",
                        }}
                        onClick={() =>
                          handleDestinationBooking(
                            generatedHotelID ? `${primaryAction?.url}?hotelId=${generatedHotelID}` : primaryAction?.url,
                            primaryAction?.urlType,
                          )
                        }
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
                          onClick={() => {
                            if (isFromProperty) {
                              modalStore?.setPropertyData(galleryImages)
                            }
                            navigate(secondaryAction?.url, secondaryAction?.urlType)
                          }}
                          image={secondaryAction?.image?.asset?._ref}
                          buttonImgStyles={{ width: "1.93vw" }}
                        />
                      </>
                    )}
                  </PrimaryAndSecondaryActionBox>
                )}
                {ctaLabel && (
                  <CtaLabelBox
                    onClick={() => {
                      if (roomModalDetails) {
                        modalStore?.setPropertyData(roomModalDetails)
                      }
                      navigate(url, urlType)
                      handleHotelDetailsViewed(url, urlType)
                    }}>
                    <Typography variant="link-m">{ctaLabel}</Typography>
                    {urlType !== CONSTANTS?.DIALOG && <StyledChevronRight />}
                  </CtaLabelBox>
                )}
              </ActionBox>
            )}
          </ContentBox>
        </Box>
      )}
    </Box>
  )
}

export default CardWithDiamondPoints
