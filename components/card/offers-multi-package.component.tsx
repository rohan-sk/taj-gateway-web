import { useContext, useState, useEffect } from "react"
import { hotelRoute, offersRoute } from "../../features/property/ui/constants"
import { useRouter } from "next/router"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { Box } from "@mui/material"
import { MULTI_PACKAGE_OFFERTYPE } from "../constants"
import { groq } from "next-sanity"
import { getClient } from "../../lib-sanity"
import { GLOBAL_STORES } from "../../utils/Constants"
import { OffersStore } from "../../store"
import { observer } from "mobx-react-lite"
import { useAppNavigation } from "../../utils/NavigationUtility"

const OffersMultiPackageComponent = ({
  data,
  componentData,
  cardBackgroundColor,
  headingElementForCard,
}: any) => {
  const ihclContext = useContext(IHCLContext)
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<any>(0)
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex(
    (route: any) => route === hotelRoute
  )
  const navigate = useAppNavigation()
  const offerStore = ihclContext?.getGlobalStore(
    GLOBAL_STORES?.offerStore
  ) as OffersStore
  const [LoopingData, setLoopingData] = useState(data?.hotels?.[0]?.inclusions)
  const selectedPackageOffer = async (identifier?: string | undefined) => {
    const query = groq`*[_type == "offerPackages" && identifier == "${identifier}"] { title,packageType,identifier,promoCode,rateCode,"participatingHotels":hotels[].participatingHotels[] | order(hotelName asc) | order(coalesce(score, -1) desc) ->{hotelName,score,hotelId,brandName,lengthOfStay,identifier}}[0]`
    let data
    await getClient(true)
      .fetch(query)
      .then((res) => {
        data = res
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  const removeDuplicates = (arr: any) => {
    return arr?.filter(
      (item: any, index: number) =>
        arr?.indexOf(item) === index && item !== null
    )
  }

  const themes = data?.hotels?.inclusions
    ? removeDuplicates(data?.hotels?.inclusions?.map(({ theme }: any) => theme))
    : removeDuplicates(
        data?.hotels?.[0]?.inclusions?.map(({ theme }: any) => theme)
      )

  useEffect(() => {
    if (
      data?.packageType !== MULTI_PACKAGE_OFFERTYPE &&
      data?.[0]?.packageType !== MULTI_PACKAGE_OFFERTYPE
    ) {
      const arr = data?.hotels?.inclusions
        ? data?.hotels?.inclusions?.filter((obj: any) => {
            return obj?.theme === themes?.[selectedType || 0]
          })
        : data?.hotels?.[0]?.inclusions?.filter((obj: any) => {
            return obj?.theme === themes?.[selectedType || 0]
          })
      setLoopingData(arr ? [...arr] : [])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType])

  let tabData = {
    items: themes?.map((item: any) => {
      return {
        _type: "card",
        handleProperty: setSelectedType,
        title: item,
        url: "",
        isdynamicPadding: true,
        aesthetic: componentData?.aesthetic,
        largeVariant: componentData?.cardLargeVariant,
        variant: componentData?.cardMobileVariant,
      }
    }),
    largeVariant: "ihcl.core.group.multi-static-with-tabs",
    variant: "ihcl.core.group.option-selector-popup-modal",
    title: "",
    isFromProperty: true,
    isComponentFullWidth: componentData?.isComponentFullWidth,
    isMobileComponentFullWidth: componentData?.isMobileComponentFullWidth,
    alignmentVariant: "center",
    initialSlide: 0,
  }
  const groupData = {
    items: LoopingData?.map((item: any, index: any) => {
      const onPrimaryClick = async () => {
        const primaryActionData =
          componentData?.cardActionType?.length > 0
            ? componentData?.cardActionType?.find(
                (action: any) => action?.actionType === "primaryAction"
              )?.primaryAction
            : {}
        const selectedData: any = await selectedPackageOffer(
          item?.inclusionIdentifier
        )
        await offerStore?.setSelectedOfferTitle({
          title: item?.basicInfo?.title,
          rateCode: selectedData?.rateCode,
          promoCode: selectedData?.promoCode,
          participatingHotels: selectedData?.participatingHotels,
          selectedOfferType: "singlePackage",
        })
        navigate(primaryActionData?.url, primaryActionData?.urlType)
      }
      return {
        ...item,
        showBulletForSubTitle: false,
        image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0],
        url:
          hotelRouteIndex > -1
            ? `/${hotelRoute}/${
                routerArr?.[hotelRouteIndex + 1]
              }/${offersRoute}/${item?.inclusionIdentifier}`
            : `/offers/${item?.inclusionIdentifier}`,
        primaryAction:
          componentData?.cardActionType?.length > 0
            ? componentData?.cardActionType?.find(
                (action: any) => action?.actionType === "primaryAction"
              )?.primaryAction
            : {},
        isComponentFullWidth: false,
        headingElementForCard: headingElementForCard,
        largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0],
        title: item?.basicInfo?.title,
        largeVariant:
          "details.card-vertical-aligned-content-with-aspect-ratio-2:4",
        showDividerForTitle: false,
        variant: "details.card-vertical-aligned-content-with-aspect-ratio-2:4",
        isMultiBlockContent: true,
        _type: "card",
        ctaLabel: "MORE",
        description: item?.basicInfo?.description,
        urlType: "internal",
        packageInclusionsTitle: item?.inclusionTitle,
        packageInclusions: item?.highlights,
        onPrimaryClick,
      }
    }),
    largeVariant: "details.group.group-with-2-column-cards-grid",
    variant: "details.group.group-with-2-column-cards-grid",
    isMultiBlockContent: true,
    title:
      data?.packageType !== MULTI_PACKAGE_OFFERTYPE &&
      data?.[0]?.packageType !== MULTI_PACKAGE_OFFERTYPE
        ? LoopingData?.[0]?.inclusionTheme?.sectionTitle
        : "",
    subTitle:
      data?.packageType !== MULTI_PACKAGE_OFFERTYPE &&
      data?.[0]?.packageType !== MULTI_PACKAGE_OFFERTYPE
        ? LoopingData?.[0]?.inclusionTheme?.description
        : "",
    isComponentFullWidth: false,
    showBulletForSubTitle: false,
    alignmentVariant: "regular",
    showDividerForTitle: false,
  }

  return (
    <>
      {data?.packageType !== MULTI_PACKAGE_OFFERTYPE &&
        data?.[0]?.packageType !== MULTI_PACKAGE_OFFERTYPE && (
          <Box sx={{ backgroundColor: cardBackgroundColor }}>
            {tabData?.items?.length > 0 &&
              ihclContext?.renderComponent("group", tabData)}
          </Box>
        )}
      <Box
        sx={{
          padding: data?.packageType !== MULTI_PACKAGE_OFFERTYPE ? "2vw 0" : "",
        }}>
        {groupData?.items?.length > 0 &&
          ihclContext?.renderComponent("group", groupData)}
      </Box>
    </>
  )
}

export default observer(OffersMultiPackageComponent)
