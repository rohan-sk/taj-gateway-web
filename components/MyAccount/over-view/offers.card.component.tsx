import React, { useState } from "react"
import { Stack } from "@mui/system"
import { Box, Modal, Typography } from "@mui/material"
import { theme } from "../../../lib/theme"
import { urlFor } from "../../../lib-sanity"
import { CONSTANTS } from "../../constants"
import CustomReadMore from "../../hoc/CustomReadMore"
import { useMobileCheck } from "../../../utils/isMobilView"
import { formatDateWithMON } from "../../../utils/getDate"
import RenderActionItem from "../../hoc/actions/action-items-ui"
import { useImageUtility } from "../../../utils/hooks/useImageUtility"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { ROOM_IMG, M_EXPIRE_DATE } from "../../forms/gift-card-form/constants"
import { GoldMailShareIcon, GoldPrintIcon } from "../../../utils/customIcons"
import {
  MainStack,
  ContentBox,
  IconsStack,
  VoucherImage,
  ChipLabelsBox,
  VerticalDivider,
  ActionItemsStack,
  HorizontalDivider,
  ChipBoxesContainer,
  DateRedeemStack,
  UserActionsStack,
  ShareTypography,
} from "../../../features/my-account/ui/styles/voucher-card"
import PrintPdf from "../../GeneratePdfPrint/render-pdf-print.component"
import ShareModal from "../../GeneratePdfPrint/share-popup.component"

const OffersCard = ({ OfferData, primaryAction, charactersLimit }: any) => {
  const [openShare, setOpenShare] = useState<boolean>(false)
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()

  const OfferImage = OfferData?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref
    ? urlFor(OfferData?.thumbnail?.[0]?.imageAsset?.largeImage?.[0]?.asset?._ref)?.url()
    : ROOM_IMG

  return (
    <MainStack aria-label="OffersCard">
      <VoucherImage component={"img"} alt={"offer-image"} src={getOptimizeImageUrl(OfferImage, 4)} />
      <ContentBox>
        <ChipBoxesContainer>
          {OfferData?.packages?.length > 0 &&
            OfferData?.packages?.map((singleOffer: any, index: number) => (
              <ChipLabelsBox key={index}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"} color={theme.palette.neuPalette.hexTwo}>
                  {singleOffer?.title}
                </Typography>
              </ChipLabelsBox>
            ))}
        </ChipBoxesContainer>
        <Box>
          <Typography
            sx={{ lineHeight: "140%" }}
            variant={isMobile ? "m-heading-xs" : "heading-xs"}
            mt={isMobile ? "3.125vw" : "1.042vw"}>
            {OfferData?.title?.toUpperCase()}
          </Typography>
        </Box>
        <CustomReadMore variant={isMobile ? "m-body-s" : "body-s"} length={charactersLimit}>
          {OfferData?.description}
        </CustomReadMore>
        <DateRedeemStack>
          {!isMobile && (
            <Stack width={"100%"} rowGap={DesktopPxToVw(10)}>
              <Stack width={"100%"} flexDirection="row" columnGap={DesktopPxToVw(20)}>
                <Stack width={"100%"} flexDirection="row" gap={DesktopPxToVw(5)}>
                  <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>{CONSTANTS?.VALID_UNIT}:</Typography>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"} style={{ fontWeight: 700 }}>
                    {OfferData?.validThroughYear
                      ? "Round the Year"
                      : OfferData?.validityDates?.[0]?.toDate
                      ? `${formatDateWithMON(OfferData?.validityDates?.[0]?.toDate)}`
                      : "No Restrictions"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          )}
          {isMobile && (
            <Stack width={"100%"} flexDirection={"column"} rowGap={MobilePxToVw(20)}>
              <Stack width={"100%"} flexDirection={"row"} justifyContent={"space-between"}>
                <Stack flexDirection="column" gap={MobilePxToVw(10)}>
                  <Typography
                    variant={"m-body-xs"}
                    style={{
                      fontWeight: 700,
                      fontSize: MobilePxToVw(14),
                    }}>
                    {M_EXPIRE_DATE}
                  </Typography>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                    {OfferData?.validThroughYear
                      ? "Round the Year"
                      : OfferData?.validityDates?.[0]?.toDate
                      ? `${formatDateWithMON(OfferData?.validityDates?.[0]?.toDate)}`
                      : "No Restrictions"}
                  </Typography>
                </Stack>
                <RenderActionItem
                  buttonStyles={{
                    backgroundColor: theme?.palette?.neuPalette?.hexTwo,
                    color: theme?.palette?.neuPalette?.hexOne,
                  }}
                  url={`${primaryAction?.url}/${OfferData?.identifier}`}
                  title={primaryAction?.title}
                  navigationType={primaryAction?.urlType}
                  variant={primaryAction?.variant}
                  isActionButtonType={true}
                />
              </Stack>
            </Stack>
          )}
        </DateRedeemStack>
        {!isMobile && <HorizontalDivider />}
        <ActionItemsStack $isRedeemable={true}>
          {!isMobile && (
            <RenderActionItem
              buttonStyles={{
                backgroundColor: theme?.palette?.neuPalette?.hexTwo,
                color: theme?.palette?.neuPalette?.hexOne,
              }}
              url={`${primaryAction?.url}/${OfferData?.identifier}`}
              title={primaryAction?.title}
              navigationType={primaryAction?.urlType}
              variant={primaryAction?.variant}
              isActionButtonType={true}
            />
          )}
          <UserActionsStack>
            <PrintPdf page="offers-or-vouchers" isBookingTab printData={OfferData} />
            {!isMobile && <VerticalDivider orientation="vertical" flexItem />}
            <IconsStack onClick={() => setOpenShare(true)}>
              <GoldMailShareIcon
                sx={{
                  height: isMobile ? MobilePxToVw(23) : DesktopPxToVw(18),
                  width: isMobile ? MobilePxToVw(26) : DesktopPxToVw(16),
                }}
              />
              <ShareTypography variant={isMobile ? "m-link-m" : "link-m"}>{CONSTANTS.SHARE}</ShareTypography>
            </IconsStack>
          </UserActionsStack>
        </ActionItemsStack>
      </ContentBox>
      {openShare && (
        <>
          <Modal open={openShare}>
            <ShareModal
              fileName={OfferData?.title}
              emailSubject={OfferData?.title}
              setOpenShare={setOpenShare}
              printData={OfferData}
              imageUrl={OfferImage}
            />
          </Modal>
        </>
      )}
    </MainStack>
  )
}

export default OffersCard
