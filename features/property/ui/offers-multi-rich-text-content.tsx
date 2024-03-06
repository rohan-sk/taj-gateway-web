import React, { useContext } from "react"
import dynamic from "next/dynamic"
import { IHCLContext } from "../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../utils/Constants"
import OffersStore from "../../../store/global/offers.store"
import { observer } from "mobx-react-lite"
import { Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../../utils/isMobilView"
const PortableText = dynamic(() =>
  import("../../../lib/portable-text-serializers").then((module) => module.PortableText),
)
import { useAesthetics } from "../../../utils/fetchAsthetics"
const MultiRowTitle = dynamic(() => import("../../../components/hoc/title/multi-row-title"))
import { HorizontalDivider, PortableTextBoxWrapper, TitleBoxwrapper } from "./styles/hotel-details-gallery-group-styles"
import { AestheticContainer } from "../../../components/group/styles/common-styled-components"
import { hotelRoute, offersRoute } from "./constants"
import { useRouter } from "next/router"

const OffersMultiRichTextContent = (props: any) => {
  const {
    aesthetic,
    cardAesthetic,
    alignmentVariant,
    mobileCharactersLimit,
    charactersLimit,
    isMobileComponentFullWidth,
    isComponentFullWidth,
  } = props || {}
  const router = useRouter()
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const { cardPadding, cardBackgroundColor } = useAesthetics(cardAesthetic?._ref)

  const offerStore = Context?.getGlobalStore(GLOBAL_STORES.offerStore) as OffersStore

  const isDisplayGlobal = offerStore?.offersData?.displayGlobal
  const routerArr = router?.asPath?.split("/")
  const hotelRouteIndex = routerArr?.findIndex((route: any) => route === hotelRoute)
  const isHotelSpecificOfferDetailsPage = hotelRouteIndex === 1 && routerArr?.[hotelRouteIndex + 2] === offersRoute

  const componentData = isHotelSpecificOfferDetailsPage
    ? isDisplayGlobal
      ? offerStore?.offersData
      : offerStore?.offersData?.hotels || offerStore?.offersData
    : offerStore?.offersData

  const isSingleItem = componentData?.additionalInclusions?.length === 1
  return (
    <>
      {componentData?.additionalInclusions?.length > 0 && (
        <AestheticContainer $padding={isMobile ? aesthetic?.padding?.mobile : aesthetic?.padding?.desktop}>
          <MultiRowTitle
            title={componentData?.additionalInclusionsTitle}
            charactersLimit={isMobile ? mobileCharactersLimit : charactersLimit}
            aesthetic={null}
            subTitle={componentData?.additionalInclusionsSubtitle}
            isComponentFullWidth={isComponentFullWidth}
            isMobileComponentFullWidth={isMobileComponentFullWidth}
            alignmentVariant={alignmentVariant}
          />
          <AestheticContainer
            $padding={isMobile ? cardPadding?.mobile : cardPadding?.desktop}
            $backgroundColor={cardBackgroundColor}>
            <Grid container justifyContent={"center"}>
              {offerStore?.offersData?.additionalInclusions?.map((item: any, idx: number) => (
                <>
                  {(item?.blockSection?.title || item?.blockSection?.content) && (
                    <Grid item xs={isMobile ? 12 : isSingleItem ? 7.23 : 6}>
                      {item?.blockSection?.title && (
                        <TitleBoxwrapper $isMobile={isMobile} $isSingleItem={isSingleItem}>
                          <HorizontalDivider $isMobile={isMobile} />
                          <Typography
                            variant={
                              isMobile
                                ? isSingleItem
                                  ? "m-heading-l"
                                  : "m-heading-xs"
                                : isSingleItem
                                ? "heading-l"
                                : "heading-xs"
                            }>
                            {item?.blockSection?.title}
                          </Typography>
                          {isSingleItem && <HorizontalDivider $isMobile={isMobile} />}
                        </TitleBoxwrapper>
                      )}
                      {item?.blockSection?.content && (
                        <PortableTextBoxWrapper $isSingleItem={isSingleItem} $isMobile={isMobile}>
                          <PortableText blocks={item?.blockSection?.content} key={idx} />
                        </PortableTextBoxWrapper>
                      )}
                    </Grid>
                  )}
                </>
              ))}
            </Grid>
          </AestheticContainer>
        </AestheticContainer>
      )}
    </>
  )
}

export default observer(OffersMultiRichTextContent)
