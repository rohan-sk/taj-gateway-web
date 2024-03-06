import { Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CustomBullet } from "./Styles"

const RenderVenueItems = (props: any) => {
  return (
    <Grid container md={12} sx={{ marginTop: "1vw" }} spacing={0.5}>
      <Grid item xs={12} md={12}>
        <Typography
          variant="body-m"
          sx={{
            opacity: 0.5,
            fontWeight: 700,
          }}>
          {props?.title}
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container>
          {props?.parameterMap?.map((items: any, index: number) => (
            <Grid item md={4} key={index}>
              <Grid container>
                <Grid item md={0.5}>
                  <CustomBullet>&#x2022;</CustomBullet>
                </Grid>
                <Grid item md={11}>
                  <Typography variant="body-m" sx={{ lineHeight: "140%" }}>
                    {items?.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RenderVenueItems
