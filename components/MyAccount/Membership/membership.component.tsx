import { Box, Stack, Typography } from "@mui/material"
import MembershipCard from "./common/membership-card.component"
import { useContext, useEffect, useState } from "react"
import fetchMembershipDetails from "../../../utils/fetchMembershipData"
import { observer } from "mobx-react-lite"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import { formatDateWithMON } from "../../../utils/getDate"
import { ROUTES } from "../../../utils/routes"
import { useMobileCheck } from "../../../utils/isMobilView"
import { MainContainer, TitleBox, TitleTypography } from "./common/styles"
import { theme } from "../../../lib/theme"
import { CONSTANTS } from "../../constants"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { UserAccountStore } from "../../../store"
import { EPICURE_TAB, NEU_PASS_TAB, CHAMBERS_TAB } from "../../forms/gift-card-form/constants"
const MembershipComponent = ({ title, primaryAction, secondaryAction }: any) => {
  const globalContext = useContext(IHCLContext)
  const globalAccountStore: any = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore

  const pageContextUse = useContext(PageContext)
  //store
  const { accountStore, activeTierLabel }: any = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore,
  ) as AccountStore

  const [item, setItem] = useState({
    membership: "",
    image: {},
    tier: "",
    coinBalance: "",
    startDate: "",
    actionLinks: [
      {
        link: `${ROUTES?.MY_ACCOUNT?.OVERVIEW}?tab=transactions_summary`,
        text: "VIEW TRANSACTIONS",
      },
    ],
  })

  const [chambersItem, setChambersItem] = useState({
    membership: "",
    image: {},
    premiumBalance: "",
    startDate: "",
    expiryDate: "",
  })

  const [epicureCards, setEpicureCards] = useState<any[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountStore?.currentUserNeuCoins])

  useEffect(() => {
    setEpicureCards(globalAccountStore?.epicureCards)
    setItem({
      ...item,
      coinBalance: globalAccountStore?.neuPassCard?.coinBalance || "",
      membership: globalAccountStore?.neuPassCard?.membership || "",
      image: globalAccountStore?.neuPassCard?.image || {},
      tier: globalAccountStore?.neuPassCard?.tier || "",
      startDate: globalAccountStore?.neuPassCard?.startDate || "",
    })
    setChambersItem(() => {
      return {
        ...chambersItem,
        membership: globalAccountStore?.chambersCard?.membership || "",
        image: globalAccountStore?.chambersCard?.image || {},
        premiumBalance: globalAccountStore?.chambersCard?.premiumBalance || "",
        startDate: globalAccountStore?.chambersCard?.startDate || "",
        expiryDate: globalAccountStore?.chambersCard?.expiryDate || "",
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalAccountStore?.chambersCard, globalAccountStore?.epicureCards, globalAccountStore?.neuPassCard])

  const isMobile = useMobileCheck()

  return (
    <MainContainer>
      {activeTierLabel == CHAMBERS_TAB || activeTierLabel == "" ? (
        <>
          <Stack
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: isMobile ? "center" : "",
              textAlign: isMobile ? "center" : "start",
            }}>
            <Typography
              variant={isMobile ? "m-heading-s" : "heading-m"}
              sx={{ fontSize: isMobile ? "5vw" : "2.083vw" }}>
              {title}
            </Typography>
          </Stack>

          {global?.window?.localStorage?.getItem("chambersMemberTier") && <MembershipCard membership={chambersItem} />}
        </>
      ) : (
        ""
      )}
      {activeTierLabel == NEU_PASS_TAB || activeTierLabel == "" ? <MembershipCard membership={item} /> : ""}
      {activeTierLabel == EPICURE_TAB || activeTierLabel == "" ? (
        <>
          {global?.window?.localStorage?.getItem("epicureMemberTier") && epicureCards?.length > 0 && (
            <Box
              sx={{
                marginTop: isMobile ? "5.469vw" : "",
                border: `1px solid ${theme?.palette?.ihclPalette?.hexSixteen}`,
                "&>div": {},
                marginBottom: "2vw",
              }}>
              <TitleBox
                sx={{
                  marginTop: isMobile ? "5.465vw !important" : "1.042vw",
                  "&~div": {
                    borderWidth: "0vw!important",
                  },
                }}>
                <TitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>{CONSTANTS?.EPICURE}</TitleTypography>
              </TitleBox>
              {epicureCards?.map((cards: any, index: number) => (
                <MembershipCard
                  membership={cards}
                  key={index}
                  primaryAction={primaryAction}
                  secondaryAction={secondaryAction}
                />
              ))}
            </Box>
          )}
        </>
      ) : (
        ""
      )}
    </MainContainer>
  )
}
export default observer(MembershipComponent)
