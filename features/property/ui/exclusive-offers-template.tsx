import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { PathType } from "../../../types"
import { OffersStore } from "../../../store"
import { Grid, Typography, Box } from "@mui/material"
import { CONSTANTS } from "../../../components/constants"
import { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../utils/isMobilView"
import { fetchExclusiveOffersData } from "../../../lib/utils"
import { formatDateWithMON } from "../../../utils/getDate"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { useAppNavigation } from "../../../utils/NavigationUtility"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { LOGIN_NAVIGATION } from "../../../components/forms/gift-card-form/constants"
import {
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
  LoadMoreActionBox,
} from "../../../components/group/styles/common-styled-components"
import { StyledGridItem } from "../../../components/group/styles/2-column-grid"

const ExclusiveOffers = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  groupMobileVariant,
  cardMobileVariant,
  title,
  heading,
  alignmentVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  tabsConfig,
}: any) => {
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)

  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel

  const offerStore = context?.getGlobalStore(GLOBAL_STORES?.offerStore) as OffersStore

  const [selectedType, setSelectedType] = useState<any>()
  const [countToShowCards, setCountToShowCards] = useState<number>(4)
  const [componentItemData, setComponentItemsData] = useState<any>([])
  const [offerTypesTypes, setOfferTypesTypes] = useState<any>(
    contentType === "memberOffers"
      ? isMobile
        ? ["STAY", "ALL", "SPA", "DINING"]
        : ["ALL", "STAY", "SPA", "DINING"]
      : isMobile
      ? ["STAY", "ALL", "SPA", "DINING", "MEAL"]
      : ["ALL", "STAY", "SPA", "DINING", "MEAL"],
  )

  let groupData = {
    items: offerTypesTypes?.map((item: any) => {
      return {
        _type: "card",
        handleProperty: setSelectedType,
        title: item,
        url: item === "ALL" ? global?.window?.location?.href : "",
        largeVariant: cardLargeVariant,
        variant: cardMobileVariant,
      }
    }),
    isFromProperty: true,
    largeVariant: groupLargeVariant,
    variant: groupMobileVariant,
    aesthetic: {
      padding: {
        desktop: "0vw",
        mobile: "0vw",
      },
      backgroundColor: { hex: tabsConfig?.backgroundColor },
    },
  }

  const cardItems: any = componentItemData?.map((item: any) => {
    return {
      ...item,
      _type: "card",
      title: item?.title,
      description: item?.description,
      ctaLabel: ctaActionData?.title,
      urlType: ctaActionData?.urlType,
      url: `${ctaActionData?.url}/${item?.identifier}`,
      largeVariant: groupLargeVariant,
      // largeVariant: "details.card.card-with-right-aligned-content",
      variant: "details.card.card-with-right-aligned-content",
      primaryAction:
        cardActionType?.length > 0
          ? contentType === "memberOffers"
            ? {
                ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction,
                title: item?.memberSpecific
                  ? !isLoggedIn
                    ? CONSTANTS?.LOGIN_JOIN
                    : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                        ?.title
                  : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.title,
              }
            : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
          : {},
      secondaryAction:
        cardActionType?.length > 0
          ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
          : {},
      largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
      image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
      charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
      contentType: contentType,
      sectionTitle: title,
    }
  })

  const getAllMemberOffers = async (selectedType?: string | undefined) => {
    let data: any = []
    data = await fetchExclusiveOffersData(
      contentType === "memberOffers" ? true : false,
      selectedType === "ALL" ? "" : selectedType,
    )
    setComponentItemsData(data)
  }

  useEffect(() => {
    getAllMemberOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    isMobile ? getAllMemberOffers(selectedType) : getAllMemberOffers(offerTypesTypes[selectedType])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType])
  return (
    <Box
      sx={{
        padding: isMobile
          ? aesthetic?.padding?.mobile
          : aesthetic?.padding?.desktop
          ? aesthetic?.padding?.desktop
          : "0vw 12.5vw",
        background: aesthetic?.backgroundColor?.hex || "",
      }}>
      <MultiRowTitle
        title={{
          ...title,
          headingElement: title?.headingElement,
        }}
        subTitle={heading}
        aesthetic={aesthetic}
        charactersLimit={charactersLimit}
        alignmentVariant={alignmentVariant}
        isComponentFullWidth={isComponentFullWidth}
        isMobileComponentFullWidth={isMobileComponentFullWidth}
      />
      {offerTypesTypes?.length > 0 && tabsConfig?.enableTabs && context?.renderComponent("group", groupData)}

      <Box>
        <Grid container rowSpacing={isMobile ? MobilePxToVw(90) : "3.125vw"} columnSpacing={"2.1vw"}>
          {cardItems?.length > 0 ? (
            cardItems?.slice(0, countToShowCards)?.map((item: any, index: number) => {
              const onPrimaryClick = async () => {
                await offerStore?.setSelectedOfferTitle({
                  title: item.title,
                  rateCode: item?.rateCode,
                  promoCode: item?.promoCode,
                  participatingHotels: item?.participatingHotels || [],
                  selectedOfferType: item?.packageType,
                  packages: item?.packages,
                  memberOfferType: item?.memberSpecific ? item?.memberType : null,
                  lengthOfStay: item?.lengthOfStay,
                })
                if (!isLoggedIn && item?.memberSpecific) {
                  navigate(LOGIN_NAVIGATION, PathType?.dialog)
                } else {
                  navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
                }
              }
              return (
                <Grid key={index} item xs={12} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6}>
                  {context?.renderComponent(
                    "card",
                    {
                      onPrimaryClick: onPrimaryClick,
                      largeImage: item?.largeImage,
                      primaryAction: item?.primaryAction,
                      // highLights:
                      //   "Open spaces reserved for you for an ethereal and safe experience.",
                      // highlights: item?.inclusions?.map(
                      //   (item: any) => item?.basicInfo?.description
                      // ),
                      hidePrimaryCTA: item?.hideBookNowWidget,
                      _type: "card",
                      urlType: item?.urlType,
                      description: item?.description,
                      ctaLabel: item?.ctaLabel,
                      url: item?.url,
                      variant: "details.card.card-with-right-aligned-content",
                      title: item.title,
                      largeVariant: "details.card.card-with-right-aligned-content",
                      image: item?.image,
                      // specificationTags: item?.hotels?.inclusions
                      //   ?.slice(0, 2)
                      //   ?.map((tag: any, index: any) => {
                      //     return {
                      //       tag: tag?.basicInfo?.title,
                      //     }
                      //   }),
                      parameterMap: [
                        {
                          key: "Validity",
                          keyType: "string",
                          value: item?.validThroughYear
                            ? "Round the Year"
                            : item?.validityDates?.[0]?.toDate
                            ? `${
                                item?.validityDates?.[0]?.fromDate
                                  ? formatDateWithMON(item?.validityDates?.[0]?.fromDate)
                                  : "Till "
                              } ${item?.validityDates?.[0]?.fromDate ? " - " : ""} ${formatDateWithMON(
                                item?.validityDates?.[0]?.toDate,
                              )}`
                            : "No Restrictions",
                        },
                      ],

                      charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
                      contentType: contentType,
                      sectionTitle: title,
                    },
                    index,
                  )}
                </Grid>
              )
            })
          ) : (
            <Typography variant="body-l">No hotels found For your Search</Typography>
          )}
        </Grid>
        {countToShowCards > cardItems?.length - 1 ||
        countToShowCards > (isMobile ? CONSTANTS?.TEN : CONSTANTS?.EIGHTEEN) ? null : (
          <StyledGridItem item lg={12} xl={12} md={12} sm={12} xs={12}>
            {isMobile ? (
              <StyledExpandMoreButton
                variant="light-outlined"
                endIcon={
                  <StyledExpandMoreIcon
                    sx={{
                      height: "3.875vw",
                    }}
                  />
                }
                onClick={() => {
                  setCountToShowCards(countToShowCards + CONSTANTS?.ONE)
                }}>
                {CONSTANTS?.LOAD_MORE}
              </StyledExpandMoreButton>
            ) : (
              <LoadMoreActionBox>
                <Typography
                  variant="link-m"
                  onClick={() => {
                    setCountToShowCards(countToShowCards + CONSTANTS?.SIX)
                  }}>
                  {CONSTANTS?.LOAD_MORE}
                </Typography>
                <StyledExpandMoreIcon />
              </LoadMoreActionBox>
            )}
          </StyledGridItem>
        )}
      </Box>
    </Box>
  )
}

export default observer(ExclusiveOffers)
