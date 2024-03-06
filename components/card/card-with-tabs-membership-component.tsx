import React from "react"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import {
  MembershipTitle,
  CardMediaStyles,
  MembershipCardBox,
  MembershipWrapper,
  MembershipGridWrapper,
} from "./styles/card-with-tabs-membership"

const MultipleCardsWithTabs = ({ props }: any) => {
  const isMobile = useMobileCheck()

  return (
    <MembershipGridWrapper aria-label="membership-tiers" id="membershipSpecs">
      <MembershipWrapper>
        {props?.comparatives?.map((item: any, index: number) => (
          <MembershipCardBox key={index}>
            {item?.image?.asset?._ref && (
              <CardMediaStyles
                alt={item?.image?.altText || "media"}
                component={"img"}
                src={urlFor(item?.image?.asset?._ref).url()}
              />
            )}
            <MembershipTitle variant={isMobile ? "m-heading-xs" : "heading-xs"}>{item?.title}</MembershipTitle>
          </MembershipCardBox>
        ))}
      </MembershipWrapper>
    </MembershipGridWrapper>
  )
}

export default MultipleCardsWithTabs
