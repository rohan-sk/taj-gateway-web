import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const CustomDropDown = dynamic(() => import("../hoc/CustomDropDown").then((module) => module.CustomDropDown))
import { useAppNavigation } from "../../utils/NavigationUtility"

type DropdownMsiteSelectorProps = {
  props: any
}

export default function DropdownMsiteSelector({ props }: DropdownMsiteSelectorProps) {
  const navigate = useAppNavigation()
    const router = useRouter()
  const [value, setValue] = useState<string>(
    props?.findIndex((item: any) =>
      item?.url?.includes(
        router?.query?.pid !== undefined ? router?.query?.pid[router?.query?.pid?.length - 1] : ""
      )
    ) >= 0
      ? props?.[
          props?.findIndex((item: any) =>
            item?.url?.includes(
              router?.query?.pid !== undefined
                ? router?.query?.pid[router?.query?.pid?.length - 1]
                : ""
            )
          )
        ]?.title
      : ""
  )

  const handleNavigate = (index: number) => {
    if (`/${router?.query?.pid?.[0]}` !== props[index]?.url)
      navigate(props[index]?.url, props[index]?.urlType)
  }
  useEffect(() => {
    const selectedValueIndex = props?.findIndex((item: any) => item?.title === value)
    if (selectedValueIndex >= 0) {
      handleNavigate(selectedValueIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, value])
  return (
    <>
      <CustomDropDown
        value={value}
        setValue={setValue}
        minWidth={"74.375vw"}
        dropDownStyles={{ fontSize: "3.750vw" }}
        data={props?.map?.((item: any) => item?.title)}
      />
    </>
  )
}
