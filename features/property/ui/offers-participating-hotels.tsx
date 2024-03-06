import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import dynamic from "next/dynamic"
import OffersStore from "../../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import { Box } from "@mui/material"
import {
  ParameterMapWrappingBox,
  SearchFilterContainer,
} from "../../../components/group/styles/common-styled-components"
import { useMobileCheck } from "../../../utils/isMobilView"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { useRouter } from "next/router"
import { hotelRoute, offersRoute } from "./constants"
import { ROUTES } from "../../../utils/routes"
import getNonTajBrandCrossURL from "../../../utils/getCrossBrandURL"
import { formatDateEnGB, formatDateWithHyphen, getDayAfterTomorrowDate, getTomorrowDate } from "../../../utils/getDate"
import dayjs from "dayjs"
import { CrossSiteNavigation } from "../../../utils/sso/cross-site-navigation"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { UserStore } from "../../../store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { CONSTANTS, externalNavigation } from "../../../components/constants"
import {
  AutocompleteOptionTypography,
  AutocompletePaper,
  SearchAutocomplete,
} from "../../../components/card/styles/card-with-experience-form"
import { FormSelectArrowIcon } from "../../../components/forms/common/form-components"
import { AutoCompleteInput } from "../../../components/card/styles/book-a-stay-default-card.styles"
import { DropDownContainer } from "./styles/epicure-participating-hotels-chart.styles"
import { PathType } from "../../../types"

const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
const CustomSearch = dynamic(() =>
  import("../../../components/hoc/Search/CustomSearch").then((module) => module.CustomSearch),
)

