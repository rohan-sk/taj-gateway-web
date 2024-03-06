import { useEffect, useState } from "react"

export const useMembershipType = (epicureCardData: any) => {
  const [membershipType, setMemberShipType] = useState<string>("")

  useEffect(() => {
    if (epicureCardData?.isShareHolder) {
      setMemberShipType("shareholder")
    } else if (epicureCardData?.isTata) {
      setMemberShipType("tata")
    } else if (epicureCardData?.memberShipPurchaseType?.toLowerCase() === "renewal") {
      setMemberShipType("renewal")
    }
  }, [epicureCardData?.isShareHolder, epicureCardData?.isTata, epicureCardData?.memberShipPurchaseType])

  return membershipType
}
