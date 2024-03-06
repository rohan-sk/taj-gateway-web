import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { width } from "@mui/system";
import { theme } from "../../../lib/theme";
import { MobilePxToVw } from "../../../utils/DesktopFontCalc";

export const ParentBoxWrapper = styled(Box)(() => ({
    position: "relative"
}))

export const ContentBoxWrapper = styled(Box)(() => ({
    background: theme?.palette?.neuPalette?.hexOne,
    width: "85%",
    position: "relative",
    float: "right",
    marginTop: MobilePxToVw(-74),
    marginBottom: MobilePxToVw(24), // Bottom shadow to visible
    padding: "5.313vw 4.53vw", // This padding took from global template
    boxShadow: "-2px -6px 15px 0px rgba(0, 0, 0, 0.10)",
}))

export const CtaLabelBox = styled(Box)(() =>({
    cursor: "pointer",
    marginTop: "1.10vw",
    alignItems: "center",
}))