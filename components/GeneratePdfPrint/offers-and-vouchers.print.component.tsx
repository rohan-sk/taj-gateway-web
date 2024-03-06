import React, { Fragment, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ICONS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { PDF_CONSTANT } from "./constants"
import { Box, Grid, Stack } from "@mui/material"
import { formatDateWithFullMonth, formatDateWithMON } from "../../utils/getDate"
import { useMobileCheck } from "../../utils/isMobilView"
import PDFHeroBanner, { PrintTajLogo } from "./pdf-hero-banner"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PortableTextAccordionDetailsOffersContainer } from "../faq/styles/terms-and-conditions-component-styles"
import {
  DateText,
  FlexCenter,
  Description,
  PrintContainer,
  DateHeaderText,
  DateInfoWrapper,
  ThreeColumnWrapper,
  TermsAndConditionsText,
  TermsAndConditionsWrapper,
} from "./PrintTemplateStyles"
import fetchVouchersData from "../../features/my-account/utils"

const PortableText = dynamic(() => import("../../lib/portable-text-serializers").then((module) => module.PortableText))

const CalendarIcon = ({ isMobile }: { isMobile: boolean }) => (
  <Box
    component={"img"}
    src={ICONS?.CALENDER_ICON}
    alt={`CalendarIcon`}
    width={isMobile ? MobilePxToVw(35) : DesktopPxToVw(35)}
    height={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}
    mr={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
  />
)

const DateItemComponent = ({ title, dates }: any) => {
  return (
    <>
      {dates?.length > 0
        ? dates?.map((date: any, index: number) => (
            <Fragment key={index}>
              <DateHeaderText>{title}</DateHeaderText>
              <FlexCenter>
                <CalendarIcon isMobile={false} />
                <DateText>{`${
                  date?.fromDate ? formatDateWithFullMonth(date?.fromDate, false, true) : "Valid for stays till"
                } - ${formatDateWithFullMonth(date?.toDate, false, true)}`}</DateText>
              </FlexCenter>
            </Fragment>
          ))
        : null}
    </>
  )
}

function OffersAndVouchersPrint({ printData, isVoucher, isPrintAction = false }: any) {
  const isMobile = useMobileCheck()
  const [voucherData, setVoucherData] = useState<any>()

  const { image, largeImage } =
    voucherData?.banner?.[0]?.imageAsset ||
    voucherData?.thumbnail?.[0]?.imageAsset ||
    printData?.banner?.[0]?.imageAsset ||
    {}

  let datesArr = [
    {
      title: "EXPIRY DATE",
      dates: printData?.validityDates,
      altTxt: "Round the Year",
    },
    {
      title: "STAY DATES",
      dates: printData?.stayDates,
      altTxt: "No Restrictions",
    },
    {
      title: "BLACKOUT DATES",
      dates: printData?.blackoutDates,
      altTxt: "No Restrictions",
    },
  ]

  datesArr = datesArr?.filter((item: any) => item?.dates?.length > 0) || []
  const tnc = isVoucher ? voucherData?.tnc : printData?.tnc
  const bannerImage = isMobile ? image?.[0]?.asset?._ref : largeImage?.[0]?.asset?._ref

  useEffect(() => {
    async function fetchData() {
      setVoucherData(await fetchVouchersData(printData?.productName))
    }
    fetchData()
  }, [printData])

  return (
    <>
      <PrintContainer className="page-break">
        <PrintTajLogo />
        <PDFHeroBanner
          title={printData?.productName || printData?.title}
          imgUrl={
            bannerImage
              ? urlFor(bannerImage)?.url()
              : `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/94560ee92c2659fb4d37339005af5ff2d708783f-1920x660.png`
          }
        />

        {isVoucher ? (
          <Grid container sx={{ mt: 3 }}>
            {printData?.validTill && (
              <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4}>
                <Stack>
                  <DateHeaderText>{PDF_CONSTANT.EXPIRY_DATE}</DateHeaderText>
                  <FlexCenter>
                    <CalendarIcon isMobile={false} />
                    <DateText>{formatDateWithMON(printData?.validTill)}</DateText>
                  </FlexCenter>
                  <DateItemComponent />
                </Stack>
              </Grid>
            )}
            {printData?.memberID && (
              <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4}>
                <Stack sx={{ textAlign: "center" }}>
                  <DateHeaderText>{PDF_CONSTANT.MEMBERSHIP_NUMBER}</DateHeaderText>
                  <DateText>{printData?.memberID}</DateText>
                </Stack>
              </Grid>
            )}
            {printData?.uniquePrivilegeCode && (
              <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4}>
                <Stack sx={{ textAlign: "center" }}>
                  <DateHeaderText>{PDF_CONSTANT.VOUCHER_NUMBER}</DateHeaderText>
                  <DateText>{printData?.uniquePrivilegeCode}</DateText>
                </Stack>
              </Grid>
            )}
            {printData?.pin && (
              <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4}>
                <Stack sx={{ textAlign: "center" }}>
                  <DateHeaderText>{PDF_CONSTANT.VOUCHER_PIN}</DateHeaderText>
                  <DateText>{printData?.pin}</DateText>
                </Stack>
              </Grid>
            )}
            {printData?.status && (
              <Grid item xs={2.4} sm={2.4} md={2.4} lg={2.4} xl={2.4}>
                <Stack sx={{ textAlign: "center" }}>
                  <DateHeaderText>{PDF_CONSTANT.VOUCHER_STATUS}</DateHeaderText>
                  <DateText>{printData?.status}</DateText>
                </Stack>
              </Grid>
            )}
          </Grid>
        ) : (
          <ThreeColumnWrapper>
            {datesArr?.map((item: any, index: number) => (
              <DateInfoWrapper key={index} $showBorder={index < datesArr?.length - 1 ? true : false}>
                {item?.dates?.length > 0 && <DateItemComponent title={item?.title} dates={item?.dates} />}
              </DateInfoWrapper>
            ))}
          </ThreeColumnWrapper>
        )}
        <Description>{printData?.productDescription || printData?.description}</Description>
        <TermsAndConditionsWrapper>
          {tnc?.length > 0 && <TermsAndConditionsText>Terms & Conditions</TermsAndConditionsText>}
          {tnc &&
            tnc?.map((item: any, index: number) => (
              <PortableTextAccordionDetailsOffersContainer key={index}>
                <PortableText blocks={item} />
              </PortableTextAccordionDetailsOffersContainer>
            ))}
        </TermsAndConditionsWrapper>
      </PrintContainer>
    </>
  )
}

export default OffersAndVouchersPrint
