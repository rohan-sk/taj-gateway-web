import React, { useContext } from "react"
import { Box, Divider, Grid, Typography } from "@mui/material"
import { theme } from "../../lib/theme"
import { urlFor } from "../../lib-sanity"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"

const HotelsWithFacilities = ({
  props,
  row,
  primaryAction,
  variant,
  column,
}: any) => {
  return (
    <>
      <Box>
        <Grid container columnSpacing={column}>
          {props?.map((item: any, index: Number) => {
            return (
              <>
                <Component
                  item={item}
                  id={index}
                  row={row}
                  arrayLength={props?.length}
                />
              </>
            )
          })}
        </Grid>
        <Box
          sx={{ textAlign: "center", paddingTop: "20px", cursor: "pointer" }}>
          {primaryAction?.image?.asset?._ref && (
            <Box
            loading="lazy"
              height="1.0309vw"
              width="1.0309vw"
              component="img"
              src={urlFor(primaryAction?.image?.asset?._ref).url()}
            />
          )}
          <Typography
            sx={{ paddingLeft: "0.5%", textTransform: "uppercase" }}
            variant="link-m">
            {primaryAction?.title}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

const Component = ({ item, id, row, arrayLength }: any) => {
  const [showMorePoints, setShowMorePoints] = React.useState(false)
  const [pointsToShow, setPointsToShow] = React.useState(2)
  const [show, setShow] = React.useState(false)

  const context = useContext(IHCLContext)
  const PortableText = context!.PortableText
  const isHotelInfo = item?.isHotelInfo
  const dividerValue = 12 / Math.round(row)
  return (
    <>
      <Grid item md={6} lg={row} sm={12} key={id} pb={1.2}>
        {item?.showDividerForBorder && (
          <Divider
            sx={{
              background: "#45443F",
              opacity: 0.2,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1.2%",
            paddingTop: item?.showDividerForBorder ? "1.081vw" : "0.89vw",
          }}>
          {item?.logo?.asset?._ref && (
            <Box
            loading="lazy"
              component="img"
              src={urlFor(item?.logo?.asset?._ref).url()}
              height="1.2371vw"
              width="1.2371vw"
              sx={{
                objectFit: "contain",
              }}
            />
          )}
          <Typography
            variant={isHotelInfo ? "heading-xxs" : "heading-xs"}
            sx={{ paddingBottom: "0.52vw" }}>
            {item?.title}
          </Typography>
        </Box>

        {item?.menuItems
          ?.slice(0, pointsToShow)
          ?.map((content: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  margin: "0",
                  paddingBottom:
                    arrayLength - (id + 1) < dividerValue ? "0.72vw" : "0",
                }}>
                <PortableText blocks={content?.blockContent} />
              </Box>
            )
          })}

        {item?.menuItems?.length > 3 && (
          <>
            {show ? (
              <Typography
                variant="body-ml"
                sx={{
                  color: theme?.palette?.neuPalette?.hexTwo,
                  paddingLeft: "30px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPointsToShow(2), setShow(!show)
                }}>
                {"...less"}
              </Typography>
            ) : (
              <Typography
                variant="body-ml"
                sx={{
                  color: theme?.palette?.neuPalette?.hexTwo,
                  paddingLeft: "30px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setPointsToShow(item?.menuItems.length), setShow(!show)
                }}>
                {"...more"}
              </Typography>
            )}
          </>
        )}
        {arrayLength - (id + 1) < dividerValue && (
          <Divider
            sx={{
              background: "#45443F",
              opacity: 0.2,
            }}
          />
        )}
      </Grid>
      {isHotelInfo && (id + 1) % 3 !== 0 && (
        <Grid item md={0.2} sx={{ margin: 0, textAlign: "center" }}>
          <Divider
            orientation="vertical"
            sx={{
              width: "0px",
              background: "#45443F",
              opacity: 0.2,
              margin: "0 !important",
            }}
          />
        </Grid>
      )}
    </>
  )
}

export default HotelsWithFacilities
