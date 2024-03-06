import { FormErrorIcon } from "./form-components"
import { InputTextField } from "./styles"

const EnquireTextField = ({ error = false, helperText = "", sx = {}, InputProps = undefined, ...rest }: any) => {
  return (
    <InputTextField
      {...rest}
      sx
      variant="standard"
      InputProps={
        InputProps
          ? InputProps
          : {
              endAdornment: <>{error && <FormErrorIcon />}</>,
              autoComplete: "new-password",
            }
      }
      helperText={error && helperText}
    />
  )
}

export default EnquireTextField
