import TwoRowTitle from "./TwoRowTitle"
import { theme } from "../../../lib/theme"
import { useMobileCheck } from "../../../utils/isMobilView"
import { Box, Divider, Typography } from "@mui/material"
import { SubTitleText } from "./styles"
import DesktopPxToVw from "../../../utils/DesktopFontCalc"
import RenderActionItem from "../actions/action-items-ui"
import CustomReadMore from "../CustomReadMore"
import { urlFor } from "../../../lib-sanity"
import { useAesthetics } from "../../../utils/fetchAsthetics"

const Title = (props: any) => {
  const { textColor } = useAesthetics(props?.aesthetic?._ref)
  const isMobile = useMobileCheck()
  const groupTitleColor = textColor
  const centerVariant =
    props?.alignmentVariant == "center-with-one-row-title" ||
    props?.alignmentVariant == "center-with-multi-line-title" ||
    props?.alignmentVariant == "center-aligned-regular-title-with-no-hyphens"

  const centerMultiRowVariant = props?.alignmentVariant == "center-with-multi-line-title"
  const regularOneRowTitle = props?.alignmentVariant == "regular-with-one-row-title"
  const regularTwoRowTitle = props?.alignmentVariant == "regular-with-two-row-title"
  const subTitleLength = props?.charactersLimit ?? 300

  const isLogin = props?.largeVariant === "authentication.group.grey-grid"
  const isThemeTitle = props?.largeVariant === "ihcl.core.group.group-with-stepper-and-tabs"
  const GiftCardThemeTitle = global?.window?.localStorage?.getItem("gc-title")
  const titleWithOutHyphens = props?.alignmentVariant === "center-aligned-regular-title-with-no-hyphens"
  return (
    <>
      {(props?.title || props?.subTitle || props?.heading) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: regularOneRowTitle || regularTwoRowTitle ? "flex-start" : "center",
            marginBottom: isMobile ? "6.25vw" : isLogin ? "1.04vw" : props?.titleBottomGap ?? "4.17vw",
            padding: isMobile ? "0vw" : props?.isComponentFullWidth ? "0vw 12.5vw" : "0vw",
            flexDirection: isMobile ? "column" : centerVariant ? "column" : "row",
            gap: "1.5%",
            alignItems: regularOneRowTitle ? "center" : regularTwoRowTitle ? "flex-end" : "",
            marginLeft: regularOneRowTitle || regularTwoRowTitle || centerVariant ? (isMobile ? "13.1vw" : "") : "",
            marginRight: regularOneRowTitle || regularTwoRowTitle || centerVariant ? (isMobile ? "13.1vw" : "") : "",
          }}>
          <Box
            sx={{
              flex: "0 0 50%",
              alignSelf: isMobile && (regularOneRowTitle || regularTwoRowTitle) ? "self-start" : "",
            }}>
            {props?.title && regularTwoRowTitle ? (
              <TwoRowTitle
                isMobile={isMobile}
                title={props?.title}
                color={groupTitleColor ? groupTitleColor : theme?.palette?.text?.primary}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "flex-start",
                  gap: isMobile ? "0" : "2%",
                  justifyContent: centerVariant ? "center" : "",
                  marginBottom:
                    props?.title && centerVariant
                      ? props?.subTitle
                        ? isMobile
                          ? "2.18vw"
                          : DesktopPxToVw(40)
                        : ""
                      : "",
                }}>
                {props?.title && (
                  <>
                    {
                      <Divider
                        sx={{
                          height: "2%",
                          width: isMobile ? "6.25vw" : "4.16vw",
                          background: isMobile
                            ? theme?.palette?.text?.primary
                            : groupTitleColor
                            ? groupTitleColor
                            : theme?.palette?.text?.primary,
                        }}
                      />
                    }
                    <Box>
                      <Typography
                        color={groupTitleColor ? groupTitleColor : theme?.palette?.text?.primary}
                        variant={
                          isMobile
                            ? "m-heading-m"
                            : props?.largeVariant === "ihcl.core.group.multiple-row-four-column-grid"
                            ? "heading-m"
                            : "heading-l"
                        }
                        sx={{
                          display: "flex",
                          whiteSpace: centerMultiRowVariant ? "initial" : "nowrap",
                          padding: isMobile ? "0 6.25vw" : "auto",
                          justifyContent: centerVariant ? "center" : "",
                          width: centerMultiRowVariant ? "31vw" : "auto",
                          textAlign: centerMultiRowVariant ? "center" : "unset",
                        }}>
                        {!isThemeTitle ? props?.title : `${GiftCardThemeTitle}`}
                      </Typography>
                    </Box>

                    {centerVariant && (
                      <>
                        <Divider
                          sx={{
                            height: "2%",
                            width: isMobile ? "6.25vw" : "4.16vw",
                            background: isMobile
                              ? theme?.palette?.text?.primary
                              : groupTitleColor
                              ? groupTitleColor
                              : theme?.palette?.text?.primary,
                          }}
                        />
                      </>
                    )}
                  </>
                )}
              </Box>
            )}
          </Box>
          {props?.subTitle && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: centerVariant ? "" : "auto",
                maxWidth: isMobile ? "100%" : centerVariant ? DesktopPxToVw(840) : DesktopPxToVw(673),
                height: props?.action?.[0]?.primaryAction?.[0]?.title ? "90%" : "auto",
                justifyContent: props?.action?.[0]?.primaryAction?.[0]?.title ? "space-between" : "",
                alignSelf: props?.action?.[0]?.primaryAction?.[0]?.title ? "flex-start" : "flex-end",
                textAlign: "center",
                margin: centerVariant ? "0 auto" : "",
                gap: props?.primaryAction?.title ? "1.35vw" : 0,
                alignItems: centerVariant ? "center" : "flex-start",
              }}>
              {props?.subTitle && (
                <SubTitleText
                  variant={isMobile ? "m-body-l" : "body-ml"}
                  className="hide-box"
                  $centerVariant={centerVariant}
                  color={groupTitleColor ? groupTitleColor : theme?.palette?.text?.primary}>
                  {props?.subTitle.length > subTitleLength ? (
                    <>
                      <CustomReadMore
                        length={subTitleLength}
                        variant={isMobile ? "m-body-l" : "body-ml"}
                        textStyles={{
                          color: groupTitleColor ? groupTitleColor : theme?.palette?.text?.primary,
                          fontSize: isMobile ? "3.438vw" : "1.146vw",
                        }}>
                        {props?.subTitle}
                      </CustomReadMore>
                    </>
                  ) : (
                    props?.subTitle
                  )}
                </SubTitleText>
              )}
              {props?.primaryAction?.title && (
                <Box mb={1}>
                  <RenderActionItem
                    url={props?.primaryAction?.url}
                    title={props?.primaryAction?.title}
                    navigationType={props?.primaryAction?.urlType}
                    variant={props?.primaryAction?.variant}
                    // we are giving hardcoded value for isActionButtonType
                    // we can pull this value from sanity
                    isActionButtonType={props?.primaryAction?.variant === "link" ? false : true}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
      {props?.heading && (
        <>
          <Box
            sx={{
              gap: "2%",
              display: "flex",
              marginTop: "2vw",
              alignItems: "center",
              alignContent: "flex-start",
              paddingBottom: isMobile ? "6.65vw" : "2.04vw",
              justifyContent: centerVariant ? "center" : "",
            }}>
            {!titleWithOutHyphens && (
              <Divider
                sx={{
                  height: "3%",
                  width: isMobile ? "6.25vw" : "2.16vw",
                  background: theme?.palette?.text?.primary,
                }}
              />
            )}
            <Typography
              sx={{
                textAlign: centerVariant ? "center" : "left",
                color: theme?.palette?.ihclPalette?.hexSeventeen,
              }}
              variant={isMobile ? "m-heading-m" : titleWithOutHyphens ? "heading-s" : "heading-m"}>
              {props?.heading}
            </Typography>
            {!titleWithOutHyphens && (
              <Divider
                sx={{
                  height: "3%",
                  width: isMobile ? "6.25vw" : "2.16vw",
                  background: theme?.palette?.text?.primary,
                }}
              />
            )}
          </Box>
        </>
      )}
    </>
  )
}
export default Title
