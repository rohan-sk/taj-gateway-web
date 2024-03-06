import { Fade, Typography } from "@mui/material"
import React, { useState } from "react"
import { theme } from "../../lib/theme"
import { variantTypes } from "../../types"
import { GoldMoreIcon } from "../../utils/customIcons"

interface ReadMoreInterface {
  children: string
  length: number
  variant?: variantTypes
  textStyles?: any
  customReadMoreColor?: any
}

const CustomReadMore = ({
  children,
  length,
  variant,
  textStyles,
  customReadMoreColor = theme?.palette?.neuPalette?.hexTwo,
}: ReadMoreInterface) => {
  const commentBoxStyle = {
    color: customReadMoreColor,
    cursor: "pointer",
  }
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <Typography variant={variant} sx={{ ...textStyles }}>
      {text?.slice(0, length)}
      {text?.length > length && (
        <>
          {isReadMore && <span>{`...`}</span>}
          <span
            onClick={toggleReadMore}
            style={commentBoxStyle}
            contentEditable="false"
            suppressContentEditableWarning={true}>
            {isReadMore && (
              <GoldMoreIcon sx={{ display: "inherit !important" }} />
            )}
          </span>
        </>
      )}
      {!isReadMore && (
        <Fade timeout={!isReadMore ? 800 : 0} in={!isReadMore}>
          <span>
            {text?.slice(length, text?.length)}
            <GoldMoreIcon
              onClick={toggleReadMore}
              sx={{
                transform: "rotate(180deg) !important",
                display: "inherit !important",
                cursor: "pointer",
              }}
            />
          </span>
        </Fade>
      )}
    </Typography>
  )
}

export default CustomReadMore
