import { Box, Typography, styled } from "@mui/material"
import { theme } from "../../../lib/theme"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

export const CardContainer = styled(Box)(() => ({
    border: `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`,
    borderWidth: "0px 0px 1px",
    paddingBottom: DesktopPxToVw(30),
    '@media (max-width:640px)': {
        paddingBottom: MobilePxToVw(30)
    }
}))

export const DataContainer = styled(Box)(() => ({
    width: "93%",
    display: "flex",
    flexDirection: "column",
    '@media (max-width:640px)': {
        width: '100%'
    }
}))

export const FullWidthBox = styled(Box)(() => ({
    width: "100%",

}))
export const TitleContainer = styled(Box)(() => ({
    width: '100%',
    marginBottom: DesktopPxToVw(10),
    '@media (max-width:640px)': {
        marginBottom: MobilePxToVw(10)
    }
}))