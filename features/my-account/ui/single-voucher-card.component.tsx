import React, { useContext, useState } from "react"
import dynamic from "next/dynamic"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Typography, Modal, Box, Stack } from "@mui/material"
import { GoldMailShareIcon } from "../../../utils/customIcons"
import { CONSTANTS, ICONS } from "../../../components/constants"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import BookingFlowGlobalStore from "../../booking/store/globalStore/booking.flow.store"
import {
  MainStack,
  VoucherImage,
  ContentBox,
  ChipBoxesContainer,
  ChipLabelsBox,
  DescriptionTypography,
  DateRedeemStack,
  HorizontalDivider,
  ActionItemsStack,
  UserActionsStack,
  VerticalDivider,
  IconsStack,
  ShareTypography,
} from "./styles/voucher-card"

const PrintPdf = dynamic(() => import("../../../components/GeneratePdfPrint/render-pdf-print.component"))
const ShareModal = dynamic(() => import("../../../components/GeneratePdfPrint/share-popup.component"))

const fetchVoucherImage = (cmsVouchersData: any, cardChild: any, isMobile: boolean) => {
  const actualVoucherData = cmsVouchersData?.filter((item: any) => item?.title === cardChild?.productName)?.[0]
  let voucherImage = actualVoucherData?.thumbnail?.[0]?.imageAsset
  let voucherDescription = actualVoucherData?.description || cardChild?.productDescription

  if (voucherImage?.largeImage?.length > 0) {
    return {
      image: urlFor(
        isMobile
          ? voucherImage?.image?.[0]?.asset?._ref || voucherImage?.largeImage?.[0]?.asset?._ref
          : voucherImage?.largeImage?.[0]?.asset?._ref,
      ).url(),
      description: voucherDescription,
    }
  } else {
    return {
      image: urlFor(ICONS?.VOUCHER_IMAGE).url(),
      description: cardChild?.productDescription,
    }
  }
}

