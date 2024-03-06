import { useMobileCheck } from "../../../../utils/isMobilView"
import CommentsBody from "../comments/comments-body"
import { CommentsWrapper } from "../styles/blogs-landing-page"
import { useAesthetics } from "../../../../utils/fetchAsthetics"
import { BlogTypesDeclarations } from "../blogTypes/blogTypesDeclarations"

function Comments(props: BlogTypesDeclarations) {
  const { groupLargeVariant, groupMobileVariant, cardLargeVariant, cardMobileVariant, aesthetic, ...rest } = props
  const isMobile = useMobileCheck()
  return (
    <>
      {isMobile
        ? groupMobileVariant == "blog.group.comments" && <CommentsMobile {...props} />
        : groupLargeVariant == "blog.group.comments" && (
            <CommentsWrapper $padding={aesthetic?.padding?.desktop} $bgcolor={aesthetic?.gradient}>
              <CommentsBody {...props} />
            </CommentsWrapper>
          )}
    </>
  )
}

export default Comments

function CommentsMobile(props: any) {
  let dynamicAesthetics = useAesthetics(props?.aesthetic?._ref)?.extraData?.[0]
  return (
    <>
      {dynamicAesthetics && (
        <CommentsWrapper $padding={dynamicAesthetics?.padding?.mobile} $bgcolor={dynamicAesthetics?.gradient}>
          <CommentsBody {...props} />
        </CommentsWrapper>
      )}
    </>
  )
}
