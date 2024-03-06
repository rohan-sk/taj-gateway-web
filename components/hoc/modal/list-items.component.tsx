import React, { useState } from "react"
import BasicModal from "./modal"
import { theme } from "../../../lib/theme"
import { Box, Button } from "@mui/material"
import { KeyboardArrowDownSharp } from "@mui/icons-material"

const ListItemsModal = ({ props }: any) => {
  const [openModel, setOpenModel] = useState<boolean>(false)
  const handleModelOpening = () =>
    openModel === true ? setOpenModel(false) : setOpenModel(true)

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="light-contained"
          sx={{
            width: "60.625vw",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => handleModelOpening()}
          endIcon={<KeyboardArrowDownSharp />}>
          ALL
        </Button>
      </Box>
      {openModel && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          open={openModel}
          bgcolor={theme?.palette?.background?.paper}
          handleClose={handleModelOpening}
          Component={<h1>Modal opened</h1>}
        />
      )}
    </>
  )
}

export default ListItemsModal
