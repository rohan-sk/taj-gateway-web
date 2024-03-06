import { Box, Divider, Stack, Typography, styled } from "@mui/material"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { theme } from "../../../../lib/theme"
import { transientProps } from "../../../../utils/transientProps"

export const MainStack = styled(Stack)(() => ({
    width: "fit-content",
    margin: "0 auto",
    '@media(max-width:640px)': {
        maxWidth: "100%",
        overflowX: "auto",
        "&::-webkit-scrollbar": {
            height: " 0vw",
            width: "0vw",
            border: "1px solid #d5d5d5",
        }
    }
}))

export const ChartHeader = styled(Stack)(() => ({
  width: "fit-content",
  border: `1px solid ${theme?.palette?.neuPalette?.hexTwo}`,
  borderWidth: "0vw 0vw 1px",
  zIndex:  "1",
  position: "sticky",
  top:  "4.8vw",
  background:  theme?.palette?.neuPalette?.hexOne,
  '@media(max-width:640px)': {
    zIndex:  "unset",
    position:  "unset" ,
    top:"unset",
    background:  "unset",
}
}))
export const StyledDivider = styled(Divider)(() => ({
    color: `${theme?.palette?.neuPalette?.hexSixteen}20`,
    width: DesktopPxToVw(20),
    height: "2px",
    '@media(max-width:640px)': {
        width: MobilePxToVw(20)
    }
}))
export const ButtonStack = styled(Stack)(() => ({
    width: "100%",
    alignItems: "center",
    marginTop: DesktopPxToVw(40),
    '@media (max-width:640px)': {
        marginTop: MobilePxToVw(90)
    }
}
))

export const DataColumn = styled(Stack)(() => ({
    flexDirection: "row",
    gap: DesktopPxToVw(20),
    justifyContent: 'center',
    width: DesktopPxToVw(476),
    '@media (max-width:640px)': {
        gap: MobilePxToVw(20),
        width: MobilePxToVw(476),
    }
}))
export const MembershipColumn = styled(Stack)(() => ({
    flexDirection: "row",
    gap: DesktopPxToVw(20),
    justifyContent: 'center',
    width: DesktopPxToVw(240),
    background: `${theme?.palette?.background?.paper}40`,
    '@media (max-width:640px)': {
        gap: MobilePxToVw(20),
        width: MobilePxToVw(240),
    }
}))
export const VoucherColumn = styled(Stack)(() => ({
    flexDirection: "row",
    width: DesktopPxToVw(732),
    gap: DesktopPxToVw(20),
    justifyContent: 'center',
    background: `${theme?.palette?.background?.paper}`,
    '@media (max-width:640px)': {
        gap: MobilePxToVw(20),
        width: MobilePxToVw(732),
    }
}))


export const BoldText = styled(Typography)(() => ({
    fontWeight: 700,
    textAlign: 'center',
}))

export const TitleStack = styled(Stack)(() => ({
    gap: DesktopPxToVw(20),
    '@media (max-width:640px)': {
        gap: MobilePxToVw(20),
    }
}))

export const ValueStack = styled(Box)(() => ({
    display: 'flex',
    width: 'fit-content',
    justifyContent: 'center',
    border: `1px solid ${theme?.palette?.neuPalette?.hexSeventeen}20`,
    borderWidth: '0px 0px 1px',

}))
export const CheckMarkStack = styled(Stack, transientProps)<{ $width: number }>(({ $width }) => ({
    justifyContent: "center", alignItems: "center",
    width: DesktopPxToVw($width),
    '@media (max-width:640px)': {
        width: MobilePxToVw($width)
    }
}
))
export const CenteringStack = styled(Stack)(() => ({
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center"
}))

export const DropDownContainer = styled(Box)(() => ({
    "& .MuiFormControl-root": {
        width: "100%",
        marginBottom: "0vw !important",
    },
    width: "23vw",
    '@media (max-width:640px)': {
        width: "100%"
    }
}))