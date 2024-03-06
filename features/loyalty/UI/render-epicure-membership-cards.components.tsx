import React, { useContext, useEffect, useState } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { Box } from "@mui/material"

const RenderEpicureMembershipCards = (props: any) => {
  const {
    groupMobileVariant,
    groupLargeVariant,
    cardLargeVariant,
    cardMobileVariant,
    aesthetic,
    cardAesthetic,
  } = props || {}
  const [groupData, setGroupData] = useState<any>()
  const [componentData, setComponentData] = useState<any>()
  const ctaLabelAction = props?.cardActionType?.filter(
    (item: any) => item?.actionType === "ctaLabel"
  )?.[0]?.ctaLabel
  const context = useContext(IHCLContext)
  const epicureGlobalStore = context?.getGlobalStore(
    GLOBAL_STORES.loyaltyGlobalStore
  ) as LoyaltyGlobalStore

  useEffect(() => {
    setGroupData({
      ...props,
      url: ctaLabelAction?.url,
      urlType: ctaLabelAction?.urlType,
      data: epicureGlobalStore.epicurePageData.membershipTiers,
      aesthetic: props?.aesthetic,
      title: props?.title,
      variant: groupMobileVariant,
      items: epicureGlobalStore.epicurePageData.membershipTiers?.map(
        (item: any) => ({
          ...item,
          renewal: item?.renewal,
          primaryAction: item?.actions?.[0]?.primaryAction,
          children: item?.totalPrice,
          highLights: item?.title,
          largeImage: item?.image?.largeImage,
          image: item?.image?.smallImage,
        })
      ),
      largeVariant: groupLargeVariant,
    })
  }, [
    aesthetic,
    cardAesthetic,
    cardLargeVariant,
    cardMobileVariant,
    ctaLabelAction?.url,
    ctaLabelAction?.urlType,
    epicureGlobalStore.epicurePageData.membershipTiers,
    groupLargeVariant,
    groupMobileVariant,
    props,
  ])

  return (
    <>
      <Box>{context?.renderComponent("group", groupData)}</Box>
    </>
  )
}

export default RenderEpicureMembershipCards
