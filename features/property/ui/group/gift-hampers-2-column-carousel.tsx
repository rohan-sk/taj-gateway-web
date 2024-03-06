import { Box } from "@mui/system"
import { useContext, useState, useEffect, useMemo } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { observer } from "mobx-react-lite"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import { HamperStore } from "../../../../store"
import ModalStore from "../../../../store/global/modal.store"

const GiftHampersTwoColumnCarousel = ({
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
  cardAlignmentVariant,
  alignmentVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
  headingElementForCard
}: any) => {
  const Context = useContext(IHCLContext);
  const hamperStore = Context?.getGlobalStore(
    GLOBAL_STORES.hamperStore
  ) as HamperStore
  const modalStore = ModalStore?.getInstance()

  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel;
  const navigate = useAppNavigation();
  const [componentData, setComponentData] = useState<any>();
  const [componentItemData, setComponentItemsData] = useState<any>();
  const {setSelectedHamperInfo} = hamperStore

  useEffect(() => {
    setComponentData(hamperStore?.hamperData?.[0]?.hamperTab);
    setComponentItemsData(hamperStore?.hamperData?.[0]?.hamperSet);
  }, [hamperStore?.hamperData]);

  let groupData = {
    items: componentItemData?.map((item: any, index: any) => {
      const onPrimaryClick = async () => {
        const primaryActionData =
          cardActionType?.length > 0
            ? cardActionType?.find(
                (action: any) => action?.actionType === "primaryAction"
              )?.primaryAction
            : {}
        const data = {
          hamperSet: hamperStore?.hamperData?.[0]?.hamperSet?.map(
            ({ title }: any) => {
              return title
            }
          ),
          participatingHotels:
            hamperStore?.hamperData?.[0]?.participatingHotels,
        }
        await setSelectedHamperInfo(data)
        await modalStore?.setPropertyData({
          hotelName: item?.hotelName || "",
          hotelId: item?.identifier || "",
          destination: item?.city || "",
          email: item?.email || "",
          phone: item?.phone || "",
          signatureHamper: item?.title || "",
        })
        navigate(primaryActionData?.url, primaryActionData?.urlType)
      }
      return {
        ...item,
        title: item?.title,
        ctaLabel: ctaActionData?.title,
        urlType: ctaActionData?.urlType,
        url: ctaActionData?.url,
        largeVariant: cardLargeVariant,
        _type: "card",
        headingElementForCard: headingElementForCard,
        largeImage: item?.thumbnail?.[0]?.imageAsset?.largeImage?.[0],
        image: item?.thumbnail?.[0]?.imageAsset?.image?.[0],
        onPrimaryClick,
        content: [
          {
            identifier: "logo-with-highlighted-text",
            _type: "blockSection",
            content: item.content,
          },
        ],
        isMultiBlockContent: true,
        description: item?.price?.value ? item?.price?.text : "",
        parameterMap: item?.price?.value ? [{key: "price", value: `${item?.price?.value}`}] : [],
        primaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find(
                (action: any) => action?.actionType === "primaryAction"
              )?.primaryAction
            : {},
        secondaryAction:
          cardActionType?.length > 0
            ? cardActionType?.find(
                (action: any) => action?.actionType === "secondaryAction"
              )?.secondaryAction
            : {},
        alignmentVariant: cardAlignmentVariant,
        variant: cardMobileVariant,
        charactersLimit: isMobile
          ? mobileCardCharactersLimit
          : cardCharactersLimit,
      };
    }),
    charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
    largeVariant: groupLargeVariant,
    isComponentFullWidth: isComponentFullWidth,
    isMobileComponentFullWidth: isMobileComponentFullWidth,
    title: componentData?.sectionTitle,
    alignmentVariant: alignmentVariant,
    subTitle: componentData?.description,
    variant: groupMobileVariant,
    aesthetic: aesthetic,
  };

  return (
    <Box>
      {componentItemData?.length > 0 && (
      <Box>{context?.renderComponent("group", groupData)}</Box>
      )}
    </Box>
  );
};
export default observer(GiftHampersTwoColumnCarousel);
