import { useNextSanityImage } from "next-sanity-image"
import { NextSanityImageProps } from "../components"
import client from "../lib-sanity"

export function useImageProps(
  image: string | object | undefined
): NextSanityImageProps {
  //Commented to resolve build errors need to resolve this issue

  // const imageProps = useNextSanityImage(
  //   client,
  //   typeof image === "string" ? null : image
  // )

  // return imageProps || { src: image?.toString() || "" }
  return { src: "" }
}

export default useImageProps
