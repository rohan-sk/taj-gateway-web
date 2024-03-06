import React from "react"
import { Box, Divider, Grid, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { urlFor } from "../../lib-sanity"
import { ImageProps } from "../types"
import {
  GridContainerWrapper,
  GridItemWrapper,
  StyledGrid,
  StyledImage,
} from "./styles/tier-card-with-content.styles"
const ReadMore = dynamic(() => import("../hoc/CustomReadMore"))

interface comparativesProps {
  image: ImageProps
  title: string
}

interface comparativeSpeciationsProps {
  title: string
}
interface specificationsProps {
  comparativeSpefications: comparativeSpeciationsProps[]
  title: string
}

interface props {
  comparatives: comparativesProps[]
  specifications: specificationsProps[]
}

interface TierCardWithContentInterface {
  props: props[]
}

const TierCardWithContent = ({ props }: TierCardWithContentInterface) => {
  return (
    <GridContainerWrapper container>
      <GridItemWrapper>
        {props?.[0].comparatives.map((item: any, index: number) => (
          <Box key={index}>
            <StyledImage
              alt="media"
              component="img"
              src={urlFor(item?.image?.asset?._ref).url()}
            />
          </Box>
        ))}
      </GridItemWrapper>
      <Grid item>
        <Divider />
        <Grid item xs={12}>
          {props?.[0].specifications.map((item: any, index: number) => (
            <Box key={index}>
              <Divider />
              <StyledGrid item xs={12}>
                <Grid item xs={4} sx={{ margin: "2vw 0vw" }}>
                  <Typography variant="heading-xs">{item.title}</Typography>
                </Grid>
                {item.comparativeSpefications.map(
                  (items: any, index: number) => (
                    <Grid
                      key={index}
                      xs={3}
                      sx={{ margin: "2vw 1vw", textAlign: "center" }}>
                      {items.title && (
                        <ReadMore length={58}>{items?.title}</ReadMore>
                      )}
                      {items?.asset?._ref && (
                        <Box
                          alt={`-img`}
                          width={"14px"}
                          component={"img"}
                          src={
                            items?.asset?._ref &&
                            urlFor(items?.asset?._ref).url()
                          }
                        />
                      )}
                    </Grid>
                  )
                )}
              </StyledGrid>
            </Box>
          ))}
        </Grid>
        <Divider />
      </Grid>
    </GridContainerWrapper>
  )
}

export default TierCardWithContent
