import React, { useState } from "react"
import { Box } from "@mui/material"
import { ImageProps } from "../types"
import { theme } from "../../lib/theme"
import { CONSTANTS } from "../constants"
import { urlFor } from "../../lib-sanity"
import { ContentBox, DescriptionTypo, MainBox, TitleTypo } from "./styles/card-with-bold-title"

interface CardWithBoldTitle {
  title: string
  image: ImageProps
  description: string
  characterLength?: number
}

const CardWithBoldTitle = (props: CardWithBoldTitle) => {
  const { title, description, image, characterLength } = props

  const [HideMore, setHideMore] = useState<boolean>(false)
  const [contentLength, setContentLength] = useState<number>(characterLength ?? 100)

  return (
    <MainBox>
      {image?.asset?._ref && (
        <Box
          width={"100%"}
          height={"100%"}
          component={"img"}
          alt={image?.altText || "-img"}
          src={urlFor(image?.asset?._ref).url()}
        />
      )}
      <ContentBox>
        {title && <TitleTypo variant="m-heading-m">{title}</TitleTypo>}
        {description && (
          <DescriptionTypo variant="m-body-l">
            {description.length > contentLength ? (
              <>
                {`${description.slice(0, contentLength)}${"... "}`}
                {!HideMore && (
                  <>
                    <span
                      style={{
                        color: theme?.palette?.neuPalette?.hexTwo,
                      }}
                      onClick={() => {
                        setContentLength(description.length), setHideMore(!HideMore)
                      }}>
                      {CONSTANTS?.MORE_TO_EXPAND_TEXT}
                    </span>
                  </>
                )}
              </>
            ) : (
              description
            )}
          </DescriptionTypo>
        )}
      </ContentBox>
    </MainBox>
  )
}

export default CardWithBoldTitle
