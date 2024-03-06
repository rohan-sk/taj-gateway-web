import { Box, Typography } from "@mui/material"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return <Box role="tabpanel">{value === index && <Typography>{children}</Typography>}</Box>
}
