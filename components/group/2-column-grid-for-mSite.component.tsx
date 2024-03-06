import React, { useContext, useState } from "react"
import { Grid } from "@mui/material"
import { CONSTANTS } from "../constants"
import {
  StyledExpandMoreButton,
  StyledExpandMoreIcon,
  LoadMoreActionButtonWrapper,
} from "./styles/common-styled-components"
import { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const TwoColumnGridForMsite = ({ props }: any) => {
  const context = useContext(IHCLContext)

  const initialCardsToShow = CONSTANTS?.FOUR
  const [countToShowCards, setCountToShowCards] =
    useState<number>(initialCardsToShow)

  return (
    <Grid
      container
      rowGap={MobilePxToVw(27)}
      columnGap={MobilePxToVw(62)}
      sx={{ justifyContent: "center" }}>
      {props?.slice(0, countToShowCards)?.map((item: any, index: number) => (
        <Grid key={index} item xs={5.2} sm={5.2} md={5.2}>
          {context?.renderComponent(item?._type, item, index)}
        </Grid>
      ))}
      {props?.length > initialCardsToShow &&
        props?.length - countToShowCards > 0 && (
          <LoadMoreActionButtonWrapper item xs={12} sm={12} md={12}>
            <StyledExpandMoreButton
              variant="light-outlined"
              endIcon={
                <StyledExpandMoreIcon
                  sx={{
                    height: "3.875vw",
                  }}
                />
              }
              onClick={() => {
                setCountToShowCards(countToShowCards + 2)
              }}>
              {CONSTANTS?.LOAD_MORE}
            </StyledExpandMoreButton>
          </LoadMoreActionButtonWrapper>
        )}
    </Grid>
  )
}

export default TwoColumnGridForMsite
