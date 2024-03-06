import React, { useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import dynamic from "next/dynamic"
import RemoveIcon from "@mui/icons-material/Remove"
import { useMobileCheck } from "../../utils/isMobilView"
import { AccordionSummary, Box, Typography } from "@mui/material"
import {
  TitleStack,
  StyledDownArrow,
  StyledAccordion,
  StyledAccordionDetails,
} from "./styles/center-aligned-single-dropdown."
import { theme } from "../../lib/theme"
const PortableText = dynamic(() => import("../../lib/portable-text-serializers").then((module) => module.PortableText))

const CenterAlignedSingleDropDownItem = ({ props }: any) => {
  const isMobile = useMobileCheck()
  const defaultExpandState = props?.defaultExpandState || false
  const [showDescription, setShowDescription] = useState<boolean>(defaultExpandState)
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const enableBorder = props?.items?.find((item: any) => item?.question)
  const handleSelect = (updatingIndex: number) => {
    if (updatingIndex === selectedIndex) {
      setSelectedIndex(-1)
    } else {
      setSelectedIndex(updatingIndex)
    }
  }
  return (
    <Box sx={{ padding: isMobile ? "6.250vw 0vw" : "2.135vw 0vw 0.156vw" }}>
      <TitleStack>
        <Typography
          sx={{ cursor: "pointer" }}
          component={props?.headingElement}
          variant={isMobile ? "m-heading-xs" : "heading-s"}
          onClick={() => setShowDescription(!showDescription)}>
          {props?.title}
        </Typography>
        <Box onClick={() => setShowDescription(!showDescription)}>
          <StyledDownArrow
            sx={{
              cursor: "pointer",
              transform: showDescription ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Box>
      </TitleStack>
      {showDescription && (
        <Box>
          <Box
            sx={{
              margin: isMobile ? "6.250vw 8.594vw 0vw" : "2.083vw 0vw 0vw",
              borderTop: isMobile
                ? enableBorder
                  ? `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}20`
                  : "unset"
                : "",
              borderBottom: enableBorder ? `1px solid ${theme?.palette?.ihclPalette?.hexSeventeen}20` : "unset",
            }}>
            {/*If question is there then accordion will render or otherwise normal portable text will render */}
            {props?.items?.length > 0 &&
              props?.items?.map((item: any, index: number) =>
                item?.question ? (
                  <StyledAccordion
                    key={index}
                    expanded={selectedIndex === index}
                    elevation={0}
                    disableGutters={true}
                    onClick={() => {
                      handleSelect(index)
                    }}>
                    {item?.question && (
                      <AccordionSummary
                        expandIcon={
                          selectedIndex === index ? (
                            <RemoveIcon style={{ fontSize: "20px" }} />
                          ) : (
                            <AddIcon style={{ fontSize: "20px" }} />
                          )
                        }
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            margin: "1.667vw 0vw 1.406vw 0vw",
                          },
                        }}>
                        <Typography
                          maxWidth={isMobile ? "95%" : "59vw"}
                          variant={isMobile ? "m-heading-xs" : "heading-xs"}
                          sx={{ padding: isMobile ? "3.906vw 0vw" : "unset" }}>
                          {item?.question}
                        </Typography>
                      </AccordionSummary>
                    )}
                    <StyledAccordionDetails>
                      <Typography
                        sx={{
                          li: {
                            lineHeight: "140%",
                            fontSize: isMobile ? "3.438vw" : "1.146vw",
                            span: {
                              fontSize: isMobile ? "3.438vw !important" : "1.146vw !important",
                            },
                          },
                          span: {
                            fontSize: isMobile ? "3.438vw" : "1.146vw",
                          },
                          marginBottom: "1.56vw",
                          fontWeight: 300,
                        }}>
                        <PortableText blocks={item?.answer} />
                      </Typography>
                    </StyledAccordionDetails>
                  </StyledAccordion>
                ) : (
                  <Typography
                    key={index}
                    sx={{
                      ul: {
                        paddingLeft: "20px",
                      },
                      li: {
                        lineHeight: "140%",
                        fontSize: isMobile ? "3.438vw" : "1.146vw",
                        span: {
                          fontSize: isMobile ? "3.438vw !important" : "1.146vw !important",
                        },
                      },
                      span: {
                        fontSize: isMobile ? "3.438vw" : "1.146vw",
                      },
                      fontWeight: 300,
                      color: theme?.palette?.ihclPalette?.hexSeventeen,
                    }}>
                    <PortableText blocks={item?.answer} />
                  </Typography>
                ),
              )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CenterAlignedSingleDropDownItem
