import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context";
import { HolidayStore, RestaurantStore } from "../../../../store";
import { GLOBAL_STORES } from "../../../../utils/Constants";
import { useMobileCheck } from "../../../../utils/isMobilView";

const HolidayLeftMediaRightContent = ({
  cardLargeVariant,
  aesthetic,
  contentType,
  groupMobileVariant,
  cardMobileVariant,
  charactersLimit,
  cardCharactersLimit,
  mobileCharactersLimit,
  mobileCardCharactersLimit,
  cardActionType,
  alignmentVariant,
  isComponentFullWidth = false,
  isMobileComponentFullWidth = false,
}: any) => {
  const router: any = useRouter();
  const isMobile = useMobileCheck();
  const [groupData, setGroupData] = useState<any>();
  const ihclContext = useContext(IHCLContext);
  const holidayStore: any = ihclContext?.getGlobalStore(
    GLOBAL_STORES.holidayStore
  ) as HolidayStore;
  const [title, setTitle] = useState<any>();
  const [componentItemData, setComponentItemsData] = useState<any>();
  let ctaActionData = cardActionType?.find(
    (action: any) => action?.actionType === "ctaLabel"
  )?.ctaLabel;
  useEffect(() => {
    setTitle(holidayStore?.holidayData?.aboutHoliday?.sectionTitle);
    setComponentItemsData(
      holidayStore?.holidayData?.aboutHoliday?.attractionList
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    setGroupData({
      items: componentItemData?.map((item: any, index: any) => {
        return {
          ...item,
          title: item?.title,
          description: item?.description,
          largeVariant: cardLargeVariant,
          _type: "card",
          largeImage: item?.media?.[0]?.imageAsset?.largeImage?.[0],
          image:
            item?.media?.[0]?.imageAsset?.image?.[0] ||
            item?.imageAsset?.largeImage?.[0],
          mediaType: item?.media?.[0]?.mediaType,
          variant: cardMobileVariant,
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
          ctaLabel: ctaActionData?.title,
          urlType: ctaActionData?.urlType,
          url: ctaActionData?.url,
          charactersLimit: isMobile
            ? mobileCardCharactersLimit
            : cardCharactersLimit,
        };
      }),
      title: title,
      subTitle: holidayStore?.holidayData?.aboutHoliday?.description,
      charactersLimit: isMobile ? mobileCharactersLimit : charactersLimit,
      largeVariant:
        "details.group.group-with-card-left-media-right-content-aspect-ratio-2:4",
      variant:
        "details.group.group-with-card-left-media-right-content-aspect-ratio-2:4",
      isComponentFullWidth: isComponentFullWidth,
      isMobileComponentFullWidth: isMobileComponentFullWidth,
      alignmentVariant: alignmentVariant,
      aesthetic: aesthetic,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentItemData, title, contentType]);
  return <Box>{ihclContext?.renderComponent("group", groupData)}</Box>;
};

export default observer(HolidayLeftMediaRightContent);
