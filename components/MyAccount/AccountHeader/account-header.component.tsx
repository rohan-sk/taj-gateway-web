import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { theme } from "../../../lib/theme"
import { CONSTANTS } from "../../constants"
import { urlFor } from "../../../lib-sanity"
import { UserAccountStore } from "../../../store"
import { currencyPrettier } from "../../../utils/currency"
import { useMobileCheck } from "../../../utils/isMobilView"
import React, { useContext, useEffect, useState } from "react"
import { Box, CircularProgress, Divider, Grid, Stack, Typography } from "@mui/material"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import fetchMembershipDetails from "../../../utils/fetchMembershipData"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  BoxWrapper,
  TabWrapper,
  ContentBox,
  StyledImage,
  GridContainer,
  ACHighlightsStack,
  CountLabelTypography,
  MembershipDetailsStack,
} from "./account-header.styles"
import {
  OFFERS,
  EPICURE_TAB,
  NEU_PASS_TAB,
  CHAMBERS_TAB,
  NO_OF_VOUCHERS,
  NO_OF_BOOKINGS,
  EPICURE_NUMBER,
  MEMBERSHIP_NUMBER,
  NO_OF_RENEWALS,
} from "../../forms/gift-card-form/constants"

interface accountInterface {
  cardCount: number
  epicureCardDetails: {
    isPrivilegedMember: boolean
    isPreferredMember: boolean
    isCorpMember: boolean
  }
}
const AccountHeaderComponent = ({ cardCount, epicureCardDetails }: accountInterface) => {
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const globalContext = useContext(IHCLContext)
  const [neupassMembershipImage, setNeupassMembershipImage] = useState<any>("")
  const [epicureMembershipImage, setEpicureMembershipImage] = useState<any>({
    epicurePrivilegedImage: "",
    epicurePreferredImage: "",
    epicureBankImage: "",
  })
  const [chambersMembershipImage, setChambersMembershipImage] = useState<any>("")
  const [selected, setSelected] = useState<string>()
  const [storeTabValue, setStoreTabValue] = useState<string>("")

  const handleClick = (event: any) => {
    setSelected(event?.target?.id)
  }
  const {
    updateCurrentTab,
    updateCurrentTabViewer,
    tabsData,
    fetchUpdatedNeuCoins,
    currentUserNeuCoins,
    setActvieTierLabel,
    fetchNeuCoinsRequest,
  }: any = pageContextUse?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const globalAccountStore = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore

  const userAccountOverview = globalAccountStore?.myAccountOverview
  const userAccountOverviewVouchers = globalAccountStore?.myAccountVouchersData
  const userAccountOffers = globalAccountStore?.myAccountOffersData
  const membershipRenewalCard = globalAccountStore?.epicureRenewalCards

  const router = useRouter()
  useEffect(() => {
    if (router?.isReady) {
      const fetchDetails = async () => {
        try {
          fetchUpdatedNeuCoins(global?.window.localStorage.getItem("accessToken"))
        } catch (error) {
          console.log(error, "error at fetch neucoins")
        }
        await MemberShipDetails()
      }
      fetchDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, epicureCardDetails])

  const MemberShipDetails = async () => {
    const response = await fetchMembershipDetails()
    if (response) {
      response?.map((card: any) => {
        if (
          card?.type?.toLowerCase() === "neupass" &&
          global?.window?.localStorage?.getItem("userTier")?.toLocaleLowerCase()?.includes(card?.tier?.toLowerCase()) &&
          card?.tier
        ) {
          setNeupassMembershipImage(card?.image)
        }

        if (
          card?.type?.toLowerCase() === "epicure" &&
          card?.tier?.toLowerCase() === "privileged" &&
          epicureCardDetails?.isPrivilegedMember
        ) {
          setEpicureMembershipImage((prev: any) => {
            return {
              ...prev,
              epicurePrivilegedImage: card?.image,
            }
          })
        } else if (
          card?.type?.toLowerCase() === "epicure" &&
          card?.tier?.toLowerCase() === "preferred" &&
          epicureCardDetails?.isPreferredMember
        ) {
          setEpicureMembershipImage((prev: any) => {
            return {
              ...prev,
              epicurePreferredImage: card?.image,
            }
          })
        }
        if (
          global?.window?.localStorage
            ?.getItem("chambersMemberTier")
            ?.toLocaleLowerCase()
            ?.includes(card?.tier?.toLocaleLowerCase())
        ) {
          setChambersMembershipImage(card?.image)
        }
        if (card?.type?.toLowerCase() === "epicurebank" && epicureCardDetails?.isCorpMember) {
          setEpicureMembershipImage((prev: any) => {
            return {
              ...prev,
              epicureBankImage: card?.image,
            }
          })
        }
      })
    }
  }

  useEffect(() => {
    if (chambersMembershipImage) {
      setSelected("0")
    } else if (neupassMembershipImage) {
      setSelected("1")
    } else if (
      epicureMembershipImage?.epicurePrivilegedImage ||
      epicureMembershipImage?.epicurePreferredImage ||
      epicureMembershipImage?.epicureBankImage
    ) {
      setSelected("2")
    }
  }, [
    chambersMembershipImage,
    epicureMembershipImage?.epicurePrivilegedImage,
    epicureMembershipImage?.epicurePreferredImage,
    epicureMembershipImage?.epicureBankImage,
    neupassMembershipImage,
  ])
  const handleRedirect = (indexValue: number) => {
    const selectedTab = tabsData?.data?.[indexValue]
    updateCurrentTab({
      index: indexValue,
      value: selectedTab?.title,
      key: selectedTab?.tabKey,
    })
    updateCurrentTabViewer({
      data: selectedTab,
    })
    setActvieTierLabel(storeTabValue)
  }

  const seeMore = cardCount > 1 ? true : false

  return (
    <GridContainer
      container
      rowSpacing={isMobile ? "5.469vw" : "0vw"}
      alignItems={"center"}
      aria-label="account-header">
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <MembershipDetailsStack>
          {!isMobile &&
            ((neupassMembershipImage?.largeImage?.asset?._ref && selected === "1") ||
              ((epicureMembershipImage?.epicurePrivilegedImage?.largeImage?.asset?._ref ||
                epicureMembershipImage?.epicurePreferredImage?.largeImage?.asset?._ref ||
                epicureMembershipImage?.epicureBankImage?.largeImage?.asset?._ref) &&
                selected === "2") ||
              (chambersMembershipImage?.largeImage?.asset?._ref && selected === "0")) && (
              <StyledImage
                component={"img"}
                src={urlFor(
                  selected === "1"
                    ? neupassMembershipImage?.largeImage?.asset?._ref
                    : selected === "2"
                    ? epicureMembershipImage?.epicurePrivilegedImage?.largeImage?.asset?._ref ||
                      epicureMembershipImage?.epicurePreferredImage?.largeImage?.asset?._ref ||
                      epicureMembershipImage?.epicureBankImage?.largeImage?.asset?._ref
                    : chambersMembershipImage?.largeImage?.asset?._ref,
                ).url()}
                width={"10vw"}
              />
            )}
          <Stack
            width={"100%"}
            alignItems={isMobile ? "center" : "start"}
            textAlign={isMobile ? "center" : "left"}
            justifyContent={"space-between"}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              columnGap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}>
              {global?.window?.localStorage?.getItem("chambersMemberID") !== null &&
                global?.window?.localStorage?.getItem("chambersMemberID") !== undefined && (
                  <>
                    <TabWrapper
                      variant={isMobile ? "m-body-s" : "body-s"}
                      fontWeight={700}
                      id={"0"}
                      $index={selected === "0"}
                      onClick={(e: any) => {
                        handleClick(e), setStoreTabValue(CHAMBERS_TAB)
                      }}>
                      {CHAMBERS_TAB}
                    </TabWrapper>

                    <Divider
                      orientation="vertical"
                      flexItem
                      style={{
                        borderColor: theme?.palette?.neuPalette?.hexTwelve,
                      }}
                    />
                  </>
                )}
              <TabWrapper
                id={"1"}
                $index={selected === "1"}
                onClick={(e: any) => {
                  handleClick(e), setStoreTabValue(NEU_PASS_TAB)
                }}
                variant={isMobile ? "m-body-s" : "body-s"}
                fontWeight={700}>
                {NEU_PASS_TAB}
              </TabWrapper>
              {global?.window?.localStorage?.getItem("epicureMemberID") !== null &&
                global?.window?.localStorage?.getItem("epicureMemberID") !== "null" &&
                global?.window?.localStorage?.getItem("epicureMemberID") !== undefined && (
                  <>
                    <Divider
                      orientation="vertical"
                      flexItem
                      style={{
                        borderColor: theme?.palette?.neuPalette?.hexTwelve,
                      }}
                    />
                    <TabWrapper
                      variant={isMobile ? "m-body-s" : "body-s"}
                      fontWeight={700}
                      id={"2"}
                      $index={selected === "2"}
                      onClick={(e: any) => {
                        handleClick(e), setStoreTabValue(EPICURE_TAB)
                      }}>
                      {EPICURE_TAB}
                    </TabWrapper>
                  </>
                )}
            </Stack>
            <ContentBox $select={selected === "0"}>
              <Typography variant={isMobile ? "m-heading-m" : "heading-m"}>
                {global?.window?.localStorage?.getItem("chambersMemberTier")?.toLocaleLowerCase() === "chambersglobal"
                  ? "GLOBAL MEMBER"
                  : global?.window?.localStorage?.getItem("chambersMemberTier")?.toLocaleLowerCase() ===
                    "chambersnational"
                  ? "NATIONAL MEMBER"
                  : ""}
              </Typography>
              <Typography
                variant={isMobile ? "m-body-sl" : "body-ml"}
                mt={1}>{`${MEMBERSHIP_NUMBER}: ${global?.window?.localStorage?.getItem(
                "userPhoneNumber",
              )}`}</Typography>
              {seeMore && (
                <Typography
                  sx={{
                    cursor: "pointer",
                    paddingLeft: isMobile ? "0.966vw" : "0.44vw",
                  }}
                  variant={isMobile ? "m-link-m" : "link-m"}
                  onClick={() => handleRedirect(7)}>
                  {CONSTANTS?.SEE_MORE}
                </Typography>
              )}
            </ContentBox>
            <ContentBox $select={selected === "1"}>
              <Typography variant={isMobile ? "m-heading-m" : "heading-m"}>
                {fetchNeuCoinsRequest ? (
                  <CircularProgress sx={{ width: "1.5vw !important", height: "1.5vw !important" }} />
                ) : currentUserNeuCoins ? (
                  `${currencyPrettier(currentUserNeuCoins)?.slice(2)} Neucoins`
                ) : (
                  `0 Neucoins`
                )}
              </Typography>
              <Typography variant={isMobile ? "m-body-sl" : "body-ml"} mt={1}>
                {`${MEMBERSHIP_NUMBER} : ${global?.window?.localStorage?.getItem("userPhoneNumber")}`}
              </Typography>
              {seeMore && (
                <Typography
                  sx={{
                    cursor: "pointer",
                    paddingLeft: isMobile ? "0.966vw" : "0.44vw",
                  }}
                  variant={isMobile ? "m-link-m" : "link-m"}
                  onClick={() => handleRedirect(7)}>
                  {CONSTANTS?.SEE_MORE}
                </Typography>
              )}
            </ContentBox>
            <ContentBox $select={selected === "2"}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
                variant={isMobile ? "m-heading-m" : "heading-m"}>
                {epicureCardDetails?.isPrivilegedMember
                  ? CONSTANTS?.EPICURE_PRIVILEGED
                  : epicureCardDetails?.isPreferredMember
                  ? CONSTANTS?.EPICURE_PREFERRED
                  : epicureCardDetails?.isCorpMember
                  ? CONSTANTS?.EPICURE_BANK
                  : global?.window?.localStorage?.getItem("epicureMemberTier")}
              </Typography>
              <Box>
                <Typography
                  variant={isMobile ? "m-body-sl" : "body-m"}
                  mt={1}>{`${EPICURE_NUMBER}: ${global?.window?.localStorage?.getItem("userPhoneNumber")}`}</Typography>
                {seeMore && (
                  <Typography
                    sx={{
                      cursor: "pointer",
                      paddingLeft: isMobile ? "0.966vw" : "0.44vw",
                    }}
                    variant={isMobile ? "m-link-m" : "link-m"}
                    onClick={() => handleRedirect(7)}>
                    {CONSTANTS?.SEE_MORE}
                  </Typography>
                )}
              </Box>
            </ContentBox>
          </Stack>
        </MembershipDetailsStack>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        <ACHighlightsStack>
          {membershipRenewalCard?.length > 0 && (
            <BoxWrapper onClick={() => handleRedirect(7)}>
              <CountLabelTypography variant={isMobile ? "m-body-s" : "body-s"} fontWeight={400}>
                {NO_OF_RENEWALS}
              </CountLabelTypography>
              <Typography
                variant={isMobile ? "m-heading-m" : "heading-l"}
                sx={{ marginTop: isMobile ? MobilePxToVw(10) : 0 }}>
                {membershipRenewalCard?.length}
              </Typography>
            </BoxWrapper>
          )}
          <BoxWrapper onClick={() => handleRedirect(1)}>
            <CountLabelTypography variant={isMobile ? "m-body-s" : "body-s"} fontWeight={400}>
              {NO_OF_BOOKINGS}
            </CountLabelTypography>
            <Typography
              variant={isMobile ? "m-heading-m" : "heading-l"}
              sx={{ marginTop: isMobile ? MobilePxToVw(10) : 0 }}>
              {userAccountOverview?.hotelBookings?.upComingCount
                ? userAccountOverview?.hotelBookings?.upComingCount
                : 0}
            </Typography>
          </BoxWrapper>
          <BoxWrapper onClick={() => handleRedirect(2)}>
            <CountLabelTypography variant={isMobile ? "m-body-s" : "body-s"} fontWeight={400}>
              {NO_OF_VOUCHERS}
            </CountLabelTypography>
            <Typography variant={isMobile ? "m-heading-m" : "heading-l"}>
              {userAccountOverviewVouchers?.count ? userAccountOverviewVouchers?.count : 0}
            </Typography>
          </BoxWrapper>
          <BoxWrapper onClick={() => handleRedirect(4)}>
            <CountLabelTypography variant={isMobile ? "m-body-s" : "body-s"} fontWeight={400}>
              {OFFERS}
            </CountLabelTypography>
            <Typography variant={isMobile ? "m-heading-m" : "heading-l"}>
              {userAccountOffers?.length > 0 ? userAccountOffers?.length : 0}
            </Typography>
          </BoxWrapper>

          {/* <BoxWrapper>
            <CountLabelTypography variant={isMobile ? "m-body-s" : "body-s"}>
              {NO_OF_GIFT_CARDS}
            </CountLabelTypography>
            <Typography variant={isMobile ? "m-heading-m" : "heading-l"}>
              {accountStore?.myAccountData?.giftCards?.count
                ? accountStore?.myAccountData?.giftCards?.count
                : 0}
            </Typography>
          </BoxWrapper> */}
        </ACHighlightsStack>
      </Grid>
    </GridContainer>
  )
}

export default observer(AccountHeaderComponent)
