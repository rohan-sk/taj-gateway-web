import { Box, FormControl, InputLabel, MenuItem, TextField, Typography, styled } from "@mui/material";
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc";
import { transientProps } from "../../../utils/transientProps";
import { fonts, theme } from "../../../lib/theme";

export const FormBlockContentBox = styled(Box)(() => ({
    textAlign: "center",
    "& *": {
        lineHeight: "140%",
        fontWeight: 300,
        fontSize: `${DesktopPxToVw(22)} !important`,
        '@media (max-width:640px)': {
            fontSize: `${MobilePxToVw(22)} !important`
        }
    },

}))
export const LinkDisableBlockContentBox = styled(Box, transientProps)<{ isDisable: boolean }>(({ isDisable }) => ({
    textAlign: "center",
    "& *": {
        lineHeight: "140%",
        fontWeight: 300,
        fontSize: `${DesktopPxToVw(22)} !important`,
        '@media (max-width:640px)': {
            fontSize: `${MobilePxToVw(22)} !important`
        }
    },
    '&, & *': {
        pointerEvents: isDisable ? 'none' : "initial",
        color: isDisable ? theme?.palette?.neuPalette?.hexSeventeen : ""
    }

}))

export const StyledInputLabel = styled(InputLabel)(() => ({
    color: theme?.palette?.neuPalette?.hexSeventeen,
    fontSize: '1.25vw',
    fontWeight: 300,
    "@media (max-width: 640px)": {
        fontSize: "3.750vw",
        fontWeight: 300,
    },
}))

export const InputTextField = styled(TextField, transientProps,
)<{ $WebkitBoxShadow?: any }>(({ $WebkitBoxShadow }) => ({
    width: "100%",
    height: "2.083vw",
    
    input: {
        padding: "0vw",
        "@media(max-width:640px)":{
            "&:-webkit-autofill": {
                WebkitBoxShadow: $WebkitBoxShadow,
            },
        }
    },
    "& .MuiInputBase-root.MuiInput-root": {
        "&::before": {
            borderBottomStyle: "solid!important",
        },
    },
    "& input": {
        "&::placeholder": {
            opacity: 1,
        },
    },
    "& label": {
        transform: "scale(1) translate(0, 0.1vw)",
        "@media (max-width:640px)": {
            transform: "scale(1) translate(0, 0.4vw)",
        },
        "& .Mui-error": {
            color: theme?.palette?.neuPalette?.hexThirtyTwo,
        },
    },
    "&, & input": {
        height: "2.083vw",
        "@media (max-width:640px)": {
            height: "6.25vw",
        },
    },
    "& input, & label": {
        fontFamily: fonts?.body,
        fontWeight: 300,
        fontSize: "1.25vw",
        color: theme?.palette?.neuPalette?.hexSeventeen,
        opacity: 1,
        "@media (max-width:640px)": {
            fontFamily: fonts?.body,
            fontWeight: 300,
            fontSize: "3.75vw",
        },
    },
    "& .MuiFormHelperText-root": {
        fontFamily: `${fonts?.body} !important`,
        fontWeight: 300,
        color: theme?.palette?.neuPalette?.hexThirtyTwo,
        fontSize: `${DesktopPxToVw(18)}!important`,
        "@media (max-width:640px)": {
            fontSize: "2.8vw!important",
        },
    },
    "label + .MuiInputBase-root.MuiInput-root ": {
        marginTop: "0vw",
    },
    "& .MuiInputLabel-shrink.MuiInputLabel-standard": {
        transition:
            "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "& .MuiInputLabel-shrink": {
        transform: "scale(0.75) translate(0, -1.2em)",
    },
}))

export const StyledMenuItem = styled(MenuItem)(() => ({
    fontWeight: 300,
    fontSize: "0.938vw",
    fontFamily: fonts?.body,
    color: theme?.palette?.neuPalette?.hexSeventeen,
    padding: "0.417vw 2.083vw 0.417vw 2.083vw",
    "@media (max-width:640px)": {
        fontWeight: 300,
        fontSize: "2.813vw",
        padding: "1.563vw 3.125vw 1.563vw 3.125vw",
        color: theme?.palette?.neuPalette?.hexSeventeen,
    },
}))

export const StyledFormControl = styled(FormControl)(() => ({
    textAlign: "start",
    fontFamily: fonts?.body,
    fontWeight: 300,
    fontSize: "1.25vw",
    "@media (max-width:640px)": {
        fontSize: "3.75vw",
    },
    "& .Mui-disabled": {
        "&:before": {
            borderBottomStyle: "solid !important",
        },
    },
    "& .MuiSelect-select": {
        "&:focus": {
            backgroundColor: "transparent",
        },
    },
    "& label": {
        transform: "scale(1) translate(0, 0em)",
        textAlign: "start",
        fontFamily: fonts?.body,
        fontWeight: 300,
        fontSize: "1.25vw",
        paddingRight: "1.25vw",
        "@media (max-width:640px)": {
            fontSize: "3.75vw",
            transform: "scale(1) translate(0, 0em)",
            paddingRight: "3.75vw",
        },
        "&.Mui-focused, &.MuiInputLabel-shrink": {
            transform: "scale(0.75) translate(0, -1.2em)",
        },
    },
    "& .MuiInputBase-root": {
        height: "2.083vw",
        "@media (max-width:640px)": {
            height: "6.25vw",
        },
    },
    "& label+div": {
        margin: "0vw",
    },

    "& .MuiFormLabel-root.MuiInputLabel-root": {
        transition:
            "cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },

    "& .MuiSelect-select.MuiInputBase-input.MuiInput-input": {
        minHeight: "unset",
        textAlign: "start",
        fontFamily: fonts?.body,
        fontWeight: 300,
        fontSize: "1.25vw",
        lineHeight: "140%",
        "@media (max-width:640px)": {
            fontSize: "3.75vw",
            lineHeight: "140%",
        },
    },
}))

export const ErrorMessageTypography = styled(Typography)(() => ({
    textAlign: "start",
    fontSize: `${DesktopPxToVw(18)}`,
    fontFamily: fonts?.body,
    fontWeight: 300,
    lineHeight: "100%",
    color: `${theme?.palette?.neuPalette?.hexThirtyTwo}`,
    "@media (max-width: 640px)": {
        fontSize: "2.8vw",
    },
}))
export const MultilineInputText = styled(TextField)(() => ({
    width: "100%",
    "& textarea": {
        fontSize: "1.25vw",
        lineHeight: "140%",
    },
    "& .MuiInput-input": {
        fontSize: DesktopPxToVw(24),
    },

    "&  .MuiFormHelperText-root": {
        fontSize: DesktopPxToVw(18),
    },

    input: {
        "&::placeholder": {
            opacity: 1,
            fontWeight: 500,
            fontSize: DesktopPxToVw(24),
            textOverflow: "ellipsis !important",
            color: theme?.palette?.neuPalette?.hexSeventeen,
        },
    },

    "@media (max-width: 640px)": {
        "&  .MuiFormHelperText-root": {
            fontSize: MobilePxToVw(18),
        },
        width: "100%",
        "& .MuiInput-input": {
            fontSize: "3.750vw",
        },
        input: {
            "&::placeholder": {
                textOverflow: "ellipsis !important",
                fontWeight: 300,
                opacity: 1,
                fontSize: "3.750vw",
            },
        },
    },
}))