import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { Box, Stack, Typography } from "@mui/material"
import { CONSTANTS } from "../../../components/constants"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
const CustomReadMore = dynamic(() => import("../../../components/hoc/CustomReadMore"))
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import {
  VerticalDivider,
  ActionButtonsWrapper,
  HorizontalDividerOne,
  CurrencyTitleTypography,
  HorizontalSecondDivider,
  ScrollableContentWrapper,
  ActionPropsDetailsWrapper,
  ActionPropsButtonContainer,
  ScrollableDescriptionContentWrapper,
  ScrollableDescriptionTitleTypography,
} from "./styles/hotel-room-rate-details-model-component-styles"
import {
  BulletPointBox,
  StyledBulletIcon,
} from "../../../components/BookingFlow/styles/details-card"
import { currency2DecimalSymbol } from "../../../utils/currency"

const HotelRoomDetailsModelComponent = () => {
  const isMobile = useMobileCheck()
  const modalStore = ModalStore.getInstance()
  const [more, setMore] = useState<number>(
    CONSTANTS?.PROPERTY_DATA_DESCRIPTION_LIMIT
  )
  const longDescription = modalStore?.propertyData?.longDescription
  let descriptionPoints = longDescription
    ?.split("+")
    ?.join(".")
    ?.split(".")
    ?.filter((des: any) => des !== "")
    ?.filter((text: any) => text !== "\r\n")
  const isDisable = !modalStore?.propertyData?.disabled
  return (
    <>
      <Box
        aria-label="HotelRoomDetailsModelComponent"
        padding={
          isMobile
            ? `${MobilePxToVw(30)} ${MobilePxToVw(50)} 0vw`
            : `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`
        }>
        {modalStore?.propertyData?.title && (
          <Box>
            <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
              {modalStore?.propertyData?.title}
            </Typography>
          </Box>
        )}
        {modalStore?.propertyData?.shortDescription && (
          <Box mt={isMobile ? MobilePxToVw(18) : DesktopPxToVw(18)}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>
              {modalStore?.propertyData?.shortDescription.length > more ? (
                <CustomReadMore length={more} variant={isMobile ? "m-body-sl" : "body-s"}>
                  {modalStore?.propertyData?.shortDescription}
                </CustomReadMore>
              ) : (
                modalStore?.propertyData?.shortDescription
              )}
            </Typography>
          </Box>
        )}
        <HorizontalDividerOne orientation="horizontal" $isMobile={isMobile} />
        <ScrollableContentWrapper $isMobile={isMobile}>
          {descriptionPoints?.length > 0 && (
            <Stack gap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
              <ScrollableDescriptionTitleTypography variant={isMobile ? "m-body-s" : "body-s"}>
                {"RATE DESCRIPTION"}
              </ScrollableDescriptionTitleTypography>
              <Box>
                {descriptionPoints && (
                  <>
                    {descriptionPoints?.map((item: string, index: number) => {
                      return (
                        <BulletPointBox key={index}>
                          <Box display={"flex"} mt={isMobile ? MobilePxToVw(6) : DesktopPxToVw(8)}>
                            <StyledBulletIcon />
                          </Box>
                          <Typography variant={isMobile ? "m-body-s" : "body-s"}>{item}</Typography>
                        </BulletPointBox>
                      )
                    })}
                  </>
                )}
              </Box>
            </Stack>
          )}
          {modalStore?.propertyData?.cancellationPolicy && (
            <Stack gap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
              <ScrollableDescriptionTitleTypography variant={isMobile ? "m-body-s" : "body-s"}>
                {"CANCELLATION POLICY"}
              </ScrollableDescriptionTitleTypography>
              <ScrollableDescriptionContentWrapper $isMobile={isMobile}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {modalStore?.propertyData?.cancellationPolicy}
                </Typography>
              </ScrollableDescriptionContentWrapper>
            </Stack>
          )}
          {modalStore?.propertyData?.guaranteePolicy && (
            <Stack gap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
              <ScrollableDescriptionTitleTypography variant={isMobile ? "m-body-s" : "body-s"}>
                {"GUARANTEE POLICY"}
              </ScrollableDescriptionTitleTypography>
              <ScrollableDescriptionContentWrapper $isMobile={isMobile}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  {modalStore?.propertyData?.guaranteePolicy}
                </Typography>
              </ScrollableDescriptionContentWrapper>
            </Stack>
          )}
        </ScrollableContentWrapper>
      </Box>
      <Box
        sx={{
          left: "50%",
          position: "absolute",
          transform: "translateX(-50%)",
          width: isMobile ? "100%" : "94%",
          bottom: isMobile ? "3vw" : "auto",
        }}>
        <HorizontalSecondDivider
          sx={{
            margin: isMobile ? `0vw 0vw ${MobilePxToVw(17)} 0vw` : "auto",
            opacity: 1,
            height: "2px",
          }}
          orientation="horizontal"
          $isMobile={isMobile}
        />
        <Box padding={isMobile ? `${MobilePxToVw(18)} ${MobilePxToVw(50)} 0vw` : "auto"}>
          {modalStore?.propertyData?.price >= 0 && (
            <Box width={"100%"} margin={"0 auto"}>
              <Stack alignItems={"center"} rowGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>{"PRICE"}</Typography>
                <CurrencyTitleTypography
                  variant={isMobile ? "m-body-xl" : "body-xl"}
                  $isMobile={isMobile}>
                  {currency2DecimalSymbol(
                    modalStore?.propertyData?.price,
                    modalStore?.propertyData?.currencyCode
                  )}
                </CurrencyTitleTypography>
              </Stack>
            </Box>
          )}
          {(modalStore?.propertyData?.standardRate || modalStore?.propertyData?.memberRate) && (
            <ActionButtonsWrapper $isMobile={isMobile}>
              {modalStore?.propertyData?.memberRate && (
                <>
                  <ActionPropsButtonContainer $isMobile={isMobile}>
                    <ActionPropsDetailsWrapper $isMobile={isMobile}>
                      <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                        {"MEMBER RATE"}
                      </Typography>
                      <CurrencyTitleTypography
                        variant={isMobile ? "m-body-xl" : "body-xl"}
                        $isMobile={isMobile}>
                        {modalStore?.propertyData?.memberRate}
                      </CurrencyTitleTypography>
                    </ActionPropsDetailsWrapper>
                    <RenderActionItem
                      url={""}
                      title={modalStore?.propertyData?.memberRateText}
                      navigationType={undefined}
                      variant={"light-contained"}
                      isActionButtonType={true}
                      isDisable={isDisable}
                      buttonStyles={{ letterSpacing: "1.8px" }}
                      onClick={() => {
                        if (isDisable) {
                          modalStore?.propertyData?.onMemberSelect()
                          modalStore?.closeModal()
                        }
                      }}
                    />
                  </ActionPropsButtonContainer>
                  {modalStore?.propertyData?.memberRateText &&
                    modalStore?.propertyData?.standardRate && (
                      <VerticalDivider orientation="vertical" flexItem />
                    )}
                </>
              )}
              {modalStore?.propertyData?.standardRate && (
                <ActionPropsButtonContainer $isMobile={isMobile}>
                  <ActionPropsDetailsWrapper $isMobile={isMobile}>
                    <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                      {modalStore?.propertyData?.rateLabel}
                    </Typography>
                    <CurrencyTitleTypography
                      variant={isMobile ? "m-body-xl" : "body-xl"}
                      $isMobile={isMobile}>
                      {modalStore?.propertyData?.standardRate}
                    </CurrencyTitleTypography>
                  </ActionPropsDetailsWrapper>
                  <RenderActionItem
                    url={""}
                    title={modalStore?.propertyData?.standardRateText}
                    navigationType={undefined}
                    variant={"light-outlined"}
                    isActionButtonType={true}
                    isDisable={isDisable}
                    buttonStyles={{ letterSpacing: "1.8px" }}
                    onClick={() => {
                      if (isDisable) {
                        modalStore?.propertyData?.onStandardSelect()
                        modalStore?.closeModal()
                      }
                    }}
                  />
                </ActionPropsButtonContainer>
              )}
            </ActionButtonsWrapper>
          )}
        </Box>
      </Box>
    </>
  )
}

export default observer(HotelRoomDetailsModelComponent)