const OffersParticipatingHotelsTemplate = (props: any) => {
  const {
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
    filterAlignment = "start",
    alignmentVariant,
    cardAlignmentVariant,
    isComponentFullWidth = false,
    isMobileComponentFullWidth = false,
    headingElementForCard,
  } = props
  const data = { ...props, isFilterAvailable: true }
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const isLogin = useLoggedIn()
  const navigate = useAppNavigation()
  const offerStore = ihclContext?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [dropDownValue, setDropDownValue] = useState<string>("")
  const router = useRouter()
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)

  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const [title, setTitle] = useState<any>()
  const [heading, setHeading] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const [searchFilters, setSearchFilters] = useState<any>()
  const [responseItems, setResponseItems] = useState<any>([])
  const [componentItemData, setComponentItemsData] = useState<any>([])
  const [LoopingHotelsData, setLoopingHotelsData] = useState<any>([])
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore

  useEffect(() => {
    const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute

    const participatingHotelsData: any = []
    offerStore?.offersData?.hotels?.map((val: any) => {
      val?.participatingHotels?.map((hotel: any) => {
        participatingHotelsData.push({ ...hotel })
      })
    })

    const hotelsData = isHotelSpecificOfferDetailsPage
      ? offerStore?.offersData?.hotels?.participatingHotels
      : participatingHotelsData
    setComponentItemsData(hotelsData)
    setResponseItems(hotelsData)
    setLoopingHotelsData(hotelsData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  let groupData = {
    items: componentItemData?.map((item: any, index: any) => {
      const onPrimaryClick = async () => {
        const handleRedirection = async () => {
          const URL = await getNonTajBrandCrossURL(
            item?.brandName || "",
            item?.identifier || "",
            formatDateWithHyphen(formatDateEnGB(dayjs(getDayAfterTomorrowDate()))),
            formatDateWithHyphen(formatDateEnGB(dayjs(getTomorrowDate()))),
            [
              {
                id: 1,
                adults: 1,
                child: 0,
                room: "ROOM",
                isSelected: false,
              },
            ],
            "",
            offerStore?.offersData?.promoCode,
            offerStore?.offersData?.rateCode,
          )
          if (offerStore?.offersData?.memberSpecific && !isLogin) {
            localStorage?.setItem("gotoAfterLogin", `${URL}`)
            localStorage?.setItem("gotoAfterLoginType", PathType?.external)
            navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.SSO?.LOGIN, PathType?.dialog)
          } else {
            await CrossSiteNavigation({
              url: URL,
              loggedIn: isLogin,
              userStore,
            })
          }
        }

        if (item?.brandName?.toLocaleLowerCase() !== "taj" && item?.brandName) {
          handleRedirection()
        } else {
          let primaryActionUrl = `${ROUTES?.WITHOUTSEO_FOR_ROUTING?.BOOKING?.CART}?`
          if (item?.hotelId) {
            primaryActionUrl = `${primaryActionUrl}` + `hotelId=${item?.hotelId}`
          }
          if (offerStore?.offersData?.title) {
            primaryActionUrl = `${primaryActionUrl}` + `&offerName=${offerStore?.offersData?.title}`
          }
          if (offerStore?.offersData?.rateCode) {
            primaryActionUrl =
              `${primaryActionUrl}` + `&isFromOLP=true&offerRateCode=${offerStore?.offersData?.rateCode}`
          }
          if (offerStore?.offersData?.promoCode) {
            primaryActionUrl =
              `${primaryActionUrl}` + `&isFromOLP=true&offerPromoCode=${offerStore?.offersData?.promoCode}`
          }
          if (offerStore?.offersData?.memberType) {
            primaryActionUrl = `${primaryActionUrl}` + `&memberOfferType=${offerStore?.offersData?.memberType}`
          }
          if (offerStore?.offersData?.memberSpecific && !isLogin) {
            localStorage?.setItem("gotoAfterLogin", `${primaryActionUrl}`)
            navigate(ROUTES?.WITHOUTSEO_FOR_ROUTING?.SSO?.LOGIN, PathType?.dialog)
          } else {
            navigate(
              primaryActionUrl,
              cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.urlType,
            )
          }
        }
      }
      const ctaLabelAction = () => {
        const brand = item?.brandName?.toUpperCase()
        const navUrl = externalNavigation[brand]
        if (item?.brandName?.toLowerCase() !== "taj") {
          CrossSiteNavigation({
            url: `${navUrl}/${item?.identifier}/${offersRoute}/${offerStore?.offersData?.identifier}?`,
            loggedIn: isLogin,
            userStore,
          })
        } else {
          navigate(`/${hotelRoute}/${item?.identifier}/${offersRoute}/${offerStore?.offersData?.identifier}`)
        }
      }

      return {
        ...item,
        title: item?.hotelName,
        description: item?.hotelDescription,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        alignmentVariant: cardAlignmentVariant,
        charactersLimit: isMobile ? mobileCardCharactersLimit : cardCharactersLimit,
        url: `/${hotelRoute}/${item?.identifier}/${offersRoute}/${offerStore?.offersData?.identifier}`,
        hidePrimaryCTA: offerStore?.offersData?.hideBookNowWidget,
        largeVariant: "ihcl.core.card.card-with-focused-title",
        variant: "ihcl.core.card.card-with-focused-title",
        _type: "card",
        largeImage: item?.hotelOverview?.basicInfo?.media?.imageAsset?.largeImage?.[0],
        image: item?.hotelOverview?.basicInfo?.media?.imageAsset?.image?.[0],
        specificationTags: item?.tags?.map((tag: any, index: any) => {
          return {
            tag: tag,
          }
        }),
        primaryAction:
          cardActionType?.length > 0
            ? {
                ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction,
                title:
                  offerStore?.offersData?.memberSpecific && !isLogin
                    ? CONSTANTS?.LOGIN_JOIN
                    : cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
                        ?.title,
              }
            : {},

        onPrimaryClick,
        secondaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
            : {},
        headingElementForCard: headingElementForCard,
        parameterMap: item?.basicInfo?.specifications,
        isFromProperty: true,
        highLights: item?.highlights?.[0],
        ctaLabelAction,
      }
    }),
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: "ihcl.core.group.group-with-3-column-cards-grid",
    variant: "ihcl.core.group.group-with-3-column-cards-grid",
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    alignmentVariant: alignmentVariant,
    heading: heading,
    subTitle: componentData?.description,
    aesthetic: {
      ...aesthetic,
      padding: { desktop: "0vw", mobile: "0vw" },
    },
  }

  useEffect(() => {
    let TypesFilters: any = []
    offerStore?.offersDataHotelTypeFilters?.hotelTypes?.map((filters: any) => {
      if (!TypesFilters?.includes(filters?.searchTaxonomies?.hotelType)) {
        filters?.searchTaxonomies?.hotelType !== undefined && TypesFilters?.push(filters?.searchTaxonomies?.hotelType)
      }
    })
    setSearchFilters(TypesFilters)
  }, [offerStore?.offersDataHotelTypeFilters?.hotelTypes])

  useEffect(() => {
    const filteredData = LoopingHotelsData?.filter((item: any) => item?.searchTaxonomies?.hotelType === dropDownValue)
    const searchData = LoopingHotelsData?.filter((item: any) =>
      item?.hotelName?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
    )
    const filteredList = LoopingHotelsData?.filter(
      (item: any) =>
        item?.hotelName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
        item?.searchTaxonomies?.hotelType === dropDownValue,
    )
    if (dropDownValue && searchTerm) {
      setComponentItemsData(filteredList)
    } else if (searchTerm && searchTerm !== "") {
      setComponentItemsData(searchData)
    } else if (dropDownValue && dropDownValue !== "") {
      setComponentItemsData(filteredData)
    } else {
      setComponentItemsData(LoopingHotelsData)
    }
  }, [LoopingHotelsData, dropDownValue, searchTerm])

  return (
    <>
      {responseItems?.length > 0 && offerStore?.offersData?.offerType !== "4d_offer" && (
        <Box padding={isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop}>
          <Box>
            <MultiRowTitle {...data} />
          </Box>
          <SearchFilterContainer $filterAlignment={filterAlignment?.toLowerCase()}>
            <ParameterMapWrappingBox
              sx={{
                paddingBottom: "0vw",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? MobilePxToVw(35) : "",
              }}>
              <CustomSearch
                maxWidth={isMobile ? "100%" : ""}
                fontSizeProp={isMobile ? MobilePxToVw(24) : DesktopPxToVw(24)}
                value={searchTerm}
                setValue={setSearchTerm}
                backgroundColor={theme?.palette?.ihclPalette?.hexOne}
                placeholder={"Destination or Hotel"}
                onChange={(event: any) => {
                  setSearchTerm(event.target.value)
                }}
                styles={{
                  fontWeight: 300,
                  fontStyle: "normal",
                  fontFamily: "supreme",
                  color: theme?.palette?.ihclPalette?.hexSeventeen,
                }}
              />
              <DropDownContainer>
                <SearchAutocomplete
                  sx={{ mt: isMobile ? "0vw" : "0.4vw" }}
                  popupIcon={<FormSelectArrowIcon />}
                  onChange={(e: any, newValue: any, reason: any) => {
                    setDropDownValue(newValue || "")
                  }}
                  value={dropDownValue || null}
                  onOpen={() => {
                    if (global?.window !== undefined) {
                      document.body.style.overflow = "hidden"
                    }
                  }}
                  onClose={() => {
                    if (global?.window !== undefined) {
                      document.body.style.overflow = "auto"
                    }
                  }}
                  noOptionsText={"No results found for your search"}
                  options={searchFilters || []}
                  PaperComponent={({ children }: any) => <AutocompletePaper>{children}</AutocompletePaper>}
                  renderOption={(props: any) => {
                    return (
                      <AutocompleteOptionTypography {...props} variant={isMobile ? "m-body-m" : "body-m"}>
                        {props.key}
                      </AutocompleteOptionTypography>
                    )
                  }}
                  renderInput={(params: any) => (
                    <AutoCompleteInput {...params} variant="standard" placeholder="Select Hotel Type" />
                  )}
                />
              </DropDownContainer>
            </ParameterMapWrappingBox>
          </SearchFilterContainer>
          {ihclContext?.renderComponent("group", groupData)}
        </Box>
      )}
    </>
  )
}

export default observer(OffersParticipatingHotelsTemplate)
