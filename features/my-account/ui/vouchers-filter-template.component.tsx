import React, { Fragment, useContext, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { groq } from "next-sanity"
import { theme } from "../../../lib/theme"
import { observer } from "mobx-react-lite"
import { getClient } from "../../../lib-sanity"
import { Box, Select, Typography } from "@mui/material"
import { PAGE_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import AccountStore from "../store/pageStore/account.store"
import { useAesthetics } from "../../../utils/fetchAsthetics"
import { OVER_VIEW_VOUCHERS } from "../../../components/constants"
import { FormSelectArrowIcon } from "../../../components/forms/common/form-components"
import { PageContext } from "../../../PresentationalComponents/lib/prepare-page-context"
import {
  FilterStack,
  DropDownsStack,
  VerticalDivider,
  StyledInputLabel,
  TabsContainerStack,
  VoucherFormControl,
  VoucherTitleContainer,
  VoucherFilterMenuItem,
  VoucherTitleTypography,
  VoucherSectionContainer,
} from "./styles/vouchers-filter-template"
import {
  NoBookingsSection,
  NoBookingsSectionText,
} from "../../../components/MyAccount/over-view/styles/render-over-view"

const VoucherCard = dynamic(() => import("./voucher-card.component"))
const LoadingSpinner = dynamic(() => import("../../../utils/SpinnerComponent"))

//? Membership dropdown data, need to replace with CMS data once get it
const memberShipTypes: any = {
  mobileMembershipType: "Memberships",
  webMembershipType: "Select Memberships",
  memberShip: [],
  redeemedVoucherMembershipLabels: [],
}

/**
 * @returns
 * *Vouchers template UI in My Account voucher tab section
 */
const VouchersFilterTemplate = (props: any) => {
  const isMobile = useMobileCheck()
  const pageContextUse = useContext(PageContext)
  const status: any = [{ title: "AVAILABLE" }, { title: "REDEEMED" }]
  const { cardBackgroundColor } = useAesthetics(props?.aesthetic?._ref)
  const memberExists: any =
    global?.window?.localStorage?.getItem("epicureMemberID") ||
    global?.window?.localStorage?.getItem("chambersMemberID")

  const [selectedLabel, setSelectedLabel] = useState("")
  const [cmsVouchersData, setCMSVouchersData] = useState([])
  const [selectedLabelType, setSelectedLabelType] = useState("")
  const [filteredVouchers, setFilteredVouchers] = useState<any>([])
  const [userSelectedVouchers, setUserSelectedVouchers] = useState<any>()
  const [selectedStatus, setSelectedStatus] = useState<string>("AVAILABLE")
  const [VoucherCategoryOptions, setVoucherCategoryOptions] = useState<any>([])
  const [membershipDropdownOpen, setMembershipDropdownOpen] = useState<boolean>(false)
  const [offerDropdownOpen, setOfferDropdownOpen] = useState<boolean>(false)
  const isBenefitsProductCategory =
    props?.parameterMap?.filter((item: any) => item?.key === "identifier")?.[0]?.value === "benefits"
  //?Remove duplicates
  const removeDuplicates = (arr: any, objKey: string): any[] => {
    if (Array?.isArray(arr) && arr?.length > 0) {
      let unique: any = []
      arr?.forEach((element: any) => {
        if (element?.[objKey] && !unique?.includes(element?.[objKey])) {
          unique?.push(element?.[objKey])
        }
      })
      const othersCheck = [...unique]?.findIndex((item: any) => {
        return item?.toLowerCase() === "others"
      })

      if (othersCheck > -1) {
        const temp = unique[unique?.length - 1]
        unique[unique?.length - 1] = unique[othersCheck]
        unique[othersCheck] = temp
      }
      return ["ALL", ...unique]
    } else {
      return []
    }
  }

  //? Offers dropdown data, need to replace with CMS data once get it
  const offerCategory: any = {
    mobileOfferType: "Category",
    webOfferType: `Select ${isBenefitsProductCategory ? "Benefits" : "Vouchers"} Category`,
    offers: [
      { offer: "All", labelType: "all" },
      { offer: "Stay", labelType: "stay" },
      { offer: "Dining", labelType: "dining" },
      { offer: "Spa", labelType: "spa" },
      { offer: "Experience", labelType: "experience" },
      { offer: "Others", labelType: "others" },
    ],
  }

  const updateStatusData = (status: any) => {
    const userSelectedVouchers =
      status?.toLowerCase() === "available" ? userVouchers?.pendingVouchers : userVouchers?.redeemedVouchers
    const memberVouchers =
      selectedLabel?.toLowerCase() === "all" || selectedLabel === ""
        ? userSelectedVouchers
        : userSelectedVouchers
            ?.map((innerArray: any) =>
              innerArray?.filter(
                (obj: any) => obj?.label && obj?.label?.toLowerCase() === selectedLabel?.toLowerCase(),
              ),
            )
            ?.filter((innerArray: any) => innerArray?.length > 0)
    const categoryOptions = removeDuplicates(memberVouchers?.flat(), "labelType")?.map((item: any) => ({
      offer: item,
    }))
    setVoucherCategoryOptions(() => categoryOptions)

    const filtered =
      selectedLabelType?.toLowerCase() === "all" || selectedLabelType === ""
        ? memberVouchers
        : memberVouchers
            ?.map((innerArray: any) =>
              innerArray?.filter((obj: any) => obj?.labelType?.toLowerCase() === selectedLabelType?.toLowerCase()),
            )
            ?.filter((innerArray: any) => innerArray?.length > 0)
    setFilteredVouchers(() => filtered)
  }

  const fetchVouchersData = async () => {
    let data
    const query = groq`
    *[_type == "vouchers"] {title,thumbnail,description}`
    await getClient(true)
      .fetch(query)
      .then((res) => {
        setCMSVouchersData(res)
        data = res
      })
      .catch((err) => {
        data = err
      })
    return data
  }

  const { userVouchers, setUserVouchers, loading }: any = pageContextUse?.getPageStore(
    PAGE_STORES.ACCOUNT_STORES.myAccountStore,
  ) as AccountStore

  useEffect(() => {
    if (memberExists) {
      setUserVouchers(props?.parameterMap?.filter((item: any) => item?.key === "identifier")?.[0]?.value)
      fetchVouchersData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberExists, props?.parameterMap])

  const getDynamicFilters = (allVouchers: any) => {
    const allExtendedVouchers = allVouchers?.pendingVouchers?.flat()?.concat(allVouchers?.pendingVouchers?.flat())
    const allRedeemedVouchers = allVouchers?.redeemedVouchers?.flat()?.concat(allVouchers?.redeemedVouchers?.flat())

    const isTheChambersExists = allExtendedVouchers?.some(
      (voucher: any) => voucher.label?.toLowerCase() === "the chambers",
    )
    const isEpicureExists = allExtendedVouchers?.some((voucher: any) => voucher.label?.toLowerCase() === "epicure")

    const redeemedChambersVouchers = allRedeemedVouchers?.some(
      (voucher: any) => voucher.label?.toLowerCase() === "the chambers",
    )
    const redeemedEpicureVouchers = allRedeemedVouchers?.some(
      (voucher: any) => voucher.label?.toLowerCase() === "epicure",
    )

    // Check if membership type already exists before pushing
    const doesAllExist = memberShipTypes?.memberShip?.some((membership: any) => membership.type === "All")
    const doesEpicureExist = memberShipTypes?.memberShip?.some((membership: any) => membership.type === "Epicure")
    const doesTheChambersExist = memberShipTypes?.memberShip?.some(
      (membership: any) => membership.type === "The Chambers",
    )

    //redeemed Condition
    const redeemedAllExist = memberShipTypes?.redeemedVoucherMembershipLabels?.some(
      (membership: any) => membership.type === "All",
    )
    const redeemedChambersExist = memberShipTypes?.redeemedVoucherMembershipLabels?.some(
      (membership: any) => membership.type === "The Chambers",
    )
    const redeemedEpicureExist = memberShipTypes?.redeemedVoucherMembershipLabels?.some(
      (membership: any) => membership.type === "Epicure",
    )

    //Available condition
    if (isEpicureExists && !doesEpicureExist) {
      memberShipTypes?.memberShip?.push({ type: "Epicure", label: "epicure", displayName: "Epicure" })
    }
    if (isTheChambersExists && !doesTheChambersExist) {
      memberShipTypes?.memberShip?.push({ type: "The Chambers", label: "chamber", displayName: "The Chambers" })
    }
    if (memberShipTypes?.memberShip?.length > 1 && !doesAllExist) {
      memberShipTypes?.memberShip?.unshift({ type: "All", label: "all", displayName: " All" })
    }

    //redeemed conition
    if (redeemedChambersVouchers && !redeemedChambersExist) {
      memberShipTypes?.redeemedVoucherMembershipLabels?.push({
        type: "The Chambers",
        label: "chamber",
        displayName: "The Chambers",
      })
    }
    if (redeemedEpicureVouchers && !redeemedEpicureExist) {
      memberShipTypes?.redeemedVoucherMembershipLabels?.push({
        type: "Epicure",
        label: "epicure",
        displayName: "Epicure",
      })
    }
    if (memberShipTypes?.redeemedVoucherMembershipLabels?.length > 1 && !redeemedAllExist) {
      memberShipTypes?.redeemedVoucherMembershipLabels?.unshift({ type: "All", label: "all", displayName: " All" })
    }
  }
  useEffect(() => {
    getDynamicFilters(userVouchers)

    //for clearing the select labels after tabs changing
    setSelectedLabel("")

    if (selectedStatus?.toLowerCase() === "available") {
      setUserSelectedVouchers(userVouchers?.pendingVouchers)
    } else {
      setUserSelectedVouchers(userVouchers?.redeemedVouchers)
    }
  }, [selectedStatus, userVouchers, userVouchers?.pendingVouchers, userVouchers?.redeemedVouchers])

  useEffect(() => {
    updateStatusData(selectedStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedLabel, userVouchers?.pendingVouchers, userVouchers?.redeemedVouchers, selectedLabelType])

  const filteredVoucherDetails =
    selectedStatus?.toLowerCase() === "available"
      ? memberShipTypes?.memberShip?.filter((memberDetail: any) => {
          const foundValue = userVouchers?.pendingVouchers?.filter(
            (item: any) => memberDetail?.label?.toLowerCase() === item?.label?.toLowerCase(),
          )
          return foundValue || memberDetail?.label === "all"
        })
      : memberShipTypes?.redeemedVoucherMembershipLabels?.filter((memberDetail: any) => {
          const foundValue = userVouchers?.pendingVouchers?.filter(
            (item: any) => memberDetail?.label?.toLowerCase() === item?.label?.toLowerCase(),
          )
          return foundValue || memberDetail?.label === "all"
        })
  return (
    <Box>
      {loading && <LoadingSpinner />}
      <VoucherSectionContainer sx={{ marginBottom: isMobile ? "17.188vw" : "" }} aria-label="VouchersFilterTemplate">
        <FilterStack>
          <VoucherTitleContainer>
            <VoucherTitleTypography variant={isMobile ? "m-heading-s" : "heading-s"}>
              {props?.title}
            </VoucherTitleTypography>
          </VoucherTitleContainer>
          <TabsContainerStack>
            {status?.map((item: any, index: number) => (
              <Fragment key={index}>
                <Typography
                  key={index}
                  variant={isMobile ? "m-body-sl" : "body-ml"}
                  sx={{
                    cursor: "pointer",
                    color:
                      item?.title === selectedStatus
                        ? theme?.palette?.ihclPalette?.hexTwo
                        : theme?.palette?.ihclPalette?.hexSeventeen,
                  }}
                  onClick={() => {
                    setSelectedStatus(item?.title)
                    updateStatusData(item?.title)
                  }}>
                  {item?.title}
                </Typography>
                {index < 1 && <VerticalDivider orientation="vertical" />}
              </Fragment>
            ))}
          </TabsContainerStack>
        </FilterStack>
        {(userVouchers?.pendingVouchers?.length > 0 || userVouchers?.redeemedVouchers?.length > 0) && (
          <DropDownsStack>
            {/*  membershipType DropDown  */}
            <VoucherFormControl sx={{ width: isMobile ? "100%" : "12.24vw" }} variant="standard">
              <StyledInputLabel id="member-input-label">
                {isMobile ? memberShipTypes?.mobileMembershipType : memberShipTypes?.webMembershipType}
              </StyledInputLabel>
              <Select
                id="member-input"
                variant="standard"
                open={membershipDropdownOpen}
                label={selectedLabel}
                value={selectedLabel}
                sx={{ width: "100%" }}
                labelId="member-input-label"
                onChange={(e: any) => setSelectedLabel(e?.target?.value)}
                onOpen={() => {
                  setMembershipDropdownOpen(true)
                }}
                onClose={() => {
                  setTimeout(() => {
                    ;(document?.activeElement as HTMLElement)?.blur()
                  }, 0)
                  setMembershipDropdownOpen(false)
                }}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                      backgroundColor: theme?.palette?.background?.default,
                    },
                  },
                }}
                IconComponent={(props: any) => <FormSelectArrowIcon {...props} />}>
                {filteredVoucherDetails?.map((item: any, index: number) => (
                  <VoucherFilterMenuItem key={index} value={item?.type}>
                    {item?.displayName}
                  </VoucherFilterMenuItem>
                ))}
              </Select>
            </VoucherFormControl>
            {/* Offers DropDown */}
            <VoucherFormControl sx={{ width: isMobile ? "100%" : "13.229vw" }} variant="standard">
              <StyledInputLabel id="offer-input-label">
                {isMobile ? offerCategory?.mobileOfferType : offerCategory?.webOfferType}
              </StyledInputLabel>
              <Select
                id="offer-input"
                variant="standard"
                open={offerDropdownOpen}
                sx={{ width: "100%" }}
                label={selectedLabelType}
                value={selectedLabelType}
                labelId="offer-input-label"
                onChange={(e: any) => setSelectedLabelType(e?.target?.value)}
                onOpen={() => {
                  setOfferDropdownOpen(true)
                }}
                onClose={() => {
                  setTimeout(() => {
                    ;(document?.activeElement as HTMLElement)?.blur()
                  }, 0)
                  setOfferDropdownOpen(false)
                }}
                MenuProps={{
                  PaperProps: {
                    elevation: 0,
                    sx: {
                      maxHeight: 300,
                      backgroundColor: theme?.palette?.background?.default,
                      borderRadius: "0",
                      boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
                IconComponent={(props: any) => <FormSelectArrowIcon {...props} />}>
                {VoucherCategoryOptions?.map((item: any, index: number) => (
                  //? below conversion is =>> STAY to Stay
                  <VoucherFilterMenuItem key={index} value={item?.offer}>
                    {item?.offer?.[0]?.toUpperCase() + item?.offer?.slice(1)?.toLowerCase()}
                  </VoucherFilterMenuItem>
                ))}
              </Select>
            </VoucherFormControl>
          </DropDownsStack>
        )}
        {filteredVouchers?.length > 0 ? (
          <>
            <VoucherCard
              getCardBackgroudColor={cardBackgroundColor ? true : false}
              primaryAction={props?.primaryAction}
              selectedStatus={selectedStatus}
              filteredVouchers={filteredVouchers}
              cmsVouchersData={cmsVouchersData}
              productCategory={isBenefitsProductCategory}
            />
          </>
        ) : (
          <NoBookingsSection $mobile={isMobile}>
            <NoBookingsSectionText $mobile={isMobile}>{OVER_VIEW_VOUCHERS}</NoBookingsSectionText>
          </NoBookingsSection>
        )}
      </VoucherSectionContainer>
    </Box>
  )
}

export default observer(VouchersFilterTemplate)
