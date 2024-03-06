import dynamic from "next/dynamic"
import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useCallback, useState } from "react"
import { GLOBAL_STORES, PAGE_STORES } from "../../../utils/Constants"
import { UserAccountStore, UserStore } from "../../../store"
import { GridWrapper, LogoutBottomDivider } from "../my-account.styles"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useLoggedIn } from "../../../utils/hooks/useLoggedIn"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import AccountStore from "../../../features/my-account/store/pageStore/account.store"
import { formatDateWithMON } from "../../../utils/getDate"
import fetchMembershipDetails from "../../../utils/fetchMembershipData"
import { ROUTES } from "../../../utils/routes"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useRouter } from "next/router"

const AccountHeaderComponent = dynamic(() => import("./account-header.component"))
const AccountHeaderLogout = dynamic(() => import("./account-header-logout.component"))

const AccountDetails = () => {
  const router = useRouter()
  const globalContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [cardCount, setCardCount] = useState(0)
  const [epicureCardDetails, setEpicureCardDetails] = useState<{
    isPrivilegedMember: boolean
    isPreferredMember: boolean
    isCorpMember: boolean
  }>({ isPrivilegedMember: false, isPreferredMember: false, isCorpMember: false })
  const accountStore: any = globalContext?.getGlobalStore(GLOBAL_STORES.userAccountStore) as UserAccountStore
  const pageContextUse = useContext(PageContext)

  //page store
  const pageAccountStore = pageContextUse?.getPageStore(PAGE_STORES.ACCOUNT_STORES.myAccountStore) as AccountStore

  const userLoggedIn = useLoggedIn()

  const hidePaths = [ROUTES?.MY_ACCOUNT?.BOOKING_DETAILS]

  const hideDetails = hidePaths?.includes(global?.window?.location?.pathname) && isMobile

  useEffect(() => {
    accountStore?.fetchUserOverviewVouchersData()
    accountStore?.epicureMemberShipDetails()
    accountStore?.fetchMemberExclusiveOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    accountStore?.fetchUserOverviewData()
  }, [accountStore, router.query.pid])

  const MemberShipDetails = useCallback(async () => {
    const response = await fetchMembershipDetails()
    if (response) {
      response?.map((card: any) => {
        if (
          global?.window?.localStorage?.getItem("userTier")?.toLocaleLowerCase()?.includes(card?.tier?.toLowerCase()) &&
          card?.tier
        ) {
          const image = card?.image
          const membership = card?.type?.toUpperCase()
          const tier = `${card?.tier?.toUpperCase()}`
          const coinBalance = `${pageAccountStore?.currentUserNeuCoins}`
          const startDate = global?.window?.localStorage?.getItem("neupassStartDateInfo")
            ? formatDateWithMON(global?.window?.localStorage?.getItem("neupassStartDateInfo"))
            : ""
          accountStore?.updateNeuPassCardData(image, membership, tier, coinBalance, startDate)
        }
        if (
          global?.window?.localStorage
            ?.getItem("chambersMemberTier")
            ?.toLocaleLowerCase()
            ?.includes(card?.tier?.toLowerCase())
        ) {
          const image = card?.image
          const membership =
            global?.window?.localStorage?.getItem("chambersMemberTier")?.toLowerCase() === "chambersglobal"
              ? "THE CHAMBERS (GLOBAL MEMBER)"
              : "THE CHAMBERS (NATIONAL MEMBER)"
          const premiumBalance = card?.price
          const startDate = global?.window?.localStorage?.getItem("chambersMemberStartDate")
            ? formatDateWithMON(global?.window?.localStorage?.getItem("chambersMemberStartDate"))
            : ""
          const expiryDate = global?.window?.localStorage?.getItem("chambersMemberEndDate")
            ? formatDateWithMON(global?.window?.localStorage?.getItem("chambersMemberEndDate"))
            : ""
          accountStore?.updateChambersCardData(image, membership, premiumBalance, startDate, expiryDate)
        }
      })
    }
    if (accountStore?.epicureMemberShipCards?.length > 0 && response) {
      let formedData: any[] = []
      let formedRenewalData: any[] = []
      const epicureCardData: any = accountStore?.epicureMemberShipCards?.map((item: any, index: number) => {
        const epicureCMS = response.find(
          (cItem: any) =>
            cItem.tier?.toLowerCase() === item.membership_plan_code?.toLowerCase() ||
            cItem?.planCode?.toLowerCase() === item.membership_plan_code?.toLowerCase(),
        )
        const currentDate: any = new Date()
        const expiryDate: any = new Date(item?.card_expiry_date)
        const differenceInDays = Math.ceil((expiryDate - currentDate) / (1000 * 60 * 60 * 24))
        if (
          Number(differenceInDays) <= Number(epicureCMS?.renewal?.validityPeriod) &&
          item?.card_status?.toLowerCase() === "active" &&
          Number(epicureCMS?.totalPrice) !== 0
        ) {
          const renewalAddOnData = {
            name: item?.spouse_name,
            email: item?.spouse_email_address,
            phoneNumber: item?.spouse_phone_number,
            planId: item?.membership_plan_id,
          }
          const renewalPrimaryData = {
            image: epicureCMS?.image,
            bankName: epicureCMS?.bankName,
            type: epicureCMS?.type,
            startDate: formatDateWithMON(new Date(item?.card_start_date)),
            expiryDate: formatDateWithMON(new Date(item?.card_expiry_date)),
            membership: item?.membership_plan_code,
            planId: item?.membership_plan_id,
            renewalDiscountPrice: epicureCMS?.renewal?.discountPrice,
            renewalTax: epicureCMS?.renewal?.tax,
            renewalPrice: epicureCMS?.renewal?.totalPrice,
            discountPercentage: epicureCMS?.renewal?.discountPercentage,
            primaryAction: epicureCMS?.renewal?.primaryAction,
          }
          let FoundRenewalIndex = -1
          const foundRenewalValue = formedRenewalData.find((cItem, cIndex) => {
            const isMatched =
              cItem?.primary?.planId == item?.membership_plan_id || cItem?.addOn?.planId == item?.membership_plan_id
            FoundRenewalIndex = isMatched ? cIndex : -1
            return isMatched
          })
          const keyName = item?.card_type === "ADD-ON" ? "addOn" : item?.card_type?.toLowerCase()
          const returnRenewalData = keyName === "addOn" ? renewalAddOnData : renewalPrimaryData
          if (foundRenewalValue) {
            const updateRenewalData = {
              ...foundRenewalValue,
              [keyName]: returnRenewalData,
            }
            formedRenewalData.splice(FoundRenewalIndex, 1, updateRenewalData)
          } else {
            formedRenewalData.push({
              [keyName]: returnRenewalData,
            })
          }
        } else if (
          (epicureCMS?.type?.toLowerCase() == "epicure" || epicureCMS?.type?.toLowerCase() == "epicurebank") &&
          item?.card_status?.toLowerCase() === "active"
        ) {
          if (item?.membership_plan_code?.toLowerCase() === "privileged") {
            setEpicureCardDetails((prev: any) => {
              return {
                ...prev,
                isPrivilegedMember: true,
              }
            })
          }
          if (item?.membership_plan_code?.toLowerCase() === "preferred") {
            setEpicureCardDetails((prev: any) => {
              return {
                ...prev,
                isPreferredMember: true,
              }
            })
          }
          if (epicureCMS?.type?.toLowerCase() == "epicurebank") {
            setEpicureCardDetails((prev: any) => {
              return {
                ...prev,
                isCorpMember: true,
              }
            })
          }
          const addOnData = {
            name: item?.spouse_name,
            email: item?.spouse_email_address,
            phoneNumber: item?.spouse_phone_number,
            planId: item?.membership_plan_id,
          }
          const primaryData = {
            image: epicureCMS?.image,
            premiumBalance: epicureCMS?.totalPrice,
            bankName: epicureCMS?.bankName,
            type: epicureCMS?.type,
            startDate: formatDateWithMON(new Date(item?.card_start_date)),
            expiryDate: formatDateWithMON(new Date(item?.card_expiry_date)),
            membership: item?.membership_plan_code,
            planId: item?.membership_plan_id,
          }
          let FoundIndex = -1
          const foundValue = formedData.find((cItem, cIndex) => {
            const isMatched =
              cItem?.primary?.planId == item?.membership_plan_id || cItem?.addOn?.planId == item?.membership_plan_id
            FoundIndex = isMatched ? cIndex : -1
            return isMatched
          })
          const keyName = item?.card_type === "ADD-ON" ? "addOn" : item?.card_type?.toLowerCase()
          const returnData = keyName === "addOn" ? addOnData : primaryData
          if (foundValue) {
            const updateData = {
              ...foundValue,
              [keyName]: returnData,
            }
            formedData?.splice(FoundIndex, 1, updateData)
          } else {
            formedData?.push({
              [keyName]: returnData,
            })
          }
        }
      })
      const filteredData: any = formedData?.filter((item: any) => item?.primary)
      const filteredRenewalData: any = formedRenewalData?.filter((item: any) => item?.primary)
      setCardCount(filteredData?.length)
      accountStore?.updateEpicureCardsData(filteredData)
      accountStore?.updateRenewalCardsData(filteredRenewalData)
    }
  }, [accountStore, pageAccountStore])

  useEffect(() => {
    if (accountStore?.epicureMemberShipCards) {
      MemberShipDetails()
    }
  }, [MemberShipDetails, accountStore?.epicureMemberShipCards])

  return (
    <GridWrapper>
      {userLoggedIn && (
        <>
          <AccountHeaderLogout />
          {!hideDetails && (
            <>
              <LogoutBottomDivider />
              <AccountHeaderComponent cardCount={cardCount} epicureCardDetails={epicureCardDetails} />
            </>
          )}
        </>
      )}
    </GridWrapper>
  )
}

export default observer(AccountDetails)
