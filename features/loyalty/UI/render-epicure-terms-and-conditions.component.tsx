import { Box } from "@mui/material"
import React, { useContext } from "react"
import LoyaltyGlobalStore from "../store/globalStore/loyalty-global-store"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../../utils/isMobilView"
import { observer } from "mobx-react-lite"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
const RenderFaqList = dynamic(() => import("../../../components/faq/faq-list"))

const RenderEpicureTermsAndConditionsComponent = () => {
  const Context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const PortableText = Context!.PortableText
  const epicureGlobalStore = Context?.getGlobalStore(GLOBAL_STORES.loyaltyGlobalStore) as LoyaltyGlobalStore

  return (
    <Box>
      {epicureGlobalStore?.termsAndConditions?.terms?.[0] && (
        <Box
          padding={
            isMobile
              ? epicureGlobalStore?.termsAndConditions?.terms?.[0]?.aesthetic?.padding?.mobile
              : epicureGlobalStore?.termsAndConditions?.terms?.[0]?.aesthetic?.padding?.desktop
          }>
          <MultiRowTitle {...epicureGlobalStore?.termsAndConditions?.terms?.[0]} />
        </Box>
      )}
      {epicureGlobalStore?.termsAndConditions?.terms?.[1] && (
        <Box
          padding={
            isMobile
              ? epicureGlobalStore?.termsAndConditions?.terms?.[1]?.aesthetic?.padding?.mobile
              : epicureGlobalStore?.termsAndConditions?.terms?.[1]?.aesthetic?.padding?.desktop
          }>
          <MultiRowTitle {...epicureGlobalStore?.termsAndConditions?.terms?.[1]} />
          <PortableText blocks={epicureGlobalStore?.termsAndConditions?.terms?.[1]?.items?.[0]?.content} />
        </Box>
      )}
      {epicureGlobalStore?.termsAndConditions?.terms?.[2]?.items && (
        <RenderFaqList items={epicureGlobalStore?.termsAndConditions?.terms?.[2]?.items} />
      )}
    </Box>
  )
}

export default observer(RenderEpicureTermsAndConditionsComponent)
