import React from "react"
import { useRouter } from "next/router"
import { urlFor } from "../../lib-sanity"
import { Box, Grid } from "@mui/material"
import { ImageProps, ActionProps } from "../types"
import { SocialIconBox } from "./styles/multi-cards"
import { useMobileCheck } from "../../utils/isMobilView"
import { useAppNavigation } from "../../utils/NavigationUtility"

type MultiCardsProps = {
  props: MultiCardItems[]
}

type MultiCardItems = {
  title: string
  logo: ImageProps
  image: ImageProps
  largeImage: ImageProps
  primaryAction: ActionProps
}

const MultiCards = ({ props }: MultiCardsProps) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  return (
    <Grid container spacing={isMobile ? "4.21vw" : "2.083vw"}>
      {props?.slice(0, isMobile ? 4 : props?.length)?.map((item: MultiCardItems, index: number) => (
        <Grid key={index} item xs={6} sm={isMobile ? 6 : 3} md={3} lg={3} xl={3}>
          <Box
            sx={{
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => {
              navigate(item?.primaryAction?.url, item?.primaryAction?.urlType)
            }}>
            {((isMobile && item?.image?.asset?._ref) || (!isMobile && item?.largeImage?.asset?._ref)) && (
              <Box
                alt={(isMobile ? item?.image?.altText : item?.largeImage?.altText) || `-img`}
                width={"100%"}
                height={"100%"}
                component={"img"}
                src={urlFor(isMobile ? item?.image?.asset?._ref : item?.largeImage?.asset?._ref)?.url()}
              />
            )}
            {item?.logo?.asset?._ref && (
              <SocialIconBox>
                <Box
                  width={"100%"}
                  height={"100%"}
                  component={"img"}
                  alt={item?.logo?.altText || "social-media-icon"}
                  src={urlFor(item?.logo?.asset?._ref).url()}
                />
              </SocialIconBox>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default MultiCards
