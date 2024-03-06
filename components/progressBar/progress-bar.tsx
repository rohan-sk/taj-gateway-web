import React from "react"
import { Box, Button, Card, CardMedia, Divider, Grid, Input, InputBase, Typography, useTheme } from "@mui/material"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
    'Select Card',
    'Personalize',
    'Complete',
];

export default function ProgressBar() {
  return (
      <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
              <Stepper activeStep={3} alternativeLabel >
                  {steps.map((label) => (
                      <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                      </Step>
                  ))}
              </Stepper>
          </Box>
      </Box>

  )
}
