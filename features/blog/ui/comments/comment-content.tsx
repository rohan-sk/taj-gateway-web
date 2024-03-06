import React, { useState } from "react"
import { Box, Typography } from "@mui/material"
import { UserProfileIcon } from "../../../../utils/customIcons"
import { useMobileCheck } from "../../../../utils/isMobilView"
import { observer } from "mobx-react-lite"
import { CommentsContentBox, CommentsWrapperBox, UserProfileAndNameWrapper } from "../styles/blog-cards-styles"
import { CONSTANTS } from "../../../../components/constants"
import dynamic from "next/dynamic"
import { formatTimeSince } from "../../../../utils/getDate"

const CustomReadMore = dynamic(() => import("../../../../components/hoc/CustomReadMore"))

type CommentType = {
  data: {
    description: string
    name: string
    _createdAt: string | number
    checkCommentsLength: number
    checkCommentsIndex: number
  }
}

function CommentContent({
  data: { description, name, _createdAt, checkCommentsLength, checkCommentsIndex },
}: CommentType) {
  const isMobile = useMobileCheck()
  const commentDescCount = isMobile
    ? CONSTANTS?.MOBILE_COMMENT_DESCRIPTION_LIMIT
    : CONSTANTS?.WEB_COMMENT_DESCRIPTION_LIMIT
  const [more, setMore] = useState<number>(commentDescCount)

  return (
    <CommentsWrapperBox
      sx={{
        margin:
          checkCommentsIndex === checkCommentsLength - 1 ? "2.08vw 2.08vw 0vw 2.08vw" : "2.08vw 2.08vw 2.08vw 2.08vw",
        "@media (max-width: 640px)": {
          margin: checkCommentsIndex === checkCommentsLength - 1 ? "6.25vw 0vw 0vw 0vw" : "6.25vw 0vw",
        },
      }}>
      {isMobile && (
        <UserProfileAndNameWrapper>
          <UserProfileIcon sx={{ width: "9.37vw", height: "9.37vw" }} />
          <Typography variant={"m-body-sxl"} sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          <Typography variant={"m-body-sxl"} sx={{ fontWeight: 300 }}>
            {formatTimeSince(_createdAt)}
          </Typography>
        </UserProfileAndNameWrapper>
      )}
      {!isMobile && <UserProfileIcon sx={{ width: "4.166vw", height: "4.166vw" }} />}
      <CommentsContentBox>
        {!isMobile && (
          <Box sx={{ display: "flex", gap: "0.83vw", alignItems: "center" }}>
            <Typography variant={"body-ml"} sx={{ fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant={"body-ml"}>{formatTimeSince(_createdAt)}</Typography>
          </Box>
        )}
        {description && (
          <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
            {description.length > more ? (
              <CustomReadMore length={more} variant={isMobile ? "m-body-l" : "body-ml"}>
                {description}
              </CustomReadMore>
            ) : (
              description
            )}
          </Typography>
        )}
      </CommentsContentBox>
    </CommentsWrapperBox>
  )
}

export default observer(CommentContent)
