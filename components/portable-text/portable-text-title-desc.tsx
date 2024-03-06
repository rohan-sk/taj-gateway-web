import { Box} from "@mui/material"
import { PortableText } from "../../lib/portable-text-serializers"
import { DividerStyle } from "./style"

const PortableDescription = (props: any) => {
  return (
    <>
      <Box>
        <DividerStyle />
        <PortableText blocks={props?.props[0]?.content} />
      </Box>
    </>
  )
}
export default PortableDescription
