import dynamic from "next/dynamic"
import { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { OffersStore } from "../../../store"
import { hotelRoute, offersRoute } from "./constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useRouter } from "next/router"
import { AestheticContainer } from "../../../components/group/styles/common-styled-components"
import ModalStore from "../../../store/global/modal.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
const DefaultGroupLayoutPlaceholder = ({
  title,
  subTitle,
  description,
  groupLargeVariant,
  cardLargeVariant,
  groupMobileVariant,
  cardMobileVariant,
  groupActionType,
  aesthetic,
  contentType,
  charactersLimit,
  filterAlignment,
  cardCharactersLimit,
  parameterMap,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  isMobileComponentFullWidth,
  isComponentFullWidth,
  alignmentVariant = "center",
  cardAlignmentVariant,
  tabsConfig,
  headingElementForCard,
  isHidden = false,
  cardAesthetic,
}: any) => {
  const isMobile = useMobileCheck()
  const router = useRouter()
  const navigate = useAppNavigation()
  const modalStore = ModalStore?.getInstance()
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const Context = useContext(IHCLContext)
  const offerStore = Context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const data = offerStore?.offersData
  const voucherName = offerStore?.vouchersData?.voucherName
  const voucherDescription = offerStore?.vouchersData?.description
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute
  const primaryActionData =
    groupActionType?.length > 0
      ? groupActionType?.find((action: any) => action?.actionType === "primaryAction")?.primaryAction
      : {}
  let titleData: any = {
    title:
      contentType === "holidayItineraries"
        ? title
        : {
            ...((isHotelSpecificOfferDetailsPage
              ? data?.displayGlobal
                ? data?.sectionTitle
                : data?.hotels?.sectionTitle
                  ? data?.hotels?.sectionTitle
                  : data?.sectionTitle || data?.offerBannerTitle
              : data?.sectionTitle || data?.offerBannerTitle) || voucherName),
            headingElement: title?.headingElement,
          },
    alignmentVariant,
    isFilterAvailable: true,
    subTitle:
      contentType === "holidayItineraries"
        ? subTitle
        : (isHotelSpecificOfferDetailsPage
            ? data?.displayGlobal
              ? data?.description
              : data?.hotels?.description
                ? data?.hotels?.description || data?.description
                : data?.description
            : data?.description) || voucherDescription,
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    isMarginBottomNotRequired: true,
    primaryAction: contentType === "holidayItineraries" ? primaryActionData : {},
    onGroupPrimaryClick:
      contentType === "holidayItineraries"
        ? () => {
            modalStore?.setPropertyData({
              holidayOffer: isMobile ? title?.mobileTile?.join(" ") : title?.desktopTitle?.join(" "),
            })
            navigate(primaryActionData?.url, primaryActionData?.urlType)
          }
        : undefined,
  }
  return (
    <>
      {isHidden ? (
        <></>
      ) : (
        <AestheticContainer
          $padding={isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop}
          $backgroundColor={aesthetic?.backgroundColor}>
          <MultiRowTitle {...titleData} />
        </AestheticContainer>
      )}
    </>
  )
}
export default DefaultGroupLayoutPlaceholder
