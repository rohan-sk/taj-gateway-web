import React, { useContext } from "react"
import { Box, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import ModalStore from "../../../../store/global/modal.store"
import { useMobileCheck } from "../../../../utils/isMobilView"
const RenderActionItem =dynamic(() => import("../../../hoc/actions/action-items-ui"))
import { FullBox } from "../wedding-enquire-forms/wedding-enquire-styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  MainContainer,
  TitleContainer,
  DescriptionBox,
  StatusContainer,
} from "./news-letter-form.styles"


const NewsLetterSubscriptionResult = (props: any) => {
  const isMobile = useMobileCheck()
  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText

  const modalStore = ModalStore.getInstance()

  const handleClose = () => {
    modalStore?.closeModal()
  }

  return (
    <MainContainer aria-label={isMobile ? props?.variant : props?.largeVariant}>
      <StatusContainer
        $isPrimaryAvailable={props?.primaryAction?.url?.length > 0}>
        {props?.title && (
          <TitleContainer
            $isPrimaryAvailable={props?.primaryAction?.url?.length > 0}
            sx={{ padding: isMobile ? `0vw ${MobilePxToVw(15)}` : "unset" }}>
            <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>
              {props?.title}
            </Typography>
          </TitleContainer>
        )}

        {props?.subTitle && (
          <FullBox sx={{ margin: "0 auto" }}>
            <Typography variant={isMobile ? "m-body-ml" : "body-ml"}>
              {props?.subTitle}
            </Typography>
          </FullBox>
        )}
        {(props?.singleContent?.length > 0 || props?.content?.length > 0) && (
          <Box
            onClick={handleClose}
            sx={{
              marginBottom: isMobile ? "3.125vw" : "",
              textAlign: "center",
              display: props?.content?.length > 0 ? "grid" : "inherit",
              "& span": {
                fontSize: isMobile
                  ? `${MobilePxToVw(22)}`
                  : `${DesktopPxToVw(22)}`,
              },
              "& span span": {
                fontWeight: `${700} !important`,
                fontSize: isMobile
                  ? `${MobilePxToVw(22)} !important`
                  : `${DesktopPxToVw(22)} !important`,
              },
            }}>
            {props?.singleContent?.map((item: any, index: number) => (
              <PortableText blocks={item} key={index} />
            ))}
            {props?.content?.map((item: any, index: number) => (
              <PortableText blocks={item?.content} key={index} />
            ))}
          </Box>
        )}
      </StatusContainer>
      <FullBox>
        {props?.description && (
          <>
            <DescriptionBox>
              <FullBox
                sx={{
                  marginBottom: isMobile ? "3.125vw" : "1.042vw",
                }}>
                <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                  {props?.description}
                </Typography>
              </FullBox>
              <FullBox sx={{ display: "flex", justifyContent: "center" }}>
                <Box onClick={handleClose}>
                  <RenderActionItem
                    url={props?.primaryAction?.url}
                    title={props?.primaryAction?.title}
                    navigationType={props?.primaryAction?.urlType}
                    variant={"light-contained"}
                    isActionButtonType={false}
                  />
                </Box>
              </FullBox>
            </DescriptionBox>
          </>
        )}
      </FullBox>
    </MainContainer>
  )
}

export default NewsLetterSubscriptionResult
