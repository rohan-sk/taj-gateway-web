import { useRouter } from "next/router"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { observer } from "mobx-react-lite"
import { Grid, Typography } from "@mui/material"
import { PAGE_STORES } from "../../utils/Constants"
import { formatDateWithMON } from "../../utils/getDate"
import { currencyPrettier } from "../../utils/currency"
import { useMobileCheck } from "../../utils/isMobilView"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import React, { useContext, useEffect, useMemo } from "react"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import { firstName, lastName, membershipType } from "../forms/gift-card-form/constants"
import LoyaltyConfirmationPageStore from "../../features/loyalty/store/pageStore/loyaltyConfirmation.store"
import { CustomSubGridStyle, CustomMainGridStyle } from "./styles/membership-purchase-detail-card-component"

type parameterMapItem = {
  key: string
  value: string
}

interface MembershipPurchaseDetailCardProps {
  urlType: string
  parameterMap?: parameterMapItem[]
  isMultiBlockContent?: boolean
}

const MembershipPurchaseDetailCardComponent = (props: MembershipPurchaseDetailCardProps) => {
  //USED IN EPICURE ENROLLMENT SUCCESSFUL
  const pageContext = useContext(PageContext)
  const router = useRouter()
  const loyaltyEpicureStore = pageContext?.getPageStore(
    PAGE_STORES?.LOYALTY_STORES.loyaltyConfirmationStore,
  ) as LoyaltyConfirmationPageStore

  const CmsData = props?.parameterMap
  const confirmOrderDetails = useMemo(() => {
    const filteredData = CmsData?.map((item: any) => {
      const apiData = Object.entries(loyaltyEpicureStore?.loyaltyConfirmationResponse)
      let obj = {}
      apiData.map(([key, value]: any) => {
        if (item?.key?.toLowerCase() === "firstname" && key?.toLowerCase() === "buyername") {
          obj = {
            [firstName]: value?.split(" ")[0],
          }
        }
        if (item?.key?.toLowerCase() === "lastname" && key?.toLowerCase() === "buyername") {
          obj = {
            [lastName]: value?.split(" ")[1],
          }
        }
        if (item?.key?.toLowerCase() === "membershiptype" && key?.toLowerCase() === "products") {
          obj = {
            [membershipType]: `EPICURE ${value?.[0]?.type}`,
          }
        }
        if (item?.key === key && key === "dateOfBirth") {
          obj = {
            [key]: formatDateWithMON(value),
          }
        } else if (item?.key === key) {
          obj = {
            [key]: value && value != undefined ? value : "NA",
          }
        }
      })
      return {
        ...item,
        ...obj,
      }
    })
    return filteredData
  }, [CmsData, loyaltyEpicureStore])

  useEffect(() => {
    if (global?.window?.localStorage?.getItem("customerHash") !== null) {
      if (
        global?.window?.localStorage?.getItem("epicureMemberTier") === null ||
        global?.window?.localStorage?.getItem("epicureMemberTier") === "null"
      ) {
        global?.window?.localStorage?.setItem(
          "epicureMemberTier",
          loyaltyEpicureStore?.loyaltyConfirmationResponse?.products?.[0]?.type?.toUpperCase(),
        )
      }
      if (
        global?.window?.localStorage?.getItem("epicureMemberID") === null ||
        global?.window?.localStorage?.getItem("epicureMemberID") === "null"
      ) {
        global?.window?.localStorage?.setItem(
          "epicureMemberID",
          loyaltyEpicureStore?.loyaltyConfirmationResponse?.membershipId,
        )
      }
    }
  }, [
    loyaltyEpicureStore?.loyaltyConfirmationResponse?.membershipId,
    loyaltyEpicureStore?.loyaltyConfirmationResponse?.products,
  ])

  const isMobile = useMobileCheck()
  const OrderConfirmationDetails =
    router?.query?.programType === "bank" ? confirmOrderDetails?.slice(2) : confirmOrderDetails?.slice(1)

  return (
    <>
      <CustomMainGridStyle container>
        {props?.parameterMap?.map((field: any, index: number) => {
          return (
            field?.value === "YOUR MEMBERSHIP ID" && (
              <CustomSubGridStyle xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
                {field?.value && (
                  <Grid item xs={12}>
                    <Typography variant={isMobile ? "m-body-l" : "body-l"}>{field?.value}</Typography>
                  </Grid>
                )}
                {loyaltyEpicureStore?.loyaltyConfirmationResponse?.membershipId && (
                  <Typography
                    variant={isMobile ? "m-body-l" : "body-l"}
                    sx={{
                      color: theme?.palette?.primary?.main,
                      fontWeight: 400,
                      fontFamily: theme?.palette?.font?.primaryFontFamily,
                    }}>
                    {loyaltyEpicureStore?.loyaltyConfirmationResponse?.membershipId}
                  </Typography>
                )}
              </CustomSubGridStyle>
            )
          )
        })}
        {confirmOrderDetails && (
          <>
            {OrderConfirmationDetails?.map((item: any, index: number) => {
              const data = item[item?.key]
              let title = ""
              if (data !== (null || undefined) && typeof data === "string") {
                title = data
              } else if (data !== (null || undefined)) {
                Object?.values(data).map((item, index) => {
                  title += item
                })
              }
              return (
                <CustomSubGridStyle
                  xs={12}
                  sm={isMobile ? 12 : index + 4 < 11 ? 5 : 12}
                  md={index + 3 < 11 ? 4 : 12}
                  lg={index + 3 < 11 ? 4 : 12}
                  xl={index + 3 < 11 ? 4 : 12}
                  key={index}>
                  {item?.value && (
                    <>
                      <Grid
                        flexDirection="column"
                        container
                        rowGap={isMobile ? MobilePxToVw(10) : ""}
                        sx={{
                          marginBottom: isMobile ? MobilePxToVw(8) : "",
                        }}>
                        <Grid item>
                          <Typography variant={isMobile ? "m-body-m" : "body-m"}>{item?.value}</Typography>
                        </Grid>
                        <Grid item>
                          {title ? (
                            <Typography
                              variant={isMobile ? "m-heading-xs" : "heading-xs"}
                              sx={{
                                textTransform: "uppercase",
                                lineBreak: "anywhere",
                              }}>
                              {item?.value === CONSTANTS?.TAX ||
                              item?.value === CONSTANTS?.FINAL_AMOUNT_PAID ||
                              item?.value === CONSTANTS?.AMOUNT
                                ? currencyPrettier(Number(title))
                                : title}
                            </Typography>
                          ) : (
                            <Typography
                              variant={isMobile ? "m-heading-xs" : "heading-xs"}
                              sx={{
                                textAlign: "start",
                              }}>
                              {`${loyaltyEpicureStore?.loyaltyConfirmationResponse?.addOnCardDetails?.firstName} ${loyaltyEpicureStore?.loyaltyConfirmationResponse?.addOnCardDetails?.lastName}`}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </>
                  )}
                </CustomSubGridStyle>
              )
            })}
          </>
        )}
      </CustomMainGridStyle>
    </>
  )
}
export default observer(MembershipPurchaseDetailCardComponent)
