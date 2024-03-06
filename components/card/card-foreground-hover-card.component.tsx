import { Fade, Typography } from "@mui/material"
import { theme } from "../../lib/theme"
import DesktopPxToVw from "../../utils/DesktopFontCalc"
import { useAesthetics } from "../../utils/fetchAsthetics"
import RenderActionItem from "../hoc/actions/action-items-ui"
import { ContentBox, GridItem } from "./styles/card-with-hover"

export const HoverCard = ({ index, setActiveIndex, activeIndex, item, cardColorVariant, handleSelected }: any) => {
  const { cardBackgroundColor, textColor, extraData } = useAesthetics(item?.aesthetic?._ref)
  const cardBackground = extraData?.[0]?.isGradientEnabled ? extraData?.[0]?.gradient : cardBackgroundColor
  const cardTextColor = textColor ? textColor : theme?.palette?.neuPalette?.hexSeventeen

  return (
    <GridItem
      item
      xl={3}
      lg={3}
      md={3}
      sm={3}
      key={index}
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(activeIndex)}>
      {index === activeIndex ? (
        <Fade in={index === activeIndex} timeout={{ enter: 1000, appear: 1000, exit: 1000 }}>
          <ContentBox
            sx={{
              background: cardBackground ? cardBackground : theme?.palette?.background?.default,
            }}>
            {item?.title && (
              <Typography variant="heading-s" component={item?.headingElementForCard || "h3"} color={cardTextColor}>
                {item?.title}
              </Typography>
            )}
            {item?.description && (
              <Typography
                variant="body-ml"
                color={cardTextColor}
                sx={{
                  mt: "2.083vw",
                }}>
                {item?.description}
              </Typography>
            )}
            {item?.primaryAction?.url && (
              <RenderActionItem
                isActionButtonType={false}
                url={item?.primaryAction?.url}
                title={item?.primaryAction?.title}
                variant={item?.primaryAction?.variant}
                navigationType={item?.primaryAction?.urlType}
                buttonStyles={{
                  marginTop: "1.25vw",
                }}
                linkStyles={{
                  color: cardColorVariant ? theme?.palette?.neuPalette?.hexOne : theme?.palette?.neuPalette?.hexTwo,
                }}
                iconStyles={{
                  color: cardColorVariant
                    ? `${theme?.palette?.neuPalette?.hexOne} !important`
                    : `${theme?.palette?.neuPalette?.hexTwo} !important`,
                }}
                onClick={() => handleSelected(item?.primaryAction?.url, item?.primaryAction?.urlType, item)}
              />
            )}
          </ContentBox>
        </Fade>
      ) : (
        <>
          {item?.title && (
            <Typography
              variant="heading-s"
              color={theme?.palette?.neuPalette?.hexOne}
              component={item?.headingElementForCard || "h3"}
              sx={{
                mb: "2.083vw",
                display: "flex",
                textAlign: "center",
                padding: `0vw ${DesktopPxToVw(22)}`,
              }}>
              {item?.title}
            </Typography>
          )}
        </>
      )}
    </GridItem>
  )
}
