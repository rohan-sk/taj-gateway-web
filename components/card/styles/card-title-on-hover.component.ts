import { Box, Stack, Typography, styled } from "@mui/material";
import { theme } from "../../../lib/theme";
import DesktopPxToVw from "../../../utils/DesktopFontCalc";

export const MainBox = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer"
}))
export const ImageBox = styled(Box)(() => ({
    width: `calc(100% + ${DesktopPxToVw(12)})`,
    height: "auto",
    position: "relative",
    paddingTop: "77.5%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
}))
export const ContentBox = styled(Stack)(() => ({
    position: "absolute",
    width: `calc(100% + ${DesktopPxToVw(12)})`,
    alignItems: "center",
    bottom: "0vw",
    minHeight: "9.219vw",
    background: "linear-gradient(180deg, rgba(81, 81, 81, 0.00) 0%, rgba(0, 0, 0, 0.70) 70.64%)",
}))
export const TitleTypography = styled(Typography)(() => ({
    color: theme?.palette?.neuPalette?.hexOne, 
    marginBlockEnd: "1.146vw", 
    marginTop: "4.688vw",
    textAlign:"center",
    padding:"0vw 3vw"
}))


