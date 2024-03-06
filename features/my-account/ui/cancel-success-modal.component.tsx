import React from "react"
import { Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../../lib-sanity"
import { useMobileCheck } from "../../../utils/isMobilView"
import ModalStore from "../../../store/global/modal.store"
import { useAppNavigation } from "../../../utils/NavigationUtility"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { RightImage, ButtonsStack, MainBox, AbsoluteBox } from "./styles/cancel-success-modal"

const CancelSuccessModal = ({ image, title, description, PrimaryAction, secondaryAction }: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()

  return (
    <AbsoluteBox>
      <MainBox aria-label="cancel-success-modal">
        {image?.asset?._ref && (
          <RightImage loading="lazy" component={"img"} src={urlFor(image?.asset?._ref).url()} />
        )}
        <Typography variant={isMobile ? "m-heading-s" : "heading-m"}>{title}</Typography>
        {description && (
          <Typography variant={isMobile ? "m-body-m" : "body-m"} mt="0.885vw">
            {description}
          </Typography>
        )}
        <ButtonsStack>
          <RenderActionItem
            isActionButtonType={true}
            title={PrimaryAction?.title}
            variant={PrimaryAction?.variant}
            navigationType={PrimaryAction?.urlType}
            url={PrimaryAction?.url}
            onClick={() => {
              navigate(PrimaryAction?.url, PrimaryAction?.urlType)
              modalStore?.closeModal()
            }}
          />
          {
            global?.window.localStorage.getItem("accessToken") && <RenderActionItem
              isActionButtonType={true}
              title={secondaryAction?.title}
              variant={secondaryAction?.variant}
              navigationType={secondaryAction?.urlType}
              url={secondaryAction?.url}
              onClick={() => {
                navigate(secondaryAction?.url, secondaryAction?.urlType)
                modalStore?.closeModal()
              }}
            />
          }
        </ButtonsStack>
      </MainBox>
    </AbsoluteBox>
  )
}

export default CancelSuccessModal
