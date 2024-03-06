import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import OffersStore from "../../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import { Box } from "@mui/material"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ComponentContainer, TitleContainer } from "../../../components/card/offer-package.styles"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
const OffersPackageComponent = dynamic(() => import("../../../components/card/offers-package.component"))

const OffersPackageTemplate = (props: any) => {
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const offerStore = Context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore
  const data = {
    ...props,
    variant: props?.groupLargeVariant,
    title: offerStore?.offersData?.inclusionHeadingTitle || props?.title,
  }
  const isNonHotelSpecificOfferData = offerStore?.offersData?.displayGlobal
  const iconItems = isNonHotelSpecificOfferData
    ? props?.contentType === "additionalPackageOffers"
      ? offerStore?.offersData?.additionalPackages?.[0]?.basicInfo?.icon?.icon
      : offerStore?.offersData?.inclusions?.[0]?.basicInfo?.icon?.icon
    : props?.contentType === "additionalPackageOffers"
    ? offerStore?.offersData?.hotels?.additionalPackages?.[0]?.basicInfo?.icon?.icon
    : offerStore?.offersData?.hotels?.inclusions?.[0]?.basicInfo?.icon?.icon

  const iconItemsContent =
    props?.contentType === "additionalPackageOffers"
      ? offerStore?.offersData?.additionalPackages
      : offerStore?.offersData?.inclusions

  return (
    <>
      {offerStore?.offersData?.hotels?.inclusions?.length > 0 ||
        (iconItemsContent?.length > 0 && (
          <Box
            sx={{
              padding: isMobile ? props?.aesthetic?.padding?.mobile : props?.aesthetic?.padding?.desktop,
              bgcolor: props?.aesthetic?.backgroundColor?.hex,
            }}>
            <ComponentContainer $packageOffer={false} $isMobile={isMobile} $iconItems={!iconItems}>
              <TitleContainer>
                <MultiRowTitle {...data} />
              </TitleContainer>
              <OffersPackageComponent data={{ ...offerStore?.offersData, ...props }} />
            </ComponentContainer>
          </Box>
        ))}
    </>
  )
}

export default observer(OffersPackageTemplate)
