import { urlFor } from "../../lib-sanity"
import { CONSTANTS } from "../constants"
import dynamic from "next/dynamic"
import { RichTextItems, parameterMapItems } from "../types"
import { ActionProps, ImageProps } from "../types"
import React, { useContext, useEffect, useRef, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { Box, CardMedia, Typography } from "@mui/material"
import {
  ActionButtonsWrappingBox,
  ActionItemsBox,
  HorizontalDividerLine,
  HotelDataCardContentBox,
} from "./styles/card-with-right-aligned-hotel-data-content.styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { triggerEvent } from "../../utils/analytics"
import { GAStore, UserStore } from "../../store"
import { GLOBAL_STORES } from "../../utils/Constants"
import { MemberDataLayer } from "../../utils/analytics/member-data-layer"
import { getCookie } from "../../utils/cookie"
import {
  AFFILIATION,
  PAGE_LANG,
  TAJ_HOTELS,
} from "../../utils/analytics/constants"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
import { handleHotelBooking } from "../../utils/analytics/events/NonEcommerce/hotel-selected-event"

interface CardWithRightAlignedHotelDataContentProps {
  url: string
  content: any
  _key: string
  title: string
  _type: string
  urlType: any
  variant: string
  ctaLabel: string
  onCtaClick?: Function
  image: ImageProps
  mediaType: string
  description: string
  parentProps: number
  largeVariant: string
  largeImage: ImageProps
  charactersLimit?: number
  primaryAction: ActionProps
  isMultiBlockContent: Boolean
  parameterMap: parameterMapItems[]
  hotelAddress?: any
  brandName?: string
  hotelType?: string
  synxisHotelId?: any
  onPrimaryClick?: any
  headingElementForCard?: any
  setTitleHeight: Function
  maxheight: any
}
const CardWithRightAlignedHotelInformationContent = ({
  url,
  title,
  content,
  urlType,
  ctaLabel,
  largeImage,
  description,
  parameterMap,
  primaryAction,
  charactersLimit,
  onCtaClick,
  _type,
  hotelAddress,
  brandName,
  hotelType,
  synxisHotelId,
  onPrimaryClick,
  headingElementForCard,
  setTitleHeight,
  maxheight,
}: CardWithRightAlignedHotelDataContentProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const [more, setMore] = useState<number>(
    charactersLimit ?? CONSTANTS?.ITEM_DESCRIPTION_CHARACTER_LIMIT
  )
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()
  const ActionItemsAlignment =
    primaryAction?.title && ctaLabel ? "space-between" : "end"
  const gaStoreData = Context?.getGlobalStore(GLOBAL_STORES.gaStore) as GAStore
  const dataLayer = MemberDataLayer(UserStore, gaStoreData)

  const handleHotelDetailsViewed = (handleUrl: any, handleType: any) => {
    triggerEvent({
      action: "hotelDetailsViewed",
      params: {
        ...dataLayer,
        destinationSelected: title,
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
        brandName: brandName ? brandName : "",
        hotelName: title,
        hotelCode: synxisHotelId ? synxisHotelId : "",
        hotelType: hotelType ? hotelType : "",
        hotelCountry: hotelAddress?.country ? hotelAddress?.country : "",
        hotelCity: hotelAddress?.city ? hotelAddress?.city : "",
        hotelState: hotelAddress?.state ? hotelAddress?.state : "",
        hotelPinCode: hotelAddress?.pincode ? hotelAddress?.pincode : "",
        hotelbrand: brandName ? brandName : "",
        bunglowCode: "",
        error_message: "",
        error_type: "",
        item_name: title,
        item_type: _type,
        no_of_items: "",
        location: "",
        outbound: urlType == "internal" ? false : true,
        pageTitle: title,
        pageURL: `${global?.window?.location.origin}` + `${url}`,
        pageHierarchy: JSON.parse(
          `["${TAJ_HOTELS}",` +
            `"${PAGE_LANG}",` +
            `"${brandName}",` +
            `"${title}"]`
        ),
        widget_description: description,
      },
    })
  }

  const titleElementRef = useRef<HTMLElement | null>(null)
  const titleHeight = titleElementRef?.current?.getBoundingClientRect()?.height

  useEffect(() => {
    if (setTitleHeight && titleHeight && maxheight < titleHeight) {
      setTitleHeight(titleHeight)
    }
  }, [maxheight, setTitleHeight, titleHeight])

  return (
    <Box>
      {largeImage?.asset?._ref && (
        <CardMedia
          alt={largeImage?.altText || "media"}
          component="img"
          src={
            isMobile
              ? getOptimizeImageUrl(urlFor(largeImage?.asset?._ref)?.url(), 1)
              : getOptimizeImageUrl(urlFor(largeImage?.asset?._ref)?.url(), 2)
          }
        />
      )}
      <HotelDataCardContentBox $isMobile={isMobile}>
        {title && (
          <Box
            ref={titleElementRef}
            sx={{ height: maxheight ? maxheight : "auto" }}>
            <Typography
              variant={isMobile ? "m-heading-xs" : "heading-xs"}
              component={headingElementForCard || "h3"}>
              {title}
            </Typography>
          </Box>
        )}
        {parameterMap && (
          <Box
            sx={{
              mt: parameterMap?.[0]?.key
                ? isMobile
                  ? "1.25vw"
                  : "0.573vw"
                : "",
            }}>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <Box key={index}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {item?.key}
                  <b> {item?.value}</b>
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {description && (
          <Typography
            variant={isMobile ? "m-body-s" : "body-ml"}
            className="hide-box"
            mt={isMobile ? "1.563vw" : "0.729vw"}>
            {description.length > more ? (
              <CustomReadMore
                length={more}
                variant={isMobile ? "m-body-s" : "body-ml"}>
                {description}
              </CustomReadMore>
            ) : (
              description
            )}
          </Typography>
        )}
        {content?.length > 0 && (
          <>
            <HorizontalDividerLine $isMobile={isMobile} />
            <Box>
              {content?.map((item: RichTextItems, index: number) => (
                <>
                  {Context?.renderComponent(item._type, {
                    ...item,
                  })}
                </>
              ))}
            </Box>
          </>
        )}
        <ActionItemsBox
          sx={{
            justifyContent: ActionItemsAlignment,
          }}>
          {primaryAction?.title && (
            <RenderActionItem
              url={primaryAction?.url}
              isActionButtonType={true}
              title={primaryAction?.title}
              variant={primaryAction?.variant}
              navigationType={primaryAction?.urlType}
              buttonStyles={{
                letterSpacing: "0.1em",
                lineHeight: "140%",
              }}
              onClick={() => {
                if (onPrimaryClick) {
                  onPrimaryClick()
                } else {
                  handleHotelBooking(
                    "hotelSelected",
                    primaryAction,
                    dataLayer,
                    brandName,
                    hotelAddress,
                    title,
                    synxisHotelId,
                    hotelType,
                    _type,
                    description
                  )
                  navigate(primaryAction?.url, primaryAction?.urlType)
                  global?.window?.localStorage?.setItem("hotelJourneyPageType", "aboutUsPage")
                }
              }}
            />
          )}
          {ctaLabel && (
            <RenderActionItem
              url={url}
              onClick={() => {
                onCtaClick ? onCtaClick() : navigate(url, urlType),
                  handleHotelDetailsViewed(url, urlType)
              }}
              title={ctaLabel}
              variant={"link-m"}
              navigationType={urlType}
              isActionButtonType={false}
            />
          )}
        </ActionItemsBox>
      </HotelDataCardContentBox>
    </Box>
  )
}

export default CardWithRightAlignedHotelInformationContent
