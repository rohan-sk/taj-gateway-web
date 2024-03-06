import { Typography, Divider } from "@mui/material";
import { Stack, Box } from "@mui/system";
import { theme } from "../../../lib/theme";
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc";
import { useMobileCheck } from "../../../utils/isMobilView";
import {
  ICONS,
  DEFAULT_ADDRESS,
  ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "../../constants";
import { EDIT_ICON, EDIT_TEXT } from "../../forms/gift-card-form/constants";
import BasicModal from "../../hoc/modal/modal";
import DeleteAddressModalpopup from "./delete-address-modal-popup";
import {
  ActionsTypography,
  EditIcon,
  EditTextTypography,
} from "./personal-details.styles";
import { DELETE } from "../../forms/gift-card-form/constants";

export const AddressField = ({
  data,
  index,
  setAsDefaultAddress,
  editAddress,
  deleteUserAddress,
  setOpen,
  open,
  key,
  addressId,
  clickAddressID
}: any) => {
  const isMobile = useMobileCheck();
  const {
    addressLine,
    house,
    city,
    state,
    country,
    pinCode,
    isPrimary,
  } = data;
  const formattedAddress = [addressLine, city, state, pinCode, country]?.join(
    ", "
  );
  return (
    <>
      {open && (
        <BasicModal
          width={"100%"}
          height={"100%"}
          bgcolor={isMobile ? theme?.palette?.background?.default : ""}
          ModalCloseButtonStyles={{
            right: "25vw",
            marginBottom: "1.563vw",
          }}
          showLogo={true}
          tajLogoTop={"0vw"}
          ModalCloseButtonColor={theme?.palette?.neuPalette?.hexOne}
          webCloseIcon={ICONS?.CLOSE_WHITE_ICON}
          open={open}
          handleClose={() => setOpen(!open)}
          Component={
            <DeleteAddressModalpopup
              open={open}
              setOpen={setOpen}
              data={data}
              deleteUserAddress={deleteUserAddress}
              clickAddressID={clickAddressID}
            />
          }
        />
      )}
      <Stack
        flexDirection={"column"}
        pb={isMobile ? MobilePxToVw(20) : DesktopPxToVw(20)}
      >
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            columnGap={isMobile ? MobilePxToVw(10) : DesktopPxToVw(10)}
            width={"100%"}
          >
            <Typography
              fontWeight={700}
              variant={isMobile ? "m-body-l" : "body-l"}
            >
              {isPrimary ? DEFAULT_ADDRESS : `${ADDRESS} ${index + 2}`}
            </Typography>
            {!isPrimary && (
              <Typography
                variant={isMobile ? "m-link-m" : "link-m"}
                onClick={() => setAsDefaultAddress(data, addressId)}
              >
                {SET_DEFAULT_ADDRESS}
              </Typography>
            )}
          </Stack>
          {!isMobile && (
            <>
              <ActionsTypography
                sx={{
                  columnGap: `${DesktopPxToVw(0)} !important`,
                }}
                variant={isMobile ? "m-link-m" : "link-m"}
                onClick={() => editAddress(data, false)}
              >
                <EditIcon component={"img"} alt="edit_icon" src={EDIT_ICON} />
                {EDIT_TEXT}
              </ActionsTypography>

              {!isPrimary && (
                <>
                  {!isMobile && (
                    <Divider
                      orientation="vertical"
                      sx={{ height: "20px", margin: "0 10px" }}
                    ></Divider>
                  )}
                  <Typography
                    variant={isMobile ? "m-link-m" : "link-m"}
                    onClick={() => setOpen(true)}
                  >
                    {DELETE}
                  </Typography>
                </>
              )}
            </>
          )}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: isMobile ? "80%" : "100%" }}>
            <Typography variant={isMobile ? "m-body-l" : "body-l"}>
              {formattedAddress}
            </Typography>
          </Box>
          {isMobile && (
            <Box>
              <EditTextTypography
                variant={isMobile ? "m-link-m" : "link-m"}
                onClick={() => editAddress(data, false)}
              >
                <EditIcon component={"img"} alt="edit_icon" src={EDIT_ICON} />
                &nbsp;
                {EDIT_TEXT}
              </EditTextTypography>

              {!isPrimary && (
                <>
                  <Typography
                    variant={isMobile ? "m-link-m" : "link-m"}
                    onClick={() => setOpen(true)}
                  >
                    {DELETE}
                  </Typography>
                </>
              )}
            </Box>
          )}
        </Box>
      </Stack>
    </>
  );
};
