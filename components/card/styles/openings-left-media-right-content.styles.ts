import { Box, Divider, Grid, Stack, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { theme } from "../../../lib/theme"

export const MainContainer = styled(Stack)(() => ({
    width: DesktopPxToVw(1200),
    background: theme?.palette?.background?.default,
    margin: "0 auto",
    flexDirection: 'row',

    boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
    "@media (max-width:640px)": {
        background: theme?.palette?.background?.paper,
        maxHeight: "100%",
        flexDirection: 'column',
        paddingTop: MobilePxToVw(64),
        overflowY: "auto",
        height: "100%",
        boxShadow: "unset",
        width: "100%",
        gap: MobilePxToVw(55),
    },
}))

export const MainStack = styled(Stack)(() => ({
    width: DesktopPxToVw(1440),
    margin: "0 auto",
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: "80vh",
    overflowY: "auto",
    background: theme?.palette?.background?.default,
    boxShadow: `-6px 10px 24px rgba(0, 0, 0, 0.1)`,
    '@media (max-width:640px)': {
        paddingTop: MobilePxToVw(142),
        width: '100%',
        maxHeight: '100%',
        overflowY: "auto",
        justifyContent: "unset",
        height: '100vh',
        flexDirection: 'column',
        boxShadow: "unset",
        minHeight: "100%",
        background: theme?.palette?.background?.paper
    }
}))
export const ImageContainer = styled(Stack)(() => ({
    flexBasis: "50%",
    flexShrink: 0,
    '@media (max-width:640px)': {
        flexBasis: 'unset'
    }
}))
export const ContentStack = styled(Stack)(() => ({
    flexBasis: "50%",
    padding: `4vw 4.167vw ${DesktopPxToVw(47)}`,
    '@media (max-width:640px)': {
        flexBasis: "initial",
        padding: `${MobilePxToVw(55)} ${MobilePxToVw(82)} ${MobilePxToVw(55)}`
    }
}))

export const StyledDivider = styled(Divider)(() => ({
    width: "100%",
    background: `${theme?.palette?.neuPalette?.hexSeventeen}40`,
    margin: `${DesktopPxToVw(16)} 0vw`,
    '@media (max-width:640px)': {
        margin: `${MobilePxToVw(20)} 0vw`,
    }
}))

export const BulletIcon = styled(Box)(() => ({
    backgroundColor: theme?.palette?.neuPalette?.hexTwo,
    width: DesktopPxToVw(6),
    height: DesktopPxToVw(6),
    transform: "rotate(45deg)",
    "@media (max-width: 640px)": {
        width: MobilePxToVw(6),
        height: MobilePxToVw(6),
    },
}))



export const DetailStack = styled(Stack)(() => ({
    flexDirection: "row",
    alignItems: 'start',
    gap: DesktopPxToVw(12),
    '@media (max-width:640px)': {
        gap: MobilePxToVw(12)
    }
}))


export const GoldTypography = styled(Typography)(() => ({
    color: theme?.palette?.neuPalette?.hexTwo,
    fontWeight: 700,
    lineHeight: '140%'
}))

export const IconBox = styled(Box)(() => ({
    minHeight: "1.313vw",
    display: 'flex',
    alignItems: 'center',
    '@media (max-width:640px)': {
        minHeight: '4vw'
    }
}))