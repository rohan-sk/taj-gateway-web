import { Stack } from "@mui/material"
import dynamic from "next/dynamic"
import { useMobileCheck } from "../../utils/isMobilView"
const OffersMultiPackageComponent = dynamic(() => import("./offers-multi-package.component"))
const OffersSinglePackageComponent = dynamic(() => import("./offers-single-package-inclusions"))

const OffersPackageComponent = ({ data }: any) => {
  const isMobile = useMobileCheck()

  return (
    <Stack
      columnGap={isMobile ? "3.5vw" : "2.083vw"}
      rowGap={isMobile ? "6.563vw" : "3.125vw"}
      flexDirection={"row"}
      flexWrap={"wrap"}
      justifyContent={"center"}>
      {data?.packageType !== "singlePackage" &&
      data?.[0]?.packageType !== "singlePackage" &&
      data?.contentType !== "additionalPackageOffers" ? (
        <OffersMultiPackageComponent data={data} />
      ) : (
        <OffersSinglePackageComponent data={data} />
      )}
    </Stack>
  )
}

export default OffersPackageComponent
