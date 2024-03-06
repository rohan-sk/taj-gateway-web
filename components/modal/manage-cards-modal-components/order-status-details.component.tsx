import { Fragment } from "react"
import Step from "@mui/material/Step"
import { ICONS } from "../../constants"
import { Box, Grid, Typography } from "@mui/material"
import { formatDateWithMON } from "../../../utils/getDate"
import { useMobileCheck } from "../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { OrderStatusBox, OrderStatusStack } from "../styles/manage-card.styles"
import {
  DueDateWrapper,
  HorizontalDivider,
  OrderNumberWrapper,
  OrderStatusWrapper,
  OrderNumberContainer,
  StepperContentWrapper,
  TrackingNumberWrapper,
  StatusStepConnectorWrapper,
  StepperSeparatorContentWrapper,
  StepperSeparatorContentContainer,
} from "../styles/order-status-details.component-styles"

const steps = [
  {
    title: "Order Placed",
    status: "done",
  },
  {
    title: "Order Confirmed",
    status: "done",
  },
  {
    title: "Order Shipped",
    status: "process",
  },
  {
    title: "Order Delivered",
    status: "false",
  },
]
const OrderStatusDetails = ({
  OrderStatus,
  orderStatusLevel,
  orderStatus,
  orderId,
  trackingNumber,
  orderTrackingURL,
  dueDate,
}: any) => {
  const isMobile = useMobileCheck()
  return (
    <>
      {(orderStatusLevel || orderStatus || orderId || trackingNumber) && (
        <Fragment>
          <OrderStatusWrapper
            $isMobile={isMobile}
            className={"order-status-content"}>
            {orderStatus && (
              <OrderStatusStack $isMobile={isMobile}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                  Your Order Status
                </Typography>
                <Typography variant={isMobile ? "m-body-l" : "body-l"}>
                  “{orderStatus}”
                </Typography>
                <Typography
                  variant={isMobile ? "m-body-s" : "body-s"}></Typography>
              </OrderStatusStack>
            )}
            {orderTrackingURL && (
              <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                Please check order status at &nbsp;
                <Typography
                  component={"span"}
                  variant={isMobile ? "m-link-m" : "link-m"}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={orderTrackingURL} target="_blank">
                    {orderTrackingURL?.length > 35
                      ? orderTrackingURL?.toLowerCase()?.slice(0, 35) + "..."
                      : orderTrackingURL?.toLowerCase()}
                  </a>
                </Typography>
              </Typography>
            )}
            {isMobile && (
              <>
                <HorizontalDivider
                  orientation="horizontal"
                  $isMobile={isMobile}
                />
              </>
            )}
            <OrderNumberContainer container $isMobile={isMobile}>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                container
                gap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
                <OrderNumberWrapper
                  md={12}
                  sm={12}
                  xs={12}
                  $isMobile={isMobile}>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                    ORDER NUMBER
                  </Typography>
                  <Typography
                    variant={isMobile ? "m-body-sl" : "body-ml"}
                    sx={{ fontWeight: 700 }}>
                    {orderId ? orderId : "-"}
                  </Typography>
                </OrderNumberWrapper>
                <TrackingNumberWrapper
                  md={12}
                  sm={12}
                  xs={12}
                  $isMobile={isMobile}>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                    TRACKING NO.
                  </Typography>
                  <Typography
                    variant={isMobile ? "m-body-sl" : "body-ml"}
                    sx={{ fontWeight: 700 }}>
                    {trackingNumber ? trackingNumber : "-"}
                  </Typography>
                </TrackingNumberWrapper>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <DueDateWrapper md={12} sm={12} xs={12} $isMobile={isMobile}>
                  <Typography variant={isMobile ? "m-body-s" : "body-s"}>
                    DUE DATE
                  </Typography>
                  <Typography
                    variant={isMobile ? "m-body-sl" : "body-ml"}
                    sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    {dueDate ? formatDateWithMON(dueDate) : "-"}
                  </Typography>
                </DueDateWrapper>
              </Grid>
            </OrderNumberContainer>
            <StepperSeparatorContentContainer $isMobile={isMobile}>
              <StepperSeparatorContentWrapper
                alternativeLabel
                activeStep={orderStatusLevel}
                orientation={isMobile ? "vertical" : "horizontal"}
                connector={<StatusStepConnectorWrapper />}
                $isMobile={isMobile}>
                {[0, 1, 2, 3]?.map((item: any, index: number) => (
                  <Step key={index} sx={{ padding: "0vw" }}>
                    {item < orderStatusLevel - 1 ? (
                      <Box>
                        <Box
                          alt={`-done`}
                          width={
                            isMobile ? MobilePxToVw(32) : DesktopPxToVw(32)
                          }
                          height={
                            isMobile ? MobilePxToVw(32) : DesktopPxToVw(32)
                          }
                          component={"img"}
                          src={ICONS?.GOLDEN_DONE}
                        />
                      </Box>
                    ) : (
                      <Box
                        alt={`-in-progress`}
                        width={isMobile ? MobilePxToVw(32) : DesktopPxToVw(32)}
                        height={isMobile ? MobilePxToVw(32) : DesktopPxToVw(32)}
                        component={"img"}
                        src={
                          item === orderStatusLevel - 1
                            ? ICONS?.GOLDEN_IN_PROGRESS
                            : ICONS?.NOT_DELIVERED
                        }
                      />
                    )}
                  </Step>
                ))}
              </StepperSeparatorContentWrapper>
              <StepperContentWrapper
                connector={<Box sx={{ width: "3.3vw" }}></Box>}
                $isMobile={isMobile}>
                {steps?.map((item: any, index: number) => (
                  <Step key={index}>
                    {item?.status === "done" ? (
                      <OrderStatusBox>
                        <Typography
                          variant={isMobile ? "m-body-sl" : "body-ml"}>
                          {item?.title}
                        </Typography>
                        <Typography
                          variant={
                            isMobile ? "m-body-s" : "body-s"
                          }></Typography>
                      </OrderStatusBox>
                    ) : (
                      <OrderStatusBox>
                        <Typography
                          variant={isMobile ? "m-body-sl" : "body-ml"}>
                          {item?.title}
                        </Typography>
                        <Typography
                          variant={
                            isMobile ? "m-body-s" : "body-s"
                          }></Typography>
                      </OrderStatusBox>
                    )}
                  </Step>
                ))}
              </StepperContentWrapper>
            </StepperSeparatorContentContainer>
          </OrderStatusWrapper>
        </Fragment>
      )}
    </>
  )
}

export default OrderStatusDetails
