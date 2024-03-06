import { Box, Divider, Grid, Typography } from "@mui/material"
import Link from "next/link"
import { useMobileCheck } from "../../../../utils/isMobilView"
import EmailIcon from "@mui/icons-material/Email"
import { urlFor } from "../../../../lib-sanity"
import { currencyPrettier } from "../../../../utils/currency"
import { Fragment, useState, useEffect } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"
import { ICONS } from "../../../constants"
import CallIcon from "@mui/icons-material/Call"
import { RENEWAL_DATE } from "./constants"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import { PathType } from "../../../../types"
import {
  ActionsContainer,
  BoldSubfieldTitleTypography,
  BoldTitle,
  BorderedCardWrapper,
  CoinBalance,
  ColumnFlexBox,
  ComplementaryAddOnFlex,
  DatesContainer,
  DetailsCurrencyContainer,
  InnerCardGrid,
} from "./styles"
import { COINS_BALANCE, COMPLIMENTARY_ADD_ON_CARD, MEMBERSHIP_PREMIUM, START_DATE, TIER } from "./constants"

const MembershipCard = ({ membership, primaryAction, secondaryAction }: any) => {
  const memberShipAddOn = membership?.addOn
  const memberShipPrimaryCard = membership?.primary
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const [renewal, setRenewal] = useState<boolean>(false)

  const preferredCard = memberShipPrimaryCard?.membership?.toLowerCase() === "preferred" && primaryAction

  const privilegedCard = memberShipPrimaryCard?.membership?.toLowerCase() === "privileged" && secondaryAction

  useEffect(() => {
    if (memberShipPrimaryCard?.expiryDate) {
      const expiryDateString: any = memberShipPrimaryCard?.expiryDate
      const expiryDate: any = new Date(expiryDateString)

      const currentDate: any = new Date()

      // Calculate the difference in days
      const differenceInDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24))
      if (differenceInDays <= 45 && currentDate <= expiryDate) {
        setRenewal(true)
      } else {
        setRenewal(false)
      }
    }
  }, [memberShipPrimaryCard?.expiryDate])

  return (
    <BorderedCardWrapper>
      <InnerCardGrid>
        <Box
          sx={{
            width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(270),
            height: isMobile ? MobilePxToVw(317) : DesktopPxToVw(180),
          }}>
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
                  ? membership?.image?.smallImage?.asset?._ref || memberShipPrimaryCard?.image?.smallImage?.asset?._ref
                  : membership?.image?.largeImage?.asset?._ref || memberShipPrimaryCard?.image?.largeImage?.asset?._ref,
              )?.url()}
              alt="membership-image"
            />
          )}
        </Box>
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
                  <ColumnFlexBox sx={{ width: isMobile ? "100%" : DesktopPxToVw(160) }}>
                    <BoldTitle>{START_DATE}</BoldTitle>
                    <Typography variant={isMobile ? "m-body-sl" : "body-s"}>
                      {membership?.startDate || memberShipPrimaryCard?.startDate}
                    </Typography>
                  </ColumnFlexBox>
                  <ColumnFlexBox
                    sx={{
                      width: isMobile ? "100%" : DesktopPxToVw(160),
                    }}>
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
                  </ColumnFlexBox>
                </DatesContainer>
              </Box>
              {memberShipAddOn?.name && isMobile && (
                <BoldSubfieldTitleTypography
                  sx={{
                    fontSize: "2.188vw !important",
                    color: theme?.palette?.ihclPalette?.hexSeventeen,
                  }}>
                  {COMPLIMENTARY_ADD_ON_CARD}
                </BoldSubfieldTitleTypography>
              )}
              {isMobile && memberShipAddOn?.name && (
                <>
                  <ComplementaryAddOnFlex>
                    {memberShipAddOn?.name && (
                      <Box sx={{ gridArea: "name" }}>
                        <Typography variant="m-body-s">{`${memberShipAddOn?.name}`}</Typography>
                      </Box>
                    )}
                    {memberShipAddOn?.phoneNumber && (
                      <Box
                        sx={{
                          gridArea: "mobile",
                          display: "flex",
                          alignItems: "center",
                          gap: "1vw",
                        }}>
                        <>
                          <CallIcon
                            sx={{
                              width: "2.656vw",
                              height: "auto",
                            }}
                          />
                          <Typography variant="m-body-s">{memberShipAddOn?.phoneNumber}</Typography>
                        </>
                      </Box>
                    )}
                  </ComplementaryAddOnFlex>
                  {memberShipAddOn?.email && (
                    <Box
                      sx={{
                        gridArea: "email",
                        display: "flex",
                        alignItems: "start",
                        gap: "1vw",
                      }}>
                      <>
                        <EmailIcon
                          sx={{
                            width: "2.656vw",
                            height: "auto",
                          }}
                        />
                        <Typography variant="m-body-s">{memberShipAddOn?.email}</Typography>
                      </>
                    </Box>
                  )}
                </>
              )}
              {/*currency */}
              <Box>
                {membership?.coinBalance && (
                  <ColumnFlexBox
                    sx={{
                      gap: "0.5vw",
                      alignItems: isMobile ? "flex-start" : "flex-end",
                    }}>
                    <CoinBalance>{COINS_BALANCE}</CoinBalance>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "1.563vw" : "0.521vw",
                      }}>
                      <Box>
                        <Box
                          component={"img"}
                          src={ICONS?.GOLD_COINS_ICON}
                          alt={"gold coins"}
                          sx={{
                            width: isMobile ? "4.219vw" : "1.406vw",
                            height: "auto",
                          }}
                        />
                      </Box>
                      <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
                        {membership?.coinBalance
                          ? `${currencyPrettier(Number(membership?.coinBalance))?.slice(2)}`
                          : ""}
                      </Typography>
                    </Box>
                  </ColumnFlexBox>
                )}
              </Box>
            </DetailsCurrencyContainer>
          </Box>
          {(membership?.complementaryDetails || memberShipAddOn?.name) && !isMobile && (
            <Grid container m={"0.391vw 0"}>
              <Grid>
                <BoldSubfieldTitleTypography>{COMPLIMENTARY_ADD_ON_CARD}</BoldSubfieldTitleTypography>
              </Grid>
            </Grid>
          )}
          {!isMobile && (
            <ComplementaryAddOnFlex>
              {memberShipAddOn?.name && (
                <Box sx={{ gridArea: "name" }}>
                  <Typography variant="body-s">{`${memberShipAddOn?.name}`}</Typography>
                </Box>
              )}
              {memberShipAddOn?.email && (
                <Box sx={{ gridArea: "email" }}>
                  <Typography variant="body-s">{memberShipAddOn?.email}</Typography>
                </Box>
              )}
              {memberShipAddOn?.phoneNumber && (
                <Box sx={{ gridArea: "mobile" }}>
                  <Typography variant="body-s">{memberShipAddOn?.phoneNumber}</Typography>
                </Box>
              )}
              {membership?.complementaryDetails?.map((detail: string, index: number) => (
                <Typography key={index} variant="body-s">
                  {detail}
                </Typography>
              ))}
            </ComplementaryAddOnFlex>
          )}
          <Divider sx={{ marginTop: isMobile ? "3.125vw" : "" }} />
          {/* {membership?.actionLinks && (
            <ActionsContainer>
              {membership?.actionLinks?.map(
                (actionLink: any, index: number) => (
                  <Fragment key={index}>
                    {index !== 0 && <Divider orientation="vertical" />}
                    <Box key={index} sx={{ paddingRight: "0.521vw" }}>
                      <Link href={actionLink?.link ? actionLink?.link : "/"}>
                        <Typography variant={isMobile ? "m-link-m" : "link-m"}>
                          {actionLink?.text}
                        </Typography>
                      </Link>
                    </Box>
                  </Fragment>
                )
              )}
            </ActionsContainer>
          )} */}
          {/* Renew membership */}
          {renewal && memberShipPrimaryCard && (
            <ActionsContainer>
              <Box sx={{ paddingRight: "0.521vw" }}>
                <Typography
                  onClick={() => {
                    const cardType = memberShipPrimaryCard?.membership?.toLowerCase() || ""
                    const url = cardType?.toLowerCase() == "preferred" ? preferredCard?.url : privilegedCard?.url
                    const type = "renewal"
                    const appendedURL = `${url}?cardType=${cardType}&type=${type}`
                    navigate(appendedURL, PathType?.internal)
                  }}
                  variant={isMobile ? "m-link-m" : "link-m"}
                  sx={{
                    fontSize: isMobile ? MobilePxToVw(16) : DesktopPxToVw(16),
                    letterSpacing: "0.093vw",
                    textTransform: "uppercase",
                  }}>
                  {privilegedCard?.title || preferredCard?.title}
                </Typography>
              </Box>
            </ActionsContainer>
          )}
        </Box>
      </InnerCardGrid>
    </BorderedCardWrapper>
  )
}
export default MembershipCard
