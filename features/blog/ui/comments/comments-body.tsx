import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../../../utils/Constants"
import BlogStore from "../../store/blog.store"
import { useLoggedIn } from "../../../../utils/hooks/useLoggedIn"
import dynamic from "next/dynamic"
import { CommentsHeadingWrapper } from "../styles/blog-cards-styles"
import { ActionProps, PathType, parameterMapItems } from "../../../../components"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { useAppNavigation } from "../../../../utils/NavigationUtility"

const CommentBox = dynamic(() => import("./comment-box"))
const CommentsList = dynamic(() => import("./comments-list"))

type GroupActionType = {
  primaryAction: ActionProps
  secondaryAction: ActionProps
  ctaLabel: ActionProps
}

type propsType = {
  parameterMap: parameterMapItems[]
  cardMobileVariant: string
  cardLargeVariant: string
}
type CommentTypes = {
  heading: string
  subTitle: string
  groupActionType: GroupActionType[]
  props?: propsType
  parameterMap: parameterMapItems[]
  cardLargeVariant: string
  cardMobileVariant: string
}

function CommentsBody({
  heading,
  subTitle,
  groupActionType,
  parameterMap,
  cardLargeVariant,
  cardMobileVariant,
}: CommentTypes) {
  const ihclContext = useContext(IHCLContext)
  const isLoggedIn = useLoggedIn()
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()

  const blogStore = ihclContext?.getGlobalStore(GLOBAL_STORES?.blogStore) as BlogStore

  const { comments } = blogStore?.blogData || {}

  let allComments = comments?.filter((comment: { approved: any }) => comment?.approved === true)

  return (
    <Box>
      {/* Comment's Header */}
      <CommentsHeadingWrapper>
        <Typography
          variant={isMobile ? "m-heading-s" : "heading-s"}
          sx={{ display: "block", letterSpacing: "1.6px" }}>{`${heading}${
          allComments?.length > 0 ? ` (${allComments?.length})` : ""
        }`}</Typography>

        {!isLoggedIn && (
          <Typography
            variant={isMobile ? "m-body-sl" : "body-ml"}
            sx={{ display: "block", marginTop: isMobile ? "3.125vw" : "0vw" }}>
            {`${subTitle} `}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                navigate(groupActionType?.[0]?.primaryAction?.url, PathType?.dialog)
              }}>
              {groupActionType?.[0]?.primaryAction?.title}
            </span>
          </Typography>
        )}
      </CommentsHeadingWrapper>

      {/* Comment's Input Box */}
      <CommentBox groupActionType={groupActionType} />

      {/*Blogs Comments */}
      {allComments?.length > 0 && (
        <CommentsList
          comments={allComments}
          parameterMap={parameterMap}
          cardMobileVariant={cardMobileVariant}
          cardLargeVariant={cardLargeVariant}
          groupActionType={groupActionType}
        />
      )}
    </Box>
  )
}

export default observer(CommentsBody)
