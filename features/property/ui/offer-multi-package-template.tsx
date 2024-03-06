import React, { useContext } from "react"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import dynamic from "next/dynamic"
import { GLOBAL_STORES } from "../../../utils/Constants"
import OffersStore from "../../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import { Box } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import { ComponentContainer } from "../../../components/card/offer-package.styles"
import OffersMultiPackageComponent from "../../../components/card/offers-multi-package.component"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import { MULTI_PACKAGE_OFFERTYPE } from "../../../components/constants"

const OffersMultiPackageTemplate = (props: any) => {
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const offerStore = Context?.getGlobalStore(
    GLOBAL_STORES.offerStore
  ) as OffersStore

  return (
    <Box
      sx={{
        padding: isMobile
          ? props?.aesthetic?.padding?.mobile
          : props?.aesthetic?.padding?.desktop,
      }}>
      <ComponentContainer $packageOffer={true}>
        <Box>
          {offerStore?.offersData?.packageType !== MULTI_PACKAGE_OFFERTYPE &&
            offerStore?.offersData?.packageType !== MULTI_PACKAGE_OFFERTYPE && (
              <MultiRowTitle
                title={props?.title}
                subTitle={""}
                heading={""}
                aesthetic={props?.aesthetic}
                charactersLimit={props?.charactersLimit}
                alignmentVariant={"center"}
                isComponentFullWidth={true}
                isMobileComponentFullWidth={true}
              />
            )}
          <OffersMultiPackageComponent
            data={offerStore?.offersData}
            componentData={props}
            cardBackgroundColor={props?.aesthetic?.backgroundColor?.hex}
          />
        </Box>
      </ComponentContainer>
    </Box>
  )
}

export default observer(OffersMultiPackageTemplate)
