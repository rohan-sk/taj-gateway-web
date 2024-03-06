import React, { useContext, useState } from "react"
import { Box } from "@mui/material"
import { orderRefNumber } from "../../../../components/forms/gift-card-form/constants"
import { useMobileCheck } from "../../../../utils/isMobilView"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { UserProfileIcon } from "../../../../utils/customIcons"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { COMMENTS_CONSTANTS } from "../../constants"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import { CommentsBoxWrapper, CommentsInputTextField, UseIconAndTextFieldWrapper } from "../styles/blog-cards-styles"
import { observer } from "mobx-react-lite"
import { ActionProps } from "../../../../components"
import { useAppNavigation } from "../../../../utils/NavigationUtility"
import dynamic from "next/dynamic"

const LoadingSpinner = dynamic(() => import("../../../../utils/SpinnerComponent"))

type GroupActionType = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
  ctaLabel: ActionProps
}

function CommentBox({ groupActionType }: { groupActionType: GroupActionType[] }) {
  const isMobile = useMobileCheck()
  const isLoggedIn = useLoggedIn()
  const navigate = useAppNavigation()
  const [value, setValue] = useState<string>("")
  const ihclContext = useContext(IHCLContext)
  const loggedUserFirstName = global?.window?.localStorage?.getItem("userFirstName")
  const loggedUserLastName = global?.window?.localStorage?.getItem("userLastName")
  const userFullName = `${loggedUserFirstName} ${loggedUserLastName}`
  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  const handleChangeForm = (event: any) => {
    setValue(event?.target?.value)
  }

  async function submitComment() {
    if (isLoggedIn && value?.length > 3) {
      await blogStore?.publishComment({
        blogId: blogStore?.blogData?._id,
        data: {
          name: userFullName,
          description: value,
          approved: false,
        },
      })
      setValue("")
      navigate(groupActionType?.[1]?.ctaLabel?.url, groupActionType?.[1]?.ctaLabel?.urlType)
    }
  }

  return (
    <>
      {blogStore?.commentLoader && <LoadingSpinner componentLevel={true} />}
      <CommentsBoxWrapper>
        <UseIconAndTextFieldWrapper>
          <UserProfileIcon
            sx={{
              width: isMobile ? MobilePxToVw(60) : DesktopPxToVw(80),
              height: isMobile ? MobilePxToVw(60) : DesktopPxToVw(80),
            }}
          />
          <CommentsInputTextField
            className="comment-input"
            autoComplete="off"
            placeholder={COMMENTS_CONSTANTS?.commentInputPlaceHolder}
            variant="standard"
            value={value}
            name={orderRefNumber}
            onChange={(e: any) => {
              handleChangeForm(e)
            }}
          />
        </UseIconAndTextFieldWrapper>
        {!isLoggedIn && (
          <Box sx={{ textAlign: "end" }}>
            <RenderActionItem
              isDisable={false}
              isActionButtonType={true}
              url={groupActionType?.[2]?.secondaryAction?.url}
              title={groupActionType?.[2]?.secondaryAction?.title}
              onClick={() => {}}
              navigationType={groupActionType?.[2]?.secondaryAction?.urlType}
              variant={groupActionType?.[2]?.secondaryAction?.variant}
              buttonStyles={{
                letterSpacing: "1.8px",
              }}
            />
          </Box>
        )}
        {isLoggedIn && (
          <Box sx={{ textAlign: "end" }}>
            <RenderActionItem
              isDisable={isLoggedIn && value?.length > 3}
              isActionButtonType={true}
              url={""}
              title={groupActionType?.[1]?.ctaLabel?.title}
              onClick={submitComment}
              navigationType={""}
              variant={groupActionType?.[1]?.ctaLabel?.variant}
              buttonStyles={{
                letterSpacing: "1.8px",
              }}
            />
          </Box>
        )}
      </CommentsBoxWrapper>
    </>
  )
}
export default observer(CommentBox)
