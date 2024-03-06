/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DesktopPxToVw, { MobilePxToVw } from "../../utils/DesktopFontCalc";
import { useMobileCheck } from "../../utils/isMobilView";
import { useAppNavigation } from "../../utils/NavigationUtility";
import { fetchDynamicSiteData } from "../../utils/fetchDynamicSiteData";

const SiteMapAccordianDetailsList = ({ data }: any) => {
  const isMobile = useMobileCheck();
  const [siteData, setSiteData] = useState(data)
  const navigate = useAppNavigation();

  useEffect(() => {
    const fetchData = async () => {
      if(data?.itemType !== "single") {
        let arr: any = data?.items
         await data?.items?.map(async (val: any, index: number) => {
          let res = await val?.listType === "dynamic" ? await fetchDynamicSiteData(val?.groq) : []
           arr[index] = await {...val, dynamicDataSet: res}
        })
        setSiteData({...data, items: arr})
    }
    }
    fetchData()
  },[])

  const renderSingleItemList = (items: any, col: number) => {
    return (
      <Grid
        container
        onClick={(e: any) => {
          e?.stopPropagation();
        }}
      >
        {items?.map((dataItem: any) => (
          dataItem?.items?.length > 0 
          ? 
              <>
                {dataItem?.title && (
                  <Typography
                    variant={isMobile ? "m-heading-xs" : "body-m"}
                    component={"h3"}
                    sx={{
                      fontWeight: 700,
                        padding: isMobile
                          ? `${MobilePxToVw(5)} !important`
                          : `${DesktopPxToVw(30)} ${DesktopPxToVw(15)} ${DesktopPxToVw(10)} ${DesktopPxToVw(15)} !important`,
                    }}>
                    {dataItem?.title}
                  </Typography>
                )}
                {renderSingleItemList(dataItem?.items, col || 3)}
              </>
          : <Grid
            item
            md={6}
            sm={6}
            xs={12}
            lg={col || 3}
            key={dataItem?.title}
            sx={{
              padding: isMobile
                ? `${MobilePxToVw(10)} !important`
                : `${DesktopPxToVw(15)} ${DesktopPxToVw(30)} !important`,
            }}
          >
            <Typography
              variant={isMobile ? "m-heading-xs" : "body-m"}
              onClick={() => {
                navigate(dataItem?.url, dataItem?.urlType);
              }}
              component={dataItem?.headingElementForCard}
              sx={{
                cursor: "pointer",
                textTransform: "capitalize"
              }}
            >
              {dataItem?.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      {siteData?.itemType === "single" ? (
        renderSingleItemList(siteData?.singleItems, siteData?.noOfColumns)
      ) :
        siteData?.items?.map((val: any) => {
          return (
            <>
              {val?.title && (
                <Typography
                  variant={isMobile ? "m-heading-xs" : "body-m"}
                  component={"h3"}
                  sx={{
                    fontWeight: 700,
                      padding: isMobile
                        ? `${MobilePxToVw(5)} !important`
                        : `${DesktopPxToVw(30)} ${DesktopPxToVw(15)} ${DesktopPxToVw(10)} ${DesktopPxToVw(15)} !important`,
                  }}>
                  {val?.title}
                </Typography>
              )}
              {renderSingleItemList(val?.listType === "dynamic" ? val?.dynamicDataSet : val?.singleItems, val?.noOfColumns)}
            </>
          )
        })
      }
    </Box>
  );
};

export default SiteMapAccordianDetailsList;
