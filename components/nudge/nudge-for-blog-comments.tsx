import React, { useContext } from "react"
import { Typography } from "@mui/material"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { ActionProps } from "../types"
import { useMobileCheck } from "../../utils/isMobilView"
import { NudgeBlogCommentDialogWrapper } from "./styles/nudge-wellness-success"
import ModalStore from "../../store/global/modal.store"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import BlogStore from "../../features/blog/store/blog.store"
import { observer } from "mobx-react-lite"

type NudgeWithMailAction = {
  subtitle: string
  description: string
  PrimaryAction: ActionProps
}

const BlogCommentsModal = (props: NudgeWithMailAction) => {
  const isMobile = useMobileCheck()
  const modalStore = ModalStore.getInstance()
  const ihclContext = useContext(IHCLContext)
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore
  const modalMessage = blogStore?.blogData?._id ? props?.subtitle : props?.description

  return (
    <NudgeBlogCommentDialogWrapper>
      <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"} sx={{ letterSpacing: "0px" }}>
        {modalMessage}
      </Typography>

      {props?.PrimaryAction?.title && (
        <RenderActionItem
          isActionButtonType={true}
          onClick={() => modalStore.closeModal()}
          url={props?.PrimaryAction?.url}
          title={props?.PrimaryAction?.title}
          variant={props?.PrimaryAction?.variant}
          navigationType={props?.PrimaryAction?.urlType}
          buttonStyles={{
            letterSpacing: "1.8px",
          }}
        />
      )}
    </NudgeBlogCommentDialogWrapper>
  )
}

export default observer(BlogCommentsModal)
