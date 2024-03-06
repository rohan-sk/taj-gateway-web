import { Box, Divider, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { urlFor } from "../../../lib-sanity"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { MEMBERSHIP_PREMIUM, RENEWAL_DATE, START_DATE, TIER } from "../Membership/common/constants"
import {
  BoldTitle,
  BorderedCardWrapper,
  CoinBalance,
  ColumnFlexBox,
  DatesContainer,
  DetailsCurrencyContainer,
  InnerCardGrid,
  PriceButtonMainBox,
  InnerBoxCard,
  TypographyRenewalPrice,
  DiscountBox,
  ColumnFlexBoxChild,
} from "./styles/renewals.membership.component.styles"

const MembershipCard = ({ membership }: any) => {
  const memberShipPrimaryCard = membership?.primary
  const isMobile = useMobileCheck()

  const navigationURL = `${
    membership?.primary?.primaryAction?.url
  }?cardType=${memberShipPrimaryCard?.membership?.toLowerCase()}`

  return (
    <>
      <BorderedCardWrapper aria-label="RenewalsMembership">
        <InnerCardGrid>
          <InnerBoxCard $isMobile={isMobile}>
            {(membership?.image?.image?.asset?._ref ||
              memberShipPrimaryCard?.image?.image?.asset?._ref ||
              membership?.image?.largeImage?.asset?._ref ||
              memberShipPrimaryCard?.image?.largeImage?.asset?._ref) && (
              <Box
                sx={{
                  width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(270),
                  height: isMobile ? MobilePxToVw(317) : DesktopPxToVw(180),
                }}
                component={"img"}
                src={urlFor(
                  isMobile
                    ? membership?.image?.smallImage?.asset?._ref ||
                        memberShipPrimaryCard?.image?.smallImage?.asset?._ref
                    : membership?.image?.largeImage?.asset?._ref ||
                        memberShipPrimaryCard?.image?.largeImage?.asset?._ref,
                )?.url()}
                alt="membership-image"
              />
            )}
          </InnerBoxCard>
          <Box>
            <Box>
              <DetailsCurrencyContainer>
                {/*Title and details*/}
                <Box>
                  <Grid container sx={{ marginBottom: isMobile ? "3.125vw" : "0.521vw" }}>
                    <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
                      {memberShipPrimaryCard?.type !== "undefined" &&
                      memberShipPrimaryCard?.type?.toLowerCase() === "bank"
                        ? memberShipPrimaryCard?.bankName
                        : membership?.membership || memberShipPrimaryCard?.membership}
                    </Typography>
                  </Grid>
                  <DatesContainer>
                    <ColumnFlexBoxChild>
                      <BoldTitle>{START_DATE}</BoldTitle>
                      <Typography variant={isMobile ? "m-body-sl" : "body-s"}>
                        {membership?.startDate || memberShipPrimaryCard?.startDate}
                      </Typography>
                    </ColumnFlexBoxChild>
                    <ColumnFlexBoxChild>
                      <BoldTitle>
                        {membership?.tier
                          ? TIER
                          : membership?.expiryDate || memberShipPrimaryCard?.expiryDate
                          ? RENEWAL_DATE
                          : ""}
                      </BoldTitle>
                      <Typography variant={isMobile ? "m-body-sl" : "body-s"}>
                        {membership?.tier
                          ? membership?.tier
                          : membership?.expiryDate || memberShipPrimaryCard?.expiryDate
                          ? membership?.expiryDate || memberShipPrimaryCard?.expiryDate
                          : ""}
                      </Typography>
                    </ColumnFlexBoxChild>
                  </DatesContainer>
                </Box>
                {/*currency */}
                {(membership?.primary?.renewalPrice || membership?.primary?.renewalDiscountPrice) && (
                  <PriceButtonMainBox>
                    <Box sx={{ flexDirection: "column" }}>
                      <ColumnFlexBox
                        sx={{
                          gap: isMobile ? "1.563vw" : "0.5vw",
                          alignItems: isMobile ? "flex-start" : "flex-end",
                        }}>
                        <CoinBalance>{MEMBERSHIP_PREMIUM}</CoinBalance>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: isMobile ? "1.563vw" : "0.521vw",
                          }}>
                          <TypographyRenewalPrice
                            $isMobile={isMobile}
                            variant={isMobile ? "m-heading-s" : "heading-xs"}>
                            {!!membership?.primary?.renewalPrice ? membership?.primary?.renewalPrice : ""}
                          </TypographyRenewalPrice>
                          <Typography
                            sx={{
                              color: theme?.palette?.ihclPalette?.hexTwo,
                            }}
                            variant={isMobile ? "m-heading-s" : "heading-s"}>
                            {!!membership?.primary?.renewalDiscountPrice
                              ? `${membership?.primary?.renewalDiscountPrice}`
                              : ""}
                          </Typography>
                        </Box>
                      </ColumnFlexBox>
                      <DiscountBox>
                        <Typography variant={isMobile ? "m-body-xxs" : "body-xs"}>
                          {membership?.primary?.discountPercentage}
                        </Typography>
                      </DiscountBox>
                    </Box>
                    {membership?.primary?.primaryAction && (
                      <RenderActionItem
                        url={navigationURL}
                        title={membership?.primary?.primaryAction?.title}
                        navigationType={membership?.primary?.primaryAction?.navigationType}
                        variant={membership?.primary?.primaryAction?.variant}
                        isActionButtonType={true}
                        buttonStyles={{
                          width: isMobile ? MobilePxToVw(147) : DesktopPxToVw(147),
                        }}
                      />
                    )}
                  </PriceButtonMainBox>
                )}
              </DetailsCurrencyContainer>
            </Box>
          </Box>
        </InnerCardGrid>
        <Divider sx={{ marginTop: isMobile ? "3.125vw" : "1vw" }} />
      </BorderedCardWrapper>
    </>
  )
}
export default observer(MembershipCard)
