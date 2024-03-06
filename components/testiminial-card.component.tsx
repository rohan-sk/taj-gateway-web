import { ImageItems } from "./types"
import { urlFor } from "../lib-sanity"
import { AvatarContainer, StyledTestimonialPaper } from "./card/styles/highlights-with-img"
import { useMobileCheck } from "../utils/isMobilView"
import { Avatar, Box, Divider, Typography } from "@mui/material"
import { useImageUtility } from "../utils/hooks/useImageUtility"

interface TestimonialCardComponentProps {
  _key: string
  _type: string
  variant: string
  urlType: string
  logo: ImageItems
  subTitle: string
  image: ImageItems
  parentProps: number
  description: string
  largeVariant: string
  isComponentFullWidth: boolean
  showBulletForSubTitle: boolean
}
const TestimonialCardComponent = ({ logo, image, subTitle, description }: TestimonialCardComponentProps) => {
  const isMobile = useMobileCheck()
  const { getOptimizeImageUrl } = useImageUtility()
  return (
    <StyledTestimonialPaper>
      {image?.asset?._ref && (
        <Box
          alt={image?.altText || `-Quote`}
          width={isMobile ? "8.594vw" : "2.5vw"}
          height={"100%"}
          component={"img"}
          src={getOptimizeImageUrl(urlFor(image?.asset?._ref).url(), isMobile ? 1 : 3)}
        />
      )}
      <Box sx={{ marginLeft: "2.5vw" }}>
        {description && (
          <Box>
            <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{description}</Typography>
          </Box>
        )}
        <Divider
          sx={{
            margin: isMobile ? "4.688vw 0vw 3.125vw" : "1.563vw 0vw 1.042vw",
            width: isMobile ? "47.969vw" : "15.99vw",
            color: "rgba(139, 138, 132, 1)",
          }}
        />
        <AvatarContainer>
          {logo?.asset?._ref && (
            <Avatar
              alt={logo?.altText || `Remy Sharp`}
              src={getOptimizeImageUrl(urlFor(logo?.asset?._ref).url(), isMobile ? 1 : 3)}
              sx={{
                width: isMobile ? "15.625vw" : "5.208vw",
                height: isMobile ? "15.625vw" : "5.208vw",
              }}
            />
          )}
          {subTitle && <Typography variant={isMobile ? "m-body-l" : "body-ml"}>{subTitle}</Typography>}
        </AvatarContainer>
      </Box>
    </StyledTestimonialPaper>
  )
}
export default TestimonialCardComponent
