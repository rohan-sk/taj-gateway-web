import React, { useContext, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Box, Collapse, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import { RowStack } from "../MyAccount/my-account.styles"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { formatToShortDate } from "../../utils/getDate"
import { ICONS } from "../constants"
import { currency2DecimalSymbol } from "../../utils/currency"

const RenderTaxes = ({ taxes, currencyCode }: any) => {
  const [show, setShow] = useState(false)
  return (
    <Stack width={"100%"} flexDirection={"column"}>
      <RowStack>
        <Stack
          sx={{ cursor: "pointer" }}
          columnGap={DesktopPxToVw(6)}
          flexDirection={"row"}
          onClick={() => setShow(!show)}>
          <Typography variant={"body-xs"}>
            {formatToShortDate(taxes?.date)}
          </Typography>
          <Box
            component="img"
            alt={"key-arrow-down"}
            src={ICONS?.KEY_ARROW_DOWN}
            sx={{
              transform: show ? "rotate(0deg)" : "rotate(180deg)",
            }}
          />
        </Stack>
        <Typography variant={"body-xs"}>
          {currency2DecimalSymbol(taxes?.tax?.amount, currencyCode)}
        </Typography>
      </RowStack>
      <Collapse in={show}>
        <Box pb={show ? DesktopPxToVw(5) : 0}>
          {taxes?.tax?.breakDown?.map((tax: any, index: number) => (
            <RowStack key={index}>
              <Typography variant={"body-xs"}>{tax?.name || tax?.code}</Typography>
              <Typography variant={"body-xs"}>
                {currency2DecimalSymbol(tax?.amount, currencyCode)}
              </Typography>
            </RowStack>
          ))}
        </Box>
      </Collapse>
    </Stack>
  )
}

export default observer(RenderTaxes)
