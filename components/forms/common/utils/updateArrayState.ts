export const updateArrayState = (setArrState: Function, currentIndex: any, currentObj: any) => {
    setArrState((prev: any) => {
        const tempArr = [...prev]
        return tempArr?.map((obj: any, index: number) => (currentIndex === index ? { ...obj, ...currentObj } : obj))
    }
    )
}