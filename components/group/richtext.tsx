import { theme } from "../../lib/theme"
import { Box, Grid } from "@mui/material"
import React, { useContext, useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import {
  RichTextLoadMoreBox,
  RichTextLoadMoreTypography,
} from "./styles/richtext-style"
import { CONSTANTS } from "../constants"
import { useMobileCheck } from "../../utils/isMobilView"

const RichText = ({ props, isPaginationEnabled, preRenderItemsCount }: any) => {
  const context = useContext(IHCLContext)
  const isMobile = useMobileCheck()
  const [cardsToShow, setCardsToShow] = useState(
    preRenderItemsCount ? preRenderItemsCount : 6
  )
  const handleShowMore = () => {
    setCardsToShow(cardsToShow + 3)
  }
  return (
    <Box>
      {props && props?.length > 0 && (
        <Grid
          container
          spacing={{ md: props[0]?.bgColor ? 0 : 7.2 }} // added 7.2 due to epicureprogram-terms-and-conditions page download button getting effected
          columns={{ xs: 12, sm: 8, md: 12 }}>
          {props
            ?.slice(0, isPaginationEnabled ? cardsToShow : props.length)
            .map((card: any, index: number) => {
              return (
                <Grid
                  sx={
                    card._type !== "blockSection" &&
                    card.identifier === CONSTANTS?.ADDRESS &&
                    !isMobile //made changes for contact-us page
                      ? {}
                      : {
                          "&>div": {
                            height: "100%",
                          },
                          "&>div>div": {
                            height: "100%",
                          },
                        }
                  }
                  item
                  xs={12}
                  sm={
                    isMobile
                      ? 12
                      : card.identifier === CONSTANTS?.ADDRESS
                      ? 4
                      : 12
                  }
                  md={card.identifier === CONSTANTS?.ADDRESS ? 4 : 12}
                  key={index}>
                  {context?.renderComponent(card._type, card)}
                </Grid>
              )
            })}
        </Grid>
      )}
      {props.length > cardsToShow && isPaginationEnabled && (
        <Grid container>
          <RichTextLoadMoreBox onClick={() => handleShowMore()}>
            <RichTextLoadMoreTypography
              variant={isMobile ? "m-link-m" : "link-m"}>
              {CONSTANTS?.LOAD_MORE}
            </RichTextLoadMoreTypography>
            <KeyboardArrowDownIcon
              sx={{ color: theme?.palette?.neuPalette?.hexTwo }}
            />
          </RichTextLoadMoreBox>
        </Grid>
      )}
    </Box>
  )
}

export default RichText
