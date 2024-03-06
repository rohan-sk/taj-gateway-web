import * as React from "react"
import { styled } from "@mui/material"
import { StyledCheckBox } from "./Styles"
import { theme } from "../../../lib/theme"
import { CheckboxProps } from "@mui/material/Checkbox"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"
import { transientProps } from "../../../utils/transientProps"

export const UnCheckedIcon = styled(
  "span",
  transientProps
)<{
  $unCheckedBorder: boolean
  $isDisableChecked: boolean
  $checked: boolean | undefined
}>(({ theme, $unCheckedBorder, $isDisableChecked, $checked }) => ({
  width: DesktopPxToVw(30),
  height: DesktopPxToVw(30),
  border: $unCheckedBorder
    ? $isDisableChecked
      ? $checked
        ? ""
        : `1px solid ${theme?.palette?.neuPalette?.hexTwelve}`
      : `1px solid ${theme?.palette?.neuPalette?.hexTwo}`
    : "",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",

  "@media (max-width: 640px)": {
    width: MobilePxToVw(30),
    height: MobilePxToVw(30),
  },
}))

const CheckedIcon = styled(
  UnCheckedIcon,
  transientProps
)<{ $isDisableChecked: boolean }>(({ $isDisableChecked }) => ({
  backgroundColor: theme?.palette?.neuPalette?.hexTwo,
  backgroundImage: $isDisableChecked
    ? "linear-gradient(#D7D5CF, #D7D5CF);"
    : "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    width: DesktopPxToVw(22),
    height: DesktopPxToVw(22),
    display: "block",
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 13'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',

    "@media (max-width: 640px)": {
      width: MobilePxToVw(22),
      height: MobilePxToVw(22),
    },
  },
}))

interface CustomCheckBoxProps {
  props?: CheckboxProps
  withBorder?: boolean
  onChange: Function
  checked?: boolean
  name?: string
  unCheckedBorder?: boolean
  isMarginRight?: any
  isCheckBoxDisabled?: boolean
}
export const CustomCheckBox = ({
  withBorder = false,
  onChange,
  checked,
  name,
  unCheckedBorder = true,
  isMarginRight,
  isCheckBoxDisabled = false,
  ...rest
}: CustomCheckBoxProps) => {
  return (
    <StyledCheckBox
      key={String(checked)}
      $marginRight={isMarginRight}
      $withBorder={Boolean(checked)}
      disableRipple
      name={name}
      color="default"
      checked={checked}
      checkedIcon={
        <CheckedIcon
          $unCheckedBorder={true}
          $isDisableChecked={isCheckBoxDisabled}
          $checked={checked}
        />
      }
      icon={
        <UnCheckedIcon
          $unCheckedBorder={unCheckedBorder}
          $isDisableChecked={isCheckBoxDisabled}
          $checked={checked}
        />
      }
      onChange={(e) => onChange(e)}
      inputProps={{ "aria-label": "Checkbox demo" }}
      disabled={isCheckBoxDisabled}
      $isDisableChecked={isCheckBoxDisabled}
      {...rest}
      className="custom-check-box"
    />
  )
}
