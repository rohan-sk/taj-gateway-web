import { Grid, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useState, useEffect, useMemo } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { CONSTANTS } from "../../../../components/constants"
import { StyledGridItem } from "../../../../components/group/styles/2-column-grid"
import {
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
  LoadMoreActionBox,
  SearchFilterContainer,
} from "../../../../components/group/styles/common-styled-components"
import { CustomSearch } from "../../../../components/hoc/Search/CustomSearch"
import { theme } from "../../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../../../utils/isMobilView"
import {
  fetchHotelByTypes,
  fetchHotelListingData,
  fetchHotelListingTabsData,
  fetchHotelSearchListingData,
  fetchHotelTabIcons,
  fetchHotelTypes,
  fetchInitialHotelListingData,
} from "../../../../utils/fetchRoomData"
import { observer } from "mobx-react-lite"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { getListWithBrandSorting } from "../../../../utils/getListWithBrandSorting"
import { useDebounce } from "../../../../utils/useDebounce"
import LoadingSpinner from "../../../../utils/SpinnerComponent"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { urlFor } from "../../../../lib-sanity"

const GroupWithTwoColumnGrid = ({
  cardLargeVariant,
  groupLargeVariant,
  aesthetic,
  contentType,
  charactersLimit,
  cardCharactersLimit,
  filterAlignment,
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
  headingElementForCard,
  errorText,
}: any) => {
  const { cardBackgroundColor, cardPadding } = useAesthetics(aesthetic?._ref)
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  let ctaActionData = cardActionType?.find((action: any) => action?.actionType === "ctaLabel")?.ctaLabel
  const navigate = useAppNavigation()
  const [componentItemData, setComponentItemsData] = useState<any>()
  const [countToShowCards, setCountToShowCards] = useState<number>(4)
  const [icons, setIcons] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [hotelTypes, setHotelTypes] = useState<any>()
  const [selectedHotelType, setSelectedHotelType] = useState<any>()
  const [totalHotelsCount, setTotalHotelsCount] = useState()
  const [pagingStart, setPagingStart] = useState(0)
  const [pagingEnd, setPagingEnd] = useState(10)
  const debouncedsearchQuery = useDebounce(searchQuery, 500)
  const [hotelsCount, setHotelsCount] = useState(0)

  const errorTextwithSelectedHotelType = () => {
    if (hotelTypes?.[selectedHotelType] === undefined) {
      return errorText
    } else if (hotelTypes?.[selectedHotelType] === "All") {
      return errorText
    } else {
      return `There are no results in ${hotelTypes?.[selectedHotelType]?.toLowerCase()} for your destination.`
    }
  }

  //to get all hotels/filters/pagination
  const getAllHotelListing = async (
    pagingStart: number,
    pagingEnd: number,
    selectedType: string,
    searchQuery: string,
  ) => {
    let data: any = []

    try {
      data = await fetchHotelListingTabsData(
        pagingStart,
        pagingEnd,
        selectedType?.toLowerCase() === "all" ? "" : selectedType,
        searchQuery,
      )
      setHotelsCount(data?.totalCount)
      setComponentItemsData(data)
      const finalValue = pagingStart === 0 ? [] : componentItemData ?? []
      setComponentItemsData([...finalValue, ...data?.hoteldata])
    } catch (error) {
      console?.error(error)
    }
  }

  //for initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchInitialHotelListingData()
      setComponentItemsData(data)
    }
    fetchInitialData()
  }, [])

  //for pagination
  useEffect(() => {
    getAllHotelListing(pagingStart, pagingEnd, hotelTypes?.[selectedHotelType], searchQuery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagingStart, pagingEnd])

  //for search tearm
  useEffect(() => {
    const fetchSearchInitialData = async () => {
      const data = await fetchHotelSearchListingData(
        hotelTypes?.[selectedHotelType]?.toLowerCase() === "all" ? "" : hotelTypes?.[selectedHotelType],
        debouncedsearchQuery,
      )
      setHotelsCount(data?.totalCount)
      setComponentItemsData([])
      setComponentItemsData(data?.hotelData)
    }
    fetchSearchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedsearchQuery])

  const loadMore = () => {
    // Update the pagination variables for the next page
    setPagingStart(componentItemData?.length) // Start from the next item
    setPagingEnd(componentItemData?.length + 5) // Fetch 6 more items
  }

  // to get all hotel types
  const getAllHotelType = async () => {
    const allHotels = await fetchHotelTypes()
    const hotelIcons = await fetchHotelTabIcons()

    let hotelType: any = []

    allHotels?.length > 0 &&
      allHotels?.map((hotel: any) => {
        hotel?.searchTaxonomies?.hotelType !== undefined &&
          hotel?.searchTaxonomies?.hotelType !== null &&
          hotelType?.push(hotel?.searchTaxonomies?.hotelType)
      })
    hotelType = hotelType?.filter((value: string, index: number, array: any) => array?.indexOf(value) === index)
    hotelType?.unshift("All")
    setHotelTypes(hotelType)
    if (Array?.isArray(hotelIcons)) {
      setIcons(() => hotelIcons)
    }
  }

  useMemo(() => {
    // to get all hotel types
    getAllHotelType()
  }, [])

  const getAllHotelByType = async (selectedHotelType: string) => {
    if (selectedHotelType !== "All") {
      const data = await fetchHotelByTypes(selectedHotelType)
      setComponentItemsData(data)
    } else {
      const data = await fetchHotelListingTabsData(
        0,
        10,
        selectedHotelType?.toLowerCase() === "all" ? "" : selectedHotelType,
        "",
      )
      setComponentItemsData(data?.hoteldata)
      setHotelsCount(data?.totalCount)
    }
  }

  useMemo(() => {
    // to get all hotel types

    setPagingStart(0)
    setPagingEnd(10)
    setSearchQuery("")
    getAllHotelByType(hotelTypes?.[selectedHotelType])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotelType])

  const handleItemsIndex = (itemIndex: number) => {
    setSelectedHotelType(itemIndex)
  }

  let groupData = {
    items: hotelTypes?.map((item: any) => {
      let iconAsset =
        icons?.find((iconItem: any) => iconItem?.altText?.toLowerCase() === item?.toLowerCase())?.images || {}
      return {
        _type: "card",
        handleProperty: handleItemsIndex,
        title: item,
        url: ctaActionData?.url,
        tabIcon: {
          highlightedIcon:
            iconAsset && iconAsset?.highlightedIcon?.asset?._ref
              ? urlFor(iconAsset?.highlightedIcon?.asset?._ref)?.url()
              : "",
          icon: iconAsset && iconAsset?.icon?.asset?._ref ? urlFor(iconAsset?.icon?.asset?._ref)?.url() : "",
        },
        largeVariant: "ihcl.core.card-center-aligned-title-tabs",
        variant: "ihcl.core.card-center-aligned-title-tabs",
      }
    }),
    largeVariant: "ihcl.core.group.carousel-with-tabs",
    variant: "ihcl.core.group.option-selector-popup-modal",
    aesthetic: {
      _ref: "95405102-bdcf-47dd-971e-57516dc10810",
      _type: "reference",
    },
    subTitle: heading,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: title,
    alignmentVariant: alignmentVariant,
  }
  const cardItems = componentItemData?.map((item: any) => {
    const onPrimaryClick = async () => {
      const primaryActionData =
        cardActionType?.length > 0
          ? {
              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction,
              url: `${
                cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url
              }?hotelId=${item?.hotelId}`,
            }
          : {}

      navigate(primaryActionData?.url, primaryActionData?.urlType)
    }
    return {
      ...item,
      _type: "card",
      title: item?.hotelName,
      description: item?.hotelDescription,
      ctaLabel: ctaActionData?.title,
      urlType: ctaActionData?.urlType,
      url: `/hotels/${item?.identifier}`,
      largeVariant: cardLargeVariant,
      variant: cardLargeVariant,
      onPrimaryClick: onPrimaryClick,
      primaryAction:
        cardActionType?.length > 0
          ? {
              ...cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction,
              url: `${
                cardActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction?.url
              }?hotelId=${item?.hotelId}`,
            }
          : {},
      secondaryAction:
        cardActionType?.length > 0
          ? cardActionType?.find((action: any) => action?.actionType === "secondaryAction")?.secondaryAction
          : {},
      largeImage: item?.hotelOverview?.basicInfo?.media?.imageAsset?.largeImage?.[0],
      image: item?.hotelOverview?.basicInfo?.media?.imageAsset?.image?.[0],
    }
  })

  return (
    <Box>
      {hotelTypes?.length > 0 && (
        <Box
          sx={{
            padding: isMobile ? aesthetic?.padding?.mobile || "" : aesthetic?.padding?.desktop || "",
            background: aesthetic?.backgroundColor?.hex,
          }}>
          {context?.renderComponent("group", groupData)}
        </Box>
      )}
      <Box sx={{ padding: "4.7vw 12.5vw" }}>
        <SearchFilterContainer $filterAlignment={filterAlignment?.toLocaleLowerCase()}>
          <CustomSearch
            fontSizeProp={isMobile ? "3.75vw" : "1.25vw"}
            value={searchQuery}
            setValue={setSearchQuery}
            placeholder={"Destination"}
            styles={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 300,
              color: theme?.palette?.ihclPalette?.hexSeventeen,
            }}
            maxWidth={isMobile ? "100%" : ""}
          />
        </SearchFilterContainer>
        <Grid container rowSpacing={isMobile ? MobilePxToVw(90) : "3.125vw"} columnSpacing={"2.1vw"}>
          {cardItems?.length > 0 ? (
            getListWithBrandSorting(cardItems)
              ?.slice(0, pagingEnd)
              ?.map((item: any, index: number) => (
                <Grid key={index} item xs={12} sm={isMobile ? 12 : 6} md={6} lg={6} xl={6}>
                  {context?.renderComponent(item?._type, item, index)}
                </Grid>
              ))
          ) : (
            <>
              <Typography
                variant={isMobile ? "m-heading-xs" : "body-l"}
                mt={isMobile ? MobilePxToVw(90) : DesktopPxToVw(60)}>
                {errorTextwithSelectedHotelType()}
              </Typography>
            </>
          )}
        </Grid>
        {hotelsCount > pagingEnd && componentItemData?.length ? (
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
                  loadMore()
                }}>
                {CONSTANTS?.LOAD_MORE}
              </StyledExpandMoreButton>
            ) : (
              <LoadMoreActionBox>
                <Typography
                  variant="link-m"
                  onClick={() => {
                    loadMore()
                  }}>
                  {CONSTANTS?.LOAD_MORE}
                </Typography>
                <StyledExpandMoreIcon />
              </LoadMoreActionBox>
            )}
          </StyledGridItem>
        ) : (
          ""
        )}
      </Box>
    </Box>
  )
}
export default observer(GroupWithTwoColumnGrid)
