import React from "react"
import { Box, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { AbsoluteBox, MainBox } from "./styles/cancel-failure-modal"
import ModalStore from "../../../store/global/modal.store"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
const RenderActionItem = dynamic(() => import("../../../components/hoc/actions/action-items-ui"))
import { PortableText } from "../../../lib/portable-text-serializers"

const CancelOrderFailureModal = (props: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()

  return (
    <AbsoluteBox>
      <MainBox aria-label="cancel-failure-modal">
        <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
          {props?.title}
        </Typography>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <PortableText blocks={props?.singleContent?.[0]} />
        </Box>
        <RenderActionItem
          isActionButtonType={false}
          url={props?.primaryAction?.url}
          title={props?.primaryAction?.title}
          variant={props?.primaryAction?.variant}
          navigationType={props?.primaryAction?.urlType}
          showArrow={false}
          onClick={() => {
            navigate(props?.primaryAction?.url, props?.primaryAction?.urlType)
            modalStore?.closeModal()
          }}
        />
      </MainBox>
    </AbsoluteBox>
  )
}

export default CancelOrderFailureModal
