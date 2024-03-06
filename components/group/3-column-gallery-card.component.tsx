import React from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { renderComponent } from "../../lib/render-component";
import { useRouter } from "next/router";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useTheme,
  Divider,
  Button,
} from "@mui/material";

const ThreeColumnGalleryGrid = ({ props }: any) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Box>
        <Button
          sx={{ width: "20%", marginLeft: "3%", marginRight: "4%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          All photos & Videos (95)
        </Button>
        <Button
          sx={{ marginRight: "3%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Exterior (14)
        </Button>
        <Button
          sx={{ marginRight: "3%", width: "20%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Rooms & Suites (38)
        </Button>
        <Button
          sx={{ marginRight: "3%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Dining (11)
        </Button>
        <Button href={router?.asPath} variant={"light-outlined"}>
          Venues (7)
        </Button>
        <Button
          sx={{
            marginTop: "2%",
            marginLeft: "4%",
            marginRight: "3%",
            marginBottom: "3%",
          }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Spas (6)
        </Button>
        <Button
          sx={{
            marginTop: "2%",
            marginRight: "3%",
            marginBottom: "3%",
            width: "17%",
          }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Fitness center (3)
        </Button>
        <Button
          sx={{
            marginTop: "2%",
            marginRight: "3%",
            marginBottom: "3%",
            width: "22%",
          }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          SERVICES & AMENITIES (5)
        </Button>
        <Button
          sx={{ marginTop: "2%", marginRight: "3%", marginBottom: "3%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          Videos (2)
        </Button>
        <Button
          sx={{ marginTop: "2%", marginBottom: "3%" }}
          href={router?.asPath}
          variant={"light-outlined"}
        >
          others (9)
        </Button>
      </Box>
      {props?.map((item: any, index: number) => (
        <Grid
          key={index}
          item
          md={4}
          lg={4}
          xl={4}
          onMouseLeave={() => setActiveIndex(0)}
          onMouseEnter={() => setActiveIndex(index)}
        >
          {renderComponent(item?._type, item, index)}
        </Grid>
      ))}
    </>
  );
};

export default ThreeColumnGalleryGrid;
