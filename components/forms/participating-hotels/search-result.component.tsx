import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import { StyledChevronRight } from "../../card/styles/common-styles"
import { theme } from "../../../lib/theme"
import { ResultBox } from "./styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { useAppNavigation } from "../../../utils/NavigationUtility"
import { PathType } from "../../../types"
import ModalStore from "../../../store/global/modal.store"

const SearchResult = ({ data }: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const modalStore = ModalStore.getInstance()
  return (
    <ResultBox>
      <Grid container sx={{ padding: "0px 2.09vw" }} spacing={"10px"}>
        {data?.hotelName && (
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant={isMobile ? "m-body-l" : "body-l"}>
              <b>{data?.hotelName}</b>
            </Typography>
          </Grid>
        )}
        {/* {data?.hotelDescription && (
          <Grid item xs={12} sm={12} md={7}>
            <Typography variant={isMobile ? "m-body-s" : "body-s"}>{data?.hotelDescription}</Typography>
          </Grid>
        )} */}
        <Grid item xs={12} sm={12} md={0}>
          {/* removed more link as per figma */}
          {/* <Box
            sx={{ display: "flex", justifyContent: "flex-end" }}
            onClick={() => {
              modalStore?.closeModal()
              navigate(data?.hotelPath, PathType?.internal)
            }}>
            <Typography
              variant={isMobile ? "m-body-s" : "body-s"}
              sx={{
                color: theme?.palette?.ihclPalette?.hexTwo,
                cursor: "pointer",
              }}>
              MORE
            </Typography>
            <StyledChevronRight />
          </Box> */}
        </Grid>
      </Grid>
    </ResultBox>
  )
}

export default SearchResult
