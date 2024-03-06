import React, { useContext } from "react"
import { useMobileCheck } from "../../../utils/isMobilView"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { UserAccountStore } from "../../../store"
import { CONSTANTS } from "../../constants"
import MembershipCard from "./renewals.membership.component"
import {
  MainContainer,
  TitleBox,
  TitleMainStack,
  TitleTypography,
  TypographyRenewalTitle,
  BoxTier,
} from "./styles/renewals.component.styles"

const RenewalComponent = (props: any) => {
  const { title, primaryAction, secondaryAction } = props
  const globalContext = useContext(IHCLContext)
  const globalAccountStore: any = globalContext?.getGlobalStore(
    GLOBAL_STORES.userAccountStore
  ) as UserAccountStore

  const epicureRenewalCards = globalAccountStore?.epicureRenewalCards
  const isMobile = useMobileCheck()

  return (
    <>
      <MainContainer aria-label="RenewalsComponent">
        <TitleMainStack>
          <TypographyRenewalTitle
            variant={isMobile ? "m-heading-s" : "heading-m"}>
            {title}
          </TypographyRenewalTitle>
        </TitleMainStack>
        <>
          {global?.window?.localStorage?.getItem("epicureMemberTier") &&
            epicureRenewalCards?.length > 0 && (
              <BoxTier>
                <TitleBox
                  sx={{
                    marginTop: isMobile ? "5.465vw !important" : "1.042vw",
                    "&~div": {
                      borderWidth: "0vw!important",
                    },
                  }}>
                  <TitleTypography
                    variant={isMobile ? "m-heading-s" : "heading-s"}>
                    {CONSTANTS?.EPICURE}
                  </TitleTypography>
                </TitleBox>
                {epicureRenewalCards?.map((cards: any, index: number) => (
                  <>
                    <MembershipCard
                      membership={cards}
                      key={index}
                      primaryAction={primaryAction}
                      secondaryAction={secondaryAction}
                    />
                  </>
                ))}
              </BoxTier>
            )}
        </>
      </MainContainer>
    </>
  )
}

export default RenewalComponent
