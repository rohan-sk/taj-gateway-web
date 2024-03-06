import { Grid } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { Fragment, useContext } from "react"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { hotelRoute, offersRoute } from "../../features/property/ui/constants"
import { useRouter } from "next/router"
import { CONSTANTS } from "../constants"
import {
  HorizontalDivider,
  MobileHorizontalDivider,
  RenderComponentContentWrapper,
  VerticalDivider,
} from "../group/styles/group-with-three-column-cards-with-border-styles"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { gridBreakPointsGenerator } from "../../features/destination/ui/searchComponent/search-card-component"
import { InclusionItem, PackageInclusionsContainer } from "./offer-package.styles"

const OffersSinglePackageComponent = ({ data }: any) => {
  const router = useRouter()
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute

  const LoopingData = isHotelSpecificOfferDetailsPage
    ? data?.contentType === "additionalPackageOffers"
      ? data?.hotels?.additionalPackages
      : data?.hotels?.inclusions
    : data?.contentType === "additionalPackageOffers"
    ? data?.additionalPackages
    : data?.inclusions

  const itemCount = LoopingData?.length
  const fourItems = itemCount === CONSTANTS?.FOUR
  let showDivider = LoopingData?.[0]?.basicInfo?.icon?.icon ? true : false

  const getInclusionColumSpacing = (showDividerVariant: boolean, itemsLength: number): string => {
    if (isMobile) {
      return "3.125vw"
    } else {
      switch (itemsLength) {
        case 4:
          return "1.042vw"
        case 3:
          return showDividerVariant ? "3.125vw" : "2.083vw"
        case 2:
          return "5.208vw"
        default:
          return showDividerVariant ? "3.125vw" : "2.083vw"
      }
    }
  }
  const getInclusionGridSize = (showDividerVariant: boolean, itemsLength: number): number => {
    if (isMobile) {
      return 5.65
    } else if (itemsLength === 4) {
      return 2.7
    } else if (!showDividerVariant) {
      return 3.7
    } else {
      return 3.11
    }
  }

  return (
    <PackageInclusionsContainer container $isDividerVariant={showDivider} $itemsLength={itemCount}>
      <Grid
        container
        justifyContent={"center"}
        columnGap={getInclusionColumSpacing(showDivider, itemCount)}
        rowGap={showDivider ? "0vw" : isMobile ? MobilePxToVw(42) : DesktopPxToVw(50)}>
        {LoopingData?.map((item: any, index: number) => {
          let cardData = {
            image: item?.basicInfo?.media?.[0]?.imageAsset?.image?.[0] || item?.basicInfo?.icon?.icon,
            title: item?.basicInfo?.title,
            variant: "ihcl.core.card.card-with-center-aligned-content",
            largeImage: item?.basicInfo?.media?.[0]?.imageAsset?.largeImage?.[0] || item?.basicInfo?.icon?.icon,
            headingElementForCard: data?.headingElementForCard,
            description: item?.basicInfo?.description,
            largeVariant: "ihcl.core.card.card-with-center-aligned-content",
            renderOriginalWidthImage: true,
          }

          const rowNumber = fourItems ? 1 : Math?.ceil((index + 1) / 3)
          const colNumber = fourItems ? index + 1 : index < 3 ? index + 1 : index + 1 - (rowNumber - 1) * 3

          return (
            <Fragment key={index}>
              <Grid
                item
                key={index}
                justifyContent={"space-between"}
                {...gridBreakPointsGenerator(isMobile, getInclusionGridSize(showDivider, itemCount), 5.65)}>
                <InclusionItem>
                  <RenderComponentContentWrapper $isMobile={isMobile} $fourItems={fourItems} $showDivider={showDivider}>
                    {Context?.renderComponent("card", cardData, index)}
                  </RenderComponentContentWrapper>
                  {showDivider && isMobile && index < itemCount - (itemCount % 2 === 0 ? 2 : 1) && (
                    <>
                      <MobileHorizontalDivider sx={{ width: "100%" }} orientation="horizontal" />
                    </>
                  )}
                </InclusionItem>
              </Grid>
              {showDivider && !isMobile && (
                <>
                  {index + 1 !== itemCount && colNumber < (fourItems ? 4 : 3) && (
                    <VerticalDivider sx={{ margin: "0vw" }} orientation="vertical" flexItem />
                  )}
                  {index + 1 !== itemCount && colNumber === (fourItems ? 4 : 3) && (
                    <Grid container>
                      <HorizontalDivider sx={{ width: "100%" }} orientation="horizontal" />
                    </Grid>
                  )}
                </>
              )}
            </Fragment>
          )
        })}
      </Grid>
    </PackageInclusionsContainer>
  )
}

export default OffersSinglePackageComponent
