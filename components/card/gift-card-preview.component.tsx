import { groq } from "next-sanity"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { CONSTANTS, ICONS } from "../constants"
import { observer } from "mobx-react-lite"
import { GLOBAL_STORES, PAGE_STORES } from "../../utils/Constants"
import { urlFor, getClient } from "../../lib-sanity"
import { useContext, useEffect, useState } from "react"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAesthetics } from "../../utils/fetchAsthetics"
import { Box, CardMedia, Grid, Typography } from "@mui/material"
import { ActionProps, ImageProps, aestheticItems } from "../types"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { PageContext } from "../../PresentationalComponents/lib/prepare-page-context"
import GiftCardFormDetailsStore from "../../features/giftCard/store/pageStore/GCFormdetails.store"
import GiftCardConfirmationPageStore from "../../features/giftCard/store/pageStore/GCConfirmationPage.store"
import { CardBox, SenderBox, MessageBox, CustomMessage, PreviewContainer } from "./styles/gift-card-preview"
import GiftCardStore from "../../features/giftCard/store/globalStore/gift-card.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type ImageItems = {
  primaryImage: ImageProps
  secondaryImage: ImageProps
}
type GiftCardPreviewComponentProps = {
  title: string
  imageAssets: ImageItems[]
  secondaryAction: ActionProps
  aesthetic: aestheticItems
}

