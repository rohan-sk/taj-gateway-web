import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES } from "../../../utils/Constants"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Button, Dialog, Stack, Typography } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import BookingFlowGlobalStore from "../store/globalStore/booking.flow.store"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"

const TenderModeClearanceAlert = ({ tabData, openDialog, setTabData, setActiveIndex, setActiveTabData }: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const customerHash: any =
    global?.localStorage?.getItem("customerHash") || global?.localStorage?.getItem("guestCustomerHash")

  const bookingFlowGlobalStore = context?.getGlobalStore(GLOBAL_STORES?.bookingFlowStore) as BookingFlowGlobalStore

  const { orderDetails, setUpdatePaymentType, setInitiatePaymentSDK, cartDetails } = bookingFlowGlobalStore

  const handleYes = async () => {
    await setUpdatePaymentType({
      paymentType: tabData?.paymentType,
      customerHash: customerHash,
      orderId: orderDetails?.orderDetailsResponse?.orderId,
    })
    if (cartDetails?.error === false) {
      setActiveTabData(tabData?.tabData)
      setActiveIndex(tabData?.activeIndex)
      setInitiatePaymentSDK(true)
    }
    setTabData({
      ...tabData,
      openTenderModeAlert: false,
    })
  }

  const handleNo = () => {
    setTabData({
      ...tabData,
      openTenderModeAlert: false,
    })
  }

  return (
    <>
      <Dialog
        onClose={handleNo}
        open={openDialog}
        PaperProps={{
          style: {
            borderRadius: 0,
            maxWidth: "unset",
            width: isMobile ? "unset" : DesktopPxToVw(875),
          },
        }}>
        <Stack sx={{ padding: isMobile ? "6vw" : "2vw 5vw" }}>
          <Typography variant={isMobile ? "m-body-l" : "body-l"} textAlign="center">
            {`YOU HAVE CHANGED YOUR PAYMENT OPTION TO "${
              tabData?.paymentType ? tabData?.paymentType : "ANOTHER PAYMENT METHOD"
            }". THE REDEEMED NEUCOINS/GIFT CARDS WILL BE REVERSED TO YOUR ACCOUNT.
            YOU MAY REDEEM YOUR NEUCOINS/GIFT CARDS ACROSS THE COUNTER AT THE HOTEL`}
          </Typography>
          <Typography
            sx={{ marginTop: isMobile ? "5vw" : "1vw" }}
            variant={isMobile ? "m-body-sl" : "body-ml"}
            textAlign="center">
            Would you like to proceed?
          </Typography>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: isMobile ? "5vw" : "1.5vw",
            }}>
            <Button
              variant="light-contained"
              onClick={handleYes}
              sx={{ minWidth: isMobile ? MobilePxToVw(185) : DesktopPxToVw(190) }}>
              YES
            </Button>
            <Button
              variant="light-outlined"
              onClick={handleNo}
              sx={{ minWidth: isMobile ? MobilePxToVw(185) : DesktopPxToVw(190) }}>
              NO
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}

export default observer(TenderModeClearanceAlert)
