import { Box, Stack, styled } from "@mui/material";
import DesktopPxToVw from "../../../utils/DesktopFontCalc";
import { transientProps } from "../../../utils/transientProps";
import { theme } from "../../../lib/theme";

export const FieldsContainer = styled(Box)(() => ({
    display: "grid",
    width: "100%",
    alignItems: "start",
    columnGap: "2.083vw",
    rowGap: "unset",
    marginTop: "2.083vw",
    gridTemplateColumns: `${DesktopPxToVw(330)} ${DesktopPxToVw(
        461
    )} ${DesktopPxToVw(360)}`,
    "@media (max-width:640px)": {
        marginTop: '6.25vw',
        display: "flex",
        flexDirection: "column",
        gap: "5.469vw",

    },
}))
export const TitleContainer = styled(Stack)(() => ({
    textAlign: 'center'
}))

export const ButtonWrapper = styled(Stack)(() => ({
    width: "100%",
    marginTop: "2.083vw",
    alignItems: 'center',
    '@media (max-width:640px)': {
        marginTop: '5.469vw'
    }
}))
export const CommentContainer = styled(Stack)(() => ({
    width: "100%",
    marginTop: "2.083vw",
    '@media (max-width:640px)': {
        marginTop: '5.469vw'
    }
}))


export const FormContainer = styled(Stack, transientProps)<{ $componentBackground: any }>(({ $componentBackground }) => ({
    width: "100%",
    margin: "0 auto",
    padding: `3.125vw ${DesktopPxToVw(103)}`,
    backgroundColor: $componentBackground || theme?.palette?.background?.paper,
    alignItems: "center",
    '@media (max-width:640px)': {
        padding: "8.594vw 12.813vw"
    }
}))
export const PaddingContainer = styled(Stack, transientProps)<{ $componentPadding: string }>(({ $componentPadding }) => ({
    width: "100%",
    margin: "0 auto",
    alignItems: "center",
    padding: $componentPadding || '0vw',
}))