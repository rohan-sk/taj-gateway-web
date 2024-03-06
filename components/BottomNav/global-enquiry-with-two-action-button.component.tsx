import { Box, Button } from "@mui/material"

const GlobalEnquiryFormWithTwoActionButton = ({ props }: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: "0",
        display: "flex",
        justifyContent: "space-between",
        gap: "2.344vw",
        backgroundColor: "#ffffff",
        padding: "2.656vw 5.938vw",
      }}>
      <Button
        sx={{
          border: "1px solid red",
          width: "55%",
          height: "10.6vw",
          fontWeight: "700",
          letterSpacing: "0.313vw",
          color: "rgba(173, 139, 58, 1)",
          lineHeight: "4.688vw",
        }}>
        VENUE ENQUIRY
      </Button>
      <Button
        sx={{
          width: "45%",
          backgroundColor: "rgba(173, 139, 58, 1)",
          color: "rgba(255, 255, 255, 1)",
          letterSpacing: "0.213vw",
        }}>
        CHECK RATES
      </Button>
    </Box>
  )
}

export default GlobalEnquiryFormWithTwoActionButton
