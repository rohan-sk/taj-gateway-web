import { Box, Grid, Typography } from "@mui/material"
import dynamic from "next/dynamic"
const  CustomCheckBox = dynamic(() => import("../../hoc/CustomCheckBox/Checkbox").then((module) => module.CustomCheckBox))
import { InputText, ORDivider } from "../gift-card-form/styles"
import { useMobileCheck } from "../../../utils/isMobilView"
import { PLACEHOLDERS } from "../gift-card-form/constants"
const RenderActionItem = dynamic(() => import("../../hoc/actions/action-items-ui"))
import { theme } from "../../../lib/theme"
import { ChidGrid, NeuBox, NeuCoinFlexBox, NueCoinContainer } from "./styles"
import DesktopPxToVw, { MobilePxToVw } from "../../../utils/DesktopFontCalc"

const NeuCoinsRedemption = () => {
  const isMobile = useMobileCheck()

  return (
    <NueCoinContainer>
      <NeuCoinFlexBox>
        <Typography variant={isMobile ? "m-heading-xs" : "heading-xs"}>
          NEUCOINS REDEMPTION
        </Typography>
        <br />
        <Typography variant={isMobile ? "m-body-l" : "body-l"}>
          (1 Neucoin = 1 Rupee)
        </Typography>
      </NeuCoinFlexBox>

      <Grid container pt={3}>
        <ChidGrid item md={4} sm={12} xs={12}>
          <Box
            sx={{
              justifyContent: "space-between",
              width: "100%",
              display: "flex",
            }}>
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              Balance Amount
            </Typography>
            <Typography
              variant={isMobile ? "m-body-m" : "body-m"}
              sx={{ fontWeight: "600" }}>
              ₹ 60,000
            </Typography>
          </Box>
        </ChidGrid>
        <ChidGrid item md={1.8} sm={12} xs={12}>
          <NeuBox>
            <CustomCheckBox
              withBorder={true}
              name={"terms"}
              onChange={(e: any) => {}}
              checked={true}
              unCheckedBorder={false}
            />
            <Typography
              variant={isMobile ? "m-body-m" : "body-m"}
              sx={{ whiteSpace: "nowrap" }}>
              Redeem All
            </Typography>
          </NeuBox>
        </ChidGrid>
        <ChidGrid item md={1.6} sx={{}} sm={12} xs={12}>
          <NeuBox sx={{ gap: DesktopPxToVw(15) }}>
            <ORDivider />
            <Typography variant={isMobile ? "m-body-m" : "body-m"}>
              OR
            </Typography>
            <ORDivider />
          </NeuBox>
        </ChidGrid>
        <ChidGrid item md={3} sm={12} xs={12}>
          <NeuBox>
            <InputText
              variant="standard"
              name={"receiverLastName"}
              inputProps={{ maxLength: 10 }}
              //commented for validation purposes
              // error={formErrors.receiverLastName}
              // value={formValues.receiverLastName}
              placeholder={PLACEHOLDERS?.ENTER_AMOUNT}
              // helperText={
              //   formErrors?.receiverLastName &&
              //   formValues.receiverLastName.length > 0 &&
              //   ErrorMessage?.receiverLastName
              // }
              onChange={(e) => {}}
            />
          </NeuBox>
        </ChidGrid>
        <ChidGrid item md={1.6} sm={12} xs={12}>
          <NeuBox>
            <RenderActionItem
              url={""}
              title={"REDEEM"}
              variant={"light-contained"}
              navigationType="internal"
              isActionButtonType={true}
            />
          </NeuBox>
        </ChidGrid>
      </Grid>
    </NueCoinContainer>
  )
}

export default NeuCoinsRedemption