const GiftCardPreviewComponent = observer(({ title, imageAssets, secondaryAction, aesthetic }: any) => {
  const [dynamicEGCImageFront, setDynamicEGCImageFront] = useState<any>("")
  const [dynamicEGCImageBack, setDynamicEGCImageBack] = useState<any>("")
  const [imgLoaded, setImgLoaded] = useState(false)
  const pageContext = useContext(PageContext)
  const IHCLContexts = useContext(IHCLContext)

  const GCFormDetailsStore = IHCLContexts?.getGlobalStore(GLOBAL_STORES.giftCardStore) as GiftCardStore

  const giftCardConfirmationPageStore = pageContext?.getPageStore(
    PAGE_STORES.GIFTCARD_STORES.giftCardConfirmationPageStore,
  ) as GiftCardConfirmationPageStore

  const GCPreviewData = {
    receiverName:
      GCFormDetailsStore?.data?.receiverFirstName !== undefined &&
      GCFormDetailsStore?.data?.receiverLastName !== undefined
        ? `${GCFormDetailsStore?.data?.receiverFirstName} ${GCFormDetailsStore?.data?.receiverLastName}`
        : giftCardConfirmationPageStore?.paymentConfirmationResponse?.receiverFirstName !== undefined
        ? ` ${giftCardConfirmationPageStore?.paymentConfirmationResponse?.receiverFirstName} ${giftCardConfirmationPageStore?.paymentConfirmationResponse?.receiverLastName}`
        : "",
    senderName:
      GCFormDetailsStore?.data?.senderFirstName !== undefined && GCFormDetailsStore?.data?.senderLastName !== undefined
        ? `${GCFormDetailsStore?.data?.senderFirstName} ${GCFormDetailsStore?.data?.senderLastName}`
        : giftCardConfirmationPageStore?.paymentConfirmationResponse?.senderFirstName !== undefined
        ? ` ${giftCardConfirmationPageStore?.paymentConfirmationResponse?.senderFirstName} ${giftCardConfirmationPageStore?.paymentConfirmationResponse?.senderLastName}`
        : "",
    customMessage:
      GCFormDetailsStore?.data?.customMessage ??
      (giftCardConfirmationPageStore?.paymentConfirmationResponse?.message ||
        giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.message),
  }

  const router = useRouter()

  const fetchEGCDetails = async (sku: string | string[] | null) => {
    const query = groq`*[_type == "giftCardsDetails" && sku == "${sku}"]`
    await getClient(true)
      .fetch(query)
      .then((data) => {
        GCFormDetailsStore?.updateGCThemeData(data?.[0])
        setDynamicEGCImageFront(data?.[0]?.cardPreview?.frontImage)
        setDynamicEGCImageBack(data?.[0]?.cardPreview?.backImage)
      })
  }

  useEffect(() => {
    const isConfirmationPage: boolean = router?.asPath?.toString()?.includes("confirmation")

    if (isConfirmationPage) {
      fetchEGCDetails(giftCardConfirmationPageStore?.paymentConfirmationResponse?.giftCard?.[0]?.sku)
    }
    if (router?.query?.sku !== undefined) {
      fetchEGCDetails(router?.query?.sku)
    }

    return () => {
      if (isConfirmationPage) {
        global?.window?.localStorage?.removeItem("theme")
        global?.window?.localStorage?.removeItem("gc-title")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query, giftCardConfirmationPageStore?.paymentConfirmationResponse])

  const isMobile = useMobileCheck()
  const { cardPadding } = useAesthetics(aesthetic?._ref)

  return (
    <>
      <PreviewContainer
        sx={{
          padding: isMobile ? cardPadding?.mobile : cardPadding?.desktop,
        }}
        aria-label="gift-card-preview-component">
        <CardBox container $isMobile={isMobile} sx={{ display: imgLoaded ? "flex" : "none" }}>
          <Grid>
            <CardMedia
              onLoad={() => setImgLoaded(true)}
              alt={dynamicEGCImageFront?.largeImage?.altText || "media"}
              component="img"
              sx={{
                objectFit: "contain",
                borderRadius: DesktopPxToVw(30),
                width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(728),
              }}
              src={
                dynamicEGCImageFront?.largeImage?.asset?._ref
                  ? urlFor(
                      dynamicEGCImageFront?.largeImage?.asset?._ref && dynamicEGCImageFront?.largeImage?.asset?._ref,
                    ).url()
                  : urlFor("image-6f000ddf9f1d17aaf0fdcbb1a47e5c07300a6f93-454x340-png").url() // if no image received from cms this is default image
              }
            />
          </Grid>
          <Grid>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                alt={dynamicEGCImageBack?.largeImage?.altText || "media"}
                component={"img"}
                sx={{
                  objectFit: "contain",
                  borderRadius: DesktopPxToVw(30),
                  width: isMobile ? MobilePxToVw(476) : DesktopPxToVw(728),
                }}
                src={
                  dynamicEGCImageBack?.largeImage?.asset?._ref
                    ? urlFor(
                        dynamicEGCImageBack?.largeImage?.asset?._ref && dynamicEGCImageBack?.largeImage?.asset?._ref,
                      ).url()
                    : urlFor("image-d126721d52761a19d58ae8c5fe737bdc488a0214-454x340-png").url() // if no image received from cms this is default image
                }
              />
              {
                <MessageBox $isMobile={isMobile}>
                  <Typography
                    variant={isMobile ? "m-body-ml" : "body-ml"}
                    sx={{
                      color: GCFormDetailsStore?.GCThemeData?.fontColor?.hex,
                    }}>
                    {`${CONSTANTS?.DEAR} `}
                    {GCPreviewData?.receiverName.length > 1 ? (
                      <>
                        <b>{GCPreviewData?.receiverName}</b>
                      </>
                    ) : (
                      "..."
                    )}
                  </Typography>
                  <CustomMessage>
                    <Typography
                      variant={isMobile ? "m-body-ml" : "body-ml"}
                      sx={{
                        color: GCFormDetailsStore?.GCThemeData?.fontColor?.hex,
                        lineBreak: "anywhere",
                      }}>
                      {GCPreviewData?.customMessage
                        ? `“${GCPreviewData?.customMessage}”`
                        : "Your Message will show here"}
                    </Typography>
                  </CustomMessage>
                  <SenderBox $isMobile={isMobile}>
                    <Typography
                      variant={isMobile ? "m-body-ml" : "body-ml"}
                      sx={{
                        color: GCFormDetailsStore?.GCThemeData?.fontColor?.hex,
                      }}>
                      <b>{GCPreviewData?.senderName.length > 3 ? GCPreviewData?.senderName : CONSTANTS?.SENDER}</b>
                    </Typography>
                  </SenderBox>
                </MessageBox>
              }
            </Box>
          </Grid>
        </CardBox>
        {secondaryAction?.title && (
          <RenderActionItem
            url={secondaryAction?.url}
            title={secondaryAction?.title}
            variant={secondaryAction?.variant}
            navigationType={secondaryAction?.urlType}
            isActionButtonType={false}
            buttonStyles={{
              display: "flex",
              justifyContent: "center",
              paddingTop: DesktopPxToVw(47),
            }}
          />
        )}
      </PreviewContainer>
    </>
  )
})

export default GiftCardPreviewComponent
