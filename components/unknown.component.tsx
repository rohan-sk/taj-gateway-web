import { Alert, AlertTitle, Typography } from "@mui/material"
import * as React from "react"

interface Props {
  aemType: string
}
export function Unknown(props: Props) {
  return (
    <Alert severity={"error"} sx={{ my: 1 }}>
      <AlertTitle>
        Unmapped Component:{" "}
        <Typography fontWeight={"bold"} component={"span"}>
          {props.aemType}
        </Typography>
      </AlertTitle>

      <Typography variant={"body-s"} component={"div"} fontWeight={"bold"} sx={{ mt: 2 }}>
        JSON Payload
      </Typography>
      {JSON.stringify(props)}
    </Alert>
  )
}
