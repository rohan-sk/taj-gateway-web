export const EpcAddTenderModeToCart = async (
  loyaltyEnrollStore: any,
  userEnteredCoins: number,
  setTenderNeucoinsRedeemed: Function,
  setApiRes: Function,
  apiRes: any,
  setIsVisible: Function,
  updateEpicureCardData: Function,
  setLoader?: Function,
) => {
  if (loyaltyEnrollStore?.epcOrderId) {
    setLoader && setLoader(true)
    const res = await loyaltyEnrollStore?.EpicureAddTenderMode(
      JSON.stringify({
        orderId: loyaltyEnrollStore?.epcOrderId,
        tenderMode: "TATA_NEU",
        type: "MemberShip_Purchase",
        tenderModeDetails: [
          {
            cardNumber: "",
            cardPin: "",
            amount: Number(userEnteredCoins),
          },
        ],
      }),
    )
    if (res?.statusCode?.value !== 417 && !res?.error) {
      setLoader && setLoader(false)
      setTenderNeucoinsRedeemed(
        res?.data?.paymentDetails?.reduce((accumulator: number, transaction: any) => {
          return transaction?.paymentMethodType === "neuCoins" && accumulator + transaction.txnNetAmount
        }, 0),
      )
      setApiRes(res)
      loyaltyEnrollStore?.updateEpcTenderModeDetails(res)
      loyaltyEnrollStore?.setTotalAmountPayable(res?.data?.priceSummary?.totalPayableAmount)
      await updateEpicureCardData(
        res?.data?.items?.epicureDetails.bankName,
        res?.data?.items?.epicureDetails.isBankUrl,
        res?.data?.items?.epicureDetails.isShareHolder,
        res?.data?.items?.epicureDetails.isTata,
        res?.data?.items?.epicureDetails.memberShipPurchaseType,
        res?.data?.items?.epicureDetails.epicureType,
        res?.data?.priceSummary?.neuCoins,
        res?.data?.priceSummary?.price,
        res?.data?.priceSummary?.tax,
        res?.data?.priceSummary?.totalPayableAmount,
        res?.data?.priceSummary?.discountPrice,
        res?.data?.priceSummary?.discountPercent,
        res?.data?.priceSummary?.discountTax,
      )
      setIsVisible(true)
    } else {
      setLoader && setLoader(false)
    }
  }
}

export const EpcDeleteTenderModeToCart = async (
  loyaltyEnrollStore: any,
  tenderNeucoinsRedeemed: any,
  setApiRes: Function,
  setIsVisible: Function,
  updateEpicureCardData: Function,
) => {
  if (loyaltyEnrollStore?.epcOrderId) {
    const res = await loyaltyEnrollStore?.EpicureRemoveTenderMode(
      JSON.stringify({
        orderId: loyaltyEnrollStore?.epcOrderId,
        tenderMode: "TATA_NEU",
        amount: Number(tenderNeucoinsRedeemed),
        type: "MemberShip_Purchase",
        cardNumber: "",
      }),
    )
    if (res?.statusCode?.value !== 417 && !res?.error) {
      loyaltyEnrollStore?.updateEpcTenderModeDetails(res)
      loyaltyEnrollStore?.setTotalAmountPayable(res?.data?.priceSummary?.totalPayableAmount)
      await updateEpicureCardData(
        res?.data?.items?.epicureDetails.bankName,
        res?.data?.items?.epicureDetails.isBankUrl,
        res?.data?.items?.epicureDetails.isShareHolder,
        res?.data?.items?.epicureDetails.isTata,
        res?.data?.items?.epicureDetails.memberShipPurchaseType,
        res?.data?.items?.epicureDetails.epicureType,
        res?.data?.priceSummary?.neuCoins,
        res?.data?.priceSummary?.price,
        res?.data?.priceSummary?.tax,
        res?.data?.priceSummary?.totalPayableAmount,
        res?.data?.priceSummary?.discountPrice,
        res?.data?.priceSummary?.discountPercent,
        res?.data?.priceSummary?.discountTax,
      )
      setApiRes(null)
      setIsVisible(false)
    }
  }
}
