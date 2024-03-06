import { Card, CardMedia, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { urlFor } from "../../lib-sanity"
import { useMobileCheck } from "../../utils/isMobilView"
import { BoxContainer, TitleDescBox, TitleTypography } from "./styles/alternate-image-description-card"

const AlternateCardDescription = (props: any) => {
  const isMobile = useMobileCheck()
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #45443F 0%, #13130F 100%)",
      }}>
      {props?.props?.map((card: any, index: number) => {
        return singleCard(card)
      })}
    </Box>
  )
}

const singleCard = (card: any) => {
  return (
    <BoxContainer
      sx={{
        flexFlow: card?.leftOrRightImage ? "row-reverse" : "row",
      }}>
      <Box>
        {/* eslint-disable @next/next/no-img-element */}
        <img
          height={"300px"}
          src={urlFor(card?.largeImage?.asset?._ref).url()}
          alt={card?.largeImage?.altText || "card-image"}
        />
      </Box>
      <TitleDescBox>
        <TitleTypography variant="heading-m">{card?.title}</TitleTypography>
        <TitleTypography>{card?.subTitle}</TitleTypography>
        <TitleTypography>{card?.description}</TitleTypography>
      </TitleDescBox>
    </BoxContainer>
  )
}

export default AlternateCardDescription
