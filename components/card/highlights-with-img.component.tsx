import { useContext } from "react"
import { urlFor } from "../../lib-sanity"
import dynamic from "next/dynamic"
import { Box, Grid, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import { ActionProps, ImageProps, parameterMapItems } from "../types"
import {
  ContainerBox,
  StyledDivider,
  HighlightsContentBox,
  ParameterMapDescriptionWrapperBox,
} from "./styles/highlights-with-img"
import { theme } from "../../lib/theme"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAppNavigation } from "../../utils/NavigationUtility"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

type HighlightsWithImgProps = {
  image: ImageProps
  content: any
  _key: string
  title: string
  _type: string
  variant: string
  urlType: string
  highLights: string
  description: string
  largeVariant: string
  largeImage: ImageProps
  primaryAction: ActionProps
  isMultiBlockContent: boolean
  showDividerForTitle: boolean
  showBulletForSubTitle: boolean
  parameterMap: parameterMapItems[]
  headingElementForCard?: any
  onPrimaryClick?: Function
}

const HighlightsWithImgComponent = ({
  title,
  image,
  content,
  largeImage,
  description,
  primaryAction,
  parameterMap,
  headingElementForCard,
  onPrimaryClick,
}: HighlightsWithImgProps) => {
  const isMobile = useMobileCheck()
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const CardImage = largeImage?.asset?._ref
  const navigate = useAppNavigation()

  return (
    <ContainerBox $isMobile={isMobile}>
      {isMobile ? (
        <>
          {image?.asset?._ref && (
            <Box
              alt={image?.altText || "img"}
              component="img"
              src={image?.asset?._ref && urlFor(image?.asset?._ref).url()}
              sx={{ height: "100%", width: "100%" }}
            />
          )}
        </>
      ) : (
        <>
          {CardImage && (
            <Box
              alt={largeImage?.altText || "img"}
              component="img"
              src={CardImage && urlFor(CardImage).url()}
              sx={{ height: "100%", width: "100%" }}
            />
          )}
        </>
      )}

      <HighlightsContentBox $isMobile={isMobile}>
        {title && (
          <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"} component={headingElementForCard || "h3"}>
            {title}
          </Typography>
        )}
        <StyledDivider />
        {content &&
          content?.map((content: any, index: number) => (
            <Box key={index}>
              <PortableText blocks={content?.content} item={index} />
            </Box>
          ))}
        <StyledDivider />
        {(parameterMap || description) && (
          <>
            {parameterMap?.map((item: parameterMapItems, index: number) => (
              <ParameterMapDescriptionWrapperBox key={index} $isMobile={isMobile}>
                <Typography variant={isMobile ? "m-body-l" : "body-ml"}>
                  <b> {item?.key}</b> :
                </Typography>
                <Typography
                  variant={isMobile ? "m-heading-s" : "heading-s"}
                  sx={{
                    color: theme?.palette?.ihclPalette?.hexTwo,
                  }}>
                  {item?.value}
                </Typography>
                {description && <Typography variant={isMobile ? "m-body-s" : "body-s"}>{description}</Typography>}
              </ParameterMapDescriptionWrapperBox>
            ))}
          </>
        )}
        <RenderActionItem
          url={primaryAction?.url}
          title={primaryAction?.title}
          navigationType={primaryAction?.urlType}
          variant={primaryAction?.variant}
          isActionButtonType={true}
          onClick={() => {
            onPrimaryClick ? onPrimaryClick() : navigate(primaryAction?.url, primaryAction?.urlType)
          }}
          buttonStyles={{ marginTop: isMobile ? "3.125vw" : "1.042vw" }}
        />
      </HighlightsContentBox>
    </ContainerBox>
  )
}

export default HighlightsWithImgComponent
