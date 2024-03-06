import React, { useState } from "react"
import { Circle } from "@mui/icons-material"
import { Box, Divider, Typography } from "@mui/material"

const RichDataWithBulletPoints = (props: any) => {
  const [showMorePoints, setShowMorePoints] = useState(false)

  const handleShowMore = () => {
    showMorePoints === true ? setShowMorePoints(false) : setShowMorePoints(true)
  }

  return (
    <Box>
      {(props?.index == 0 || props?.index == 1) && (
        <Divider
          sx={{
            mb: "2.1vw",
            width: "96%",
            height: "1px",
            opacity: "0.2",
            background: "#45443F",
          }}
        />
      )}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.88vw" }}>
        <Typography variant='heading-xs'> {props?.title}</Typography>
        <Box>
          {props?.subTitle
            ?.slice(
              0,
              props?.subTitle?.length >= 4
                ? showMorePoints
                  ? props?.subTitle?.length
                  : 4
                : props?.subTitle?.length
            )
            ?.map((value: string, index: number) => (
              <Box
                key={index}
                sx={{
                  gap: "2%",
                  display: "flex",
                  maxWidth: "95%",
                  p: "0.1% 0 0 2%",
                  flexDirection: "row",
                }}>
                <Circle sx={{ height: "0.6vw", width: "auto", mt: "1.2%" }} />
                <Typography variant='body-ml'>{value}</Typography>
              </Box>
            ))}
          {props?.subTitle?.length > 4 && !showMorePoints ? (
            <Typography
              variant='body-ml'
              sx={{ paddingLeft: "4%", color: "#AD8B3A", cursor: "pointer" }}
              onClick={() => handleShowMore()}>
              {"...more"}
            </Typography>
          ) : (
            <>
              {showMorePoints && (
                <Typography
                  variant='body-ml'
                  sx={{ paddingLeft: "4%", color: "#AD8B3A", cursor: "pointer" }}
                  onClick={() => handleShowMore()}>
                  {"...less"}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Divider
        sx={{ background: "#45443F", height: "1px", width: "96%", opacity: "0.2", mt: "2.1vw" }}
      />
    </Box>
  )
}

export default RichDataWithBulletPoints
