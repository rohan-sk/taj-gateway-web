import { Box, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import {
  CardContainer,
  DataContainer,
  FullWidthBox,
  TitleContainer,
} from "./styles/card-with-global-hotel-contacts.styles"
import { useMobileCheck } from "../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc"
import useLocation from "../../utils/hooks/useLocation"
import { useContext } from "react"
import { IHCLContext } from "../../PresentationalComponents/lib/prepare-ihcl-context"
import { GLOBAL_STORES } from "../../utils/Constants"
import { UserStore } from "../../store"
import { useAppNavigation } from "../../utils/NavigationUtility"
import { PathType } from "../types"
const RenderActionItem = dynamic(() => import("../hoc/actions/action-items-ui"))

const HotelContactCard = ({
  title,
  phone,
  email,
  description,
  coordinates,
  actionItem,
}: any) => {
  const isMobile = useMobileCheck()
  const getLocation = useLocation()
  const navigate = useAppNavigation()
  const context = useContext(IHCLContext)
  const userStore = context?.getGlobalStore(
    GLOBAL_STORES?.userStore
  ) as UserStore
  const { setContactFilteredCoordinates } = userStore
  const supportContact = phone
    ?.filter((item: any) => item?.type === "support")
    ?.map((item: any) => item?.mobile)?.[0]
  const businessContact = phone
    ?.filter((item: any) => item?.type === "business")
    ?.map((item: any) => item?.mobile)?.[0]
  const businessEmail = email
    ?.filter((item: any) => item?.type === "business")
    ?.map((item: any) => item?.email)?.[0]
  return (
    <CardContainer sx={{ height: "100%" }}>
      <DataContainer>
        {title && (
          <Typography variant={isMobile ? "m-body-l" : "body-l"}>
            {title}
          </Typography>
        )}
        {(supportContact ||
          businessContact ||
          description ||
          businessEmail) && (
          <Stack
            flexDirection="column"
            mt={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}>
            <Box>
              {description && (
                <Typography
                  sx={{ fontWeight: 400 }}
                  variant={isMobile ? "m-body-sl" : "body-ml"}>
                  {description}
                </Typography>
              )}
              {coordinates?.latitude && coordinates?.longitude && (
                <RenderActionItem
                  title={"View map"}
                  url={actionItem?.url}
                  onClick={() => {
                    navigate(actionItem?.url, PathType?.dialog)
                    setContactFilteredCoordinates([
                      {
                        lat: Number(coordinates?.latitude),
                        lng: Number(coordinates?.longitude),
                      },
                    ])
                  }}
                  variant={"light-contained"}
                  isActionButtonType={false}
                  navigationType={PathType?.dialog}
                  buttonStyles={{
                    maxWidth: "fit-content",
                  }}
                />
              )}
            </Box>

            {(businessContact || supportContact) && (
              <Stack
                flexDirection={"column"}
                mt={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}>
                {businessContact && (
                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                    {`${"Phone:"} ${businessContact}`}
                  </Typography>
                )}
                {supportContact && (
                  <Typography variant={isMobile ? "m-body-sl" : "body-ml"}>
                    {`${"Fax:"} ${supportContact}`}
                  </Typography>
                )}
              </Stack>
            )}
            {businessEmail && (
              <Typography
                mt={isMobile ? MobilePxToVw(30) : DesktopPxToVw(30)}
                sx={{ fontWeight: 700, lineBreak: "anywhere" }}
                variant={isMobile ? "m-body-sl" : "body-ml"}>
                {businessEmail}
              </Typography>
            )}
          </Stack>
        )}
      </DataContainer>
    </CardContainer>
  )
}

export default HotelContactCard
