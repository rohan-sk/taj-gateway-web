import { useEffect, useState } from "react"

export const UseAddress = (userStore: any) => {
  const [address, setAddress] = useState<any>({})

  const localAddress: any =
    global?.window?.localStorage?.getItem("userPrimaryAddress")

  const userAddress = localAddress && JSON?.parse(localAddress)

  useEffect(() => {
    if (userStore?.userDetails || localAddress) {
      userStore?.userDetails?.userAddresses?.length > 0 &&
        userStore?.userDetails?.userAddresses?.map((item: any) => {
          if (item?.isPrimary === "true") {
            setAddress(item)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return address?.length < 0 ? address : userAddress
}
