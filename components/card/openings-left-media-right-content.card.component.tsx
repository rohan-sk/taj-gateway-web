import { Box, Divider, Stack, Typography } from "@mui/material"
import { useMobileCheck } from "../../utils/isMobilView"
import dynamic from "next/dynamic"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import { urlFor } from "../../lib-sanity"
import {
  BulletIcon,
  ContentStack,
  DetailStack,
  GoldTypography,
  IconBox,
  ImageContainer,
  MainStack,
  StyledDivider,
} from "./styles/openings-left-media-right-content.styles"
import { PortableText } from "../../lib/portable-text-serializers"
import RoomIcon from "@mui/icons-material/Room"
import CallIcon from "@mui/icons-material/Call"
import MailIcon from "@mui/icons-material/Mail"
import ModalStore from "../../store/global/modal.store"
import { PathType } from "../types"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { useImageUtility } from "../../utils/hooks/useImageUtility"
import { externalNavigation } from "../constants"
import { CrossSiteNavigation } from "../../utils/sso/cross-site-navigation"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { useContext } from "react"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import { useLoggedIn } from "../../utils/hooks/useLoggedIn"
import { observer } from "mobx-react-lite"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))
const CustomReadMore = dynamic(() => import("../hoc/CustomReadMore"))

const OpeningsLeftMediaRightContentCard = (props: any) => {
  const isMobile = useMobileCheck()
  const navigate = useAppNavigation()
  const { getOptimizeImageUrl } = useImageUtility()
  const modalStore = ModalStore?.getInstance()
  const image = isMobile
    ? modalStore?.propertyData?.image?.asset?._ref || props?.image?.asset?._ref
    : modalStore?.propertyData?.largeImage?.asset?._ref || props?.largeImage?.asset?._ref
  const ihclContext = useContext(IHCLContext)
  const userStore = ihclContext?.getGlobalStore(GLOBAL_STORES.userStore) as UserStore
  const isLogin = useLoggedIn()
  const primaryActionData = props?.cardActionType?.find(
    (action: any) => action?.actionType === "primaryAction",
  )?.primaryAction
  return (
    <MainStack flexDirection={isMobile ? "column" : "row"} justifyContent={"space-between"}>
      <ImageContainer>
        {image && (
          <Box
            alt={
              (isMobile
                ? modalStore?.propertyData?.image?.altText || props?.image?.altText
                : modalStore?.propertyData?.largeImage?.altText || props?.largeImage?.altText) || `-img`
            }
            width={"100%"}
            height={"100%"}
            component={"img"}
            src={getOptimizeImageUrl(urlFor(image).url(), 1)}
          />
        )}
      </ImageContainer>
      <ContentStack>
        {(modalStore?.propertyData?.title || props?.title) && (
          <Stack>
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"}>
              {modalStore?.propertyData?.title || props?.title}
            </Typography>
          </Stack>
        )}
        {modalStore?.propertyData?.title && (
          <Stack mt={isMobile ? MobilePxToVw(25) : DesktopPxToVw(16)}>
            <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
              {"Opening soon"}
            </Typography>
          </Stack>
        )}

        {props?.parameterMap && (
          <Stack mt={isMobile ? MobilePxToVw(25) : DesktopPxToVw(16)}>
            {props?.parameterMap?.map((item: any, index: number) => (
              <Box key={index}>
                <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                  {item?.key}
                  <b> {item?.value}</b>
                </Typography>
              </Box>
            ))}
          </Stack>
        )}

        {(modalStore?.propertyData?.phone || modalStore?.propertyData?.email || modalStore?.propertyData?.address) && (
          <Stack
            gap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(16)}
            mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(16)}>
            {!isMobile && (
              <>
                {modalStore?.propertyData?.phone && (
                  <DetailStack>
                    <IconBox>
                      <CallIcon
                        sx={{
                          width: isMobile ? "3.125vw" : "1.042vw",
                          height: "auto",
                        }}
                      />
                    </IconBox>
                    <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                      {modalStore?.propertyData?.phone}
                    </Typography>
                  </DetailStack>
                )}
                {modalStore?.propertyData?.email && (
                  <DetailStack>
                    <IconBox>
                      <MailIcon
                        sx={{
                          width: isMobile ? "3.125vw" : "1.042vw",
                          height: "auto",
                        }}
                      />
                    </IconBox>

                    <GoldTypography variant={isMobile ? "m-body-s" : "body-s"}>
                      {modalStore?.propertyData?.email}
                    </GoldTypography>
                  </DetailStack>
                )}
              </>
            )}
            {modalStore?.propertyData?.address && (
              <DetailStack>
                <IconBox>
                  <RoomIcon
                    sx={{
                      width: isMobile ? "3.5vw" : "1.042vw",
                      height: "auto",
                    }}
                  />
                </IconBox>
                <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                  {modalStore?.propertyData?.address}
                </Typography>
              </DetailStack>
            )}
          </Stack>
        )}

        {(props?.description || modalStore?.propertyData?.description) && (
          <Stack mt={isMobile ? `${MobilePxToVw(20)}` : `${DesktopPxToVw(16)}`}>
            <CustomReadMore
              textStyles={{ lienHeight: "140%" }}
              variant={isMobile ? "m-body-s" : "body-s"}
              length={props?.charactersLimit || 120}>
              {props?.description || modalStore?.propertyData?.description}
            </CustomReadMore>
          </Stack>
        )}

        {isMobile && (modalStore?.propertyData?.phone || modalStore?.propertyData?.email) && (
          <Stack
            gap={isMobile ? MobilePxToVw(20) : DesktopPxToVw(16)}
            mt={isMobile ? MobilePxToVw(20) : DesktopPxToVw(16)}>
            {modalStore?.propertyData?.phone && (
              <DetailStack>
                <IconBox>
                  <CallIcon
                    sx={{
                      width: isMobile ? "4vw" : "1.042vw",
                      height: "auto",
                    }}
                  />
                </IconBox>
                <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                  {modalStore?.propertyData?.phone}
                </Typography>
              </DetailStack>
            )}
            {modalStore?.propertyData?.email && (
              <DetailStack>
                <IconBox>
                  <MailIcon
                    sx={{
                      width: isMobile ? "4vw" : "1.042vw",
                      height: "auto",
                    }}
                  />
                </IconBox>
                <GoldTypography variant={isMobile ? "m-body-s" : "body-s"}>
                  {modalStore?.propertyData?.email}
                </GoldTypography>
              </DetailStack>
            )}
          </Stack>
        )}

        {(modalStore?.propertyData?.highlights?.length > 0 || props?.highlights?.length > 0) && (
          <StyledDivider orientation="horizontal" />
        )}
        {(modalStore?.propertyData?.highlights?.length > 0 || props?.highlights?.length > 0) && (
          <Stack>
            {modalStore?.propertyData?.title && (
              <Stack mb={isMobile ? MobilePxToVw(8) : DesktopPxToVw(8)}>
                <Typography variant={isMobile ? "m-body-s" : "body-s"}>{"Hotel Highlights"}</Typography>
              </Stack>
            )}
            {modalStore?.propertyData?.highlights?.map((item: any, index: number) => (
              <Stack
                key={index}
                flexDirection={"row"}
                alignItems={"start"}
                gap={isMobile ? MobilePxToVw(12) : DesktopPxToVw(15)}>
                <IconBox>
                  <BulletIcon />
                </IconBox>
                <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                  {item?.basicInfo?.title}
                </Typography>
              </Stack>
            ))}

            {props?.highlights?.map((item: any, index: number) => (
              <Stack
                key={index}
                flexDirection={"row"}
                alignItems={"center"}
                gap={isMobile ? MobilePxToVw(12) : DesktopPxToVw(15)}>
                <BulletIcon />
                <Typography sx={{ lineHeight: "140%" }} variant={isMobile ? "m-body-s" : "body-s"}>
                  {typeof item === typeof "" ? item : item?.term}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
        {primaryActionData && modalStore?.propertyData?.isBookNowButtonEnable && (
          <Stack
            flexDirection={"row"}
            alignItems={isMobile ? "end" : "center"}
            justifyContent={"space-between"}
            mt={isMobile ? MobilePxToVw(35) : DesktopPxToVw(16)}>
            <RenderActionItem
              title={primaryActionData?.title}
              url={primaryActionData?.url}
              navigationType={primaryActionData?.urlType}
              isActionButtonType={true}
              variant={primaryActionData?.variant}
              onClick={() => {
                const brand = modalStore?.propertyData?.brandName?.toUpperCase()
                const navUrl = externalNavigation[brand]
                if (modalStore?.propertyData?.brandName?.toLowerCase() !== "taj") {
                  CrossSiteNavigation({
                    url: `${navUrl}/${modalStore?.propertyData?.identifier}/rooms-and-suites/?`,
                    loggedIn: isLogin,
                    userStore,
                  })
                } else {
                  navigate(`/hotels/${modalStore?.propertyData?.identifier}`)
                }
              }}
            />
          </Stack>
        )}
      </ContentStack>
    </MainStack>
  )
}
export default observer(OpeningsLeftMediaRightContentCard)
