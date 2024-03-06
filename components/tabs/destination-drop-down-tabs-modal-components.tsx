import React from "react";
import { Box } from "@mui/material";
import { theme } from "../../lib/theme";
import { urlFor } from "../../lib-sanity";
import ReferenceDataContext from "../hoc/ReferenceDataContext";
import {
  TabTitleTypo,
  DropDownItemBox,
  DropdownTitleText,
  ModelContentWrapperBox,
  LogoBox,
} from "./styles/drop-down-tabs";
import { useMobileCheck } from "../../utils/isMobilView";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/routes";
import { PathType } from "../types";

interface DropdownTabsModalProps {
  navigate: Function;
  activePath: string;
  setOpenModel: Function;
  modalProps: DropDownTabItems[];
}

type DropDownTabItems = {
  type: any;
  url: string;
  value?: string;
};

const DestinationDropdownTabsModal = ({
  navigate,
  activePath,
  modalProps,
  setOpenModel,
}: DropdownTabsModalProps) => {
  const isMobile = useMobileCheck();
  const router = useRouter();
  const handleRoute = () => {
    setOpenModel(false);
    router?.push(ROUTES?.WITHOUTSEO_FOR_ROUTING?.HOMEPAGE);
  };
  const handleNavigation = (url: any, type: PathType | undefined) => {
    navigate(url, type);
    setOpenModel(false);
  };
  return (
    <>
      <ReferenceDataContext.Consumer>
        {(modalDropdownContextData) => (
          <ModelContentWrapperBox>
            {modalDropdownContextData?.modalDropdownContextData?.logo && (
              <LogoBox>
                <Box
                  onClick={handleRoute}
                  width="16.72vw"
                  height="14.76vw"
                  component="img"
                  alt="Taj Logo"
                  src={urlFor(
                    modalDropdownContextData?.modalDropdownContextData?.logo
                  ).url()}
                />
              </LogoBox>
            )}
            <DropdownTitleText>
              {modalDropdownContextData?.modalDropdownContextData?.title !==
                undefined &&
              typeof modalDropdownContextData?.modalDropdownContextData
                ?.title === "string" ? (
                <>
                  {modalDropdownContextData?.modalDropdownContextData?.title?.split(
                    ","
                  )[0] &&
                    modalDropdownContextData?.modalDropdownContextData?.title?.split(
                      ","
                    )[0]}
                  , <br />
                  {modalDropdownContextData?.modalDropdownContextData?.title?.split(
                    ","
                  )[1] &&
                    modalDropdownContextData?.modalDropdownContextData?.title?.split(
                      ","
                    )[1]}
                </>
              ) : (
                <>
                  {isMobile ? (
                    <>
                      {modalDropdownContextData?.modalDropdownContextData?.title
                        ?.mobileTitle?.[0] &&
                        modalDropdownContextData?.modalDropdownContextData
                          ?.title?.mobileTitle?.[0]}
                      <br />
                      {modalDropdownContextData?.modalDropdownContextData?.title
                        ?.mobileTitle?.[1] &&
                        modalDropdownContextData?.modalDropdownContextData
                          ?.title?.mobileTitle?.[1]}
                    </>
                  ) : (
                    <>
                      {modalDropdownContextData?.modalDropdownContextData?.title
                        ?.desktopTitle?.[0] &&
                        modalDropdownContextData?.modalDropdownContextData
                          ?.title?.desktopTitle?.[0]}
                      <br />
                      {modalDropdownContextData?.modalDropdownContextData?.title
                        ?.desktopTitle?.[1] &&
                        modalDropdownContextData?.modalDropdownContextData
                          ?.title?.desktopTitle?.[1]}
                    </>
                  )}
                </>
              )}
            </DropdownTitleText>
            {modalProps?.map((item: DropDownTabItems, index: number) => (
              <DropDownItemBox
                key={index}
                sx={{
                  borderTop:
                    index === 0
                      ? `2px solid ${theme?.palette?.neuPalette?.rgbaOne}`
                      : "none",
                }}
              >
                <TabTitleTypo
                  sx={{
                    fontSize: "4.06vw",
                    lineHeight: "320%",
                    color: theme?.palette?.neuPalette?.hexTwo,
                    fontWeight: activePath == item?.url ? 700 : 400,
                  }}
                  variant="m-body-m"
                  onClick={() => {
                    handleNavigation(item?.url, item?.type);
                  }}
                >
                  {item?.value}
                </TabTitleTypo>
              </DropDownItemBox>
            ))}
          </ModelContentWrapperBox>
        )}
      </ReferenceDataContext.Consumer>
    </>
  );
};

export default DestinationDropdownTabsModal;
