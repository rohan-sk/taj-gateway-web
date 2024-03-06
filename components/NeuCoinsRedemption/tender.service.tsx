import { ROUTES } from "../../utils/routes"

const { WITHOUTSEO_FOR_ROUTING, GIFT_CARD, LOYALTY } = ROUTES

export const GCAddTenderModeToCart = async (
  giftCardManageStore: any,
  GCFormDetailsStore: any,
  userEnteredCoins: number,
  setTenderNeucoinsRedeemed: Function,
  setUserEnteredCoins: Function,
  setApiRes: Function,
  apiRes: any,
  setLoader?: Function,
) => {
  if (
    giftCardManageStore?.giftCardOrderId &&
    apiRes?.data?.payableAmount !== 0
  ) {
    const res = await giftCardManageStore?.AddTenderMode(
      JSON.stringify({
        orderId: giftCardManageStore?.giftCardOrderId,
        tenderMode: "TATA_NEU",
        type: "Gift_Card_Purchase",
        tenderModeDetails: [
          {
            amount: Number(userEnteredCoins),
          },
        ],
      })
    )
    await GCFormDetailsStore?.gcFetchCart()
    if (res?.status === 200) {
      setLoader && setLoader(false)
      setTenderNeucoinsRedeemed(res?.data?.priceSummary?.neuCoins)

      setApiRes(res)

      giftCardManageStore?.updateGcTenderModeDetails(res)
      giftCardManageStore?.setTotalAmountPayable(res?.data?.priceSummary?.totalPayableAmount)
    } else {
      setLoader && setLoader(false)
    }
  }
}

export const GCDeleteTenderModeToCart = async (
  giftCardManageStore: any,
  GCFormDetailsStore: any,
  tenderNeucoinsRedeemed: any,
  setApiRes: Function
) => {
  if (giftCardManageStore?.giftCardOrderId) {
    const res = await giftCardManageStore?.RemoveTenderMode(
      JSON.stringify({
        orderId: giftCardManageStore?.giftCardOrderId,
        tenderMode: "TATA_NEU",
        type: "Gift_Card_Purchase",
        amount: Number(tenderNeucoinsRedeemed),
      })
    )

    if (res?.status === 200) {
      giftCardManageStore?.updateGcTenderModeDetails(res)
      setApiRes(null)
      await GCFormDetailsStore?.gcFetchCart()
    }
  }
}
