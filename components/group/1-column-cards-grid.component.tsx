import React, { useContext, useState } from "react"
import { CONSTANTS } from "../constants"
import { GroupItems } from "./group-types"
import { Button, Grid } from "@mui/material"
import { KeyboardArrowDown } from "@mui/icons-material"
import { LoadMoreActionGrid } from "./styles/common-styled-components"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { useMobileCheck } from "../../utils/isMobilView"
import { theme } from "../../lib/theme"

interface SingleColumnCardsGridProps {
  props: GroupItems[]
  textColor?: any
}

const SingleColumnCardsGrid = ({
  props,
  textColor,
}: SingleColumnCardsGridProps) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const numberOfCardsToShow = CONSTANTS?.FOUR
  const [cardsToShow, setCardsToShow] = useState<number>(numberOfCardsToShow)

  return (
    // this rowSpacing took from global template
    <Grid container rowSpacing={isMobile ? MobilePxToVw(60) : "1.563vw"}>
      {props?.slice(0, cardsToShow)?.map((item: GroupItems, index: number) => (
        <Grid key={index} item xs={12} sm={12}>
          {context?.renderComponent(item?._type, item, index)}
        </Grid>
      ))}
      {cardsToShow < (props?.length || 10) && (
        <LoadMoreActionGrid item xs={12} sm={12}>
          <Button
            variant="light-outlined"
            sx={{
              borderColor: textColor
                ? `${textColor}!important`
                : theme?.palette?.neuPalette?.hexTwo,
              color: textColor
                ? `${textColor}!important`
                : theme?.palette?.neuPalette?.hexTwo,
            }}
            endIcon={<KeyboardArrowDown />}
            onClick={() => setCardsToShow(cardsToShow + 1)}>
            {CONSTANTS?.LOAD_MORE}
          </Button>
        </LoadMoreActionGrid>
      )}
    </Grid>
  )
}

export default SingleColumnCardsGrid
