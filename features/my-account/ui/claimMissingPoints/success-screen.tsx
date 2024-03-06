import { Box, Typography } from "@mui/material"
import React, { useContext } from "react"
import { SuccessTickIcon } from "../../../../utils/customIcons"
import { ClaimSuccessBox, TitleTickWrapper } from "./styles"
import { useMobileCheck } from "../../../../utils/isMobilView"
import DesktopPxToVw, { MobilePxToVw } from "../../../../utils/DesktopFontCalc"
import { IHCLContext } from "../../../../PresentationalComponents/lib/prepare-ihcl-context"
import RenderActionItem from "../../../../components/hoc/actions/action-items-ui"

const SuccessScreen = ({ requestSuccess, singleContent, setIsFormSubmit, setRequestSuccess }: any) => {
  const Context = useContext(IHCLContext)
  const PortableText = Context!.PortableText
  const isMobile = useMobileCheck()

  return (
    <ClaimSuccessBox>
      {requestSuccess ? (
        <>
          <TitleTickWrapper>
            <SuccessTickIcon
              sx={{
                width: isMobile ? MobilePxToVw(70) : DesktopPxToVw(70),
                marginBottom: isMobile ? MobilePxToVw(40) : DesktopPxToVw(40),
                alignSelf: "center",
              }}
            />
            <Typography variant={isMobile ? "m-heading-s" : "heading-s"} component={"div"}>
              CLAIM NEUCOINS REQUEST SUBMITTED
            </Typography>
          </TitleTickWrapper>
          <Box
            sx={
              !isMobile ? { margin: `${DesktopPxToVw(40)} ${DesktopPxToVw(65)}` } : { marginBottom: MobilePxToVw(40) }
            }>
            <PortableText blocks={singleContent} />
          </Box>
        </>
      ) : (
        <TitleTickWrapper
          sx={!isMobile ? { margin: `${DesktopPxToVw(0)} ${DesktopPxToVw(65)} ${DesktopPxToVw(40)}` } : { marginBottom: MobilePxToVw(40) }}>
          <Typography variant={isMobile ? "m-heading-s" : "heading-s"} component={"div"}>
            SORRY, SOMETHING WENT WRONG
          </Typography>
        </TitleTickWrapper>
      )}
      <RenderActionItem
        url=""
        title={requestSuccess ? "CLAIM MORE" : "TRY AGAIN"}
        variant="light-contained"
        navigationType=""
        isActionButtonType={true}
        onClick={() => {
          setRequestSuccess(false)
          setIsFormSubmit(false)
        }}
        buttonStyles={{ margin: "auto", whiteSpace: "nowrap" }}
      />
    </ClaimSuccessBox>
  )
}

export default SuccessScreen
