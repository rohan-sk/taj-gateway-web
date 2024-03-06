import { Autocomplete, Box, Paper, Typography } from "@mui/material"
import { theme } from "../lib/theme"
import { useMobileCheck } from "../utils/isMobilView"
import { Error_icon } from "./forms/gift-card-form/constants"
import { FormSelectArrowIcon } from "./forms/common/form-components"

const CustomAutoCompleteComponent = ({
  options,
  onChange,
  renderInput,
  getOptionLabel,
  sx,
  autoHighlight = true,
  value,
  disabled,
  showErrorIcon = false,
  noOptionsText,
  onOpen,
  open,
  onClose,
  arrowStyles = {},
  disableClearable,
  ...rest
}: {
  options: any
  onChange: any
  renderInput: any
  getOptionLabel: any
  sx?: any
  autoHighlight?: boolean
  value?: any
  defaultValue?: any
  disabled?: boolean
  showErrorIcon?: boolean
  noOptionsText?: string
  open?: boolean
  onOpen?: () => void | any
  onClose?: () => void | any
  arrowStyles?: any
  disableClearable?: boolean
}) => {
  const isMobile = useMobileCheck()
  return (
    <Autocomplete
      disableClearable={disableClearable}
      onOpen={onOpen && onOpen}
      open={open && open}
      onClose={onClose && onClose}
      {...rest}
      disabled={disabled}
      autoHighlight={autoHighlight}
      noOptionsText={noOptionsText}
      value={value}
      sx={{
        "& .Mui-disabled": {
          "&:before": {
            borderBottomStyle: "solid !important",
          },
        },
        ...sx,
      }}
      popupIcon={
        <>
          {showErrorIcon ? (
            <Box loading="lazy" component="img" src={Error_icon} alt="Expand Image" />
          ) : (
            <FormSelectArrowIcon sx={{ ...arrowStyles }} />
          )}
        </>
      }
      PaperComponent={({ children }: any) => (
        <Paper
          sx={{
            backgroundColor: theme?.palette?.background.default,
            boxShadow: "-6px 10px 24px rgba(0, 0, 0, 0.1)",
            borderRadius: 0,
          }}>
          {children}
        </Paper>
      )}
      renderOption={(props: any) => {
        return (
          <Typography
            {...props}
            variant={isMobile ? "m-body-m" : "body-m"}
            sx={{ padding: isMobile ? "2.5vw !important" : "1vw" }}>
            {props.key}
          </Typography>
        )
      }}
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      renderInput={renderInput}
    />
  )
}

export default CustomAutoCompleteComponent
