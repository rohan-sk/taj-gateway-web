import React, { useState, useContext } from "react"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { Box, Typography } from "@mui/material"
import { SortIcon } from "../../../../utils/customIcons"
import { SortTextTypographyBox, CommentsButtonWrapper } from "../styles/blog-cards-styles"
import { parameterMapItems } from "../../../../components"
import { observer } from "mobx-react-lite"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { theme } from "../../../../lib/theme"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"
import { CONSTANTS } from "../../../../components/constants"

type CommentsDataTypes = {
  comments: []
  parameterMap: parameterMapItems[]
  cardMobileVariant: string
  cardLargeVariant: string
  groupActionType: any
}

function CommentsList({
  comments,
  parameterMap,
  cardMobileVariant,
  cardLargeVariant,
  groupActionType,
}: CommentsDataTypes) {
  const ihclContext = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const sortByNewest = parameterMap?.[0]?.value
  const sortByOldest = parameterMap?.[1]?.value
  const commentsLoadMore = groupActionType?.[3]?.emptyLink
  const [dateSortedValue, setDateSortedValue] = useState<boolean>(true)
  const [showComments, setShowComments] = useState<number>(CONSTANTS?.TEN)

  const sortedDates = comments
    ?.map((eachComment: any) => {
      return { ...eachComment, date: new Date(eachComment?._createdAt) }
    })
    ?.sort((a, b) => {
      if (dateSortedValue) {
        return b?.date - a?.date
      } else {
        return a?.date - b?.date
      }
    })

  return (
    <Box>
      {sortedDates?.length > 1 && (
        <SortTextTypographyBox>
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={() => setDateSortedValue(!dateSortedValue)}
            variant={isMobile ? "m-body-l" : "body-l"}>
            {dateSortedValue ? sortByNewest : sortByOldest}
            <SortIcon
              sx={{
                margin: isMobile ? "0vw 1.56vw 0vw 4.22vw" : "0vw 0.52vw 0vw 1.41vw",
              }}
            />
          </Typography>
        </SortTextTypographyBox>
      )}

      {sortedDates?.slice(0, showComments)?.map((item: any, index: number) => (
        <Box key={index}>
          {ihclContext?.renderComponent("card", {
            variant: cardMobileVariant,
            largeVariant: cardLargeVariant,
            data: {
              ...item,
              checkCommentsIndex: index,
              checkCommentsLength: sortedDates?.length,
            },
          })}
        </Box>
      ))}

      {comments?.length > showComments && (
        <CommentsButtonWrapper
          onClick={() => {
            setShowComments(showComments + CONSTANTS?.FIVE)
          }}>
          <RenderActionItem
            url={commentsLoadMore?.url}
            isActionButtonType={true}
            variant={commentsLoadMore?.variant}
            navigationType={commentsLoadMore?.urlType}
            title={commentsLoadMore?.title}
            onClick={() => {}}
            buttonStyles={{
              letterSpacing: "1.8px",
              fontWeight: 400,
              padding: "0vw !important",
              height: "auto !important",
              color: theme?.palette?.neuPalette?.hexTwo,
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          />
          <ExpandMoreIcon sx={{ color: theme?.palette?.neuPalette?.hexTwo }} />
        </CommentsButtonWrapper>
      )}
    </Box>
  )
}

export default observer(CommentsList)
