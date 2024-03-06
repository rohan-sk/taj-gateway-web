import React, { useMemo, useState, useContext } from "react"
import { Box } from "@mui/material"
import { observer } from "mobx-react-lite"
import { UserAccountStore } from "../../../store"
import { OVER_VIEW_OFFERS } from "../../constants"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import OffersCard from "../over-view/offers.card.component"
import OffersFilterTemplateComponent from "./offers-filter-template.component"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { NoBookingsSection, NoBookingsSectionText } from "../over-view/styles/render-over-view"
import {
  FilterStack,
  VoucherTitleContainer,
  VoucherTitleTypography,
  VoucherSectionContainer,
  VoucherSectionMainContainer,
} from "../../../features/my-account/ui/styles/vouchers-filter-template"
import { useAesthetics } from "../../../utils/fetchAsthetics"

type Asthetics = {
  _ref: string
}
type OfferOverView = {
  title?: string
  primaryAction?: string
  charactersLimit: number
  aesthetic: Asthetics
}

const OverViewOffersBenefitsTab = ({ title, primaryAction, charactersLimit, aesthetic }: OfferOverView) => {
  const { cardPadding } = useAesthetics(aesthetic?._ref)
  const isMobile = useMobileCheck()
  const globalContext = useContext(IHCLContext)

  const [initialSelectedValue, setInitialSelectedValue] = useState("All")

  const accountStore = globalContext?.getGlobalStore(GLOBAL_STORES?.userAccountStore) as UserAccountStore

  const exclusiveOffers: any[] = accountStore?.myAccountOffersData

  const filteredOffers = useMemo(() => {
    const memberSpecificOffers = exclusiveOffers?.filter((offer: any) => offer?.memberSpecific)
    const nonMemberSpecificOffers = exclusiveOffers?.filter((offer: any) => offer?.memberSpecific !== true)
    const allOffers = [...memberSpecificOffers, ...nonMemberSpecificOffers] //?showing Member specific offers first then global offers
    let tempArray: any = [
      {
        label: "All",
        listItems: allOffers,
      },
      {
        label: "Member Specific Offers",
        listItems: memberSpecificOffers,
      },
    ]
    setInitialSelectedValue(tempArray?.[1]?.label ?? "All")
    return tempArray
  }, [exclusiveOffers])

  const filteredOffersCards = useMemo(() => {
    return filteredOffers?.filter(
      (offer: any) => offer?.label?.toLowerCase() === initialSelectedValue?.toLowerCase(),
    )?.[0]?.listItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredOffers, initialSelectedValue])

  return (
    <>
      <Box sx={{ padding: isMobile ? (cardPadding ? cardPadding?.mobile : "7.815vw") : cardPadding?.desktop }}>
        <VoucherSectionMainContainer $isMobile={isMobile}>
          <VoucherSectionContainer>
            <FilterStack>
              <VoucherTitleContainer>
                <VoucherTitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
                  {title}
                </VoucherTitleTypography>
              </VoucherTitleContainer>
            </FilterStack>
          </VoucherSectionContainer>
          <Box
            sx={{
              margin: isMobile ? "0vw 0vw 7.818vw" : "0",
            }}>
            <OffersFilterTemplateComponent
              filteredOffers={filteredOffers}
              initialSelectedValue={initialSelectedValue}
              setInitialSelectedValue={setInitialSelectedValue}
            />
          </Box>
        </VoucherSectionMainContainer>
        {filteredOffersCards?.length > 0 ? (
          <>
            {filteredOffersCards?.map((offer: any, index: number) => (
              <OffersCard
                OfferData={offer}
                primaryAction={primaryAction}
                charactersLimit={charactersLimit}
                key={index?.toString()}
              />
            ))}
          </>
        ) : (
          <NoBookingsSection $mobile={isMobile}>
            <NoBookingsSectionText $mobile={isMobile}>{OVER_VIEW_OFFERS}</NoBookingsSectionText>
          </NoBookingsSection>
        )}
      </Box>
    </>
  )
}

export default observer(OverViewOffersBenefitsTab)
