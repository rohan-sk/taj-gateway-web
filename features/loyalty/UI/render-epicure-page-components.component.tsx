import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { Box } from "@mui/material"
import MultiRowTitle from "../../../components/hoc/title/multi-row-title"
import { useMobileCheck } from "../../../utils/isMobilView"

const RenderEpicurePageComponents = (props: any) => {
  const {
    groupMobileVariant,
    groupLargeVariant,
    cardLargeVariant,
    cardMobileVariant,
    aesthetic,
    cardAesthetic,
    cardAlignmentVariant,
  } = props || {}
  const [groupData, setGroupData] = useState<any>()
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()

  const epicureGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES?.loyaltyGlobalStore
  ) as LoyaltyGlobalStore

  useEffect(() => {
    setGroupData({
      largeVariant: groupLargeVariant,
      variant: groupMobileVariant,
      items: epicureGlobalStore?.epicurePageData?.sectionInfo?.discountInfo?.map(
        (cardData: any, index: any) => {
          return {
            ...cardData,
            aesthetic: cardAesthetic,
            largeVariant: cardLargeVariant,
            variant: cardMobileVariant,
            largeImage: cardData?.media?.[0]?.imageAsset?.largeImage?.[0],
            image: cardData?.media?.[0]?.imageAsset?.image?.[0],
            _type: "card",
            alignmentVariant: cardAlignmentVariant,
          }
        }
      ),
    })
  }, [
    aesthetic,
    cardAesthetic,
    cardLargeVariant,
    cardMobileVariant,
    epicureGlobalStore?.epicurePageData?.sectionInfo?.discountInfo,
    groupLargeVariant,
    groupMobileVariant,
    cardAlignmentVariant,
  ])

  return (
    <>
      <Box
        sx={{
          padding: isMobile
            ? props?.aesthetic?.padding?.mobile
            : props?.aesthetic?.padding?.desktop,
        }}>
        <MultiRowTitle
          title={{
            ...epicureGlobalStore?.epicurePageData?.sectionInfo?.title,
          }}
          charactersLimit={
            props?.charactersLimit
          }
          aesthetic={null}
          subTitle={epicureGlobalStore?.epicurePageData?.sectionInfo?.subTitle}
          alignmentVariant={"center"}
          isComponentFullWidth={true}
          isMobileComponentFullWidth={true}
        />
      </Box>
      {context?.renderComponent("group", groupData)}
    </>
  )
}

export default RenderEpicurePageComponents
