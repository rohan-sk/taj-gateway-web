import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { Box, Typography } from "@mui/material"
import { CONSTANTS } from "../../../components/constants"
import { useMobileCheck } from "../../../utils/isMobilView"
const CustomReadMore = dynamic(() =>  import("../../../components/hoc/CustomReadMore"))
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

const data = {
  title: "Bed Breakfast and more",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non diam phasellus vestibulum lorem sed risus ultricies.",

  actionProps: {
    primaryAction: { title: "Login/Join" },
    primaryActionName: "Member Rate",
    primaryActionRate: "₹ 37,700",
    secondaryAction: { title: "Select" },
    secondaryActionName: "Standard Rate",
    secondaryActionRate: "₹ 40,900",
  },
  scrollLines: [
    {
      lineTitle: "Rate description",
      lineDescription: [
        {
          descriptionTitle: "Rate includes basic WiFi up to 4 devices.",
          descriptionPoints: "",
        },
        {
          descriptionTitle: "Mandatory Surcharge for Festive Meals -",
          descriptionPoints: [
            "Diwali (11th Nov) Dinner INR 8,000 plus taxes per person.",
            "Christmas Eve (24th December) Dinner INR 9,500 Plus Taxes per person.",
            "New Year Eve (31st December) Dinner INR 23,000 plus taxes per person.",
            "Holi Celebration Dinner (06th March) at INR 7,500 plus taxes per person.",
          ],
        },
        {
          descriptionTitle:
            "Kids up to 11 Years will be charged 50% of above rates for Mandatory Festive Meals.",
          descriptionPoints: "",
        },
      ],
    },
    {
      lineTitle: "Cancellation policy",
      lineDescription: [
        {
          descriptionTitle:
            "Free cancellation by 2PM-45 days prior to arrival to avoid a penalty of 1 night charge plus any applicable taxes & fees.",
          descriptionPoints: "",
        },
      ],
    },
    {
      lineTitle: "TERMS & CONDITIONS",
      lineDescription: [],
    },
    {
      lineTitle: "Rate description",
      lineDescription: [
        {
          descriptionTitle: "Rate includes basic WiFi up to 4 devices.",
          descriptionPoints: "",
        },
        {
          descriptionTitle: "Mandatory Surcharge for Festive Meals -",
          descriptionPoints: [
            "Diwali (11th Nov) Dinner INR 8,000 plus taxes per person.",
            "Christmas Eve (24th December) Dinner INR 9,500 Plus Taxes per person.",
            "New Year Eve (31st December) Dinner INR 23,000 plus taxes per person.",
            "Holi Celebration Dinner (06th March) at INR 7,500 plus taxes per person.",
          ],
        },
        {
          descriptionTitle:
            "Kids up to 11 Years will be charged 50% of above rates for Mandatory Festive Meals.",
          descriptionPoints: "",
        },
      ],
    },
    {
      lineTitle: "Cancellation policy",
      lineDescription: [
        {
          descriptionTitle:
            "Free cancellation by 2PM-45 days prior to arrival to avoid a penalty of 1 night charge plus any applicable taxes & fees.",
          descriptionPoints: "",
        },
      ],
    },
  ],
}
const HotelRoomRateDetailsModelComponent = () => {
  const isMobile = useMobileCheck()
  const [more, setMore] = useState<number>(
    CONSTANTS?.PROPERTY_DATA_DESCRIPTION_LIMIT
  )
  return (
    <Box
      padding={
        isMobile
          ? `0vw ${MobilePxToVw(82)}`
          : `${DesktopPxToVw(47)} ${DesktopPxToVw(40)} ${DesktopPxToVw(40)}`
      }>
      {data?.title && (
        <Box>
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
            {data?.title}
          </Typography>
        </Box>
      )}
      {data?.description && (
        <Box mt={isMobile ? MobilePxToVw(18) : DesktopPxToVw(18)}>
          <Typography variant={isMobile ? "m-body-s" : "body-s"}>
            {data?.description.length > more ? (
              <CustomReadMore
                length={more}
                variant={isMobile ? "m-body-sl" : "body-s"}>
                {data?.description}
              </CustomReadMore>
            ) : (
              data?.description
            )}
          </Typography>
        </Box>
      )}
      <HorizontalDividerOne orientation="horizontal" $isMobile={isMobile} />
      {data?.scrollLines && (
        <ScrollableContentWrapper $isMobile={isMobile}>
          {data?.scrollLines?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                gap={isMobile ? MobilePxToVw(9) : DesktopPxToVw(9)}>
                <Box>
                  <ScrollableDescriptionTitleTypography
                    variant={isMobile ? "m-body-s" : "body-s"}>
                    {item?.lineTitle}
                  </ScrollableDescriptionTitleTypography>
                </Box>
                <ScrollableDescriptionContentWrapper $isMobile={isMobile}>
                  {item?.lineDescription?.map((items: any, idx: number) => {
                    return (
                      <Box key={idx}>
                        <Box>
                          <Typography
                            variant={isMobile ? "m-body-s" : "body-s"}>
                            {items?.descriptionTitle}
                          </Typography>
                        </Box>
                        {items?.descriptionPoints && (
                          <Box>
                            {items?.descriptionPoints?.map(
                              (content: string, index: number) => {
                                return (
                                  <Box key={index}>
                                    <Typography
                                      variant={
                                        isMobile ? "m-body-s" : "body-s"
                                      }>
                                      {content}
                                    </Typography>
                                  </Box>
                                )
                              }
                            )}
                          </Box>
                        )}
                      </Box>
                    )
                  })}
                </ScrollableDescriptionContentWrapper>
              </Box>
            )
          })}
        </ScrollableContentWrapper>
      )}
      <HorizontalSecondDivider orientation="horizontal" $isMobile={isMobile} />
      {data?.actionProps && (
        <ActionButtonsWrapper $isMobile={isMobile}>
          <ActionPropsButtonContainer $isMobile={isMobile}>
            <ActionPropsDetailsWrapper $isMobile={isMobile}>
              <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                {data?.actionProps?.primaryActionName}
              </Typography>
              <CurrencyTitleTypography
                variant={isMobile ? "m-body-xl" : "body-xl"}
                $isMobile={isMobile}>
                {data?.actionProps?.primaryActionRate}
              </CurrencyTitleTypography>
            </ActionPropsDetailsWrapper>
            {data?.actionProps?.primaryAction?.title && (
              <RenderActionItem
                url={""}
                title={data?.actionProps?.primaryAction?.title}
                navigationType={undefined}
                variant={"light-contained"}
                isActionButtonType={true}
                buttonStyles={{ letterSpacing: "1.8px" }}
              />
            )}
          </ActionPropsButtonContainer>
          <VerticalDivider orientation="vertical" flexItem />
          <ActionPropsButtonContainer $isMobile={isMobile}>
            <ActionPropsDetailsWrapper $isMobile={isMobile}>
              <Typography variant={isMobile ? "m-body-xs" : "body-xs"}>
                {data?.actionProps?.secondaryActionName}
              </Typography>
              <CurrencyTitleTypography
                variant={isMobile ? "m-body-xl" : "body-xl"}
                $isMobile={isMobile}>
                {data?.actionProps?.secondaryActionRate}
              </CurrencyTitleTypography>
            </ActionPropsDetailsWrapper>
            {data?.actionProps?.primaryAction?.title && (
              <RenderActionItem
                url={""}
                title={data?.actionProps?.secondaryAction?.title}
                navigationType={undefined}
                variant={"light-outlined"}
                isActionButtonType={true}
                buttonStyles={{ letterSpacing: "1.8px" }}
              />
            )}
          </ActionPropsButtonContainer>
        </ActionButtonsWrapper>
      )}
    </Box>
  )
}

export default observer(HotelRoomRateDetailsModelComponent)
