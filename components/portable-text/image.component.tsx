import Box from "@mui/material/Box"
import Image from "next/image"
// import useImageProps from "../../lib/useImageProps"
import { ImageProps } from "../types"

interface Props {
  image?: ImageProps
  isInline?: boolean
}

function ImageComponent({ image, isInline }: any) {
  //Commented to resolve build errors need to resolve this issue

  // const imageProps = useImageProps(image)
  return (
    <Box display={isInline ? "inline-block" : "block"} textAlign={"center"}>
      {/* <Image {...imageProps} alt={""} /> */}
    </Box>
  )
}

export default ImageComponent
