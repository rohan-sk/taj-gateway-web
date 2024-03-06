/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from "@mui/material"
import React from "react"
import Link from "./link.component"
import Group from "../group"
import { urlFor } from "../../lib-sanity"
import { theme } from "../../lib/theme"
import { LinkBox } from "./style"

export const getPortableTextSerializers = (props: any, isMobile: any) => {
  const parentVariant = props?.parentVariant
  const textVariant = props ? props?.[Object?.keys(props)?.[0] || "block"]?.variant || props?.variant : undefined
  const textColor = props ? props?.[Object?.keys(props)?.[0] || "block"]?.color || props?.color : undefined

  const getNormalBlockVariant = () => {
    if (isMobile) {
      if (props?.parentVariant == "details.group.group-with-rich-text-columns") {
        return "m-body-sl"
      } else return textVariant || "m-body-l"
    } else return textVariant || "body-ml"
  }
  return {
    types: {
      group: (props: any) => {
        return <Group {...props.value} />
      },
      button: (props: any) => {
        return <Button variant={"contained"}>{props.node.link?.title}</Button>
      },
      image: (props: any) => (
        <>
          {props?.value?.asset?._ref && (
            <img
              src={urlFor(props?.value?.asset?._ref).url()}
              style={{
                display: "inline-block",
                marginRight: isMobile ? "3.125vw" : "1.042vw",
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }}
              alt="portal-icon"
            />
          )}
        </>
      ),
      span: ({ children }: any) => (
        <Typography component="span" color={textColor ?? theme?.palette?.primary?.main} variant={textVariant}>
          {children}
        </Typography>
      ),
      code: ({ value }: any) => (
        <div
          dangerouslySetInnerHTML={{
            __html: value?.code,
          }}></div>
      ),
    },
    marks: {
      underline: ({ _key, children, text }: any) => {
        return (
          <u
            onClick={() => {
              if (props?.onClickMethods?.length) {
                const mrk = props?.blocks?.map((blk: any) =>
                  blk?.children?.filter((ch: any) => ch.marks[0] === "underline"),
                )[0]
                const idx = mrk?.map((item: any) => (_key ? item._key : item?.text)).indexOf(_key || text)
                const callBackFunc = props?.onClickMethods[idx]
                if (typeof callBackFunc === "function") {
                  callBackFunc(mrk[idx])
                }
              }
            }}
            style={{
              cursor: props?.onClickMethods?.length ? "pointer" : "unset",
            }}>
            {children}
          </u>
        )
      },
      color: ({ children, value }: any) => <span style={{ color: value.hex }}>{children}</span>,
      link: ({ value, children }: any) => (
        <Link value={value} variant={textVariant} color={textColor}>
          {children}
        </Link>
      ),
      "left-aligned": ({ children }: any) => <LinkBox>{children}</LinkBox>,
      "centered-aligned": ({ children }: any) => <Box textAlign={"center"}>{children}</Box>,
      "right-aligned": ({ children }: any) => <Box textAlign={"right"}>{children}</Box>,
    },
    block: {
      normal: ({ children }: any) => (
        <Typography color={textColor ?? theme?.palette?.primary?.main} variant={getNormalBlockVariant()}>
          {children}
        </Typography>
      ),
      h1: ({ children }: any) => (
        <Typography component={"h1"} variant={isMobile ? "m-heading-m" : "heading-m"}>
          {children}
        </Typography>
      ),
      h2: ({ children }: any) => (
        <Typography component={"h2"} variant={isMobile ? "m-heading-xs" : "heading-xs"}>
          {children}
        </Typography>
      ),
      h3: ({ children }: any) => (
        <Typography component={"h3"} variant={isMobile ? "m-heading-xs" : "heading-xs"}>
          {children}
        </Typography>
      ),

      h4: ({ children }: any) => (
        <Typography component={"h4"} variant={isMobile ? "m-heading-s" : "heading-s"}>
          {children}
        </Typography>
      ),
      span: ({ children }: any) => (
        <Typography
          variant={textVariant || (isMobile ? "m-body-l" : "body-ml")}
          component="span"
          sx={{
            fontFamily: "supreme",
            color: textColor ?? theme?.palette?.primary?.main,
            lineHeight: "140%",
          }}>
          {children}
        </Typography>
      ),
      break: () => (
        <Typography
          variant={isMobile ? "m-body-l" : "body-ml"}
          component="div"
          sx={{
            fontFamily: "supreme",
            color: theme?.palette?.primary?.main,
          }}>
          &nbsp;
        </Typography>
      ),
      html: ({ children }: any) => (
        <div
          dangerouslySetInnerHTML={{
            __html: children,
          }}></div>
      ),
    },
  }
}