const SingleVoucherCardComponent = ({
  index,
  cardChild,
  cmsVouchersData,
  primaryAction,
  selectedStatus,
  productCategory,
}: any) => {
  const isMobileView = useMobileCheck()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const { getOptimizeImageUrl } = useImageUtility()
  const cardPrefix = cardChild?.extraData?.program_prefix || ""
  const [openShare, setOpenShare] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const currentVoucher = fetchVoucherImage(cmsVouchersData, cardChild, isMobileView)
  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  return (
    <Box aria-label="SingleVoucherCardComponent">
      <MainStack>
        <VoucherImage
          loading="lazy"
          component={"img"}
          src={getOptimizeImageUrl(currentVoucher?.image, 5)}
          alt="voucher-img"
        />
        <ContentBox>
          <ChipBoxesContainer>
            {cardChild?.label && (
              <ChipLabelsBox>
                <Typography variant={isMobileView ? "m-body-s" : "body-s"} color={theme.palette.neuPalette.hexTwo}>
                  {cardChild?.label}
                </Typography>
              </ChipLabelsBox>
            )}
            {cardChild?.labelType && (
              <ChipLabelsBox>
                <Typography variant={isMobileView ? "m-body-s" : "body-s"} color={theme.palette.neuPalette.hexTwo}>
                  {cardChild?.labelType}
                </Typography>
              </ChipLabelsBox>
            )}
          </ChipBoxesContainer>
          {cardChild?.productName && (
            <Typography
              sx={{ lineHeight: "140%" }}
              variant={isMobileView ? "m-heading-xs" : "heading-xs"}
              mt={isMobileView ? "3.125vw" : "1.042vw"}>
              {cardChild?.productName?.toUpperCase()}
            </Typography>
          )}
          {currentVoucher?.description && (
            <DescriptionTypography variant={isMobileView ? "m-body-s" : "body-s"}>
              {currentVoucher?.description}
            </DescriptionTypography>
          )}
          {!productCategory && (
            <DateRedeemStack>
              {!isMobileView && (
                <Stack width={"100%"} rowGap={DesktopPxToVw(10)}>
                  <Stack width={"100%"} flexDirection="row" columnGap={DesktopPxToVw(20)}>
                    {cardChild?.uniquePrivilegeCode != (null || undefined) && (
                      <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                        <Typography variant={"body-xs"}>{CONSTANTS?.VOUCHER_NUMBER}:</Typography>
                        <Typography variant={"body-s"} style={{ fontWeight: 700 }}>
                          {cardPrefix ? `${cardPrefix} - ` : ""}
                          {cardChild?.uniquePrivilegeCode}
                        </Typography>
                      </Stack>
                    )}
                    {cardChild?.pin != (null || undefined) && (
                      <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                        <Typography variant={"body-xs"}>{CONSTANTS?.VOUCHER_PIN}:</Typography>
                        <Typography variant={"body-s"} style={{ fontWeight: 700 }}>
                          {cardChild?.pin}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                  <Stack width={"100%"} flexDirection="row" columnGap={DesktopPxToVw(20)}>
                    {cardChild?.status && (
                      <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                        <Typography variant={"body-xs"}>{CONSTANTS?.STATUS}:</Typography>
                        <Typography variant={"body-s"} style={{ fontWeight: 700 }}>
                          {cardChild?.status}
                        </Typography>
                      </Stack>
                    )}
                    {cardChild?.validTill != (null || undefined) && (
                      <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                        <Typography variant={"body-xs"}>{CONSTANTS?.VALID_UNIT}:</Typography>
                        <Typography variant={"body-s"} style={{ fontWeight: 700 }}>
                          {`${formatDateWithMON(cardChild?.validTill)}`}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              )}
              {isMobileView && (
                <Stack width={"100%"} rowGap={MobilePxToVw(20)}>
                  <Stack width={"100%"} flexDirection={"row"}>
                    {cardChild?.uniquePrivilegeCode && (
                      <Stack width={"100%"} gap={MobilePxToVw(10)}>
                        <Typography
                          variant={"m-body-xs"}
                          style={{
                            fontWeight: 700,
                            fontSize: MobilePxToVw(14),
                          }}>
                          {CONSTANTS?.VOUCHER_NUMBER}
                        </Typography>
                        <Typography variant={"m-body-s"}>{cardChild?.uniquePrivilegeCode}</Typography>
                      </Stack>
                    )}
                    {cardChild?.pin && (
                      <Stack width={"100%"} gap={MobilePxToVw(10)}>
                        <Typography
                          variant={"m-body-xs"}
                          style={{
                            fontWeight: 700,
                            fontSize: MobilePxToVw(14),
                          }}>
                          {CONSTANTS?.VOUCHER_PIN}
                        </Typography>
                        <Typography variant={"m-body-s"}>{cardChild?.pin}</Typography>
                      </Stack>
                    )}
                    {cardChild?.status && (
                      <Stack width={"100%"} gap={MobilePxToVw(10)}>
                        <Typography
                          variant={"m-body-xs"}
                          style={{
                            fontWeight: 700,
                            fontSize: MobilePxToVw(14),
                          }}>
                          {CONSTANTS?.STATUS}
                        </Typography>
                        <Typography variant={"m-body-s"}>{cardChild?.status}</Typography>
                      </Stack>
                    )}
                  </Stack>
                  <Stack width={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
                    {cardChild?.validTill != (null || undefined) && (
                      <Stack gap={MobilePxToVw(10)}>
                        <Typography
                          variant={"m-body-xs"}
                          style={{
                            fontWeight: 700,
                            fontSize: MobilePxToVw(14),
                          }}>
                          {CONSTANTS?.VALID_UNIT}
                        </Typography>
                        <Typography variant={"m-body-s"}>{`${formatDateWithMON(cardChild?.validTill)}`}</Typography>
                      </Stack>
                    )}
                    {selectedStatus?.toLowerCase() !== "redeemed" && cardChild?.isReedemable && (
                      <RenderActionItem
                        url={`${primaryAction?.url}/${encodeURIComponent(
                          cardChild?.productName,
                        )}?gravtyVoucherprivilegeCode=${
                          cardChild?.uniquePrivilegeCode
                        }&gravtyVoucherbitid=&overrideSessionDates=true&gravtyVoucherSelected=true&gravtyVoucherpin=${
                          cardChild?.pin
                        }&memberId=${window?.localStorage?.getItem("userTICNumber")}&gravtyMemberNumber=${
                          cardChild?.memberID
                        }&memberType=${cardChild?.label}&voucherRedemption=true&rateTab=PROMOCODE&`}
                        title={primaryAction?.title}
                        navigationType={primaryAction?.urlType}
                        variant={primaryAction?.variant}
                        isActionButtonType={true}
                        buttonStyles={{
                          letterSpacing: "0.281vw",
                        }}
                        onClick={async () => {
                          await bookingFlowGlobalStore?.setSelectedVoucherDetails(
                            cardChild?.createdOn,
                            cardChild?.memberID,
                            cardChild?.uniquePrivilegeCode,
                            cardChild?.pin,
                            cardChild?.extraData?.promocode,
                            cardChild?.label,
                          )
                          navigate(
                            `${primaryAction?.url}/${encodeURIComponent(
                              cardChild?.productName,
                            )}?gravtyVoucherprivilegeCode=${
                              cardChild?.uniquePrivilegeCode
                            }&gravtyVoucherbitid=&overrideSessionDates=true&gravtyVoucherSelected=true&gravtyVoucherpin=${
                              cardChild?.pin
                            }&memberId=${window?.localStorage?.getItem("userTICNumber")}&gravtyMemberNumber=${
                              cardChild?.memberID
                            }&memberType=${cardChild?.label}&voucherRedemption=true&rateTab=PROMOCODE&`,
                            primaryAction?.urlType,
                          )
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
              )}
            </DateRedeemStack>
          )}
          {!isMobileView && <HorizontalDivider />}
          <ActionItemsStack
            $isRedeemable={!!cardChild?.isReedemable && !isMobileView && selectedStatus?.toLowerCase() !== "redeemed"}>
            {cardChild?.isReedemable && !isMobileView && selectedStatus?.toLowerCase() !== "redeemed" && (
              <RenderActionItem
                url={`${primaryAction?.url}/${encodeURIComponent(cardChild?.productName)}?gravtyVoucherprivilegeCode=${
                  cardChild?.uniquePrivilegeCode
                }&gravtyVoucherbitid=&overrideSessionDates=true&gravtyVoucherSelected=true&gravtyVoucherpin=${
                  cardChild?.pin
                }&memberId=${window?.localStorage?.getItem("userTICNumber")}&gravtyMemberNumber=${
                  cardChild?.memberID
                }&memberType=${cardChild?.label}&voucherRedemption=true&rateTab=PROMOCODE&`}
                title={primaryAction?.title}
                navigationType={primaryAction?.urlType}
                variant={primaryAction?.variant}
                isActionButtonType={true}
                onClick={async () => {
                  await bookingFlowGlobalStore?.setSelectedVoucherDetails(
                    cardChild?.createdOn,
                    cardChild?.memberID,
                    cardChild?.uniquePrivilegeCode,
                    cardChild?.pin,
                    cardChild?.extraData?.promocode,
                    cardChild?.label,
                  )
                  navigate(
                    `${primaryAction?.url}/${encodeURIComponent(cardChild?.productName)}?gravtyVoucherprivilegeCode=${
                      cardChild?.uniquePrivilegeCode
                    }&gravtyVoucherbitid=&overrideSessionDates=true&gravtyVoucherSelected=true&gravtyVoucherpin=${
                      cardChild?.pin
                    }&memberId=${window?.localStorage?.getItem("userTICNumber")}&gravtyMemberNumber=${
                      cardChild?.memberID
                    }&memberType=${cardChild?.label}&voucherRedemption=true&rateTab=PROMOCODE&`,
                    primaryAction?.urlType,
                  )
                }}
              />
            )}
            <UserActionsStack>
              <PrintPdf page="offers-or-vouchers" isBookingTab printData={cardChild} isVoucher={true} />
              {openShare && index == selectedIndex && (
                <>
                  <Modal open={openShare}>
                    <>
                      <ShareModal
                        setOpenShare={setOpenShare}
                        emailSubject={cardChild?.productName}
                        fileName={cardChild?.productName}
                        printData={cardChild}
                        isVoucher={true}
                        imageUrl={currentVoucher?.image}
                      />
                    </>
                  </Modal>
                </>
              )}
              {!isMobileView && <VerticalDivider orientation="vertical" flexItem />}
              <IconsStack
                onClick={() => {
                  setOpenShare(true)
                  setSelectedIndex(index)
                }}>
                <GoldMailShareIcon
                  sx={{
                    height: isMobileView ? MobilePxToVw(23) : DesktopPxToVw(18),
                    width: isMobileView ? MobilePxToVw(26) : DesktopPxToVw(16),
                  }}
                />
                <ShareTypography variant={isMobileView ? "m-link-m" : "link-m"}>{CONSTANTS.SHARE}</ShareTypography>
              </IconsStack>
            </UserActionsStack>
          </ActionItemsStack>
        </ContentBox>
      </MainStack>
    </Box>
  )
}

export default SingleVoucherCardComponent
