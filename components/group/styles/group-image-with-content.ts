import styled from "@emotion/styled";
import { Box, Divider, Stack } from "@mui/material";
import { transientProps } from "../../../utils/transientProps";
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc";
import { theme } from "../../../lib/theme";

export const RenderComponentContentWrapper = styled(
    Box,
    transientProps
)<{ $isMobile: boolean; $showDivider: boolean; $fourItems: boolean }>(
    ({ $isMobile, $showDivider, $fourItems }) => ({
        "&>div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: $isMobile ? MobilePxToVw(16) : DesktopPxToVw(16)
        },
        "& .card-description": {
            width: $isMobile ? MobilePxToVw(265) : "initial"
        }
    })
)

export const VerticalDivider = styled(Divider)(() => ({
    margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(20)}`,
    backgroundColor: `${theme?.palette?.neuPalette?.hexSeventeen}`,
}))

export const ParameterMapStack = styled(Stack)(() => ({
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "center"
}))