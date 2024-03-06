import {Box, Divider, Grid, Typography} from "@mui/material"
import React, {useState} from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {theme} from "../../lib/theme"

export default function GridAddress({datainfo}: any) {
  const [showMore, setShowMore] = useState(false)
  const handleShowMore = () => {
    showMore === true ? setShowMore(false) : setShowMore(true)
  }
  return (
    <Box p="6vw 12.5vw">
      <Typography
        variant="heading-l"
        sx={{
          fontSize:"2.474vw",
          textAlign: "center",
          paddingBottom: "60px",
          letterSpacing: "-0.05em",
        }}
      >
        {datainfo?.title}
      </Typography>
      <Grid container spacing={3.5}>
        {datainfo?.info
          ?.slice(
            0,
            datainfo?.info?.length >= 6
              ? showMore
                ? datainfo?.info?.length
                : 6
              : datainfo?.info?.length
          )
          ?.map((listdata: any, index: number) => (
            <Grid item xs={6} md={4} lg={4} xl={4} key={index}>
              <Typography variant="heading-xs" sx={{paddingBottom: "10px"}}>
                {listdata?.cityName}
              </Typography>
              <Typography sx={{color: "#45443F", paddingBottom: "0px"}}>
                {listdata?.address}
              </Typography>
              <Typography
                sx={{
                  color: theme?.palette?.neuPalette?.hexTwo,
                  paddingBottom: "10px",
                }}
              >
                {listdata?.viewButton}
              </Typography>
              <Typography sx={{color: "#45443F", paddingBottom: "0px"}}>
                {listdata?.phone}
              </Typography>
              <Typography sx={{color: "#45443F"}}>{listdata?.fax}</Typography>
              <Typography variant="heading-xs"sx={{ paddingTop: "14px",fontWeight:700}}>{listdata?.mail}</Typography>
              <Divider sx={{paddingBottom: "20px"}}></Divider>
            </Grid>
          ))}

        {datainfo?.info?.length > 6 && !showMore && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              cursor: "pointer",
            }}
            onClick={() => handleShowMore()}
          >
            <Typography sx={{color: " #AD8B3A", textAlign: "center"}}>
              LOAD MORE
            </Typography>
            <KeyboardArrowDownIcon sx={{color: " #AD8B3A"}} />
          </Box>
        )}
      </Grid>
    </Box>
  )
}
