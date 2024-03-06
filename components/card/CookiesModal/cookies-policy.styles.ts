import { Accordion, AccordionDetails, Box, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const AccordionContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
}))


export const AccordionAntSwitchContainer = styled(Box)(() => ({
    display: "flex",
    padding: "1.146vw 0vw",
    border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}30`,
    borderWidth: "1px 0px 0px",
    justifyContent: "space-between",
    '@media (max-width:640px)': {
        padding: '0vw',
    }
}))
export const StyledAccordion = styled(Accordion)(() => ({

    borderWidth: '1px 0px 0px',
    '&::before': {
        content: 'none',
        bgColor: 'unset',
    },

    "& .MuiAccordionSummary-root": {
        padding: "0vw",
        minHeight: "auto",
        background: theme.palette.background.default,
        gap: DesktopPxToVw(24),
        '@media (max-width:640px)': {
            gap: MobilePxToVw(24),

        }

    },

    background: theme.palette.background.default,
}))

export const ActionButtonsContainer = styled(Box)(() => ({
    display: 'flex',

    gap: '1.042vw',
    alignItems: 'center',
    justifyContent: 'end',
    '@media (max-width:640px)': {
        justifyContent: 'space-between',
        marginTop: "25vw",
    }
}))


export const CookiesModalContainer = styled(Box)(() => ({
    margin: "0 auto",
    maxWidth: "62.5vw",
    boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
    padding: "2.083vw 1.042vw 1.563vw 1.667vw",
    '@media (max-width:640px)': {
        boxShadow: 'unset',
        padding: `${MobilePxToVw(72)} ${MobilePxToVw(50)} 4.688vw`,
        maxWidth: "unset",
    }
}))

export const StyledAccordionDetails = styled(AccordionDetails)(() => ({
    padding: "0vw",
    // paddingBottom: "2.865vw",
    paddingLeft: '3vw',
    background: theme.palette.background.default,
    "@media(max-width:640px)": {
        paddingBottom: "2.865vw"
    }
}))