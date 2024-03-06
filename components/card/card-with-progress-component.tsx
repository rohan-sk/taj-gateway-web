import * as React from "react"
import { Box, Stepper, Step, StepLabel, Avatar } from "@mui/material"
import { Done } from "@mui/icons-material"
import { theme } from "../../lib/theme"

const CardWithProgressBar = ({ props }: any) => {
  return (
    <>
      <Box sx={{ margin: "5% 10%" }}>
        <Box sx={{ margin: "5% 15%" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={2} alternativeLabel>
                {props[0]?.items?.map((item: any, id: number) => {
                  return (
                    <Step
                      key={id}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "secondary.dark", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel": {
                          color: "grey.500", // Just text label (COMPLETED)
                        },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "secondary.main", // circle color (ACTIVE)
                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
                          color: "common.white", // Just text label (ACTIVE)
                        },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "black", // circle's number (ACTIVE)
                        },
                      }}>
                      <StepLabel
                        icon={
                          <Box
                            sx={{
                              backgroundColor: "#E7E6E3",
                              marginTop: "-0.8vw",
                              width: "2.5vw",
                              height: "2.5vw",
                              zIndex: "999",
                              borderRadius: "50%",
                            }}>
                            <Avatar
                              sx={{
                                backgroundColor: theme?.palette?.ihclPalette?.hexTwo,
                                margin: "0.2vw auto",
                              }}>
                              <Done fontSize="medium" />
                            </Avatar>
                          </Box>
                        }>
                        {item?.title}
                      </StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CardWithProgressBar
